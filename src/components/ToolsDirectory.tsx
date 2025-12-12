import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Terminal, Database, Video, Mic, Briefcase, GraduationCap, ExternalLink, ChevronDown, ChevronUp, Bookmark } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tool } from '@/data/toolsData';
import { DataManager } from '@/lib/dataManager';
import { useBookmarks } from '@/hooks/useBookmarks';

const categories = [
    { id: 'All', label: 'All Tools', icon: Sparkles },
    { id: 'MCP Server', label: 'MCP Servers', icon: Database },
    { id: 'Chatbot', label: 'Chatbots', icon: Terminal },
    { id: 'Dev', label: 'Dev Tools', icon: Terminal },
    { id: 'Image', label: 'Image Gen', icon: Video }, // Reusing Video icon as generic media
    { id: 'Video', label: 'Video Gen', icon: Video },
    { id: 'Audio', label: 'Audio/Speech', icon: Mic },
    { id: 'Productivity', label: 'Productivity', icon: Briefcase },
    { id: 'Research', label: 'Research', icon: GraduationCap },
];

export function ToolsDirectory() {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [expandedTool, setExpandedTool] = useState<string | null>(null);
    const [tools, setTools] = useState<Tool[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadTools = async () => {
            setIsLoading(true);
            const data = await DataManager.getTools();
            setTools(data);
            setIsLoading(false);
        };
        loadTools();
    }, []);

    const filteredTools = useMemo(() => {
        return tools.filter(tool => {
            const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase()) ||
                tool.description.toLowerCase().includes(search.toLowerCase()) ||
                tool.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
            const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [search, activeCategory, tools]);

    return (
        <div className="w-full max-w-7xl mx-auto">
            {/* Controls */}
            <div className="space-y-6 mb-12">
                {/* Search */}
                <div className="relative max-w-2xl mx-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search for tools, servers, or tags..."
                        className="pl-12 py-6 text-lg bg-white/5 border-white/10 backdrop-blur-md rounded-2xl focus-visible:ring-primary/50"
                    />
                </div>

                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-2">
                    {categories.map((cat) => (
                        <Button
                            key={cat.id}
                            variant={activeCategory === cat.id ? 'default' : 'outline'}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`rounded-full border-white/10 ${activeCategory === cat.id ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-white/5 hover:bg-white/10 text-muted-foreground'}`}
                        >
                            <cat.icon className="w-4 h-4 mr-2" />
                            {cat.label}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {filteredTools.map((tool) => (
                        <ToolCard
                            key={tool.id}
                            tool={tool}
                            isExpanded={expandedTool === tool.id}
                            onToggle={() => setExpandedTool(expandedTool === tool.id ? null : tool.id)}
                        />
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredTools.length === 0 && (
                <div className="text-center py-20 text-muted-foreground">
                    <p className="text-xl">No tools found matching your criteria.</p>
                </div>
            )}
        </div>
    );
}

function ToolCard({ tool, isExpanded, onToggle }: { tool: Tool, isExpanded: boolean, onToggle: () => void }) {
    const { toggleBookmark, isBookmarked } = useBookmarks();

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
        >
            <Card className={`h-full border-white/10 bg-black/40 backdrop-blur-md hover:border-white/20 transition-all duration-300 overflow-hidden relative ${tool.category === 'MCP Server' ? 'shadow-[0_0_15px_rgba(59,130,246,0.1)] border-blue-500/20' : ''}`}>
                {/* Bookmark Button */}
                <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/5 hover:bg-white/10 text-white z-20"
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark({
                            id: tool.id,
                            title: tool.name,
                            url: tool.url,
                            source: tool.category,
                            type: 'Tool',
                            publishedAt: new Date().toISOString()
                        });
                    }}
                >
                    <Bookmark className={`h-4 w-4 ${isBookmarked(tool.id) ? "fill-primary text-primary" : "text-white"}`} />
                </Button>

                <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl">
                                {tool.icon}
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-white leading-tight flex items-center gap-2">
                                    {tool.name}
                                    {tool.isNew && <Badge variant="secondary" className="text-[10px] h-4 px-1 bg-green-500/10 text-green-400 border-green-500/20">NEW</Badge>}
                                </h3>
                                <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                                    <Badge variant="outline" className="text-[10px] h-5 border-white/10">{tool.category}</Badge>
                                    <span>{tool.pricing}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 h-10">
                        {tool.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                        {tool.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-muted-foreground">#{tag}</span>
                        ))}
                    </div>

                    <div className="flex gap-2 mt-auto">
                        <Button variant="default" className="flex-1 bg-white text-black hover:bg-white/90" asChild>
                            <a href={tool.url} target="_blank" rel="noopener noreferrer">
                                Visit <ExternalLink className="w-3 h-3 ml-2" />
                            </a>
                        </Button>
                        {tool.howToUse && (
                            <Button variant="outline" size="icon" onClick={onToggle} className={isExpanded ? 'bg-white/10' : ''}>
                                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </Button>
                        )}
                    </div>
                </div>

                {/* Quick Guide Expansion */}
                <AnimatePresence>
                    {isExpanded && tool.howToUse && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t border-white/10 bg-white/5"
                        >
                            <div className="p-4 space-y-2">
                                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Quick Start</h4>
                                <ol className="list-decimal list-inside space-y-1 text-xs text-muted-foreground font-mono">
                                    {tool.howToUse.map((step, i) => (
                                        <li key={i}>{step}</li>
                                    ))}
                                </ol>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Card>
        </motion.div>
    );
}
