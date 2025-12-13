import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Star, Zap, Bot, Heart, Sparkles, Rocket, Brain, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// --- Components ---

const Hero = () => (
    <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 via-pink-900/30 to-black z-0" />
        <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute top-20 right-10 md:right-32 opacity-20 md:opacity-100"
        >
            <Bot size={300} className="text-yellow-400 drop-shadow-[0_0_30px_rgba(250,204,21,0.5)]" />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10 text-center md:text-left">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block"
            >
                <Badge className="bg-yellow-400 text-black hover:bg-yellow-500 text-lg py-2 px-4 mb-6 border-none shadow-[0_0_20px_rgba(250,204,21,0.6)] animate-bounce">
                    ✨ For Future Inventors!
                </Badge>
            </motion.div>
            <h1 className="text-5xl md:text-8xl font-black text-white mb-6 drop-shadow-lg leading-tight">
                The Magic <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500">AI Playground</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-10 max-w-2xl font-medium">
                Welcome to the place where computers learn to dream!
                Discover how robots think, paint, and tell stories.
            </p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 py-6 text-xl shadow-[0_0_30px_rgba(147,51,234,0.5)] border-2 border-white/20">
                    <Rocket className="mr-2" /> Start Exploring
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10 rounded-full px-8 py-6 text-xl">
                    🎮 Play Games
                </Button>
            </div>
        </div>
    </section>
);

const RoboTale = ({ title, story, color }: { title: string, story: string, color: string }) => (
    <motion.div
        whileHover={{ scale: 1.05, rotate: -2 }}
        className={`p-8 rounded-3xl ${color} border-4 border-white/20 shadow-xl relative overflow-hidden group`}
    >
        <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
            <Sparkles size={100} />
        </div>
        <h3 className="text-3xl font-black text-white mb-4 drop-shadow-md">{title}</h3>
        <p className="text-white/90 text-lg font-medium leading-relaxed">
            {story}
        </p>
    </motion.div>
);

const BrainBox = () => {
    const terms = [
        { term: "Training", emoji: "🏋️", desc: "Just like you go to school! We show the computer millions of pictures until it learns what a 'Cat' looks like." },
        { term: "Hallucination", emoji: "🤪", desc: "When the AI gets confused and makes things up, like seeing a bunny in the clouds." },
        { term: "Prompt", emoji: "🗣️", desc: "The magic words you say to the AI to get it to do something. Like 'Abracadabra' but for computers!" },
        { term: "Robot", emoji: "🤖", desc: "A machine that can move and do tasks. An AI is the 'brain', and the Robot is the 'body'." },
    ];

    return (
        <div className="grid md:grid-cols-2 gap-6">
            {terms.map((t, i) => (
                <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border-2 border-white/20 hover:border-yellow-400 transition-colors"
                >
                    <div className="flex items-center gap-4 mb-3">
                        <span className="text-4xl">{t.emoji}</span>
                        <h4 className="text-2xl font-bold text-yellow-300">{t.term}</h4>
                    </div>
                    <p className="text-slate-200 text-lg">{t.desc}</p>
                </motion.div>
            ))}
        </div>
    );
};

const BuildABot = () => {
    const [head, setHead] = useState(0);
    const [body, setBody] = useState(0);
    const heads = ["🤖", "🐮", "👽", "🦄"];
    const bodies = ["👕", "🥋", "👗", "🧥"];
    const colors = ["bg-blue-500", "bg-red-500", "bg-green-500", "bg-purple-500"];
    const [color, setColor] = useState(0);

    return (
        <div className="bg-slate-900/50 p-8 rounded-3xl border-4 border-dashed border-white/20 text-center">
            <h3 className="text-3xl font-black text-white mb-8">🔧 Build-A-Bot Workshop</h3>

            <div className={`w-48 h-64 mx-auto ${colors[color]} rounded-2xl flex flex-col items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.2)] transition-colors duration-500 mb-8`}>
                <div className="text-8xl mb-[-20px] filter drop-shadow-lg">{heads[head]}</div>
                <div className="text-8xl filter drop-shadow-lg">{bodies[body]}</div>
            </div>

            <div className="flex justify-center gap-4 flex-wrap">
                <Button onClick={() => setHead((h) => (h + 1) % heads.length)} className="bg-slate-800 hover:bg-slate-700">
                    Change Head 🐮
                </Button>
                <Button onClick={() => setBody((b) => (b + 1) % bodies.length)} className="bg-slate-800 hover:bg-slate-700">
                    Change Body 🥋
                </Button>
                <Button onClick={() => setColor((c) => (c + 1) % colors.length)} className="bg-emerald-600 hover:bg-emerald-700">
                    Paint Job 🎨
                </Button>
            </div>
        </div>
    )
}

// --- Main Page ---

export default function YoungMinds() {
    return (
        <div className="min-h-screen bg-[#0f0a1e] font-sans selection:bg-pink-500 selection:text-white">
            <Navigation />

            <Hero />

            <main className="container mx-auto px-6 pb-32">

                {/* Section 1: Robo-Tales */}
                <section className="mb-32">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="p-4 bg-pink-500 rounded-2xl rotate-3 shadow-lg">
                            <Heart className="text-white w-8 h-8" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-white">Robo Tales</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <RoboTale
                            title="The Lonely Calculator"
                            story="Once, computers could only do math. 1 + 1 = 2. But one day, a computer named Neural Net looked at a picture of a cat and said... 'Meow!' Everyone was shocked. It had learned to see!"
                            color="bg-gradient-to-br from-pink-500 to-rose-600"
                        />
                        <RoboTale
                            title="The Artist's Dream"
                            story="A robot wanted to paint, but it had no hands. So it dreamed up colors in its mind. It mixed 'Sunset' with 'Ice Cream' and made a sky made of sorbet. Now it paints with pure imagination."
                            color="bg-gradient-to-br from-purple-500 to-indigo-600"
                        />
                    </div>
                </section>

                {/* Section 2: Brain Box */}
                <section className="mb-32">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="p-4 bg-yellow-400 rounded-2xl -rotate-3 shadow-lg">
                            <Brain className="text-black w-8 h-8" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-white">Brain Box</h2>
                    </div>
                    <p className="text-xl text-slate-400 mb-8">Confused by big words? Let's fix that.</p>
                    <BrainBox />
                </section>

                {/* Section 3: Interactive */}
                <section>
                    <div className="flex items-center gap-4 mb-12">
                        <div className="p-4 bg-emerald-500 rounded-2xl rotate-6 shadow-lg">
                            <Palette className="text-white w-8 h-8" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-white">Play Zone</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-3xl font-bold text-white mb-6">Create Your Buddy</h3>
                            <p className="text-xl text-slate-400 mb-6">
                                Robots come in all shapes and sizes. Use the workshop to design your very own AI companion!
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-4 text-slate-300 bg-white/5 p-4 rounded-xl">
                                    <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">1</span>
                                    Pick a Head (Alien? Cow?)
                                </li>
                                <li className="flex items-center gap-4 text-slate-300 bg-white/5 p-4 rounded-xl">
                                    <span className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">2</span>
                                    Choose an Outfit
                                </li>
                                <li className="flex items-center gap-4 text-slate-300 bg-white/5 p-4 rounded-xl">
                                    <span className="bg-pink-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">3</span>
                                    Paint it!
                                </li>
                            </ul>
                        </div>
                        <BuildABot />
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}
