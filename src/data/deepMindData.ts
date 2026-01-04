export interface DeepMindItem {
    id: string;
    title: string;
    description: string;
    fullDescription?: string; // Optional longer text for modal/page
    category: 'model' | 'breakthrough' | 'tool' | 'algorithm';
    year?: string; // For timeline
    icon?: string; // Emoji or Lucide icon name
    link?: string; // External link or internal deep link
    tags: string[];
}

export const DEEPMIND_CONTENT: DeepMindItem[] = [
    // --- MAJOR AI MODELS & SYSTEMS ---
    {
        id: 'alphago',
        title: 'AlphaGo',
        description: 'The first AI to defeat a professional human Go player.',
        fullDescription: 'AlphaGo combined advanced search trees with deep neural networks. It played against itself millions of times to learn strategies that stunned the world in its match against Lee Sedol.',
        category: 'model',
        year: '2016',
        icon: '',
        tags: ['RL', 'Game Theory', 'History'],
        link: 'https://deepmind.google/technologies/alphago/'
    },
    {
        id: 'alphazero',
        title: 'AlphaZero',
        description: 'A generalist algorithm that mastered Chess, Shogi, and Go from scratch without human data.',
        category: 'model',
        year: '2017',
        icon: '',
        tags: ['General Intelligence', 'RL', 'Self-Play'],
        link: 'https://deepmind.google/technologies/alphazero/'
    },
    {
        id: 'muzero',
        title: 'MuZero',
        description: 'A system that learns to play games (Atari, Go, Chess) without being told the rules.',
        category: 'model',
        year: '2019',
        icon: '',
        tags: ['Planning', 'Model-Based RL'],
        link: 'https://deepmind.google/discover/blog/muzero-mastering-go-chess-shogi-and-atari-without-rules/'
    },
    {
        id: 'alphastar',
        title: 'AlphaStar',
        description: 'An AI that mastered the real-time strategy game StarCraft II.',
        fullDescription: 'StarCraft II is a game of hidden information and long-term planning. AlphaStar achieved Grandmaster level, demonstrating complex strategic reasoning.',
        category: 'model',
        year: '2019',
        icon: '',
        tags: ['RTS', 'Multi-Agent', 'Strategy'],
        link: 'https://deepmind.google/discover/blog/alphastar-mastering-the-real-time-strategy-game-starcraft-ii/'
    },
    {
        id: 'wavenet',
        title: 'WaveNet',
        description: 'A deep neural network for generating raw audio, used in Google Assistant.',
        category: 'model',
        year: '2016',
        icon: '',
        tags: ['Audio', 'Generative', 'TTS'],
        link: 'https://deepmind.google/technologies/wavenet/'
    },
    {
        id: 'gemini',
        title: 'Gemini',
        description: 'A family of multimodal AI models capable of understanding text, code, audio, image, and video.',
        fullDescription: 'Co-developed with Google Brain, Gemini represents the state-of-the-art in multimodal reasoning, built from the ground up to understand the world like humans do.',
        category: 'model',
        year: '2023',
        icon: '',
        tags: ['Multimodal', 'LLM', 'Foundation Model'],
        link: 'https://deepmind.google/technologies/gemini/'
    },
    {
        id: 'gato',
        title: 'Gato',
        description: 'A "generalist" agent capable of performing over 600 different tasks with a single model.',
        category: 'model',
        year: '2022',
        icon: '',
        tags: ['Generalist', 'Multi-Task', 'Robotics'],
        link: 'https://deepmind.google/discover/blog/a-generalist-agent/'
    },
    {
        id: 'flamingo',
        title: 'Flamingo',
        description: 'A visual language model (VLM) for multimodal tasks.',
        category: 'model',
        year: '2022',
        icon: '',
        tags: ['VLM', 'Vision', 'Language'],
        link: 'https://deepmind.google/discover/blog/tackling-multiple-tasks-with-a-single-visual-language-model/'
    },
    {
        id: 'chinchilla',
        title: 'Chinchilla',
        description: 'A compute-optimal Large Language Model (LLM).',
        fullDescription: 'Chinchilla proved that model size is not everything; training data volume matters just as much. It redefined the "scaling laws" for LLMs.',
        category: 'model',
        year: '2022',
        icon: '',
        tags: ['LLM', 'Scaling Laws', 'Efficiency'],
        link: 'https://deepmind.google/discover/blog/an-empirical-analysis-of-compute-optimal-large-language-model-training/'
    },
    {
        id: 'sparrow',
        title: 'Sparrow',
        description: 'An early dialogue agent designed to be helpful, correct, and harmless.',
        category: 'model',
        year: '2022',
        icon: '',
        tags: ['Dialogue', 'Safety', 'Alignment'],
        link: 'https://deepmind.google/discover/blog/building-safer-dialogue-agents/'
    },
    {
        id: 'genie',
        title: 'Genie',
        description: 'A generative interactive environment model that can create playable 2D platformer games from a single prompt.',
        category: 'model',
        year: '2024',
        icon: '',
        tags: ['World Models', 'Generative', 'Game Design'],
        link: 'https://deepmind.google/discover/blog/genie-generative-interactive-environments/'
    },
    {
        id: 'sima',
        title: 'SIMA',
        description: 'An AI agent trained to follow natural language instructions across a variety of 3D game worlds.',
        category: 'model',
        year: '2024',
        icon: '',
        tags: ['Agents', '3D', 'Instruction Following'],
        link: 'https://deepmind.google/discover/blog/sima-generalist-ai-agent-for-3d-virtual-environments/'
    },
    {
        id: 'veo',
        title: 'Veo',
        description: 'A high-definition generative video model.',
        category: 'model',
        year: '2024',
        icon: '',
        tags: ['Video Generation', 'Generative AI'],
        link: 'https://deepmind.google/technologies/veo/'
    },
    {
        id: 'imagen',
        title: 'Imagen',
        description: 'A text-to-image diffusion model.',
        category: 'model',
        year: '2022',
        icon: '',
        tags: ['Image Generation', 'Diffusion'],
        link: 'https://deepmind.google/technologies/imagen-2/'
    },

    // --- SCIENTIFIC BREAKTHROUGHS ---
    {
        id: 'alphafold',
        title: 'AlphaFold (1, 2, & 3)',
        description: 'An AI system that predicts 3D protein structures, solving a 50-year-old "grand challenge" in biology.',
        category: 'breakthrough',
        year: '2020',
        icon: '',
        tags: ['Biology', 'Science', 'Noble Prize'],
        link: 'https://deepmind.google/technologies/alphafold/'
    },
    {
        id: 'alphamissense',
        title: 'AlphaMissense',
        description: 'An AI tool that classifies the effects of genetic mutations to aid in disease diagnosis.',
        category: 'breakthrough',
        year: '2023',
        icon: '',
        tags: ['Genetics', 'Health', 'Classification'],
        link: 'https://deepmind.google/discover/blog/alphamissense-catalogue-of-genetic-mutations-to-help-pinpoint-cause-of-diseases/'
    },
    {
        id: 'alphaproteo',
        title: 'AlphaProteo',
        description: 'A system for designing novel proteins to bind to specific molecular targets.',
        category: 'breakthrough',
        year: '2024',
        icon: '',
        tags: ['Drug Discovery', 'Protein Design'],
        link: 'https://deepmind.google/discover/blog/alphaproteo-generates-novel-proteins-for-biology-and-health-research/'
    },
    {
        id: 'graphcast',
        title: 'GraphCast',
        description: 'An AI model for global weather forecasting that predicts weather faster and more accurately than traditional simulators.',
        category: 'breakthrough',
        year: '2023',
        icon: '',
        tags: ['Weather', 'Climate', 'GNN'],
        link: 'https://deepmind.google/discover/blog/graphcast-ai-model-for-faster-and-more-accurate-global-weather-forecasting/'
    },
    {
        id: 'alphageometry',
        title: 'AlphaGeometry',
        description: 'An AI system that solves complex geometry problems at an Olympiad gold-medalist level.',
        category: 'breakthrough',
        year: '2024',
        icon: '',
        tags: ['Math', 'Reasoning', 'Symbolic AI'],
        link: 'https://deepmind.google/discover/blog/alphageometry-an-olympiad-level-ai-system-for-geometry/'
    },
    {
        id: 'alphatensor',
        title: 'AlphaTensor',
        description: 'An AI that discovered faster algorithms for matrix multiplication.',
        category: 'breakthrough',
        year: '2022',
        icon: '',
        tags: ['Math', 'Efficiency', 'Algorithmic Discovery'],
        link: 'https://deepmind.google/discover/blog/discovering-novel-algorithms-with-alphatensor/'
    },
    {
        id: 'alphadev',
        title: 'AlphaDev',
        description: 'An AI that discovered faster sorting algorithms, now integrated into the standard C++ library.',
        category: 'breakthrough',
        year: '2023',
        icon: '',
        tags: ['Optimization', 'Sorting', 'Code'],
        link: 'https://deepmind.google/discover/blog/alphadev-discovers-faster-sorting-algorithms/'
    },
    {
        id: 'alphaqubit',
        title: 'AlphaQubit',
        description: 'An AI system for identifying and correcting errors in quantum computers.',
        category: 'breakthrough',
        year: '2024',
        icon: '',
        tags: ['Quantum Computing', 'Physics'],
        link: 'https://deepmind.google/discover/blog/alphaqubit-identifying-errors-in-quantum-computers/'
    },

    // --- OPEN SOURCE TOOLS & LIBRARIES ---
    {
        id: 'sonnet',
        title: 'Sonnet',
        description: 'A library built on top of TensorFlow for building complex neural networks.',
        category: 'tool',
        icon: '',
        tags: ['TensorFlow', 'Library'],
        link: 'https://github.com/deepmind/sonnet'
    },
    {
        id: 'openspiel',
        title: 'OpenSpiel',
        description: 'A collection of environments and algorithms for research in reinforcement learning and games.',
        category: 'tool',
        icon: '',
        tags: ['RL', 'Games', 'Research'],
        link: 'https://github.com/deepmind/open_spiel'
    },
    {
        id: 'acme',
        title: 'Acme',
        description: 'A framework for distributed reinforcement learning.',
        category: 'tool',
        icon: '',
        tags: ['RL', 'Distributed', 'Framework'],
        link: 'https://github.com/deepmind/acme'
    },
    {
        id: 'jax-ecosystem',
        title: 'JAX Ecosystem',
        description: 'Haiku, Optax, RLax, Chex, Kfac-jax - Powerful tools for high-performance machine learning research.',
        category: 'tool',
        icon: '',
        tags: ['JAX', 'Research', 'Performance'],
        link: 'https://github.com/google-deepmind'
    },
    {
        id: 'reverb',
        title: 'Reverb',
        description: 'An efficient data storage system for machine learning (experience replay).',
        category: 'tool',
        icon: '',
        tags: ['Data', 'RL', 'Infrastructure'],
        link: 'https://github.com/deepmind/reverb'
    },
    {
        id: 'mujoco',
        title: 'MuJoCo',
        description: 'A physics engine for robotics and biomechanics simulation.',
        category: 'tool',
        icon: '',
        tags: ['Physics', 'Simulation', 'Robotics'],
        link: 'https://mujoco.org/'
    },
    {
        id: 'androidenv',
        title: 'AndroidEnv',
        description: 'An environment for training RL agents on the Android operating system.',
        category: 'tool',
        icon: '',
        tags: ['RL', 'Mobile', 'Environment'],
        link: 'https://github.com/deepmind/android_env'
    },

    // --- CORE ALGORITHMS & CONCEPTS ---
    {
        id: 'dqn',
        title: 'Deep Q-Networks (DQN)',
        description: 'The algorithm that learned to play Atari games from raw pixels.',
        category: 'algorithm',
        year: '2013',
        icon: '',
        tags: ['RL', 'Deep Learning', 'Pioneer'],
        link: 'https://arxiv.org/abs/1312.5602'
    },
    {
        id: 'ntm',
        title: 'Neural Turing Machine',
        description: 'A neural network model coupled with external memory resources.',
        category: 'algorithm',
        year: '2014',
        icon: '',
        tags: ['Memory', 'Architecture'],
        link: 'https://arxiv.org/abs/1410.5401'
    },
    {
        id: 'rainbow',
        title: 'Rainbow DQN',
        description: 'A combination of several improvements to the original DQN algorithm.',
        category: 'algorithm',
        year: '2017',
        icon: '',
        tags: ['RL', 'Optimization'],
        link: 'https://arxiv.org/abs/1710.02298'
    },
    {
        id: 'impala',
        title: 'IMPALA',
        description: 'A scalable distributed reinforcement learning architecture.',
        category: 'algorithm',
        year: '2018',
        icon: '',
        tags: ['Distributed RL', 'Scale'],
        link: 'https://arxiv.org/abs/1802.01561'
    }
];
