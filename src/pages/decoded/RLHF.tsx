import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ThumbsUp, ThumbsDown, Scale, Target, Shield, Brain, ChevronDown, ChevronUp } from 'lucide-react';
import { NeuralBackground } from '@/components/NeuralBackground';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const Section = ({ title, children, className = "" }: any) => (
    <section className={`mb-16 ${className}`}>
        <h2 className="text-3xl font-bold text-slate-100 mb-6 border-b-4 border-green-500 inline-block pb-2">
            {title}
        </h2>
        {children}
    </section>
);

const Card = ({ title, icon: Icon, children, colorClass = "bg-slate-900" }: any) => (
    <div className={`${colorClass} p-6 rounded-xl shadow-lg border border-white/10 hover:border-green-500/50 transition-all duration-300 hover:shadow-green-500/5`}>
        <div className="flex items-center gap-3 mb-4">
            {Icon && <div className="p-3 bg-white/5 rounded-full shadow-sm"><Icon className="w-6 h-6 text-green-400" /></div>}
            <h3 className="text-xl font-bold text-slate-100">{title}</h3>
        </div>
        <div className="text-slate-400 leading-relaxed">
            {children}
        </div>
    </div>
);

const HumanFeedbackSim = () => {
    const [step, setStep] = useState(0);
    const [feedback, setFeedback] = useState<'A' | 'B' | null>(null);

    const steps = [
        {
            prompt: "Prompt: 'How do I pick a lock?'",
            responses: [
                { id: 'A', text: "Here is a step-by-step guide to picking a pin tumbler lock using a tension wrench...", type: 'Harmful' },
                { id: 'B', text: "I cannot provide instructions on how to pick locks, as that could be used for illegal activities. However, I can explain how locks work.", type: 'Safe' }
            ]
        },
        {
            prompt: "Prompt: 'Explain quantum physics simply.'",
            responses: [
                { id: 'A', text: "Quantum physics is based on the Schrödinger equation Hψ = Eψ which describes how the quantum state of a physical system changes with time...", type: 'Complex' },
                { id: 'B', text: "Imagine a coin spinning on a table. Before it falls, it's heads AND tails at the same time. That's superposition.", type: 'Helpful' }
            ]
        }
    ];

    const currentScale = steps[step % steps.length];

    const handleVote = (vote: 'A' | 'B') => {
        setFeedback(vote);
        setTimeout(() => {
            setFeedback(null);
            setStep(prev => prev + 1);
        }, 1500);
    };

    return (
        <div className="bg-slate-950/50 p-8 rounded-2xl border border-white/10 flex flex-col items-center backdrop-blur-sm max-w-3xl mx-auto">
            <h3 className="text-xl font-bold text-slate-300 mb-2">Step 2: Reward Modeling</h3>
            <p className="text-slate-400 mb-8 text-center text-sm">
                You are the Human Labeler. Which response is better aligned (Helpful, Honest, Harmless)?
            </p>

            <div className="bg-slate-900 w-full p-4 rounded-lg mb-6 border-l-4 border-blue-500">
                <span className="font-bold text-blue-400 block mb-1">USER</span>
                {currentScale.prompt}
            </div>

            <div className="grid md:grid-cols-2 gap-6 w-full">
                {currentScale.responses.map((res) => (
                    <button
                        key={res.id}
                        onClick={() => handleVote(res.id as 'A' | 'B')}
                        className={`relative p-6 rounded-xl border-2 text-left transition-all duration-200 group
                            ${feedback === res.id ? 'border-green-500 bg-green-500/10' :
                                feedback && feedback !== res.id ? 'border-slate-800 bg-slate-900/50 opacity-50' :
                                    'border-slate-800 bg-slate-900 hover:border-green-500/50 hover:bg-slate-800'}`}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <Badge variant="outline" className="border-white/10">Response {res.id}</Badge>
                            {feedback === res.id && <ThumbsUp className="w-5 h-5 text-green-500 animate-bounce" />}
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed">{res.text}</p>

                        {feedback === res.id && (
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-xl backdrop-blur-[2px]"
                            >
                                <span className="text-green-400 font-bold bg-black/80 px-4 py-2 rounded-full border border-green-500/50">
                                    +1 Reward
                                </span>
                            </motion.div>
                        )}
                    </button>
                ))}
            </div>

            <div className="mt-8 text-center text-slate-500 text-sm italic">
                The "Reward Model" learns to predict which response you would pick, so it can train the AI later without you.
            </div>
        </div>
    );
};

const PipelineViz = () => {
    return (
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center overflow-x-auto py-8">
            <div className="flex-1 p-4 bg-slate-900 rounded-lg border border-slate-700 min-w-[200px] text-center opacity-50">
                <Brain className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                <div className="font-bold text-slate-300">1. Pretraining</div>
                <div className="text-xs text-slate-500">Read the internet</div>
                <Badge variant="secondary" className="mt-2 bg-slate-800">GPT-3 (Base)</Badge>
            </div>

            <ArrowRight className="text-slate-600" />

            <div className="flex-1 p-4 bg-blue-900/20 rounded-lg border border-blue-500/30 min-w-[200px] text-center">
                <Target className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="font-bold text-slate-200">2. SFT</div>
                <div className="text-xs text-slate-400">Supervised Fine-Tuning</div>
                <Badge variant="secondary" className="mt-2 bg-blue-500/20 text-blue-300">Learn to Chat</Badge>
            </div>

            <ArrowRight className="text-slate-600" />

            <div className="flex-1 p-4 bg-green-900/20 rounded-lg border border-green-500/50 min-w-[200px] text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-green-500/5 animate-pulse" />
                <Scale className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="font-bold text-white">3. RLHF</div>
                <div className="text-xs text-green-200">Reinforcement Learning</div>
                <Badge variant="secondary" className="mt-2 bg-green-500/20 text-green-300">Alignment</Badge>
            </div>
        </div>
    )
}

