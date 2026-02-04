import { LucideIcon } from 'lucide-react';
import {
    Code2, Database, MessageSquare, Zap, FileText,
    Calendar, Mail, Github, Slack, Trello, Figma
} from 'lucide-react';

export interface ClaudeCommand {
    name: string;
    description: string;
    example: string;
}

export interface ClaudeConnector {
    name: string;
    icon?: any; // LucideIcon
    type: 'Source' | 'Destination' | 'Bi-directional';
}

export interface ClaudeSkill {
    name: string;
    description: string;
}

export interface ClaudePlugin {
    id: string;
    name: string;
    description: string;
    category: 'Productivity' | 'Dev' | 'Data' | 'Creative' | 'Utilities';
    author: string;
    verified: boolean;
    icon: any;
    commands: ClaudeCommand[];
    connectors: ClaudeConnector[];
    skills: ClaudeSkill[];
    color: string;
}

export const CLAUDE_PLUGINS: ClaudePlugin[] = [
    {
        id: 'github-connector',
        name: 'GitHub Pro',
        description: 'Deep integration with GitHub for PR reviews, issue management, and code search.',
        category: 'Dev',
        author: 'Anthropic Official',
        verified: true,
        icon: Github,
        color: 'from-gray-600 to-gray-900',
        commands: [
            {
                name: '/pr-review',
                description: 'Analyzes a pull request and provides a detailed review summary.',
                example: '/pr-review owner/repo#123'
            },
            {
                name: '/search-code',
                description: 'Semantically searches the codebase for snippet matches.',
                example: '/search-code "authentication middleware"'
            }
        ],
        connectors: [
            { name: 'GitHub API', icon: Github, type: 'Bi-directional' }
        ],
        skills: [
            { name: 'Code Reviewer', description: 'Expert at identifying bugs, security flaws, and style issues.' },
            { name: 'Repo Navigator', description: 'Understands complex repository structures and dependencies.' }
        ]
    },
    {
        id: 'slack-syncer',
        name: 'Slack Syncer',
        description: 'Summarize threads, draft replies, and manage Slack notifications directly from Claude.',
        category: 'Productivity',
        author: 'Community',
        verified: true,
        icon: Slack,
        color: 'from-purple-500 to-pink-500',
        commands: [
            {
                name: '/summarize-thread',
                description: 'Summarizes a long Slack thread into key action items.',
                example: '/summarize-thread https://slack.com/archives/...'
            },
            {
                name: '/draft-reply',
                description: 'Drafts a professional reply based on context.',
                example: '/draft-reply "Confirm meeting for 2pm"'
            }
        ],
        connectors: [
            { name: 'Slack Webhook', icon: Slack, type: 'Source' }
        ],
        skills: [
            { name: 'Context Awareness', description: 'Understands conversational nuance and priority.' },
            { name: 'Meeting Scheduler', description: 'Identifies time conflicts and proposes slots.' }
        ]
    },
    {
        id: 'data-viz-wizard',
        name: 'DataViz Wizard',
        description: 'Turn CSVs and SQL results into beautiful, interactive charts instantly.',
        category: 'Data',
        author: 'DataLabs',
        verified: false,
        icon: Database,
        color: 'from-green-500 to-emerald-600',
        commands: [
            {
                name: '/plot',
                description: 'Generates a chart from provided data.',
                example: '/plot data.csv type=bar x=date y=sales'
            }
        ],
        connectors: [
            { name: 'Google Sheets', icon: FileText, type: 'Source' },
            { name: 'PostgreSQL', icon: Database, type: 'Source' }
        ],
        skills: [
            { name: 'Data Analyst', description: 'Identifies trends, outliers, and correlations.' },
            { name: 'Chart Designer', description: 'Selects the best visualization type for the data.' }
        ]
    },
    {
        id: 'linear-planner',
        name: 'Linear Planner',
        description: 'Create, update, and track Linear issues using natural language.',
        category: 'Productivity',
        author: 'Linear',
        verified: true,
        icon: Trello, // Placeholder for Linear
        color: 'from-indigo-500 to-blue-600',
        commands: [
            {
                name: '/create-issue',
                description: 'Creates a new issue with title, description and priority.',
                example: '/create-issue "Fix login bug" priority=high'
            }
        ],
        connectors: [
            { name: 'Linear API', icon: Trello, type: 'Bi-directional' }
        ],
        skills: [
            { name: 'Project Manager', description: 'Breaks down tasks and assigns estimates.' }
        ]
    }
];
