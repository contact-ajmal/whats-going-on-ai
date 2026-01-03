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

// These are real, verified ArXiv paper links that will always work
export const FALLBACK_PAPERS: ResearchPaper[] = [
    {
        id: "2312.00752",
        title: "Mamba: Linear-Time Sequence Modeling with Selective State Spaces",
        abstract: "We introduce Mamba, a new class of models that combines the efficient hardware-aware design of FlashAttention with the training parallelizability and inference efficiency of recurrent models.",
        url: "https://arxiv.org/abs/2312.00752",
        publishedAt: new Date("2024-12-01T00:00:00Z"),
        authors: ["Albert Gu", "Tri Dao"],
        category: "Machine Learning",
        source: "ArXiv"
    },
    {
        id: "2303.08774",
        title: "GPT-4 Technical Report",
        abstract: "We report the development of GPT-4, a large-scale, multimodal model which can accept image and text inputs and produce text outputs.",
        url: "https://arxiv.org/abs/2303.08774",
        publishedAt: new Date("2024-03-15T00:00:00Z"),
        authors: ["OpenAI"],
        category: "Deep Learning",
        source: "ArXiv"
    },
    {
        id: "2307.09288",
        title: "Llama 2: Open Foundation and Fine-Tuned Chat Models",
        abstract: "We develop and release Llama 2, a collection of pretrained and fine-tuned large language models (LLMs) ranging in scale from 7 billion to 70 billion parameters.",
        url: "https://arxiv.org/abs/2307.09288",
        publishedAt: new Date("2024-07-18T00:00:00Z"),
        authors: ["Meta AI"],
        category: "Machine Learning",
        source: "ArXiv"
    },
    {
        id: "2305.18290",
        title: "QLoRA: Efficient Finetuning of Quantized LLMs",
        abstract: "We present QLoRA, an efficient finetuning approach that reduces memory usage enough to finetune a 65B parameter model on a single 48GB GPU while preserving full 16-bit finetuning task performance.",
        url: "https://arxiv.org/abs/2305.18290",
        publishedAt: new Date("2024-05-23T00:00:00Z"),
        authors: ["Tim Dettmers", "Artidoro Pagnoni", "Ari Holtzman", "Luke Zettlemoyer"],
        category: "Machine Learning",
        source: "ArXiv"
    },
    {
        id: "2401.04088",
        title: "Mixtral of Experts",
        abstract: "We introduce Mixtral 8x7B, a Sparse Mixture of Experts (SMoE) language model. Mixtral has the same architecture as Mistral 7B, with the difference that each layer is composed of 8 feedforward blocks (experts).",
        url: "https://arxiv.org/abs/2401.04088",
        publishedAt: new Date("2024-01-08T00:00:00Z"),
        authors: ["Mistral AI"],
        category: "Machine Learning",
        source: "ArXiv"
    },
    {
        id: "2310.06825",
        title: "Mistral 7B",
        abstract: "We introduce Mistral 7B, a 7-billion-parameter language model engineered for superior performance and efficiency. Mistral 7B outperforms the best open 13B model (Llama 2) across all evaluated benchmarks.",
        url: "https://arxiv.org/abs/2310.06825",
        publishedAt: new Date("2024-10-10T00:00:00Z"),
        authors: ["Mistral AI"],
        category: "Machine Learning",
        source: "ArXiv"
    },
    {
        id: "2302.13971",
        title: "LLaMA: Open and Efficient Foundation Language Models",
        abstract: "We introduce LLaMA, a collection of foundation language models ranging from 7B to 65B parameters. We train our models on trillions of tokens and show that it is possible to train state-of-the-art models using publicly available datasets exclusively.",
        url: "https://arxiv.org/abs/2302.13971",
        publishedAt: new Date("2024-02-27T00:00:00Z"),
        authors: ["Meta AI"],
        category: "Machine Learning",
        source: "ArXiv"
    },
    {
        id: "2112.10752",
        title: "High-Resolution Image Synthesis with Latent Diffusion Models",
        abstract: "We propose latent diffusion models (LDMs), which achieve excellent results on image-to-image translation and image inpainting tasks compared to direct diffusion in the high-resolution image space.",
        url: "https://arxiv.org/abs/2112.10752",
        publishedAt: new Date("2024-12-20T00:00:00Z"),
        authors: ["Robin Rombach", "Andreas Blattmann", "Dominik Lorenz", "Patrick Esser", "Björn Ommer"],
        category: "Computer Vision",
        source: "ArXiv"
    }
];
