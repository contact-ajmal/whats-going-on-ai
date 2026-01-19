export interface JobListing {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    postedAt: Date;
    url: string;
    tags: string[];
    source: string;
    logo?: string;
}

export const FALLBACK_JOBS: JobListing[] = [
    {
        id: "openai-res-eng-25",
        title: "Research Engineer, Post-Training",
        company: "OpenAI",
        location: "San Francisco, CA",
        type: "Full-time",
        postedAt: new Date("2026-01-16T10:00:00Z"),
        url: "https://openai.com/careers",
        tags: ["Python", "PyTorch", "LLM", "RLHF"],
        source: "OpenAI Careers",
        logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg"
    },
    {
        id: "anthropic-sys-25",
        title: "Systems Engineer, Inference",
        company: "Anthropic",
        location: "Remote / SF",
        type: "Full-time",
        postedAt: new Date("2026-01-16T14:30:00Z"),
        url: "https://anthropic.com/careers",
        tags: ["Rust", "Kubernetes", "GPU", "High Performance Computing"],
        source: "Anthropic",
        logo: "https://upload.wikimedia.org/wikipedia/commons/7/78/Anthropic_logo.svg"
    },
    {
        id: "google-dm-25",
        title: "Research Scientist, Gemini Team",
        company: "Google DeepMind",
        location: "London, UK",
        type: "Hybrid",
        postedAt: new Date("2026-01-16T09:00:00Z"),
        url: "https://deepmind.google/careers",
        tags: ["Multimodal", "JAX", "TPU", "Research"],
        source: "Google DeepMind",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_DeepMind_Logo.svg/1200px-Google_DeepMind_Logo.svg.png"
    },
    {
        id: "xai-data-25",
        title: "Data Infrastructure Engineer",
        company: "xAI",
        location: "Palo Alto, CA",
        type: "Full-time",
        postedAt: new Date("2026-01-16T08:00:00Z"),
        url: "https://x.ai/careers",
        tags: ["Spark", "Big Data", "Distributed Systems"],
        source: "xAI",
        logo: "https://upload.wikimedia.org/wikipedia/commons/5/57/XAI-Logo.svg"
    },
    {
        id: "meta-ai-25",
        title: "AI Research Scientist, Llama Team",
        company: "Meta",
        location: "Menlo Park, CA",
        type: "Full-time",
        postedAt: new Date("2026-01-16T11:00:00Z"),
        url: "https://www.metacareers.com/",
        tags: ["Generative AI", "PyTorch", "Open Source"],
        source: "Meta AI",
        logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg"
    },
    {
        id: "mistral-eff-25",
        title: "Efficiency Engineer",
        company: "Mistral AI",
        location: "Paris, France",
        type: "Hybrid",
        postedAt: new Date("2026-01-16T13:00:00Z"),
        url: "https://mistral.ai/careers",
        tags: ["Quantization", "C++", "Inference"],
        source: "Mistral AI",
        logo: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Mistral_AI_logo.svg"
    }
];
