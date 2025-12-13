import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { ArrowRight, ChevronDown, BookOpen, Briefcase, Wrench, Newspaper, Zap, Bot, GraduationCap, Video } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DECODED_TOPICS } from '@/data/aiDecoded';
import { toolsData } from '@/data/toolsData';
import { FALLBACK_LEARNING } from '@/data/fallbackLearning';
import { FALLBACK_PAPERS } from '@/data/fallbackResearch';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { NeuralBackground } from '@/components/NeuralBackground';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { NewsFeed } from '@/components/NewsFeed';
import { FeaturedBlogs } from '@/components/FeaturedBlogs';
import { BookmarkUplink } from '@/components/BookmarkUplink';
import { ReactNode, MouseEvent, useState, useEffect } from 'react';

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

// --- MARK: Components ---

// Creative Decoder Text Component
const DecoderText = ({ text, className }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState('');
  const [complete, setComplete] = useState(false);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(text.split('').map((char, index) => {
        if (index < iteration) return text[index];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(''));

      if (iteration >= text.length) {
        clearInterval(interval);
        setComplete(true);
      }

      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className={className}>
      {displayText}
    </span>
  );
};

// Infinite Scrolling Ticker
const Ticker = () => {
  return (
    <div className="w-full overflow-hidden bg-white/5 border-y border-white/5 py-2 mb-12 relative group cursor-default">
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex gap-12 mx-6 text-[10px] md:text-xs font-mono text-muted-foreground/70 tracking-[0.2em] uppercase">
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50"></span> Tracking New MCP Servers</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500/50"></span> Scanning ArXiv Papers</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-500/50"></span> Indexing Remote Jobs</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-orange-500/50"></span> Aggregating Video Feeds</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50"></span> Initializing Agents</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Spotlight Card Effect
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

export default function Home() {
  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NeuralBackground />
      <Navigation />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 container mx-auto px-6 overflow-hidden min-h-screen flex flex-col justify-center">

        {/* Radar Scan Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20 select-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary/20 rounded-full animate-ping-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/10 rounded-full" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-scan" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto text-center z-10 relative"
        >
          {/* BRAND SIGNAL */}
          <motion.div variants={itemVariants} className="flex flex-col items-center justify-center mb-10 min-h-[80px]">

            {/* Decorative Signal Lines */}
            <div className="flex items-center gap-4 mb-4 opacity-50">
              <div className="h-px w-12 bg-gradient-to-l from-primary to-transparent" />
              <div className="text-[10px] tracking-[0.3em] font-mono text-primary/80 uppercase">Incoming Signal</div>
              <div className="h-px w-12 bg-gradient-to-r from-primary to-transparent" />
            </div>

            {/* The Brand */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <h2 className="relative text-4xl md:text-6xl font-black tracking-tight text-white select-none normal-case">
                WhatsGoingOn<span className="text-primary normal-case">AI</span>
              </h2>
            </div>

            {/* Bottom Status */}
            <div className="mt-2 flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span className="text-[9px] font-medium text-muted-foreground uppercase tracking-widest">Live Feed Active</span>
            </div>

          </motion.div>

          {/* HEADLINE */}
          <motion.h1 variants={itemVariants} className="text-5xl md:text-8xl font-extrabold tracking-tight mb-8 leading-[0.9]">
            Your Signal in <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-primary/50 to-transparent">
              The Noise
            </span>
          </motion.h1>

          {/* SIGNAL UPLINK (BOOKMARK) */}
          <motion.div variants={itemVariants} className="flex justify-center mb-12">
            <BookmarkUplink />
          </motion.div>

          {/* TICKER */}
          <motion.div variants={itemVariants} className="w-full max-w-2xl mx-auto mb-16 opacity-80">
            <Ticker />
          </motion.div>

          {/* BENTO GRID (Mission Visualization) */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">

            <Link to="/research" className="block h-full">
              <SpotlightCard className="h-full hover:border-blue-500/50 transition-colors">
                <div className="p-6 h-full flex flex-col items-start text-left">
                  <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 mb-4">
                    <BookOpen size={24} />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-foreground">Deep Research</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">Daily feed of ArXiv papers selected for impact, not hype. Filter by citation count.</p>
                </div>
              </SpotlightCard>
            </Link>

            <Link to="/jobs" className="block h-full">
              <SpotlightCard className="h-full hover:border-emerald-500/50 transition-colors">
                <div className="p-6 h-full flex flex-col items-start text-left">
                  <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400 mb-4">
                    <Briefcase size={24} />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-foreground">Career Signal</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">Live index of AI roles. Filter by remote status, tech stack, and salary ranges.</p>
                </div>
              </SpotlightCard>
            </Link>

            <Link to="/updates" className="block h-full">
              <SpotlightCard className="h-full hover:border-purple-500/50 transition-colors">
                <div className="p-6 h-full flex flex-col items-start text-left">
                  <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400 mb-4">
                    <Newspaper size={24} />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-foreground">Pulse News</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">Real-time headlines aggregated from top tech sources. No clickbait permitted.</p>
                </div>
              </SpotlightCard>
            </Link>

            <Link to="/tools" className="block h-full">
              <SpotlightCard className="h-full hover:border-orange-500/50 transition-colors">
                <div className="p-6 h-full flex flex-col items-start text-left">
                  <div className="p-3 rounded-lg bg-orange-500/10 text-orange-400 mb-4">
                    <Wrench size={24} />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-foreground">Toolbox & MCP</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">Directory of agentic tools and Model Context Protocol servers for developers.</p>
                </div>
              </SpotlightCard>
            </Link>

          </motion.div>

          {/* Scroll CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-24 flex justify-center"
          >
            <Button variant="ghost" onClick={scrollToContent} className="text-muted-foreground/50 hover:text-primary animate-bounce">
              <ChevronDown size={24} />
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
          {/* Main Header */}
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold border-l-4 border-primary pl-4">
              Featured Content 🌟
            </h2>
          </div>

          <FeaturedBlogs />

          {/* ECOSYSTEM GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">

            {/* 1. AI DECODED */}
            <Link to={DECODED_TOPICS[0].link} className="group relative overflow-hidden rounded-xl border border-white/10 bg-card/30 backdrop-blur-md hover:border-indigo-500/50 hover:shadow-2xl transition-all duration-300 flex flex-col">
              <div className={`absolute inset-0 bg-gradient-to-br ${DECODED_TOPICS[0].color} opacity-0 group-hover:opacity-10 transition-opacity`} />
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="outline" className="border-indigo-500/30 text-indigo-400">AI Decoded</Badge>
                  <span className="text-2xl">{DECODED_TOPICS[0].icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-400 transition-colors">{DECODED_TOPICS[0].title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">{DECODED_TOPICS[0].shortDescription}</p>
              </div>
            </Link>

            {/* 2. YOUNG MINDS */}
            <Link to="/young-minds" className="group relative overflow-hidden rounded-xl border border-white/10 bg-card/30 backdrop-blur-md hover:border-yellow-500/50 hover:shadow-2xl transition-all duration-300 flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="outline" className="border-yellow-500/30 text-yellow-400">Young Minds</Badge>
                  <Bot className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-400 transition-colors">Start the Adventure! 🚀</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">Join Newton, Ada, and Turing in the Time-Travel Lab.</p>
              </div>
            </Link>

            {/* 3. RESEARCH */}
            <Link to={`/research?q=${encodeURIComponent(FALLBACK_PAPERS[0].title)}`} className="group relative overflow-hidden rounded-xl border border-white/10 bg-card/30 backdrop-blur-md hover:border-blue-500/50 hover:shadow-2xl transition-all duration-300 flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="outline" className="border-blue-500/30 text-blue-400">Research</Badge>
                  <BookOpen className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{FALLBACK_PAPERS[0].title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">{FALLBACK_PAPERS[0].abstract}</p>
              </div>
            </Link>

            {/* 4. TOOLS */}
            <Link to={`/tools?q=${encodeURIComponent(toolsData.find(t => t.isNew)?.name || toolsData[0].name)}`} className="group relative overflow-hidden rounded-xl border border-white/10 bg-card/30 backdrop-blur-md hover:border-emerald-500/50 hover:shadow-2xl transition-all duration-300 flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">New Tool</Badge>
                  <Wrench className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">{toolsData.find(t => t.isNew)?.name || toolsData[0].name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">{toolsData.find(t => t.isNew)?.description || toolsData[0].description}</p>
              </div>
            </Link>

            {/* 5. LEARNING */}
            <Link to={`/learning?q=${encodeURIComponent(FALLBACK_LEARNING[0].title)}`} className="group relative overflow-hidden rounded-xl border border-white/10 bg-card/30 backdrop-blur-md hover:border-pink-500/50 hover:shadow-2xl transition-all duration-300 flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="outline" className="border-pink-500/30 text-pink-400">Learning</Badge>
                  <GraduationCap className="w-6 h-6 text-pink-400" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-pink-400 transition-colors">{FALLBACK_LEARNING[0].title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">Master AI with this top-rated course.</p>
              </div>
            </Link>

            {/* 6. VIDEOS */}
            <Link to="/videos?q=ColdFusion" className="group relative overflow-hidden rounded-xl border border-white/10 bg-card/30 backdrop-blur-md hover:border-red-500/50 hover:shadow-2xl transition-all duration-300 flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="outline" className="border-red-500/30 text-red-500">Video</Badge>
                  <Video className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-red-500 transition-colors">Latest from ColdFusion</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">Watch the newest deep dive into technology and AI.</p>
              </div>
            </Link>

          </div>
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
