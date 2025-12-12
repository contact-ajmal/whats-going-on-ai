export interface ResearchPaper {
    id: string;
    title: string;
    abstract: string;
    url: string;
    publishedAt: Date;
    authors: string[];
    category: string;
    source: string;
}

export const FALLBACK_PAPERS: ResearchPaper[] = [
    {
        id: "2512.04472",
        title: "Gemini 3.0: The End of Fine-Tuning?",
        abstract: "We present Gemini 3.0, featuring a novel self-adaptation layer that reduces the need for task-specific fine-tuning by 95% while maintaining SOTA performance.",
        url: "https://blog.research.google",
        publishedAt: new Date("2025-12-11T14:00:00Z"),
        authors: ["Google DeepMind"],
        category: "Deep Learning",
        source: "Google Research"
    },
    {
        id: "hf-daily-25",
        title: "OpenVLA-2: Vision-Language-Action at the Edge",
        abstract: "A 7B parameter model capable of real-time robotic control on edge devices, trained on the new Ego-Exo4D-v2 dataset.",
        url: "https://huggingface.co/papers",
        publishedAt: new Date("2025-12-12T08:00:00Z"),
        authors: ["Hugging Face Research"],
        category: "Daily Papers",
        source: "Hugging Face"
    },
    {
        id: "arxiv-2512.001",
        title: "Linear Attention is All You Need (For Real This Time)",
        abstract: "We prove that properly initialized linear attention mechanisms can match standard softmax attention performance on context lengths up to 10M tokens.",
        url: "https://arxiv.org/abs/2512.00123",
        publishedAt: new Date("2025-12-10T09:30:00Z"),
        authors: ["S. Arora", "C. Re"],
        category: "Machine Learning",
        source: "ArXiv"
    },
    {
        id: "bair-autonomous-25",
        title: "World Models for Reliable Autonomous Driving",
        abstract: "Introducing a generative world model that accurately predicts rare edge cases in urban driving environments, improving safety scores by 40%.",
        url: "https://bair.berkeley.edu/blog",
        publishedAt: new Date("2025-12-09T11:00:00Z"),
        authors: ["BAIR Team"],
        category: "AI Research",
        source: "BAIR"
    },
    {
        id: "arxiv-2512.002",
        title: "Quantum-Resistant LLM Encryption",
        abstract: "A lightweight encryption scheme for protecting LLM weights and activations during inference on untrusted hardware.",
        url: "https://arxiv.org/abs/2512.00456",
        publishedAt: new Date("2025-12-08T15:45:00Z"),
        authors: ["A. Shamir", "R. Rivest"],
        category: "Cryptography",
        source: "ArXiv"
    }
];
