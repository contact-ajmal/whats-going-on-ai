import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Rss } from 'lucide-react';

interface FeedItem {
    id: string;
    title: string;
    date: string;
    description: string;
    author: string;
    link: string;
    tags?: string[];
}

// Scraped data from mcp.so/feed
const feedItems: FeedItem[] = [
    {
        id: 'graphql-agent',
        title: 'GRAPHQL-AGENT',
        date: '1 day ago',
        author: 'TStoneLee',
        description: 'Mcp Yapi Server: Based on Model Context Protocol (MCP), integrate YApi into editors like Cursor to query API docs directly.',
        link: 'https://mcp.so/server/mcp-yapi-server/TStoneLee?utm_source=feed',
        tags: ['API', 'DevTools']
    },
    {
        id: 'alice',
        title: 'Alice Secure Record',
        date: '1 day ago',
        author: 'Karan MG',
        description: 'Secure Record, Upload, Transcribe. A comprehensive tool for handling audio data securely within your workflow.',
        link: 'https://mcp.so/server/alice---secure-record,-upload,-transcribe?utm_source=feed',
        tags: ['Audio', 'Security']
    },
    {
        id: 'openocean',
        title: 'OpenOcean MCP',
        date: '2 days ago',
        author: 'Contact OpenOcean',
        description: 'An MCP server for executing token swaps across multiple decentralized exchanges using OpenOcean\'s aggregation API.',
        link: 'https://mcp.so/server/openocean/openocean-finance?utm_source=feed',
        tags: ['Crypto', 'DeFi']
    },
    {
        id: 'promptheus',
        title: 'Promptheus',
        date: '2 days ago',
        author: 'Abhishek Chandra',
        description: 'AI-powered prompt refinement tool with adaptive questioning. Supports Gemini, Claude, OpenAI, and more. Features 5 MCP tools including refine_prompt and tweak_prompt.',
        link: 'https://mcp.so/server/promptheus/abhichandra21?utm_source=feed',
        tags: ['Prompting', 'AI']
    },
    {
        id: 'hostbento',
        title: 'hostbento',
        date: '2 days ago',
        author: 'Jatin Khosla',
        description: 'Connect ChatGPT, Claude, or any AI assistant to hostbento to design, build, and deploy web apps without leaving the chat.',
        link: 'https://mcp.so/server/hostbento?utm_source=feed',
        tags: ['Deployment', 'Web']
    },
    {
        id: 'contextstream',
        title: 'Contextstream',
        date: '2 days ago',
        author: 'Erik Scott',
        description: 'Persistent memory for AI coding assistants. Works across Cursor, Claude, Windsurf. Remember decisions and analyze dependencies.',
        link: 'https://mcp.so/server/contextstream/ContextStream?utm_source=feed',
        tags: ['Memory', 'Coding']
    },
    {
        id: 'scrapfly',
        title: 'Scrapfly MCP Server',
        date: '2 days ago',
        author: 'Mariia Platonova',
        description: 'Get real-time web data, handle anti-bot systems, and capture screenshots. Integrates with Cursor and LangChain.',
        link: 'https://mcp.so/server/scrapfly-mcp-server/Scrapfly?utm_source=feed',
        tags: ['Scraping', 'Data']
    },
    {
        id: 'supabase-coolify',
        title: 'Supabase Coolify MCP',
        date: '2 days ago',
        author: 'Dan Pearson',
        description: 'Manage self-hosted Supabase instances on Coolify with 52 production-ready tools for migrations, storage, and auth.',
        link: 'https://mcp.so/server/supabase-coolify-mcp-server/dj-pearson?utm_source=feed',
        tags: ['Database', 'DevOps']
    },
    {
        id: 'selfmemory',
        title: 'SelfMemory',
        date: '4 days ago',
        author: 'Shrijayan Rajendran',
        description: 'Open-source universal memory engine. Store and retrieve AI conversations and context across different models.',
        link: 'https://mcp.so/server/selfmemory/SelfMemory?utm_source=feed',
        tags: ['Memory', 'OpenSource']
    },
    {
        id: 'android-toolkit',
        title: 'Android MCP Toolkit',
        date: '4 days ago',
        author: 'Nguyen Van Nam',
        description: 'Collection of MCP tools for Android Development. Features Figma-to-XML converter and upcoming Gradle analysis.',
        link: 'https://mcp.so/server/android-mcp-toolkit/Nam0101?utm_source=feed',
        tags: ['Mobile', 'Android']
    }
];

export function MCPFeed() {
    return (
        <div className="w-full max-w-4xl mx-auto py-8">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <Rss className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white">Latest MCP Updates</h2>
                    <p className="text-sm text-muted-foreground">Fresh servers and tools from the community</p>
                </div>
            </div>

            <div className="space-y-4">
                {feedItems.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <Card className="p-4 bg-white/5 border-white/10 hover:border-blue-500/30 transition-all duration-300 group">
                            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                                <div className="space-y-2 flex-grow">
                                    <div className="flex items-center gap-3">
                                        <h3 className="font-bold text-lg text-blue-100 group-hover:text-blue-400 transition-colors">
                                            {item.title}
                                        </h3>
                                        <span className="text-xs text-muted-foreground bg-white/5 px-2 py-0.5 rounded border border-white/5">
                                            {item.date}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-2 md:line-clamp-1">
                                        {item.description}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-muted-foreground">by <span className="text-white/80">{item.author}</span></span>
                                        {item.tags?.map(tag => (
                                            <Badge key={tag} variant="outline" className="text-[10px] h-4 px-1 border-white/10 text-slate-400">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <Button size="sm" variant="ghost" className="shrink-0 hover:bg-blue-500/10 hover:text-blue-400" asChild>
                                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                                        View <ExternalLink className="w-4 h-4 ml-2" />
                                    </a>
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="mt-8 text-center">
                <Button variant="outline" className="bg-transparent border-white/10 hover:bg-white/5 text-muted-foreground" asChild>
                    <a href="https://mcp.so/feed" target="_blank" rel="noopener noreferrer">
                        View all updates on mcp.so
                    </a>
                </Button>
            </div>
        </div>
    );
}
