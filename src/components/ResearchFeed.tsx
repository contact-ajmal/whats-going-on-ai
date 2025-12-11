import { useEffect, useState, useMemo } from 'react';
import { Card, CardContent, CardTitle, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLink, Loader2, BookOpen, Calendar, Search, ChevronDown, FileText, User } from "lucide-react";

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

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Controls Container */}
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between max-w-4xl mx-auto">
                {/* Source Filters */}
                <div className="flex flex-wrap gap-2 justify-center">
                    <Button
                        variant={selectedSource === null ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedSource(null)}
                        className="rounded-full"
                    >
                        All
                    </Button>
                    {uniqueSources.map(source => (
                        <Button
                            key={source}
                            variant={selectedSource === source ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedSource(source)}
                            className={`rounded-full ${selectedSource === source ? '' : 'text-muted-foreground'}`}
                        >
                            {source}
                        </Button>
                    ))}
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-64 shrink-0">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search papers..."
                        className="pl-10 bg-background/50 border-primary/20 focus:border-primary h-9"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setVisibleCount(9);
                        }}
                    />
                </div>
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
                                <Button variant="ghost" size="icon" asChild className="shrink-0 text-muted-foreground hover:text-primary">
                                    <a href={paper.url} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="w-5 h-5" />
                                    </a>
                                </Button>
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
