import { SiteConfig, BlogPost, BlogPostMeta } from '@/types/config';
import { marked } from 'marked';

let cachedConfig: SiteConfig | null = null;

export async function loadConfig(): Promise<SiteConfig> {
  if (cachedConfig) return cachedConfig;
  
  try {
    const response = await fetch('/config.json');
    if (!response.ok) throw new Error('Failed to load config');
    cachedConfig = await response.json();
    return cachedConfig!;
  } catch (error) {
    console.error('Error loading config:', error);
    throw error;
  }
}

// Parse frontmatter from markdown content
function parseFrontmatter(content: string): { meta: Record<string, any>; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { meta: {}, content };
  }

  const frontmatterStr = match[1];
  const markdownContent = match[2];
  
  const meta: Record<string, any> = {};
  const lines = frontmatterStr.split('\n');
  
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;
    
    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();
    
    // Handle arrays like [tag1, tag2]
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1);
      meta[key] = value.split(',').map(v => v.trim());
    } else {
      meta[key] = value;
    }
  }
  
  return { meta, content: markdownContent };
}

// List of available posts (add your post slugs here)
const availablePosts: string[] = [
  'unconventional-ai-a-new-paradigm-of-ai-computing-hardware-chip',];

export async function loadBlogPosts(): Promise<BlogPostMeta[]> {
  const posts: BlogPostMeta[] = [];
  
  for (const slug of availablePosts) {
    try {
      const response = await fetch(`/posts/${slug}.md`);
      if (!response.ok) continue;
      
      const text = await response.text();
      const { meta } = parseFrontmatter(text);
      
      posts.push({
        slug,
        title: meta.title || slug,
        date: meta.date || '',
        description: meta.description || '',
        tags: meta.tags || []
      });
    } catch (error) {
      console.error(`Error loading post ${slug}:`, error);
    }
  }
  
  // Sort by date, newest first
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function loadBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(`/posts/${slug}.md`);
    if (!response.ok) return null;
    
    const text = await response.text();
    const { meta, content } = parseFrontmatter(text);
    
    // Configure marked for better code highlighting
    marked.setOptions({
      gfm: true,
      breaks: true
    });
    
    const htmlContent = await marked(content);
    
    return {
      slug,
      title: meta.title || slug,
      date: meta.date || '',
      description: meta.description || '',
      tags: meta.tags || [],
      content: htmlContent
    };
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    return null;
  }
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
