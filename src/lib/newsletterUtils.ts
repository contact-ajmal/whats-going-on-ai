import { TRENDING_TOPICS } from '@/data/trendingTech';
import { AGENTIC_TOPICS } from '@/data/agenticData';
import { FALLBACK_PAPERS } from '@/data/fallbackResearch';
import { FALLBACK_JOBS } from '@/data/fallbackJobs';
import { FALLBACK_LEARNING } from '@/data/fallbackLearning';
import { toolsData } from '@/data/toolsData';
import { DECODED_TOPICS } from '@/data/aiDecoded';
import { DEEPMIND_CONTENT } from '@/data/deepMindData';
import { ROBOTICS_TOPICS } from '@/data/roboticsData';
import { CLAUDE_SKILLS } from '@/data/claudeSkills';
import { timelineData } from '@/data/timelineData';
import { loadBlogPosts } from '@/lib/config';

// Default date for content without explicit dates (today's date)
export const DEFAULT_CONTENT_DATE = '2026-01-16';

// All content source types
export type ContentSource =
    | 'trending' | 'blog' | 'agentic' | 'research'
    | 'news' | 'video' | 'jobs' | 'tools' | 'learning'
    | 'decoded' | 'deepmind' | 'robotics' | 'skills' | 'timeline';

// Section labels for UI
export const SECTION_LABELS: Record<ContentSource, string> = {
    trending: 'Trending',
    blog: 'Blog Posts',
    agentic: 'Agentic AI',
    research: 'Research Papers',
    news: 'News Feed',
    video: 'Videos',
    jobs: 'Job Listings',
    tools: 'AI Tools',
    learning: 'Learning Resources',
    decoded: 'AI Decoded',
    deepmind: 'DeepMind',
    robotics: 'Robotics',
    skills: 'Claude Skills',
    timeline: 'AI History'
};

// Common interface for all content items
export interface NewsletterContentItem {
    id: string;
    title: string;
    description: string;
    url: string;
    date: Date;
    dateGranularity: 'day' | 'month';
    source: ContentSource;
    category?: string;
    tags?: string[];
}

// YouTube Channels for Video Feed
const YOUTUBE_CHANNELS = [
    { id: 'UCg_p-Fp_b5Dq_09w6a4YwGA', name: 'Wes Roth' },
    { id: 'UCMi8qg-eB1d7kS_c7F3g_Cg', name: 'Matthew Berman' },
    { id: 'UC4QZ_LsYcvcq7qOsOhpAX4A', name: 'ColdFusion' },
    { id: 'UCXy2m-1m4jC-2uFvA5s3bBA', name: 'The AI Grid' },
    { id: 'UCbfYPyITQ-7l4upoX8nvctg', name: 'Two Minute Papers' },
    { id: 'UCNJ1Ymd5yFuUPtn21xtRbbw', name: 'AI Explained' },
    { id: 'UCP7jMXSY2xbc3KCAE0MHQ-A', name: 'Google DeepMind' },
];

