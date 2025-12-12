import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Radio, BookOpen, Briefcase, Wrench, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { NeuralBackground } from '@/components/NeuralBackground';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { NewsFeed } from '@/components/NewsFeed';
import { FeaturedBlogs } from '@/components/FeaturedBlogs';
import { useState, useEffect } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }
  },
};

// Typewriter Component
const Typewriter = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  // Blink cursor
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setReverse(true);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 75 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span className="inline-flex items-center text-primary">
      {words[index].substring(0, subIndex)}
      <span className={`ml-1 w-2 h-6 bg-primary ${blink ? 'opacity-100' : 'opacity-0'}`} />
    </span>
  );
};

export default function Home() {
  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NeuralBackground />
      <Navigation />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 container mx-auto px-6 overflow-hidden">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto text-center z-10 relative"
        >
          {/* Pill Label */}
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-2 text-sm font-medium text-muted-foreground animate-pulse">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Live Intelligence Feed
            </div>
          </motion.div>

          {/* HEADLINE */}
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
            Your Signal in the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">
              AI Noise
            </span>
          </motion.h1>

          {/* DYNAMIC TEXT */}
          <motion.div variants={itemVariants} className="h-8 md:h-12 mb-8 text-xl md:text-2xl font-mono text-muted-foreground">
            Currently tracking: <Typewriter words={["Latest Research Papers...", "Remote AI Jobs...", "New MCP Servers...", "Video Essays..."]} />
          </motion.div>

          {/* BENTO GRID (Mission Visualization) */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mt-12 bg">

            <Link to="/research" className="group">
              <div className="h-full p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all hover:bg-white/10 flex flex-col items-start text-left">
                <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground">Deep Research</h3>
                <p className="text-sm text-muted-foreground">Curated daily drops of ArXiv papers that actually matter. No hype, just science.</p>
              </div>
            </Link>

            <Link to="/jobs" className="group">
              <div className="h-full p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all hover:bg-white/10 flex flex-col items-start text-left">
                <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                  <Briefcase size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground">Career Signal</h3>
                <p className="text-sm text-muted-foreground">Live feed of remote AI roles. Filter by company, stack, and seniority.</p>
              </div>
            </Link>

            <Link to="/updates" className="group">
              <div className="h-full p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all hover:bg-white/10 flex flex-col items-start text-left">
                <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                  <Newspaper size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground">Pulse News</h3>
                <p className="text-sm text-muted-foreground">Real-time headlines without the clickbait. Stay informed in minutes.</p>
              </div>
            </Link>

            <Link to="/tools" className="group">
              <div className="h-full p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all hover:bg-white/10 flex flex-col items-start text-left">
                <div className="p-3 rounded-lg bg-orange-500/10 text-orange-400 mb-4 group-hover:scale-110 transition-transform">
                  <Wrench size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground">Toolbox & MCP</h3>
                <p className="text-sm text-muted-foreground">Directory of emerging tools and MCP servers to power your agents.</p>
              </div>
            </Link>

          </motion.div>

          {/* Scroll CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-20 flex justify-center"
          >
            <Button variant="ghost" onClick={scrollToContent} className="text-muted-foreground hover:text-primary animate-bounce gap-2">
              Start Exploring <ChevronDown size={16} />
            </Button>
          </motion.div>

        </motion.div>
      </section>

      {/* Content Sections */}
      <section className="py-16 px-6 container mx-auto border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold border-l-4 border-primary pl-4">
              Featured Analysis
            </h2>
            <Link to="/blog" className="text-primary hover:text-accent flex items-center gap-2 text-sm font-medium">
              Read All <ArrowRight size={16} />
            </Link>
          </div>
          <FeaturedBlogs />
        </motion.div>
      </section>

      <section className="py-16 px-6 container mx-auto bg-black/20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-10">
            <h2 className="text-3xl font-bold border-l-4 border-secondary pl-4 mb-2">
              Latest Headlines
            </h2>
          </div>
          <NewsFeed />
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
