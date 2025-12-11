import { useEffect, useState, useMemo } from 'react';
import { Card, CardContent, CardTitle, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLink, Loader2, BookOpen, Calendar, Search, ChevronDown, FileText, User } from "lucide-react";
import { BookmarkButton } from "@/components/BookmarkButton";

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
                const results = await Promise.allSettled([
                    // 1. ArXiv AI
                    fetch('https://api.rss2json.com/v1/api.json?rss_url=http://export.arxiv.org/rss/cs.AI').then(res => res.json()),
                    // 2. ArXiv Machine Learning
                    fetch('https://api.rss2json.com/v1/api.json?rss_url=http://export.arxiv.org/rss/cs.LG').then(res => res.json()),
                    // 3. ArXiv CV
                    fetch('https://api.rss2json.com/v1/api.json?rss_url=http://export.arxiv.org/rss/cs.CV').then(res => res.json()),
                    // 4. ArXiv CL
                    fetch('https://api.rss2json.com/v1/api.json?rss_url=http://export.arxiv.org/rss/cs.CL').then(res => res.json()),
                    // 5. Hugging Face Daily Papers (Community Feed)
                    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://papers.takara.ai/api/feed').then(res => res.json()),
                    // 6. BAIR Blog
                    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://bair.berkeley.edu/blog/feed.xml').then(res => res.json()),
                    // 7. Google Research
                    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://blog.research.google/atom.xml').then(res => res.json()),
                ]);

                const newPapers: ResearchPaper[] = [];

                const processFeed = (result: PromiseSettledResult<any>, category: string, sourceName: string) => {
                    if (result.status === 'fulfilled' && result.value?.items) {
                        result.value.items.forEach((item: any) => {
                            // Abstract cleanup
                            let abstractClean = item.description?.replace(/<[^>]*>?/gm, '') || '';
                            // Remove "Abstract: " prefix if present (common in ArXiv)
                            abstractClean = abstractClean.replace(/^Abstract:\s*/i, '');
                            // Truncate if too long (for initial view)
                            if (abstractClean.length > 300) abstractClean = abstractClean.slice(0, 300) + '...';

                            // Author extraction attempt
                            let authors: string[] = [];
                            if (item.author && typeof item.author === 'string') {
                                authors = [item.author];
                            } else if (item.authors) {
                                authors = item.authors; // Google often provides this
                            }

                            // Title cleanup
                            const titleClean = item.title?.replace(/^\[.*?\]\s*/, '') || 'Untitled'; // Remove [cs.AI] etc

                            newPapers.push({
                                id: item.guid || item.link || Math.random().toString(),
                                title: titleClean,
                                abstract: abstractClean,
                                url: item.link,
                                publishedAt: new Date(item.pubDate),
                                authors: authors,
                                category: category,
                                source: sourceName
                            });
                        });
                    }
                };

                // Process ArXiv
                processFeed(results[0], 'Artificial Intelligence', 'ArXiv');
                processFeed(results[1], 'Machine Learning', 'ArXiv');
                processFeed(results[2], 'Computer Vision', 'ArXiv');
                processFeed(results[3], 'Computation & Language', 'ArXiv');

                // Process Hugging Face
                processFeed(results[4], 'Daily Papers', 'Hugging Face');

                // Process BAIR
                processFeed(results[5], 'AI Research', 'BAIR');

                // Process Google
                processFeed(results[6], 'Deep Learning', 'Google Research');

                // Sort by date (descending)
                newPapers.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

                // Remove duplicates by URL
                const uniquePapers = Array.from(new Map(newPapers.map(item => [item.url, item])).values());

                setPapers(uniquePapers);
            } catch (err) {
                console.error("Error fetching research:", err);
                setError("Failed to load research papers.");
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
