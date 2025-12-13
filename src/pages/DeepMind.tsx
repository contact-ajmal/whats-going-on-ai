import { motion, useScroll, useTransform } from 'framer-motion';
import { NeuralBackground } from '@/components/NeuralBackground';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { DEEPMIND_CONTENT, DeepMindItem } from '@/data/deepMindData';
import { Badge } from '@/components/ui/badge';
import { MouseEvent, ReactNode, useRef } from 'react';
import { useMotionTemplate, useMotionValue } from 'framer-motion';
import { ArrowRight, ExternalLink, Sparkles, Brain, FlaskConical, Wrench, Code } from 'lucide-react';

// --- Components ---

function SpotlightCard({ children, className = "" }: { children: ReactNode; className?: string }) {
    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        let { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className={`group relative border border - white / 10 bg - black / 40 overflow - hidden rounded - xl ${className} `}
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
radial - gradient(
    650px circle at ${mouseX}px ${mouseY}px,
    rgba(66, 133, 244, 0.1),
    transparent 80 %
            )
    `,
                }}
            />
            <div className="relative h-full">{children}</div>
        </div>
    );
}

const SectionHeader = ({ title, subtitle, icon: Icon }: { title: string; subtitle: string, icon?: any }) => (
    <div className="mb-16 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
            {Icon && <div className="p-3 rounded-2xl bg-primary/10 text-primary"><Icon size={32} /></div>}
            <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                {title}
            </h2>
        </div>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto md:mx-0">
            {subtitle}
        </p>
    </div>
);

// New Feature Block for "Visual Document" feel
const FeatureBlock = ({ item, index }: { item: DeepMindItem; index: number }) => {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            className={`flex flex - col md: flex - row gap - 8 md: gap - 16 items - center py - 12 md: py - 24 border - b border - white / 5 last: border - 0 ${isEven ? '' : 'md:flex-row-reverse'} `}
        >
            {/* Visual Side */}
            <div className="w-full md:w-1/2">
                <div className="relative aspect-video md:aspect-square rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-gray-900 to-black group">
                    <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-20" />

                    {/* Abstract Visual Representation based on Icon/Title */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[120px] md:text-[180px] drop-shadow-[0_0_60px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform duration-700 ease-in-out">
                            {item.icon}
                        </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                        <div className="flex gap-2 flex-wrap">
                            {item.tags.map(tag => (
                                <Badge key={tag} variant="secondary" className="bg-white/10 hover:bg-white/20 text-white/80 backdrop-blur-md border-0">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Side */}
            <div className="w-full md:w-1/2 space-y-6">
                <div className="flex items-center gap-4">
                    {item.year && (
                        <span className="px-3 py-1 rounded-full border border-primary/30 text-primary text-xs font-mono tracking-widest bg-primary/5">
                            {item.year}
                        </span>
                    )}
                    <div className="h-px bg-white/10 flex-grow" />
                </div>

                <h3 className="text-4xl md:text-5xl font-black text-white leading-tight">
                    {item.title}
                </h3>

                <p className="text-xl text-muted-foreground leading-relaxed">
                    {item.fullDescription || item.description}
                </p>

                <div className="pt-4">
                    {item.link && (
                        <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-white font-bold bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full transition-all group"
                        >
                            Explore {item.title}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
};


export default function DeepMind() {
    const models = DEEPMIND_CONTENT.filter(i => i.category === 'model');
    const breakthroughs = DEEPMIND_CONTENT.filter(i => i.category === 'breakthrough');
    const tools = DEEPMIND_CONTENT.filter(i => i.category === 'tool');
    const algorithms = DEEPMIND_CONTENT.filter(i => i.category === 'algorithm');

    // Timeline items
    const timelineItems = DEEPMIND_CONTENT
        .filter(i => i.year)
        .sort((a, b) => parseInt(a.year || '0') - parseInt(b.year || '0'));

    return (
        <div className="min-h-screen bg-black text-foreground selection:bg-blue-500/30">
            <NeuralBackground />
            <Navigation />

            {/* Hero */}
            <section className="relative pt-40 pb-20 container mx-auto px-6 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-20 right-0 -mr-20 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 -ml-20 w-80 h-80 bg-purple-500/10 rounded-full blur-[128px] pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-5xl mx-auto relative z-10"
                >
                    <div className="inline-flex items-center gap-2 mb-8 px-6 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 font-mono text-sm tracking-widest uppercase backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                        <Sparkles size={14} />
                        Google DeepMind
                    </div>
                    <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 text-white">
                        Solving <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 animate-gradient bg-300%">
                            Intelligence
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                        Advancing science and benefiting humanity through general-purpose artificial intelligence.
                    </p>
                </motion.div>
            </section>

            {/* Timeline Strip */}
            <section className="py-8 border-y border-white/5 bg-white/[0.02] backdrop-blur-sm overflow-hidden relative">
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-20" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-20" />

                <div className="flex animate-marquee hover:[animation-play-state:paused] gap-16 whitespace-nowrap px-6 items-center">
                    {timelineItems.map((item) => (
                        <div key={item.id} className="group flex flex-col items-center gap-3 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                            <span className="text-xs font-mono text-blue-400/80 tracking-wider">{item.year}</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-white group-hover:scale-150 transition-transform shadow-[0_0_10px_white]" />
                            <span className="text-lg font-bold text-white tracking-tight">{item.title}</span>
                        </div>
                    ))}
                    {/* Duplicate for infinite loop */}
                    {timelineItems.map((item) => (
                        <div key={item.id + '-dup'} className="group flex flex-col items-center gap-3 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                            <span className="text-xs font-mono text-blue-400/80 tracking-wider">{item.year}</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-white group-hover:scale-150 transition-transform shadow-[0_0_10px_white]" />
                            <span className="text-lg font-bold text-white tracking-tight">{item.title}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Main Content Areas */}
            <div className="container mx-auto px-6 py-32 space-y-40">

                {/* Major Models (Visual Document Style) */}
                <section id="models">
                    <SectionHeader
                        icon={Brain}
                        title="Major Models & Systems"
                        subtitle="From mastering Go to generating video, these systems represent the cutting edge of AI capabilities."
                    />
                    <div className="md:px-8">
                        {models.map((item, idx) => (
                            <FeatureBlock key={item.id} item={item} index={idx} />
                        ))}
                    </div>
                </section>

                {/* Breakthroughs (Visual Document Style) */}
                <section id="science">
                    <SectionHeader
                        icon={FlaskConical}
                        title="Scientific Breakthroughs"
                        subtitle="Using AI to solve fundamental challenges in biology, mathematics, weather, and physics."
                    />
                    <div className="md:px-8">
                        {breakthroughs.map((item, idx) => (
                            <FeatureBlock key={item.id} item={item} index={idx} />
                        ))}
                    </div>
                </section>

                {/* Tools (Grid Style) */}
                <section id="tools" className="relative">
                    <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full -z-10" />
                    <SectionHeader
                        icon={Wrench}
                        title="Open Source & Tools"
                        subtitle="Empowering the global research community with powerful libraries and environments."
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tools.map((item) => (
                            <SpotlightCard key={item.id} className="h-full hover:border-blue-500/30 transition-colors bg-black/60">
                                <div className="p-8 h-full flex flex-col items-start">
                                    <div className="bg-white/5 p-3 rounded-xl mb-6">
                                        <span className="text-3xl">{item.icon}</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">{item.description}</p>
                                    <a href={item.link} target="_blank" className="text-blue-400 hover:text-blue-300 text-sm font-bold flex items-center gap-1">
                                        View Repository <ExternalLink size={12} />
                                    </a>
                                </div>
                            </SpotlightCard>
                        ))}
                    </div>
                </section>

                {/* Algorithms (Grid Style) */}
                <section id="algorithms">
                    <SectionHeader
                        icon={Code}
                        title="Core Algorithms"
                        subtitle="The fundamental mechanisms and theories that drive intelligent agents."
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {algorithms.map((item) => (
                            <div key={item.id} className="border border-white/10 rounded-2xl p-6 bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                                <div className="text-4xl mb-4 opacity-80">{item.icon}</div>
                                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-xs text-muted-foreground/80 mb-4">{item.description}</p>
                                <div className="flex flex-wrap gap-1">
                                    {item.tags.map(tag => (
                                        <span key={tag} className="text-[10px] text-white/40 border border-white/10 px-2 py-0.5 rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>

            <Footer />
        </div>
    );
}
