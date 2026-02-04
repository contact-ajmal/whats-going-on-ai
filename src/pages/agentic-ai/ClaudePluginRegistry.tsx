
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Filter, ExternalLink, ShieldCheck,
    Terminal, Cable, Brain, ArrowLeft, Download,
    Check
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { NeuralBackground } from '@/components/NeuralBackground';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CLAUDE_PLUGINS, ClaudePlugin, ClaudeCommand, ClaudeConnector, ClaudeSkill } from '@/data/claudePlugins';

const CategoryFilter = ({ category, isSelected, onClick }: { category: string, isSelected: boolean, onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${isSelected
            ? 'bg-white text-black shadow-lg shadow-white/20 scale-105'
            : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
            }`}
    >
        {category}
    </button>
);

const PluginCard = ({ plugin }: { plugin: ClaudePlugin }) => {
    const Icon = plugin.icon;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <motion.div
                    whileHover={{ y: -5 }}
                    className="group cursor-pointer relative p-6 rounded-2xl bg-slate-900/40 border border-white/10 hover:border-white/20 transition-all overflow-hidden"
                >
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${plugin.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl bg-gradient-to-br ${plugin.color} bg-opacity-10`}>
                                <Icon className="w-6 h-6 text-white" />
                            </div>
                            {plugin.verified && (
                                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
                                    <ShieldCheck className="w-3 h-3" />
                                    <span>Verified</span>
                                </div>
                            )}
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                            {plugin.name}
                        </h3>
                        <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                            {plugin.description}
                        </p>

                        <div className="flex items-center gap-2 text-xs text-slate-500">
                            <span className="px-2 py-1 rounded-md bg-white/5 border border-white/5">
                                {plugin.commands.length} Commands
                            </span>
                            <span className="px-2 py-1 rounded-md bg-white/5 border border-white/5">
                                {plugin.connectors.length} Connectors
                            </span>
                        </div>
                    </div>
                </motion.div>
            </DialogTrigger>

            <DialogContent className="bg-slate-950 border-white/10 max-w-2xl max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-center gap-4 mb-4">
                        <div className={`p-4 rounded-xl bg-gradient-to-br ${plugin.color}`}>
                            <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
                                {plugin.name}
                                {plugin.verified && <ShieldCheck className="w-5 h-5 text-blue-400" />}
                            </DialogTitle>
                            <DialogDescription className="text-slate-400">
                                by {plugin.author} • {plugin.category}
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="mt-4">
                    <p className="text-slate-300 mb-8 leading-relaxed">
                        {plugin.description}
                    </p>

                    <Tabs defaultValue="commands" className="w-full">
                        <TabsList className="bg-slate-900/50 border border-white/10 w-full justify-start p-1 h-auto gap-2">
                            <TabsTrigger value="commands" className="data-[state=active]:bg-white/10">
                                <Terminal className="w-4 h-4 mr-2" /> Commands
                            </TabsTrigger>
                            <TabsTrigger value="connectors" className="data-[state=active]:bg-white/10">
                                <Cable className="w-4 h-4 mr-2" /> Connectors
                            </TabsTrigger>
                            <TabsTrigger value="skills" className="data-[state=active]:bg-white/10">
                                <Brain className="w-4 h-4 mr-2" /> Skills
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="commands" className="mt-4 space-y-4">
                            {plugin.commands.map((cmd, idx) => (
                                <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5">
                                    <div className="flex items-center gap-2 mb-2 font-mono text-blue-400 text-sm">
                                        <span>{cmd.name}</span>
                                    </div>
                                    <p className="text-slate-400 text-sm mb-3">{cmd.description}</p>
                                    <div className="p-2 rounded bg-black/50 font-mono text-xs text-slate-500">
                                        {cmd.example}
                                    </div>
                                </div>
                            ))}
                        </TabsContent>

                        <TabsContent value="connectors" className="mt-4 grid grid-cols-2 gap-4">
                            {plugin.connectors.map((conn, idx) => {
                                const ConnIcon = conn.icon || Cable;
                                return (
                                    <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-white/5">
                                            <ConnIcon className="w-5 h-5 text-slate-300" />
                                        </div>
                                        <div>
                                            <div className="text-white font-medium text-sm">{conn.name}</div>
                                            <div className="text-slate-500 text-xs">{conn.type}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </TabsContent>

                        <TabsContent value="skills" className="mt-4 space-y-4">
                            {plugin.skills.map((skill, idx) => (
                                <div key={idx} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                                    <div className="mt-1">
                                        <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center">
                                            <Check className="w-3 h-3 text-green-400" />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium mb-1">{skill.name}</h4>
                                        <p className="text-slate-400 text-sm">{skill.description}</p>
                                    </div>
                                </div>
                            ))}
                        </TabsContent>
                    </Tabs>

                    <div className="mt-8 flex gap-3">
                        <Button className="w-full bg-white text-black hover:bg-slate-200">
                            <Download className="w-4 h-4 mr-2" /> Install Plugin
                        </Button>
                        <Button variant="outline" className="w-full border-white/10 hover:bg-white/5">
                            <ExternalLink className="w-4 h-4 mr-2" /> View Documentation
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

const ClaudePluginRegistry = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', 'Productivity', 'Dev', 'Data', 'Business', 'Scientific', 'Creative'];

    const filteredPlugins = CLAUDE_PLUGINS.filter(plugin => {
        const matchesSearch = plugin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            plugin.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === 'All' || plugin.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-black text-slate-200 font-sans selection:bg-purple-500/30">
            <SEO
                title="Claude Plugin Registry | Agentic Marketplace"
                description="Discover and install powerful plugins to extend Claude's agentic capabilities. Connectors, tools, and skills."
                url="/agentic-ai/claude-plugin-registry"
            />
            <Navigation />
            <NeuralBackground />

            <div className="relative pt-32 pb-20 px-6 min-h-screen">
                {/* Hero Section */}
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
                            <Cable className="w-4 h-4" />
                            <span>Beta Marketplace</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
                            Claude Plugin <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Registry</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                            Supercharge your agent with verified plugins.
                            browse commands, skills, and integrations to build your perfect workflow.
                        </p>
                    </motion.div>
                </div>

                {/* Search & Filter */}
                <div className="max-w-6xl mx-auto mb-12 space-y-6">
                    <div className="relative max-w-md mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search plugins, commands, or skills..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-6 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-medium"
                        />
                    </div>

                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map(cat => (
                            <CategoryFilter
                                key={cat}
                                category={cat}
                                isSelected={activeCategory === cat}
                                onClick={() => setActiveCategory(cat)}
                            />
                        ))}
                    </div>
                </div>

                {/* Plugin Grid */}
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {filteredPlugins.map((plugin) => (
                            <PluginCard key={plugin.id} plugin={plugin} />
                        ))}
                    </AnimatePresence>
                </div>

                {/* Empty State */}
                {filteredPlugins.length === 0 && (
                    <div className="text-center py-20">
                        <div className="inline-flex p-4 rounded-full bg-white/5 mb-4">
                            <Search className="w-8 h-8 text-slate-600" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No plugins found</h3>
                        <p className="text-slate-500">Try adjusting your search or filters.</p>
                    </div>
                )}

                {/* Back Link */}
                <div className="mt-20 text-center">
                    <Link
                        to="/agentic-ai"
                        className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors font-medium group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Agentic AI
                    </Link>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ClaudePluginRegistry;
