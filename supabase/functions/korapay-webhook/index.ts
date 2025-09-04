import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.31.0';
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-korapay-signature'
};
// Simple signature verification function
async function verifyKorapaySignature(signature, dataObject, secretKey) {
  try {
    const encoder = new TextEncoder();
    // Create HMAC key
    const key = await crypto.subtle.importKey("raw", encoder.encode(secretKey), {
      name: "HMAC",
      hash: "SHA-256"
    }, false, [
      "sign"
    ]);
    // Sign ONLY the data object (not the entire payload)
    const dataString = JSON.stringify(dataObject);
    const signatureBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(dataString));
    // Convert to hex string
    const calculatedSignature = Array.from(new Uint8Array(signatureBuffer)).map((b)=>b.toString(16).padStart(2, '0')).join('');
    console.log("Data being signed:", dataString);
    console.log("Calculated signature:", calculatedSignature);
    console.log("Received signature:", signature);
    return calculatedSignature === signature;
  } catch (error) {
    console.error("Signature verification error:", error);
    return false;
  }
}
serve(async (req)=>{
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: corsHeaders
    });
  }
  try {
    // Parse the webhook payload
    const payload = await req.json();
    console.log('Webhook received:', JSON.stringify(payload, null, 2));
    // Get your secret key (should be sk_test_xxx or sk_live_xxx)
    const secretKey = Deno.env.get('KORAPAY_SECRET_KEY');
    if (!secretKey) {
      console.error("Secret key not found in environment");
      return new Response("Configuration error", {
        status: 500
      });
    }
    // Get signature from headers
    const receivedSignature = req.headers.get('x-korapay-signature');
    if (!receivedSignature) {
      console.error("No signature in headers");
      return new Response("No signature", {
        status: 401
      });
    }
    // Verify signature using ONLY the data object
    const isValidSignature = await verifyKorapaySignature(receivedSignature, payload.data, secretKey);
    if (!isValidSignature) {
      console.error("Invalid signature");
      return new Response("Invalid signature", {
        status: 401
      });
    }
    console.log("✅ Signature verified successfully");
    // Process successful charge
    if (payload.event === "charge.success") {
      console.log("Processing successful charge...");
      const { reference, amount, status } = payload.data;
      // Create Supabase client
      const supabase = createClient(Deno.env.get("SUPABASE_URL") ?? '', Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? '');
      // Find investment by reference
      const { data: investment, error: findError } = await supabase.from("investments").select("id, user_id, status").eq("korapay_reference", reference).single();
      if (findError || !investment) {
        console.error("Investment not found:", reference, findError);
        return new Response("Investment not found", {
          status: 404
        });
      }
      // Skip if already processed
      if (investment.status === 'active') {
        console.log("Investment already active, skipping");
        return new Response(JSON.stringify({
          received: true,
          message: "Already processed"
        }), {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json"
          }
        });
      }
      // Update investment to active
      const { error: updateError } = await supabase.from("investments").update({
        status: "active",
        updated_at: new Date().toISOString()
      }).eq("id", investment.id);
      if (updateError) {
        console.error("Failed to update investment:", updateError);
        throw new Error("Database update failed");
      }
      // Update user's total invested amount
      const { error: rpcError } = await supabase.rpc('increment_total_invested', {
        user_id_param: investment.user_id,
        amount_param: amount
      });
      if (rpcError) {
        console.error("Failed to update user total:", rpcError);
      // Don't throw error here, investment is already updated
      }
      console.log(`✅ Successfully processed investment ${investment.id} for user ${investment.user_id}`);
    }
    // Always respond with 200 to acknowledge receipt
    return new Response(JSON.stringify({
      received: true
    }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Webhook error:", error);
    // Still return 200 to prevent retries for parsing errors
    return new Response(JSON.stringify({
      error: "Processing failed",
      received: true
    }), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json"
      }
    });
  }
});
