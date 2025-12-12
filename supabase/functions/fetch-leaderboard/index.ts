import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Manually curated "Live" data to serve from the Edge
// This allows us to update it on the fly without redeploying the frontend
const LIVE_MODELS = [
    {
        id: 'gpt-4o',
        name: 'GPT-4o-2024-05-13',
        provider: 'OpenAI',
        tier: 'S',
        scores: { elo: 1287, coding: 90.2, reasoning: 88.7, context: '128k' },
        tags: ['Multimodal', 'Fast']
    },
    {
        id: 'gemini-1-5-pro',
        name: 'Gemini 1.5 Pro-Latest',
        provider: 'Google',
        tier: 'S',
        scores: { elo: 1261, coding: 87.1, reasoning: 85.9, context: '2M' },
        tags: ['Long Context']
    },
    {
        id: 'claude-3-5-sonnet',
        name: 'Claude 3.5 Sonnet',
        provider: 'Anthropic',
        tier: 'S',
        scores: { elo: 1272, coding: 92.0, reasoning: 88.3, context: '200k' },
        tags: ['Coding King']
    },
    {
        id: 'gpt-4-turbo',
        name: 'GPT-4 Turbo-2024-04-09',
        provider: 'OpenAI',
        tier: 'S',
        scores: { elo: 1257, coding: 85.4, reasoning: 86.5, context: '128k' },
        tags: ['Reliable']
    },
    {
        id: 'claude-3-opus',
        name: 'Claude 3 Opus',
        provider: 'Anthropic',
        tier: 'S',
        scores: { elo: 1248, coding: 84.9, reasoning: 86.8, context: '200k' },
        tags: ['Writer']
    },
    {
        id: 'llama-3-70b',
        name: 'Llama 3-70B-Instruct',
        provider: 'Meta',
        tier: 'A',
        scores: { elo: 1208, coding: 81.7, reasoning: 82.0, context: '8k' },
        tags: ['Open Weights']
    },
    {
        id: 'mistral-large',
        name: 'Mistral Large 2',
        provider: 'Mistral',
        tier: 'A',
        scores: { elo: 1230, coding: 84.4, reasoning: 84.0, context: '128k' },
        tags: ['European']
    },
    {
        id: 'qwen-2-72b',
        name: 'Qwen2-72B-Instruct',
        provider: 'Alibaba',
        tier: 'A',
        scores: { elo: 1180, coding: 80.0, reasoning: 79.0, context: '32k' },
        tags: ['Open Weights']
    }
];

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        // In a future update, this will connect to @gradio/client
        // const client = await Client.connect("lmsys/chatbot-arena-leaderboard");
        // const result = await client.predict(...);

        const result = {
            updated: new Date().toISOString(),
            models: LIVE_MODELS,
            source: "live-edge-feed"
        };

        return new Response(JSON.stringify(result), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
        })
    }
})
