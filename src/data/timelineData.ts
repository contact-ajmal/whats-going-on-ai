export interface TimelineEvent {
    year: string;
    title: string;
    description: string;
    category: 'Foundations' | 'Neural Nets' | 'Generative Age' | 'Modern Era';
    icon?: string;
    links?: Array<{ label: string, url: string }>;
    media?: {
        type: 'image' | 'video';
        url: string;
        caption?: string;
    };
    tags?: string[];
}

export const timelineData: TimelineEvent[] = [
    {
        year: "1950",
        title: "The Turing Test",
        description: "Alan Turing publishes 'Computing Machinery and Intelligence', proposing the 'Imitation Game' to test a machine's ability to exhibit intelligent behavior.",
        category: "Foundations",
        links: [
            { label: "Read Paper", url: "https://academic.oup.com/mind/article/LIX/236/433/986238" }
        ],
        tags: ["Logic", "Philosophy"]
    },
    {
        year: "1956",
        title: "Birth of AI",
        description: "The term 'Artificial Intelligence' is coined at the Dartmouth Conference by John McCarthy, Marvin Minsky, Nathaniel Rochester, and Claude Shannon.",
        category: "Foundations",
        media: {
            type: "image",
            url: "https://upload.wikimedia.org/wikipedia/commons/b/b8/John_McCarthy_Stanford.jpg",
            caption: "John McCarthy, key figure of the Dartmouth Conference"
        },
        tags: ["History"]
    },
    {
        year: "1958",
        title: "The Perceptron",
        description: "Frank Rosenblatt invents the Perceptron, the first neural network model capable of learning from data, laying the groundwork for deep learning.",
        category: "Neural Nets",
        links: [
            { label: "Original Paper", url: "https://psycnet.apa.org/record/1959-09865-001" }
        ]
    },
    {
        year: "1986",
        title: "Backpropagation",
        description: "Hinton, Rumelhart, and Williams popularize backpropagation, enabling multi-layer neural networks to learn effectively.",
        category: "Neural Nets",
        links: [
            { label: "Nature Paper", url: "https://www.nature.com/articles/323533a0" }
        ]
    },
    {
        year: "1997",
        title: "Deep Blue Beats Kasparov",
        description: "IBM's Deep Blue becomes the first computer to defeat a reigning world chess champion, Garry Kasparov.",
        category: "Foundations",
        media: {
            type: "image",
            url: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Kasparov_Magath_1985_Hamburg.jpg", // Placeholder or valid wikimedia
            caption: "Garry Kasparov vs Deep Blue"
        },
        links: [
            { label: "IBM Archive", url: "https://www.ibm.com/ibm/history/ibm100/us/en/icons/deepblue/" }
        ]
    },
    {
        year: "2012",
        title: "AlexNet Moment",
        description: "AlexNet dominates the ImageNet competition using a deep convolutional neural network (CNN on GPU), sparking the modern Deep Learning boom.",
        category: "Neural Nets",
        tags: ["Deep Learning", "Vision"]
    },
    {
        year: "2014",
        title: "GANs Introduced",
        description: "Ian Goodfellow introduces Generative Adversarial Networks (GANs), allowing computers to generate realistic images.",
        category: "Generative Age",
        links: [
            { label: "ArXiv Paper", url: "https://arxiv.org/abs/1406.2661" }
        ]
    },
    {
        year: "2017",
        title: "Attention Is All You Need",
        description: "Google researchers release the Transformer architecture paper, revolutionizing NLP and paving the way for LLMs.",
        category: "Generative Age",
        links: [
            { label: "Read Paper", url: "https://arxiv.org/abs/1706.03762" }
        ],
        tags: ["NLP", "Transformers"]
    },
    {
        year: "2020",
        title: "GPT-3 Released",
        description: "OpenAI releases GPT-3 with 175 billion parameters, demonstrating few-shot learning and human-like text generation.",
        category: "Generative Age",
        tags: ["LLM", "OpenAI"],
        links: [
            { label: "OpenAI Blog", url: "https://openai.com/research/gpt-3" }
        ]
    },
    {
        year: "2020",
        title: "AlphaFold 2",
        description: "DeepMind's AlphaFold 2 solves the 50-year-old protein folding problem, demonstrating AI's potential in scientific discovery.",
        category: "Generative Age",
        media: {
            type: "video",
            url: "https://www.youtube.com/embed/gg7WjuFs8F4",
            caption: "AlphaFold: The solution to a 50-year-old grand challenge in biology"
        },
        links: [
            { label: "DeepMind Blog", url: "https://deepmind.google/technologies/alphafold/" }
        ]
    },
    {
        year: "2021",
        title: "DALL-E & Copilot",
        description: "OpenAI unveils DALL-E (generating images from text) and GitHub launches Copilot (AI pair programmer), marking the start of consumer generative AI.",
        category: "Generative Age",
        media: {
            type: "image",
            url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/DALL-E_2_sample_-_A_Shiba_Inu_dog_wearing_a_beret_and_black_turtleneck.png/640px-DALL-E_2_sample_-_A_Shiba_Inu_dog_wearing_a_beret_and_black_turtleneck.png",
            caption: "DALL-E: 'A Shiba Inu dog wearing a beret and black turtleneck'"
        },
        links: [
            { label: "DALL-E Blog", url: "https://openai.com/research/dall-e" }
        ]
    },
    {
        year: "2022",
        title: "ChatGPT Launch",
        description: "OpenAI launches ChatGPT, making advanced LLMs accessible to the general public and sparking a global AI arms race.",
        category: "Modern Era",
        media: {
            type: "image",
            url: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
            caption: "The interface that changed everything"
        },
        links: [
            { label: "Try ChatGPT", url: "https://chat.openai.com" }
        ]
    },
    {
        year: "2022",
        title: "Stable Diffusion",
        description: "Stability AI releases Stable Diffusion, a powerful open-source text-to-image model, democratizing AI art generation.",
        category: "Modern Era",
        tags: ["Open Source", "Generative Art"]
    },
    {
        year: "2023",
        title: "Multimodal Models",
        description: "GPT-4 and Gemini demonstrate capability across text, code, images, and video simultaneously.",
        category: "Modern Era",
        media: {
            type: "video",
            url: "https://www.youtube.com/embed/outcGtbnMuQ", // GPT-4 Developer Livestream or similar
            caption: "GPT-4 Developer Livestream"
        },
        links: [
            { label: "GPT-4 Research", url: "https://openai.com/research/gpt-4" }
        ]
    },
    {
        year: "2023",
        title: "Llama 2 & Open Weights",
        description: "Meta releases Llama 2 with open weights, adhering to an open approach that challenges proprietary models.",
        category: "Modern Era",
        tags: ["Open Source", "Meta"]
    },
    {
        year: "2024",
        title: "Sora",
        description: "OpenAI introduces Sora, capable of generating cohesive, high-fidelity videos up to a minute long from simple text instructions.",
        category: "Modern Era",
        media: {
            type: "video",
            url: "https://www.youtube.com/embed/HK6y8DAPN_0", // Sora announcement video
            caption: "Sora: Creating video from text"
        },
        links: [
            { label: "Sora Page", url: "https://openai.com/sora" }
        ]
    },
    {
        year: "2024",
        title: "Reasoning Models (o1)",
        description: "Models begin to exhibit 'System 2' thinking—pausing to reason through complex problems before answering, improving math and coding performance dramatically.",
        category: "Modern Era",
        tags: ["Reasoning", "AGI"]
    },
    {
        year: "2025",
        title: "Agentic Future",
        description: "AI moves from chat-based interactions to autonomous agents capable of executing complex, multi-step tasks in the digital and physical world.",
        category: "Modern Era",
        media: {
            type: "image",
            url: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop",
            caption: "The dawn of autonomous agents"
        },
        tags: ["Agents", "Future"]
    }
];
