import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Box, Layers, Download, Save, HardDrive } from 'lucide-react';
import { NeuralBackground } from '@/components/NeuralBackground';
import { Badge } from '@/components/ui/badge';

const Section = ({ title, children, className = "" }: any) => (
    <section className={`mb-16 ${className}`}>
        <h2 className="text-3xl font-bold text-slate-100 mb-6 border-b-4 border-blue-600 inline-block pb-2">
            {title}
        </h2>
        {children}
    </section>
);

const Card = ({ title, icon: Icon, children, colorClass = "bg-slate-900" }: any) => (
    <div className={`${colorClass} p-6 rounded-xl shadow-lg border border-white/10 hover:border-blue-600/50 transition-all duration-300 hover:shadow-blue-600/5`}>
        <div className="flex items-center gap-3 mb-4">
            {Icon && <div className="p-3 bg-white/5 rounded-full shadow-sm"><Icon className="w-6 h-6 text-blue-400" /></div>}
            <h3 className="text-xl font-bold text-slate-100">{title}</h3>
        </div>
        <div className="text-slate-400 leading-relaxed">
            {children}
        </div>
    </div>
);

const MatrixViz = () => {
    return (
        <div className="bg-slate-950/50 p-8 rounded-2xl border border-white/10 flex flex-col items-center backdrop-blur-sm overflow-x-auto">
            <h3 className="text-lg font-bold text-slate-300 mb-8">The Matrix Decomposition Hack</h3>

            <div className="flex items-center gap-4 min-w-[600px]">
                {/* Frozen Weights */}
                <div className="flex flex-col items-center">
                    <div className="w-32 h-32 bg-slate-800 border-2 border-slate-600 rounded flex items-center justify-center relative">
                        <LockIcon className="absolute top-2 right-2 w-4 h-4 text-slate-500" />
                        <span className="font-bold text-2xl text-slate-500">W</span>
                    </div>
                    <span className="text-sm text-slate-500 mt-2">Frozen Pretrained Weights</span>
                    <span className="text-xs text-slate-600">(10,000 x 10,000)</span>
                </div>

                <div className="text-2xl font-bold text-white mb-6">+</div>

                {/* LoRA Adapter (A x B) */}
                <div className="flex flex-col items-center p-4 bg-blue-900/10 border border-blue-500/30 rounded-xl relative">
                    <div className="absolute -top-3 left-0 right-0 text-center">
                        <Badge variant="secondary" className="bg-blue-600 text-white text-[10px]">Trainable Adapter</Badge>
                    </div>

                    <div className="flex items-center gap-1">
                        {/* Matrix A */}
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-32 bg-blue-600/20 border border-blue-500 rounded flex items-center justify-center">
                                <span className="writing-mode-vertical text-xs font-mono text-blue-300">A</span>
                            </div>
                            <span className="text-[10px] text-blue-400 mt-1">10k x 8</span>
                        </div>
                        <div className="text-sm text-slate-500">×</div>
                        {/* Matrix B */}
                        <div className="flex flex-col items-center">
                            <div className="w-32 h-8 bg-blue-600/20 border border-blue-500 rounded flex items-center justify-center">
                                <span className="text-xs font-mono text-blue-300">B</span>
                            </div>
                            <span className="text-[10px] text-blue-400 mt-1">8 x 10k</span>
                        </div>
                    </div>
                </div>

                <div className="text-2xl font-bold text-white mb-6">=</div>

                <div className="flex flex-col items-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-slate-800 to-blue-900/20 border-2 border-blue-400 rounded flex items-center justify-center">
                        <span className="font-bold text-xl text-blue-100">Fine-Tuned</span>
                    </div>
                    <span className="text-sm text-blue-400 mt-2">New Behavior</span>
                </div>
            </div>

            <p className="mt-8 text-center text-slate-400 max-w-lg">
                Instead of updating the massive <strong className="text-slate-300">W</strong> (100M params), we only train the tiny <strong className="text-blue-400">A and B</strong> matrices (1K params).
                The result is mathematically equivalent but thousands of times cheaper.
            </p>
        </div>
    );
};

// Helper for icon
const LockIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
)

