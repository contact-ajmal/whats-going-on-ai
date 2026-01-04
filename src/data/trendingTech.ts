export interface TrendingTopic {
    id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    icon: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    readTime: string;
    tags: string[];
    link: string;
    color: string;
    isBreaking?: boolean;
    date?: string;
}

export const TRENDING_TOPICS: TrendingTopic[] = [
    {
        id: 'anthropic-skills',
        title: 'Claude Code Agent Skills',
        shortDescription: 'Extend Claude Code with custom SKILL.md files.',
        fullDescription: 'Agent Skills let you teach Claude domain-specific knowledge, workflows, and best practices using simple Markdown files. Skills auto-trigger based on descriptions and can include reference files, utility scripts, and tool restrictions.',
        icon: '',
        difficulty: 'Intermediate',
        readTime: '8 min',
        tags: ['Claude Code', 'Agents', 'Extensibility', 'Anthropic'],
        link: '/trending/anthropic-skills',
        color: 'from-orange-500 to-red-500',
        isBreaking: true,
        date: '2025-01'
    },
    {
        id: 'context-graphs',
        title: 'Context Graphs & Decision Traces',
        shortDescription: 'The trillion-dollar layer AI agents are building.',
        fullDescription: 'Context graphs capture the "why" behind decisions—not just what happened, but the exceptions, precedents, and cross-system context that led to each action. This is the missing layer that turns AI agents into systems of record.',
        icon: '',
        difficulty: 'Advanced',
        readTime: '10 min',
        tags: ['AI Agents', 'Enterprise', 'Systems of Record', 'Decision Intelligence'],
        link: '/trending/context-graphs',
        color: 'from-purple-500 to-indigo-500',
        isBreaking: false,
        date: '2025-01'
    },
    {
        id: 'agentic-crafting',
        title: 'Agentic Crafting (ROME)',
        shortDescription: 'The new "Rock and Roll" ecosystem for agent training.',
        fullDescription: 'Based on the paper "Let It Flow", this emerging ecosystem (ALE) introduces a principled pipeline for agentic LLMs: ROLL for post-training, ROCK for sandboxed environments, and ROME as the SOTA open model.',
        icon: '',
        difficulty: 'Advanced',
        readTime: '15 min',
        tags: ['ALE Ecosystem', 'Model Training', 'Open Source', 'arXiv:2512.24873'],
        link: '/trending/agentic-crafting',
        color: 'from-rose-500 to-orange-500',
        isBreaking: true,
        date: '2025-12'
    }
];
