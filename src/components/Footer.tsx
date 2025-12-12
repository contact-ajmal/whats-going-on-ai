import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { NewsletterSignup } from './NewsletterSignup';
import { BuyCoffeeButton } from './BuyCoffeeButton';

const socialLinks = [
  { icon: Github, href: 'https://github.com/yourusername', label: 'GitHub' },
  { icon: Twitter, href: 'https://twitter.com/yourusername', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:your@email.com', label: 'Email' },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-24 border-t border-border/50 bg-card/30 backdrop-blur-sm">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-5" />

      <div className="container relative mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-primary to-secondary" />
              <span className="font-semibold text-foreground">
                WhatsGoingOn<span className="text-primary">AI</span>
              </span>
            </div>
            <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
              Exploring the frontiers of Artificial Intelligence, Machine Learning, and Software Engineering.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-foreground">Navigation</h3>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">Home</Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">About</Link>
              <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors text-sm">Blog</Link>
              <Link to="/updates" className="text-muted-foreground hover:text-primary transition-colors text-sm">AI News</Link>
            </div>
          </div>

          {/* Socials & Newsletter */}
          <div className="flex flex-col gap-6 w-full max-w-sm">
            <h3 className="font-semibold text-foreground">Stay Updated</h3>
            <NewsletterSignup variant="minimal" />
            <p className="text-xs text-muted-foreground">
              Subscribe to get the latest AI research and updates delivered to your inbox.
            </p>
            <div className="pt-2">
              <p className="text-xs font-medium text-muted-foreground mb-2">Support the Project</p>
              <BuyCoffeeButton className="h-8 text-xs w-full" />
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary/10 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} WhatsGoingOnAI.
          </p>
        </div>
      </div>
    </footer>
  );
}
