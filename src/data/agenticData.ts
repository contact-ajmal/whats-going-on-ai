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
        date: '2026-01-16'
    },
    {
        id: 'claude-code',
        title: 'Claude Code Mastery',
        shortDescription: 'Master the AI coding agent from beginner to expert.',
        fullDescription: 'Comprehensive guide to Claude Code covering installation, CLI commands, tool management, MCP integrations, and power-user workflows. Interactive skill levels take you from basics to automation.',
        icon: '',
        difficulty: 'Beginner',
        readTime: '15 min',
        tags: ['Claude Code', 'Terminal', 'CLI', 'Anthropic', 'Coding Agent'],
        link: '/agentic-ai/claude-code',
        color: 'from-cyan-500 to-blue-500',
        isBreaking: true,
        date: '2026-01-16'
    },
    {
        id: 'google-agentic-vision',
        title: 'Google Agentic Vision',
        shortDescription: 'Gemini 3 Flash using Think, Act, Observe loops for vision.',
        fullDescription: 'Agentic Vision transforms image understanding from a static process to an active one. Gemini 3 Flash can now "think" about an image, "act" by executing code to zoom or annotate, and "observe" the results to gain deeper insight.',
        icon: '',
        difficulty: 'Intermediate',
        readTime: '6 min',
        tags: ['Computer Vision', 'Gemini', 'Google', 'Agentic'],
        link: '/agentic-ai/google-agentic-vision',
        color: 'from-blue-500 to-indigo-500',
        isBreaking: true,
        date: '2026-02-27'
    },
];

export const getAgenticTopic = (id: string): AgenticTopic | undefined => {
    return AGENTIC_TOPICS.find(topic => topic.id === id);
};
