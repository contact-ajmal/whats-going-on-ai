import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calculator, Crosshair, Network, Plus, Minus, Search, Share2, Grid } from 'lucide-react';
import { NeuralBackground } from '@/components/NeuralBackground';
import { Badge } from '@/components/ui/badge';

const Section = ({ title, children, className = "" }: any) => (
    <section className={`mb-16 ${className}`}>
        <h2 className="text-3xl font-bold text-slate-100 mb-6 border-b-4 border-amber-500 inline-block pb-2">
            {title}
        </h2>
        {children}
    </section>
);

const Card = ({ title, icon: Icon, children, colorClass = "bg-slate-900" }: any) => (
    <div className={`${colorClass} p-6 rounded-xl shadow-lg border border-white/10 hover:border-amber-500/50 transition-all duration-300 hover:shadow-amber-500/5`}>
        <div className="flex items-center gap-3 mb-4">
            {Icon && <div className="p-3 bg-white/5 rounded-full shadow-sm"><Icon className="w-6 h-6 text-amber-400" /></div>}
            <h3 className="text-xl font-bold text-slate-100">{title}</h3>
        </div>
        <div className="text-slate-400 leading-relaxed">
            {children}
        </div>
    </div>
);

const VectorMathViz = () => {
    const [result, setResult] = useState<string>("Queen");

    return (
        <div className="bg-slate-950/50 p-8 rounded-2xl border border-white/10 flex flex-col items-center backdrop-blur-sm">
            <h3 className="text-xl font-bold text-slate-300 mb-8">Vector Arithmetic</h3>

            <div className="flex flex-wrap items-center justify-center gap-4 text-2xl md:text-3xl font-bold text-white mb-8">
                <div className="bg-blue-900/40 border border-blue-500/50 px-6 py-3 rounded-lg text-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                    King
                </div>

                <Minus className="text-slate-500" />

                <div className="bg-slate-800 border border-slate-600 px-6 py-3 rounded-lg text-slate-300">
                    Man
                </div>

                <Plus className="text-slate-500" />

                <div className="bg-pink-900/40 border border-pink-500/50 px-6 py-3 rounded-lg text-pink-200 shadow-[0_0_15px_rgba(236,72,153,0.2)]">
                    Woman
                </div>

                <ArrowRight className="text-amber-500" />

                <div className="bg-amber-500/20 border border-amber-500 px-8 py-4 rounded-xl text-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.3)] animate-pulse">
                    {result}
                </div>
            </div>

            <p className="text-center text-slate-400 max-w-lg">
                This isn't magic; it's geometry. In the high-dimensional space where these words live, the direction from <strong>Man</strong> to <strong>King</strong> is roughly the same as <strong>Woman</strong> to <strong>Queen</strong>.
            </p>
        </div>
    );
};

