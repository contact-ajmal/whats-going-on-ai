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
    },
    {
        id: 'nemotron-cascade',
        title: 'Nemotron-Cascade (Cascaded RL)',
        shortDescription: 'Train reasoning LLMs without forgetting.',
        fullDescription: 'NVIDIA\'s Cascade RL framework trains unified reasoning models by sequentially optimizing across RLHF, instruction-following, math, code, and SWE—achieving SOTA and a silver medal at IOI 2025.',
        icon: '',
        difficulty: 'Advanced',
        readTime: '12 min',
        tags: ['NVIDIA', 'Reinforcement Learning', 'Reasoning', 'arXiv:2512.13607'],
        link: '/trending/nemotron-cascade',
        color: 'from-emerald-500 to-teal-500',
        isBreaking: true,
        date: '2025-01'
    },
    {
        id: 'geometry-of-reason',
        title: 'Geometry of Reason',
        shortDescription: 'Detect valid reasoning via spectral analysis.',
        fullDescription: 'A training-free method to detect valid mathematical reasoning through spectral analysis of attention patterns. By treating attention as graphs, four metrics achieve 85-95% accuracy with no fine-tuning.',
        icon: '',
        difficulty: 'Advanced',
        readTime: '10 min',
        tags: ['Interpretability', 'Attention Analysis', 'AI Safety', 'arXiv:2601.00791'],
        link: '/trending/geometry-of-reason',
        color: 'from-cyan-500 to-blue-500',
        isBreaking: true,
        date: '2026-01'
    },
    {
        id: 'nvidia-rubin',
        title: 'NVIDIA Rubin Architecture',
        shortDescription: 'The 2026 AI supercomputer leap.',
        fullDescription: 'NVIDIA\'s next-generation Rubin platform brings HBM4 memory (288GB, 22TB/s), custom Vera CPU with 88 Olympus cores, NVLink 6, and 5x performance over Blackwell—designed for agentic AI.',
        icon: '',
        difficulty: 'Intermediate',
        readTime: '12 min',
        tags: ['NVIDIA', 'Hardware', 'HBM4', 'AI Infrastructure'],
        link: '/trending/nvidia-rubin',
        color: 'from-green-500 to-emerald-500',
        isBreaking: true,
        date: '2026-01'
    },
    {
        id: 'nvidia-alpamayo',
        title: 'NVIDIA Alpamayo',
        shortDescription: 'Thinking AI for autonomous driving.',
        fullDescription: 'The world\'s first chain-of-thought reasoning AI for Level 4 autonomous vehicles. 10B parameter VLA model with explainable decision logic. Mercedes-Benz CLA launching Q1 2026.',
        icon: '',
        difficulty: 'Intermediate',
        readTime: '10 min',
        tags: ['NVIDIA', 'Autonomous Driving', 'Chain-of-Thought', 'Level 4'],
        link: '/trending/nvidia-alpamayo',
        color: 'from-lime-500 to-green-500',
        isBreaking: true,
        date: '2026-01'
    }
];
