import { motion } from 'framer-motion';
import { NeuralBackground } from '@/components/NeuralBackground';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { DEEPMIND_CONTENT, DeepMindItem } from '@/data/deepMindData';
import { Badge } from '@/components/ui/badge'; // Ensure Badge is imported if used in SpotlightCard or below
import { MouseEvent, ReactNode } from 'react';
import { useMotionTemplate, useMotionValue } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react'; // Import icons

// Spotlight Card Component (Reused/Locally Defined for simplicity or import if exported)
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
            className={`group relative border border-white/10 bg-white/5 overflow-hidden rounded-xl ${className}`}
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(14, 165, 233, 0.15),
              transparent 80%
            )
          `,
                }}
            />
            <div className="relative h-full">{children}</div>
        </div>
    );
}

const SectionHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
    <div className="mb-12">
        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-4">
            {title}
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl">
            {subtitle}
        </p>
    </div>
);

const ContentGrid = ({ items }: { items: DeepMindItem[] }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
            <SpotlightCard key={item.id} className="h-full hover:border-primary/50 transition-colors">
                <div className="p-8 h-full flex flex-col items-start">
                    <div className="flex justify-between w-full mb-6">
                        <span className="text-4xl">{item.icon}</span>
                        {item.year && (
                            <Badge variant="outline" className="font-mono text-xs border-primary/20 text-primary bg-primary/5">
                                {item.year}
                            </Badge>
                        )}
                    </div>

                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-primary transition-colors">
                        {item.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                        {item.description}
                    </p>

                    <div className="w-full pt-6 border-t border-white/5 flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                            {item.tags.slice(0, 2).map(tag => (
                                <span key={tag} className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-mono">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                        {item.link && (
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:text-white transition-colors"
                            >
                                <ExternalLink size={16} />
                            </a>
                        )}
                    </div>
                </div>
            </SpotlightCard>
        ))}
    </div>
);

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
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
            <NeuralBackground />
            <Navigation />

            {/* Hero */}
            <section className="relative pt-32 pb-20 container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-4xl mx-auto"
                >
                    <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary font-mono text-sm tracking-widest uppercase">
                        DeepMind Hub
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 text-white">
                        Solving <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Intelligence</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                        Explore the technologies, models, and breakthroughs that are defining the future of Artificial General Intelligence.
                    </p>
                </motion.div>
            </section>

            {/* Timeline Strip */}
            <section className="py-12 border-y border-white/5 bg-black/20 overflow-hidden relative">
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

                <div className="flex animate-marquee hover:[animation-play-state:paused] gap-12 whitespace-nowrap px-6">
                    {timelineItems.map((item) => (
                        <div key={item.id} className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-default">
                            <span className="text-sm font-mono text-primary/80">{item.year}</span>
                            <div className="w-2 h-2 rounded-full bg-white/20" />
                            <span className="text-sm font-bold text-white">{item.title}</span>
                        </div>
                    ))}
                    {/* Duplicate for infinite loop */}
                    {timelineItems.map((item) => (
                        <div key={item.id + '-dup'} className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-default">
                            <span className="text-sm font-mono text-primary/80">{item.year}</span>
                            <div className="w-2 h-2 rounded-full bg-white/20" />
                            <span className="text-sm font-bold text-white">{item.title}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Main Content Areas */}
            <div className="container mx-auto px-6 py-24 space-y-32">

                {/* Models */}
                <section id="models">
                    <SectionHeader
                        title="Major Models & Systems"
                        subtitle="From mastering Go to generating video, these systems represent the cutting edge of AI capabilities."
                    />
                    <ContentGrid items={models} />
                </section>

                {/* Breakthroughs */}
                <section id="science">
                    <SectionHeader
                        title="Scientific Breakthroughs"
                        subtitle="Using AI to solve fundamental challenges in biology, mathematics, weather, and physics."
                    />
                    <ContentGrid items={breakthroughs} />
                </section>

                {/* Tools */}
                <section id="tools">
                    <SectionHeader
                        title="Open Source & Tools"
                        subtitle="Empowering the global research community with powerful libraries and environments."
                    />
                    <ContentGrid items={tools} />
                </section>

                {/* Algorithms */}
                <section id="algorithms">
                    <SectionHeader
                        title="Core Algorithms"
                        subtitle="The fundamental mechanisms and theories that drive intelligent agents."
                    />
                    <ContentGrid items={algorithms} />
                </section>

            </div>

            <Footer />
        </div>
    );
}
