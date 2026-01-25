import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft, ArrowRight, Activity, MessageSquare, Mic, User, Layers,
    Cpu, Shield, GitBranch, ExternalLink, Play, Code, Box
} from 'lucide-react';
import { NeuralBackground } from '@/components/NeuralBackground';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SEO } from '@/components/SEO';

const FeatureCard = ({ icon: Icon, title, description, color }: {
    icon: any; title: string; description: string; color: string;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`p-6 rounded-xl border border-white/10 bg-slate-900/50 hover:border-${color}-500/30 transition-all`}
    >
        <div className={`p-3 rounded-lg bg-${color}-500/10 w-fit mb-4`}>
            <Icon className={`w-6 h-6 text-${color}-400`} />
        </div>
        <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
        <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
    </motion.div>
);

const CodeBlock = ({ code, language = "python" }: { code: string; language?: string }) => (
    <div className="rounded-xl overflow-hidden border border-white/10 bg-black/60 my-4">
        <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
            <span className="text-xs font-mono text-slate-400">{language} inference</span>
        </div>
        <pre className="p-4 overflow-x-auto text-sm">
            <code className={`language-${language} text-slate-300`}>{code}</code>
        </pre>
    </div>
);

export default function PersonaPlex() {
    return (
        <div className="min-h-screen bg-black font-sans text-slate-200">
            <SEO
                title="NVIDIA PersonaPlex-7B | Trending AI Tech"
                description="PersonaPlex-7B-v1: Voice and role control for full duplex conversational speech models. Create realistic digital avatars and NPCs."
                url="/trending/personaplex"
                type="article"
            />
            <Navigation />
            <NeuralBackground />

            {/* Hero */}
            <header className="pt-32 pb-16 px-6 relative overflow-hidden">
                <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-green-500/20 via-emerald-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-5xl mx-auto relative z-10">
                    <Link to="/trending" className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 mb-6 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Trending AI Tech
                    </Link>

                    <div className="mb-8">
                        <Badge variant="outline" className="mb-4 text-green-400 border-green-400/30 py-1 px-3 text-xs">
                            🔥 NEW FROM NVIDIA
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400">
                                NVIDIA PersonaPlex-7B-v1
                            </span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">
                            A specialized 7B model for <strong className="text-white">full-duplex conversational speech</strong>.
                            Control voice, role, and personality for next-gen digital humans and NPCs.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <a href="https://huggingface.co/nvidia/personaplex-7b-v1" target="_blank" rel="noopener noreferrer">
                            <Button variant="default" className="bg-green-600 hover:bg-green-500 text-white">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Hugging Face
                            </Button>
                        </a>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 pb-24 relative z-20">

                {/* What is PersonaPlex? */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-white mb-6">What is PersonaPlex?</h2>
                    <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                        PersonaPlex-7B-v1 is designed to power the "brain" of digital avatars. Unlike standard LLMs, it is
                        fine-tuned to handle the nuances of spoken conversation, including <strong>interruption handling (full duplex)</strong>,
                        consistent role-playing, and specific voice style control.
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <FeatureCard
                            icon={Activity}
                            title="Full Duplex"
                            description="Handles natural turn-taking and interruptions without getting confused, essential for real-time voice chat."
                            color="cyan"
                        />
                        <FeatureCard
                            icon={User}
                            title="Role Control"
                            description="Maintains specific personas (e.g., 'Helpful Pharmacist', 'Grim Warrior') consistently throughout long conversations."
                            color="violet"
                        />
                        <FeatureCard
                            icon={Mic}
                            title="Voice Formatting"
                            description="Outputs text formatted for TTS engines, including emotional cues and prosody markers."
                            color="green"
                        />
                    </div>
                </section>

                {/* Architecture / How it Works */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-white mb-6">Architecture</h2>
                    <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-8">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center">
                            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 w-full md:w-auto">
                                <Mic className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                                <h4 className="font-bold text-white">Audio Input</h4>
                                <p className="text-xs text-slate-400">User Speech</p>
                            </div>

                            <ArrowRight className="w-6 h-6 text-slate-500 rotate-90 md:rotate-0" />

                            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 w-full md:w-auto">
                                <Cpu className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                                <h4 className="font-bold text-white">ASR</h4>
                                <p className="text-xs text-slate-400">Speech-to-Text</p>
                            </div>

                            <ArrowRight className="w-6 h-6 text-slate-500 rotate-90 md:rotate-0" />

                            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 w-full md:w-auto relative shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                                <div className="absolute -top-3 -right-3">
                                    <Badge className="bg-green-500">PersonaPlex</Badge>
                                </div>
                                <Layers className="w-8 h-8 text-green-400 mx-auto mb-2" />
                                <h4 className="font-bold text-white">LLM Reasoning</h4>
                                <p className="text-xs text-slate-400">Context & Response</p>
                            </div>

                            <ArrowRight className="w-6 h-6 text-slate-500 rotate-90 md:rotate-0" />

                            <div className="p-4 rounded-xl bg-pink-500/10 border border-pink-500/30 w-full md:w-auto">
                                <MessageSquare className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                                <h4 className="font-bold text-white">TTS</h4>
                                <p className="text-xs text-slate-400">Text-to-Speech</p>
                            </div>
                        </div>
                        <p className="text-center text-sm text-slate-500 mt-8 max-w-2xl mx-auto">
                            PersonaPlex sits at the core, taking the transcribed text and generating a response that is contextually aware
                            of the persona definition and current conversation state.
                        </p>
                    </div>
                </section>

                {/* Use Cases */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-white mb-6">Use Cases</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-6 rounded-xl bg-slate-900/50 border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                <Activity className="text-emerald-400" /> Gaming NPCs
                            </h3>
                            <p className="text-slate-400">
                                Create deeply immersive non-player characters that can hold dynamic conversations, react to player voice,
                                and maintain their lore-accurate personality without breaking character.
                            </p>
                        </div>
                        <div className="p-6 rounded-xl bg-slate-900/50 border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                <User className="text-blue-400" /> Virtual Assistants
                            </h3>
                            <p className="text-slate-400">
                                Power brand ambassadors and customer service avatars that feel human, handling interruptions naturally
                                unlike traditional rigid chatbots.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Inference Example */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-white mb-6">Inference Example</h2>
                    <p className="text-slate-400 mb-4">
                        Using the model with the Transformers library is straightforward. It integrates seamlessly into existing pipelines.
                    </p>
                    <CodeBlock code={`from transformers import AutoModelForCausalLM, AutoTokenizer

model_id = "nvidia/personaplex-7b-v1"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(model_id, device_map="auto")

messages = [
    {"role": "system", "content": "You are a wise old wizard living in a tower."},
    {"role": "user", "content": "Tell me about the dragon in the north."}
]

inputs = tokenizer.apply_chat_template(messages, return_tensors="pt").to("cuda")
outputs = model.generate(inputs, max_new_tokens=100)
print(tokenizer.decode(outputs[0], skip_special_tokens=True))`} />
                </section>

                {/* CTA */}
                <div className="text-center pt-8 border-t border-white/10">
                    <Link to="/trending">
                        <Button variant="outline" className="border-green-500/30 text-green-400 hover:bg-green-500/10">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Trending
                        </Button>
                    </Link>
                </div>

            </main>
            <Footer />
        </div>
    );
}
