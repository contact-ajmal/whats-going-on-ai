
export interface LearningResource {
    id: string;
    title: string;
    description: string;
    type: 'Course' | 'Video' | 'Tutorial';
    platform: 'Coursera' | 'Udemy' | 'YouTube' | 'DeepLearning.AI' | 'Fast.ai' | 'EdX' | 'Other';
    instructor: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    price: 'Free' | 'Paid';
    url: string;
    thumbnail: string;
    duration: string;
    rating: number; // 0-5
    tags: string[];
    dateAdded: string; // ISO date
}

export const FALLBACK_LEARNING: LearningResource[] = [
    {
        id: 'course-1',
        title: 'Generative AI with Large Language Models',
        description: 'Learn the fundamentals of how LLMs work, from training to inference, and how to fine-tune them for specific tasks.',
        type: 'Course',
        platform: 'Coursera',
        instructor: 'DeepLearning.AI',
        level: 'Intermediate',
        price: 'Paid',
        url: 'https://www.coursera.org/learn/generative-ai-with-llms',
        thumbnail: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/0a/8cd7f1b1434069b9b6d9d4a46a2a7a/GenAI-LLM-Square.png',
        duration: '16 hours',
        rating: 4.8,
        tags: ['LLM', 'Fine-tuning', 'Transformers'],
        dateAdded: '2026-01-16'
    },
    {
        id: 'course-2',
        title: 'Practical Deep Learning for Coders',
        description: 'A hands-on guide to deep learning, covering computer vision, NLP, and tabular data using PyTorch and fastai.',
        type: 'Course',
        platform: 'Fast.ai',
        instructor: 'Jeremy Howard',
        level: 'Intermediate',
        price: 'Free',
        url: 'https://course.fast.ai/',
        thumbnail: 'https://course.fast.ai/images/book_cover.jpg', // Placeholder
        duration: 'Top-tier',
        rating: 4.9,
        tags: ['Deep Learning', 'PyTorch', 'Computer Vision'],
        dateAdded: '2026-01-16'
    },
    {
        id: 'video-1',
        title: 'Attention Is All You Need (Transformer Paper Explained)',
        description: 'Visual explanation of the Transformer architecture, the foundation of modern LLMs.',
        type: 'Video',
        platform: 'YouTube',
        instructor: 'Yannic Kilcher',
        level: 'Advanced',
        price: 'Free',
        url: 'https://www.youtube.com/watch?v=iDulhoQ2pro',
        thumbnail: 'https://i.ytimg.com/vi/iDulhoQ2pro/maxresdefault.jpg',
        duration: '45 min',
        rating: 4.9,
        tags: ['Transformers', 'Paper Review', 'Theory'],
        dateAdded: '2026-01-16'
    },
    {
        id: 'course-3',
        title: 'CS50\'s Introduction to Artificial Intelligence with Python',
        description: 'Explore the concepts and algorithms at the foundation of modern artificial intelligence.',
        type: 'Course',
        platform: 'EdX',
        instructor: 'Harvard University',
        level: 'Beginner',
        price: 'Free',
        url: 'https://www.edx.org/learn/artificial-intelligence/harvard-university-cs50-s-introduction-to-artificial-intelligence-with-python',
        thumbnail: 'https://prod-discovery.edx-cdn.org/media/course/image/6e2b9c7b-9b1b-4b1b-9b1b-9b1b9b1b9b1b-7d1b3b5b6006.small.png', // Generic placeholder if needed
        duration: '7 weeks',
        rating: 4.7,
        tags: ['Python', 'Algorithms', 'Logic'],
        dateAdded: '2026-01-16'
    },
    {
        id: 'video-2',
        title: 'Building LLM Apps with LangChain',
        description: 'Tutorial on how to chain prompts and build complex AI applications using LangChain.',
        type: 'Tutorial',
        platform: 'YouTube',
        instructor: 'Harrison Chase',
        level: 'Intermediate',
        price: 'Free',
        url: 'https://www.youtube.com/watch?v=aywZrzNaKjs', // Example
        thumbnail: 'https://i.ytimg.com/vi/aywZrzNaKjs/maxresdefault.jpg',
        duration: '1 hour',
        rating: 4.6,
        tags: ['LangChain', 'Agents', 'Development'],
        dateAdded: '2026-01-16'
    },
    {
        id: 'course-4',
        title: 'Hugging Face NLP Course',
        description: 'Comprehensive course on Natural Language Processing using the Hugging Face ecosystem.',
        type: 'Course',
        platform: 'Other', // Hugging Face
        instructor: 'Hugging Face Team',
        level: 'Beginner',
        price: 'Free',
        url: 'https://huggingface.co/learn/nlp-course',
        thumbnail: 'https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/nlp-course/thumbnail.png',
        duration: 'Self-paced',
        rating: 4.9,
        tags: ['NLP', 'Hugging Face', 'Transformers'],
        dateAdded: '2026-01-16'
    },
    {
        id: 'video-3',
        title: 'State of GPT',
        description: 'Andrej Karpathy explains the training pipeline of GPT assistants.',
        type: 'Video',
        platform: 'YouTube',
        instructor: 'Andrej Karpathy',
        level: 'Intermediate',
        price: 'Free',
        url: 'https://www.youtube.com/watch?v=bZQun8Y4L2A',
        thumbnail: 'https://i.ytimg.com/vi/bZQun8Y4L2A/maxresdefault.jpg',
        duration: '42 min',
        rating: 5.0,
        tags: ['GPT', 'Training', 'LLM'],
        dateAdded: '2026-01-16'
    }
];
