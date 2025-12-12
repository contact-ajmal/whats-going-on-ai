import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { NeuralBackground } from '@/components/NeuralBackground';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { NewsFeed } from '@/components/NewsFeed';
import { FeaturedBlogs } from '@/components/FeaturedBlogs';

const socialLinks = [
  { icon: Linkedin, href: 'https://linkedin.com/in/ajmalnazirbaba', label: 'LinkedIn' },
];

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

export default function Home() {
  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <NeuralBackground />
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 container mx-auto px-6 text-center"
        >
          {/* Glowing orb */}
          <motion.div
            variants={itemVariants}
            className="mx-auto mb-8 w-24 h-24 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full blur-xl opacity-50 animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-primary to-secondary rounded-full" />
            <div className="absolute inset-4 bg-background rounded-full flex items-center justify-center overflow-hidden">
              <span className="text-3xl font-bold text-gradient">AI</span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold font-heading mb-6 tracking-tight"
          >
            <span className="text-foreground">WhatsGoingOn</span>
            <span className="text-gradient">AI</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl text-muted-foreground font-medium mb-8 max-w-2xl mx-auto"
          >
            A curated feed of the latest breakthroughs, and deep dives into the future of technology.
          </motion.p>

          {/* Author Byline */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-2 mb-10 text-sm font-medium text-primary/80"
          >
            <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
              Curated by Ajmal Baba
            </span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild variant="hero" size="lg">
              <Link to="/blog">
                Read Articles
                <ArrowRight size={18} />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/about">
                About The Author
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronDown size={32} />
        </motion.button>
      </section>

      {/* Featured Articles Section */}
      <section className="py-16 px-6 container mx-auto border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold border-l-4 border-primary pl-4">
              Featured Articles
            </h2>
            <Link to="/blog" className="text-primary hover:text-accent flex items-center gap-2 text-sm font-medium">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <FeaturedBlogs />
        </motion.div>
      </section>

      {/* News Feed Section */}
      <section className="py-16 px-6 container mx-auto bg-black/20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-10">
            <h2 className="text-3xl font-bold border-l-4 border-secondary pl-4 mb-2">
              AI News
            </h2>
            <p className="text-muted-foreground ml-5">Real-time news from around the AI web.</p>
          </div>
          <NewsFeed />
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
