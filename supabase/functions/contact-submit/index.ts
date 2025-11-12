import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

// Allow requests from production and Lovable development/preview domains
const ALLOWED_ORIGINS = [
  'https://codelco.lovable.app',
  /^https:\/\/.*\.lovableproject\.com$/,
  /^https:\/\/.*\.lovable\.app$/,
];

const corsHeaders = (origin: string | null) => {
  const isAllowed = origin && ALLOWED_ORIGINS.some(allowed => 
    typeof allowed === 'string' ? allowed === origin : allowed.test(origin)
  );
  
  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };
};

interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  website?: string; // Honeypot field
}

// Input length limits for security
const INPUT_LIMITS = {
  name: { min: 2, max: 100 },
  email: { min: 5, max: 255 },
  phone: { min: 0, max: 20 },
  message: { min: 10, max: 2000 }
};

// Rate limiting: max 5 submissions per IP per hour
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 3600; // 1 hour in seconds

// Function to redact email for logging (e.g., user@example.com -> u***@e***.com)
function redactEmail(email: string): string {
  const [localPart, domain] = email.split('@');
  if (!domain) return '***';
  
  const redactedLocal = localPart.charAt(0) + '***';
  const domainParts = domain.split('.');
  const redactedDomain = domainParts[0].charAt(0) + '***.' + domainParts.slice(1).join('.');
  
  return `${redactedLocal}@${redactedDomain}`;
}

