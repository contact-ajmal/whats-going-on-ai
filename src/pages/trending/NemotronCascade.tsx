import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft, ArrowRight, ExternalLink, GitBranch, Brain,
    Layers, CheckCircle, Target, TrendingUp, Lightbulb,
    Cpu, RefreshCw, BookOpen, Zap, Award, ChevronRight,
    Binary, Shield, BarChart3, Trophy, Star, Code2, Calculator
} from 'lucide-react';
import { NeuralBackground } from '@/components/NeuralBackground';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ShareButtons from '@/components/ShareButtons';
import { SEO } from '@/components/SEO';

// --- Reusable Components ---

const Section = ({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) => (
    <section className={`mb-16 ${className}`}>
        <h2 className="text-3xl font-bold text-slate-100 mb-6 border-b-4 border-emerald-500 inline-block pb-2">
            {title}
        </h2>
        {children}
    </section>
);

const FeatureCard = ({ icon: Icon, title, description, color }: { icon: any; title: string; description: string; color: string }) => (
    <div className={`p-6 rounded-xl border border-white/10 bg-slate-900/50 backdrop-blur-sm hover:border-${color}-500/50 transition-all duration-300 hover:-translate-y-1`}>
        <div className={`p-3 rounded-lg bg-${color}-500/10 text-${color}-400 w-fit mb-4`}>
            <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
);

// --- Cascade Pipeline Visualization ---

const CascadePipelineViz = () => {
    const [activeStage, setActiveStage] = useState<number>(0);

    const stages = [
        {
            id: 'rlhf',
            name: 'RLHF',
            fullName: 'Human Feedback Alignment',
            icon: Brain,
            color: 'blue',
            description: 'Reduces verbosity, improves response quality, and aligns with human preferences.',
            key: 'Foundation for all subsequent stages'
        },
        {
            id: 'if-rl',
            name: 'IF-RL',
            fullName: 'Instruction Following',
            icon: Target,
            color: 'violet',
            description: 'Strict instruction following training. Reduces model entropy and shortens reasoning traces.',
            key: 'Enables precise output formatting'
        },
        {
            id: 'math-rl',
            name: 'Math RL',
            fullName: 'Mathematical Reasoning',
            icon: Calculator,
            color: 'amber',
            description: '18K curated math problems with symbolic rule-based verification. Achieves ~90% on AIME24.',
            key: 'Fast symbolic verification'
        },
        {
            id: 'code-rl',
            name: 'Code RL',
            fullName: 'Competitive Programming',
            icon: Code2,
            color: 'cyan',
            description: 'LiveCodeBench training with execution-based verification. High temperature restores entropy.',
            key: 'Execution-based rewards'
        },
        {
            id: 'swe-rl',
            name: 'SWE RL',
            fullName: 'Software Engineering',
            icon: GitBranch,
            color: 'emerald',
            description: 'Real-world bug fixing on GitHub issues. Uses execution-free reward model for scalability.',
            key: 'Long-context reasoning'
        }
    ];

    return (
        <div className="bg-slate-900/50 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-400" />
                The Cascade RL Pipeline
            </h3>

            {/* Pipeline Visualization */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
                {stages.map((stage, index) => {
                    const Icon = stage.icon;
                    const isActive = activeStage === index;
                    return (
                        <React.Fragment key={stage.id}>
                            <motion.button
                                onClick={() => setActiveStage(index)}
                                className={`relative p-3 md:p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 min-w-[70px] md:min-w-[90px] ${isActive
                                    ? `bg-${stage.color}-500/20 border-${stage.color}-500 scale-105 shadow-[0_0_25px_rgba(16,185,129,0.3)]`
                                    : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                                    }`}
                                whileHover={{ scale: isActive ? 1.05 : 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Icon className={`w-5 h-5 md:w-6 md:h-6 ${isActive ? `text-${stage.color}-400` : 'text-slate-400'}`} />
                                <span className={`text-xs md:text-sm font-bold ${isActive ? `text-${stage.color}-400` : 'text-slate-500'}`}>
                                    {stage.name}
                                </span>
                                {index === stages.length - 1 && (
                                    <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
                                        FINAL
                                    </div>
                                )}
                            </motion.button>
                            {index < stages.length - 1 && (
                                <div className="hidden md:flex items-center">
                                    <ChevronRight className="w-5 h-5 text-slate-600" />
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>

            {/* Stage Detail */}
            <motion.div
                key={activeStage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-black/40 p-6 rounded-lg border border-${stages[activeStage].color}-500/30`}
            >
                <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-${stages[activeStage].color}-500/20`}>
                        {React.createElement(stages[activeStage].icon, {
                            className: `w-6 h-6 text-${stages[activeStage].color}-400`
                        })}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h4 className={`text-xl font-bold text-${stages[activeStage].color}-400`}>
                                Stage {activeStage + 1}: {stages[activeStage].fullName}
                            </h4>
                        </div>
                        <p className="text-slate-300 mb-3">{stages[activeStage].description}</p>
                        <div className="flex items-center gap-2 text-sm">
                            <Lightbulb className="w-4 h-4 text-amber-400" />
                            <span className="text-amber-400/80">{stages[activeStage].key}</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Direction Indicator */}
            <div className="mt-6 text-center">
                <div className="inline-flex items-center gap-2 text-sm text-slate-500 bg-slate-800/50 px-4 py-2 rounded-full">
                    <span>General</span>
                    <ArrowRight className="w-4 h-4" />
                    <span>Specialized</span>
                </div>
            </div>
        </div>
    );
};

// --- Forgetting Resistance Diagram ---

const ForgettingDiagram = () => {
    const reasons = [
        {
            icon: RefreshCw,
            title: "On-Policy Learning",
            description: "Model generates its own training data. Old behaviors persist if they remain useful.",
            color: "blue"
        },
        {
            icon: Target,
            title: "Cumulative Rewards",
            description: "Optimizes long-term outcomes, not exact token-level targets. Knowledge generalizes.",
            color: "violet"
        },
        {
            icon: Shield,
            title: "Overlapping Rewards",
            description: "All domains benefit from reduced verbosity, better accuracy, and clearer reasoning.",
            color: "amber"
        },
        {
            icon: Layers,
            title: "Minimal Prompt Overlap",
            description: "Math/code prompts removed from RLHF. General → specialized ordering.",
            color: "emerald"
        }
    ];

    return (
        <div className="bg-slate-900/50 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-400" />
                Why Cascade RL Resists Catastrophic Forgetting
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
                {reasons.map((reason, idx) => {
                    const Icon = reason.icon;
                    return (
                        <div
                            key={idx}
                            className={`p-4 rounded-lg border border-${reason.color}-500/30 bg-${reason.color}-500/5 hover:bg-${reason.color}-500/10 transition-colors`}
                        >
                            <div className="flex items-start gap-3">
                                <div className={`p-2 rounded-lg bg-${reason.color}-500/20`}>
                                    <Icon className={`w-5 h-5 text-${reason.color}-400`} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-1">{reason.title}</h4>
                                    <p className="text-sm text-slate-400">{reason.description}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Comparison */}
            <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div className="p-4 border border-red-500/30 rounded-lg bg-red-500/5 opacity-60">
                    <div className="flex items-center gap-2 mb-2">
                        <Binary className="w-4 h-4 text-red-400" />
                        <span className="text-sm font-bold text-red-400">Traditional SFT</span>
                    </div>
                    <p className="text-xs text-slate-400">Fixed dataset → New domain overwrites old knowledge</p>
                </div>
                <div className="p-4 border border-emerald-500/30 rounded-lg bg-emerald-500/5">
                    <div className="flex items-center gap-2 mb-2">
                        <RefreshCw className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm font-bold text-emerald-400">Cascade RL</span>
                    </div>
                    <p className="text-xs text-slate-400">Self-generated data → Old behaviors persist if reward-relevant</p>
                </div>
            </div>
        </div>
    );
};

// --- Benchmark Card ---

const BenchmarkCard = ({ title, benchmarks, icon: Icon }: {
    title: string;
    benchmarks: { name: string; score: string; comparison?: string }[];
    icon: any;
}) => (
    <div className="bg-slate-900/50 p-5 rounded-xl border border-white/10">
        <div className="flex items-center gap-2 mb-4">
            <Icon className="w-5 h-5 text-emerald-400" />
            <h4 className="font-bold text-white">{title}</h4>
        </div>
        <div className="space-y-3">
            {benchmarks.map((b, idx) => (
                <div key={idx} className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">{b.name}</span>
                    <div className="flex items-center gap-2">
                        <span className="font-mono text-emerald-400 font-bold">{b.score}</span>
                        {b.comparison && (
                            <span className="text-xs text-emerald-500/70">({b.comparison})</span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// --- IOI Spotlight ---

const IOISpotlight = () => (
    <div className="relative overflow-hidden bg-gradient-to-br from-amber-500/10 via-yellow-500/5 to-amber-500/10 border border-amber-500/30 rounded-2xl p-8">
        <div className="absolute top-4 right-4">
            <Trophy className="w-16 h-16 text-amber-500/20" />
        </div>
        <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-amber-500/20 rounded-xl">
                <Award className="w-8 h-8 text-amber-400" />
            </div>
            <div>
                <h3 className="text-2xl font-bold text-white">🥈 IOI 2025 Silver Medal</h3>
                <p className="text-amber-400/80">International Olympiad in Informatics</p>
            </div>
        </div>
        <p className="text-slate-300 mb-4">
            The <strong className="text-white">Nemotron-Cascade-14B-Thinking</strong> model achieved silver-medal performance at the 2025 International Olympiad in Informatics—a premier competitive programming competition for the world's top high school students.
        </p>
        <div className="flex flex-wrap gap-3">
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">14B Parameters</Badge>
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">64K Token Budget</Badge>
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">Outperforms 671B DeepSeek-R1</Badge>
        </div>
    </div>
);

// --- Main Component ---

export default function NemotronCascade() {
    return (
        <div className="min-h-screen bg-black font-sans text-slate-200">
            <SEO
                title="Nemotron-Cascade: Scaling Cascaded RL for Reasoning Models"
                description="NVIDIA's open Cascade RL framework trains unified reasoning LLMs by sequentially optimizing across domains—achieving SOTA on math, code, and SWE benchmarks."
                url="/trending/nemotron-cascade"
                type="article"
            />
            <Navigation />
            <NeuralBackground />

            {/* Hero Header */}
            <header className="pt-32 pb-24 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                    <Cpu size={400} className="text-emerald-500" />
                </div>
                <div className="max-w-4xl mx-auto relative z-10">
                    {/* Breadcrumb */}
                    <Link to="/trending" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-6 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Trending AI Tech
                    </Link>

                    <div className="text-center">
                        <Badge variant="outline" className="mb-6 text-emerald-400 border-emerald-400/30 py-1.5 px-4 text-sm backdrop-blur-md">
                            🔬 arXiv:2512.13607 • NVIDIA Research
                        </Badge>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-400 to-teal-500">
                                Nemotron-Cascade
                            </span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
                            Scaling <strong className="text-white">Cascaded Reinforcement Learning</strong> for general-purpose reasoning models. Train once, reason everywhere—without forgetting.
                        </p>
                        <div className="flex justify-center">
                            <ShareButtons title="Nemotron-Cascade: Scaling Cascaded RL for Reasoning Models" />
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 pb-24 relative z-20">

                {/* Intro Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid md:grid-cols-3 gap-6 mb-16"
                >
                    <FeatureCard
                        icon={Layers}
                        title="Cascade RL"
                        description="Sequential training across domains: RLHF → IF-RL → Math → Code → SWE. General to specialized."
                        color="emerald"
                    />
                    <FeatureCard
                        icon={Brain}
                        title="Unified Model"
                        description="Single model operates in both thinking and non-thinking modes. No separate deployments needed."
                        color="blue"
                    />
                    <FeatureCard
                        icon={Trophy}
                        title="SOTA Performance"
                        description="Best-in-class on AIME, LiveCodeBench, SWE-bench. Silver medal at IOI 2025."
                        color="amber"
                    />
                </motion.div>

                {/* Section 1: The Problem */}
                <Section title="1. The Challenge">
                    <div className="space-y-6 text-lg text-slate-400">
                        <p>
                            Training general-purpose reasoning LLMs with RL is <strong className="text-white">fundamentally heterogeneous</strong>. Different domains require different:
                        </p>

                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="p-4 bg-slate-900 border border-white/10 rounded-lg text-center">
                                <div className="text-3xl mb-2">⚡</div>
                                <p className="text-sm"><strong className="text-white">Response Lengths</strong><br />Math: short | SWE: very long</p>
                            </div>
                            <div className="p-4 bg-slate-900 border border-white/10 rounded-lg text-center">
                                <div className="text-3xl mb-2">🔍</div>
                                <p className="text-sm"><strong className="text-white">Verification Methods</strong><br />Symbolic vs. Execution-based</p>
                            </div>
                            <div className="p-4 bg-slate-900 border border-white/10 rounded-lg text-center">
                                <div className="text-3xl mb-2">⏱️</div>
                                <p className="text-sm"><strong className="text-white">Verification Speed</strong><br />Fast rules vs. slow execution</p>
                            </div>
                        </div>

                        <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-3">Key Insight</h4>
                            <p className="text-sm">
                                Instead of mixing all domains together (which slows training and complicates hyperparameters), <strong className="text-emerald-400">train sequentially</strong> from general alignment to specialized reasoning. Each stage builds on the last.
                            </p>
                        </div>
                    </div>
                </Section>

                {/* Section 2: The Pipeline */}
                <Section title="2. The Cascade Pipeline">
                    <div className="space-y-6">
                        <p className="text-lg text-slate-400">
                            Nemotron-Cascade applies RL in a <strong className="text-white">cascaded manner</strong>—each stage optimizes a specific capability while preserving gains from previous stages.
                        </p>
                        <CascadePipelineViz />
                    </div>
                </Section>

                {/* Section 3: Why It Works */}
                <Section title="3. Why It Doesn't Forget">
                    <div className="space-y-6">
                        <p className="text-lg text-slate-400">
                            A major concern with sequential training is <strong className="text-white">catastrophic forgetting</strong>—where learning new domains overwrites old knowledge. Cascade RL is naturally resistant to this.
                        </p>
                        <ForgettingDiagram />
                    </div>
                </Section>

                {/* Section 4: Benchmarks */}
                <Section title="4. Benchmark Results">
                    <p className="text-lg text-slate-400 mb-6">
                        Nemotron-Cascade-8B and 14B-Thinking achieve <strong className="text-white">best-in-class performance</strong> across almost all benchmarks, often outperforming much larger models.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                        <BenchmarkCard
                            title="Mathematical Reasoning"
                            icon={Calculator}
                            benchmarks={[
                                { name: "AIME 2024", score: "89.7%", comparison: "+10.4 vs Qwen3-14B" },
                                { name: "AIME 2025", score: "83.3%", comparison: "+12.9 vs Qwen3-14B" },
                                { name: "GPQA-Diamond", score: "69.6%", comparison: "+5.6 vs Qwen3-14B" }
                            ]}
                        />
                        <BenchmarkCard
                            title="Code & Programming"
                            icon={Code2}
                            benchmarks={[
                                { name: "LiveCodeBench v6", score: "74.6%", comparison: "+11.1 vs Qwen3-14B" },
                                { name: "LCB Pro 25Q2 (Med)", score: "10.5%", comparison: "+7.9 vs Qwen3-14B" },
                                { name: "Codeforces ELO", score: "1932", comparison: "97.2 percentile" }
                            ]}
                        />
                        <BenchmarkCard
                            title="Software Engineering"
                            icon={GitBranch}
                            benchmarks={[
                                { name: "SWE-bench Verified", score: "43.1%", comparison: "+15.7 vs Qwen3-14B" },
                                { name: "w/ Test-Time Scaling", score: "53.8%", comparison: "best-in-size" }
                            ]}
                        />
                        <BenchmarkCard
                            title="Alignment & IF"
                            icon={Target}
                            benchmarks={[
                                { name: "ArenaHard", score: "89.5%", comparison: "+12.6 vs SFT" },
                                { name: "IFEval (strict)", score: "81.9%", comparison: "+12.1 vs SFT" },
                                { name: "IFBench", score: "41.7%", comparison: "+17.4 vs SFT" }
                            ]}
                        />
                    </div>
                </Section>

                {/* Section 5: IOI Highlight */}
                <Section title="5. Competition Spotlight">
                    <IOISpotlight />
                </Section>

                {/* Section 6: Resources */}
                <Section title="6. Resources">
                    <div className="grid md:grid-cols-2 gap-4">
                        <a
                            href="https://arxiv.org/abs/2512.13607"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 bg-slate-900 rounded-xl border border-white/10 hover:border-emerald-500/50 transition-all group"
                        >
                            <div className="p-3 bg-white/5 rounded-lg">
                                <BookOpen className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white group-hover:text-emerald-400 transition-colors">Read the Paper</h4>
                                <p className="text-xs text-slate-500">arXiv:2512.13607v1</p>
                            </div>
                            <ExternalLink className="ml-auto w-4 h-4 text-slate-600 group-hover:text-emerald-400" />
                        </a>
                        <a
                            href="https://huggingface.co/nvidia"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 bg-slate-900 rounded-xl border border-white/10 hover:border-blue-500/50 transition-all group"
                        >
                            <div className="p-3 bg-white/5 rounded-lg">
                                <Cpu className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors">NVIDIA on HuggingFace</h4>
                                <p className="text-xs text-slate-500">Model weights & checkpoints</p>
                            </div>
                            <ExternalLink className="ml-auto w-4 h-4 text-slate-600 group-hover:text-blue-400" />
                        </a>
                    </div>
                </Section>

                {/* Key Takeaway */}
                <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 text-center mt-12">
                    <h3 className="text-2xl font-bold text-white mb-4">The Bottom Line</h3>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        <strong className="text-emerald-400">Cascade RL</strong> proves you don't need to train everything together. Sequential, domain-specific optimization builds on previous gains—resulting in smaller models that outperform giants.
                    </p>
                </div>

                {/* CTA */}
                <div className="text-center pt-12 border-t border-white/10 mt-12">
                    <Link to="/trending">
                        <Button variant="outline" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Trending AI Tech
                        </Button>
                    </Link>
                </div>

            </main>

            <Footer />
        </div>
    );
}
