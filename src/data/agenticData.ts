export interface AgenticTopic {
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

export const AGENTIC_TOPICS: AgenticTopic[] = [
    {
        id: 'anthropic-skills',
        title: 'Claude Code Agent Skills',
        shortDescription: 'Extend Claude Code with custom SKILL.md files.',
        fullDescription: 'Agent Skills let you teach Claude domain-specific knowledge, workflows, and best practices using simple Markdown files. Skills auto-trigger based on descriptions and can include reference files, utility scripts, and tool restrictions.',
        icon: '',
        difficulty: 'Intermediate',
        readTime: '8 min',
        tags: ['Claude Code', 'Agents', 'Extensibility', 'Anthropic'],
        link: '/agentic-ai/anthropic-skills',
        color: 'from-orange-500 to-red-500',
        isBreaking: true,
        date: '2025-01'
    },
];

export const getAgenticTopic = (id: string): AgenticTopic | undefined => {
    return AGENTIC_TOPICS.find(topic => topic.id === id);
};