export default function LoRADeepDive() {
    return (
        <div className="min-h-screen bg-black font-sans text-slate-200">
            <NeuralBackground />

            {/* Hero Header */}
            <header className="pt-32 pb-24 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                    <Box size={400} className="text-blue-600" />
                </div>
                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <Badge variant="outline" className="mb-6 text-blue-400 border-blue-600/30 py-1.5 px-4 text-sm backdrop-blur-md">
                        Deep Dive Series
                    </Badge>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
                        Low-Rank <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Adaptation (LoRA)</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        How do you teach a massive 70B parameter model new tricks without needing a supercomputer?
                        You don't retrain the brain; you just add a sticky note.
                    </p>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 pb-24 relative z-20">

                {/* Intro Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    <Card title="Efficiency" icon={Save}>
                        LoRA reduces trainable parameters by up to 10,000x, reducing VRAM requirement from 100GB+ to &lt; 24GB.
                    </Card>
                    <Card title="Modularity" icon={Layers}>
                        LoRAs are plug-and-play files (~100MB). You can have one for "Anime Style" and one for "Coding" and swap them instantly.
                    </Card>
                    <Card title="Full Rank?" icon={HardDrive}>
                        "Low Rank" describes the mathematical trick of approximating large matrices with smaller ones.
                    </Card>
                </div>

                {/* Section 1: The Matrix Hack */}
                <Section title="1. The Matrix Hack">
                    <p className="mb-6 text-lg text-slate-400">
                        Training a model means updating its weights. Weights are just giant grids of numbers (Matrices).
                    </p>
                    <MatrixViz />
                </Section>

                {/* Section 2: Why it works (Math) */}
                <Section title="2. Why does this even work? (Rank Deficiency)">
                    <div className="space-y-6 text-lg text-slate-400">
                        <p>
                            It turns out that when a model learns a new task, it doesn't actually need to change <em>all</em> of its parameters.
                            The changes required are what mathematicians call <strong>"Low Rank"</strong>.
                        </p>
                        <div className="bg-slate-900 border border-white/10 p-6 rounded-xl">
                            <h4 className="font-bold text-slate-200 mb-2">The Intuition</h4>
                            <p className="text-sm">
                                Think of it like learning to drive a new car. You don't need to re-learn what "steering" or "braking" <em>is</em> (The Frozen Weights).
                                You just need to learn the slight adjustment for how sensitive <em>this specific pedal</em> is (The Low-Rank Adapter).
                            </p>
                        </div>
                    </div>
                </Section>

                {/* Section 3: QLoRA */}
                <Section title="3. Going Deeper: QLoRA">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-white mb-4">QLoRA = Quantized LoRA</h3>
                            <p className="text-slate-400 mb-4">
                                If LoRA wasn't efficient enough, QLoRA takes it a step further.
                                It loads the giant Base Model in <strong>4-bit precision</strong> (crunching numbers down to tiny integers), and then attaches the LoRA adapter.
                            </p>
                            <Badge className="bg-green-500/20 text-green-400 py-1 px-3">
                                Result: Run a 65B Model on a single GPU
                            </Badge>
                        </div>
                        <div className="flex-1 bg-slate-900 p-6 rounded-xl border border-white/10 w-full">
                            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-4">
                                <span className="text-slate-500">Standard Fine-tuning</span>
                                <span className="font-mono text-red-400">16-bit Float</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-slate-500">QLoRA Base</span>
                                <span className="font-mono text-green-400">4-bit NormalFloat</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-500">QLoRA Adapter</span>
                                <span className="font-mono text-blue-400">16-bit Float</span>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* Section 4: Ecosystem */}
                <Section title="4. The Ecosystem Revolution">
                    <p className="mb-6 text-lg text-slate-400">
                        Before LoRA, only Big Tech could fine-tune models. LoRA democratized AI, allowing anyone with a gaming GPU to create custom models.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-slate-900 p-6 rounded-xl border border-white/10">
                            <h4 className="text-xl font-bold text-purple-400 mb-2">CivitAI & Art</h4>
                            <p className="text-slate-400 text-sm">
                                Millions of LoRAs exist for Stable Diffusion. Want your generated images to look like Arcane? Or Studio Ghibli? Just download a 50MB .safetensors LoRA file.
                            </p>
                        </div>
                        <div className="bg-slate-900 p-6 rounded-xl border border-white/10">
                            <h4 className="text-xl font-bold text-blue-400 mb-2">Local LLMs</h4>
                            <p className="text-slate-400 text-sm">
                                Developers create "Adapter" LoRAs to teach Llama 3 to speak French, code in Rust, or roleplay as characters, without redistributing the base model.
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 bg-amber-900/10 border border-amber-500/30 p-4 rounded-xl flex items-start gap-4">
                        <div className="p-2 bg-amber-500/20 rounded-lg">
                            <Download className="w-6 h-6 text-amber-500" />
                        </div>
                        <div>
                            <h4 className="font-bold text-amber-200 text-sm">A Note on Catastrophic Forgetting</h4>
                            <p className="text-xs text-amber-100/70 mt-1">
                                One major benefit of LoRA is that it helps prevent "Catastrophic Forgetting". Since the original brain (weights) stays frozen, the model doesn't lose its basic knowledge while learning the new task. You can even mix-and-match multiple LoRAs at once!
                            </p>
                        </div>
                    </div>
                </Section>

            </main>

            <footer className="mt-20 py-12 bg-black text-slate-600 text-center text-sm border-t border-white/10">
                <p>Visual Guide • Generated by Gemini Canvas</p>
                <p className="mt-2">Based on "LoRA: Low-Rank Adaptation of Large Language Models" (Hu et al., 2021)</p>
            </footer>
        </div>
    );
}
