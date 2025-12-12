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
        id: "2412.04472",
        title: "Scaling Laws for Precision",
        abstract: "We study the relationship between model performance and numerical precision in Large Language Models. We find that as models scale, they become robust to lower precision, allowing for aggressive quantization without performance loss.",
        url: "https://arxiv.org/abs/2412.04472",
        publishedAt: new Date("2024-12-05T14:00:00Z"),
        authors: ["T. Dettmers", "L. Zettlemoyer"],
        category: "Machine Learning",
        source: "ArXiv"
    },
    {
        id: "hf-daily-1",
        title: "Video Generation with Pym",
        abstract: "A new state-of-the-art video generation model that focuses on temporal consistency and physics-aware dynamics.",
        url: "https://huggingface.co/papers",
        publishedAt: new Date("2024-12-08T10:00:00Z"),
        authors: ["Hugging Face Research"],
        category: "Daily Papers",
        source: "Hugging Face"
    },
    {
        id: "google-gemini-2",
        title: "Gemini 2.0: Multimodal Reasoning at Scale",
        abstract: "Introducing Gemini 2.0, our most capable model yet. It exhibits state-of-the-art performance across a wide range of multimodal benchmarks.",
        url: "https://blog.research.google",
        publishedAt: new Date("2024-12-11T09:00:00Z"),
        authors: ["Google DeepMind"],
        category: "Deep Learning",
        source: "Google Research"
    },
    {
        id: "bair-agent-safety",
        title: "Towards Provably Safe AI Agents",
        abstract: "We propose a framework for constructing AI agents that respect safety constraints with high probability, even in novel environments.",
        url: "https://bair.berkeley.edu/blog",
        publishedAt: new Date("2024-12-10T11:00:00Z"),
        authors: ["BAIR Team"],
        category: "AI Research",
        source: "BAIR"
    },
    {
        id: "2412.01234",
        title: "Efficient Training of Large Vision Models",
        abstract: "New techniques for distributed training of LVMs that reduce memory bandwidth requirements by 40%.",
        url: "https://arxiv.org/abs/2412.01234",
        publishedAt: new Date("2024-12-09T14:00:00Z"),
        authors: ["J. Smith", "A. Doe"],
        category: "Computer Vision",
        source: "ArXiv"
    }
];
