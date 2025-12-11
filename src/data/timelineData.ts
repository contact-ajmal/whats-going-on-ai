export interface TimelineEvent {
    year: string;
    title: string;
    description: string;
    category: 'Foundations' | 'Neural Nets' | 'Generative Age' | 'Modern Era';
    icon?: string;
}

export const timelineData: TimelineEvent[] = [
    {
        year: "1950",
        title: "The Turing Test",
        description: "Alan Turing publishes 'Computing Machinery and Intelligence', proposing the 'Imitation Game' to test a machine's ability to exhibit intelligent behavior.",
        category: "Foundations"
    },
    {
        year: "1956",
        title: "Birth of AI",
        description: "The term 'Artificial Intelligence' is coined at the Dartmouth Conference by John McCarthy, Marvin Minsky, Nathaniel Rochester, and Claude Shannon.",
        category: "Foundations"
    },
    {
        year: "1958",
        title: "The Perceptron",
        description: "Frank Rosenblatt invents the Perceptron, the first neural network model capable of learning from data, laying the groundwork for deep learning.",
        category: "Neural Nets"
    },
    {
        year: "1986",
        title: "Backpropagation",
        description: "Hinton, Rumelhart, and Williams popularize backpropagation, enabling multi-layer neural networks to learn effectively.",
        category: "Neural Nets"
    },
    {
        year: "1997",
        title: "Deep Blue Beats Kasparov",
        description: "IBM's Deep Blue becomes the first computer to defeat a reigning world chess champion, Garry Kasparov.",
        category: "Foundations"
    },
    {
        year: "2012",
        title: "AlexNet Moment",
        description: "AlexNet dominates the ImageNet competition using a deep convolutional neural network (CNN on GPU), sparking the modern Deep Learning boom.",
        category: "Deep Learning" as any // Type assertion for flexibility if interface changes
    },
    {
        year: "2014",
        title: "GANs Introduced",
        description: "Ian Goodfellow introduces Generative Adversarial Networks (GANs), allowing computers to generate realistic images.",
        category: "Generative Age"
    },
    {
        year: "2017",
        title: "Attention Is All You Need",
        description: "Google researchers release the Transformer architecture paper, revolutionizing NLP and paving the way for LLMs.",
        category: "Generative Age"
    },
    {
        year: "2020",
        title: "GPT-3 Released",
        description: "OpenAI releases GPT-3 with 175 billion parameters, demonstrating few-shot learning and human-like text generation.",
        category: "Generative Age"
    },
    {
        year: "2022",
        title: "ChatGPT Launch",
        description: "OpenAI launches ChatGPT, making advanced LLMs accessible to the general public and sparking a global AI arms race.",
        category: "Modern Era"
    },
    {
        year: "2023",
        title: "Multimodal Models",
        description: "GPT-4 and Gemini demonstrate capability across text, code, images, and video simultaneously.",
        category: "Modern Era"
    },
    {
        year: "2024",
        title: "Sora & The Future",
        description: "Video generation becomes indistinguishable from reality; implementation of physical world simulators.",
        category: "Modern Era"
    }
];
