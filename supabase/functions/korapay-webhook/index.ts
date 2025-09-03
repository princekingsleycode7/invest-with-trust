import { serve } from "https://deno.land/std@0.204.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const KORAPAY_SECRET_KEY = Deno.env.get("KORAPAY_SECRET_KEY");
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Function to verify the signature from Korapay using Web Crypto API
async function verifySignature(signature: string, body: unknown): Promise<boolean> {
  if (!KORAPAY_SECRET_KEY) {
    console.error("KORAPAY_SECRET_KEY is not set.");
    return false;
  }

  try {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(KORAPAY_SECRET_KEY),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const bodyText = JSON.stringify(body);
    const signatureBuffer = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(bodyText)
    );

    const calculatedSignature = Array.from(new Uint8Array(signatureBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    return calculatedSignature === signature;
  } catch (error) {
    console.error("Error verifying signature:", error);
    return false;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const signature = req.headers.get("x-korapay-signature");
    const body = await req.json();

    // Verify the webhook signature for security
    if (!verifySignature(signature, body)) {
      console.warn("Invalid webhook signature received.");
      return new Response("Invalid signature", { status: 401 });
    }

    console.log("Webhook event received:", body.event);

    // Handle successful charge event
    if (body.event === "charge.success") {
      const { reference, amount, customer } = body.data;

      const serviceClient = createClient(
        Deno.env.get("SUPABASE_URL") ?? '',
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ''
      );

      // Find the investment record using the Korapay reference
      const { data: investment, error: fetchError } = await serviceClient
        .from("investments")
        .select("id, user_id, status")
        .eq("korapay_reference", reference)
        .single();

      if (fetchError || !investment) {
        console.error("Investment not found for reference:", reference, fetchError);
        return new Response("Investment not found", { status: 404 });
      }
      
      // Prevent reprocessing a completed transaction
      if (investment.status === 'active') {
        console.log("Investment already processed:", reference);
        return new Response(JSON.stringify({ received: true, message: "Already processed" }));
      }

      // Update investment status to 'active'
      const { error: updateError } = await serviceClient
        .from("investments")
        .update({ status: "active", updated_at: new Date().toISOString() })
        .eq("id", investment.id);

      if (updateError) {
        console.error("Failed to update investment status:", updateError);
        throw new Error("Failed to update investment status");
      }

      // Increment the user's total invested amount
      const { error: rpcError } = await serviceClient.rpc('increment_total_invested', {
        user_id_param: investment.user_id,
        amount_param: amount
      });

      if (rpcError) {
        console.error("Failed to update user profile (total_invested):", rpcError);
        // This is not ideal, but we won't fail the whole webhook for this.
        // A reconciliation job might be needed for such cases.
      }
      
      console.log(`Successfully processed investment ${investment.id} for user ${investment.user_id}.`);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Webhook processing error:", error.message);
    return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  }
});
