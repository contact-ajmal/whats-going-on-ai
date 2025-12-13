import React, { useState } from 'react';
import { ArrowRight, Box, Brain, Database, Layers, Lightbulb, MessageSquare, Repeat, Settings, Zap, ChevronDown, ChevronUp, Eye } from 'lucide-react';
import { NeuralBackground } from '@/components/NeuralBackground';
import { Badge } from '@/components/ui/badge';

// --- Components ---

const Section = ({ title, children, className = "" }: any) => (
    <section className={`mb-16 ${className}`}>
        <h2 className="text-3xl font-bold text-slate-100 mb-6 border-b-4 border-primary inline-block pb-2">
            {title}
        </h2>
        {children}
    </section>
);

const Card = ({ title, icon: Icon, children, colorClass = "bg-slate-900" }: any) => (
    <div className={`${colorClass} p-6 rounded-xl shadow-lg border border-white/10 hover:border-primary/50 transition-all duration-300 hover:shadow-primary/5`}>
        <div className="flex items-center gap-3 mb-4">
            {Icon && <div className="p-3 bg-white/5 rounded-full shadow-sm"><Icon className="w-6 h-6 text-primary" /></div>}
            <h3 className="text-xl font-bold text-slate-100">{title}</h3>
        </div>
        <div className="text-slate-400 leading-relaxed">
            {children}
        </div>
    </div>
);

// --- Visualizations ---

