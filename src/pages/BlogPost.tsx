import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Tag, Clock } from 'lucide-react';
import { loadBlogPost, formatDate } from '@/lib/config';
import { BlogPost } from '@/types/config';
import Comments from '@/components/Comments';
import { NeuralBackground } from '@/components/NeuralBackground';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import ShareButtons from '@/components/ShareButtons';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    loadBlogPost(slug)
      .then(setPost)
      .finally(() => setLoading(false));
  }, [slug]);

  // Estimate reading time (roughly 200 words per minute)
  const getReadingTime = (content: string) => {
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / 200);
    return `${minutes} min read`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <NeuralBackground />
        <Navigation />
        <main className="relative pt-24 pb-16">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto animate-pulse">
              <div className="h-8 bg-muted rounded w-1/4 mb-4" />
              <div className="h-12 bg-muted rounded w-3/4 mb-6" />
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="h-4 bg-muted rounded w-full" />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <NeuralBackground />
        <Navigation />
        <main className="relative pt-24 pb-16">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The blog post you're looking for doesn't exist.
            </p>
            <Button asChild variant="default">
              <Link to="/blog">
                <ArrowLeft size={16} className="mr-2" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NeuralBackground />
      <Navigation />

      <main className="relative pt-24 pb-16">
        <article className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-card/30 backdrop-blur-md rounded-2xl border border-white/10 p-8 md:p-12 shadow-2xl relative overflow-hidden">
            {/* Ambient Background Glow inside card */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 opacity-50 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10 opacity-50 pointer-events-none" />

            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft size={16} />
                Back to all posts
              </Link>
            </motion.div>

            {/* Header */}
            <motion.header
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm font-medium tracking-wide text-muted-foreground">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20">
                  <Calendar size={14} />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                  <Clock size={14} />
                  {getReadingTime(post.content)}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 leading-tight font-heading text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 drop-shadow-sm">
                {post.title}
              </h1>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-4 py-1.5 rounded-md bg-muted/50 text-foreground/80 text-sm font-medium border border-white/5 hover:border-primary/30 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.header>

            {/* Share Buttons (Top) */}
            <div className="mb-10">
              <ShareButtons title={post.title} />
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Share Buttons (Bottom) */}
            <div className="mt-16">
              <ShareButtons title={post.title} />
            </div>

            {/* Comments */}
            <div className="mt-16 pt-10 border-t border-white/5">
              <Comments />
            </div>

            {/* Footer */}
            <motion.footer
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-16 pt-8 border-t border-white/5"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-muted-foreground text-sm">
                  Thanks for reading! Feel free to share your thoughts.
                </p>
                <Button asChild variant="outline" className="border-white/10 hover:bg-white/5">
                  <Link to="/blog">
                    <ArrowLeft size={16} className="mr-2" />
                    More Posts
                  </Link>
                </Button>
              </div>
            </motion.footer>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
