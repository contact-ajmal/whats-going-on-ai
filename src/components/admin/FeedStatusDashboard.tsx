import { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle, XCircle, AlertTriangle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface FeedStatus {
    id: string;
    name: string;
    url: string; // The specific API/Proxy URL we check
    displayUrl: string; // The readable RSS source
    status: 'pending' | 'healthy' | 'error' | 'warning';
    latency?: number;
    lastChecked?: string;
    errorMessage?: string;
}

const FEEDS: Omit<FeedStatus, 'status'>[] = [
    {
        id: 'news-techmeme',
        name: 'Techmeme',
        displayUrl: 'techmeme.com/feed.xml',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.techmeme.com/feed.xml'
    },
    {
        id: 'news-google',
        name: 'Google News (AI)',
        displayUrl: 'news.google.com',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://news.google.com/rss/search?q=Artificial+Intelligence+when:7d&hl=en-US&gl=US&ceid=US:en'
    },
    {
        id: 'news-openai',
        name: 'OpenAI Blog',
        displayUrl: 'openai.com/news/rss.xml',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://openai.com/news/rss.xml'
    },
    {
        id: 'news-mit',
        name: 'MIT Tech Review',
        displayUrl: 'technologyreview.com',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.technologyreview.com/topic/artificial-intelligence/feed/'
    },
    {
        id: 'news-verge',
        name: 'The Verge (AI)',
        displayUrl: 'theverge.com',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.theverge.com/rss/ai-artificial-intelligence/index.xml'
    },
    {
        id: 'news-google-blog',
        name: 'Google Blog',
        displayUrl: 'blog.google',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://blog.google/rss'
    },
    {
        id: 'research-arxiv',
        name: 'ArXiv (CS.AI)',
        displayUrl: 'arxiv.org',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=http://export.arxiv.org/rss/cs.AI'
    },
    {
        id: 'api-devto',
        name: 'Dev.to API',
        displayUrl: 'dev.to/api/articles',
        url: 'https://dev.to/api/articles?tag=ai&per_page=1'
    },
    {
        id: 'api-github',
        name: 'GitHub Trending',
        displayUrl: 'api.github.com',
        url: 'https://api.github.com/search/repositories?q=topic:artificial-intelligence&sort=stars&order=desc&per_page=1'
    }
];

export function FeedStatusDashboard() {
    const [feeds, setFeeds] = useState<FeedStatus[]>(
        FEEDS.map(f => ({ ...f, status: 'pending' }))
    );
    const [isChecking, setIsChecking] = useState(false);
    const [lastRun, setLastRun] = useState<string | null>(null);

    const checkAllFeeds = async () => {
        setIsChecking(true);
        const results = await Promise.all(FEEDS.map(async (feed) => {
            const start = performance.now();
            try {
                const res = await fetch(feed.url);
                const end = performance.now();
                const latency = Math.round(end - start);

                if (!res.ok) {
                    return {
                        ...feed,
                        status: 'error',
                        errorMessage: `HTTP ${res.status}`,
                        latency,
                        lastChecked: new Date().toLocaleTimeString()
                    } as FeedStatus;
                }

                const data = await res.json();
                // Basic validation: does it have items?
                const hasItems = Array.isArray(data.items) ? data.items.length > 0 :
                    Array.isArray(data) ? data.length > 0 : // dev.to returns array
                        data.items ? true : false; // GitHub items

                return {
                    ...feed,
                    status: hasItems ? 'healthy' : 'warning',
                    errorMessage: hasItems ? undefined : 'No items found',
                    latency,
                    lastChecked: new Date().toLocaleTimeString()
                } as FeedStatus;

            } catch (err: any) {
                return {
                    ...feed,
                    status: 'error',
                    errorMessage: err.message || 'Fetch failed',
                    latency: 0,
                    lastChecked: new Date().toLocaleTimeString()
                } as FeedStatus;
            }
        }));

        setFeeds(results);
        setIsChecking(false);
        setLastRun(new Date().toLocaleString());
    };

    // Auto-check on mount
    useEffect(() => {
        checkAllFeeds();
    }, []);

    return (
        <Card className="bg-black/40 border-white/10 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                        <RefreshCw className={`w-5 h-5 ${isChecking ? 'animate-spin text-primary' : 'text-muted-foreground'}`} />
                        System Health & Feeds
                    </CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">
                        Monitoring {feeds.length} external data sources
                        {lastRun && ` • Last checked: ${lastRun}`}
                    </p>
                </div>
                <Button
                    onClick={checkAllFeeds}
                    disabled={isChecking}
                    variant="outline"
                    size="sm"
                    className="border-primary/20 hover:bg-primary/10 hover:text-primary"
                >
                    {isChecking ? 'Scanning...' : 'Run Diagnostics'}
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-1">
                    {feeds.map((feed) => (
                        <div
                            key={feed.id}
                            className="grid grid-cols-12 items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
                        >
                            {/* Status Icon */}
                            <div className="col-span-1 flex justify-center">
                                {feed.status === 'healthy' && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                                {feed.status === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-500" />}
                                {feed.status === 'error' && <XCircle className="w-5 h-5 text-red-500" />}
                                {feed.status === 'pending' && <div className="w-4 h-4 rounded-full border-2 border-muted border-t-transparent animate-spin" />}
                            </div>

                            {/* Name & URL */}
                            <div className="col-span-5 md:col-span-4">
                                <div className="font-medium text-sm text-white">{feed.name}</div>
                                <div className="text-xs text-muted-foreground truncate font-mono">{feed.displayUrl}</div>
                            </div>

                            {/* Status Badge */}
                            <div className="col-span-3 md:col-span-2 text-center">
                                <Badge variant="outline" className={`
                                    ${feed.status === 'healthy' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : ''}
                                    ${feed.status === 'warning' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : ''}
                                    ${feed.status === 'error' ? 'bg-red-500/10 text-red-400 border-red-500/20' : ''}
                                    ${feed.status === 'pending' ? 'bg-muted/10 text-muted-foreground' : ''}
                                `}>
                                    {feed.status.toUpperCase()}
                                </Badge>
                            </div>

                            {/* Latency */}
                            <div className="hidden md:block col-span-2 text-right">
                                {feed.latency !== undefined && (
                                    <span className={`text-xs font-mono ${(feed.latency > 1000) ? 'text-yellow-500' : 'text-muted-foreground'}`}>
                                        {feed.latency}ms
                                    </span>
                                )}
                            </div>

                            {/* Error / Actions */}
                            <div className="col-span-3 md:col-span-3 text-right">
                                {feed.errorMessage ? (
                                    <span className="text-xs text-red-400 truncate block max-w-[150px] ml-auto" title={feed.errorMessage}>
                                        {feed.errorMessage}
                                    </span>
                                ) : (
                                    <a
                                        href={feed.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-white transition-colors"
                                    >
                                        Raw JSON <ExternalLink className="w-3 h-3" />
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
