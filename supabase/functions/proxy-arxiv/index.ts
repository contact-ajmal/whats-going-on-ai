import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const url = new URL(req.url)
        // Try to get target from query param 'url'
        let targetUrl = url.searchParams.get('url')

        // If not in query param, try to extract from path (cors-anywhere style)
        // Format: /proxy-arxiv/https://export.arxiv.org/...
        if (!targetUrl) {
            // url.pathname might be "/proxy-arxiv/https://export.arxiv.org/..."
            // We look for the first occurrence of "http"
            const path = url.pathname
            const httpIndex = path.indexOf('http')
            if (httpIndex !== -1) {
                targetUrl = path.substring(httpIndex) + url.search; // Append original query params if any
            }
        }

        if (!targetUrl) {
            return new Response(JSON.stringify({ error: 'Missing target URL. Usage: /proxy-arxiv?url=... or /proxy-arxiv/https://...' }), {
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            })
        }

        // SECURITY CHECK: Only allow ArXiv URLs
        const targetUrlObj = new URL(targetUrl)
        if (!targetUrlObj.hostname.endsWith('arxiv.org')) {
            return new Response(JSON.stringify({ error: 'Forbidden: Only arxiv.org URLs are allowed.' }), {
                status: 403,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            })
        }

        console.log(`Proxying request to: ${targetUrl}`)
        const response = await fetch(targetUrl)
        const text = await response.text()

        return new Response(text, {
            headers: {
                ...corsHeaders,
                'Content-Type': 'application/xml', // ArXiv returns Atom/XML
            },
        })
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message || 'Unknown error' }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
    }
})
