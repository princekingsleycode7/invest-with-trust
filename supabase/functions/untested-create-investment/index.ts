import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // ✅ Client for user authentication
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const authHeader = req.headers.get("Authorization") || "";
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);

    if (userError || !userData.user) {
      throw new Error("User not authenticated");
    }

    const user = userData.user;
    const { amount, currency = "NGN", project_id } = await req.json();

    if (!amount || amount <= 0) {
      throw new Error("Valid amount is required");
    }

    const reference = `INV_${Date.now()}_${user.id.substring(0, 8)}`;

    // ✅ Prepare checkout data
    const checkoutData = {
      amount,
      currency,
      reference,
      narration: `Investment of ${amount} ${currency}`,
      channels: ["card", "bank_transfer"],
      customer: {
        name: user.user_metadata?.full_name || user.email,
        email: user.email,
      },
      notification_url: `${Deno.env.get("SUPABASE_URL")}/functions/v1/korapay-webhook`,
      redirect_url: `${req.headers.get("origin")}/dashboard?investment=success`,
      merchant_bears_cost: true,
      metadata: { project_id }, // ✅ keep track of project
    };

    console.log("➡️ Sending checkout to Korapay:", checkoutData);

    const korapayResponse = await fetch(
      "https://api.korapay.com/merchant/api/v1/charges/initialize",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Deno.env.get("KORAPAY_SECRET_KEY")}`,
        },
        body: JSON.stringify(checkoutData),
      }
    );

    const korapayResult = await korapayResponse.json();
    console.log("✅ Korapay result:", korapayResult);

    if (!korapayResponse.ok) {
      throw new Error(`Korapay error: ${JSON.stringify(korapayResult)}`);
    }

    // ⚠️ Sometimes Korapay returns {status: "success"} instead of true
    const checkoutUrl = korapayResult?.data?.checkout_url;
    if (!checkoutUrl) {
      throw new Error("No checkout URL in Korapay response");
    }

    // ✅ Use service client to insert into DB
    const serviceClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { error: insertError } = await serviceClient
      .from("investments")
      .insert({
        user_id: user.id,
        amount,
        currency,
        reference,
        status: "pending",
        korapay_reference: korapayResult.data.reference,
        project_id,
        created_at: new Date().toISOString(),
      });

    if (insertError) {
      console.error("❌ DB insert error:", insertError);
      throw new Error("Failed to save investment record");
    }

    return new Response(
      JSON.stringify({
        success: true,
        checkout_url: checkoutUrl,
        reference,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (err) {
    console.error("❌ Investment creation error:", err);
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
