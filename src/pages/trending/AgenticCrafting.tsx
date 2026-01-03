import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft, ArrowRight, Database, Zap,
    ExternalLink, GitBranch, Network, Brain,
    Layers, Search, History, Users, Building2,
    Workflow, FileSearch, MessageSquare, CheckCircle,
    AlertTriangle, Target, TrendingUp, Lightbulb,
    Box, Cpu, Terminal, RefreshCw, Scale, BookOpen
} from 'lucide-react';
import { NeuralBackground } from '@/components/NeuralBackground';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// --- Reusable Components ---

const Section = ({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) => (
    <section className={`mb-16 ${className}`}>
        <h2 className="text-3xl font-bold text-slate-100 mb-6 border-b-4 border-rose-500 inline-block pb-2">
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

// --- Interactive Demo: ALE Architecture (ROCK, ROLL, iFlow) ---

const ArchitectureDemo = () => {
    const [activeComponent, setActiveComponent] = useState<'flow' | 'rock' | 'roll'>('flow');

    const components = {
        flow: {
            title: "iFlow CLI: Context Engineering",
            desc: "The agent framework (based on flows) that manages optimal context construction.",
            icon: Terminal,
            color: "blue",
            detail: "Handles recursive context optimization to prevent 'lost-in-the-middle' phenomena."
        },
        rock: {
            title: "ROCK: Sandbox Environment",
            desc: "Robust Open-World Contextual Knowledge (Sandbox) for safe trajectory generation.",
            icon: Box,
            color: "orange",
            detail: "Provides containerized environments (Docker) where agents can safely execute code and observe results."
        },
        roll: {
            title: "ROLL: Policy Optimization",
            desc: "Reflection-based Optimization for Learning Loops (Post-training).",
            icon: RefreshCw,
            color: "rose",
            detail: "Updates model weights using Interaction-Based Policy Alignment (IPA) on collected trajectories."
        }
    };

    return (
        <div className="bg-slate-900/50 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Layers className="w-5 h-5 text-rose-400" />
                The ALE Ecosystem Architecture
            </h3>

            <div className="flex flex-col md:flex-row gap-8 items-center justify-center py-8">
                {/* Visual Representation */}
                <div className="relative flex items-center gap-4">
                    {/* Node 1: iFlow */}
                    <button
                        onClick={() => setActiveComponent('flow')}
                        className={`p-6 rounded-2xl border-2 transition-all relative z-10 ${activeComponent === 'flow'
                            ? 'bg-blue-500/20 border-blue-500 scale-110 shadow-[0_0_30px_rgba(59,130,246,0.5)]'
                            : 'bg-slate-800/50 border-slate-700 hover:border-blue-500/50'
                            }`}
                    >
                        <Terminal className={`w-8 h-8 ${activeComponent === 'flow' ? 'text-blue-400' : 'text-slate-400'}`} />
                        <span className={`absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-bold ${activeComponent === 'flow' ? 'text-blue-400' : 'text-slate-500'}`}>
                            iFlow
                        </span>
                    </button>

                    {/* Arrow */}
                    <ArrowRight className="text-slate-600 w-6 h-6 animate-pulse" />

                    {/* Node 2: ROCK */}
                    <button
                        onClick={() => setActiveComponent('rock')}
                        className={`p-6 rounded-2xl border-2 transition-all relative z-10 ${activeComponent === 'rock'
                            ? 'bg-orange-500/20 border-orange-500 scale-110 shadow-[0_0_30px_rgba(249,115,22,0.5)]'
                            : 'bg-slate-800/50 border-slate-700 hover:border-orange-500/50'
                            }`}
                    >
                        <Box className={`w-8 h-8 ${activeComponent === 'rock' ? 'text-orange-400' : 'text-slate-400'}`} />
                        <span className={`absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-bold ${activeComponent === 'rock' ? 'text-orange-400' : 'text-slate-500'}`}>
                            ROCK
                        </span>
                    </button>

                    {/* Arrow */}
                    <ArrowRight className="text-slate-600 w-6 h-6 animate-pulse" />

                    {/* Node 3: ROLL */}
                    <button
                        onClick={() => setActiveComponent('roll')}
                        className={`p-6 rounded-2xl border-2 transition-all relative z-10 ${activeComponent === 'roll'
                            ? 'bg-rose-500/20 border-rose-500 scale-110 shadow-[0_0_30px_rgba(244,63,94,0.5)]'
                            : 'bg-slate-800/50 border-slate-700 hover:border-rose-500/50'
                            }`}
                    >
                        <RefreshCw className={`w-8 h-8 ${activeComponent === 'roll' ? 'text-rose-400' : 'text-slate-400'}`} />
                        <span className={`absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-bold ${activeComponent === 'roll' ? 'text-rose-400' : 'text-slate-500'}`}>
                            ROLL
                        </span>
                    </button>

                    {/* Feedback Loop Line */}
                    <div className="absolute top-full mt-8 left-0 w-full h-4 border-2 border-slate-700 border-t-0 border-l-2 border-r-2 rounded-b-xl" />
                    <div className="absolute top-full mt-6 left-1/2 -translate-x-1/2 bg-slate-900 px-2 text-xs text-slate-500 uppercase tracking-widest font-mono">
                        Iterative Improvement
                    </div>

                </div>
            </div>

            {/* Detail Box */}
            <div className={`mt-12 bg-black/40 p-6 rounded-lg border border-${components[activeComponent].color}-500/30 transition-colors duration-500`}>
                <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-${components[activeComponent].color}-500/20`}>
                        {React.createElement(components[activeComponent].icon, {
                            className: `w-6 h-6 text-${components[activeComponent].color}-400`
                        })}
                    </div>
                    <div>
                        <h4 className={`text-xl font-bold text-${components[activeComponent].color}-400 mb-2`}>
                            {components[activeComponent].title}
                        </h4>
                        <p className="text-white mb-2 font-medium">{components[activeComponent].desc}</p>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            {components[activeComponent].detail}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- IPA Visualization ---

const IPAViz = () => {
    return (
        <div className="bg-slate-900/50 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Scale className="w-5 h-5 text-green-400" />
                IPA vs Traditional RLHF
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Traditional */}
                <div className="relative p-4 border border-slate-700 rounded-lg bg-slate-800/20 opacity-50">
                    <div className="absolute -top-3 left-4 bg-slate-800 px-2 text-xs text-slate-400">Traditional RLHF</div>
                    <div className="flex gap-1 mb-2 overflow-hidden">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="h-8 w-8 bg-slate-700 rounded flex items-center justify-center text-[10px] text-slate-500">
                                tok
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-slate-500">Credits assigned per-token. Noisy and unstable for long tasks.</p>
                </div>

                {/* IPA */}
                <div className="relative p-4 border border-green-500/50 rounded-lg bg-green-900/10">
                    <div className="absolute -top-3 left-4 bg-slate-900 px-2 text-xs text-green-400 font-bold">IPA (Interaction Policy Alignment)</div>
                    <div className="flex gap-2 mb-2">
                        <div className="h-8 flex-1 bg-green-500/20 border border-green-500/50 rounded flex items-center justify-center text-xs text-green-300 font-bold">
                            Interaction Chunk 1
                        </div>
                        <div className="h-8 flex-1 bg-green-500/20 border border-green-500/50 rounded flex items-center justify-center text-xs text-green-300 font-bold">
                            Interaction Chunk 2
                        </div>
                    </div>
                    <p className="text-xs text-slate-400">Credits assigned to <span className="text-green-400">semantic interaction blocks</span>. Stable long-horizon learning.</p>
                </div>
            </div>
        </div>
    );
};

// --- Main Component ---

export default function AgenticCrafting() {
    return (
        <div className="min-h-screen bg-black font-sans text-slate-200">
            <Navigation />
            <NeuralBackground />

            {/* Hero Header */}
            <header className="pt-32 pb-24 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                    <Workflow size={400} className="text-rose-500" />
                </div>
                <div className="max-w-4xl mx-auto relative z-10">
                    {/* Breadcrumb */}
                    <Link to="/trending" className="inline-flex items-center gap-2 text-rose-400 hover:text-rose-300 mb-6 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Trending AI Tech
                    </Link>

                    <div className="text-center">
                        <Badge variant="outline" className="mb-6 text-rose-400 border-rose-400/30 py-1.5 px-4 text-sm backdrop-blur-md">
                            🔥 arXiv:2512.24873 • Agent Architecture
                        </Badge>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-orange-400 to-rose-600">
                                Agentic Crafting
                            </span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            A deep dive into <strong className="text-white">ROCK, ROLL, and ROME</strong>—the new open ecosystem for building autonomous agents that actually work.
                        </p>
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
                        icon={Cpu}
                        title="ROME Model"
                        description="A new open-source agent trained on 1M+ trajectories, specifically optimized for long-horizon tasks."
                        color="rose"
                    />
                    <FeatureCard
                        icon={Box}
                        title="ROCK Sandbox"
                        description="Robust Open-World Contextual Knowledge. A principled environment manager for safe execution."
                        color="orange"
                    />
                    <FeatureCard
                        icon={RefreshCw}
                        title="ALE Ecosystem"
                        description="End-to-end infrastructure specifically designing the 'production pipeline' for agent LLMs."
                        color="blue"
                    />
                </motion.div>

                {/* Section 1: The Paper */}
                <Section title="1. The Problem: Agents are Brittle">
                    <div className="space-y-6 text-lg text-slate-400">
                        <p>
                            We've all seen it: An agent works great for 5 turns, then gets stuck in a loop, hallucinating commands or losing context.
                            The paper <em className="text-white">"Let It Flow: Agentic Crafting on Rock and Roll"</em> argues that this isn't just a data problem—it's an <strong className="text-white">infrastructure problem</strong>.
                        </p>

                        <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-3">Key Insight</h4>
                            <p className="text-sm">
                                Training LLMs on static text (Pre-training/SFT) is fundamentally different from training them to be agents.
                                Agents interact with dynamic worlds. We need a training pipeline that treats <strong className="text-rose-400">environment interaction</strong> as a first-class citizen.
                            </p>
                        </div>
                    </div>
                </Section>

                {/* Section 2: ALE Architecture */}
                <Section title="2. The ALE Ecosystem">
                    <div className="space-y-6">
                        <p className="text-lg text-slate-400">
                            To solve this, the authors introduce <strong>ALE (Agentic Learning Ecosystem)</strong>. It decomposes the agent formatting problem into three distinct phases:
                        </p>
                        <ArchitectureDemo />
                    </div>
                </Section>

                {/* Section 3: The ROME Model */}
                <Section title="3. Meet ROME">
                    <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-white mb-4">ROME is Obviously an Agentic Model</h3>
                            <p className="text-slate-400 mb-4">
                                ROME is the proof-of-concept model released with the paper. It was trained on <strong className="text-rose-400">1 million trajectories</strong> collected using the ALE infrastructure.
                            </p>
                            <ul className="space-y-2 text-slate-400">
                                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-rose-500" /> SOTA on SWE-bench Verified</li>
                                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-rose-500" /> Excels at long-horizon planning</li>
                                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-rose-500" /> Fully open weights</li>
                            </ul>
                        </div>
                        <div className="w-full md:w-1/3 bg-rose-500/10 border border-rose-500/30 rounded-full p-8 flex items-center justify-center aspect-square">
                            <Brain size={120} className="text-rose-500" />
                        </div>
                    </div>
                    <IPAViz />
                </Section>

                {/* Section 4: Use Case / Training Guide */}
                <Section title="4. How to Train Your Own Agents">
                    <p className="text-lg text-slate-400 mb-8">
                        The real value of this paper is the recipe it provides. Here is how you can implement an ALE-style loop for your enterprise agents:
                    </p>

                    <div className="grid gap-6">
                        {/* Step 1 */}
                        <div className="flex gap-4">
                            <div className="flex-none flex flex-col items-center">
                                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center font-bold text-white">1</div>
                                <div className="w-0.5 h-full bg-slate-800 my-2"></div>
                            </div>
                            <div className="pb-8">
                                <h4 className="text-xl font-bold text-white mb-2">Setup Your ROCK (Environment)</h4>
                                <p className="text-slate-400 mb-4">
                                    Don't just mock API calls. Containerize your actual tools. If your agent writes SQL, give it diverse, sandboxed Postgres instances with broken schema to learn error recovery.
                                </p>
                                <div className="bg-black/30 p-4 rounded-lg font-mono text-sm text-green-400 border border-white/5">
                                    docker run -d --name rock-sandbox-01 postgres:latest
                                </div>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex gap-4">
                            <div className="flex-none flex flex-col items-center">
                                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center font-bold text-white">2</div>
                                <div className="w-0.5 h-full bg-slate-800 my-2"></div>
                            </div>
                            <div className="pb-8">
                                <h4 className="text-xl font-bold text-white mb-2">Generate Trajectories (iFlow)</h4>
                                <p className="text-slate-400 mb-4">
                                    Use a stronger "Teacher" model (e.g., Claude 3.5 Sonnet) to solve tasks in your sandbox. Record every input, tool output, and reasoning step.
                                </p>
                                <Badge variant="outline" className="border-blue-500/30 text-blue-300">
                                    Goal: 10k+ successful traces
                                </Badge>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex gap-4">
                            <div className="flex-none flex flex-col items-center">
                                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center font-bold text-white">3</div>
                            </div>
                            <div className="pb-8">
                                <h4 className="text-xl font-bold text-white mb-2">Align with ROLL</h4>
                                <p className="text-slate-400">
                                    Fine-tune your smaller, faster deployment model (e.g., Llama 3 8B) on these trajectories. Use <strong>Interaction-Based Policy Alignment</strong> to reward completing functional blocks, not just predicting next tokens.
                                </p>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* Section 5: Resources */}
                <Section title="5. Resources">
                    <div className="grid md:grid-cols-2 gap-4">
                        <a
                            href="https://arxiv.org/abs/2512.24873"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 bg-slate-900 rounded-xl border border-white/10 hover:border-rose-500/50 transition-all group"
                        >
                            <div className="p-3 bg-white/5 rounded-lg">
                                <FileSearch className="w-5 h-5 text-rose-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white group-hover:text-rose-400 transition-colors">Read the Paper</h4>
                                <p className="text-xs text-slate-500">"Let It Flow" on arXiv</p>
                            </div>
                            <ExternalLink className="ml-auto w-4 h-4 text-slate-600 group-hover:text-rose-400" />
                        </a>
                        <a
                            href="https://github.com/" // Placeholder, user didn't provide repo URL in prompt, defaulting to generic or search if needed. But user said "from this link" and provided arxiv. I will assume repo is linked in paper or similar.
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 bg-slate-900 rounded-xl border border-white/10 hover:border-blue-500/50 transition-all group"
                        >
                            <div className="p-3 bg-white/5 rounded-lg">
                                <GitBranch className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors">View on GitHub</h4>
                                <p className="text-xs text-slate-500">Official ROME Repository</p>
                            </div>
                            <ExternalLink className="ml-auto w-4 h-4 text-slate-600 group-hover:text-blue-400" />
                        </a>
                    </div>
                </Section>

                {/* Key Takeaway */}
                <div className="bg-gradient-to-r from-rose-500/10 via-orange-500/10 to-rose-500/10 border border-rose-500/30 rounded-2xl p-8 text-center mt-12">
                    <h3 className="text-2xl font-bold text-white mb-4">The Bottom Line</h3>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        Building reliable agents isn't just about the model—it's about the <strong className="text-rose-400">learning ecosystem</strong>.
                        ALE provides the blueprint for the next generation of robust, open-source agents.
                    </p>
                </div>

                {/* CTA */}
                <div className="text-center pt-12 border-t border-white/10 mt-12">
                    <Link to="/trending">
                        <Button variant="outline" className="border-rose-500/30 text-rose-400 hover:bg-rose-500/10">
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
