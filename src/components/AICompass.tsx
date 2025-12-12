import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Rocket, Shield, Sprout, Share2, Scale, RefreshCcw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Types
type Archetype = 'Accelerationist' | 'Guardian' | 'Symbiote' | 'Pragmatist';

interface Question {
    id: number;
    text: string;
    options: {
        text: string;
        scores: { speed: number; optimism: number };
    }[];
}

const QUESTIONS: Question[] = [
    {
        id: 1,
        text: "A new, more powerful AI model has just been leaked. What is your first reaction?",
        options: [
            { text: "Release it to everyone immediately! Open source everything.", scores: { speed: 1, optimism: 1 } },
            { text: "Shut it down until we can prove it's safe.", scores: { speed: -1, optimism: -1 } },
            { text: "Analyze it carefully, then release with guardrails.", scores: { speed: 0, optimism: 0 } },
        ]
    },
    {
        id: 2,
        text: "What is the biggest risk of Artificial General Intelligence (AGI)?",
        options: [
            { text: "That we don't build it fast enough to solve cancer/climate change.", scores: { speed: 1, optimism: 1 } },
            { text: "Extinction. It decides we are obsolete.", scores: { speed: -1, optimism: -1 } },
            { text: "Economic disruption and job loss.", scores: { speed: 0, optimism: -0.5 } },
        ]
    },
    {
        id: 3,
        text: "How should AI be regulated?",
        options: [
            { text: "Zero regulation. Innovation must be unbridled.", scores: { speed: 1, optimism: 0.5 } },
            { text: "Global pause on all training runs >GPT-4.", scores: { speed: -1, optimism: -0.5 } },
            { text: "Reasonable safety standards, but don't stifle startups.", scores: { speed: 0, optimism: 0 } },
        ]
    },
    {
        id: 4,
        text: "In 2030, the ideal relationship between humans and AI is...",
        options: [
            { text: "Merger. We become cyborgs via Neuralink.", scores: { speed: 0.5, optimism: 1 } },
            { text: "Servitude. AI manages the world, we enjoy the abundance.", scores: { speed: 1, optimism: 1 } },
            { text: "Separation. AI is a tool, kept in a box.", scores: { speed: -1, optimism: -0.5 } },
        ]
    },
    {
        id: 5,
        text: "Does an AI system have 'rights'?",
        options: [
            { text: "Yes, if it claims to be conscious, we treat it as such.", scores: { speed: 0.5, optimism: 1 } },
            { text: "No, it's just math. Turn it off whenever.", scores: { speed: 0, optimism: -0.5 } },
            { text: "It's complicated. We need a new ethical framework.", scores: { speed: -0.5, optimism: 0.5 } },
        ]
    }
];

