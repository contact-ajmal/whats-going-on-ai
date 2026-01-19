export interface RoboticsTopic {
    id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    icon: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    readTime: string;
    tags: string[];
    link: string;
    color: string;
    isBreaking?: boolean;
    date?: string;
}

export const ROBOTICS_TOPICS: RoboticsTopic[] = [
    {
        id: 'boston-dynamics-deepmind',
        title: 'Boston Dynamics × DeepMind',
        shortDescription: 'Foundational AI for humanoid robots.',
        fullDescription: 'Historic partnership announced at CES 2026: Google DeepMind\'s Gemini Robotics AI meets Boston Dynamics\' all-electric Atlas robot. Deployments to Hyundai and DeepMind in 2026.',
        icon: '',
        difficulty: 'Intermediate',
        readTime: '10 min',
        tags: ['Boston Dynamics', 'DeepMind', 'Atlas', 'Gemini Robotics'],
        link: '/robotics/boston-dynamics-deepmind',
        color: 'from-teal-500 to-cyan-500',
        isBreaking: true,
        date: '2026-01-16'
    },
];

export const getRoboticsTopic = (id: string): RoboticsTopic | undefined => {
    return ROBOTICS_TOPICS.find(topic => topic.id === id);
};
