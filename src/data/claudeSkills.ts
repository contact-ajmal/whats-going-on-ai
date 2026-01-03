// Claude Code Agent Skills Directory
// Curated from https://github.com/BehiSecc/awesome-claude-skills, https://github.com/anthropics/skills, and https://github.com/abubakarsiddik31/claude-skills-collection

export interface ClaudeSkill {
    name: string;
    description: string;
    repo: string;
    category: string;
    isOfficial: boolean;
}

export const SKILL_CATEGORIES = [
    { id: 'documents', name: 'Document Skills', icon: '📄', color: 'text-blue-400' },
    { id: 'creative', name: 'Creative & Design', icon: '🎨', color: 'text-rose-400' },
    { id: 'development', name: 'Development & Code', icon: '🛠️', color: 'text-green-400' },
    { id: 'data', name: 'Data & Analysis', icon: '📊', color: 'text-purple-400' },
    { id: 'scientific', name: 'Scientific & Research', icon: '🔬', color: 'text-cyan-400' },
    { id: 'writing', name: 'Writing & Research', icon: '✍️', color: 'text-yellow-400' },
    { id: 'learning', name: 'Learning & Knowledge', icon: '📘', color: 'text-indigo-400' },
    { id: 'media', name: 'Media & Content', icon: '🎬', color: 'text-pink-400' },
    { id: 'collaboration', name: 'Collaboration & PM', icon: '🤝', color: 'text-orange-400' },
    { id: 'security', name: 'Security & Testing', icon: '🛡️', color: 'text-red-400' },
    { id: 'utility', name: 'Utility & Automation', icon: '🔧', color: 'text-gray-400' },
];

