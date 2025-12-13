import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, ChevronUp, Image as ImageIcon, Sparkles, Zap, RefreshCw, Wand2, MonitorPlay } from 'lucide-react';
import { NeuralBackground } from '@/components/NeuralBackground';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';

const Section = ({ title, children, className = "" }: any) => (
    <section className={`mb-16 ${className}`}>
        <h2 className="text-3xl font-bold text-slate-100 mb-6 border-b-4 border-purple-500 inline-block pb-2">
            {title}
        </h2>
        {children}
    </section>
);

const Card = ({ title, icon: Icon, children, colorClass = "bg-slate-900" }: any) => (
    <div className={`${colorClass} p-6 rounded-xl shadow-lg border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-purple-500/5`}>
        <div className="flex items-center gap-3 mb-4">
            {Icon && <div className="p-3 bg-white/5 rounded-full shadow-sm"><Icon className="w-6 h-6 text-purple-400" /></div>}
            <h3 className="text-xl font-bold text-slate-100">{title}</h3>
        </div>
        <div className="text-slate-400 leading-relaxed">
            {children}
        </div>
    </div>
);

const DiffusionViz = () => {
    const [step, setStep] = useState(0); // 0 (Noise) to 100 (Image)

    // Calculate noise opacity based on step (0 = pure noise, 100 = pure image)
    const imageOpacity = step / 100;
    const noiseOpacity = 1 - (step / 100);

    return (
        <div className="bg-slate-950/50 p-8 rounded-2xl border border-white/10 flex flex-col items-center backdrop-blur-sm">
            <div className="w-full max-w-2xl mb-8">
                <label className="text-slate-400 mb-2 block font-medium flex justify-between">
                    <span>Simulation Step</span>
                    <span className="text-purple-400 font-mono">T = {1000 - (step * 10)}</span>
                </label>
                <Slider
                    value={[step]}
                    onValueChange={(v) => setStep(v[0])}
                    max={100}
                    step={1}
                    className="py-4"
                />
                <div className="flex justify-between text-xs text-slate-500 font-mono mt-1">
                    <span>Pure Noise (T=1000)</span>
                    <span>Clean Image (T=0)</span>
                </div>
            </div>

            <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-xl overflow-hidden shadow-2xl border-4 border-slate-800">
                {/* The "Target" Image */}
                <img
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800"
                    alt="Abstract Art"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ opacity: imageOpacity, filter: `blur(${noiseOpacity * 20}px)` }}
                />

                {/* The Noise Layer */}
                <div
                    className="absolute inset-0 w-full h-full bg-repeat pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
                        opacity: noiseOpacity,
                        mixBlendMode: 'overlay'
                    }}
                />
                {/* Noise Overlay for extra grain */}
                <div
                    className="absolute inset-0 w-full h-full bg-slate-500 mix-blend-hard-light"
                    style={{ opacity: noiseOpacity * 0.8 }}
                />
            </div>

            <p className="mt-8 text-center text-slate-400 max-w-xl italic">
                {step < 20 ? "At the beginning, it's just random static." :
                    step < 50 ? "The model starts to hallucinate shapes in the noise." :
                        step < 80 ? "Details are being filled in. The concept is clear." :
                            "The final image is polished and sharp."}
            </p>
        </div>
    );
};

const UNetViz = () => {
    return (
        <div className="relative p-8 bg-slate-900/50 rounded-xl border border-white/10 flex flex-col items-center gap-6">
            <h3 className="text-xl font-bold text-slate-200">The "Denoising" U-Net</h3>
            <div className="flex items-center gap-4 w-full overflow-x-auto justify-center py-4">

                {/* Visual Representation of U-Net Flow */}
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-slate-800 border-2 border-slate-600 rounded flex items-center justify-center text-xs text-slate-400">
                        Noisy Image
                    </div>
                </div>

                <ArrowRight className="text-slate-500 w-6 h-6 shrink-0" />

                {/* U-Net Shape */}
                <div className="relative w-48 h-32 flex items-center justify-center">
                    {/* Downscaling */}
                    <div className="absolute left-0 top-0 w-8 h-32 bg-purple-900/40 border border-purple-500 rounded-l-lg flex flex-col justify-between p-1">
                        <ArrowRight className="w-3 h-3 text-purple-300 rotate-90 mx-auto" />
                        <span className="text-[10px] text-purple-200 text-center writing-mode-vertical">Encoder</span>
                    </div>
                    {/* Bottleneck */}
                    <div className="absolute bottom-0 w-full h-8 bg-purple-600/40 border border-purple-400 flex items-center justify-center">
                        <span className="text-[10px] text-white">Bottleneck (Embeddings)</span>
                    </div>
                    {/* Upscaling */}
                    <div className="absolute right-0 top-0 w-8 h-32 bg-purple-900/40 border border-purple-500 rounded-r-lg flex flex-col justify-between p-1">
                        <ArrowRight className="w-3 h-3 text-purple-300 -rotate-90 mx-auto mt-auto" />
                        <span className="text-[10px] text-purple-200 text-center writing-mode-vertical mb-2">Decoder</span>
                    </div>
                    {/* Skip Connections */}
                    <div className="absolute top-4 left-8 right-8 h-0 border-t-2 border-dashed border-slate-500/50" />
                    <div className="absolute top-12 left-8 right-8 h-0 border-t-2 border-dashed border-slate-500/50" />
                </div>

                <ArrowRight className="text-slate-500 w-6 h-6 shrink-0" />

                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-slate-800 border-2 border-slate-600 rounded flex items-center justify-center text-xs text-slate-400">
                        Predicted Noise
                    </div>
                </div>
            </div>

            <p className="text-sm text-slate-400 text-center max-w-md">
                The model doesn't output the image directly. It looks at the noisy input and predicts <strong>"What noise should I remove?"</strong>
            </p>
        </div>
    )
}

