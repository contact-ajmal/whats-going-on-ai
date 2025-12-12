import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    // Handle CORS
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        // Fetch from Hugging Face Datasets Server (Open LLM Leaderboard)
        // We fetch the 'train' split which contains the results
        const HF_API_URL = "https://datasets-server.huggingface.co/rows?dataset=open-llm-leaderboard/results&config=default&split=train&length=50";

        console.log(`Fetching from: ${HF_API_URL}`);
        const response = await fetch(HF_API_URL);

        if (!response.ok) {
            throw new Error(`Hugging Face API Error: ${response.statusText}`);
        }

        const data = await response.json();

        // Transform the raw rows into our UI Model format
        // columns usually: model_name, type, architecture, precision, average, arc, hellaswag, mmlu, truthfulqa, winogrande, gsm8k
        const models = data.rows.map((row: any) => {
            const r = row.row;

            // Calculate a pseudo-tier based on Top 50 placement and score
            // This is a rough heuristic for display purposes
            let tier = 'B';
            if (r.average > 75) tier = 'S';
            else if (r.average > 60) tier = 'A';

            // Extract provider from name (e.g. "meta-llama/Llama-2-70b" -> "meta-llama")
            const nameParts = (r.model_name || "Unknown/Model").split('/');
            const provider = nameParts.length > 1 ? nameParts[0] : "Community";
            const shortName = nameParts.length > 1 ? nameParts[1] : nameParts[0];

            return {
                id: r.model_name || Math.random().toString(),
                name: shortName,
                provider: provider,
                tier: tier,
                scores: {
                    // We map 'average' to 'elo' for sorting, but we'll display it as Average
                    elo: r.average ? parseFloat(r.average.toFixed(2)) : 0,
                    // MMLU is a good proxy for 'Reasoning'
                    reasoning: r.mmlu ? parseFloat(r.mmlu.toFixed(2)) : 0,
                    // GSM8K (Math) is the closest proxy to 'Coding' usually available in this specific dataset summary
                    // If distinct coding benchmark is missing, we use GSM8K or fallback
                    coding: r.gsm8k ? parseFloat(r.gsm8k.toFixed(2)) : 0,
                    context: "Unknown" // Dataset doesn't always have this
                },
                tags: [r.type || "LLM", r.precision || ""]
            };
        });

        // Sort by Average score (descending)
        models.sort((a: any, b: any) => b.scores.elo - a.scores.elo);

        const result = {
            updated: new Date().toISOString(),
            models: models,
            source: "huggingface-open-llm-leaderboard"
        };

        return new Response(JSON.stringify(result), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })

    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500,
        })
    }
})
