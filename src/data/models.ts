export interface Model {
    id: string;
    name: string;
    provider: string;
    releaseDate: string;
    tier: 'S' | 'A' | 'B' | 'C';
    scores: {
        elo: number; // Chatbot Arena Elo
        coding: number; // HumanEval Pass@1
        reasoning: number; // MMLU
        context: string; // Context Window (e.g. "128k")
    };
    tags: string[];
}

export const models: Model[] = [
    {
        id: 'gpt-4o',
        name: 'GPT-4o',
        provider: 'OpenAI',
        releaseDate: '2024-05-13',
        tier: 'S',
        scores: {
            elo: 88.7, // Average
            coding: 90.2,
            reasoning: 88.7,
            context: '128k'
        },
        tags: ['Multimodal', 'Fast']
    },
    {
        id: 'claude-3-5-sonnet',
        name: 'Claude 3.5 Sonnet',
        provider: 'Anthropic',
        releaseDate: '2024-06-20',
        tier: 'S',
        scores: {
            elo: 88.2,
            coding: 92.0,
            reasoning: 88.3,
            context: '200k'
        },
        tags: ['Coding King', 'Reasoning']
    },
    {
        id: 'gemini-1-5-pro',
        name: 'Gemini 1.5 Pro',
        provider: 'Google',
        releaseDate: '2024-05-14',
        tier: 'S',
        scores: {
            elo: 87.5,
            coding: 87.1,
            reasoning: 85.9,
            context: '2M'
        },
        tags: ['Long Context', 'Multimodal']
    },
    {
        id: 'llama-3-70b',
        name: 'Llama 3 (70B)',
        provider: 'Meta',
        releaseDate: '2024-04-18',
        tier: 'A',
        scores: {
            elo: 82.3,
            coding: 81.7,
            reasoning: 82.0,
            context: '8k'
        },
        tags: ['Open Weights', 'Efficient']
    },
    {
        id: 'gpt-4-turbo',
        name: 'GPT-4 Turbo',
        provider: 'OpenAI',
        releaseDate: '2023-11-06',
        tier: 'A',
        scores: {
            elo: 85.4,
            coding: 85.4,
            reasoning: 86.5,
            context: '128k'
        },
        tags: ['Reliable']
    },
    {
        id: 'claude-3-opus',
        name: 'Claude 3 Opus',
        provider: 'Anthropic',
        releaseDate: '2024-03-04',
        tier: 'S',
        scores: {
            elo: 86.8,
            coding: 84.9,
            reasoning: 86.8,
            context: '200k'
        },
        tags: ['Writer', 'Reasoning']
    },
    {
        id: 'mistral-large',
        name: 'Mistral Large 2',
        provider: 'Mistral',
        releaseDate: '2024-07-24',
        tier: 'A',
        scores: {
            elo: 84.1,
            coding: 84.4,
            reasoning: 84.0,
            context: '128k'
        },
        tags: ['European', 'Open Weights']
    }
];
