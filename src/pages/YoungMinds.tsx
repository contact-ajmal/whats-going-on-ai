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


// --- Legend Mini-Games ---

const NewtonGame = ({ onComplete }: { onComplete: () => void }) => {
    const [planet, setPlanet] = useState<'earth' | 'moon' | 'jupiter'>('earth');
    const [falling, setFalling] = useState(false);

    const speeds = { earth: 1, moon: 3, jupiter: 0.4 };

    const drop = () => {
        setFalling(true);
        setTimeout(() => {
            setFalling(false);
            onComplete();
        }, 1000 * speeds[planet]);
    };

    return (
        <div className="text-center">
            <div className="flex justify-center gap-4 mb-8">
                {(['earth', 'moon', 'jupiter'] as const).map(p => (
                    <button
                        key={p}
                        onClick={() => setPlanet(p)}
                        className={`px-4 py-2 rounded-full capitalize ${planet === p ? 'bg-red-500 text-white' : 'bg-slate-700 text-slate-300'}`}
                    >
                        {p}
                    </button>
                ))}
            </div>
            <div className="h-64 bg-slate-800 rounded-2xl relative overflow-hidden mb-6 border-2 border-white/10">
                <motion.div
                    className="text-6xl absolute left-1/2 -translate-x-1/2"
                    initial={{ top: 20 }}
                    animate={falling ? { top: '85%' } : { top: 20 }}
                    transition={{ duration: speeds[planet], ease: "easeIn" }}
                >
                    🍎
                </motion.div>
                <div className="absolute bottom-0 w-full h-4 bg-green-500/50" />
            </div>
            <Button onClick={drop} disabled={falling} className="bg-red-600 hover:bg-red-700 text-lg px-8 py-4">
                Drop Apple ⬇️
            </Button>
        </div>
    );
};

const AdaGame = ({ onComplete }: { onComplete: () => void }) => {
    const [sequence, setSequence] = useState([0, 1, 0, null]);
    const answer = 1;

    const check = (val: number) => {
        if (val === answer) onComplete();
        else alert("Try again! The engine needs the right pattern.");
    };

    return (
        <div className="text-center">
            <div className="flex justify-center gap-4 mb-12 text-5xl">
                {sequence.map((n, i) => (
                    <div key={i} className="w-20 h-20 bg-slate-700 rounded-xl flex items-center justify-center border-4 border-purple-500/30">
                        {n === null ? '❓' : (n === 1 ? '🔵' : '🔴')}
                    </div>
                ))}
            </div>
            <div className="flex justify-center gap-8">
                <button onClick={() => check(0)} className="text-6xl hover:scale-110 transition-transform">🔴</button>
                <button onClick={() => check(1)} className="text-6xl hover:scale-110 transition-transform">🔵</button>
            </div>
            <p className="mt-8 text-slate-400">Complete the binary pattern!</p>
        </div>
    );
};

const TuringGame = ({ onComplete }: { onComplete: () => void }) => {
    const [input, setInput] = useState("");
    const secret = "HELLO";

    return (
        <div className="text-center">
            <div className="bg-slate-800 p-6 rounded-xl mb-6 font-mono text-2xl tracking-widest text-green-400">
                SECRET: {secret.split('').map(c => String.fromCharCode(c.charCodeAt(0) + 1)).join('')}
            </div>
            <p className="mb-4 text-slate-300">The machine shifts every letter by +1. Decode it!</p>
            <input
                type="text"
                maxLength={5}
                value={input}
                onChange={e => setInput(e.target.value.toUpperCase())}
                className="bg-black/50 border-2 border-green-500/50 rounded-lg px-4 py-2 text-center text-2xl text-white w-48 mb-4 block mx-auto uppercase"
                placeholder="TYPE HERE"
            />
            <Button
                onClick={() => input === secret ? onComplete() : alert("Wrong code!")}
                className="bg-green-600 hover:bg-green-700 w-full"
            >
                Decrypt Signal 🔓
            </Button>
        </div>
    );
};