serve(async (req) => {
  const origin = req.headers.get('origin');
  const headers = corsHeaders(origin);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405, 
      headers 
    });
  }

  try {
    const body: ContactSubmission = await req.json();
    
    // Honeypot check - if website field is filled, it's likely a bot
    if (body.website && body.website.trim().length > 0) {
      console.log('Bot detected via honeypot field');
      // Return success to not tip off the bot
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Contact form submitted successfully'
        }),
        {
          headers: { ...headers, 'Content-Type': 'application/json' },
        }
      );
    }
    
    // Input validation: required fields
    if (!body.name || !body.email || !body.subject || !body.message) {
      return new Response(
        JSON.stringify({ error: 'Name, email, subject, and message are required' }),
        { 
          status: 400, 
          headers: { ...headers, 'Content-Type': 'application/json' }
        }
      );
    }

    // Input validation: minimum and maximum length limits
    if (body.name.trim().length < INPUT_LIMITS.name.min) {
      return new Response(
        JSON.stringify({ error: `Name must be at least ${INPUT_LIMITS.name.min} characters` }),
        { 
          status: 400, 
          headers: { ...headers, 'Content-Type': 'application/json' }
        }
      );
    }

    if (body.name.trim().length > INPUT_LIMITS.name.max) {
      return new Response(
        JSON.stringify({ error: `Name must be less than ${INPUT_LIMITS.name.max} characters` }),
        { 
          status: 400, 
          headers: { ...headers, 'Content-Type': 'application/json' }
        }
      );
    }

    if (body.email.trim().length > INPUT_LIMITS.email.max) {
      return new Response(
        JSON.stringify({ error: `Email must be less than ${INPUT_LIMITS.email.max} characters` }),
        { 
          status: 400, 
          headers: { ...headers, 'Content-Type': 'application/json' }
        }
      );
    }

    if (body.phone && body.phone.trim().length > INPUT_LIMITS.phone.max) {
      return new Response(
        JSON.stringify({ error: `Phone must be less than ${INPUT_LIMITS.phone.max} characters` }),
        { 
          status: 400, 
          headers: { ...headers, 'Content-Type': 'application/json' }
        }
      );
    }

    if (body.message.trim().length < INPUT_LIMITS.message.min) {
      return new Response(
        JSON.stringify({ error: `Message must be at least ${INPUT_LIMITS.message.min} characters` }),
        { 
          status: 400, 
          headers: { ...headers, 'Content-Type': 'application/json' }
        }
      );
    }

    if (body.message.trim().length > INPUT_LIMITS.message.max) {
      return new Response(
        JSON.stringify({ error: `Message must be less than ${INPUT_LIMITS.message.max} characters` }),
        { 
          status: 400, 
          headers: { ...headers, 'Content-Type': 'application/json' }
        }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { 
          status: 400, 
          headers: { ...headers, 'Content-Type': 'application/json' }
        }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get client IP and user agent for security logging
    const forwardedFor = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip');
    // Take only the first IP if multiple are present (format: "client, proxy1, proxy2")
    const clientIP = forwardedFor ? forwardedFor.split(',')[0].trim() : 'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    // Rate limiting check
    const { data: rateLimitData, error: rateLimitError } = await supabase
      .from('rate_limit')
      .select('submission_count, window_start')
      .eq('ip_address', clientIP)
      .single();

    if (rateLimitData) {
      const windowStart = new Date(rateLimitData.window_start);
      const now = new Date();
      const timeDiff = (now.getTime() - windowStart.getTime()) / 1000; // in seconds

      if (timeDiff < RATE_LIMIT_WINDOW) {
        // Within the current window
        if (rateLimitData.submission_count >= RATE_LIMIT_MAX) {
          console.log(`Rate limit exceeded for IP: ${clientIP}`);
          return new Response(
            JSON.stringify({ error: 'Too many requests. Please try again later.' }),
            { 
              status: 429, 
              headers: { 
                ...headers, 
                'Content-Type': 'application/json',
                'Retry-After': String(Math.ceil(RATE_LIMIT_WINDOW - timeDiff))
              }
            }
          );
        }
        
        // Increment counter
        await supabase
          .from('rate_limit')
          .update({ submission_count: rateLimitData.submission_count + 1 })
          .eq('ip_address', clientIP);
      } else {
        // Window expired, reset counter
        await supabase
          .from('rate_limit')
          .update({ 
            submission_count: 1, 
            window_start: now.toISOString() 
          })
          .eq('ip_address', clientIP);
      }
    } else {
      // First submission from this IP
      await supabase
        .from('rate_limit')
        .insert({
          ip_address: clientIP,
          submission_count: 1,
          window_start: new Date().toISOString()
        });
    }

    // Insert contact submission with security metadata
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert({
        name: body.name.trim(),
        email: body.email.trim().toLowerCase(),
        phone: body.phone?.trim() || null,
        subject: body.subject,
        message: body.message.trim(),
        ip_address: clientIP,
        user_agent: userAgent
      })
      .select('id');

    if (error) {
      console.error('Database error:', error);
      throw new Error('Failed to submit contact form');
    }

    // Log with redacted email for privacy
    console.log(`Contact submission received from ${redactEmail(body.email)} (IP: ${clientIP})`);

    // Send emails via SMTP
    try {
      const smtpClient = new SMTPClient({
        connection: {
          hostname: Deno.env.get('SMTP_HOST') || 'mail.codelco.com.ar',
          port: parseInt(Deno.env.get('SMTP_PORT') || '587'),
          tls: true,
          auth: {
            username: Deno.env.get('SMTP_USER') || 'contacto@codelco.com.ar',
            password: Deno.env.get('SMTP_PASSWORD') || '',
          },
        },
        debug: {
          log: true,
        },
      });

      const fromEmail = Deno.env.get('SMTP_FROM_EMAIL') || 'contacto@codelco.com.ar';

      // Map subject codes to readable text
      const subjectMap: Record<string, string> = {
        fabrica: 'Fábrica',
        metalurgica: 'Metalúrgica',
        rental: 'Rental',
        generators: 'Grupos Electrógenos',
        question: 'Pregunta'
      };

      const subjectText = subjectMap[body.subject] || body.subject;

      // Send confirmation email to user
      await smtpClient.send({
        from: fromEmail,
        to: body.email.trim().toLowerCase(),
        subject: 'Confirmación de recepción - Codelco',
        content: 'auto',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #d25840;">Gracias por contactarnos, ${body.name}</h2>
                <p>Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.</p>
                <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                  <p><strong>Asunto:</strong> ${subjectText}</p>
                  <p><strong>Tu mensaje:</strong></p>
                  <p>${body.message}</p>
                </div>
                <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
                <p style="color: #666; font-size: 12px;">
                  Este es un mensaje automático, por favor no respondas a este correo.
                </p>
              </div>
            </body>
          </html>
        `,
      });

      console.log(`✅ Confirmation email sent to ${redactEmail(body.email)}`);

      // Send notification email to company
      await smtpClient.send({
        from: fromEmail,
        to: 'ventas@codelco.com.ar',
        subject: `Nuevo contacto: ${body.name} - ${subjectText}`,
        content: 'auto',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #d25840;">Nuevo mensaje de contacto</h2>
                <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                  <p><strong>Nombre:</strong> ${body.name}</p>
                  <p><strong>Email:</strong> <a href="mailto:${body.email}">${body.email}</a></p>
                  <p><strong>Teléfono:</strong> ${body.phone || 'No proporcionado'}</p>
                  <p><strong>Asunto:</strong> ${subjectText}</p>
                  <p><strong>Mensaje:</strong></p>
                  <p style="white-space: pre-wrap;">${body.message}</p>
                </div>
                <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
                <p style="color: #666; font-size: 12px;">
                  IP: ${clientIP}<br />
                  User Agent: ${userAgent}<br />
                  ID de envío: ${data[0]?.id || 'N/A'}
                </p>
              </div>
            </body>
          </html>
        `,
      });

      console.log('✅ Notification email sent to company');

      await smtpClient.close();
    } catch (emailError) {
      console.error('❌ Email sending error:', emailError);
      // Don't fail the request if email fails - form was still saved
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Contact form submitted successfully',
        id: data[0]?.id
      }),
      {
        headers: { ...headers, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in contact-submit function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }), 
      {
        status: 500,
        headers: { ...headers, 'Content-Type': 'application/json' },
      }
    );
  }
});