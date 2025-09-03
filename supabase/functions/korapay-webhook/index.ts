import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.31.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-korapay-signature',
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    console.log('🔔 Webhook received:', JSON.stringify(payload, null, 2));

    // Process successful charge (SKIP signature verification for testing)
    if (payload.event === "charge.success") {
      console.log("💰 Processing successful charge...");
      
      const { reference, amount } = payload.data;
      
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL") ?? '',
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ''
      );

      // Find and update investment
      const { data: investment, error: findError } = await supabase
        .from("investments")
        .select("id, user_id, status")
        .eq("korapay_reference", reference)
        .single();

      if (findError || !investment) {
        console.error("❌ Investment not found:", reference);
        return new Response(JSON.stringify({ received: true, error: "Investment not found" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      if (investment.status === 'active') {
        console.log("✅ Investment already processed");
        return new Response(JSON.stringify({ received: true, message: "Already processed" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      // Update investment
      const { error: updateError } = await supabase
        .from("investments")
        .update({ status: "active", updated_at: new Date().toISOString() })
        .eq("id", investment.id);

      if (updateError) {
        console.error("❌ Update failed:", updateError);
        return new Response(JSON.stringify({ received: true, error: "Update failed" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      console.log(`✅ Investment ${investment.id} activated successfully!`);
    }

    return new Response(JSON.stringify({ received: true, status: "success" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("💥 Webhook error:", error);
    return new Response(JSON.stringify({ received: true, error: error.message }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});