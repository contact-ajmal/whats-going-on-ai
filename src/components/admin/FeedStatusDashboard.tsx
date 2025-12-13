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
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://news.google.com/rss/search?q=Artificial+Intelligence+when:7d&hl=en-US&gl=US&ceid=US:en'
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
        id: 'research-arxiv',
        name: 'ArXiv (CS.AI)',
        displayUrl: 'arxiv.org',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=http://export.arxiv.org/rss/cs.AI'
    },

    // --- JOBS ---
    {
        id: 'jobs-wework',
        name: 'WeWorkRemotely',
        displayUrl: 'weworkremotely.com',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://weworkremotely.com/categories/remote-machine-learning-jobs.rss'
    },
    {
        id: 'jobs-remoteok',
        name: 'RemoteOK',
        displayUrl: 'remoteok.com',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://remoteok.com/rss'
    },

    // --- VIDEOS (YouTube) ---
    {
        id: 'video-wesroth',
        name: 'YouTube: Wes Roth',
        displayUrl: 'youtube.com/@WesRoth',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=UCg_p-Fp_b5Dq_09w6a4YwGA'
    },
    {
        id: 'video-matthewberman',
        name: 'YouTube: Matthew Berman',
        displayUrl: 'youtube.com/@MatthewBerman',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=UCMi8qg-eB1d7kS_c7F3g_Cg'
    },
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
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=UCXy2m-1m4jC-2uFvA5s3bBA'
    },
    {
        id: 'video-microsoft',
        name: 'YouTube: Microsoft Mechanics',
        displayUrl: 'youtube.com/MicrosoftMechanics',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=UCGCz0fBqj2N_Jg7o-T-b99Q'
    },
    {
        id: 'video-twominutepapers',
        name: 'YouTube: Two Minute Papers',
        displayUrl: 'youtube.com/TwoMinutePapers',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=UCbfYPyITQ-7l4upoX8nvctg'
    },
    {
        id: 'video-mattwolfe',
        name: 'YouTube: Matt Wolfe',
        displayUrl: 'youtube.com/@mreflow',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=UCnAtMWn98fQ07kYy6_9v-w'
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
        id: 'video-bycloud',
        name: 'YouTube: ByCloud',
        displayUrl: 'youtube.com/@ByCloud',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=UC3X8J1_5Y7M47_7Q573573'
    },
    {
        id: 'video-nvidia',
        name: 'YouTube: NVIDIA',
        displayUrl: 'youtube.com/NVIDIA',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=UCOoKqA10yd_1FZ4B5F4qLg'
    },
    {
        id: 'video-ibm',
        name: 'YouTube: IBM Technology',
        displayUrl: 'youtube.com/IBMTechnology',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=UC7c8mE90Kk42C2X4C7k1Pgg'
    },

    // --- API ---
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

    const checkFeed = async (feedId: string) => {
        const feedIndex = feeds.findIndex(f => f.id === feedId);
        if (feedIndex === -1) return;

        const baseFeed = FEEDS.find(f => f.id === feedId);
        if (!baseFeed) return;

        // Set specific feed to checking state
        setFeeds(prev => {
            const next = [...prev];
            next[feedIndex] = { ...next[feedIndex], status: 'pending' };
            return next;
        });

        const start = performance.now();
        try {
            // Only add query-string cache busting for rss2json (which aggressively caches)
            // Strict APIs like GitHub/Dev.to might reject unknown params with 422
            let fetchUrl = baseFeed.url;
            if (fetchUrl.includes('rss2json')) {
                fetchUrl += fetchUrl.includes('?') ? `&_t=${Date.now()}` : `?_t=${Date.now()}`;
            }

            const res = await fetch(fetchUrl, { cache: 'no-store' });
            const end = performance.now();
            const latency = Math.round(end - start);

            if (!res.ok) {
                setFeeds(prev => {
                    const next = [...prev];
                    next[feedIndex] = {
                        ...next[feedIndex],
                        status: 'error',
                        errorMessage: `HTTP ${res.status}`,
                        latency,
                        lastChecked: new Date().toLocaleTimeString()
                    };
                    return next;
                });
                return;
            }

            const data = await res.json();

            // Check for explicit rss2json error
            if (data.status === 'error') {
                setFeeds(prev => {
                    const next = [...prev];
                    next[feedIndex] = {
                        ...next[feedIndex],
                        status: 'error',
                        errorMessage: data.message || 'RSS Conversion Failed',
                        latency,
                        lastChecked: new Date().toLocaleTimeString()
                    };
                    return next;
                });
                return;
            }

            const hasItems = Array.isArray(data.items) ? data.items.length > 0 :
                Array.isArray(data) ? data.length > 0 : // dev.to returns array
                    data.items ? true : false; // GitHub items

            setFeeds(prev => {
                const next = [...prev];
                next[feedIndex] = {
                    ...next[feedIndex],
                    status: hasItems ? 'healthy' : 'warning',
                    errorMessage: hasItems ? undefined : 'No items found',
                    latency,
                    lastChecked: new Date().toLocaleTimeString()
                };
                return next;
            });

        } catch (err: any) {
            setFeeds(prev => {
                const next = [...prev];
                next[feedIndex] = {
                    ...next[feedIndex],
                    status: 'error',
                    errorMessage: err.message || 'Fetch failed',
                    latency: 0,
                    lastChecked: new Date().toLocaleTimeString()
                };
                return next;
            });
        }
    };

    const checkAllFeeds = async () => {
        setIsChecking(true);
        // Sequential or parallel? Parallel is faster.
        await Promise.all(FEEDS.map(f => checkFeed(f.id)));
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
                        {lastRun && ` • Last sync: ${lastRun}`}
                    </p>
                </div>
                <Button
                    onClick={checkAllFeeds}
                    disabled={isChecking}
                    variant="default"
                    size="sm"
                    className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/20"
                >
                    {isChecking ? 'Syncing...' : 'Sync All Sources'}
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
                                    onClick={() => checkFeed(feed.id)}
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
