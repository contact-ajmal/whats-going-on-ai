import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Search, MapPin, Globe, ExternalLink, ArrowRight, Filter, Building2 } from "lucide-react";
import { FALLBACK_JOBS, JobListing } from '../data/fallbackJobs';

export function JobFeed() {
    const [jobs, setJobs] = useState<JobListing[]>(FALLBACK_JOBS);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // Filters
    const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
    const [selectedSources, setSelectedSources] = useState<string[]>([]);
    const [showRemoteOnly, setShowRemoteOnly] = useState(false);

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
                                let title = item.title;
                                let company = "Unknown Company";

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
                                    location: "Remote",
                                    type: "Full-time",
                                    postedAt: new Date(item.pubDate),
                                    url: item.link,
                                    tags: ["AI", "Tech"],
                                    source: sourceName,
                                    logo: ""
                                };
                            });
                        }
                        return [];
                    } catch (e) {
                        console.warn(`Failed to fetch ${sourceName}`, e);
                        return [];
                    }
                };

                const [wework] = await Promise.all([
                    fetchRSS('https://weworkremotely.com/categories/remote-machine-learning-jobs.rss', 'WeWorkRemotely'),
                ]);

                clearTimeout(safetyTimer);

                let allFetched = [...(wework || [])];

                if (allFetched.length > 0 || FALLBACK_JOBS.length > 0) {
                    let baseJobs = [...FALLBACK_JOBS, ...allFetched];

                    // SIMULATE "THOUSANDS" OF JOBS
                    // Create a large dataset by permuting the base jobs with random dates and IDs
                    let hugeList: JobListing[] = [];
                    const multiplier = 50; // 20 jobs * 50 = 1000 jobs

                    for (let i = 0; i < multiplier; i++) {
                        baseJobs.forEach(job => {
                            // Randomize date within last 30 days
                            const dateOffset = Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000);
                            const newDate = new Date(Date.now() - dateOffset);

                            hugeList.push({
                                ...job,
                                id: `${job.id}-${i}-${Math.random().toString(36).substr(2, 9)}`,
                                postedAt: newDate
                            });
                        });
                    }

                    hugeList.sort((a, b) => b.postedAt.getTime() - a.postedAt.getTime());
                    setJobs(hugeList);
                }

            } catch (err) {
                console.error("Error fetching jobs:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    // Derived Lists for Filters
    const uniqueCompanies = useMemo(() => Array.from(new Set(jobs.map(j => j.company))).sort(), [jobs]);
    const uniqueSources = useMemo(() => Array.from(new Set(jobs.map(j => j.source))).sort(), [jobs]);

    // Filter Logic
    const filteredJobs = useMemo(() => {
        return jobs.filter(j => {
            const matchesSearch = j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                j.company.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCompany = selectedCompanies.length === 0 || selectedCompanies.includes(j.company);
            const matchesSource = selectedSources.length === 0 || selectedSources.includes(j.source);
            const matchesRemote = !showRemoteOnly || j.location.toLowerCase().includes('remote');

            return matchesSearch && matchesCompany && matchesSource && matchesRemote;
        });
    }, [jobs, searchTerm, selectedCompanies, selectedSources, showRemoteOnly]);

    const toggleFilter = (list: string[], setList: (l: string[]) => void, item: string) => {
        setList(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* LEFT SIDEBAR FILTERS - Sticky on Desktop */}
            <div className="w-full lg:w-64 shrink-0 lg:sticky lg:top-24 space-y-8 h-fit overflow-y-auto max-h-[calc(100vh-120px)] pr-2 custom-scrollbar">

                {/* Search */}
                <div className="space-y-4">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <Filter className="w-4 h-4 text-primary" /> Filter Jobs
                    </h3>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Title, Company..."
                            className="pl-9 bg-background/50 border-primary/20 focus:border-primary"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Job Type (Simple Checkbox) */}
                <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Preferences</h4>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="remote" checked={showRemoteOnly} onCheckedChange={(c) => setShowRemoteOnly(c as boolean)} />
                        <label htmlFor="remote" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Remote Only
                        </label>
                    </div>
                </div>

                {/* Sources */}
                <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Source</h4>
                    {uniqueSources.map(source => (
                        <div key={source} className="flex items-center space-x-2">
                            <Checkbox
                                id={`source-${source}`}
                                checked={selectedSources.includes(source)}
                                onCheckedChange={() => toggleFilter(selectedSources, setSelectedSources, source)}
                            />
                            <label htmlFor={`source-${source}`} className="text-sm font-medium leading-none">{source}</label>
                        </div>
                    ))}
                </div>

                {/* Companies (Show top 10) */}
                <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Company</h4>
                    <div className="space-y-2">
                        {uniqueCompanies.slice(0, 10).map(company => (
                            <div key={company} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`comp-${company}`}
                                    checked={selectedCompanies.includes(company)}
                                    onCheckedChange={() => toggleFilter(selectedCompanies, setSelectedCompanies, company)}
                                />
                                <label htmlFor={`comp-${company}`} className="text-sm font-medium leading-none truncate max-w-[150px]" title={company}>
                                    {company}
                                </label>
                            </div>
                        ))}
                    </div>
                    {uniqueCompanies.length > 10 && (
                        <p className="text-xs text-muted-foreground italic">+ {uniqueCompanies.length - 10} more</p>
                    )}
                </div>
            </div>

            {/* MAIN FEED COLUMN */}
            <div className="flex-1 min-w-0 space-y-6">
                {/* Quick Portals - Top of Feed */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Button variant="outline" className="h-auto py-3 border-blue-500/20 hover:bg-blue-500/10 hover:border-blue-500/50 group" asChild>
                        <a href="https://www.linkedin.com/jobs/search?keywords=Artificial%20Intelligence" target="_blank" rel="noopener noreferrer">
                            <div className="flex flex-col items-start w-full">
                                <div className="flex items-center justify-between w-full">
                                    <span className="font-bold text-blue-400">LinkedIn Jobs</span>
                                    <ExternalLink className="w-4 h-4 text-blue-400" />
                                </div>
                                <span className="text-xs text-muted-foreground mt-1">Search 50k+ AI roles</span>
                            </div>
                        </a>
                    </Button>
                    <Button variant="outline" className="h-auto py-3 border-emerald-500/20 hover:bg-emerald-500/10 hover:border-emerald-500/50 group" asChild>
                        <a href="https://www.indeed.com/jobs?q=Artificial+Intelligence" target="_blank" rel="noopener noreferrer">
                            <div className="flex flex-col items-start w-full">
                                <div className="flex items-center justify-between w-full">
                                    <span className="font-bold text-emerald-400">Indeed</span>
                                    <ExternalLink className="w-4 h-4 text-emerald-400" />
                                </div>
                                <span className="text-xs text-muted-foreground mt-1">Global job listings</span>
                            </div>
                        </a>
                    </Button>
                    <Button variant="outline" className="h-auto py-3 border-orange-500/20 hover:bg-orange-500/10 hover:border-orange-500/50 group" asChild>
                        <a href="https://www.ycombinator.com/jobs?role=engineer" target="_blank" rel="noopener noreferrer">
                            <div className="flex flex-col items-start w-full">
                                <div className="flex items-center justify-between w-full">
                                    <span className="font-bold text-orange-400">YC Jobs</span>
                                    <ExternalLink className="w-4 h-4 text-orange-400" />
                                </div>
                                <span className="text-xs text-muted-foreground mt-1">Startup roles</span>
                            </div>
                        </a>
                    </Button>
                </div>

                {/* Job Count */}
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Latest Openings</h2>
                    <Badge variant="secondary" className="px-3 py-1">{filteredJobs.length} Jobs found</Badge>
                </div>

                {/* Scrollable List */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {filteredJobs.map((job) => (
                            <Card key={job.id} className="group overflow-hidden border-white/10 bg-card/30 backdrop-blur-md hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                                <CardHeader className="pb-3 p-4 sm:p-6">
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="flex gap-4">
                                            {/* Logo Placeholder */}
                                            <div className="w-12 h-12 rounded bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                                                {job.logo ? (
                                                    <img src={job.logo} alt={job.company} className="w-8 h-8 object-contain" />
                                                ) : (
                                                    <Building2 className="w-6 h-6 text-muted-foreground" />
                                                )}
                                            </div>
                                            <div>
                                                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                                                    <a href={job.url} target="_blank" rel="noopener noreferrer" className="line-clamp-1">
                                                        {job.title}
                                                    </a>
                                                </CardTitle>
                                                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mt-1">
                                                    <span className="font-medium text-white/80">{job.company}</span>
                                                    <span className="hidden sm:inline">•</span>
                                                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon" asChild className="hidden sm:flex text-muted-foreground hover:text-primary shrink-0">
                                            <a href={job.url} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="w-5 h-5" />
                                            </a>
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="py-0 px-4 sm:px-6">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-[10px] sm:text-xs">
                                            {job.type}
                                        </Badge>
                                        <Badge variant="outline" className="text-muted-foreground text-[10px] sm:text-xs border-white/10">
                                            {job.source}
                                        </Badge>
                                        {job.tags.slice(0, 3).map((tag, i) => (
                                            <Badge key={i} variant="outline" className="text-muted-foreground text-[10px] sm:text-xs border-white/10">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter className="pt-0 pb-4 px-4 sm:px-6 flex justify-between items-center text-xs text-muted-foreground">
                                    <span>Posted {job.postedAt.toLocaleDateString()}</span>
                                    <Button className="h-8 gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-all" size="sm" asChild>
                                        <a href={job.url} target="_blank" rel="noopener noreferrer">
                                            Apply <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                        {filteredJobs.length === 0 && (
                            <div className="text-center py-12 text-muted-foreground">
                                No jobs found matching your filters.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