export default function DiffusionDeepDive() {
    return (
        <div className="min-h-screen bg-black font-sans text-slate-200">
            <NeuralBackground />

            {/* Hero Header */}
            <header className="pt-32 pb-24 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                    <Wand2 size={400} className="text-purple-500" />
                </div>
                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <Badge variant="outline" className="mb-6 text-purple-400 border-purple-500/30 py-1.5 px-4 text-sm backdrop-blur-md">
                        Deep Dive Series
                    </Badge>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
                        Understanding <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Diffusion</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        How do AI models like Midjourney and DALL-E create art?
                        They don't paint; they refine chaos into order.
                    </p>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 pb-24 relative z-20">

                {/* Intro Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    <Card title="Iterative Refinement" icon={RefreshCw}>
                        It's not instant. The model takes hundreds of tiny steps to clear up the image.
                    </Card>
                    <Card title="Start from Static" icon={MonitorPlay}>
                        Every image starts as pure random noise (TV static), not a blank canvas.
                    </Card>
                    <Card title="Adding vs Removing" icon={Zap}>
                        Training involves adding noise (easy). Generation involves removing noise (hard).
                    </Card>
                </div>

                {/* Section 1: The Process */}
                <Section title="1. From Noise to Art">
                    <p className="mb-6 text-lg text-slate-400">
                        Diffusion is technically "Denoising Diffusion Probabilistic Models".
                        That's a mouthful for <strong>"Reverse Engineering Static"</strong>.
                    </p>
                    <DiffusionViz />
                </Section>

                {/* Section 2: How It Works */}
                <Section title="2. The Magic Trick">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <p className="text-lg text-slate-400 mb-6">
                                Imagine I show you a photo of a clear sky, and I add a little bit of fog.
                                You can still see the sky. I add more fog. And more. Until it's just grey soup.
                            </p>
                            <p className="text-lg text-slate-400">
                                <strong>Forward Diffusion</strong> (Training) is easy: We ruin millions of images by adding noise.
                            </p>
                            <p className="text-lg text-slate-400 mt-6">
                                <strong>Reverse Diffusion</strong> (Generation) is the magic: We teach a Neural Network to <em>guess</em> what the image looked like <em>one step before</em>.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="p-4 bg-slate-900 border border-white/10 rounded-lg flex items-center justify-between">
                                <span className="font-bold text-slate-300">Clean Image</span>
                                <ArrowRight className="text-slate-600" />
                                <span className="font-bold text-slate-500">Noise</span>
                                <Badge className="bg-green-500/20 text-green-400">Easy math</Badge>
                            </div>
                            <div className="p-4 bg-slate-900 border border-purple-500/30 rounded-lg flex items-center justify-between shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                                <span className="font-bold text-slate-500">Noise</span>
                                <ArrowRight className="text-purple-400" />
                                <span className="font-bold text-purple-300">Clean Image</span>
                                <Badge className="bg-purple-500/20 text-purple-400">AI Needed</Badge>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* Section 3: The Architecture */}
                <Section title="3. The Engine (U-Net)">
                    <p className="mb-6 text-lg text-slate-400">
                        The actual brain doing the work is usually a <strong>U-Net</strong>. It compresses the image down to understand the "concept" (like "It's a cat"), then blows it back up to fix the pixels.
                    </p>
                    <UNetViz />
                </Section>

            </main>

            <footer className="mt-20 py-12 bg-black text-slate-600 text-center text-sm border-t border-white/10">
                <p>Visual Guide • Generated by Gemini Canvas</p>
                <p className="mt-2">Based on "Denoising Diffusion Probabilistic Models" (Ho et al., 2020)</p>
            </footer>
        </div>
    );
}