export function AICompass() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [scores, setScores] = useState({ speed: 0, optimism: 0 });
    const [result, setResult] = useState<Archetype | null>(null);

    const handleAnswer = (optionScores: { speed: number; optimism: number }) => {
        const newScores = {
            speed: scores.speed + optionScores.speed,
            optimism: scores.optimism + optionScores.optimism
        };
        setScores(newScores);

        if (currentIndex < QUESTIONS.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            calculateResult(newScores);
        }
    };

    const calculateResult = (finalScores: { speed: number; optimism: number }) => {
        const { speed, optimism } = finalScores;
        if (speed > 1 && optimism > 0) setResult('Accelerationist');
        else if (speed < 0 && optimism < 0) setResult('Guardian');
        else if (optimism > 1) setResult('Symbiote');
        else setResult('Pragmatist');
    };

    const restart = () => {
        setCurrentIndex(0);
        setScores({ speed: 0, optimism: 0 });
        setResult(null);
    };

    const getArchetypeData = (type: Archetype) => {
        switch (type) {
            case 'Accelerationist':
                return {
                    icon: Rocket,
                    color: 'text-orange-500',
                    gradient: 'from-orange-500 to-red-600',
                    description: "You believe the only way out is through. Speed is the ultimate virtue. Let the AGI be born!",
                    quote: "e/acc or die."
                };
            case 'Guardian':
                return {
                    icon: Shield,
                    color: 'text-blue-500',
                    gradient: 'from-blue-500 to-cyan-600',
                    description: "Safety is paramount. You see the existential risks clearly and believe we must slow down to survive.",
                    quote: "Pause the run."
                };
            case 'Symbiote':
                return {
                    icon: Sprout,
                    color: 'text-green-500',
                    gradient: 'from-green-400 to-emerald-600',
                    description: "You see a future where biology and technology merge. AI isn't a tool or a threat, it's our evolution.",
                    quote: "Upgrade your mind."
                };
            case 'Pragmatist':
            default:
                return {
                    icon: Scale,
                    color: 'text-slate-400',
                    gradient: 'from-slate-400 to-slate-600',
                    description: "Balanced and grounded. You see both the hype and the risks, preferring a steady, sensible path forward.",
                    quote: "Trust, but verify."
                };
        }
    };

    const shareResult = () => {
        if (!result) return;
        const text = `I am ${result === 'Accelerationist' || result === 'Guardian' ? 'an' : 'a'} ${result} according to the AI Compass! 🧭\n\nFind your AI Archetype at:`;
        const url = window.location.href;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    };

    if (result) {
        const data = getArchetypeData(result);
        const Icon = data.icon;

        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md mx-auto"
            >
                <Card className="relative overflow-hidden border-white/10 bg-black/40 backdrop-blur-xl p-8 text-center shadow-2xl">
                    <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${data.gradient} blur-3xl`} />

                    <div className="relative z-10 flex flex-col items-center">
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", duration: 1 }}
                            className={`w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,0,0,0.5)]`}
                        >
                            <Icon className={`w-12 h-12 ${data.color}`} />
                        </motion.div>

                        <h2 className="text-3xl font-bold mb-2 text-white">{result}</h2>
                        <p className={`text-sm font-mono mb-6 opacity-75 ${data.color}`}>"{data.quote}"</p>

                        <p className="text-muted-foreground mb-8 leading-relaxed">
                            {data.description}
                        </p>

                        <div className="flex gap-4 w-full">
                            <Button variant="default" className="flex-1 bg-white text-black hover:bg-white/90" onClick={shareResult}>
                                <Share2 className="w-4 h-4 mr-2" />
                                Share
                            </Button>
                            <Button variant="outline" size="icon" onClick={restart}>
                                <RefreshCcw className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </Card>
            </motion.div>
        );
    }

    const question = QUESTIONS[currentIndex];

    return (
        <div className="max-w-2xl mx-auto w-full">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between text-xs text-muted-foreground mb-2 font-mono">
                    <span>Question {currentIndex + 1} / {QUESTIONS.length}</span>
                    <span>{Math.round(((currentIndex) / QUESTIONS.length) * 100)}%</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentIndex + 1) / QUESTIONS.length) * 100}%` }}
                    />
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Card className="p-8 border-white/10 bg-card/30 backdrop-blur-md shadow-2xl">
                        <h3 className="text-2xl font-bold mb-8 leading-tight text-center">
                            {question.text}
                        </h3>

                        <div className="space-y-3">
                            {question.options.map((option, idx) => (
                                <Button
                                    key={idx}
                                    variant="outline"
                                    className="w-full justify-start text-left h-auto py-4 px-6 text-base border-white/10 hover:bg-primary/20 hover:border-primary/50 hover:text-white transition-all group whitespace-normal"
                                    onClick={() => handleAnswer(option.scores)}
                                >
                                    <span className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center mr-4 text-xs text-muted-foreground group-hover:border-primary group-hover:text-primary shrink-0">
                                        {String.fromCharCode(65 + idx)}
                                    </span>
                                    {option.text}
                                </Button>
                            ))}
                        </div>
                    </Card>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