export const CLAUDE_SKILLS: ClaudeSkill[] = [
    // Official Anthropic Document Skills
    {
        name: 'docx',
        description: 'Create, edit, analyze Word docs with tracked changes, comments, formatting.',
        repo: 'https://github.com/anthropics/skills/tree/main/skills/docx',
        category: 'documents',
        isOfficial: true,
    },
    {
        name: 'pdf',
        description: 'Extract text, tables, metadata, merge & annotate PDFs.',
        repo: 'https://github.com/anthropics/skills/tree/main/skills/pdf',
        category: 'documents',
        isOfficial: true,
    },
    {
        name: 'pptx',
        description: 'Read, generate, and adjust slides, layouts, templates.',
        repo: 'https://github.com/anthropics/skills/tree/main/skills/pptx',
        category: 'documents',
        isOfficial: true,
    },
    {
        name: 'xlsx',
        description: 'Spreadsheet manipulation: formulas, charts, data transformations.',
        repo: 'https://github.com/anthropics/skills/tree/main/skills/xlsx',
        category: 'documents',
        isOfficial: true,
    },
    {
        name: 'revealjs-skill',
        description: 'Generate polished, professional presentations using the Reveal.js HTML presentation framework.',
        repo: 'https://github.com/ryanbbrown/revealjs-skill',
        category: 'documents',
        isOfficial: false,
    },

    // Creative & Design
    {
        name: 'nano-image-generator',
        description: 'Lightweight image generation for quick visual assets.',
        repo: 'https://github.com/livelabs-ventures/nano-skills/tree/main/skills/nano-image-generator',
        category: 'creative',
        isOfficial: false,
    },

    // Development & Code Tools
    {
        name: 'web-artifacts-builder',
        description: 'Suite of tools for creating elaborate, multi-component HTML artifacts using React, Tailwind CSS, shadcn/ui.',
        repo: 'https://github.com/anthropics/skills/tree/main/skills/web-artifacts-builder',
        category: 'development',
        isOfficial: true,
    },
    {
        name: 'changelog-generator',
        description: 'Automatically generate changelogs from git commits and PRs.',
        repo: 'https://github.com/ComposioHQ/awesome-claude-skills/tree/master/changelog-generator',
        category: 'development',
        isOfficial: false,
    },
    {
        name: 'test-driven-development',
        description: 'Use when implementing any feature or bugfix, before writing implementation code.',
        repo: 'https://github.com/obra/superpowers/tree/main/skills/test-driven-development',
        category: 'development',
        isOfficial: false,
    },
    {
        name: 'subagent-driven-development',
        description: 'Coordinate multiple Claude subagents for complex development tasks.',
        repo: 'https://github.com/obra/superpowers/tree/main/skills/subagent-driven-development',
        category: 'development',
        isOfficial: false,
    },
    {
        name: 'executing-plans',
        description: 'Execute structured development plans step by step.',
        repo: 'https://github.com/obra/superpowers/tree/main/skills/executing-plans',
        category: 'development',
        isOfficial: false,
    },
    {
        name: 'using-git-worktrees',
        description: 'Creates isolated git worktrees with smart directory selection and safety verification.',
        repo: 'https://github.com/obra/superpowers/blob/main/skills/using-git-worktrees/',
        category: 'development',
        isOfficial: false,
    },
    {
        name: 'finishing-a-development-branch',
        description: 'Guides completion of development work by presenting clear options and handling chosen workflow.',
        repo: 'https://github.com/obra/superpowers/tree/main/skills/finishing-a-development-branch',
        category: 'development',
        isOfficial: false,
    },
    {
        name: 'preserving-productive-tensions',
        description: 'Architectural skill for maintaining healthy tensions in codebases.',
        repo: 'https://github.com/obra/superpowers-skills/tree/main/skills/architecture/preserving-productive-tensions',
        category: 'development',
        isOfficial: false,
    },
    {
        name: 'pypict-claude-skill',
        description: 'Design comprehensive test cases using PICT for requirements or code, generating optimized test suites.',
        repo: 'https://github.com/omkamal/pypict-claude-skill',
        category: 'development',
        isOfficial: false,
    },
    {
        name: 'aws-skills',
        description: 'AWS development with CDK best practices, cost optimization MCP servers, and serverless patterns.',
        repo: 'https://github.com/zxkane/aws-skills',
        category: 'development',
        isOfficial: false,
    },
    {
        name: 'claude-starter',
        description: 'Production-ready config template with 40 auto-activating skills across 8 domains, TOON format support.',
        repo: 'https://github.com/raintree-technology/claude-starter',
        category: 'development',
        isOfficial: false,
    },
    {
        name: 'move-code-quality-skill',
        description: 'Analyzes Move language packages against the official Move Book Code Quality Checklist.',
        repo: 'https://github.com/1NickPappas/move-code-quality-skill',
        category: 'development',
        isOfficial: false,
    },
    {
        name: 'claude-code-terminal-title',
        description: 'Gives each Claude Code terminal window a dynamic title describing the current work.',
        repo: 'https://github.com/bluzername/claude-code-terminal-title',
        category: 'development',
        isOfficial: false,
    },

    // Data & Analysis
    {
        name: 'csv-data-summarizer-claude-skill',
        description: 'Automatically analyzes CSVs: columns, distributions, missing data, correlations.',
        repo: 'https://github.com/coffeefuelbump/csv-data-summarizer-claude-skill',
        category: 'data',
        isOfficial: false,
    },
    {
        name: 'postgres',
        description: 'Execute safe read-only SQL queries against PostgreSQL databases with multi-connection support.',
        repo: 'https://github.com/sanjay3290/ai-skills/tree/main/skills/postgres',
        category: 'data',
        isOfficial: false,
    },

    // Scientific & Research Tools
    {
        name: 'claude-scientific-skills',
        description: '125+ scientific skills for bioinformatics, cheminformatics, clinical research, and ML.',
        repo: 'https://github.com/K-Dense-AI/claude-scientific-skills',
        category: 'scientific',
        isOfficial: false,
    },
    {
        name: 'materials-simulation-skills',
        description: 'Skills for computational materials science: numerical stability, time-stepping, simulation validation.',
        repo: 'https://github.com/HeshamFS/materials-simulation-skills',
        category: 'scientific',
        isOfficial: false,
    },

    // Writing & Research
    {
        name: 'article-extractor',
        description: 'Extract full article text and metadata from web pages.',
        repo: 'https://github.com/michalparkola/tapestry-skills-for-claude-code/tree/main/article-extractor',
        category: 'writing',
        isOfficial: false,
    },
    {
        name: 'content-research-writer',
        description: 'Assists in writing high-quality content by conducting research, adding citations, improving hooks.',
        repo: 'https://github.com/ComposioHQ/awesome-claude-skills/tree/master/content-research-writer',
        category: 'writing',
        isOfficial: false,
    },
    {
        name: 'internal-comms',
        description: 'Create internal communications (status reports, leadership updates, newsletters, incident reports).',
        repo: 'https://github.com/anthropics/skills/tree/main/skills/internal-comms',
        category: 'writing',
        isOfficial: true,
    },
    {
        name: 'writing-plans',
        description: 'Create structured writing plans and outlines for documents.',
        repo: 'https://github.com/obra/superpowers/tree/main/skills/writing-plans',
        category: 'writing',
        isOfficial: false,
    },
    {
        name: 'writing-skills',
        description: 'Enhanced writing capabilities for various content types.',
        repo: 'https://github.com/obra/superpowers/tree/main/skills/writing-skills',
        category: 'writing',
        isOfficial: false,
    },
    {
        name: 'brainstorming',
        description: 'Transform rough ideas into fully-formed designs through structured questioning.',
        repo: 'https://github.com/obra/superpowers/tree/main/skills/brainstorming',
        category: 'writing',
        isOfficial: false,
    },
    {
        name: 'family-history-research',
        description: 'Provides assistance with planning family history and genealogy research projects.',
        repo: 'https://github.com/emaynard/claude-family-history-research-skill',
        category: 'writing',
        isOfficial: false,
    },

    // Learning & Knowledge
    {
        name: 'tapestry',
        description: 'Interlink and summarize related documents into knowledge networks.',
        repo: 'https://github.com/michalparkola/tapestry-skills-for-claude-code/tree/main/tapestry',
        category: 'learning',
        isOfficial: false,
    },
    {
        name: 'ship-learn-next',
        description: 'Skill to help iterate on what to build or learn next, based on feedback loops.',
        repo: 'https://github.com/michalparkola/tapestry-skills-for-claude-code/tree/main/ship-learn-next',
        category: 'learning',
        isOfficial: false,
    },
    {
        name: 'using-superpowers',
        description: 'Learn and effectively use the superpowers skill framework.',
        repo: 'https://github.com/obra/superpowers/tree/main/skills/using-superpowers',
        category: 'learning',
        isOfficial: false,
    },
    {
        name: 'collision-zone-thinking',
        description: 'Problem-solving through identifying and exploring collision zones between ideas.',
        repo: 'https://github.com/obra/superpowers-skills/tree/main/skills/problem-solving/collision-zone-thinking',
        category: 'learning',
        isOfficial: false,
    },
    {
        name: 'inversion-exercise',
        description: 'Problem-solving by inverting the problem to find solutions.',
        repo: 'https://github.com/obra/superpowers-skills/tree/main/skills/problem-solving/inversion-exercise',
        category: 'learning',
        isOfficial: false,
    },
    {
        name: 'meta-pattern-recognition',
        description: 'Recognize patterns across different domains and problems.',
        repo: 'https://github.com/obra/superpowers-skills/tree/main/skills/problem-solving/meta-pattern-recognition',
        category: 'learning',
        isOfficial: false,
    },
    {
        name: 'scale-game',
        description: 'Think through problems at different scales to find solutions.',
        repo: 'https://github.com/obra/superpowers-skills/tree/main/skills/problem-solving/scale-game',
        category: 'learning',
        isOfficial: false,
    },
    {
        name: 'simplification-cascades',
        description: 'Simplify complex problems through cascading reductions.',
        repo: 'https://github.com/obra/superpowers-skills/tree/main/skills/problem-solving/simplification-cascades',
        category: 'learning',
        isOfficial: false,
    },
    {
        name: 'tracing-knowledge-lineages',
        description: 'Research skill for tracing the origins and evolution of knowledge.',
        repo: 'https://github.com/obra/superpowers-skills/tree/main/skills/research/tracing-knowledge-lineages',
        category: 'learning',
        isOfficial: false,
    },

    // Media & Content
    {
        name: 'youtube-transcript',
        description: 'Fetch transcripts from YouTube videos and prepare summaries.',
        repo: 'https://github.com/michalparkola/tapestry-skills-for-claude-code/tree/main/youtube-transcript',
        category: 'media',
        isOfficial: false,
    },
    {
        name: 'video-downloader',
        description: 'Downloads videos from YouTube and other platforms for offline viewing or editing.',
        repo: 'https://github.com/ComposioHQ/awesome-claude-skills/tree/master/video-downloader',
        category: 'media',
        isOfficial: false,
    },
    {
        name: 'image-enhancer',
        description: 'Improves the quality of images, especially screenshots.',
        repo: 'https://github.com/ComposioHQ/awesome-claude-skills/tree/master/image-enhancer',
        category: 'media',
        isOfficial: false,
    },
    {
        name: 'imagen',
        description: 'Generate images using Google Gemini\'s image generation API for UI mockups and icons.',
        repo: 'https://github.com/sanjay3290/ai-skills/tree/main/skills/imagen',
        category: 'media',
        isOfficial: false,
    },
    {
        name: 'claude-epub-skill',
        description: 'Parse and analyze EPUB ebook contents for querying or summarizing.',
        repo: 'https://github.com/smerchek/claude-epub-skill',
        category: 'media',
        isOfficial: false,
    },

    // Collaboration & Project Management
    {
        name: 'git-pushing',
        description: 'Automate git operations and repository interactions.',
        repo: 'https://github.com/mhattingpete/claude-skills-marketplace/tree/main/engineering-workflow-plugin/skills/git-pushing',
        category: 'collaboration',
        isOfficial: false,
    },
    {
        name: 'linear-claude-skill',
        description: 'Manage Linear issues, projects, and teams with MCP tools, SDK scripts, and GraphQL.',
        repo: 'https://github.com/wrsmith108/linear-claude-skill',
        category: 'collaboration',
        isOfficial: false,
    },
    {
        name: 'linear-cli-skill',
        description: 'A skill teaching Claude how to use linear-CLI, meant to replace linear MCP.',
        repo: 'https://github.com/Valian/linear-cli-skill',
        category: 'collaboration',
        isOfficial: false,
    },
    {
        name: 'meeting-insights-analyzer',
        description: 'Transforms meeting transcripts into actionable insights about communication patterns.',
        repo: 'https://github.com/ComposioHQ/awesome-claude-skills/blob/master/meeting-insights-analyzer/',
        category: 'collaboration',
        isOfficial: false,
    },
    {
        name: 'review-implementing',
        description: 'Evaluate code implementation plans and align with specs.',
        repo: 'https://github.com/mhattingpete/claude-skills-marketplace/tree/main/engineering-workflow-plugin/skills/review-implementing',
        category: 'collaboration',
        isOfficial: false,
    },
    {
        name: 'test-fixing',
        description: 'Detect failing tests and propose patches or fixes.',
        repo: 'https://github.com/mhattingpete/claude-skills-marketplace/tree/main/engineering-workflow-plugin/skills/test-fixing',
        category: 'collaboration',
        isOfficial: false,
    },
    {
        name: 'receiving-code-review',
        description: 'Process and respond to code review feedback effectively.',
        repo: 'https://github.com/obra/superpowers/tree/main/skills/receiving-code-review',
        category: 'collaboration',
        isOfficial: false,
    },
    {
        name: 'requesting-code-review',
        description: 'Request and structure code review requests for teammates.',
        repo: 'https://github.com/obra/superpowers/tree/main/skills/requesting-code-review',
        category: 'collaboration',
        isOfficial: false,
    },
    {
        name: 'dispatching-parallel-agents',
        description: 'Coordinate and dispatch multiple parallel Claude agents for complex tasks.',
        repo: 'https://github.com/obra/superpowers/tree/main/skills/dispatching-parallel-agents',
        category: 'collaboration',
        isOfficial: false,
    },
    {
        name: 'remembering-conversations',
        description: 'Maintain context and memory across conversations.',
        repo: 'https://github.com/obra/superpowers-skills/tree/main/skills/collaboration/remembering-conversations',
        category: 'collaboration',
        isOfficial: false,
    },

    // Security & Web Testing
    {
        name: 'ffuf_claude_skill',
        description: 'Integrate Claude with FFUF (fuzzing) and analyze results for vulnerabilities.',
        repo: 'https://github.com/jthack/ffuf_claude_skill',
        category: 'security',
        isOfficial: false,
    },
    {
        name: 'systematic-debugging',
        description: 'Use when encountering any bug, test failure, or unexpected behavior, before proposing fixes.',
        repo: 'https://github.com/obra/superpowers/blob/main/skills/systematic-debugging',
        category: 'security',
        isOfficial: false,
    },
    {
        name: 'varlock-claude-skill',
        description: 'Secure environment variable management ensuring secrets never appear in Claude sessions.',
        repo: 'https://github.com/wrsmith108/varlock-claude-skill',
        category: 'security',
        isOfficial: false,
    },
    {
        name: 'webapp-testing',
        description: 'Toolkit for interacting with and testing local web applications using Playwright.',
        repo: 'https://github.com/anthropics/skills/tree/main/skills/webapp-testing',
        category: 'security',
        isOfficial: true,
    },
    {
        name: 'verification-before-completion',
        description: 'Verify work before marking tasks as complete.',
        repo: 'https://github.com/obra/superpowers/tree/main/skills/verification-before-completion',
        category: 'security',
        isOfficial: false,
    },
    // Utility & Automation
    {
        name: 'file-organizer',
        description: 'Intelligently organizes your files and folders across your computer.',
        repo: 'https://github.com/ComposioHQ/awesome-claude-skills/tree/master/file-organizer',
        category: 'utility',
        isOfficial: false,
    },
    {
        name: 'invoice-organizer',
        description: 'Automatically organizes invoices and receipts for tax preparation.',
        repo: 'https://github.com/ComposioHQ/awesome-claude-skills/blob/master/invoice-organizer/SKILL.md',
        category: 'utility',
        isOfficial: false,
    },
    {
        name: 'raffle-winner-picker',
        description: 'Run fair raffles and randomly pick winners.',
        repo: 'https://github.com/ComposioHQ/awesome-claude-skills/tree/master/raffle-winner-picker',
        category: 'utility',
        isOfficial: false,
    },
    {
        name: 'skill-creator',
        description: 'Template / helper to build new Claude skills.',
        repo: 'https://github.com/anthropics/skills/tree/main/skills/skill-creator',
        category: 'utility',
        isOfficial: true,
    },
    {
        name: 'template-skill',
        description: 'Minimal skeleton for a new skill project structure.',
        repo: 'https://github.com/anthropics/skills/tree/main/template',
        category: 'utility',
        isOfficial: true,
    },
    {
        name: 'gardening-skills-wiki',
        description: 'Maintain and update skills documentation wiki.',
        repo: 'https://github.com/obra/superpowers-skills/tree/main/skills/meta/gardening-skills-wiki',
        category: 'utility',
        isOfficial: false,
    },
    {
        name: 'pulling-updates-from-skills-repository',
        description: 'Keep skills up to date by pulling from remote repositories.',
        repo: 'https://github.com/obra/superpowers-skills/tree/main/skills/meta/pulling-updates-from-skills-repository',
        category: 'utility',
        isOfficial: false,
    },
    {
        name: 'notion-skills',
        description: 'Official Notion Skills for Claude - enhance Claude\'s ability to work with Notion.',
        repo: 'https://www.notion.so/notiondevs/Notion-Skills-for-Claude-28da4445d27180c7af1df7d8615723d0',
        category: 'utility',
        isOfficial: false,
    },
];
