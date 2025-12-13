import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Split, Layers, Zap, Cpu, Server, Network, Brain } from 'lucide-react';
import { NeuralBackground } from '@/components/NeuralBackground';
import { Badge } from '@/components/ui/badge';

const Section = ({ title, children, className = "" }: any) => (
    <section className={`mb-16 ${className}`}>
        <h2 className="text-3xl font-bold text-slate-100 mb-6 border-b-4 border-orange-500 inline-block pb-2">
            {title}
        </h2>
        {children}
    </section>
);

const Card = ({ title, icon: Icon, children, colorClass = "bg-slate-900" }: any) => (
    <div className={`${colorClass} p-6 rounded-xl shadow-lg border border-white/10 hover:border-orange-500/50 transition-all duration-300 hover:shadow-orange-500/5`}>
        <div className="flex items-center gap-3 mb-4">
            {Icon && <div className="p-3 bg-white/5 rounded-full shadow-sm"><Icon className="w-6 h-6 text-orange-400" /></div>}
            <h3 className="text-xl font-bold text-slate-100">{title}</h3>
        </div>
        <div className="text-slate-400 leading-relaxed">
            {children}
        </div>
    </div>
);

const RouterViz = () => {
    const [tokenIndex, setTokenIndex] = useState(0);
    const tokens = [
        { text: "The", type: 'grammar' },
        { text: "Formula", type: 'math' },
        { text: "1", type: 'math' },
        { text: "car", type: 'context' },
        { text: "accelerated", type: 'physics' },
        { text: "quickly", type: 'grammar' }
    ];

    // Auto-play the tokens
    useEffect(() => {
        const timer = setInterval(() => {
            setTokenIndex((prev) => (prev + 1) % tokens.length);
        }, 2000);
        return () => clearInterval(timer);
    }, []);

    const currentToken = tokens[tokenIndex];

    const experts = [
        { id: 'math', name: 'Math Expert', color: 'border-blue-500 bg-blue-900/20 text-blue-300' },
        { id: 'physics', name: 'Physics Expert', color: 'border-red-500 bg-red-900/20 text-red-300' },
        { id: 'grammar', name: 'Grammar Expert', color: 'border-green-500 bg-green-900/20 text-green-300' },
        { id: 'context', name: 'General Expert', color: 'border-yellow-500 bg-yellow-900/20 text-yellow-300' },
    ];

    // Simple routing logic for demo
    const activeExpertId = experts.find(e => e.id === currentToken.type)?.id || 'context';

    return (
        <div className="bg-slate-950/50 p-8 rounded-2xl border border-white/10 flex flex-col items-center backdrop-blur-sm min-h-[400px]">
            <h3 className="text-lg font-bold text-slate-300 mb-8">The Gating Network (Router)</h3>

            {/* Input Token */}
            <div className="mb-12">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentToken.text}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        className="bg-slate-800 border-2 border-slate-600 px-6 py-3 rounded-lg text-xl font-mono text-white"
                    >
                        "{currentToken.text}"
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Router Node */}
            <div className="relative z-10 w-16 h-16 rounded-full bg-slate-800 border-4 border-orange-500 flex items-center justify-center mb-12 shadow-[0_0_30px_rgba(249,115,22,0.3)]">
                <Split className="w-8 h-8 text-orange-500" />
            </div>

            {/* Connection Lines (Simulated with absolute divs for simplicity in CSS grid) */}
            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
                {experts.map((exp) => {
                    const isActive = exp.id === activeExpertId;
                    return (
                        <div key={exp.id} className={`relative p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center ${isActive ? exp.color + ' scale-105 shadow-lg' : 'border-slate-800 bg-slate-900/50 text-slate-600 opacity-50'}`}>
                            {isActive && (
                                <motion.div
                                    layoutId="packet"
                                    className="absolute -top-12 w-2 h-12 bg-orange-500/50"
                                    transition={{ duration: 0.2 }}
                                />
                            )}
                            <Network className="w-6 h-6 mb-2" />
                            <span className="text-sm font-bold">{exp.name}</span>
                            {isActive && <div className="mt-2 text-xs font-mono animate-pulse">PROCESSING</div>}
                        </div>
                    )
                })}
            </div>

            <div className="mt-8 text-center text-slate-500 text-sm">
                For the word <strong className="text-white">"{currentToken.text}"</strong>, the router activates only the <strong className="text-orange-400">{experts.find(e => e.id === activeExpertId)?.name}</strong>. The others stay asleep (saving compute).
            </div>
        </div>
    );
};

