import { useState, useEffect, useCallback } from 'react';
import { RefreshCw, CheckCircle, XCircle, AlertTriangle, ExternalLink, Info, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface FeedStatus {
    id: string;
    name: string;
    url: string;
    displayUrl: string;
    status: 'pending' | 'healthy' | 'error' | 'warning' | 'cached';
    latency?: number;
    lastChecked?: string;
    errorMessage?: string;
}

interface CachedFeedData {
    feeds: FeedStatus[];
    timestamp: number;
}

const CACHE_KEY = 'feed_status_cache';
const CACHE_DURATION_MS = 60 * 60 * 1000; // 1 hour

// All feeds - full list
const FEEDS: Omit<FeedStatus, 'status'>[] = [
    // --- NEWS ---
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
        url: 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent('https://news.google.com/rss/search?q=Artificial+Intelligence+when:7d&hl=en-US&gl=US&ceid=US:en')
    },
    {
        id: 'news-hn',
        name: 'Hacker News (AI)',
        displayUrl: 'hnrss.org',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://hnrss.org/newest?q=AI'
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
        id: 'news-deepmind',
        name: 'Google DeepMind',
        displayUrl: 'blog.research.google',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://blog.research.google/atom.xml'
    },
    {
        id: 'news-google-blog',
        name: 'Google Blog',
        displayUrl: 'blog.google',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://blog.google/rss'
    },

    // --- RESEARCH ---
    {
        id: 'research-arxiv-ai',
        name: 'ArXiv (CS.AI)',
        displayUrl: 'arxiv.org/cs.AI',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=http://arxiv.org/rss/cs.AI'
    },
    {
        id: 'research-arxiv-ml',
        name: 'ArXiv (CS.LG)',
        displayUrl: 'arxiv.org/cs.LG',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=http://arxiv.org/rss/cs.LG'
    },
    {
        id: 'research-arxiv-cl',
        name: 'ArXiv (CS.CL)',
        displayUrl: 'arxiv.org/cs.CL',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=http://arxiv.org/rss/cs.CL'
    },
    {
        id: 'research-huggingface',
        name: 'Hugging Face Papers',
        displayUrl: 'huggingface.co/api/daily_papers',
        url: 'https://huggingface.co/api/daily_papers'
    },

    // --- JOBS ---
    {
        id: 'jobs-remoteok',
        name: 'RemoteOK',
        displayUrl: 'remoteok.com',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://remoteok.com/rss'
    },

    // --- VIDEOS (YouTube) ---
    {
        id: 'video-coldfusion',
        name: 'YouTube: ColdFusion',
        displayUrl: 'youtube.com/ColdFusion',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=UC4QZ_LsYcvcq7qOsOhpAX4A'
    },
    {
        id: 'video-aigrid',
        name: 'YouTube: The AI Grid',
        displayUrl: 'youtube.com/@TheAIGrid',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=UCjkPdS2bTMC4zxr3FbqVIWA'
    },
    {
        id: 'video-twominutepapers',
        name: 'YouTube: Two Minute Papers',
        displayUrl: 'youtube.com/TwoMinutePapers',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=UCbfYPyITQ-7l4upoX8nvctg'
    },
    {
        id: 'video-aiexplained',
        name: 'YouTube: AI Explained',
        displayUrl: 'youtube.com/@AIExplained',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=UCNJ1Ymd5yFuUPtn21xtRbbw'
    },
    {
        id: 'video-deepmind',
        name: 'YouTube: Google DeepMind',
        displayUrl: 'youtube.com/GoogleDeepMind',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=UCP7jMXSY2xbc3KCAE0MHQ-A'
    },
    {
        id: 'video-fireship',
        name: 'YouTube: Fireship',
        displayUrl: 'youtube.com/@Fireship',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=UCsBjURrPoezykLs9EqgamOA'
    },

    // --- API (Direct - no proxy) ---
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
    const [rateLimitWarning, setRateLimitWarning] = useState(false);
    const [usingCache, setUsingCache] = useState(false);
    const [nextSyncIn, setNextSyncIn] = useState<string | null>(null);

    // Load from cache on mount
    useEffect(() => {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
            try {
                const data: CachedFeedData = JSON.parse(cached);
                const age = Date.now() - data.timestamp;

                if (age < CACHE_DURATION_MS) {
                    // Use cached data
                    setFeeds(data.feeds.map(f => ({ ...f, status: f.status === 'pending' ? 'cached' : f.status })));
                    setLastRun(new Date(data.timestamp).toLocaleString());
                    setUsingCache(true);

                    // Show time until next sync
                    const remaining = CACHE_DURATION_MS - age;
                    const mins = Math.ceil(remaining / 60000);
                    setNextSyncIn(`${mins} min`);
                    return;
                }
            } catch (e) {
                console.error('Failed to parse feed cache:', e);
            }
        }

        // No valid cache, run fresh check
        checkAllFeeds();
    }, []);

    // Update countdown timer
    useEffect(() => {
        if (!usingCache) return;

        const interval = setInterval(() => {
            const cached = localStorage.getItem(CACHE_KEY);
            if (cached) {
                const data: CachedFeedData = JSON.parse(cached);
                const age = Date.now() - data.timestamp;
                const remaining = CACHE_DURATION_MS - age;

                if (remaining <= 0) {
                    setUsingCache(false);
                    setNextSyncIn(null);
                } else {
                    const mins = Math.ceil(remaining / 60000);
                    setNextSyncIn(`${mins} min`);
                }
            }
        }, 60000); // Update every minute

        return () => clearInterval(interval);
    }, [usingCache]);

    const checkFeed = async (feedId: string): Promise<FeedStatus | null> => {
        const baseFeed = FEEDS.find(f => f.id === feedId);
        if (!baseFeed) return null;

        const start = performance.now();
        try {
            const res = await fetch(baseFeed.url, { cache: 'no-store' });
            const end = performance.now();
            const latency = Math.round(end - start);

            if (!res.ok) {
                return {
                    ...baseFeed,
                    status: 'error',
                    errorMessage: `HTTP ${res.status}`,
                    latency,
                    lastChecked: new Date().toLocaleTimeString()
                };
            }

            const data = await res.json();

            // Check for explicit rss2json rate limit error
            if (data.status === 'error') {
                const isRateLimit = data.message?.includes('short period') || data.message?.includes('API key');
                return {
                    ...baseFeed,
                    status: isRateLimit ? 'warning' : 'error',
                    errorMessage: isRateLimit ? 'Rate limited' : (data.message || 'RSS Error'),
                    latency,
                    lastChecked: new Date().toLocaleTimeString()
                };
            }

            const hasItems = Array.isArray(data.items) ? data.items.length > 0 :
                Array.isArray(data) ? data.length > 0 :
                    data.items ? true : false;

            return {
                ...baseFeed,
                status: hasItems ? 'healthy' : 'warning',
                errorMessage: hasItems ? undefined : 'No items',
                latency,
                lastChecked: new Date().toLocaleTimeString()
            };

        } catch (err: any) {
            return {
                ...baseFeed,
                status: 'error',
                errorMessage: err.message || 'Fetch failed',
                latency: 0,
                lastChecked: new Date().toLocaleTimeString()
            };
        }
    };

    const checkAllFeeds = useCallback(async () => {
        setIsChecking(true);
        setRateLimitWarning(false);
        setUsingCache(false);
        setLastRun(new Date().toLocaleString());

        const results: FeedStatus[] = [];
        let hitRateLimit = false;

        // Sequential check with 3-second delay to minimize rate limiting
        for (let i = 0; i < FEEDS.length; i++) {
            const feed = FEEDS[i];

            // Update UI to show which feed is being checked
            setFeeds(prev => {
                const next = [...prev];
                const idx = next.findIndex(f => f.id === feed.id);
                if (idx !== -1) {
                    next[idx] = { ...next[idx], status: 'pending' };
                }
                return next;
            });

            const result = await checkFeed(feed.id);
            if (result) {
                results.push(result);
                if (result.errorMessage?.includes('Rate limited')) {
                    hitRateLimit = true;
                }

                // Update UI with result
                setFeeds(prev => {
                    const next = [...prev];
                    const idx = next.findIndex(f => f.id === feed.id);
                    if (idx !== -1) {
                        next[idx] = result;
                    }
                    return next;
                });
            }

            // Wait 3 seconds between requests for RSS feeds (not needed for direct APIs)
            if (i < FEEDS.length - 1 && feed.url.includes('rss2json')) {
                await new Promise(resolve => setTimeout(resolve, 3000));
            }
        }

        setRateLimitWarning(hitRateLimit);
        setIsChecking(false);

        // Cache the results
        const cacheData: CachedFeedData = {
            feeds: results,
            timestamp: Date.now()
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
        setNextSyncIn('60 min');
    }, []);

    const healthyCount = feeds.filter(f => f.status === 'healthy').length;
    const warningCount = feeds.filter(f => f.status === 'warning').length;
    const errorCount = feeds.filter(f => f.status === 'error').length;
    const cachedCount = feeds.filter(f => f.status === 'cached').length;

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
                        {lastRun && ` • Last sync: ${lastRun}`}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                            {healthyCount} Healthy
                        </Badge>
                        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                            {warningCount} Warning
                        </Badge>
                        <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/20">
                            {errorCount} Error
                        </Badge>
                        {cachedCount > 0 && (
                            <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                                {cachedCount} Cached
                            </Badge>
                        )}
                    </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <Button
                        onClick={checkAllFeeds}
                        disabled={isChecking}
                        variant="default"
                        size="sm"
                        className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/20"
                    >
                        {isChecking ? 'Syncing...' : 'Force Sync All'}
                    </Button>
                    {nextSyncIn && !isChecking && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Next auto-sync in {nextSyncIn}
                        </span>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                {usingCache && (
                    <div className="mb-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-start gap-3">
                        <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                        <div className="text-sm text-blue-200">
                            <strong>Using Cached Results:</strong> To avoid rate limits, feeds are synced hourly.
                            Click "Force Sync All" to refresh now (may hit rate limits).
                        </div>
                    </div>
                )}
                {rateLimitWarning && (
                    <div className="mb-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                        <div className="text-sm text-yellow-200">
                            <strong>Rate Limit Hit:</strong> Some feeds were rate-limited by the RSS proxy.
                            Results are cached for 1 hour. Try again later or use a paid API key.
                        </div>
                    </div>
                )}
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
                                {feed.status === 'cached' && <Clock className="w-5 h-5 text-blue-400" />}
                                {feed.status === 'pending' && <div className="w-4 h-4 rounded-full border-2 border-muted border-t-transparent animate-spin" />}
                            </div>

                            {/* Name & URL */}
                            <div className="col-span-4 md:col-span-4">
                                <div className="font-medium text-sm text-white">{feed.name}</div>
                                <div className="text-xs text-muted-foreground truncate font-mono">{feed.displayUrl}</div>
                            </div>

                            {/* Status Badge */}
                            <div className="col-span-2 md:col-span-2 text-center">
                                <Badge variant="outline" className={`
                                    ${feed.status === 'healthy' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : ''}
                                    ${feed.status === 'warning' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : ''}
                                    ${feed.status === 'error' ? 'bg-red-500/10 text-red-400 border-red-500/20' : ''}
                                    ${feed.status === 'cached' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : ''}
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

                            {/* Actions / Error */}
                            <div className="col-span-5 md:col-span-3 text-right flex items-center justify-end gap-2">
                                {feed.errorMessage && (
                                    <span className="text-xs text-red-400 truncate max-w-[100px]" title={feed.errorMessage}>
                                        {feed.errorMessage}
                                    </span>
                                )}

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 text-muted-foreground hover:text-white"
                                    onClick={async () => {
                                        const result = await checkFeed(feed.id);
                                        if (result) {
                                            setFeeds(prev => {
                                                const next = [...prev];
                                                const idx = next.findIndex(f => f.id === feed.id);
                                                if (idx !== -1) next[idx] = result;
                                                return next;
                                            });
                                        }
                                    }}
                                    title="Retry Sync"
                                    disabled={feed.status === 'pending'}
                                >
                                    <RefreshCw className={`w-3 h-3 ${feed.status === 'pending' ? 'animate-spin' : ''}`} />
                                </Button>

                                <a
                                    href={feed.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center h-6 w-6 text-muted-foreground hover:text-white transition-colors"
                                    title="View Raw JSON"
                                >
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