const CurieGame = ({ onComplete }: { onComplete: () => void }) => {
    const [found, setFound] = useState(0);
    const total = 3;

    const handleFind = (id: number) => {
        const next = found + 1;
        setFound(next);
        if (next >= total) onComplete();
    };

    return (
        <div className="relative h-64 bg-black rounded-2xl overflow-hidden cursor-crosshair border-2 border-emerald-500/30">
            <p className="absolute top-4 left-4 text-emerald-400 z-10 pointer-events-none">Found: {found}/{total}</p>
            {[1, 2, 3].map(i => (
                <motion.div
                    key={i}
                    className="absolute text-4xl cursor-pointer hover:opacity-100 opacity-0 transition-opacity duration-300"
                    style={{ top: `${Math.random() * 80}%`, left: `${Math.random() * 80}%` }}
                    whileHover={{ scale: 1.5 }}
                    onClick={(e) => {
                        e.currentTarget.style.display = 'none';
                        handleFind(i);
                    }}
                >
                    ✨
                </motion.div>
            ))}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-80" />
            <p className="absolute bottom-4 w-full text-center text-slate-500 pointer-events-none">Move your mouse to find the glow!</p>
        </div>
    );
};

const DarwinGame = ({ onComplete }: { onComplete: () => void }) => {
    const handleChoice = (correct: boolean) => {
        if (correct) onComplete();
        else alert("That beak can't crack this nut!");
    };

    return (
        <div className="text-center">
            <div className="flex justify-center items-center gap-8 mb-8">
                <div className="text-6xl text-center">
                    🌰
                    <p className="text-sm text-slate-400 mt-2">Hard Nut</p>
                </div>
            </div>
            <p className="mb-6 text-xl text-white">Which bird can eat this?</p>
            <div className="flex justify-center gap-4">
                <button onClick={() => handleChoice(true)} className="bg-slate-800 p-4 rounded-xl hover:bg-slate-700 transition-colors border-2 border-transparent hover:border-amber-500">
                    <div className="text-4xl mb-2">🦅</div>
                    <div className="text-sm font-bold text-amber-300">Strong Beak</div>
                </button>
                <button onClick={() => handleChoice(false)} className="bg-slate-800 p-4 rounded-xl hover:bg-slate-700 transition-colors border-2 border-transparent hover:border-amber-500">
                    <div className="text-4xl mb-2">🦆</div>
                    <div className="text-sm font-bold text-amber-300">Flat Beak</div>
                </button>
            </div>
        </div>
    );
};

