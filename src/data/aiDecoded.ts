export interface DecodedTopic {
    id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    icon: string; // Emoji for now, or lucide icon name
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    readTime: string;
    tags: string[];
    link: string; // External or internal
    color: string; // Tailwind color class for glow
}

export const DECODED_TOPICS: DecodedTopic[] = [
    {
        id: 'transformers',
        title: 'The Transformer',
        shortDescription: 'The architecture that changed everything.',
        fullDescription: 'Before 2017, AI struggled with long text to translate or understand context. The Transformer introduced "Attention" - a mechanism allowing models to look at an entire sentence at once rather than word-by-word. This is the "T" in GPT.',
        icon: '⚡️',
        difficulty: 'Intermediate',
        readTime: '5 min',
        tags: ['NLP', 'Foundation', 'Attention'],
        link: 'https://jalammar.github.io/illustrated-transformer/',
        color: 'from-blue-500 to-cyan-500'
    },
    {
        id: 'diffusion',
        title: 'Diffusion Models',
        shortDescription: 'How AI creates art from noise.',
        fullDescription: 'Imagine adding static to a photo until it is unrecognizable, then teaching a computer to reverse the process. That is Diffusion. It starts with pure noise and carefully refines it into a clear image, guided by your text prompt.',
        icon: '🎨',
        difficulty: 'Beginner',
        readTime: '4 min',
        tags: ['Generative Art', 'Computer Vision'],
        link: 'https://poloclub.github.io/diffusion-explainer/',
        color: 'from-purple-500 to-pink-500'
    },
    {
        id: 'rlhf',
        title: 'RLHF',
        shortDescription: 'Taming the beast with human feedback.',
        fullDescription: 'Raw LLMs are like erratic genies - smart but unpredictable. Reinforcement Learning from Human Feedback (RLHF) is the training school where humans rate the AI\'s answers, teaching it to be helpful, harmless, and honest.',
        icon: '🤝',
        difficulty: 'Intermediate',
        readTime: '6 min',
        tags: ['Alignment', 'Training', 'Safety'],
        link: 'https://huggingface.co/blog/rlhf',
        color: 'from-emerald-500 to-green-500'
    },
    {
        id: 'moe',
        title: 'Mixture of Experts',
        shortDescription: 'Why modern models are "Sparse".',
        fullDescription: 'Instead of one giant brain activation for every question, MoE models have many specialized "expert" sub-models. A "router" decides which experts are needed for each token. This makes massive models usually fast and efficient.',
        icon: '🧠',
        difficulty: 'Advanced',
        readTime: '8 min',
        tags: ['Architecture', 'Efficiency', 'Scaling'],
        link: 'https://huggingface.co/blog/moe',
        color: 'from-orange-500 to-red-500'
    },
    {
        id: 'embeddings',
        title: 'Vector Embeddings',
        shortDescription: 'How computers understand meaning.',
        fullDescription: 'Computers don\'t understand words; they understand numbers. Embeddings turn words into long lists of numbers (vectors) where similar concepts are mathematically close to each other. "King" - "Man" + "Woman" ≈ "Queen".',
        icon: '🔢',
        difficulty: 'Beginner',
        readTime: '5 min',
        tags: ['Fundamentals', 'Math', 'Search'],
        link: 'https://vickiboykis.com/what_are_embeddings/',
        color: 'from-yellow-400 to-orange-400'
    },
    {
        id: 'lora',
        title: 'LoRA',
        shortDescription: 'Fine-tuning giants on consumer GPUs.',
        fullDescription: 'Low-Rank Adaptation (LoRA) allows you to train a massive model like Llama 3 on a regular gaming PC. Instead of retraining the whole brain, it just trains a tiny adapter layer that sits on top, saving massive amounts of memory.',
        icon: '💾',
        difficulty: 'Advanced',
        readTime: '7 min',
        tags: ['Fine-Tuning', 'Optimization', 'Local AI'],
        link: 'https://huggingface.co/docs/peft/conceptual_guides/lora',
        color: 'from-blue-600 to-indigo-600'
    }
];
