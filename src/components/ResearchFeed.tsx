import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardTitle, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLink, Loader2, BookOpen, Calendar, Search, ChevronDown, FileText, User } from "lucide-react";
import { BookmarkButton } from './BookmarkButton';
import ShareButtons from './ShareButtons';

import { FALLBACK_PAPERS, ResearchPaper } from '../data/fallbackResearch';

export function ResearchFeed() {
    // Start with fallback data immediately
    const [searchParams] = useSearchParams();
    const [papers, setPapers] = useState<ResearchPaper[]>(FALLBACK_PAPERS);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || "");
    const [visibleCount, setVisibleCount] = useState(100); // Default to showing many

    useEffect(() => {
        const fetchResearch = async () => {
            try {
                // Safety timeout
                const safetyTimer = setTimeout(() => {
                    if (loading) setLoading(false);
                }, 4000);

                // Helper to fetch via multiple RSS proxies (with fallback)
                const fetchRSS = async (rssUrl: string, sourceName: string, categoryName: string, isAuthorList = false) => {
                    // Try multiple proxies in order
                    const proxies = [
                        (url: string) => `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`,
                        (url: string) => `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`
                    ];

                    for (const getProxyUrl of proxies) {
                        try {
                            const proxyUrl = getProxyUrl(rssUrl);
                            const res = await fetch(proxyUrl);
                            const data = await res.json();

                            // Handle rss2json format
                            if (data.status === 'ok' && Array.isArray(data.items)) {
                                return data.items
                                    .filter((item: any) => {
                                        if (!item.link || item.link.length < 20) return false;
                                        const url = item.link.toLowerCase();
                                        const invalidPatterns = [
                                            /^https?:\/\/[^\/]+\/?$/,
                                            /^https?:\/\/[^\/]+\/blog\/?$/,
                                            /^https?:\/\/[^\/]+\/papers?\/?$/,
                                            /^https?:\/\/[^\/]+\/research\/?$/,
                                        ];
                                        return !invalidPatterns.some(pattern => pattern.test(url));
                                    })
                                    .map((item: any) => ({
                                        id: item.guid || item.link,
                                        title: item.title,
                                        abstract: (item.description || '').replace(/<[^>]*>?/gm, '').slice(0, 300) + '...',
                                        url: item.link,
                                        publishedAt: new Date(item.pubDate),
                                        authors: isAuthorList ? [item.author] : [item.author || sourceName],
                                        category: categoryName,
                                        source: sourceName
                                    }));
                            }

                            // Handle allorigins format (returns raw content)
                            if (data.contents) {
                                const parser = new DOMParser();
                                const xml = parser.parseFromString(data.contents, 'text/xml');
                                const items = xml.querySelectorAll('item, entry');

                                return Array.from(items).slice(0, 20).map((item: Element) => {
                                    const title = item.querySelector('title')?.textContent || '';
                                    const link = item.querySelector('link')?.textContent ||
                                        item.querySelector('link')?.getAttribute('href') || '';
                                    const description = item.querySelector('description, summary, content')?.textContent || '';
                                    const pubDate = item.querySelector('pubDate, published, updated')?.textContent || '';
                                    const author = item.querySelector('author, dc\\:creator')?.textContent || sourceName;

                                    return {
                                        id: link,
                                        title,
                                        abstract: description.replace(/<[^>]*>?/gm, '').slice(0, 300) + '...',
                                        url: link,
                                        publishedAt: pubDate ? new Date(pubDate) : new Date(),
                                        authors: [author],
                                        category: categoryName,
                                        source: sourceName
                                    };
                                }).filter((item: any) => item.url && item.url.length > 20);
                            }
                        } catch (e) {
                            console.warn(`Proxy failed for ${sourceName}:`, e);
                            continue; // Try next proxy
                        }
                    }
                    return [];
                };

                // Fetch ArXiv via self-hosted CORS proxy
                const fetchArxiv = async (category: string, categoryName: string): Promise<ResearchPaper[]> => {
                    // Use configured proxy URL or fallback to production Supabase URL
                    // This prevents "Local Network Access" warnings by avoiding localhost in prod
                    const proxyBase = import.meta.env.VITE_ARXIV_PROXY_URL || 'https://cdfrdvrsnfcxarzcyogj.supabase.co/functions/v1/proxy-arxiv';
                    const arxivUrl = `https://export.arxiv.org/api/query?search_query=cat:${category}&sortBy=submittedDate&sortOrder=descending&max_results=15`;
                    const proxyUrl = `${proxyBase}/${arxivUrl}`;

                    try {
                        const res = await fetch(proxyUrl, {
                            headers: {
                                'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
                            }
                        });
                        const text = await res.text();

                        // Parse Atom XML response
                        const parser = new DOMParser();
                        const xml = parser.parseFromString(text, 'text/xml');
                        const entries = xml.querySelectorAll('entry');

                        if (entries.length > 0) {
                            console.log(`ArXiv ${category}: fetched ${entries.length} papers via local proxy`);
                        }

                        return Array.from(entries).map((entry) => {
                            const title = entry.querySelector('title')?.textContent?.trim() || 'Untitled';
                            const summary = entry.querySelector('summary')?.textContent?.trim() || '';
                            const id = entry.querySelector('id')?.textContent || '';
                            const published = entry.querySelector('published')?.textContent || '';
                            const authors = Array.from(entry.querySelectorAll('author name')).map(a => a.textContent || 'Unknown');

                            return {
                                id,
                                title: title.replace(/\s+/g, ' '),
                                abstract: summary.replace(/\s+/g, ' ').slice(0, 300) + '...',
                                url: id,
                                publishedAt: new Date(published),
                                authors: authors.length > 0 ? authors : ['ArXiv'],
                                category: categoryName,
                                source: 'ArXiv'
                            };
                        });
                    } catch (e) {
                        console.warn(`Failed to fetch ArXiv ${category} via local proxy:`, e);
                        return [];
                    }
                };

                // Fetch Hugging Face directly via their JSON API
                const fetchHuggingFace = async (): Promise<ResearchPaper[]> => {
                    try {
                        const res = await fetch('https://huggingface.co/api/daily_papers');
                        const data = await res.json();
                        if (Array.isArray(data)) {
                            return data.slice(0, 20).map((item: any) => ({
                                id: item.paper?.id || item.id,
                                title: item.paper?.title || item.title || 'Untitled',
                                abstract: (item.paper?.summary || '').slice(0, 300) + '...',
                                url: `https://huggingface.co/papers/${item.paper?.id || item.id}`,
                                publishedAt: new Date(item.publishedAt || Date.now()),
                                authors: item.paper?.authors?.map((a: any) => a.name || 'Unknown') || ['Hugging Face'],
                                category: 'Daily Papers',
                                source: 'Hugging Face'
                            }));
                        }
                        return [];
                    } catch (e) {
                        console.warn('Failed to fetch Hugging Face papers:', e);
                        return [];
                    }
                };

                // Fetch all sources in parallel - ALL DIRECT APIs, no proxies!
                const [arxivAI, arxivML, arxivCL, huggingFacePapers] = await Promise.all([
                    fetchArxiv('cs.AI', 'Artificial Intelligence'),
                    fetchArxiv('cs.LG', 'Machine Learning'),
                    fetchArxiv('cs.CL', 'Computation & Language'),
                    fetchHuggingFace()
                ]);

                clearTimeout(safetyTimer);

                const allFetched = [
                    ...(arxivAI || []),
                    ...(arxivML || []),
                    ...(arxivCL || []),
                    ...(huggingFacePapers || [])
                ];

                if (allFetched.length > 0) {
                    // Sort descending
                    allFetched.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

                    // Dedupe by URL
                    const uniquePapers = Array.from(new Map(allFetched.map((item: ResearchPaper) => [item.url, item])).values());

                    // Merge with fallback papers to ensure homepage links always work
                    // We prioritize fetched papers, but ensure fallback papers exist if not present
                    const fetchedUrls = new Set(uniquePapers.map(p => p.url));
                    const missingFallbacks = FALLBACK_PAPERS.filter(p => !fetchedUrls.has(p.url));

                    // Combine and resort
                    const combined = [...uniquePapers, ...missingFallbacks].sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

                    setPapers(combined);
                }

            } catch (err) {
                console.error("Error fetching research:", err);
                // Fallback is already set
            } finally {
                setLoading(false);
            }
        };

        fetchResearch();
    }, []);

    // Extract Unique Sources
    const uniqueSources = useMemo(() => {
        const sources = new Set(papers.map(p => p.source));
        return Array.from(sources);
    }, [papers]);

    const [selectedSource, setSelectedSource] = useState<string | null>(null);

    // Filter Logic
    const filteredPapers = useMemo(() => {
        let filtered = papers;

        if (selectedSource) {
            filtered = filtered.filter(p => p.source === selectedSource);
        }

        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            filtered = filtered.filter(paper =>
                paper.title.toLowerCase().includes(lowerTerm) ||
                paper.abstract.toLowerCase().includes(lowerTerm)
            );
        }
        return filtered;
    }, [papers, searchTerm, selectedSource]);

    const getSourceColor = (source: string) => {
        switch (source) {
            case 'ArXiv': return 'text-red-400 border-red-500/30';
            case 'Semantic Scholar': return 'text-blue-400 border-blue-500/30';
            case 'Papers With Code': return 'text-purple-400 border-purple-500/30';
            case 'Hugging Face': return 'text-yellow-400 border-yellow-500/30';
            case 'BAIR': return 'text-cyan-400 border-cyan-500/30';
            case 'Google Research': return 'text-green-400 border-green-500/30';
            default: return 'text-primary border-primary/30';
        }
    };

    // Get latest update time
    const latestUpdate = papers.length > 0 ? papers[0].publishedAt : new Date();

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Live Ticker */}
            {papers.length > 0 && (
                <div className="w-full bg-black/40 border-y border-white/10 overflow-hidden relative h-12 flex items-center">
                    {/* Fixed Label */}
                    <div className="absolute left-0 z-20 bg-background/95 backdrop-blur px-4 h-full flex items-center border-r border-white/10 text-xs font-bold text-primary shrink-0 uppercase tracking-wider shadow-[10px_0_20px_-5px_rgba(0,0,0,0.5)] cursor-pointer hover:bg-white/5 transition-colors"
                        onClick={() => setSelectedSource(null)}
                        title="Show All"
                    >
                        <div className={`w-2 h-2 rounded-full mr-3 shadow-[0_0_10px_currentColor] transition-all ${selectedSource ? 'bg-muted-foreground' : 'bg-red-500 animate-pulse'}`}></div>
                        {selectedSource ? 'Show All' : 'Live Updates'}
                        <span className="hidden sm:inline ml-3 text-muted-foreground normal-case font-normal border-l border-white/10 pl-3">
                            Last: {latestUpdate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} at {latestUpdate.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>

                    {/* Scrolling Sources */}
                    <div className="flex animate-marquee items-center hover:[animation-play-state:paused]">
                        {[...uniqueSources, ...uniqueSources, ...uniqueSources, ...uniqueSources].map((source, i) => (
                            <div
                                key={`${source}-${i}`}
                                onClick={() => setSelectedSource(source === selectedSource ? null : source)}
                                className={`inline-flex items-center mx-6 group cursor-pointer px-4 py-1.5 rounded-full border transition-all duration-300
                                    ${selectedSource === source
                                        ? 'bg-primary text-primary-foreground border-primary scale-110 shadow-[0_0_15px_rgba(0,255,255,0.4)]'
                                        : `${getSourceColor(source).split(' ')[0]} border-white/10 bg-white/5 hover:bg-white/10 hover:scale-105`
                                    }
                                `}
                            >
                                <span className={`text-xs uppercase whitespace-nowrap font-bold ${selectedSource === source ? 'text-primary-foreground' : ''}`}>
                                    {source}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Fade overlay on right */}
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
                </div>
            )}

            {/* Active Filter Indicator (if source selected) */}
            {selectedSource && (
                <div className="flex justify-center -mt-4 animate-in fade-in slide-in-from-top-2">
                    <Button variant="secondary" size="sm" onClick={() => setSelectedSource(null)} className="gap-2 rounded-full shadow-lg border border-primary/20">
                        Filtering by: <span className="text-primary font-bold">{selectedSource}</span> (Click to clear)
                    </Button>
                </div>
            )}

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search research papers..."
                    className="pl-10 bg-background/50 border-primary/20 focus:border-primary"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                    }}
                />
            </div>

            {/* Papers List - SCROLLABLE CONTAINER */}
            <div className="grid gap-6">
                {filteredPapers.map((paper) => (
                    <Card key={paper.id} className="group overflow-hidden border-white/10 bg-card/30 backdrop-blur-md hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                        <CardHeader className="pb-3">
                            <div className="flex justify-between items-start gap-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Badge variant="outline" className={`${getSourceColor(paper.source)} bg-background/50`}>
                                            {paper.source}
                                        </Badge>
                                        <span className="text-muted-foreground/60">•</span>
                                        <span className="text-primary/80 font-medium">
                                            {paper.category}
                                        </span>
                                        <span className="ml-auto flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {paper.publishedAt.toLocaleDateString()}
                                        </span>
                                    </div>
                                    <CardTitle className="text-xl group-hover:text-primary transition-colors leading-tight">
                                        <a href={paper.url} target="_blank" rel="noopener noreferrer">
                                            {paper.title}
                                        </a>
                                    </CardTitle>
                                    {paper.authors.length > 0 && (
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground/80">
                                            <User className="w-3 h-3" />
                                            {paper.authors.slice(0, 3).join(", ")}{paper.authors.length > 3 ? " et al." : ""}
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-1 shrink-0">
                                    <ShareButtons title={paper.title} />
                                    <BookmarkButton
                                        item={{
                                            id: paper.id,
                                            title: paper.title,
                                            url: paper.url,
                                            source: paper.source,
                                            type: 'research',
                                            publishedAt: paper.publishedAt.toISOString()
                                        }}
                                        onBookmark={() => {
                                            // Simple gamification hook (dirty but works for now)
                                            const stored = localStorage.getItem('ai_gamification');
                                            if (stored) {
                                                const state = JSON.parse(stored);
                                                state.resourcesConsumed += 1;
                                                localStorage.setItem('ai_gamification', JSON.stringify(state));
                                                // Dispatch event to update HUD
                                                window.dispatchEvent(new Event('storage'));
                                            }
                                        }}
                                    />
                                    <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-primary">
                                        <a href={paper.url} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="w-5 h-5" />
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                                {paper.abstract}
                            </p>
                        </CardContent>
                        <CardFooter className="pt-0 pb-4">
                            <Button variant="secondary" size="sm" asChild className="ml-auto gap-2">
                                <a href={paper.url} target="_blank" rel="noopener noreferrer">
                                    <FileText className="w-4 h-4" />
                                    Read Paper
                                </a>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