const LegendMission = ({ legend, onClose }: { legend: any, onClose: () => void }) => {
    const [missionState, setMissionState] = useState<'briefing' | 'playing' | 'complete'>('briefing');

    const handleComplete = () => setMissionState('complete');

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
        >
            <div className={`bg-slate-900 w-full max-w-2xl rounded-3xl border border-white/20 overflow-hidden relative ${missionState === 'complete' ? 'ring-4 ring-yellow-400' : ''}`}>
                <div className={`p-6 ${legend.color} text-white flex justify-between items-center`}>
                    <h3 className="text-2xl font-bold flex items-center gap-3">
                        <span className="text-4xl">{legend.icon}</span>
                        Mission: {legend.missionTitle}
                    </h3>
                    <Button onClick={onClose} variant="ghost" size="icon" className="text-white hover:bg-white/20">✖️</Button>
                </div>

                <div className="p-8">
                    {missionState === 'briefing' && (
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-indigo-400 font-bold uppercase tracking-wider text-sm mb-2">The Research 📜</h4>
                                <p className="text-slate-300 text-lg leading-relaxed">{legend.research}</p>
                            </div>

                            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                <h4 className="text-yellow-400 font-bold uppercase tracking-wider text-sm mb-1">Key Concept 💡</h4>
                                <p className="text-white text-xl font-bold mb-1">{legend.definition}</p>
                                <p className="text-slate-400 italic">{legend.definitionText}</p>
                            </div>

                            <div>
                                <h4 className="text-green-400 font-bold uppercase tracking-wider text-sm mb-2">How It Was Done 🛠️</h4>
                                <p className="text-slate-300">{legend.method}</p>
                            </div>

                            <Button
                                onClick={() => setMissionState('playing')}
                                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xl py-6 rounded-xl shadow-lg mt-4"
                            >
                                Start Experiment 🧪
                            </Button>
                        </div>
                    )}

                    {missionState === 'playing' && (
                        <>
                            <p className="text-xl text-slate-300 mb-8 text-center">{legend.missionDesc}</p>

                            {legend.id === 'newton' && <NewtonGame onComplete={handleComplete} />}
                            {legend.id === 'ada' && <AdaGame onComplete={handleComplete} />}
                            {legend.id === 'turing' && <TuringGame onComplete={handleComplete} />}
                            {legend.id === 'curie' && <CurieGame onComplete={handleComplete} />}
                            {legend.id === 'darwin' && <DarwinGame onComplete={handleComplete} />}
                        </>
                    )}

                    {missionState === 'complete' && (
                        <div className="text-center py-8">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="text-8xl mb-6"
                            >
                                🏆
                            </motion.div>
                            <h3 className="text-3xl font-bold text-white mb-4">Discovery Made!</h3>
                            <p className="text-xl text-slate-300 mb-8">
                                You helped <strong>{legend.name}</strong> with their research!
                                <br />
                                <span className="text-yellow-400 text-lg italic mt-2 block">"{legend.quote}"</span>
                            </p>
                            <Button onClick={onClose} className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg rounded-xl">
                                Return to Lab
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

const TimeTravelLab = () => {
    const [selectedLegend, setSelectedLegend] = useState<any | null>(null);

    const legends = [
        {
            id: 'newton',
            name: 'Isaac Newton',
            title: 'The Gravity Guy',
            icon: '🍎',
            color: 'bg-red-600',
            missionTitle: 'Gravity Garden',
            missionDesc: 'Apples are floating away! Click to increase gravity and bring them down.',
            actionLabel: 'Increase Gravity ⬇️',
            element: '🍏',
            quote: 'What goes up must come down!',
            buttonColor: 'bg-red-500 hover:bg-red-600',
            research: "In 1687, Newton published the Principia. He realized the same force that pulls an apple to the ground is the invisible rope keeping the Moon in orbit.",
            definition: "Universal Gravitation",
            definitionText: "Every object in the universe pulls on every other object. Heavier things pull harder!",
            method: "Mathematics (Calculus). He used math he invented to calculate the precise speed of the Moon.",
        },
        {
            id: 'ada',
            name: 'Ada Lovelace',
            title: 'The First Coder',
            icon: '💻',
            color: 'bg-purple-600',
            missionTitle: 'Logic Loom',
            missionDesc: 'The Analytical Engine is stuck! Feed it the right logic cards.',
            actionLabel: 'Insert Card 🎫',
            element: '⚙️',
            quote: 'Imagination is the discovering faculty.',
            buttonColor: 'bg-purple-500 hover:bg-purple-600',
            research: "In 1843, Ada translated notes on the 'Analytical Engine'. She added her own notes, which became three times longer than the original paper!",
            definition: "Algorithm",
            definitionText: "A step-by-step set of list of instructions to complete a task. Like a recipe for a computer.",
            method: "Analytical Logic. She wrote the very first 'code' to calculate Bernoulli Numbers using punch cards.",
        },
        {
            id: 'turing',
            name: 'Alan Turing',
            title: 'The Code Breaker',
            icon: '🔐',
            color: 'bg-slate-600',
            missionTitle: 'Enigma Cracker',
            missionDesc: 'Intercepting secret message... Decrypt the signal!',
            actionLabel: 'Decode Signal 📡',
            element: '📟',
            quote: 'Machines take me by surprise with great frequency.',
            buttonColor: 'bg-slate-500 hover:bg-slate-600',
            research: "During WWII, hidden messages were sent using the Enigma machine. The code changed every single day, making it impossible to read.",
            definition: "Cryptography",
            definitionText: "The art of writing and solving codes to keep secrets safe.",
            method: "The Bombe Machine. Turing built a giant computer that checked thousands of codes every second to find the key.",
        },
        {
            id: 'curie',
            name: 'Marie Curie',
            title: 'Radiant Scientist',
            icon: '🧪',
            color: 'bg-emerald-600',
            missionTitle: 'Glow Hunter',
            missionDesc: 'The lab is dark. Find the glowing Radium elements!',
            actionLabel: 'Search Lab 🔦',
            element: '✨',
            quote: 'Nothing in life is to be feared, it is only to be understood.',
            buttonColor: 'bg-emerald-500 hover:bg-emerald-600',
            research: "Marie noticed that pitchblende ore was more radioactive than uranium itself. She knew a new, powerful element was hiding inside.",
            definition: "Radioactivity",
            definitionText: "The powerful energy rays emitted by breaking atoms. It can glow in the dark!",
            method: "Fractional Crystallization. She boiled and filtered tons of rocks to find just a few grains of Ra - Radium.",
        },
        {
            id: 'darwin',
            name: 'Charles Darwin',
            title: 'Nature Detective',
            icon: '🐢',
            color: 'bg-amber-600',
            missionTitle: 'Beak Match',
            missionDesc: 'The finches are hungry. Match the beak to the right food!',
            actionLabel: 'Feed Finch 🌾',
            element: '🐦',
            quote: 'It is the one that is most adaptable to change.',
            buttonColor: 'bg-amber-500 hover:bg-amber-600',
            research: "Darwin sailed on the HMS Beagle to the Galápagos Islands. He saw that finches on neighboring islands looked totally different.",
            definition: "Natural Selection",
            definitionText: "Animals that fit their environment best are the ones who survive and have babies.",
            method: "Observation. He drew pictures of beak shapes and compared them to the food available (seeds vs insects).",
        }
    ];

    return (
        <section className="mb-32">
            {selectedLegend && <LegendMission legend={selectedLegend} onClose={() => setSelectedLegend(null)} />}

            <div className="flex items-center gap-4 mb-12">
                <div className="p-4 bg-indigo-500 rounded-2xl rotate-3 shadow-lg">
                    <div className="text-white w-8 h-8 font-mono font-bold text-2xl">⏳</div>
                </div>
                <div>
                    <h2 className="text-4xl md:text-5xl font-black text-white">Time-Travel Lab</h2>
                    <p className="text-indigo-300 text-xl font-bold mt-2">Partner with Legends</p>
                </div>
            </div>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl">
                Step into the portal and help history's greatest minds with their experiments.
                They need a lab partner—are you ready?
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {legends.map((legend) => (
                    <motion.div
                        key={legend.id}
                        whileHover={{ scale: 1.03, y: -5 }}
                        className="bg-slate-800/50 hover:bg-slate-800 border-2 border-white/10 hover:border-indigo-400 rounded-3xl p-6 cursor-pointer group transition-all"
                        onClick={() => setSelectedLegend(legend)}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-16 h-16 rounded-2xl ${legend.color} flex items-center justify-center text-4xl shadow-lg`}>
                                {legend.icon}
                            </div>
                            <Badge className="bg-white/10 text-white group-hover:bg-white/20">
                                Mission Ready
                            </Badge>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-1">{legend.name}</h3>
                        <p className="text-indigo-300 font-medium mb-4">{legend.title}</p>
                        <div className="bg-black/30 rounded-xl p-3 text-sm text-slate-400 flex items-center gap-2 group-hover:text-white transition-colors">
                            <span>🚀</span>
                            {legend.missionTitle}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

const ExternalGameCard = ({ title, icon, desc, url, color, isEmbed, onClick }: { title: string, icon: string, desc: string, url: string, color: string, isEmbed: boolean, onClick: (url: string, title: string, isEmbed: boolean) => void }) => (
    <div
        onClick={() => onClick(url, title, isEmbed)}
        className={`group cursor-pointer bg-slate-900/50 hover:bg-slate-800/80 p-8 rounded-3xl border-4 border-white/10 ${color} transition-all`}
    >
        <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">{icon}</span>
            <h3 className="text-2xl font-bold text-white transition-colors">{title}</h3>
            {isEmbed && <Badge className="bg-green-500/20 text-green-300 border-none ml-auto">Play Here</Badge>}
            {!isEmbed && <Badge className="bg-blue-500/20 text-blue-300 border-none ml-auto">External</Badge>}
        </div>
        <p className="text-slate-400 text-lg mb-6">
            {desc}
        </p>
        <div className="font-bold text-white/50 group-hover:text-white flex items-center gap-2">
            {isEmbed ? '🎮 Play Now' : '🔗 Visit Site'} <Rocket className="w-4 h-4" />
        </div>
    </div>
);

const GameModal = ({ url, title, onClose }: { url: string, title: string, onClose: () => void }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
    >
        <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-slate-900 w-full max-w-6xl h-[80vh] rounded-3xl border border-white/10 flex flex-col overflow-hidden relative"
        >
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-slate-950">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    🎮 Playing: <span className="text-purple-400">{title}</span>
                </h3>
                <Button onClick={onClose} variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                    <span className="sr-only">Close</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </Button>
            </div>
            <div className="flex-1 bg-white">
                <iframe
                    src={url}
                    className="w-full h-full border-none"
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
        </motion.div>
    </motion.div>
);

const EmojiAlchemist = () => {
    const [selected, setSelected] = useState<string[]>([]);
    const [result, setResult] = useState<string | null>(null);

    const emojis = ["🔥", "💧", "🌍", "💨", "🦁", "🦅"];
    const combinations: Record<string, string> = {
        "🔥💧": "☁️ Steam",
        "💧🔥": "☁️ Steam",
        "🔥🌍": "🌋 Lava",
        "🌍🔥": "🌋 Lava",
        "🔥💨": "⚡ Energy",
        "💨🔥": "⚡ Energy",
        "💧🌍": "🌱 Plant",
        "🌍💧": "🌱 Plant",
        "💧💨": "🌪️ Storm",
        "💨💧": "🌪️ Storm",
        "🌍💨": "🌫️ Dust",
        "💨🌍": "🌫️ Dust",
        "🦁🦅": "🦅 Griffin",
        "🦅🦁": "🦅 Griffin",
    };

    const handleSelect = (emoji: string) => {
        if (selected.length < 2) {
            const newSelected = [...selected, emoji];
            setSelected(newSelected);

            if (newSelected.length === 2) {
                const key = newSelected.join("");
                setTimeout(() => {
                    setResult(combinations[key] || "❓ Mystery Blob");
                }, 500);
            }
        } else {
            setSelected([emoji]);
            setResult(null);
        }
    };

    return (
        <div className="bg-slate-900/50 p-8 rounded-3xl border-4 border-dashed border-purple-500/30 text-center">
            <h3 className="text-2xl font-bold text-purple-300 mb-6">🔮 The Alchemist's Lab</h3>

            <div className="min-h-[100px] flex items-center justify-center gap-4 mb-8 bg-black/20 rounded-2xl p-4">
                {selected.map((e, i) => (
                    <motion.div
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        key={i} className="text-6xl"
                    >{e}</motion.div>
                ))}
                {selected.length === 2 && <span className="text-4xl text-white">=</span>}
                {result && (
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1.5, rotate: 0 }}
                        className="text-6xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                    >
                        {result}
                    </motion.div>
                )}
            </div>

            <div className="grid grid-cols-3 gap-4">
                {emojis.map((e) => (
                    <button
                        key={e}
                        onClick={() => handleSelect(e)}
                        className="text-4xl p-4 bg-white/5 hover:bg-white/20 rounded-xl transition-all hover:scale-110 active:scale-95"
                    >
                        {e}
                    </button>
                ))}
            </div>
            <p className="mt-4 text-sm text-slate-400">Click 2 emojis to mix!</p>
        </div>
    );
};

const TrainTheDragon = () => {
    const [score, setScore] = useState(0);
    const [learned, setLearned] = useState(false);
    const [currentItem, setCurrentItem] = useState(0);
    const [feedback, setFeedback] = useState<string | null>(null);

    const items = [
        { emoji: "🥦", type: "yuck" },
        { emoji: "🍪", type: "yum" },
        { emoji: "🥕", type: "yuck" },
        { emoji: "🍰", type: "yum" },
        { emoji: "🍋", type: "yuck" },
        { emoji: "🍩", type: "yum" },
    ];

    const current = items[currentItem];

    const handleGuess = (guess: "yuck" | "yum") => {
        if (guess === current.type) {
            setScore(s => s + 1);
            setFeedback("✅ Correct!");
            if (currentItem >= 4) {
                setLearned(true);
            }
        } else {
            setFeedback("❌ Dragon is confused!");
        }

        setTimeout(() => {
            setFeedback(null);
            if (currentItem < items.length - 1) {
                setCurrentItem(c => c + 1);
            } else {
                // Keep showing the learned state
            }
        }, 1000);
    };

    const reset = () => {
        setScore(0);
        setLearned(false);
        setCurrentItem(0);
        setFeedback(null);
    }

    return (
        <div className="bg-slate-900/50 p-8 rounded-3xl border-4 border-dashed border-red-500/30 text-center relative overflow-hidden">
            {learned && (
                <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-10 p-6">
                    <h3 className="text-4xl font-black text-yellow-400 mb-4 animate-bounce">🎓 Dragon Graduated!</h3>
                    <p className="text-white text-lg mb-6">Found <strong>{score}</strong> correct items. The Dragon now knows that sweets are Yum!</p>
                    <Button onClick={reset} className="bg-green-500 hover:bg-green-600 text-black font-bold text-lg px-8 py-4 rounded-full">
                        Play Again
                    </Button>
                </div>
            )}

            <h3 className="text-2xl font-bold text-red-300 mb-6">🐉 Feeding Time</h3>

            <div className="mb-8">
                <motion.div
                    key={currentItem}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-9xl mb-4"
                >
                    {current.emoji}
                </motion.div>
                {feedback && <div className="text-xl font-bold text-white mb-2">{feedback}</div>}
                <div className="flex justify-center gap-2">
                    {[...Array(items.length)].map((_, i) => (
                        <div key={i} className={`h-2 w-2 rounded-full ${i <= currentItem ? 'bg-red-500' : 'bg-slate-700'}`} />
                    ))}
                </div>
            </div>

            <div className="flex gap-4 justify-center">
                <Button
                    onClick={() => handleGuess('yuck')}
                    className="bg-green-600 hover:bg-green-700 text-white text-xl px-8 py-6 rounded-2xl"
                >
                    🤢 Yuck
                </Button>
                <Button
                    onClick={() => handleGuess('yum')}
                    className="bg-pink-600 hover:bg-pink-700 text-white text-xl px-8 py-6 rounded-2xl"
                >
                    😋 Yum
                </Button>
            </div>
        </div>
    );
};

// --- Main Page ---

export default function YoungMinds() {
    const [activeGame, setActiveGame] = useState<{ url: string, title: string } | null>(null);

    const handleGameCardClick = (url: string, title: string, isEmbed: boolean) => {
        if (isEmbed) {
            setActiveGame({ url, title });
        } else {
            window.open(url, '_blank');
        }
    };

    return (
        <div className="min-h-screen bg-[#0f0a1e] font-sans selection:bg-pink-500 selection:text-white">
            <Navigation />

            {activeGame && (
                <GameModal
                    url={activeGame.url}
                    title={activeGame.title}
                    onClose={() => setActiveGame(null)}
                />
            )}

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

                {/* Section 2: Time-Travel Lab (NEW) */}
                <TimeTravelLab />

                {/* Section 3: Brain Box */}
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

                {/* Section 3: Interactive Arcade */}
                <section>
                    <div className="flex items-center gap-4 mb-12">
                        <div className="p-4 bg-emerald-500 rounded-2xl rotate-6 shadow-lg">
                            <Palette className="text-white w-8 h-8" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-white">The Arcade</h2>
                    </div>

                    <div className="space-y-24">
                        {/* Game 1: Build A Bot */}
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="text-3xl font-bold text-white mb-6">1. Create Your Buddy</h3>
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

                        {/* Game 2: Emoji Alchemist */}
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1">
                                <EmojiAlchemist />
                            </div>
                            <div className="order-1 md:order-2">
                                <h3 className="text-3xl font-bold text-white mb-6">2. Emoji Alchemist</h3>
                                <div className="inline-block bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-bold mb-4">
                                    Topic: Generative AI
                                </div>
                                <p className="text-xl text-slate-400 mb-6">
                                    How does AI make new things? It takes concepts it knows and mixes them together!
                                    <br /><br />
                                    Pick two emojis to act as your "Prompt", and watch the AI generate something new.
                                </p>
                            </div>
                        </div>

                        {/* Game 3: Train The Dragon */}
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="text-3xl font-bold text-white mb-6">3. Train Your Dragon</h3>
                                <div className="inline-block bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm font-bold mb-4">
                                    Topic: Machine Learning
                                </div>
                                <p className="text-xl text-slate-400 mb-6">
                                    This baby dragon doesn't know what food is safe!
                                    <br /><br />
                                    <strong>You are the Trainer.</strong> Click "Yum" for food and "Yuck" for non-food.
                                    After a few tries, the dragon will learn the pattern!
                                </p>
                            </div>
                            <TrainTheDragon />
                        </div>
                    </div>
                </section>

                {/* Section 4: External Arcade */}
                <section className="mt-32">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="p-4 bg-blue-500 rounded-2xl -rotate-3 shadow-lg">
                            <Rocket className="text-white w-8 h-8" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-white">Explore More Adventures</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <ExternalGameCard
                            title="Quick, Draw!"
                            icon="🖌️"
                            desc="A silly game where you draw, and a neural network tries to guess what you're seeing. Can you stump the AI?"
                            url="https://quickdraw.withgoogle.com/"
                            color="hover:border-blue-400 group-hover:text-blue-300"
                            isEmbed={false}
                            onClick={handleGameCardClick}
                        />
                        <ExternalGameCard
                            title="Infinite Craft"
                            icon="🌍"
                            desc="Mix elements to create the universe! Fire + Water = Steam, and it goes on forever. How many things can you discover?"
                            url="https://neal.fun/infinite-craft/"
                            color="hover:border-green-400 group-hover:text-green-300"
                            isEmbed={false}
                            onClick={handleGameCardClick}
                        />
                        <ExternalGameCard
                            title="Google Labs"
                            icon="⚗️"
                            desc="A playground of safe, creative AI experiments. From music to art, see what the smartest computers at Google are building."
                            url="https://labs.google/"
                            color="hover:border-yellow-400 group-hover:text-yellow-300"
                            isEmbed={false}
                            onClick={handleGameCardClick}
                        />
                        <ExternalGameCard
                            title="AI Puzzlers"
                            icon="🧩"
                            desc="Challenge your brain to find hidden patterns that even AI struggles to see. Can you beat the machine?"
                            url="https://ai-puzzlers.com/"
                            color="hover:border-pink-400 group-hover:text-pink-300"
                            isEmbed={false}
                            onClick={handleGameCardClick}
                        />
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}
