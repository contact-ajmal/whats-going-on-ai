import { motion, useScroll, useTransform } from 'framer-motion';
import { NeuralBackground } from '@/components/NeuralBackground';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { DEEPMIND_CONTENT, DeepMindItem } from '@/data/deepMindData';
import { Badge } from '@/components/ui/badge';
import { MouseEvent, ReactNode } from 'react';
import { useMotionTemplate, useMotionValue } from 'framer-motion';
import { ArrowRight, ExternalLink, Sparkles, Brain, FlaskConical, Wrench, Code, Star } from 'lucide-react';
import ShareButtons from '@/components/ShareButtons';

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
            className={`group relative border border-white/10 bg-black/40 overflow-hidden rounded-xl h-full flex flex-col ${className}`}
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(66, 133, 244, 0.1),
              transparent 80%
            )
          `,
                }}
            />
            <div className="relative h-full flex flex-col flex-grow">{children}</div>
        </div>
    );
}

const SectionHeader = ({ title, subtitle, icon: Icon }: { title: string; subtitle: string, icon?: any }) => (
    <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
            {Icon && <div className="p-2 rounded-lg bg-white/5 text-blue-400"><Icon size={24} /></div>}
            <h2 className="text-3xl md:text-4xl font-bold text-white">
                {title}
            </h2>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl">
            {subtitle}
        </p>
    </div>
);

// Large Featured Card (Bento Style)
const FeaturedCard = ({ item }: { item: DeepMindItem }) => {
    return (
        <SpotlightCard className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2 !bg-gradient-to-br from-blue-950/30 to-black border-blue-500/20">
            <div className="p-8 md:p-12 flex flex-col h-full bg-[url('https://transparenttextures.com/patterns/cubes.png')] bg-blend-overlay">
                <div className="flex justify-between items-start mb-8">
                    <span className="text-6xl md:text-8xl drop-shadow-[0_0_30px_rgba(66,133,244,0.3)] filter text-white">
                        {item.icon}
                    </span>
                    {item.year && (
                        <Badge variant="outline" className="text-blue-200 border-blue-500/30 bg-blue-500/10 px-3 py-1">
                            {item.year}
                        </Badge>
                    )}
                </div>

                <div className="mt-auto">
                    <h3 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                        {item.title}
                    </h3>
                    <p className="text-lg md:text-xl text-blue-100/80 leading-relaxed mb-8 max-w-xl">
                        {item.fullDescription || item.description}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                        <div className="flex gap-2">
                            {item.tags.map(tag => (
                                <Badge key={tag} className="bg-white/10 hover:bg-white/20 text-white/90 border-0">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                        <div className="flex items-center gap-4">
                            <ShareButtons title={item.title} />
                            {item.link && (
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-white font-bold hover:text-blue-300 transition-colors"
                                >
                                    Learn more <ArrowRight size={16} />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </SpotlightCard>
    );
};

// Compact Grid Card
const CompactCard = ({ item }: { item: DeepMindItem }) => {
    return (
        <SpotlightCard className="hover:border-white/20 transition-colors">
            <div className="p-6 h-full flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <span className="text-4xl">{item.icon}</span>
                    {item.year && (
                        <span className="text-xs font-mono text-muted-foreground border border-white/10 px-2 py-0.5 rounded-full">
                            {item.year}
                        </span>
                    )}
                </div>

                <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow">
                    {item.description}
                </p>

                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex gap-1 flex-wrap">
                        {item.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="text-[10px] text-white/40 uppercase tracking-wider">
                                #{tag}
                            </span>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <ShareButtons title={item.title} />
                        {item.link && (
                            <a href={item.link} target="_blank" className="text-white/60 hover:text-white transition-colors">
                                <ExternalLink size={14} />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </SpotlightCard>
    );
};


export default function DeepMind() {
    const models = DEEPMIND_CONTENT.filter(i => i.category === 'model');
    const breakthroughs = DEEPMIND_CONTENT.filter(i => i.category === 'breakthrough');
    const tools = DEEPMIND_CONTENT.filter(i => i.category === 'tool');
    const algorithms = DEEPMIND_CONTENT.filter(i => i.category === 'algorithm');

    // Define "Featured" items manually or by ID
    const featuredModelIds = ['gemini', 'alphago'];
    const featuredModels = models.filter(m => featuredModelIds.includes(m.id));
    const standardModels = models.filter(m => !featuredModelIds.includes(m.id));

    const featuredBreakthroughIds = ['alphafold'];
    const featuredBreakthroughs = breakthroughs.filter(b => featuredBreakthroughIds.includes(b.id));
    const standardBreakthroughs = breakthroughs.filter(b => !featuredBreakthroughIds.includes(b.id));

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
            <div className="container mx-auto px-6 py-24 space-y-32">

                {/* Major Models */}
                <section id="models">
                    <SectionHeader
                        icon={Brain}
                        title="Major Models & Systems"
                        subtitle="From mastering Go to generating video, these systems represent the cutting edge of AI capabilities."
                    />
                    {/* Featured Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
                        {featuredModels.map(item => (
                            <FeaturedCard key={item.id} item={item} />
                        ))}
                    </div>
                    {/* Standard Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {standardModels.map(item => (
                            <CompactCard key={item.id} item={item} />
                        ))}
                    </div>
                </section>

                {/* Breakthroughs */}
                <section id="science">
                    <SectionHeader
                        icon={FlaskConical}
                        title="Scientific Breakthroughs"
                        subtitle="Using AI to solve fundamental challenges in biology, mathematics, weather, and physics."
                    />
                    {/* Featured Grid */}
                    <div className="grid grid-cols-1 gap-6 mb-6">
                        {featuredBreakthroughs.map(item => (
                            <FeaturedCard key={item.id} item={item} />
                        ))}
                    </div>
                    {/* Standard Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {standardBreakthroughs.map(item => (
                            <CompactCard key={item.id} item={item} />
                        ))}
                    </div>
                </section>

                {/* Tools & Algorithms (Mixed Grid) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <section id="tools">
                        <SectionHeader
                            icon={Wrench}
                            title="Open Source & Tools"
                            subtitle="Empowering the global research community."
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {tools.map((item) => (
                                <CompactCard key={item.id} item={item} />
                            ))}
                        </div>
                    </section>

                    <section id="algorithms">
                        <SectionHeader
                            icon={Code}
                            title="Core Algorithms"
                            subtitle="Propelling the field forward."
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {algorithms.map((item) => (
                                <div key={item.id} className="border border-white/10 rounded-2xl p-6 bg-white/[0.02] hover:bg-white/[0.05] transition-colors flex flex-col">
                                    <div className="text-3xl mb-4 opacity-80">{item.icon}</div>
                                    <h3 className="font-bold text-white mb-2">{item.title}</h3>
                                    <p className="text-xs text-muted-foreground/80 mb-4 flex-grow">{item.description}</p>
                                    <div className="flex flex-wrap gap-1 mt-auto">
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

            </div>

            <Footer />
        </div>
    );
}
