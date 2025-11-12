import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

// Allow requests from production and Lovable development/preview domains
const ALLOWED_ORIGINS = [
  'https://codelco-rio-negro-web.lovable.app',
  'https://codelco.lovable.app',
  /^https:\/\/.*\.lovableproject\.com$/,
  /^https:\/\/.*\.lovable\.app$/,
];

// Rate limiting: max 60 requests per IP per minute
const RATE_LIMIT_MAX = 60;
const RATE_LIMIT_WINDOW = 60; // 1 minute in seconds

const corsHeaders = (origin: string | null) => {
  const isAllowed = origin && ALLOWED_ORIGINS.some(allowed => 
    typeof allowed === 'string' ? allowed === origin : allowed.test(origin)
  );
  
  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };
};

interface LocationResponse {
  apiKey: string;
  locations: Array<{
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    address: string;
  }>;
}

serve(async (req) => {
  const origin = req.headers.get('origin');
  const headers = corsHeaders(origin);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  // Validate origin is from allowed domains
  const isOriginAllowed = origin && ALLOWED_ORIGINS.some(allowed => 
    typeof allowed === 'string' ? allowed === origin : allowed.test(origin)
  );

  if (!isOriginAllowed) {
    console.warn('Unauthorized origin attempted to access secure-maps:', origin);
    return new Response(
      JSON.stringify({ error: 'Access denied' }), 
      {
        status: 403,
        headers: { ...headers, 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    // Initialize Supabase client for rate limiting
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get client IP for rate limiting
    const forwardedFor = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip');
    const clientIP = forwardedFor ? forwardedFor.split(',')[0].trim() : 'unknown';

    // Rate limiting check
    const { data: rateLimitData } = await supabase
      .from('rate_limit')
      .select('submission_count, window_start')
      .eq('ip_address', clientIP)
      .single();

    if (rateLimitData) {
      const windowStart = new Date(rateLimitData.window_start);
      const now = new Date();
      const timeDiff = (now.getTime() - windowStart.getTime()) / 1000;

      if (timeDiff < RATE_LIMIT_WINDOW) {
        if (rateLimitData.submission_count >= RATE_LIMIT_MAX) {
          console.log(`Rate limit exceeded for IP: ${clientIP} on secure-maps`);
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
        
        await supabase
          .from('rate_limit')
          .update({ submission_count: rateLimitData.submission_count + 1 })
          .eq('ip_address', clientIP);
      } else {
        await supabase
          .from('rate_limit')
          .update({ 
            submission_count: 1, 
            window_start: now.toISOString() 
          })
          .eq('ip_address', clientIP);
      }
    } else {
      await supabase
        .from('rate_limit')
        .insert({
          ip_address: clientIP,
          submission_count: 1,
          window_start: new Date().toISOString()
        });
    }
    
    const GOOGLE_MAPS_API_KEY = Deno.env.get('GOOGLE_MAPS_API_KEY');
    if (!GOOGLE_MAPS_API_KEY) {
      console.error('Google Maps API key not configured');
      throw new Error('Service configuration error');
    }

    // Fetch location data using existing Supabase client
    const { data: locations, error } = await supabase
      .from('Codelco Mapa SA')
      .select('id, name, latitude, longitude, address');

    if (error) {
      console.error('Database error:', error);
      throw new Error('Data retrieval error');
    }

    const response: LocationResponse = {
      apiKey: GOOGLE_MAPS_API_KEY,
      locations: locations || []
    };

    return new Response(JSON.stringify(response), {
      headers: { ...headers, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in secure-maps function:', error);
    return new Response(
      JSON.stringify({ error: 'Service temporarily unavailable' }), 
      {
        status: 500,
        headers: { ...headers, 'Content-Type': 'application/json' },
      }
    );
  }
});