export default function MoEDeepDive() {
    return (
        <div className="min-h-screen bg-black font-sans text-slate-200">
            <NeuralBackground />

            {/* Hero Header */}
            <header className="pt-32 pb-24 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                    <Layers size={400} className="text-orange-500" />
                </div>
                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <Badge variant="outline" className="mb-6 text-orange-400 border-orange-500/30 py-1.5 px-4 text-sm backdrop-blur-md">
                        Deep Dive Series
                    </Badge>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
                        Mixture of <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Experts (MoE)</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        How do models like GPT-4 and Mixtral get so smart but stay fast?
                        They don't use their whole brain at once. They use specialized sub-networks.
                    </p>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 pb-24 relative z-20">

                {/* Intro Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    <Card title="Sparse Models" icon={Zap}>
                        In a "Dense" model (like Llama-2), every parameter fires for every token. In MoE, only a fraction fires (Sparsity).
                    </Card>
                    <Card title="The Router" icon={Split}>
                        A traffic controller (Gating Network) decides which expert is best suited for the current word.
                    </Card>
                    <Card title="Massive Knowledge" icon={Server}>
                        MoEs can have trillions of parameters (High Capacity) but run on consumer hardware (Low Inference Cost).
                    </Card>
                </div>

                {/* Section 1: Visualizing Routing */}
                <Section title="1. Divide and Conquer">
                    <p className="mb-6 text-lg text-slate-400">
                        Imagine a hospital. You don't see every doctor for a headache. You go to a Triage Desk (The Router),
                        and they send you to a Specialist (The Expert).
                    </p>
                    <RouterViz />
                </Section>

                {/* Section 2: Architecture Details */}
                <Section title="2. Dense vs Sparse">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-slate-900 border border-white/10 p-6 rounded-xl">
                            <h4 className="flex items-center gap-2 font-bold mb-4 text-slate-300">
                                <div className="w-3 h-3 bg-slate-500 rounded-full" /> Dense Model (Standard)
                            </h4>
                            <div className="grid grid-cols-4 gap-2 mb-4">
                                {[...Array(16)].map((_, i) => (
                                    <div key={i} className="h-4 bg-blue-500 rounded animate-pulse" />
                                ))}
                            </div>
                            <p className="text-sm text-slate-500">Every neuron fires for every prompt. Expensive and slow at scale.</p>
                        </div>

                        <div className="bg-slate-900 border border-white/10 p-6 rounded-xl">
                            <h4 className="flex items-center gap-2 font-bold mb-4 text-orange-400">
                                <div className="w-3 h-3 bg-orange-500 rounded-full" /> Sparse MoE
                            </h4>
                            <div className="grid grid-cols-4 gap-2 mb-4">
                                {[...Array(16)].map((_, i) => (
                                    <div key={i} className={`h-4 rounded ${[0, 5, 10, 15].includes(i) ? 'bg-orange-500 animate-pulse' : 'bg-slate-800'}`} />
                                ))}
                            </div>
                            <p className="text-sm text-slate-500">Only pertinent neurons fire. <span className="text-orange-400">4x faster</span> inference for same quality.</p>
                        </div>
                    </div>
                </Section>

                <Section title="3. Real World Examples">
                    <p className="mb-4 text-lg text-slate-400">MoE models have taken over the open-source leaderboard.</p>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-slate-900/50 border border-white/5 rounded-lg hover:bg-slate-900 transition-colors">
                            <Cpu className="text-orange-500 w-8 h-8" />
                            <div>
                                <div className="font-bold text-slate-200">Mixtral 8x7B</div>
                                <div className="text-sm text-slate-500">Outputting at 500+ tokens/sec on Groq. It selects 2 experts out of 8 for each token.</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-slate-900/50 border border-white/5 rounded-lg hover:bg-slate-900 transition-colors">
                            <Brain className="text-orange-500 w-8 h-8" />
                            <div>
                                <div className="font-bold text-slate-200">GPT-4 (Rumored)</div>
                                <div className="text-sm text-slate-500">Believed to be a 16-way MoE model with ~1.8 Trillion parameters total.</div>
                            </div>
                        </div>
                    </div>
                </Section>

            </main>

            <footer className="mt-20 py-12 bg-black text-slate-600 text-center text-sm border-t border-white/10">
                <p>Visual Guide • Generated by Gemini Canvas</p>
                <p className="mt-2">Core Architecture for Scalable Intelligence</p>
            </footer>
        </div>
    );
}
