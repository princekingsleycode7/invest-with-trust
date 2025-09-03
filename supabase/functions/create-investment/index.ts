import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // Get the authenticated user
    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;

    if (!user?.email) {
      throw new Error('User not authenticated');
    }

    const { amount, currency = 'USD' } = await req.json();

    if (!amount || amount <= 0) {
      throw new Error('Valid amount is required');
    }

    // Generate a unique reference for this investment
    const reference = `INV_${Date.now()}_${user.id.substring(0, 8)}`;

    // Prepare Korapay checkout data
    const checkoutData = {
      amount: amount,
      currency: currency,
      reference: reference,
      narration: `Investment of ${amount} ${currency}`,
      channels: ["card", "bank_transfer"],
      customer: {
        name: user.user_metadata?.full_name || user.email,
        email: user.email
      },
      notification_url: `${Deno.env.get('SUPABASE_URL')}/functions/v1/korapay-webhook`,
      redirect_url: `${req.headers.get('origin')}/dashboard?investment=success`,
      merchant_bears_cost: true
    };

    console.log('Creating Korapay checkout session:', { reference, amount, currency });

    // Initialize Korapay checkout
    const korapayResponse = await fetch('https://api.korapay.com/merchant/api/v1/charges/initialize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('KORAPAY_SECRET_KEY')}`
      },
      body: JSON.stringify(checkoutData)
    });

    if (!korapayResponse.ok) {
      const errorText = await korapayResponse.text();
      console.error('Korapay API error:', errorText);
      throw new Error(`Korapay API error: ${korapayResponse.status}`);
    }

    const korapayResult = await korapayResponse.json();
    console.log('Korapay response:', korapayResult);

    if (!korapayResult.status || !korapayResult.data?.checkout_url) {
      throw new Error('Failed to create Korapay checkout session');
    }

    // Store the investment record in our database
    const serviceClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { error: insertError } = await serviceClient
      .from('investments')
      .insert({
        user_id: user.id,
        amount: amount,
        currency: currency,
        reference: reference,
        status: 'pending',
        korapay_reference: korapayResult.data.reference,
        created_at: new Date().toISOString()
      });

    if (insertError) {
      console.error('Database insert error:', insertError);
      throw new Error('Failed to save investment record');
    }

    return new Response(
      JSON.stringify({
        success: true,
        checkout_url: korapayResult.data.checkout_url,
        reference: reference
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Investment creation error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});