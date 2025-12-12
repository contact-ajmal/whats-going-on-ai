import { useEffect, useState, useMemo } from 'react';
import { Card, CardContent, CardTitle, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLink, Loader2, BookOpen, Calendar, Search, ChevronDown, FileText, User } from "lucide-react";
import { BookmarkButton } from './BookmarkButton';
import { LinkedinShareButton } from './LinkedinShareButton';

interface ResearchPaper {
    id: string;
    title: string;
    abstract: string;
    url: string;
    publishedAt: Date;
    authors: string[];
    category: string;
    source: string;
}

export function ResearchFeed() {
    const [papers, setPapers] = useState<ResearchPaper[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [visibleCount, setVisibleCount] = useState(9);

    useEffect(() => {
        const fetchResearch = async () => {
            try {
                // Helper to fetch via proxy with timeout
                const fetchWithTimeout = async (url: string, timeout = 8000) => {
                    const controller = new AbortController();
                    const id = setTimeout(() => controller.abort(), timeout);
                    try {
                        const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`, {
                            signal: controller.signal
                        });
                        clearTimeout(id);
                        if (!res.ok) throw new Error(`Proxy error: ${res.status}`);
                        const data = await res.json();
                        return data.contents;
                    } catch (e) {
                        clearTimeout(id);
                        throw e;
                    }
                };

                const parseXML = (xmlStr: string) => {
                    return new DOMParser().parseFromString(xmlStr, "text/xml");
                };

                const newPapers: ResearchPaper[] = [];

                // Define all fetch Promises
                const promises = [
                    // 1. ArXiv AI
                    (async () => {
                        try {
                            const content = await fetchWithTimeout('https://export.arxiv.org/rss/cs.AI');
                            const doc = parseXML(content);
                            doc.querySelectorAll('item').forEach(item => {
                                const title = item.querySelector('title')?.textContent?.replace(/^\[.*?\]\s*/, '') || 'Untitled';
                                const link = item.querySelector('link')?.textContent || '';
                                let desc = item.querySelector('description')?.textContent || '';
                                desc = desc.replace(/<[^>]*>?/gm, '').replace(/^Abstract:\s*/i, '');
                                if (desc.length > 300) desc = desc.slice(0, 300) + '...';
                                const dateStr = item.querySelector('date')?.textContent || item.querySelector('dc\\:date')?.textContent || new Date().toISOString();
                                const author = item.querySelector('creator')?.textContent || item.querySelector('dc\\:creator')?.textContent || 'ArXiv Author';
                                if (link) newPapers.push({ id: link, title, abstract: desc, url: link, publishedAt: new Date(dateStr), authors: [author.split(',')[0]], category: 'Artificial Intelligence', source: 'ArXiv' });
                            });
                        } catch (e) { console.error('ArXiv AI failed', e); }
                    })(),
                    // 2. ArXiv ML
                    (async () => {
                        try {
                            const content = await fetchWithTimeout('https://export.arxiv.org/rss/cs.LG');
                            const doc = parseXML(content);
                            doc.querySelectorAll('item').forEach(item => {
                                const title = item.querySelector('title')?.textContent?.replace(/^\[.*?\]\s*/, '') || 'Untitled';
                                const link = item.querySelector('link')?.textContent || '';
                                let desc = item.querySelector('description')?.textContent || '';
                                desc = desc.replace(/<[^>]*>?/gm, '').replace(/^Abstract:\s*/i, '');
                                if (desc.length > 300) desc = desc.slice(0, 300) + '...';
                                const dateStr = item.querySelector('date')?.textContent || item.querySelector('dc\\:date')?.textContent || new Date().toISOString();
                                const author = item.querySelector('creator')?.textContent || item.querySelector('dc\\:creator')?.textContent || 'ArXiv Author';
                                if (link) newPapers.push({ id: link, title, abstract: desc, url: link, publishedAt: new Date(dateStr), authors: [author.split(',')[0]], category: 'Machine Learning', source: 'ArXiv' });
                            });
                        } catch (e) { console.error('ArXiv ML failed', e); }
                    })(),
                    // 3. Hugging Face
                    (async () => {
                        try {
                            // Try direct first, fallback to proxy is tricky with CORS, so stick to proxy but handle JSON
                            const content = await fetchWithTimeout('https://huggingface.co/api/daily_papers');
                            // content from allorigins is a string (JSON stringified)
                            const hfData = JSON.parse(content);
                            if (Array.isArray(hfData)) {
                                hfData.forEach((item: any) => {
                                    const p = item.paper;
                                    newPapers.push({
                                        id: p.id,
                                        title: p.title,
                                        abstract: p.summary.slice(0, 300) + '...',
                                        url: `https://huggingface.co/papers/${p.id}`,
                                        publishedAt: new Date(item.publishedAt),
                                        authors: p.authors.map((a: any) => a.name),
                                        category: 'Daily Papers',
                                        source: 'Hugging Face'
                                    });
                                });
                            }
                        } catch (e) { console.error('HF failed', e); }
                    })(),
                    // 4. Google Research
                    (async () => {
                        try {
                            const content = await fetchWithTimeout('https://blog.research.google/atom.xml');
                            const doc = parseXML(content);
                            doc.querySelectorAll('entry').forEach(entry => {
                                const title = entry.querySelector('title')?.textContent || 'Untitled';
                                const link = entry.querySelector('link')?.getAttribute('href') || '';
                                let summary = entry.querySelector('summary')?.textContent || '';
                                summary = summary.replace(/<[^>]*>?/gm, '');
                                if (summary.length > 300) summary = summary.slice(0, 300) + '...';
                                const published = entry.querySelector('published')?.textContent || new Date().toISOString();
                                const author = entry.querySelector('author > name')?.textContent || 'Google Research';
                                if (link) newPapers.push({ id: link, title, abstract: summary, url: link, publishedAt: new Date(published), authors: [author], category: 'Deep Learning', source: 'Google Research' });
                            });
                        } catch (e) { console.error('Google failed', e); }
                    })(),
                    // 5. BAIR
                    (async () => {
                        try {
                            const content = await fetchWithTimeout('https://bair.berkeley.edu/blog/feed.xml');
                            const doc = parseXML(content);
                            doc.querySelectorAll('item').forEach(item => {
                                const title = item.querySelector('title')?.textContent || 'Untitled';
                                const link = item.querySelector('link')?.textContent || '';
                                let desc = item.querySelector('description')?.textContent || '';
                                desc = desc.replace(/<[^>]*>?/gm, '');
                                if (desc.length > 300) desc = desc.slice(0, 300) + '...';
                                const pubDate = item.querySelector('pubDate')?.textContent || new Date().toISOString();
                                if (link) newPapers.push({ id: link, title, abstract: desc, url: link, publishedAt: new Date(pubDate), authors: ['BAIR Team'], category: 'AI Research', source: 'BAIR' });
                            });
                        } catch (e) { console.error('BAIR failed', e); }
                    })()
                ];

                await Promise.allSettled(promises);

                // Sort by date (descending)
                newPapers.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

                // Remove duplicates by URL
                const uniquePapers = Array.from(new Map(newPapers.map(item => [item.url, item])).values());

                setPapers(uniquePapers);

            } catch (err) {
                console.error("Error fetching research:", err);
                setError("Failed to load research papers. Please try refreshing.");
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

    const displayPapers = filteredPapers.slice(0, visibleCount);
    const hasMore = visibleCount < filteredPapers.length;

    const getSourceColor = (source: string) => {
        switch (source) {
            case 'ArXiv': return 'text-red-400 border-red-500/30';
            case 'Hugging Face': return 'text-yellow-400 border-yellow-500/30';
            case 'BAIR': return 'text-blue-400 border-blue-500/30';
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
                        setVisibleCount(9);
                    }}
                />
            </div>

            {/* Papers List */}
            <div className="grid gap-6">
                {displayPapers.map((paper) => (
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
                                    <LinkedinShareButton url={paper.url} />
                                    <BookmarkButton
                                        item={{
                                            id: paper.id,
                                            title: paper.title,
                                            url: paper.url,
                                            source: paper.source,
                                            type: 'research',
                                            publishedAt: paper.publishedAt.toISOString()
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

            {/* Load More Button */}
            {hasMore && (
                <div className="flex justify-center pt-8">
                    <Button
                        variant="secondary"
                        size="lg"
                        className="gap-2 min-w-[200px]"
                        onClick={() => setVisibleCount(prev => prev + 9)}
                    >
                        Load More Papers <ChevronDown className="h-4 w-4" />
                    </Button>
                </div>
            )}
        </div>
    );
}
