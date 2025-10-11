import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";
import { Resend } from 'npm:resend@2.0.0';

// Restrict CORS to specific domain
const ALLOWED_ORIGIN = 'https://codelco-rio-negro-web.lovable.app';

const corsHeaders = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
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
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405, 
      headers: corsHeaders 
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
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    // Input validation: required fields
    if (!body.name || !body.email || !body.subject || !body.message) {
      return new Response(
        JSON.stringify({ error: 'Name, email, subject, and message are required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Input validation: minimum and maximum length limits
    if (body.name.trim().length < INPUT_LIMITS.name.min) {
      return new Response(
        JSON.stringify({ error: `Name must be at least ${INPUT_LIMITS.name.min} characters` }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    if (body.name.trim().length > INPUT_LIMITS.name.max) {
      return new Response(
        JSON.stringify({ error: `Name must be less than ${INPUT_LIMITS.name.max} characters` }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    if (body.email.trim().length > INPUT_LIMITS.email.max) {
      return new Response(
        JSON.stringify({ error: `Email must be less than ${INPUT_LIMITS.email.max} characters` }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    if (body.phone && body.phone.trim().length > INPUT_LIMITS.phone.max) {
      return new Response(
        JSON.stringify({ error: `Phone must be less than ${INPUT_LIMITS.phone.max} characters` }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    if (body.message.trim().length < INPUT_LIMITS.message.min) {
      return new Response(
        JSON.stringify({ error: `Message must be at least ${INPUT_LIMITS.message.min} characters` }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    if (body.message.trim().length > INPUT_LIMITS.message.max) {
      return new Response(
        JSON.stringify({ error: `Message must be less than ${INPUT_LIMITS.message.max} characters` }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
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
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get client IP and user agent for security logging
    const clientIP = req.headers.get('x-forwarded-for') || 
                    req.headers.get('x-real-ip') || 
                    'unknown';
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
                ...corsHeaders, 
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

    // Send email notification using Resend
    try {
      const resendApiKey = Deno.env.get('RESEND_API_KEY');

      if (!resendApiKey) {
        console.error('Resend API key not configured');
        throw new Error('Email service not configured');
      }

      const resend = new Resend(resendApiKey);

      // Map subject codes to readable text
      const subjectMap: Record<string, string> = {
        fabrica: 'Fábrica',
        metalurgica: 'Metalúrgica',
        rental: 'Rental',
        generators: 'Grupos Electrógenos',
        question: 'Pregunta'
      };

      const subjectText = subjectMap[body.subject] || body.subject;
      const emailSubject = `${body.name} - ${subjectText}`;
      
      const emailBody = `De: ${body.name} (${body.email})\nTeléfono: ${body.phone || 'No proporcionado'}\nAsunto: ${subjectText}\nMensaje: ${body.message}`;

      const emailResponse = await resend.emails.send({
        from: 'Codelco <onboarding@resend.dev>',
        to: ['codelcoweb@gmail.com'],
        subject: emailSubject,
        text: emailBody,
      });

      if (emailResponse.error) {
        console.error('Resend error:', emailResponse.error);
        throw emailResponse.error;
      }

      console.log(`Email sent successfully to codelcoweb@gmail.com - Subject: ${emailSubject}`);
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Continue even if email fails - we still saved to database
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Contact form submitted successfully',
        id: data[0]?.id
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in contact-submit function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});