// News RSS Sources
const NEWS_SOURCES = [
    { name: 'OpenAI', url: 'https://api.rss2json.com/v1/api.json?rss_url=https://openai.com/news/rss.xml' },
    { name: 'Anthropic', url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.anthropic.com/news/rss.xml' },
    { name: 'The Verge AI', url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.theverge.com/rss/ai-artificial-intelligence/index.xml' },
    { name: 'Techmeme', url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.techmeme.com/feed.xml' },
    { name: 'Hacker News', url: 'https://api.rss2json.com/v1/api.json?rss_url=https://hnrss.org/newest?q=AI' },
];

/**
 * Get the start of the newsletter day (7:00 AM)
 * Newsletter window is 7 AM to 7 AM next day
 */
export function getStartOfNewsletterDay(date: Date = new Date()): Date {
    const result = new Date(date);
    result.setHours(7, 0, 0, 0);

    // If current time is before 7 AM, use previous day's 7 AM
    if (date.getHours() < 7) {
        result.setDate(result.getDate() - 1);
    }

    return result;
}

/**
 * Get the end of the newsletter day (7:00 AM next day)
 */
export function getEndOfNewsletterDay(startDate: Date): Date {
    const result = new Date(startDate);
    result.setDate(result.getDate() + 1);
    return result;
}

/**
 * Parse a date string and return both the date and its granularity
 */
function parseFlexibleDate(dateStr: string | undefined): { date: Date; granularity: 'day' | 'month' } | null {
    if (!dateStr) return null;

    // Handle YYYY-MM format (e.g., "2026-01") - monthly granularity
    if (/^\d{4}-\d{2}$/.test(dateStr)) {
        return {
            date: new Date(`${dateStr}-01T07:00:00`),
            granularity: 'month'
        };
    }

    // Handle YYYY-MM-DD format - daily granularity
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        return {
            date: new Date(`${dateStr}T07:00:00`),
            granularity: 'day'
        };
    }

    // Handle full date strings
    const parsed = new Date(dateStr);
    if (isNaN(parsed.getTime())) return null;

    return {
        date: parsed,
        granularity: 'day' // Assume daily for full dates
    };
}

/**
 * Get the website base URL
 */
function getBaseUrl(): string {
    // For production, use the actual domain
    if (typeof window !== 'undefined') {
        return window.location.origin + (import.meta.env.BASE_URL || '/');
    }
    return 'https://whatsgoingonai.com/';
}

/**
 * Fetch news articles from RSS feeds
 */
async function fetchNewsArticles(): Promise<NewsletterContentItem[]> {
    const items: NewsletterContentItem[] = [];

    try {
        const results = await Promise.allSettled(
            NEWS_SOURCES.map(source =>
                fetch(source.url)
                    .then(res => res.json())
                    .then(data => ({ ...data, sourceName: source.name }))
            )
        );

        results.forEach(result => {
            if (result.status === 'fulfilled' && result.value?.items) {
                result.value.items.slice(0, 5).forEach((item: any) => { // Limit to 5 per source
                    const pubDate = new Date(item.pubDate);
                    if (!isNaN(pubDate.getTime())) {
                        items.push({
                            id: `news-${result.value.sourceName.toLowerCase().replace(/\s/g, '')}-${item.guid || item.link}`,
                            title: item.title,
                            description: item.description?.replace(/<[^>]*>?/gm, '').slice(0, 150) + '...' || '',
                            url: item.link,
                            date: pubDate,
                            dateGranularity: 'day',
                            source: 'news',
                            category: result.value.sourceName,
                            tags: ['ai', 'news']
                        });
                    }
                });
            }
        });
    } catch (error) {
        console.error('Failed to fetch news:', error);
    }

    return items;
}

/**
 * Fetch videos from YouTube RSS feeds
 */
async function fetchVideoContent(): Promise<NewsletterContentItem[]> {
    const items: NewsletterContentItem[] = [];

    try {
        const results = await Promise.allSettled(
            YOUTUBE_CHANNELS.map(channel =>
                fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=${channel.id}`)
                    .then(res => res.json())
                    .then(data => ({ ...data, channelName: channel.name }))
            )
        );

        results.forEach(result => {
            if (result.status === 'fulfilled' && result.value?.items) {
                result.value.items.slice(0, 3).forEach((item: any) => { // Limit to 3 per channel
                    const pubDate = new Date(item.pubDate);
                    if (!isNaN(pubDate.getTime())) {
                        items.push({
                            id: `video-${item.guid || item.link}`,
                            title: item.title,
                            description: `YouTube video from ${result.value.channelName}`,
                            url: item.link,
                            date: pubDate,
                            dateGranularity: 'day',
                            source: 'video',
                            category: result.value.channelName,
                            tags: ['video', 'youtube']
                        });
                    }
                });
            }
        });
    } catch (error) {
        console.error('Failed to fetch videos:', error);
    }

    return items;
}

/**
 * Aggregate all content from various sources and normalize to common format
 */
export async function aggregateAllContent(): Promise<NewsletterContentItem[]> {
    const items: NewsletterContentItem[] = [];
    const baseUrl = getBaseUrl();

    // 1. Trending Topics
    TRENDING_TOPICS.forEach(topic => {
        const parsed = parseFlexibleDate(topic.date);
        if (parsed) {
            items.push({
                id: `trending-${topic.id}`,
                title: topic.title,
                description: topic.shortDescription,
                url: `${baseUrl}${topic.link.startsWith('/') ? topic.link.slice(1) : topic.link}`,
                date: parsed.date,
                dateGranularity: parsed.granularity,
                source: 'trending',
                category: topic.difficulty,
                tags: topic.tags
            });
        }
    });

    // 2. Agentic AI Topics
    AGENTIC_TOPICS.forEach(topic => {
        const parsed = parseFlexibleDate(topic.date);
        if (parsed) {
            items.push({
                id: `agentic-${topic.id}`,
                title: topic.title,
                description: topic.shortDescription,
                url: `${baseUrl}${topic.link.startsWith('/') ? topic.link.slice(1) : topic.link}`,
                date: parsed.date,
                dateGranularity: parsed.granularity,
                source: 'agentic',
                category: topic.difficulty,
                tags: topic.tags
            });
        }
    });

    // 3. Research Papers (Live + Fallback)
    try {
        const liveResearch = await fetchResearchContent();
        if (liveResearch.length > 0) {
            items.push(...liveResearch);
        } else {
            // Fallback only if live fetch fails completely
            FALLBACK_PAPERS.forEach(paper => {
                items.push({
                    id: `research-${paper.id}`,
                    title: paper.title,
                    description: paper.abstract.slice(0, 150) + '...',
                    url: paper.url,
                    date: paper.publishedAt,
                    dateGranularity: 'day',
                    source: 'research',
                    category: paper.category,
                    tags: [paper.source]
                });
            });
        }
    } catch (e) {
        FALLBACK_PAPERS.forEach(paper => {
            items.push({
                id: `research-${paper.id}`,
                title: paper.title,
                description: paper.abstract.slice(0, 150) + '...',
                url: paper.url,
                date: paper.publishedAt,
                dateGranularity: 'day',
                source: 'research',
                category: paper.category,
                tags: [paper.source]
            });
        });
    }

    // 4. Blog Posts (async)
    try {
        const blogPosts = await loadBlogPosts();
        blogPosts.forEach(post => {
            const parsed = parseFlexibleDate(post.date);
            if (parsed) {
                items.push({
                    id: `blog-${post.slug}`,
                    title: post.title,
                    description: post.description,
                    url: `${baseUrl}blog/${post.slug}`,
                    date: parsed.date,
                    dateGranularity: parsed.granularity,
                    source: 'blog',
                    tags: post.tags
                });
            }
        });
    } catch (error) {
        console.error('Failed to load blog posts:', error);
    }

    // 5. Live News from RSS feeds
    try {
        const newsItems = await fetchNewsArticles();
        items.push(...newsItems);
    } catch (error) {
        console.error('Failed to fetch news:', error);
    }

    // 6. Videos from YouTube channels
    try {
        const videoItems = await fetchVideoContent();
        items.push(...videoItems);
    } catch (error) {
        console.error('Failed to fetch videos:', error);
    }

    // 7. Jobs
    FALLBACK_JOBS.forEach(job => {
        items.push({
            id: `job-${job.id}`,
            title: `${job.title} at ${job.company}`,
            description: `${job.type} • ${job.location}`,
            url: job.url,
            date: job.postedAt,
            dateGranularity: 'day',
            source: 'jobs',
            category: job.company,
            tags: job.tags
        });
    });

    // 8. Tools (use current date for tools without dates)
    const toolsDate = new Date();
    toolsData.forEach(tool => {
        items.push({
            id: `tool-${tool.id}`,
            title: tool.name,
            description: tool.description.slice(0, 150),
            url: tool.url,
            date: toolsDate,
            dateGranularity: 'month',
            source: 'tools',
            category: tool.category,
            tags: tool.tags
        });
    });

    // 9. Learning Resources
    FALLBACK_LEARNING.forEach(resource => {
        const parsed = parseFlexibleDate(resource.dateAdded);
        if (parsed) {
            items.push({
                id: `learning-${resource.id}`,
                title: resource.title,
                description: resource.description.slice(0, 150),
                url: resource.url,
                date: parsed.date,
                dateGranularity: parsed.granularity,
                source: 'learning',
                category: resource.platform,
                tags: resource.tags
            });
        }
    });

    // 10. AI Decoded Topics (use DEFAULT_CONTENT_DATE)
    const decodedDate = new Date(DEFAULT_CONTENT_DATE);
    DECODED_TOPICS.forEach(topic => {
        items.push({
            id: `decoded-${topic.id}`,
            title: topic.title,
            description: topic.shortDescription,
            url: `${baseUrl}decoded/${topic.id}`,
            date: decodedDate,
            dateGranularity: 'day',
            source: 'decoded',
            category: topic.difficulty,
            tags: topic.tags
        });
    });

    // 11. DeepMind Content (use DEFAULT_CONTENT_DATE)
    const deepmindDate = new Date(DEFAULT_CONTENT_DATE);
    DEEPMIND_CONTENT.forEach(item => {
        items.push({
            id: `deepmind-${item.id}`,
            title: item.title,
            description: item.description,
            url: item.link || `${baseUrl}deepmind/${item.id}`,
            date: deepmindDate,
            dateGranularity: 'day',
            source: 'deepmind',
            category: item.category,
            tags: item.tags
        });
    });

    // 12. Robotics Topics
    const roboticsDate = new Date(DEFAULT_CONTENT_DATE);
    ROBOTICS_TOPICS.forEach(topic => {
        items.push({
            id: `robotics-${topic.id}`,
            title: topic.title,
            description: topic.shortDescription,
            url: `${baseUrl}${topic.link}`,
            date: roboticsDate,
            dateGranularity: 'day',
            source: 'robotics',
            category: topic.difficulty,
            tags: topic.tags
        });
    });

    // 13. Claude Skills
    const skillsDate = new Date(DEFAULT_CONTENT_DATE);
    CLAUDE_SKILLS.forEach(skill => {
        items.push({
            id: `skill-${skill.name}`,
            title: skill.name,
            description: skill.description,
            url: skill.repo,
            date: skillsDate,
            dateGranularity: 'day',
            source: 'skills',
            category: skill.category,
            tags: [skill.isOfficial ? 'Official' : 'Community']
        });
    });

    // 14. AI Timeline/History
    const timelineDate = new Date(DEFAULT_CONTENT_DATE);
    timelineData.forEach(event => {
        items.push({
            id: `timeline-${event.year}-${event.title.slice(0, 20).replace(/\s/g, '-')}`,
            title: `${event.year}: ${event.title}`,
            description: event.description,
            url: `${baseUrl}history`,
            date: timelineDate,
            dateGranularity: 'day',
            source: 'timeline',
            category: event.category,
            tags: event.tags
        });
    });

    return items;
}

/**
 * Filter content by selected date
 * - Daily dates (YYYY-MM-DD) match only that specific day
 * - Monthly dates (YYYY-MM) match ANY day in that month
 */
export function filterContentByDay(
    items: NewsletterContentItem[],
    selectedDate: Date
): NewsletterContentItem[] {
    const selectedYear = selectedDate.getFullYear();
    const selectedMonth = selectedDate.getMonth();
    const selectedDay = selectedDate.getDate();

    return items.filter(item => {
        const itemYear = item.date.getFullYear();
        const itemMonth = item.date.getMonth();
        const itemDay = item.date.getDate();

        if (item.dateGranularity === 'month') {
            // Monthly content matches any day in that month
            return itemYear === selectedYear && itemMonth === selectedMonth;
        } else {
            // Daily content matches only that specific day
            return itemYear === selectedYear && itemMonth === selectedMonth && itemDay === selectedDay;
        }
    });
}

/**
 * Format newsletter for different social media platforms
 */
export function formatForPlatform(
    items: NewsletterContentItem[],
    platform: 'twitter' | 'linkedin' | 'generic',
    customIntro?: string
): string {
    if (items.length === 0) {
        return 'No new content today. Check back tomorrow! 🚀';
    }

    const date = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric'
    });

    const intro = customIntro || `🔥 What's Going On in AI - ${date}`;

    switch (platform) {
        case 'twitter':
            return formatForTwitter(items, intro);
        case 'linkedin':
            return formatForLinkedIn(items, intro);
        default:
            return formatGeneric(items, intro);
    }
}

function formatForTwitter(items: NewsletterContentItem[], intro: string): string {
    const maxItems = 3; // Keep it short for Twitter
    const selectedItems = items.slice(0, maxItems);

    let content = `${intro}\n\n`;

    selectedItems.forEach((item, index) => {
        const emoji = getSourceEmoji(item.source);
        content += `${emoji} ${item.title}\n${item.url}\n\n`;
    });

    content += `More at whatsgoingonai.com 🤖`;

    return content;
}

function formatForLinkedIn(items: NewsletterContentItem[], intro: string): string {
    let content = `${intro}\n\n`;
    content += `Here's your daily dose of AI insights:\n\n`;

    items.forEach((item, index) => {
        const emoji = getSourceEmoji(item.source);
        content += `${emoji} ${item.title}\n`;
        content += `${item.description}\n`;
        content += `🔗 ${item.url}\n\n`;
    });

    content += `---\n`;
    content += `Follow for daily AI updates! 🚀\n`;
    content += `#AI #MachineLearning #ArtificialIntelligence #TechNews`;

    return content;
}

function formatGeneric(items: NewsletterContentItem[], intro: string): string {
    let content = `${intro}\n`;
    content += `${'═'.repeat(40)}\n\n`;

    items.forEach((item, index) => {
        const emoji = getSourceEmoji(item.source);
        content += `${index + 1}. ${emoji} ${item.title}\n`;
        content += `   ${item.description}\n`;
        content += `   📎 ${item.url}\n\n`;
    });

    content += `${'═'.repeat(40)}\n`;
    content += `🌐 whatsgoingonai.com`;

    return content;
}

function getSourceEmoji(source: NewsletterContentItem['source']): string {
    const emojis: Record<ContentSource, string> = {
        trending: '🔥',
        blog: '📝',
        agentic: '🤖',
        research: '📚',
        news: '📰',
        video: '🎬',
        jobs: '💼',
        tools: '🔧',
        learning: '🎓',
        decoded: '🧠',
        deepmind: '🧪',
        robotics: '🤖',
        skills: '🎯',
        timeline: '📅'
    };
    return emojis[source] || '📌';
}

/**
 * Get character count and warning for Twitter
 */
export function getCharacterInfo(text: string): {
    count: number;
    isOverLimit: boolean;
    remaining: number;
} {
    const TWITTER_LIMIT = 280;
    const count = text.length;
    return {
        count,
        isOverLimit: count > TWITTER_LIMIT,
        remaining: TWITTER_LIMIT - count
    };
}
