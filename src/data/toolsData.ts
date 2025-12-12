export interface Tool {
    id: string;
    name: string;
    description: string;
    category: 'Chatbot' | 'Image' | 'Video' | 'Dev' | 'MCP Server' | 'Productivity' | 'Audio' | 'Research';
    url: string;
    icon: string; // Emoji or URL
    tags: string[];
    isNew?: boolean;
    howToUse?: string[];
    pricing?: 'Free' | 'Freemium' | 'Paid' | 'Open Source';
}

export const toolsData: Tool[] = [
    // --- MCP Servers (The New Hotness) ---
    {
        id: 'mcp-filesystem',
        name: 'Filesystem MCP',
        description: 'Allow LLMs to read and write files on your local machine safely.',
        category: 'MCP Server',
        url: 'https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem',
        icon: '📂',
        tags: ['mcp', 'local', 'files'],
        isNew: true,
        pricing: 'Open Source',
        howToUse: [
            'Install Node.js',
            'Run: npx @modelcontextprotocol/server-filesystem /path/to/folder',
            'Connect via Claude Desktop config'
        ]
    },
    {
        id: 'mcp-github',
        name: 'GitHub MCP',
        description: 'Give AI context about your repositories, issues, and PRs.',
        category: 'MCP Server',
        url: 'https://github.com/modelcontextprotocol/servers/tree/main/src/github',
        icon: '🐙',
        tags: ['mcp', 'git', 'coding'],
        isNew: true,
        pricing: 'Open Source',
        howToUse: [
            'Get GitHub PAT',
            'Run: npx @modelcontextprotocol/server-github',
            'Configure env var GITHUB_PERSONAL_ACCESS_TOKEN'
        ]
    },
    {
        id: 'mcp-postgres',
        name: 'PostgreSQL MCP',
        description: 'Enable read-only or read-write access to your Postgres databases for AI analysis.',
        category: 'MCP Server',
        url: 'https://github.com/modelcontextprotocol/servers/tree/main/src/postgres',
        icon: '🐘',
        tags: ['mcp', 'database', 'sql'],
        pricing: 'Open Source'
    },
    {
        id: 'mcp-slack',
        name: 'Slack MCP',
        description: 'Let AI read channels and summarize threads in your Slack workspace.',
        category: 'MCP Server',
        url: 'https://github.com/modelcontextprotocol/servers',
        icon: '💬',
        tags: ['mcp', 'communication', 'business'],
        pricing: 'Open Source'
    },
    {
        id: 'mcp-google-drive',
        name: 'Google Drive MCP',
        description: 'Access Docs, Sheets, and Slides directly within your LLM context.',
        category: 'MCP Server',
        url: 'https://github.com/modelcontextprotocol/servers',
        icon: '📄',
        tags: ['mcp', 'productivity', 'google'],
        pricing: 'Open Source'
    },
    {
        id: 'mcp-brave-search',
        name: 'Brave Search MCP',
        description: 'Give your local LLM ability to search the web privately.',
        category: 'MCP Server',
        url: 'https://github.com/modelcontextprotocol/servers',
        icon: '🦁',
        tags: ['mcp', 'search', 'web'],
        pricing: 'Open Source'
    },
    {
        id: 'mcp-sentry',
        name: 'Sentry MCP',
        description: 'Analyze error logs and stack traces directly with AI.',
        category: 'MCP Server',
        url: 'https://mcp.so/server/sentry/modelcontextprotocol',
        icon: '🚨',
        tags: ['mcp', 'debugging', 'dev'],
        pricing: 'Open Source'
    },
    {
        id: 'mcp-alphavantage',
        name: 'AlphaVantage',
        description: 'Bring enterprise-grade stock market data to agents and LLMs.',
        category: 'MCP Server',
        url: 'https://mcp.alphavantage.co/',
        icon: '📈',
        tags: ['mcp', 'finance', 'stocks'],
        isNew: true,
        pricing: 'Freemium'
    },
    {
        id: 'mcp-firecrawl',
        name: 'Firecrawl',
        description: 'Powerful web scraping for Cursor, Claude and other LLMs.',
        category: 'MCP Server',
        url: 'https://mcp.so/server/firecrawl-mcp-server/mendableai',
        icon: '🔥',
        tags: ['mcp', 'scraping', 'data'],
        isNew: true,
        pricing: 'Open Source'
    },
    {
        id: 'mcp-redis',
        name: 'Redis',
        description: 'Interact with Redis key-value stores from your LLM.',
        category: 'MCP Server',
        url: 'https://mcp.so/server/redis/modelcontextprotocol',
        icon: '🗄️',
        tags: ['mcp', 'database', 'cache'],
        pricing: 'Open Source'
    },
    {
        id: 'mcp-time',
        name: 'Time',
        description: 'Timezone conversion and current time lookup for LLMs.',
        category: 'MCP Server',
        url: 'https://mcp.so/server/time/modelcontextprotocol',
        icon: '⏰',
        tags: ['mcp', 'utility', 'time'],
        pricing: 'Open Source'
    },
    {
        id: 'mcp-zhipu',
        name: 'Zhipu Web Search',
        description: 'Search engine specifically designed for large models.',
        category: 'MCP Server',
        url: 'https://mcp.so/server/zhipu-web-search/BigModel',
        icon: '�',
        tags: ['mcp', 'search', 'chinese'],
        pricing: 'Open Source'
    },
    {
        id: 'mcp-minimax',
        name: 'MiniMax',
        description: 'Interact with powerful Text to Speech, image, and video generation APIs.',
        category: 'MCP Server',
        url: 'https://mcp.so/server/MiniMax-MCP/MiniMax-AI',
        icon: '🦄',
        tags: ['mcp', 'media', 'generation'],
        pricing: 'Paid'
    },
    {
        id: 'mcp-puppeteer',
        name: 'Puppeteer',
        description: 'Browser automation and web scraping controlled by AI.',
        category: 'MCP Server',
        url: 'https://mcp.so/server/puppeteer/modelcontextprotocol',
        icon: '🎭',
        tags: ['mcp', 'automation', 'testing'],
        pricing: 'Open Source'
    },
    {
        id: 'mcp-gitlab',
        name: 'GitLab',
        description: 'GitLab API integration for project management.',
        category: 'MCP Server',
        url: 'https://mcp.so/server/gitlab/modelcontextprotocol',
        icon: '🦊',
        tags: ['mcp', 'coding', 'git'],
        pricing: 'Open Source'
    },
    {
        id: 'mcp-everart',
        name: 'EverArt',
        description: 'AI image generation using various models via MCP.',
        category: 'MCP Server',
        url: 'https://mcp.so/server/everart/modelcontextprotocol',
        icon: '🎨',
        tags: ['mcp', 'art', 'image'],
        pricing: 'Paid'
    },
    {
        id: 'mcp-aws-kb',
        name: 'AWS Knowledge Base',
        description: 'Retrieve info from AWS KB using Bedrock Agent Runtime.',
        category: 'MCP Server',
        url: 'https://mcp.so/server/aws-kb-retrieval-server/modelcontextprotocol',
        icon: '☁️',
        tags: ['mcp', 'cloud', 'aws'],
        pricing: 'Paid'
    },
    {
        id: 'mcp-playwright',
        name: 'Playwright',
        description: 'Robust browser automation server by Microsoft.',
        category: 'MCP Server',
        url: 'https://mcp.so/server/playwright-mcp/microsoft',
        icon: '🎭',
        tags: ['mcp', 'testing', 'automation'],
        pricing: 'Open Source'
    },
    {
        id: 'mcp-perplexity',
        name: 'Perplexity Ask',
        description: 'Search the web using Perplexity API without leaving context.',
        category: 'MCP Server',
        url: 'https://mcp.so/server/perplexity/ppl-ai',
        icon: '🔎',
        tags: ['mcp', 'search', 'research'],
        pricing: 'Paid'
    },
    {
        id: 'mcp-search1api',
        name: 'Search1API',
        description: 'Unified API for Search, Crawling, and Sitemaps.',
        category: 'MCP Server',
        url: 'https://mcp.so/server/search1api',
        icon: '🕸️',
        tags: ['mcp', 'search', 'dev'],
        pricing: 'Paid'
    },

    // --- Major LLMs & Chatbots ---
    {
        id: 'chatgpt',
        name: 'ChatGPT (OpenAI)',
        description: 'The industry standard. GPT-4o offers multimodal capabilities.',
        category: 'Chatbot',
        url: 'https://chat.openai.com',
        icon: '🟢',
        tags: ['llm', 'text', 'multimodal'],
        pricing: 'Freemium'
    },
    {
        id: 'claude',
        name: 'Claude 3.5 Sonnet',
        description: 'Anthropic\'s top model, excelled at coding and nuance.',
        category: 'Chatbot',
        url: 'https://claude.ai',
        icon: '🟠',
        tags: ['llm', 'coding', 'safe'],
        pricing: 'Freemium'
    },
    {
        id: 'gemini',
        name: 'Google Gemini',
        description: 'Deeply integrated with Google Workspace. Massive context window.',
        category: 'Chatbot',
        url: 'https://gemini.google.com',
        icon: '💠',
        tags: ['llm', 'google', 'context'],
        pricing: 'Freemium'
    },
    {
        id: 'perplexity',
        name: 'Perplexity',
        description: 'AI-powered search engine. Replaces Google for many users.',
        category: 'Productivity',
        url: 'https://perplexity.ai',
        icon: '🔎',
        tags: ['search', 'research'],
        pricing: 'Freemium'
    },
    {
        id: 'grok',
        name: 'Grok 2',
        description: 'X.ai\'s model with real-time access to X (Twitter) data.',
        category: 'Chatbot',
        url: 'https://twitter.com/i/grok',
        icon: '⬛',
        tags: ['llm', 'social', 'uncensored'],
        pricing: 'Paid'
    },

    // --- Dev Tools ---
    {
        id: 'cursor',
        name: 'Cursor',
        description: 'VS Code fork with native AI editing validation.',
        category: 'Dev',
        url: 'https://cursor.sh',
        icon: '🖱️',
        tags: ['editor', 'coding', 'copilot'],
        pricing: 'Freemium'
    },
    {
        id: 'v0',
        name: 'v0 (Vercel)',
        description: 'Generate UI components and websites from text prompts.',
        category: 'Dev',
        url: 'https://v0.dev',
        icon: '▲',
        tags: ['ui', 'react', 'tailwind'],
        isNew: true,
        pricing: 'Freemium'
    },
    {
        id: 'copilot',
        name: 'GitHub Copilot',
        description: 'The ubiquitous AI pair programmer.',
        category: 'Dev',
        url: 'https://github.com/features/copilot',
        icon: '✈️',
        tags: ['coding', 'autocomplete'],
        pricing: 'Paid'
    },
    {
        id: 'bolt',
        name: 'Bolt.new',
        description: 'Prompt to full-stack web app in the browser.',
        category: 'Dev',
        url: 'https://bolt.new',
        icon: '⚡',
        tags: ['fullstack', 'generation'],
        isNew: true,
        pricing: 'Freemium'
    },
    {
        id: 'lovable',
        name: 'Lovable',
        description: 'GPT-4 powered full-stack app builder with Supabase integration.',
        category: 'Dev',
        url: 'https://lovable.dev',
        icon: '💜',
        tags: ['nocode', 'lowcode'],
        pricing: 'Paid'
    },

    // --- Image & Video ---
    {
        id: 'midjourney',
        name: 'Midjourney v6',
        description: 'Highest fidelity AI image generation.',
        category: 'Image',
        url: 'https://midjourney.com',
        icon: '🎨',
        tags: ['art', 'generation'],
        pricing: 'Paid'
    },
    {
        id: 'flux',
        name: 'Flux.1',
        description: 'State-of-the-art open weights image model by Black Forest Labs.',
        category: 'Image',
        url: 'https://flux.1',
        icon: '🌊',
        tags: ['opensource', 'art'],
        isNew: true,
        pricing: 'Open Source'
    },
    {
        id: 'runway',
        name: 'Runway Gen-3 Alpha',
        description: 'Cinematic video generation from text/image.',
        category: 'Video',
        url: 'https://runwayml.com',
        icon: '🎞️',
        tags: ['video', 'movies'],
        pricing: 'Paid'
    },
    {
        id: 'kling',
        name: 'Kling AI',
        description: 'High-consistency video generation model.',
        category: 'Video',
        url: 'https://kling.ai',
        icon: '🎥',
        tags: ['video', '3d'],
        isNew: true,
        pricing: 'Paid'
    },
    {
        id: 'luma',
        name: 'Luma Dream Machine',
        description: 'Fast, high-quality video generation.',
        category: 'Video',
        url: 'https://lumalabs.ai/dream-machine',
        icon: '🌙',
        tags: ['video', '3d'],
        pricing: 'Freemium'
    },

    // --- Audio & Voice ---
    {
        id: 'elevenlabs',
        name: 'ElevenLabs',
        description: 'Best-in-class AI voice cloning and TTS.',
        category: 'Audio',
        url: 'https://elevenlabs.io',
        icon: '🎙️',
        tags: ['voice', 'tts'],
        pricing: 'Freemium'
    },
    {
        id: 'suno',
        name: 'Suno',
        description: 'Generate radio-quality songs from prompt which lyrics.',
        category: 'Audio',
        url: 'https://suno.com',
        icon: '🎵',
        tags: ['music', 'songs'],
        pricing: 'Freemium'
    },
    {
        id: 'udip',
        name: 'Udio',
        description: 'High-fidelity music generation with pro tools.',
        category: 'Audio',
        url: 'https://udio.com',
        icon: '🎧',
        tags: ['music', 'production'],
        pricing: 'Freemium'
    },

    // --- Productivity ---
    {
        id: 'notion-ai',
        name: 'Notion AI',
        description: 'Writing assistant and database analyzer inside Notion.',
        category: 'Productivity',
        url: 'https://notion.so',
        icon: '📓',
        tags: ['writing', 'notes'],
        pricing: 'Paid'
    },
    {
        id: 'mem',
        name: 'Mem',
        description: 'Self-organizing workspace that learns from your notes.',
        category: 'Productivity',
        url: 'https://mem.ai',
        icon: '🧠',
        tags: ['notes', 'pkm'],
        pricing: 'Freemium'
    },
    {
        id: 'zapier',
        name: 'Zapier Central',
        description: 'Teach AI bots to work across 6,000+ apps.',
        category: 'Productivity',
        url: 'https://zapier.com/central',
        icon: '🟠',
        tags: ['automation', 'agents'],
        pricing: 'Freemium'
    },

    // --- Research ---
    {
        id: 'elicit',
        name: 'Elicit',
        description: 'Analyze research papers at scale.',
        category: 'Research',
        url: 'https://elicit.com',
        icon: '🎓',
        tags: ['science', 'papers'],
        pricing: 'Freemium'
    },
    {
        id: 'consensus',
        name: 'Consensus',
        description: 'Search engine for scientific consensus.',
        category: 'Research',
        url: 'https://consensus.app',
        icon: '📚',
        tags: ['science', 'facts'],
        pricing: 'Freemium'
    },

    // --- Open Source / Local ---
    {
        id: 'ollama',
        name: 'Ollama',
        description: 'Run Llama 3, Mistral, and other LLMs locally.',
        category: 'Dev',
        url: 'https://ollama.com',
        icon: '🦙',
        tags: ['local', 'opensource'],
        pricing: 'Open Source',
        howToUse: [
            'Download from ollama.com',
            'Run: ollama run llama3',
            'Enjoy local AI'
        ]
    },
    {
        id: 'lmstudio',
        name: 'LM Studio',
        description: 'Easy GUI to discover and download local LLMs.',
        category: 'Dev',
        url: 'https://lmstudio.ai',
        icon: '🖥️',
        tags: ['local', 'gui'],
        pricing: 'Freemium'
    },
    {
        id: 'huggingface',
        name: 'Hugging Face',
        description: 'The GitHub of AI. Host models, datasets, and demos.',
        category: 'Dev',
        url: 'https://huggingface.co',
        icon: '🤗',
        tags: ['hub', 'models'],
        pricing: 'Freemium'
    }
];
