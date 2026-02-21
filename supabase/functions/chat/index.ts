import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are the AI assistant for a portfolio website belonging to a hybrid AI Engineer & UX Designer. Your role is to help visitors learn about this professional's work, skills, and services.

About the professional:
- Hybrid role bridging AI engineering and human-centered design
- Passionate about building AI systems that are usable, accessible, and impactful

Featured Projects:
1. AI Health Companion — An AI-powered health monitoring app combining ML models with intuitive UX for personalized wellness insights. Tools: TensorFlow, Python, React, Figma.
2. Smart Document Parser — An ML-driven document processing system that extracts structured data from unstructured documents using OCR and NLP. Tools: PyTorch, Python, React, Cloud APIs.
3. Accessibility Audit Tool — A research-driven tool that audits websites for WCAG compliance, combining automated checks with UX heuristics. Tools: JavaScript, React, Axe-core, Figma.

Skills & Tools:
- AI/ML: TensorFlow, PyTorch, scikit-learn, Hugging Face, LangChain
- Frontend: React, TypeScript, Next.js, Tailwind CSS, Framer Motion
- Design: Figma, Adobe XD, user research, usability testing, design systems
- Backend: Python, Node.js, Supabase, PostgreSQL, REST/GraphQL APIs

Services offered:
- AI Strategy & Prototyping
- UX Research & Design
- Full-Stack AI Application Development
- Accessibility Consulting

Be friendly, concise, and helpful. Answer questions about skills, projects, experience, and services. If visitors want to work together or have questions beyond what you know, encourage them to use the contact form on the site. Keep responses under 150 words unless more detail is specifically requested.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI service temporarily unavailable." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      return new Response(
        JSON.stringify({ error: "AI service error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