const SemanticSearchViz = () => {
    // A simplified 2D map of concepts
    const points = [
        { id: 'dog', x: 20, y: 30, category: 'animal' },
        { id: 'cat', x: 25, y: 35, category: 'animal' },
        { id: 'wolf', x: 15, y: 25, category: 'animal' },
        { id: 'apple', x: 70, y: 70, category: 'fruit' },
        { id: 'banana', x: 75, y: 65, category: 'fruit' },
        { id: 'orange', x: 72, y: 75, category: 'fruit' },
        { id: 'car', x: 80, y: 20, category: 'vehicle' },
        { id: 'truck', x: 85, y: 15, category: 'vehicle' },
    ];

    const [activePoint, setActivePoint] = useState<string | null>(null);

    return (
        <div className="relative w-full h-80 bg-slate-900 rounded-xl border border-white/10 overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-20"
                style={{ backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)', backgroundSize: '20px 20px' }}
            />

            {/* Points */}
            {points.map(p => {
                const isActive = activePoint === p.id;
                // Determine if neighbor (same category)
                const activeCategory = points.find(pt => pt.id === activePoint)?.category;
                const isNeighbor = activePoint && p.category === activeCategory && !isActive;

                return (
                    <motion.button
                        key={p.id}
                        className={`absolute w-12 h-12 -ml-6 -mt-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-2 
                            ${isActive ? 'bg-amber-500 border-amber-300 scale-125 z-20 text-black' :
                                isNeighbor ? 'bg-amber-500/30 border-amber-500/50 scale-110 z-10 text-amber-100' :
                                    'bg-slate-800 border-slate-600 text-slate-400 hover:bg-slate-700'}`}
                        style={{ left: `${p.x}%`, top: `${p.y}%` }}
                        onClick={() => setActivePoint(p.id)}
                        whileHover={{ scale: 1.1 }}
                    >
                        {p.id}
                        {isActive && (
                            <div className="absolute inset-0 rounded-full animate-ping bg-amber-500/50" />
                        )}
                    </motion.button>
                );
            })}

            {/* Connection Lines for Neighbors */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {activePoint && points.filter(p => p.category === points.find(pt => pt.id === activePoint)?.category && p.id !== activePoint).map(neighbor => {
                    const start = points.find(p => p.id === activePoint)!;
                    return (
                        <line
                            key={neighbor.id}
                            x1={`${start.x}%`} y1={`${start.y}%`}
                            x2={`${neighbor.x}%`} y2={`${neighbor.y}%`}
                            stroke="rgba(245, 158, 11, 0.4)"
                            strokeWidth="2"
                            strokeDasharray="4"
                        />
                    )
                })}
            </svg>

            <div className="absolute bottom-4 left-4 text-xs text-slate-500 bg-black/80 p-2 rounded">
                Click a word to find its "Nearest Neighbors" in meaning.
            </div>
        </div>
    )
}

export default function EmbeddingsDeepDive() {
    return (
        <div className="min-h-screen bg-black font-sans text-slate-200">
            <NeuralBackground />

            {/* Hero Header */}
            <header className="pt-32 pb-24 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                    <Network size={400} className="text-amber-500" />
                </div>
                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <Badge variant="outline" className="mb-6 text-amber-400 border-amber-500/30 py-1.5 px-4 text-sm backdrop-blur-md">
                        Deep Dive Series
                    </Badge>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
                        The Geometry of <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Meaning</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Computers can't read. To them, words are just random strings.
                        <strong>Embeddings</strong> translate words into numbers that preserve their meaning.
                    </p>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 pb-24 relative z-20">

                {/* Intro Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    <Card title="Vectors" icon={Crosshair}>
                        Every word becomes a list of coordinates (like GPS for meaning). "Dog" is close to "Wolf".
                    </Card>
                    <Card title="Semantics" icon={Share2}>
                        Similar concepts cluster together. We can measure "closeness" mathematically.
                    </Card>
                    <Card title="Dimensions" icon={Grid}>
                        Real models use thousands of dimensions (1536 for OpenAI) to capture nuance.
                    </Card>
                </div>

                {/* Section 1: Word Math */}
                <Section title="1. Words as Numbers">
                    <p className="mb-6 text-lg text-slate-400">
                        The most famous example of embedding magic is that you can do <strong>math with words</strong>.
                    </p>
                    <VectorMathViz />
                </Section>

                {/* Section 2: Semantic Space */}
                <Section title="2. The Semantic Map">
                    <p className="mb-6 text-lg text-slate-400">
                        Imagine a map where "North" means "More Royale" and "East" means "More Feminine".
                        Embeddings are just points on this map.
                    </p>
                    <SemanticSearchViz />
                </Section>

            </main>

            <footer className="mt-20 py-12 bg-black text-slate-600 text-center text-sm border-t border-white/10">
                <p>Visual Guide • Generated by Gemini Canvas</p>
                <p className="mt-2">Core Concept for RAG, Search, and LLMs</p>
            </footer>
        </div>
    );
}