const ArchitectureViz = () => {
    const [view, setView] = useState('simple'); // simple, exploded

    return (
        <div className="bg-slate-950/50 p-8 rounded-2xl border border-white/10 flex flex-col items-center backdrop-blur-sm">
            <div className="flex gap-4 mb-8">
                <button
                    onClick={() => setView('simple')}
                    className={`px-4 py-2 rounded-full font-semibold transition-all ${view === 'simple' ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
                >
                    High-Level (The "Black Box")
                </button>
                <button
                    onClick={() => setView('exploded')}
                    className={`px-4 py-2 rounded-full font-semibold transition-all ${view === 'exploded' ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
                >
                    Internal View (Encoder/Decoder)
                </button>
            </div>

            <div className="relative w-full max-w-4xl h-64 flex items-center justify-center transition-all duration-500">
                {/* Input */}
                <div className="absolute left-0 flex flex-col items-center animate-fade-in">
                    <span className="text-sm font-bold text-slate-500 mb-2">INPUT (French)</span>
                    <div className="bg-slate-900 px-4 py-2 rounded shadow border border-slate-700 font-mono text-primary">
                        "Je suis étudiant"
                    </div>
                    <ArrowRight className="w-8 h-8 text-slate-700 mt-2 rotate-90 md:rotate-0" />
                </div>

                {/* The Model */}
                {view === 'simple' ? (
                    <div className="w-64 h-32 bg-slate-900 rounded-lg shadow-2xl border border-white/10 flex items-center justify-center text-white font-bold text-2xl z-10 animate-scale-in relative overflow-hidden">
                        <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                        <Box className="w-8 h-8 mr-3 text-primary" />
                        TRANSFORMER
                    </div>
                ) : (
                    <div className="flex gap-4 z-10 animate-scale-in w-full justify-center">
                        {/* Encoder Stack */}
                        <div className="flex-1 max-w-[200px] flex flex-col gap-1 p-2 bg-blue-950/30 border-2 border-blue-500/30 rounded-xl relative">
                            <div className="absolute -top-8 left-0 right-0 text-center font-bold text-blue-400">ENCODER x6</div>
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-8 bg-blue-600/20 border border-blue-500/50 rounded text-blue-200 text-xs flex items-center justify-center">Layer {i}</div>
                            ))}
                        </div>

                        {/* Arrows */}
                        <div className="flex flex-col justify-center">
                            <div className="h-1 w-8 bg-slate-700"></div>
                            <div className="h-1 w-8 bg-slate-700 mt-2"></div>
                        </div>

                        {/* Decoder Stack */}
                        <div className="flex-1 max-w-[200px] flex flex-col gap-1 p-2 bg-pink-950/30 border-2 border-pink-500/30 rounded-xl relative">
                            <div className="absolute -top-8 left-0 right-0 text-center font-bold text-pink-400">DECODER x6</div>
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-8 bg-pink-600/20 border border-pink-500/50 rounded text-pink-200 text-xs flex items-center justify-center">Layer {i}</div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Output */}
                <div className="absolute right-0 flex flex-col items-center animate-fade-in">
                    <span className="text-sm font-bold text-slate-500 mb-2">OUTPUT (English)</span>
                    <div className="bg-slate-900 px-4 py-2 rounded shadow border border-slate-700 font-mono text-emerald-400">
                        "I am a student"
                    </div>
                    <ArrowRight className="w-8 h-8 text-slate-700 mt-2 rotate-90 md:rotate-0 md:-ml-8" style={{ order: -1 }} />
                </div>
            </div>

            <p className="mt-8 text-center text-slate-500 max-w-xl italic">
                {view === 'simple'
                    ? "At first glance, it's just a translation machine."
                    : "Inside, it's split into two piles: The Encoder (Blue) understands the input, and the Decoder (Pink) generates the output."}
            </p>
        </div>
    );
};

const AttentionDemo = () => {
    const [activeWord, setActiveWord] = useState<string | null>(null);

    const sentence = [
        { id: 'The', type: 'article' },
        { id: 'animal', type: 'noun' },
        { id: 'didn\'t', type: 'verb' },
        { id: 'cross', type: 'verb' },
        { id: 'the', type: 'article' },
        { id: 'street', type: 'noun' },
        { id: 'because', type: 'conjunction' },
        { id: 'it', type: 'pronoun' },
        { id: 'was', type: 'verb' },
        { id: 'tired', type: 'adjective' },
    ];

    // Simplified attention map for the demo
    const attentionMap: Record<string, string[]> = {
        'it': ['animal', 'street'],
        'tired': ['animal', 'it'],
        'cross': ['animal', 'street'],
        'animal': ['The', 'tired'],
    };

    return (
        <div className="bg-slate-900 p-6 rounded-xl shadow-lg border border-white/10">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-primary" />
                    Interactive Self-Attention
                </h3>
                <span className="text-xs text-slate-500 uppercase tracking-wide">Click a word</span>
            </div>

            <div className="flex flex-wrap gap-3 justify-center py-8">
                {sentence.map((word) => {
                    const isTarget = activeWord === word.id;
                    const isAttended = activeWord && attentionMap[activeWord]?.includes(word.id);
                    const opacity = activeWord ? (isTarget || isAttended ? 1 : 0.3) : 1;
                    const scale = isTarget ? 'scale-110 ring-2 ring-primary' : '';
                    const bg = isAttended ? 'bg-amber-500/20 border-amber-500/50 text-amber-300' : 'bg-white/5 border-white/10 text-slate-300';

                    return (
                        <button
                            key={word.id}
                            onClick={() => setActiveWord(word.id === activeWord ? null : word.id)}
                            className={`px-3 py-2 rounded-lg border-2 font-mono text-sm transition-all duration-300 ${bg} ${scale}`}
                            style={{ opacity }}
                        >
                            {word.id}
                            {isAttended && (
                                <span className="absolute -top-2 -right-2 flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            <div className="bg-black/40 p-4 rounded-lg mt-4 text-sm text-slate-400 min-h-[60px] border border-white/5">
                {activeWord === 'it' && (
                    <p>
                        When processing <strong className="text-primary">"it"</strong>, the model pays attention to <strong className="text-amber-400">"animal"</strong> (what "it" refers to) and <strong className="text-amber-400">"street"</strong> (context). This resolves the ambiguity that simpler models struggle with.
                    </p>
                )}
                {activeWord === 'tired' && (
                    <p>
                        The adjective <strong className="text-primary">"tired"</strong> looks back at <strong className="text-amber-400">"animal"</strong> to know <em>who</em> is tired.
                    </p>
                )}
                {!['it', 'tired'].includes(activeWord || '') && activeWord && (
                    <p>The word "{activeWord}" attends to its relevant context.</p>
                )}
                {!activeWord && <p className="italic text-slate-600">Click on "it" or "tired" to see the magic happen.</p>}
            </div>
        </div>
    );
};

const QKVCard = ({ type, title, desc, icon: Icon, color }: { type: string, title: string, desc: string, icon: any, color: string }) => (
    <div className={`relative overflow-hidden p-5 rounded-lg border transition-transform hover:-translate-y-1 ${color}`}>
        <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-black/20 rounded-md">
                <Icon className="w-5 h-5 text-slate-800 dark:text-slate-200" />
            </div>
            <span className="font-bold text-lg text-slate-900 dark:text-slate-100">{type}</span>
        </div>
        <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-1">{title}</h4>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-snug">{desc}</p>
    </div>
);

// --- Main App ---

export default function TransformerDeepDive() {
    const [showMath, setShowMath] = useState(false);

    return (
        <div className="min-h-screen bg-black font-sans text-slate-200">
            <NeuralBackground />

            {/* Hero Header */}
            <header className="pt-32 pb-24 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                    <Brain size={400} className="text-primary" />
                </div>
                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <Badge variant="outline" className="mb-6 text-primary border-primary/30 py-1.5 px-4 text-sm backdrop-blur-md">
                        Deep Dive Series
                    </Badge>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
                        Unpacking the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Transformer</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        The 2017 paper "Attention Is All You Need" changed everything.
                        Here is a visual guide to how it actually works, without drowning in math.
                    </p>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 pb-24 relative z-20">

                {/* Intro Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    <Card title="No Recurrence" icon={Repeat}>
                        Unlike older models (RNNs), it doesn't read one word at a time. It reads the whole sentence at once.
                    </Card>
                    <Card title="Massive Parallelism" icon={Layers}>
                        Because it processes everything at once, it can use massive GPU power to learn faster.
                    </Card>
                    <Card title="Attention Mechanism" icon={Lightbulb}>
                        The secret sauce: It learns which words are related to which, regardless of distance.
                    </Card>
                </div>

                {/* Section 1: The Black Box */}
                <Section title="1. The High Level View">
                    <p className="mb-6 text-lg text-slate-400">
                        Before we look under the hood, let's treat the Transformer as a single machine.
                        It's primarily a <strong>Sequence-to-Sequence</strong> model. Give it a sequence (French),
                        and it gives you a sequence (English).
                    </p>
                    <ArchitectureViz />
                </Section>

                {/* Section 2: Self-Attention */}
                <Section title="2. The Core: Self-Attention">
                    <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
                        <div>
                            <p className="text-lg text-slate-400 mb-4">
                                Imagine you are at a noisy cocktail party. You hear the word "Bank".
                                Is it a river bank? Or a money bank?
                            </p>
                            <p className="text-lg text-slate-400">
                                To understand, you need to look at the context. If you hear "money" nearby,
                                you pay <strong>attention</strong> to that connection. The Transformer does this for every single word simultaneously.
                            </p>
                        </div>
                        <AttentionDemo />
                    </div>

                    <div className="bg-slate-900/50 p-6 rounded-xl border border-primary/20 backdrop-blur-sm">
                        <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                            <Database className="w-5 h-5" />
                            The Database Analogy (Query, Key, Value)
                        </h3>
                        <p className="mb-6 text-slate-400">
                            The paper uses three mysterious terms: <strong>Query, Key, and Value</strong>.
                            Think of it like searching a library database.
                        </p>

                        <div className="grid md:grid-cols-3 gap-4">
                            <QKVCard
                                type="Query (Q)"
                                title="What am I looking for?"
                                desc="A sticky note I'm holding."
                                icon={MessageSquare}
                                color="bg-red-500/10 border-red-500/20 text-red-100"
                            />
                            <QKVCard
                                type="Key (K)"
                                title="What do I contain?"
                                desc="The label on the book spine."
                                icon={Settings}
                                color="bg-amber-500/10 border-amber-500/20 text-amber-100"
                            />
                            <QKVCard
                                type="Value (V)"
                                title="The Content"
                                desc="The actual information inside."
                                icon={Box}
                                color="bg-emerald-500/10 border-emerald-500/20 text-emerald-100"
                            />
                        </div>
                        <div className="mt-4 text-center text-sm font-medium text-primary/70">
                            Score = How much does my Query match your Key?
                        </div>
                    </div>
                </Section>

                {/* Section 3: Architecture Deep Dive */}
                <Section title="3. The Architecture Deep Dive">
                    <div className="space-y-8">
                        <p className="text-lg text-slate-400">
                            Now let's explode the model. It's essentially two stacks of layers.
                        </p>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Encoder Column */}
                            <div className="border-t-4 border-blue-500 pt-4">
                                <h3 className="text-2xl font-bold text-blue-400 mb-2">The Encoder</h3>
                                <p className="text-slate-500 mb-4">The "Reader". It takes the input and creates a rich understanding of it.</p>
                                <div className="space-y-2">
                                    <div className="bg-blue-900/30 border border-blue-500/30 p-4 rounded text-center font-bold text-blue-300">
                                        Input Embeddings
                                        <div className="text-xs font-normal opacity-75 mt-1">Words → Vectors</div>
                                    </div>
                                    <div className="bg-amber-900/30 border border-amber-500/30 p-2 rounded text-center text-xs font-bold text-amber-300 mx-8">
                                        + Positional Encoding (Adds Order)
                                    </div>
                                    <div className="border-2 border-dashed border-blue-800 p-2 rounded bg-blue-950/20">
                                        <div className="text-xs text-blue-400 text-center mb-1 uppercase tracking-widest">Repeat Nx times</div>
                                        <div className="bg-slate-900 border border-blue-900 p-3 rounded mb-2 shadow-sm text-center">
                                            <div className="font-bold text-slate-300">Multi-Head Attention</div>
                                            <div className="text-xs text-slate-600">Self-Attention (Look at whole sentence)</div>
                                        </div>
                                        <div className="bg-slate-900 border border-blue-900 p-3 rounded shadow-sm text-center">
                                            <div className="font-bold text-slate-300">Feed Forward</div>
                                            <div className="text-xs text-slate-600">Process information</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Decoder Column */}
                            <div className="border-t-4 border-pink-500 pt-4">
                                <h3 className="text-2xl font-bold text-pink-400 mb-2">The Decoder</h3>
                                <p className="text-slate-500 mb-4">The "Writer". It generates the translation one word at a time.</p>
                                <div className="space-y-2">
                                    <div className="bg-pink-900/30 border border-pink-500/30 p-4 rounded text-center font-bold text-pink-300">
                                        Output Embeddings
                                        <div className="text-xs font-normal opacity-75 mt-1">Previous words → Vectors</div>
                                    </div>
                                    <div className="bg-amber-900/30 border border-amber-500/30 p-2 rounded text-center text-xs font-bold text-amber-300 mx-8">
                                        + Positional Encoding
                                    </div>
                                    <div className="border-2 border-dashed border-pink-800 p-2 rounded bg-pink-950/20">
                                        <div className="text-xs text-pink-400 text-center mb-1 uppercase tracking-widest">Repeat Nx times</div>
                                        <div className="bg-slate-900 border border-pink-900 p-3 rounded mb-2 shadow-sm text-center opacity-75">
                                            <div className="font-bold text-slate-300">Masked Attention</div>
                                            <div className="text-xs text-slate-600">Only look at past words</div>
                                        </div>
                                        <div className="bg-gradient-to-r from-blue-900/30 to-pink-900/30 border border-slate-700 p-3 rounded mb-2 shadow-sm text-center ring-2 ring-indigo-500/30">
                                            <div className="font-bold text-indigo-300">Encoder-Decoder Attention</div>
                                            <div className="text-xs text-indigo-400">Look at the Encoder's memory!</div>
                                        </div>
                                        <div className="bg-slate-900 border border-pink-900 p-3 rounded shadow-sm text-center">
                                            <div className="font-bold text-slate-300">Feed Forward</div>
                                        </div>
                                    </div>
                                    <div className="bg-slate-800 text-white p-3 rounded text-center font-mono text-sm mt-4 border border-slate-600">
                                        Softmax &rarr; "Probability"
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* Section 4: Math Toggle */}
                <div className="border-t border-white/10 pt-12 text-center">
                    <button
                        onClick={() => setShowMath(!showMath)}
                        className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors"
                    >
                        {showMath ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        {showMath ? "Hide the Math" : "For the Geeks: Show the Math"}
                    </button>

                    {showMath && (
                        <div className="mt-8 p-8 bg-black/60 border border-white/10 rounded-2xl text-slate-300 font-mono text-left overflow-x-auto shadow-2xl animate-fade-in relative">
                            <div className="absolute top-0 right-0 p-2 text-xs text-slate-600">Latex.js</div>
                            <div className="mb-6">
                                <p className="text-slate-500 mb-2">// 1. Scaled Dot-Product Attention</p>
                                <p className="text-xl text-primary">Attention(Q, K, V) = softmax( (QK^T) / √d_k ) * V</p>
                            </div>
                            <div>
                                <p className="text-slate-500 mb-2">// 2. Positional Encoding (The Sine/Cosine waves)</p>
                                <p className="text-sm">PE(pos, 2i) = sin(pos / 10000^(2i/d_model))</p>
                                <p className="text-sm">PE(pos, 2i+1) = cos(pos / 10000^(2i/d_model))</p>
                            </div>
                        </div>
                    )}
                </div>

            </main>

            <footer className="mt-20 py-12 bg-black text-slate-600 text-center text-sm border-t border-white/10">
                <p>Visual Guide • Generated by Gemini Canvas</p>
                <p className="mt-2">Based on "Attention Is All You Need" (Vaswani et al., 2017)</p>
            </footer>
        </div>
    );
}
