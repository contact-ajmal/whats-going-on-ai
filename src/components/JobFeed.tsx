import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Search, Briefcase, MapPin, Building2, Globe, ExternalLink, ArrowRight } from "lucide-react";
import { FALLBACK_JOBS, JobListing } from '../data/fallbackJobs';

export function JobFeed() {
    const [jobs, setJobs] = useState<JobListing[]>(FALLBACK_JOBS);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                // Safety timeout
                const safetyTimer = setTimeout(() => {
                    if (loading) setLoading(false);
                }, 4000);

                const fetchRSS = async (rssUrl: string, sourceName: string) => {
                    try {
                        const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`);
                        const data = await res.json();
                        if (data.status === 'ok' && Array.isArray(data.items)) {
                            return data.items.map((item: any) => {
                                // Simple heuristic extraction
                                // RSS items usually have format "Company: Job Title" or similar
                                let title = item.title;
                                let company = "Unknown Company";

                                // Try to extract company from title if "Company: Title" format
                                if (title.includes(':')) {
                                    const parts = title.split(':');
                                    company = parts[0].trim();
                                    title = parts.slice(1).join(':').trim();
                                } else if (title.includes(' at ')) {
                                    const parts = title.split(' at ');
                                    title = parts[0].trim();
                                    company = parts[parts.length - 1].trim();
                                }

                                return {
                                    id: item.guid || item.link,
                                    title: title,
                                    company: company,
                                    location: "Remote", // Most RSS feeds are remote-centric
                                    type: "Full-time",
                                    postedAt: new Date(item.pubDate),
                                    url: item.link,
                                    tags: ["AI", "Tech"], // Generic tags for live feed
                                    source: sourceName,
                                    logo: "" // No logo from simple RSS
                                };
                            });
                        }
                        return [];
                    } catch (e) {
                        console.warn(`Failed to fetch ${sourceName}`, e);
                        return [];
                    }
                };

                // Fetch generic remote job feeds filtered for "AI" or "Machine Learning"
                // Using RemoteOK's RSS or similar if available, or just generic tech feeds 
                // Note: Real "AI" specific RSS feeds are rare, so we key off generic ones and filter or use specific ones.
                // For now, we simulate "live" by fetching a general remote feed and assuming they are relevant, or strictly generic.
                const [wework] = await Promise.all([
                    fetchRSS('https://weworkremotely.com/categories/remote-machine-learning-jobs.rss', 'WeWorkRemotely'),
                ]);

                clearTimeout(safetyTimer);

                const allFetched = [...(wework || [])];

                if (allFetched.length > 0) {
                    // Merge with fallback
                    const merged = [...FALLBACK_JOBS, ...allFetched];
                    // Sort descending
                    merged.sort((a, b) => b.postedAt.getTime() - a.postedAt.getTime());
                    // Dedupe
                    const unique = Array.from(new Map(merged.map(item => [item.url, item])).values());
                    setJobs(unique);
                }

            } catch (err) {
                console.error("Error fetching jobs:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    // Filter Logic
    const filteredJobs = useMemo(() => {
        let filtered = jobs;

        if (selectedCompany) {
            filtered = filtered.filter(j => j.company === selectedCompany);
        }

        if (searchTerm) {
            const lower = searchTerm.toLowerCase();
            filtered = filtered.filter(j =>
                j.title.toLowerCase().includes(lower) ||
                j.company.toLowerCase().includes(lower) ||
                j.tags.some(t => t.toLowerCase().includes(lower))
            );
        }
        return filtered;
    }, [jobs, searchTerm, selectedCompany]);

    const uniqueCompanies = useMemo(() => {
        return Array.from(new Set(jobs.map(j => j.company))).sort();
    }, [jobs]);

    return (
        <div className="space-y-12">

            {/* Quick Portals */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto py-4 border-blue-500/20 hover:bg-blue-500/10 hover:border-blue-500/50 group" asChild>
                    <a href="https://www.linkedin.com/jobs/search?keywords=Artificial%20Intelligence" target="_blank" rel="noopener noreferrer">
                        <div className="text-left w-full">
                            <div className="flex items-center justify-between mb-1">
                                <span className="font-bold text-blue-400">LinkedIn Jobs</span>
                                <ExternalLink className="w-4 h-4 text-blue-400 opacity-50 group-hover:opacity-100" />
                            </div>
                            <div className="text-xs text-muted-foreground">Search 50k+ AI roles</div>
                        </div>
                    </a>
                </Button>
                <Button variant="outline" className="h-auto py-4 border-emerald-500/20 hover:bg-emerald-500/10 hover:border-emerald-500/50 group" asChild>
                    <a href="https://www.indeed.com/jobs?q=Artificial+Intelligence" target="_blank" rel="noopener noreferrer">
                        <div className="text-left w-full">
                            <div className="flex items-center justify-between mb-1">
                                <span className="font-bold text-emerald-400">Indeed</span>
                                <ExternalLink className="w-4 h-4 text-emerald-400 opacity-50 group-hover:opacity-100" />
                            </div>
                            <div className="text-xs text-muted-foreground">Global job listings</div>
                        </div>
                    </a>
                </Button>
                <Button variant="outline" className="h-auto py-4 border-orange-500/20 hover:bg-orange-500/10 hover:border-orange-500/50 group" asChild>
                    <a href="https://www.ycombinator.com/jobs?role=engineer" target="_blank" rel="noopener noreferrer">
                        <div className="text-left w-full">
                            <div className="flex items-center justify-between mb-1">
                                <span className="font-bold text-orange-400">YC Jobs</span>
                                <ExternalLink className="w-4 h-4 text-orange-400 opacity-50 group-hover:opacity-100" />
                            </div>
                            <div className="text-xs text-muted-foreground">Startup & Founder roles</div>
                        </div>
                    </a>
                </Button>
            </div>

            {/* Filter Section */}
            <div className="space-y-6">
                <div className="max-w-md mx-auto relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search roles, companies, or keywords..."
                        className="pl-10 bg-background/50 border-primary/20 focus:border-primary"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Company Ticker */}
                {jobs.length > 0 && (
                    <div className="w-full overflow-hidden relative h-12 flex items-center border-y border-white/5 bg-black/20">
                        <div className="absolute left-0 z-10 bg-background/80 backdrop-blur px-3 h-full flex items-center border-r border-white/10 text-xs font-bold text-muted-foreground shrink-0 uppercase tracking-widest">
                            Companies
                        </div>
                        <div className="flex animate-marquee items-center ml-24 hover:[animation-play-state:paused]">
                            {[...uniqueCompanies, ...uniqueCompanies].map((company, i) => (
                                <div
                                    key={`${company}-${i}`}
                                    onClick={() => setSelectedCompany(company === selectedCompany ? null : company)}
                                    className={`
                                        cursor-pointer mx-4 px-3 py-1 rounded-full text-xs font-medium transition-all
                                        ${selectedCompany === company
                                            ? 'bg-primary text-primary-foreground scale-110 shadow-[0_0_10px_rgba(0,255,255,0.4)]'
                                            : 'bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-primary'}
                                    `}
                                >
                                    {company}
                                </div>
                            ))}
                        </div>
                        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
                    </div>
                )}
            </div>

            {/* Feed */}
            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                </div>
            ) : (
                <div className="grid gap-4">
                    {filteredJobs.map((job) => (
                        <Card key={job.id} className="group overflow-hidden border-white/10 bg-card/30 backdrop-blur-md hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start gap-4">
                                    <div className="flex gap-4">
                                        {/* Logo Placeholder or Image */}
                                        <div className="w-12 h-12 rounded bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                                            {job.logo ? (
                                                <img src={job.logo} alt={job.company} className="w-8 h-8 object-contain" />
                                            ) : (
                                                <Building2 className="w-6 h-6 text-muted-foreground" />
                                            )}
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg group-hover:text-primary transition-colors">
                                                <a href={job.url} target="_blank" rel="noopener noreferrer">
                                                    {job.title}
                                                </a>
                                            </CardTitle>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                                <span className="font-medium text-white/80">{job.company}</span>
                                                <span>•</span>
                                                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                                                <span>•</span>
                                                <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {job.source}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" asChild className="hidden sm:flex text-muted-foreground hover:text-primary">
                                        <a href={job.url} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="w-5 h-5" />
                                        </a>
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="py-2">
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">{job.type}</Badge>
                                    {job.tags.map(tag => (
                                        <Badge key={tag} variant="outline" className="text-muted-foreground text-xs">{tag}</Badge>
                                    ))}
                                    <span className="ml-auto text-xs text-muted-foreground italic flex items-center">
                                        Posted {job.postedAt.toLocaleDateString()}
                                    </span>
                                </div>
                            </CardContent>
                            <CardFooter className="pt-2 pb-4">
                                <Button className="w-full sm:w-auto ml-auto gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-all" size="sm" asChild>
                                    <a href={job.url} target="_blank" rel="noopener noreferrer">
                                        Apply Now <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
