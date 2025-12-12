import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SearchDialog } from '@/components/SearchDialog';
import { Button } from '@/components/ui/button';
import { LibraryDrawer } from '@/components/LibraryDrawer';
import { VisitorHUD } from '@/components/VisitorHUD';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/blog', label: 'Blog' },
  { path: '/updates', label: 'Latest Updates' },
  { path: '/research', label: 'Research' },
  { path: '/videos', label: 'Videos' },
  { path: '/compass', label: 'Compass' },
  { path: '/tools', label: 'Tools' },
  { path: '/history', label: 'History' },
  { path: '/about', label: 'About' },
];

export function Navigation() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="group flex items-center gap-2">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-primary/20 rounded-lg animate-glow-pulse" />
                <div className="absolute inset-1 bg-gradient-to-br from-primary to-secondary rounded-md" />
                <span className="absolute inset-0 flex items-center justify-center text-primary-foreground font-bold text-sm">
                  W
                </span>
              </div>
              <span className="hidden sm:block text-foreground font-bold text-lg group-hover:text-primary transition-colors">
                WhatsGoingOn<span className="text-primary">AI</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-1">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`relative px-4 py-2 text-sm font-medium transition-colors ${isActive
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-foreground'
                        }`}
                    >
                      {link.label}
                      {isActive && (
                        <motion.div
                          layoutId="nav-indicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary glow-cyan"
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 pl-4 border-l border-border/50">
                <VisitorHUD />
                <LibraryDrawer />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchOpen(true)}
                  title="Search"
                  className="w-9 h-9"
                >
                  <Search className="h-[1.2rem] w-[1.2rem]" />
                </Button>
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                className="w-9 h-9"
              >
                <Search className="h-[1.2rem] w-[1.2rem]" />
              </Button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                title="Menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 border-t border-border/50"
            >
              <div className="flex flex-col gap-2 pt-4">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                        ? 'text-primary bg-primary/10 border border-primary/30'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <div className="px-4 py-3 flex items-center justify-between border-t border-border/50 mt-2">
                  <span className="text-sm font-medium text-muted-foreground">Appearance</span>
                  <ThemeToggle />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>
    </>
  );
}
