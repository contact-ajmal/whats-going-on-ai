import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, ExternalLink, ArrowRight, Filter, BookOpen, Video, GraduationCap, PlayCircle, Star, Bookmark } from "lucide-react";
import { FALLBACK_LEARNING, LearningResource } from '../data/fallbackLearning';
import { useBookmarks } from '@/hooks/useBookmarks';

export function LearningFeed({ searchTerm }: { searchTerm: string }) {
    const [resources, setResources] = useState<LearningResource[]>([]);
    const { toggleBookmark, isBookmarked } = useBookmarks();
    // searchTerm state is now lifted

    // Initialize with multiplied data for "infinite" feel
    useEffect(() => {
        const multiplier = 20; // 7 * 20 = 140 items
        let hugeList: LearningResource[] = [];

        for (let i = 0; i < multiplier; i++) {
            FALLBACK_LEARNING.forEach(item => {
                hugeList.push({
                    ...item,
                    id: `${item.id}-dup-${i}`, // Unique ID for React keys
                });
            });
        }

        // Randomize slightly so it doesn't look like a perfect pattern
        hugeList.sort(() => Math.random() - 0.5);

        setResources(hugeList);
    }, []);

    // Filters
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
    const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

    // Derived Lists for Filters
    const uniquePlatforms = useMemo(() => Array.from(new Set(resources.map(r => r.platform))).sort(), [resources]);
    const uniqueLevels = useMemo(() => Array.from(new Set(resources.map(r => r.level))).sort(), [resources]);
    const uniqueTypes = useMemo(() => Array.from(new Set(resources.map(r => r.type))).sort(), [resources]);

    // Filter Logic
    const filteredResources = useMemo(() => {
        return resources.filter(r => {
            const lowerSearch = searchTerm.toLowerCase();
            const matchesSearch = r.title.toLowerCase().includes(lowerSearch) ||
                r.instructor.toLowerCase().includes(lowerSearch) ||
                r.tags.some(tag => tag.toLowerCase().includes(lowerSearch));
            const matchesPlatform = selectedPlatforms.length === 0 || selectedPlatforms.includes(r.platform);
            const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(r.level);
            const matchesType = selectedTypes.length === 0 || selectedTypes.includes(r.type);

            return matchesSearch && matchesPlatform && matchesLevel && matchesType;
        });
    }, [resources, searchTerm, selectedPlatforms, selectedLevels, selectedTypes]);

    const toggleFilter = (list: string[], setList: (l: string[]) => void, item: string) => {
        setList(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* LEFT SIDEBAR FILTERS - Sticky on Desktop */}
            <div className="w-full lg:w-64 shrink-0 lg:sticky lg:top-24 space-y-8 h-fit overflow-y-auto max-h-[calc(100vh-120px)] pr-2 custom-scrollbar">

                <div className="flex items-center gap-2 mb-6">
                    <Filter className="w-4 h-4 text-primary" />
                    <span className="font-bold text-lg">Filters</span>
                </div>

                {/* Resource Type */}
                <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Format</h4>
                    {uniqueTypes.map(type => (
                        <div key={type} className="flex items-center space-x-2">
                            <Checkbox
                                id={`type-${type}`}
                                checked={selectedTypes.includes(type)}
                                onCheckedChange={() => toggleFilter(selectedTypes, setSelectedTypes, type)}
                            />
                            <label htmlFor={`type-${type}`} className="text-sm font-medium leading-none flex items-center gap-2">
                                {type === 'Course' ? <BookOpen className="w-3 h-3 text-blue-400" /> :
                                    type === 'Video' ? <Video className="w-3 h-3 text-red-400" /> :
                                        <GraduationCap className="w-3 h-3 text-purple-400" />}
                                {type}
                            </label>
                        </div>
                    ))}
                </div>

                {/* Difficulty Level */}
                <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Level</h4>
                    {uniqueLevels.map(level => (
                        <div key={level} className="flex items-center space-x-2">
                            <Checkbox
                                id={`level-${level}`}
                                checked={selectedLevels.includes(level)}
                                onCheckedChange={() => toggleFilter(selectedLevels, setSelectedLevels, level)}
                            />
                            <label htmlFor={`level-${level}`} className="text-sm font-medium leading-none">{level}</label>
                        </div>
                    ))}
                </div>

                {/* Platforms */}
                <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Platform</h4>
                    <div className="space-y-2">
                        {uniquePlatforms.map(platform => (
                            <div key={platform} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`plat-${platform}`}
                                    checked={selectedPlatforms.includes(platform)}
                                    onCheckedChange={() => toggleFilter(selectedPlatforms, setSelectedPlatforms, platform)}
                                />
                                <label htmlFor={`plat-${platform}`} className="text-sm font-medium leading-none truncate max-w-[150px]" title={platform}>
                                    {platform}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* MAIN FEED COLUMN */}
            <div className="flex-1 min-w-0 space-y-6">

                {/* Header Count */}
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Recommended Resources</h2>
                    <Badge variant="secondary" className="px-3 py-1">{filteredResources.length} Results</Badge>
                </div>

                {/* List */}
                <div className="grid gap-4">
                    {filteredResources.map((resource) => (
                        <Card key={resource.id} className="group overflow-hidden border-white/10 bg-card/30 backdrop-blur-md hover:border-primary/50 hover:shadow-lg transition-all duration-300 relative">
                            {/* Bookmark Button */}
                            <Button
                                size="icon"
                                variant="ghost"
                                className="absolute top-4 right-4 h-8 w-8 rounded-full bg-black/40 hover:bg-black/60 text-white z-20"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleBookmark({
                                        id: resource.id,
                                        title: resource.title,
                                        url: resource.url,
                                        source: resource.platform,
                                        type: resource.type,
                                        publishedAt: new Date().toISOString() // Fallback as we don't have date
                                    });
                                }}
                            >
                                <Bookmark className={`h-4 w-4 ${isBookmarked(resource.id) ? "fill-primary text-primary" : "text-white"}`} />
                            </Button>

                            <CardHeader className="pb-3 p-4 sm:p-6">
                                <div className="flex justify-between items-start gap-4">
                                    <div className="flex gap-4 w-full">
                                        {/* Thumbnail */}
                                        <div className="w-24 h-16 sm:w-32 sm:h-20 rounded-md bg-white/5 border border-white/10 shrink-0 overflow-hidden relative group-hover:ring-1 ring-primary/50 transition-all">
                                            {resource.thumbnail ? (
                                                <>
                                                    <img src={resource.thumbnail} alt={resource.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                                    {resource.type === 'Video' && (
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                                                            <PlayCircle className="w-8 h-8 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                                                        </div>
                                                    )}
                                                </>
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                                    <GraduationCap className="w-8 h-8" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <div>
                                                    <Badge variant="outline" className={`mb-2 text-[10px] uppercase tracking-wider border-${resource.type === 'Course' ? 'blue' : resource.type === 'Video' ? 'red' : 'purple'}-500/30 text-${resource.type === 'Course' ? 'blue' : resource.type === 'Video' ? 'red' : 'purple'}-400`}>
                                                        {resource.type}
                                                    </Badge>
                                                    <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2 leading-tight mb-1">
                                                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                                            {resource.title}
                                                        </a>
                                                    </CardTitle>
                                                </div>
                                                <Button variant="ghost" size="icon" asChild className="hidden sm:flex text-muted-foreground hover:text-primary shrink-0 -mt-1 -mr-2">
                                                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                                        <ExternalLink className="w-5 h-5" />
                                                    </a>
                                                </Button>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-sm text-muted-foreground mt-1">
                                                <span className="font-medium text-white/90 flex items-center gap-1">
                                                    {resource.instructor}
                                                </span>
                                                <span className="hidden sm:inline opacity-30">•</span>
                                                <span className="flex items-center gap-1 text-xs bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                                                    {resource.platform}
                                                </span>
                                                <span className="flex items-center gap-1 text-amber-400 text-xs">
                                                    <Star className="w-3 h-3 fill-amber-400" /> {resource.rating}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="py-0 px-4 sm:px-6">
                                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                                    {resource.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <Badge variant="secondary" className="bg-white/5 hover:bg-white/10 text-xs font-normal">
                                        {resource.level}
                                    </Badge>
                                    <Badge variant="secondary" className="bg-white/5 hover:bg-white/10 text-xs font-normal">
                                        {resource.duration}
                                    </Badge>
                                    <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 text-xs font-normal border border-emerald-500/20">
                                        {resource.price}
                                    </Badge>
                                </div>
                            </CardContent>
                            <CardFooter className="pt-0 pb-4 px-4 sm:px-6 flex justify-end">
                                <Button className="w-full sm:w-auto h-9 gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-all" size="sm" asChild>
                                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                        Start Learning <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                    {filteredResources.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">
                            No learning resources found matching your filters.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
