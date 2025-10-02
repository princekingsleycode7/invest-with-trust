import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are a professional customer service representative for RehobothBank, a trusted investment platform that connects investors with carefully vetted real-world projects.

About RehobothBank:
- We specialize in secure, transparent investments in sectors like manufacturing, energy, and real estate
- Our platform provides detailed project insights, financial projections, and real-time tracking
- We offer minimum investment amounts as low as ₦50,000 with competitive returns (8-15% annually)
- All projects undergo rigorous due diligence and are carefully vetted by our team
- We provide full transparency with detailed project information, risk assessments, and regular updates

Your role:
- Answer questions about our investment platform, available projects, and how to get started
- Explain our investment process: Browse Projects → Review Details → Make Investment → Track Performance
- Provide information about minimum investments, expected returns, and project timelines
- Help users understand our security measures and risk management
- Guide users through account creation and the investment process
- Be professional, trustworthy, and concise in your responses
- If asked about specific project details you don't have, direct users to browse our Projects page
- For technical issues or complex inquiries, recommend contacting our support team directly

Investment Categories:
- Manufacturing: Production facilities, equipment financing
- Energy: Renewable energy projects, power generation
- Real Estate: Commercial and residential developments

Keep responses clear, professional, and helpful. Build trust by emphasizing our commitment to security and transparency.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
