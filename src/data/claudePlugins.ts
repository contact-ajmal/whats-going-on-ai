import {
    Code2, Database, MessageSquare, Zap, FileText,
    Calendar, Mail, Github, Slack, Trello, Figma,
    Search, Briefcase, TrendingUp, Scale, Stethoscope,
    Microscope, Users, PenTool, Globe, Server, Terminal,
    Shield
} from 'lucide-react';

export interface ClaudeCommand {
    name: string;
    description: string;
    example: string;
}

export interface ClaudeConnector {
    name: string;
    icon?: any;
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
    category: 'Productivity' | 'Dev' | 'Data' | 'Creative' | 'Business' | 'Scientific';
    author: string;
    verified: boolean;
    icon: any;
    commands: ClaudeCommand[];
    connectors: ClaudeConnector[];
    skills: ClaudeSkill[];
    color: string;
}

export const CLAUDE_PLUGINS: ClaudePlugin[] = [
    // --- OFFICIAL DEV TOOLS ---
    {
        id: 'github-connector',
        name: 'GitHub Pro',
        description: 'Deep integration with GitHub for PR reviews, issue management, and code search.',
        category: 'Dev',
        author: 'Anthropic',
        verified: true,
        icon: Github,
        color: 'from-gray-600 to-gray-900',
        commands: [
            { name: '/pr-review', description: 'Analyzes a PR and provides a summary.', example: '/pr-review owner/repo#123' },
            { name: '/search-code', description: 'Semantically searches the codebase.', example: '/search-code "auth middleware"' }
        ],
        connectors: [{ name: 'GitHub API', icon: Github, type: 'Bi-directional' }],
        skills: [
            { name: 'Code Reviewer', description: 'Identifies bugs and security flaws.' },
            { name: 'Repo Navigator', description: 'Understands complex dependency trees.' }
        ]
    },
    {
        id: 'code-intelligence',
        name: 'Code Intelligence',
        description: 'LSP-powered code analysis for TypeScript, Python, Rust, and more.',
        category: 'Dev',
        author: 'Anthropic',
        verified: true,
        icon: Code2,
        color: 'from-blue-600 to-cyan-500',
        commands: [
            { name: '/def', description: 'Jump to definition.', example: '/def MyClass' },
            { name: '/refs', description: 'Find all references.', example: '/refs processData' }
        ],
        connectors: [{ name: 'LSP Servers', icon: Server, type: 'Source' }],
        skills: [
            { name: 'Polyglot Linter', description: 'Real-time type checking and error detection.' },
            { name: 'Refactor Agent', description: 'Safe, AST-based code transformations.' }
        ]
    },

    // --- KNOWLEDGE WORK: PRODUCTIVITY ---
    {
        id: 'productivity-suite',
        name: 'Productivity Suite',
        description: 'Manage tasks, plans, and workspace memory to stay organized.',
        category: 'Productivity',
        author: 'Anthropic',
        verified: true,
        icon: Zap,
        color: 'from-yellow-500 to-orange-500',
        commands: [
            { name: '/start', description: 'Initialize a new task or session.', example: '/start' },
            { name: '/update', description: 'Update current status and tasks.', example: '/update --comprehensive' }
        ],
        connectors: [{ name: 'Local Memory', icon: Database, type: 'Bi-directional' }],
        skills: [
            { name: 'Task Tracker', description: 'Maintains state of ongoing work items.' },
            { name: 'Context Memory', description: 'Remembers project context via CLAUDE.md.' }
        ]
    },
    {
        id: 'enterprise-search',
        name: 'Enterprise Search',
        description: 'Unified search across Email, Slack, Docs, and Wikis.',
        category: 'Productivity',
        author: 'Anthropic',
        verified: true,
        icon: Search,
        color: 'from-indigo-500 to-purple-500',
        commands: [
            { name: '/search', description: 'Query all connected knowledge bases.', example: '/search "Q3 goals"' },
            { name: '/digest', description: 'Generate a summary of recent info.', example: '/digest --weekly' }
        ],
        connectors: [
            { name: 'Google Drive', icon: FileText, type: 'Source' },
            { name: 'Slack', icon: Slack, type: 'Source' }
        ],
        skills: [
            { name: 'Knowledge Synthesizer', description: 'Merges conflicting info from multiple sources.' },
            { name: 'Source Prioritizer', description: 'Ranks information by recency and relevance.' }
        ]
    },

    // --- KNOWLEDGE WORK: BUSINESS ---
    {
        id: 'sales-agent',
        name: 'Sales Agent',
        description: 'Prospecting, pipeline strategy, and personalized outreach drafting.',
        category: 'Business',
        author: 'Anthropic',
        verified: true,
        icon: TrendingUp,
        color: 'from-green-600 to-emerald-600',
        commands: [
            { name: '/call-summary', description: 'Summarize a sales call transcript.', example: '/call-summary transcript.txt' },
            { name: '/forecast', description: 'Predict revenue based on pipeline.', example: '/forecast q4' }
        ],
        connectors: [{ name: 'Salesforce', icon: Briefcase, type: 'Bi-directional' }],
        skills: [
            { name: 'Account Researcher', description: 'Deep dives into prospect backgrounds.' },
            { name: 'Pitch Crafter', description: 'Writes personalized outreach emails.' }
        ]
    },
    {
        id: 'marketing-pro',
        name: 'Marketing Pro',
        description: 'Campaign planning, brand voice enforcement, and SEO auditing.',
        category: 'Business',
        author: 'Anthropic',
        verified: true,
        icon: PenTool,
        color: 'from-pink-500 to-rose-500',
        commands: [
            { name: '/draft-content', description: 'Create on-brand blog posts or copy.', example: '/draft-content topic="AI"' },
            { name: '/seo-audit', description: 'Analyze content for ranking capability.', example: '/seo-audit url' }
        ],
        connectors: [
            { name: 'CMS', icon: Globe, type: 'Destination' },
            { name: 'Analytics', icon: TrendingUp, type: 'Source' }
        ],
        skills: [
            { name: 'Brand Guardian', description: 'Ensures consistent tone and voice.' },
            { name: 'Campaign Strategist', description: 'Plans multi-channel rollouts.' }
        ]
    },
    {
        id: 'finance-wizard',
        name: 'Finance Wizard',
        description: 'Journal entry preparation, reconciliation, and financial analysis.',
        category: 'Business',
        author: 'Anthropic',
        verified: true,
        icon: Scale, // Closest visual for balance/finance
        color: 'from-emerald-700 to-green-900',
        commands: [
            { name: '/reconciliation', description: 'Compare ledgers for discrepancies.', example: '/reconciliation bank.csv ledger.csv' },
            { name: '/income-statement', description: 'Generate P&L from raw data.', example: '/income-statement 2024' }
        ],
        connectors: [{ name: 'ERP System', icon: Database, type: 'Source' }],
        skills: [
            { name: 'Auditor', description: 'Detects anomalies in financial records.' },
            { name: 'FP&A Analyst', description: 'Forecasts budget variances.' }
        ]
    },
    {
        id: 'legal-eagle',
        name: 'Legal Eagle',
        description: 'Contract review, NDA triage, and compliance checking.',
        category: 'Business',
        author: 'Anthropic',
        verified: true,
        icon: Shield,
        color: 'from-slate-600 to-slate-800',
        commands: [
            { name: '/review-contract', description: 'Analyze clauses for risk.', example: '/review-contract msa.pdf' },
            { name: '/triage-nda', description: 'Fast check of standard NDAs.', example: '/triage-nda received_nda.pdf' }
        ],
        connectors: [{ name: 'DocuSign', icon: FileText, type: 'Bi-directional' }],
        skills: [
            { name: 'Risk Assessor', description: 'Highlights non-standard liability clauses.' },
            { name: 'Compliance Officer', description: 'Checks against regulatory playbooks.' }
        ]
    },

    // --- KNOWLEDGE WORK: SCIENTIFIC & SPECIALIZED ---
    {
        id: 'bio-research',
        name: 'Bio-Research',
        description: 'Genomics analysis, literature search, and R&D pipeline management.',
        category: 'Scientific',
        author: 'Anthropic',
        verified: true,
        icon: Microscope,
        color: 'from-teal-500 to-cyan-600',
        commands: [
            { name: '/protocol-design', description: 'Draft a clinical trial protocol.', example: '/protocol-design phase=2 drug=X' },
            { name: '/lit-search', description: 'Find relevant papers on PubMed.', example: '/lit-search "CRISPR off-target"' }
        ],
        connectors: [{ name: 'PubMed', icon: Globe, type: 'Source' }],
        skills: [
            { name: 'Protocol Designer', description: 'Structuring rigorous scientific experiments.' },
            { name: 'Data QC', description: 'Quality control for sequencing data.' }
        ]
    },
    {
        id: 'data-analyst',
        name: 'Data Analyst',
        description: 'SQL generation, data profiling, and automated visualization.',
        category: 'Data',
        author: 'Anthropic',
        verified: true,
        icon: Database,
        color: 'from-orange-600 to-red-600',
        commands: [
            { name: '/write-query', description: 'Generate optimized SQL.', example: '/write-query "top users by spend"' },
            { name: '/create-viz', description: 'Build a dashboard from results.', example: '/create-viz results.csv' }
        ],
        connectors: [
            { name: 'Snowflake', icon: Database, type: 'Bi-directional' },
            { name: 'Postgres', icon: Database, type: 'Bi-directional' }
        ],
        skills: [
            { name: 'SQL Expert', description: 'Writing efficient, secure queries.' },
            { name: 'Viz Architect', description: 'Choosing the right chart for the data.' }
        ]
    },
    {
        id: 'customer-support',
        name: 'CX Agent',
        description: 'Ticket triage, response drafting, and automated escalation.',
        category: 'Business',
        author: 'Anthropic',
        verified: true,
        icon: Users,
        color: 'from-blue-400 to-indigo-500',
        commands: [
            { name: '/triage', description: 'Categorize and prioritize ticket.', example: '/triage ticket-402' },
            { name: '/draft-response', description: 'Write a polite, helpful reply.', example: '/draft-response ticket-402' }
        ],
        connectors: [{ name: 'Zendesk', icon: MessageSquare, type: 'Bi-directional' }],
        skills: [
            { name: 'Empathetic Responder', description: 'Tone-matching user sentiment.' },
            { name: 'Knowledge Retriever', description: 'Finding answers in KB articles.' }
        ]
    }
];
