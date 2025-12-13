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
                        Computers operate on numbers, not text. So how do we feed "The cat sat on the mat" into a GPU?
                        <br />
                        In the old days, we used "One-Hot Encoding" (a massive list of zeros with a single 1). But that meant "Cat" and "Dog" were just as different as "Cat" and "Refrigerator".
                        <br /><br />
                        <strong>Embeddings</strong> solve this by turning every word into a dense vector of floating point numbers (e.g. <code>[0.1, -0.5, 0.8...]</code>).
                        These numbers represents abstract concepts/features of the word.
                    </p>
                    <VectorMathViz />
                </Section>

                {/* Section 2: Semantic Space */}
                <Section title="2. The Semantic Map">
                    <p className="mb-6 text-lg text-slate-400">
                        Imagine a 1,500-dimensional space. "Dog" is at coordinate A. "Wolf" is at coordinate B.
                        If you draw a line between them, the distance is very short.
                        <br />
                        Also, the relationship is consistent. If you take the vector for <strong>King</strong>, subtract <strong>Man</strong>, and add <strong>Woman</strong>, you literally land on the coordinates for <strong>Queen</strong>.
                    </p>
                    <SemanticSearchViz />
                </Section>

                {/* Section 3: Cosine Similarity */}
                <Section title="3. Measuring Distance (Cosine Similarity)">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <p className="text-lg text-slate-400 mb-4">
                                How do we know if two sentences are similar? We measure the <strong>angle</strong> between their arrows in this high-dimensional space.
                            </p>
                            <ul className="space-y-4">
                                <li className="bg-slate-900 p-4 rounded-lg border border-green-500/20">
                                    <div className="font-bold text-green-400 mb-1">Cosine = 1.0 (Identical)</div>
                                    <div className="text-sm text-slate-400">"The dog is happy" vs "The canine is joyful"</div>
                                    <div className="text-xs text-slate-500 mt-1">Their arrows point in the exact same direction.</div>
                                </li>
                                <li className="bg-slate-900 p-4 rounded-lg border border-red-500/20">
                                    <div className="font-bold text-red-400 mb-1">Cosine = 0.0 (Unrelated)</div>
                                    <div className="text-sm text-slate-400">"The dog is happy" vs "Blender strategy guide"</div>
                                    <div className="text-xs text-slate-500 mt-1">Their arrows are 90 degrees apart (Orthogonal).</div>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-slate-950 p-6 rounded-xl border border-white/10 flex items-center justify-center">
                            {/* Simple Angle Viz */}
                            <svg viewBox="0 0 200 200" className="w-64 h-64">
                                <line x1="20" y1="180" x2="180" y2="180" stroke="#475569" strokeWidth="2" />
                                <line x1="20" y1="180" x2="20" y2="20" stroke="#475569" strokeWidth="2" />

                                {/* Vector A */}
                                <line x1="20" y1="180" x2="160" y2="100" stroke="#f59e0b" strokeWidth="4" />
                                <text x="160" y="90" fill="#f59e0b" className="font-bold">A</text>

                                {/* Vector B */}
                                <line x1="20" y1="180" x2="140" y2="120" stroke="#fbbf24" strokeWidth="4" opacity="0.5" />
                                <text x="145" y="115" fill="#fbbf24" className="font-bold text-xs">B</text>

                                {/* Arc */}
                                <path d="M 60 160 Q 70 150 65 135" fill="none" stroke="white" strokeDasharray="4" />
                                <text x="80" y="150" fill="white" className="text-xs">θ (Angle)</text>
                            </svg>
                        </div>
                    </div>
                </Section>

                {/* Section 4: Modern Applications (RAG) */}
                <Section title="4. Powering Modern AI (RAG)">
                    <p className="mb-6 text-lg text-slate-400">
                        Embeddings are the backbone of <strong>Retrieval Augmented Generation (RAG)</strong>.
                        This is how ChatGPT can "talk to your PDF".
                    </p>

                    <div className="bg-slate-900 border border-white/10 p-6 rounded-xl">
                        <div className="grid md:grid-cols-4 gap-4 text-center items-center">
                            <div className="p-4 bg-slate-800 rounded-lg">
                                <div className="text-2xl mb-2">📄</div>
                                <div className="font-bold text-slate-300 text-sm">Your PDF</div>
                            </div>

                            <ArrowRight className="mx-auto text-slate-500" />

                            <div className="p-4 bg-blue-900/20 border border-blue-500/50 rounded-lg">
                                <div className="text-2xl mb-2">🔢</div>
                                <div className="font-bold text-blue-300 text-sm">Vector DB</div>
                                <div className="text-xs text-blue-400 mt-1">Chunk & Embed</div>
                            </div>

                            <ArrowRight className="mx-auto text-slate-500" />

                            <div className="p-4 bg-amber-900/20 border border-amber-500/50 rounded-lg">
                                <div className="text-2xl mb-2">🤖</div>
                                <div className="font-bold text-amber-300 text-sm">LLM</div>
                                <div className="text-xs text-amber-400 mt-1">Chat w/ Context</div>
                            </div>
                        </div>
                        <p className="mt-6 text-sm text-slate-400 text-center max-w-2xl mx-auto">
                            The system doesn't keyword search usually. It converts your question ("How do I fix X?") into a vector, and finds the paragaphs in the PDF with the closest semantic angle.
                        </p>
                    </div>
                </Section>

            </main>

            <footer className="mt-20 py-12 bg-black text-slate-600 text-center text-sm border-t border-white/10">
                <p>Visual Guide • Generated by Gemini Canvas</p>
                <p className="mt-2">Core Concept for RAG, Search, and LLMs</p>
            </footer>
        </div>
    );
}
