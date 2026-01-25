import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { ChevronDown, BookOpen, Wrench, Newspaper, Zap, Bot, GraduationCap, Video, ArrowRight, Calendar, Sparkles, Briefcase } from 'lucide-react';
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
import { BookmarkUplink } from '@/components/BookmarkUplink';
import { ReactNode, MouseEvent, useState, useEffect, useMemo } from 'react';
import { loadBlogPosts, formatDate } from '@/lib/config';
import { BlogPostMeta } from '@/types/config';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Spotlight } from '@/components/ui/spotlight';
import { TextReveal } from '@/components/ui/text-reveal';
import { BorderBeam } from '@/components/ui/border-beam';
import { TiltCard } from '@/components/ui/tilt-card';
import { Meteors } from '@/components/ui/meteors';
import { SEO } from '@/components/SEO';

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

// Creative Decoder Text Component (Legacy - kept if needed, but using new TextReveal)
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

// Pseudo-random number generator for daily seeding
const getDailyIndex = (length: number, seedSuffix: string) => {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const seed = today + seedSuffix;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash) % length;
};

export default function Home() {
  const [blogPosts, setBlogPosts] = useState<BlogPostMeta[]>([]);

  useEffect(() => {
    loadBlogPosts().then(posts => setBlogPosts(posts));
  }, []);

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' });
  };

  // Construct the 9-item grid
  const dailyGridContent = useMemo(() => {
    const items = [];

    // 1. Three Blog Posts (First 3 for now, or random 3?)
    const blogCount = blogPosts.length;
    if (blogCount > 0) {
      // Use daily seed to rotate which blogs are shown if we have many
      const index1 = getDailyIndex(blogCount, 'blog1');
      const index2 = (index1 + 1) % blogCount;
      const index3 = (index1 + 2) % blogCount;

      const post1 = blogPosts[index1];
      const post2 = blogCount > 1 ? blogPosts[index2] : null;
      const post3 = blogCount > 2 ? blogPosts[index3] : null;

      if (post1) items.push({ type: 'blog', data: post1 });
      if (post2) items.push({ type: 'blog', data: post2 });
      if (post3) items.push({ type: 'blog', data: post3 });
    }

    // 2. AI Decoded
    const decodedIdx = getDailyIndex(DECODED_TOPICS.length, 'decoded');
    items.push({ type: 'decoded', data: DECODED_TOPICS[decodedIdx] });

    // 3. Young Minds (Always included)
    items.push({ type: 'young-minds', data: null });

    // 4. Research
    const paperIdx = getDailyIndex(FALLBACK_PAPERS.length, 'research');
    items.push({ type: 'research', data: FALLBACK_PAPERS[paperIdx] });

    // 5. Tool
    const toolIdx = getDailyIndex(toolsData.length, 'tool');
    items.push({ type: 'tool', data: toolsData[toolIdx] });

    // 6. Learning
    const learnIdx = getDailyIndex(FALLBACK_LEARNING.length, 'learning');
    items.push({ type: 'learning', data: FALLBACK_LEARNING[learnIdx] });

    // 7. Video (Static for now, but position rotates)
    items.push({ type: 'video', data: null });

    // Fill to 9 if needed
    while (items.length < 9) {
      const extraToolIdx = getDailyIndex(toolsData.length, 'tool' + items.length);
      items.push({ type: 'tool', data: toolsData[extraToolIdx] });
    }

    // Shuffle maintain daily order
    return items.sort((a, b) => {
      const seedA = a.type + (a.data?.id || '0');
      const seedB = b.type + (b.data?.id || '0');
      return getDailyIndex(100, seedA) - getDailyIndex(100, seedB);
    });

  }, [blogPosts]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="WhatsGoingOnAI - Your Daily AI Hub"
        description="Stay ahead with curated AI research papers, discover the latest AI tools & MCP servers, catch breaking news, and level up with hand-picked learning resources."
        url="/"
      />
      <NeuralBackground />
      <Navigation />

      {/* ✨ TRENDING STICKER BANNER - Styled like Research Ticker */}
      <div className="fixed top-16 md:top-[4.5rem] lg:top-[4.5rem] left-0 right-0 z-40 bg-black/40 border-b border-white/10 overflow-hidden h-10 md:h-12 flex items-center">
        {/* Fixed Label */}
        <div className="absolute left-0 z-20 bg-background/95 backdrop-blur px-3 md:px-4 h-full flex items-center border-r border-white/10 text-xs font-bold text-primary shrink-0 uppercase tracking-wider shadow-[10px_0_20px_-5px_rgba(0,0,0,0.5)]">
          <div className="w-2 h-2 rounded-full mr-2 md:mr-3 bg-primary animate-pulse shadow-[0_0_10px_currentColor]"></div>
          <span className="hidden sm:inline">Trending</span>
          <span className="sm:hidden">Hot</span>
        </div>

        {/* Scrolling Content */}
        <div className="flex animate-marquee items-center hover:[animation-play-state:paused] ml-[80px] sm:ml-[100px] md:ml-[120px]">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-6 md:gap-10 mx-6 md:mx-10">
              <Link to="/agentic-ai/anthropic-skills" className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:scale-105 transition-all duration-300 group">
                <span className="text-xs uppercase whitespace-nowrap font-bold text-primary group-hover:text-primary/80">
                  Claude Agent Skills
                </span>
              </Link>
              <Link to="/trending/context-graphs" className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:scale-105 transition-all duration-300 group">
                <span className="text-xs uppercase whitespace-nowrap font-bold text-purple-400 group-hover:text-purple-300">
                  Decision Traces
                </span>
              </Link>
              <Link to="/trending/agentic-crafting" className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:scale-105 transition-all duration-300 group">
                <span className="text-xs uppercase whitespace-nowrap font-bold text-rose-400 group-hover:text-rose-300">
                  Agentic Crafting
                </span>
              </Link>
              <Link to="/trending/nemotron-cascade" className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:scale-105 transition-all duration-300 group">
                <span className="text-xs uppercase whitespace-nowrap font-bold text-emerald-400 group-hover:text-emerald-300">
                  Cascade RL
                </span>
              </Link>
              <Link to="/trending/geometry-of-reason" className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:scale-105 transition-all duration-300 group">
                <span className="text-xs uppercase whitespace-nowrap font-bold text-cyan-400 group-hover:text-cyan-300">
                  Geometry of Reason
                </span>
              </Link>
              <Link to="/trending/nvidia-rubin" className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:scale-105 transition-all duration-300 group">
                <span className="text-xs uppercase whitespace-nowrap font-bold text-green-400 group-hover:text-green-300">
                  NVIDIA Rubin
                </span>
              </Link>
              <Link to="/robotics/boston-dynamics-deepmind" className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:scale-105 transition-all duration-300 group">
                <span className="text-xs uppercase whitespace-nowrap font-bold text-teal-400 group-hover:text-teal-300">
                  Atlas × DeepMind
                </span>
              </Link>
              <Link to="/trending/nvidia-alpamayo" className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:scale-105 transition-all duration-300 group">
                <span className="text-xs uppercase whitespace-nowrap font-bold text-lime-400 group-hover:text-lime-300">
                  Alpamayo
                </span>
              </Link>
              <Link to="/trending" className="inline-flex items-center px-3 py-1 rounded-full border border-primary/30 bg-primary/10 hover:bg-primary/20 hover:scale-105 transition-all duration-300 group">
                <span className="text-xs uppercase whitespace-nowrap font-bold text-primary group-hover:text-primary/80">
                  Explore All →
                </span>
              </Link>
              <Link to="/trending/personaplex" className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:scale-105 transition-all duration-300 group">
                <span className="text-xs uppercase whitespace-nowrap font-bold text-green-400 group-hover:text-green-300">
                  NVIDIA PersonaPlex
                </span>
              </Link>
            </div>
          ))}
        </div>

        {/* Fade overlay on right */}
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      </div>

      {/* HERO SECTION */}
      <section className="relative pt-28 md:pt-44 pb-12 md:pb-20 lg:pt-56 lg:pb-32 container mx-auto px-4 md:px-6 overflow-hidden min-h-[80vh] md:min-h-screen flex flex-col justify-center">

        {/* Radar Scan Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20 select-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary/20 rounded-full animate-ping-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/10 rounded-full" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-scan" />
        </div>

        {/* PHASE 3: Meteors */}
        <Meteors number={20} />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto text-center z-10 relative"
        >
          {/* BRAND SIGNAL */}
          <motion.div variants={itemVariants} className="flex flex-col items-center justify-center mb-6 md:mb-10 min-h-[60px] md:min-h-[80px]">

            {/* Decorative Signal Lines - Hidden on mobile */}
            <div className="hidden sm:flex items-center gap-4 mb-4 opacity-50">
              <div className="h-px w-12 bg-gradient-to-l from-primary to-transparent" />
              <div className="text-[10px] tracking-[0.3em] font-mono text-primary/80 uppercase">Incoming Signal</div>
              <div className="h-px w-12 bg-gradient-to-r from-primary to-transparent" />
            </div>

            {/* The Brand */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <h2 className="relative text-2xl sm:text-4xl md:text-6xl font-black tracking-tight text-white select-none normal-case">
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
          <motion.h1 variants={itemVariants} className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-4 md:mb-6 leading-[1.1]">
            <span className="text-white" style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(to bottom right, white, hsl(180 100% 45% / 0.5), transparent)' }}>
              <TextReveal text="Your Daily AI HUB" delay={0.5} />
            </span>
          </motion.h1>

          {/* VALUE PROPOSITION */}
          <motion.p variants={itemVariants} className="text-sm sm:text-base md:text-xl text-muted-foreground max-w-3xl mx-auto mb-3 md:mb-4 leading-relaxed px-2">
            Stay ahead with <span className="text-primary font-semibold">curated research papers</span>,
            discover the <span className="text-emerald-400 font-semibold">latest AI tools & MCP servers</span>,
            catch the <span className="text-purple-400 font-semibold">latest news</span>, and
            level up with <span className="text-pink-400 font-semibold">hand-picked learning resources</span>.
          </motion.p>

          <motion.p variants={itemVariants} className="hidden sm:block text-sm md:text-base text-muted-foreground/70 max-w-2xl mx-auto mb-6 md:mb-8">
            Everything you need to navigate the AI landscape — aggregated, filtered, and updated daily.
          </motion.p>

          {/* SIGNAL UPLINK (BOOKMARK) */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8 md:mb-12">
            <BookmarkUplink />
          </motion.div>

          {/* TICKER - Hidden on mobile */}
          <motion.div variants={itemVariants} className="hidden md:block w-full max-w-2xl mx-auto mb-16 opacity-80">
            <Ticker />
          </motion.div>

          {/* BENTO GRID (Mission Visualization) */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 max-w-7xl mx-auto">

            <Link to="/research" className="block h-full group">
              <TiltCard className="h-full" rotationFactor={20}>
                <Spotlight className="h-full hover:border-blue-500/50 transition-colors">
                  <div className="p-4 md:p-6 h-full flex flex-col items-start text-left relative z-20">
                    <div className="p-2 md:p-3 rounded-lg bg-blue-500/10 text-blue-400 mb-2 md:mb-4">
                      <BookOpen size={20} className="md:w-6 md:h-6" />
                    </div>
                    <h3 className="text-sm md:text-lg font-bold mb-1 md:mb-2 text-foreground">Deep Research</h3>
                    <p className="hidden sm:block text-xs text-muted-foreground leading-relaxed">Daily feed of ArXiv papers selected for impact.</p>
                  </div>
                  <BorderBeam size={150} duration={10} delay={0} borderWidth={1.5} colorFrom="#3b82f6" colorTo="#6366f1" />
                </Spotlight>
              </TiltCard>
            </Link>

            <Link to="/jobs" className="block h-full group">
              <TiltCard className="h-full" rotationFactor={20}>
                <Spotlight className="h-full hover:border-emerald-500/50 transition-colors">
                  <div className="p-4 md:p-6 h-full flex flex-col items-start text-left relative z-20">
                    <div className="p-2 md:p-3 rounded-lg bg-emerald-500/10 text-emerald-400 mb-2 md:mb-4">
                      <Briefcase size={20} className="md:w-6 md:h-6" />
                    </div>
                    <h3 className="text-sm md:text-lg font-bold mb-1 md:mb-2 text-foreground">Career Signal</h3>
                    <p className="hidden sm:block text-xs text-muted-foreground leading-relaxed">Live index of AI roles, remote status, salary.</p>
                  </div>
                  <BorderBeam size={150} duration={10} delay={3} borderWidth={1.5} colorFrom="#10b981" colorTo="#34d399" />
                </Spotlight>
              </TiltCard>
            </Link>

            <Link to="/updates" className="block h-full group">
              <TiltCard className="h-full" rotationFactor={20}>
                <Spotlight className="h-full hover:border-purple-500/50 transition-colors">
                  <div className="p-4 md:p-6 h-full flex flex-col items-start text-left relative z-20">
                    <div className="p-2 md:p-3 rounded-lg bg-purple-500/10 text-purple-400 mb-2 md:mb-4">
                      <Newspaper size={20} className="md:w-6 md:h-6" />
                    </div>
                    <h3 className="text-sm md:text-lg font-bold mb-1 md:mb-2 text-foreground">Pulse News</h3>
                    <p className="hidden sm:block text-xs text-muted-foreground leading-relaxed">Real-time headlines, no clickbait.</p>
                  </div>
                  <BorderBeam size={150} duration={10} delay={6} borderWidth={1.5} colorFrom="#a855f7" colorTo="#d946ef" />
                </Spotlight>
              </TiltCard>
            </Link>

            <Link to="/tools" className="block h-full group">
              <TiltCard className="h-full" rotationFactor={20}>
                <Spotlight className="h-full hover:border-orange-500/50 transition-colors">
                  <div className="p-4 md:p-6 h-full flex flex-col items-start text-left relative z-20">
                    <div className="p-2 md:p-3 rounded-lg bg-orange-500/10 text-orange-400 mb-2 md:mb-4">
                      <Wrench size={20} className="md:w-6 md:h-6" />
                    </div>
                    <h3 className="text-sm md:text-lg font-bold mb-1 md:mb-2 text-foreground">Toolbox</h3>
                    <p className="hidden sm:block text-xs text-muted-foreground leading-relaxed">AI tools and MCP servers.</p>
                  </div>
                  <BorderBeam size={150} duration={10} delay={9} borderWidth={1.5} colorFrom="#f97316" colorTo="#fbbf24" />
                </Spotlight>
              </TiltCard>
            </Link>

            <Link to="/skills" className="block h-full group col-span-2 sm:col-span-1">
              <TiltCard className="h-full" rotationFactor={20}>
                <Spotlight className="h-full hover:border-cyan-500/50 transition-colors">
                  <div className="p-4 md:p-6 h-full flex flex-col items-start text-left relative z-20">
                    <div className="p-2 md:p-3 rounded-lg bg-cyan-500/10 text-cyan-400 mb-2 md:mb-4">
                      <Sparkles size={20} className="md:w-6 md:h-6" />
                    </div>
                    <h3 className="text-sm md:text-lg font-bold mb-1 md:mb-2 text-foreground">Claude Skills</h3>
                    <p className="hidden sm:block text-xs text-muted-foreground leading-relaxed">90+ agent skills across 12 categories.</p>
                  </div>
                  <BorderBeam size={150} duration={10} delay={12} borderWidth={1.5} colorFrom="#06b6d4" colorTo="#22d3ee" />
                </Spotlight>
              </TiltCard>
            </Link>

          </motion.div>

          {/* Scroll CTA - Hidden on mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="hidden md:flex mt-16 md:mt-24 justify-center"
          >
            <Button variant="ghost" onClick={scrollToContent} className="text-muted-foreground/50 hover:text-primary animate-bounce">
              <ChevronDown size={24} />
            </Button>
          </motion.div>

        </motion.div>
      </section>

      {/* FEATURED CONTENT (9-Grid Mixed) */}
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
              Featured Content
            </h2>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {dailyGridContent.map((item, index) => {
              // Render based on type
              if (item.type === 'blog' && item.data) {
                const post = item.data as BlogPostMeta;
                return (
                  <Spotlight key={`blog-${index}`} className="flex flex-col border-white/10 bg-card/30 backdrop-blur-md hover:border-primary/50 transition-all duration-300">
                    <Card className="bg-transparent border-none flex-grow flex flex-col shadow-none relative z-20">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {formatDate(post.date)}
                        </div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors leading-snug">
                          <Link to={`/blog/${post.slug}`} className="hover:underline decoration-primary">
                            {post.title}
                          </Link>
                        </CardTitle>
                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {post.tags.slice(0, 2).map((tag: string) => (
                              <Badge key={tag} variant="secondary" className="text-[10px] bg-primary/10 text-primary border-primary/20">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardHeader>
                      <CardContent className="pb-3 flex-grow">
                        <p className="text-muted-foreground text-sm line-clamp-3">
                          {post.description}
                        </p>
                      </CardContent>
                      <CardFooter className="pt-3 border-t border-white/5 mt-auto">
                        <Button variant="ghost" size="sm" className="w-full gap-2 text-primary/80 hover:text-primary group/btn" asChild>
                          <Link to={`/blog/${post.slug}`}>
                            Read Article <ArrowRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                    {/* Only add border beam to the first item for performance/emphasis */}
                    {index === 0 && <BorderBeam size={300} duration={15} delay={0} borderWidth={1} />}
                  </Spotlight>
                );
              }

              if (item.type === 'decoded' && item.data) {
                const data = item.data;
                return (
                  <Link key={`decoded-${index}`} to={data.link} className="block h-full group">
                    <Spotlight className="h-full border-white/10 bg-card/30 backdrop-blur-md hover:border-indigo-500/50 transition-all duration-300">
                      <div className={`absolute inset-0 bg-gradient-to-br ${data.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                      <div className="p-6 flex-grow relative z-20">
                        <div className="flex justify-between items-start mb-4">
                          <Badge variant="outline" className="border-indigo-500/30 text-indigo-400">AI Decoded</Badge>
                          <span className="text-2xl">{data.icon}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-400 transition-colors">{data.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-3">{data.shortDescription}</p>
                      </div>
                    </Spotlight>
                  </Link>
                );
              }

              if (item.type === 'young-minds') {
                return (
                  <Link key={`ym-${index}`} to="/young-minds" className="block h-full group">
                    <Spotlight className="h-full border-white/10 bg-card/30 backdrop-blur-md hover:border-yellow-500/50 transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="p-6 flex-grow relative z-20">
                        <div className="flex justify-between items-start mb-4">
                          <Badge variant="outline" className="border-yellow-500/30 text-yellow-400">Young Minds</Badge>
                          <Bot className="w-6 h-6 text-yellow-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-400 transition-colors">Start the Adventure! 🚀</h3>
                        <p className="text-sm text-muted-foreground line-clamp-3">Join Newton, Ada, and Turing in the Time-Travel Lab.</p>
                      </div>
                    </Spotlight>
                  </Link>
                );
              }

              if (item.type === 'research' && item.data) {
                const data = item.data;
                return (
                  <Link key={`research-${index}`} to={`/research?q=${encodeURIComponent(data.title)}`} className="block h-full group">
                    <Spotlight className="h-full border-white/10 bg-card/30 backdrop-blur-md hover:border-blue-500/50 transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="p-6 flex-grow relative z-20">
                        <div className="flex justify-between items-start mb-4">
                          <Badge variant="outline" className="border-blue-500/30 text-blue-400">Research</Badge>
                          <BookOpen className="w-6 h-6 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{data.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-3">{data.abstract}</p>
                      </div>
                    </Spotlight>
                  </Link>
                );
              }

              if (item.type === 'tool' && item.data) {
                const data = item.data;
                return (
                  <Link key={`tool-${index}`} to={`/tools?q=${encodeURIComponent(data.name)}`} className="block h-full group">
                    <Spotlight className="h-full border-white/10 bg-card/30 backdrop-blur-md hover:border-emerald-500/50 transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="p-6 flex-grow relative z-20">
                        <div className="flex justify-between items-start mb-4">
                          <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">New Tool</Badge>
                          <Wrench className="w-6 h-6 text-emerald-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">{data.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-3">{data.description}</p>
                      </div>
                    </Spotlight>
                  </Link>
                );
              }

              if (item.type === 'learning' && item.data) {
                const data = item.data;
                return (
                  <Link key={`learning-${index}`} to={`/learning?q=${encodeURIComponent(data.title)}`} className="block h-full group">
                    <Spotlight className="h-full border-white/10 bg-card/30 backdrop-blur-md hover:border-pink-500/50 transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="p-6 flex-grow relative z-20">
                        <div className="flex justify-between items-start mb-4">
                          <Badge variant="outline" className="border-pink-500/30 text-pink-400">Learning</Badge>
                          <GraduationCap className="w-6 h-6 text-pink-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-pink-400 transition-colors">{data.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-3">Master AI with this top-rated course.</p>
                      </div>
                    </Spotlight>
                  </Link>
                );
              }

              if (item.type === 'video') {
                return (
                  <Link key={`video-${index}`} to="/videos?q=ColdFusion" className="block h-full group">
                    <Spotlight className="h-full border-white/10 bg-card/30 backdrop-blur-md hover:border-red-500/50 transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="p-6 flex-grow relative z-20">
                        <div className="flex justify-between items-start mb-4">
                          <Badge variant="outline" className="border-red-500/30 text-red-500">Video</Badge>
                          <Video className="w-6 h-6 text-red-500" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-red-500 transition-colors">Latest from ColdFusion</h3>
                        <p className="text-sm text-muted-foreground line-clamp-3">Watch the newest deep dive into technology and AI.</p>
                      </div>
                    </Spotlight>
                  </Link>
                );
              }

              return null;
            })}

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