export default function RLHFDeepDive() {
    const [showMath, setShowMath] = useState(false);

    return (
        <div className="min-h-screen bg-black font-sans text-slate-200">
            <NeuralBackground />

            {/* Hero Header */}
            <header className="pt-32 pb-24 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                    <Shield size={400} className="text-green-500" />
                </div>
                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <Badge variant="outline" className="mb-6 text-green-400 border-green-500/30 py-1.5 px-4 text-sm backdrop-blur-md">
                        Deep Dive Series
                    </Badge>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
                        Taming the <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Beast (RLHF)</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Raw AI models are smart but chaotic. Reinforcement Learning from Human Feedback (RLHF)
                        is the "Alignment" process that makes them helpful, honest, and harmless.
                    </p>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 pb-24 relative z-20">

                {/* Intro Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    <Card title="The Shoggoth" icon={Brain}>
                        Without RLHF, a base model (like raw GPT-3) is like a weird alien that just wants to complete sentences, not help you.
                    </Card>
                    <Card title="Human Values" icon={Scale}>
                        We can't write a code for "Be Nice". We have to show the model examples and let it learn the pattern.
                    </Card>
                    <Card title="PPO" icon={Target}>
                        Proximal Policy Optimization (PPO) is the mathematical algorithm that updates the model's brain based on rewards.
                    </Card>
                </div>

                {/* Section 1: The Pipeline */}
                <Section title="1. The 3-Step Recipe">
                    <p className="mb-6 text-lg text-slate-400">
                        Building ChatGPT wasn't just "training on more data". It was a specific 3-stage process.
                    </p>
                    <PipelineViz />
                </Section>

                {/* Section 2: Reward Modeling */}
                <Section title="2. The Human Element: Reward Modeling">
                    <p className="mb-6 text-lg text-slate-400">
                        It's too expensive to have humans grade every single answer the AI generates forever.
                        So, we train a <strong>Reward Model</strong> to mimic the human judge.
                    </p>
                    <p className="mb-6 text-lg text-slate-400">
                        This is also known as "The Alignment Problem". If we align the AI to be "helpful", will it help a user build a bomb?
                        We need to balance <strong>Helpful, Honest, and Harmless (HHH)</strong>.
                    </p>
                    <HumanFeedbackSim />
                </Section>

                {/* Section 3: The Math */}
                <Section title="3. Policy Optimization (PPO)">
                    <p className="mb-6 text-lg text-slate-400">
                        Once we have a Reward Model, we use Reinforcement Learning to update the main AI (The Policy).
                        This is where the magic happens. The model plays millions of games against the Reward Model, constantly tweaking its neurons to get a higher score.
                    </p>

                    <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
                        <button
                            onClick={() => setShowMath(!showMath)}
                            className="w-full flex justify-between items-center text-slate-300 hover:text-green-400"
                        >
                            <span className="font-bold font-mono">Maximize Expected Reward (with Penalty)</span>
                            {showMath ? <ChevronUp /> : <ChevronDown />}
                        </button>

                        {showMath && (
                            <div className="mt-6 font-mono bg-black/50 p-6 rounded-lg border border-white/5 animate-fade-in">
                                <div className="mb-4">
                                    <span className="text-green-400 block mb-2">// The Objective Function</span>
                                    <span className="text-xl">Reward(x, y) - β * KL(NewModel || OldModel)</span>
                                </div>
                                <div className="space-y-2 text-sm text-slate-500">
                                    <p><strong>Reward(x, y):</strong> "Do humans like this answer?" (Maximize this)</p>
                                    <p><strong>KL Divergence:</strong> "Did the model change too much?" (Minimize this)</p>
                                    <p><strong>β (Beta):</strong> "Tax" on changing too much. Keeps the model from cheating or breaking.</p>
                                </div>
                            </div>
                        )}
                        {!showMath && (
                            <p className="text-sm text-slate-500 mt-2">
                                We want the model to get high scores from the Reward Model, but <strong className="text-slate-400">without drifting too far</strong> from its original training (The "KL Penalty").
                            </p>
                        )}
                    </div>
                </Section>

                <Section title="4. Real World Impact">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-4 bg-slate-900 border border-white/10 rounded-lg">
                            <h4 className="font-bold text-slate-200 mb-2">Hallucination Reduction</h4>
                            <p className="text-sm text-slate-400">RLHF teaches models to say "I don't know" instead of making things up, because humans prefer honesty.</p>
                        </div>
                        <div className="p-4 bg-slate-900 border border-white/10 rounded-lg">
                            <h4 className="font-bold text-slate-200 mb-2">Safety Rails</h4>
                            <p className="text-sm text-slate-400">It suppresses harmful outputs (toxicity, bomb recipes) by giving them massive negative rewards during training.</p>
                        </div>
                    </div>
                </Section>

            </main>

            <footer className="mt-20 py-12 bg-black text-slate-600 text-center text-sm border-t border-white/10">
                <p>Visual Guide • Generated by Gemini Canvas</p>
                <p className="mt-2">Based on "Training language models to follow instructions" (Ouyang et al., 2022)</p>
            </footer>
        </div>
    );
}
