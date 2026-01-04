import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Search, Sparkles, ChevronRight, Github, Filter } from 'lucide-react';
import { NeuralBackground } from '@/components/NeuralBackground';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CLAUDE_SKILLS, SKILL_CATEGORIES, ClaudeSkill } from '@/data/claudeSkills';

export default function ClaudeSkills() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [showOfficial, setShowOfficial] = useState<boolean | null>(null);

    const filteredSkills = useMemo(() => {
        let filtered = CLAUDE_SKILLS;

        if (selectedCategory) {
            filtered = filtered.filter(skill => skill.category === selectedCategory);
        }

        if (showOfficial !== null) {
            filtered = filtered.filter(skill => skill.isOfficial === showOfficial);
        }

        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(skill =>
                skill.name.toLowerCase().includes(term) ||
                skill.description.toLowerCase().includes(term)
            );
        }

        return filtered;
    }, [searchTerm, selectedCategory, showOfficial]);

    const groupedSkills = useMemo(() => {
        const groups: Record<string, ClaudeSkill[]> = {};
        filteredSkills.forEach(skill => {
            if (!groups[skill.category]) {
                groups[skill.category] = [];
            }
            groups[skill.category].push(skill);
        });
        return groups;
    }, [filteredSkills]);

    const getCategoryInfo = (categoryId: string) => {
        return SKILL_CATEGORIES.find(c => c.id === categoryId) || { name: categoryId, color: 'text-gray-400' };
    };

    return (
        <div className="min-h-screen bg-background">
            <NeuralBackground />
            <Navigation />

            <main className="relative pt-28 pb-16">
                <div className="container mx-auto px-6">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto text-center mb-12"
                    >
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Sparkles className="w-8 h-8 text-primary" />
                            <Badge className="bg-primary/10 text-primary border-primary/30 text-sm">
                                Claude Code Skills
                            </Badge>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="text-primary">//</span> Agent Skills Directory
                        </h1>

                        <p className="text-xl text-muted-foreground mb-6">
                            Extend Claude's capabilities with community and official skills across industries.
                        </p>

                        {/* Quick Links */}
                        <div className="flex flex-wrap justify-center gap-3 mb-8">
                            <a
                                href="https://github.com/anthropics/skills"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-colors text-sm"
                            >
                                <Github className="w-4 h-4" />
                                Official Anthropic Skills
                                <ExternalLink className="w-3 h-3" />
                            </a>
                            <a
                                href="https://github.com/BehiSecc/awesome-claude-skills"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 hover:bg-purple-500/20 transition-colors text-sm"
                            >
                                <Github className="w-4 h-4" />
                                Awesome Claude Skills
                                <ExternalLink className="w-3 h-3" />
                            </a>
                            <Link
                                to="/trending/anthropic-skills"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 hover:bg-orange-500/20 transition-colors text-sm"
                            >
                                Learn How Skills Work
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="max-w-6xl mx-auto mb-8"
                    >
                        {/* Search */}
                        <div className="max-w-md mx-auto mb-6 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search skills..."
                                className="pl-10 bg-background/50 border-primary/20 focus:border-primary"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Category Pills */}
                        <div className="flex flex-wrap justify-center gap-2 mb-4">
                            <Button
                                variant={selectedCategory === null ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedCategory(null)}
                                className="rounded-full"
                            >
                                All ({CLAUDE_SKILLS.length})
                            </Button>
                            {SKILL_CATEGORIES.map(cat => {
                                const count = CLAUDE_SKILLS.filter(s => s.category === cat.id).length;
                                return (
                                    <Button
                                        key={cat.id}
                                        variant={selectedCategory === cat.id ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setSelectedCategory(cat.id)}
                                        className="rounded-full"
                                    >
                                        {cat.name} ({count})
                                    </Button>
                                );
                            })}
                        </div>

                        {/* Official Filter */}
                        <div className="flex justify-center gap-2">
                            <Button
                                variant={showOfficial === null ? "secondary" : "ghost"}
                                size="sm"
                                onClick={() => setShowOfficial(null)}
                            >
                                All Sources
                            </Button>
                            <Button
                                variant={showOfficial === true ? "secondary" : "ghost"}
                                size="sm"
                                onClick={() => setShowOfficial(true)}
                                className="gap-1"
                            >
                                <Badge className="bg-primary/20 text-primary text-[10px] px-1">Official</Badge>
                                Anthropic
                            </Button>
                            <Button
                                variant={showOfficial === false ? "secondary" : "ghost"}
                                size="sm"
                                onClick={() => setShowOfficial(false)}
                            >
                                Community
                            </Button>
                        </div>
                    </motion.div>

                    {/* Skills Grid */}
                    <div className="max-w-6xl mx-auto space-y-12">
                        {Object.entries(groupedSkills).map(([categoryId, skills], idx) => {
                            const catInfo = getCategoryInfo(categoryId);
                            return (
                                <motion.div
                                    key={categoryId}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 * idx }}
                                >
                                    <div className="flex items-center gap-3 mb-6">
                                        <h2 className={`text-2xl font-bold ${catInfo.color}`}>
                                            {catInfo.name}
                                        </h2>
                                        <Badge variant="outline" className="ml-2">
                                            {skills.length} skills
                                        </Badge>
                                    </div>

                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {skills.map((skill) => (
                                            <Card
                                                key={skill.name}
                                                className="group border-white/10 bg-card/30 backdrop-blur-md hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                                            >
                                                <CardHeader className="pb-2">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors flex items-center gap-2">
                                                            {skill.name}
                                                            {skill.isOfficial && (
                                                                <Badge className="bg-primary/20 text-primary text-[10px] px-1.5 py-0">
                                                                    Official
                                                                </Badge>
                                                            )}
                                                        </CardTitle>
                                                        <a
                                                            href={skill.repo}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-muted-foreground hover:text-primary transition-colors"
                                                        >
                                                            <ExternalLink className="w-4 h-4" />
                                                        </a>
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                                                        {skill.description}
                                                    </p>
                                                    <a
                                                        href={skill.repo}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                                                    >
                                                        <Github className="w-3 h-3" />
                                                        View on GitHub
                                                    </a>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {filteredSkills.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-muted-foreground text-lg">No skills found matching your criteria.</p>
                            <Button
                                variant="outline"
                                className="mt-4"
                                onClick={() => {
                                    setSearchTerm('');
                                    setSelectedCategory(null);
                                    setShowOfficial(null);
                                }}
                            >
                                Clear Filters
                            </Button>
                        </div>
                    )}

                    {/* How to Use Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto mt-20 p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-purple-500/5 border border-primary/20"
                    >
                        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <Sparkles className="w-6 h-6 text-primary" />
                            How to Install Skills
                        </h3>
                        <div className="space-y-4 text-muted-foreground">
                            <p>
                                Skills are installed by cloning the skill repository into your Claude Code skills directory.
                            </p>
                            <div className="bg-black/30 rounded-lg p-4 font-mono text-sm">
                                <code className="text-primary">
                                    # Clone to your ~/.claude/skills/ directory<br />
                                    cd ~/.claude/skills/<br />
                                    git clone https://github.com/anthropics/skills/skills/pdf
                                </code>
                            </div>
                            <p>
                                Once installed, Claude will automatically detect and use the skill when relevant to your task.
                            </p>
                            <Link
                                to="/trending/anthropic-skills"
                                className="inline-flex items-center gap-2 text-primary hover:underline"
                            >
                                Learn more about Agent Skills
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
