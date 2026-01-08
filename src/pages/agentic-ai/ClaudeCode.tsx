import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft, Terminal, Copy, CheckCircle, Zap, Shield, Workflow,
    Code, ExternalLink, Keyboard, ChevronDown, ChevronRight,
    Play, Settings, Layers, Cpu, GitBranch, FileCode, Sparkles
} from 'lucide-react';
import { NeuralBackground } from '@/components/NeuralBackground';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SEO } from '@/components/SEO';

// --- Reusable Components ---

const CodeBlock = ({ code, title, language = "bash" }: { code: string; title?: string; language?: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="rounded-xl overflow-hidden border border-white/10 bg-black/60 my-4">
            {title && (
                <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                    <span className="text-xs font-mono text-slate-400">{title}</span>
                    <Button variant="ghost" size="sm" onClick={handleCopy} className="h-7 text-xs">
                        {copied ? <CheckCircle className="w-3 h-3 mr-1 text-green-400" /> : <Copy className="w-3 h-3 mr-1" />}
                        {copied ? 'Copied!' : 'Copy'}
                    </Button>
                </div>
            )}
            <pre className="p-4 overflow-x-auto text-sm">
                <code className={`language-${language} text-slate-300`}>{code}</code>
            </pre>
        </div>
    );
};

const SkillLevelTab = ({ level, label, color, isActive, onClick }: {
    level: number; label: string; color: string; isActive: boolean; onClick: () => void;
}) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${isActive
            ? `bg-${color}-500/20 border border-${color}-500 text-${color}-300`
            : 'bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10'
            }`}
    >
        <span className={`w-2 h-2 rounded-full bg-${color}-500`} />
        Level {level}: {label}
    </button>
);

const CommandRow = ({ command, description, example }: { command: string; description: string; example?: string }) => (
    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
        <td className="py-3 px-4 font-mono text-sm text-cyan-400">{command}</td>
        <td className="py-3 px-4 text-sm text-slate-400">{description}</td>
        {example && <td className="py-3 px-4 font-mono text-xs text-slate-500">{example}</td>}
    </tr>
);

const TipCard = ({ icon: Icon, title, tips, color }: { icon: any; title: string; tips: string[]; color: string }) => (
    <div className={`p-6 rounded-xl border border-${color}-500/20 bg-${color}-500/5`}>
        <div className={`flex items-center gap-3 mb-4 text-${color}-400`}>
            <Icon className="w-5 h-5" />
            <h4 className="font-bold">{title}</h4>
        </div>
        <ul className="space-y-2 text-sm text-slate-400">
            {tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                    <span className={`text-${color}-500 mt-1`}>•</span>
                    {tip}
                </li>
            ))}
        </ul>
    </div>
);

// --- Skill Level Content ---

const skillLevels = [
    {
        level: 1,
        label: 'Basics',
        color: 'green',
        content: {
            title: 'Getting Started with Claude Code',
            description: 'Essential commands to begin your journey with the AI-powered coding assistant.',
            sections: [
                {
                    title: 'Installation',
                    code: `# Install Claude Code globally
npm install -g @anthropic-ai/claude-code

# Or use the quick installer
curl -sL https://install.anthropic.com | sh

# Verify installation
claude --version

# Check installation health
claude doctor`
                },
                {
                    title: 'Launching Sessions',
                    code: `# Start interactive mode
claude

# Start with an initial prompt
claude "summarize this project"

# Continue your last conversation
claude -c

# Resume a specific session
claude -r "session-id" "continue my work"`
                },
                {
                    title: 'Essential Navigation',
                    code: `/help     # Show all available commands
/clear    # Reset conversation history
/config   # Open configuration panel
/exit     # Exit the REPL
/doctor   # Check system health`
                }
            ]
        }
    },
    {
        level: 2,
        label: 'Intermediate',
        color: 'yellow',
        content: {
            title: 'Configuration & Output Control',
            description: 'Fine-tune Claude Code behavior with model selection and output formatting.',
            sections: [
                {
                    title: 'Model Selection',
                    code: `# Switch to different Claude models
claude --model sonnet    # Use Sonnet (faster)
claude --model opus      # Use Opus (more capable)

# Specify exact model version
claude --model claude-sonnet-4-20250514`
                },
                {
                    title: 'Working Directories',
                    code: `# Add multiple project directories
claude --add-dir ../frontend ../backend ../shared

# This gives Claude context across your entire codebase`
                },
                {
                    title: 'Output Formatting',
                    code: `# JSON output for scripting
claude -p "analyze code" --output-format json

# Plain text output
claude -p "explain this" --output-format text

# Streaming JSON for real-time processing
claude -p "complex task" --output-format stream-json`
                },
                {
                    title: 'Session Control',
                    code: `# Limit conversation turns
claude -p --max-turns 3 "quick query"

# Enable verbose logging
claude --verbose

# Check session cost
/cos    # Shows total cost and duration`
                }
            ]
        }
    },
    {
        level: 3,
        label: 'Advanced',
        color: 'orange',
        content: {
            title: 'Tool Management & Permissions',
            description: 'Control what Claude can and cannot do with precise tool permissions.',
            sections: [
                {
                    title: 'Allow Specific Tools',
                    code: `# Whitelist only git and file operations
claude --allowedTools "Bash(git log:*)" "Bash(git diff:*)" "Write" "Read"

# Allow all git commands
claude --allowedTools "Bash(git:*)"`
                },
                {
                    title: 'Block Dangerous Commands',
                    code: `# Prevent destructive operations
claude --disallowedTools "Bash(rm:*)" "Bash(sudo:*)"

# Combine allow and disallow
claude --allowedTools "Bash(git:*)" "Write" \\
       --disallowedTools "Bash(rm:*)" "Bash(sudo:*)"`
                },
                {
                    title: 'Slash Commands',
                    code: `/compact [instructions]  # Summarize conversation
/clear                   # Reset context
/config                  # Configuration panel
/doctor                  # System health check
/cos                     # Cost and duration
/ide                     # IDE integrations`
                }
            ]
        }
    },
    {
        level: 4,
        label: 'Expert',
        color: 'red',
        content: {
            title: 'MCP & Advanced Integrations',
            description: 'Leverage Model Context Protocol and advanced piping for powerful workflows.',
            sections: [
                {
                    title: 'Model Context Protocol (MCP)',
                    code: `# Configure MCP servers
claude --mcp

# Access MCP via slash command
/mcp

# MCP enables external tool integrations`
                },
                {
                    title: 'Advanced Piping',
                    code: `# Analyze git history
git log --oneline | claude -p "summarize these commits"

# Debug error logs
cat error.log | claude -p "find the root cause"

# Understand project structure
ls -la | claude -p "explain this directory structure"

# Review code changes
git diff HEAD~5 | claude -p "review these changes"`
                },
                {
                    title: 'Programmatic Usage',
                    code: `# Machine-readable output for CI/CD
claude -p "analyze code" --output-format json

# Real-time streaming for large tasks
claude -p "refactor module" --output-format stream-json

# Quick single-turn queries
claude -p --max-turns 1 "quick question"`
                }
            ]
        }
    },
    {
        level: 5,
        label: 'Power User',
        color: 'blue',
        content: {
            title: 'Custom Commands & Workflows',
            description: 'Create reusable commands and optimize performance for complex projects.',
            sections: [
                {
                    title: 'Custom Slash Commands',
                    code: `# Create commands in .claude/commands/
# Example: .claude/commands/debug.md

# Then use them like built-in commands:
/debug    # Execute your debug workflow
/test     # Run your test suite
/deploy   # Your deployment process`
                },
                {
                    title: 'Performance Optimization',
                    code: `# Clear context between tasks
/clear

# Limit turns for focused queries
claude -p --max-turns 5 "specific task"

# Compact long conversations
/compact "keep only implementation details"

# Use explicit tool permissions
claude --allowedTools "Write" "Read" "Bash(npm:*)"`
                },
                {
                    title: 'Complex Tool Combinations',
                    code: `# Full-stack development setup
claude --add-dir ../frontend ../backend ../shared \\
       --allowedTools "Bash(git:*)" "Write" "Read" \\
       --disallowedTools "Bash(rm -rf:*)" \\
       --model opus`
                }
            ]
        }
    }
];

// --- Main Component ---

export default function ClaudeCodeDeepDive() {
    const [activeLevel, setActiveLevel] = useState(0);
    const [expandedSection, setExpandedSection] = useState<number | null>(null);

    const currentLevel = skillLevels[activeLevel];

    return (
        <div className="min-h-screen bg-black font-sans text-slate-200">
            <SEO
                title="Claude Code Mastery | Agentic AI"
                description="Master Claude Code from beginner to expert. Interactive guide covering installation, commands, tool management, MCP integrations, and power-user workflows."
                url="/agentic-ai/claude-code"
                type="article"
            />
            <Navigation />
            <NeuralBackground />

            {/* Hero */}
            <header className="pt-32 pb-16 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                    <Terminal size={400} className="text-cyan-500" />
                </div>
                <div className="max-w-5xl mx-auto relative z-10">
                    <Link to="/agentic-ai" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Agentic AI
                    </Link>

                    <div className="text-center">
                        <Badge variant="outline" className="mb-6 text-cyan-400 border-cyan-400/30 py-1.5 px-4 text-sm backdrop-blur-md">
                            <Terminal className="w-4 h-4 mr-2" />
                            AI-Powered Coding Agent
                        </Badge>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500">
                                Claude Code
                            </span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            Your AI pair programmer in the terminal. Master the commands, workflows, and integrations
                            that turn Claude into an unstoppable coding companion.
                        </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex flex-wrap justify-center gap-6 mt-12">
                        {[
                            { icon: Layers, label: '5 Skill Levels', value: 'Beginner → Expert' },
                            { icon: Code, label: '40+ Commands', value: 'CLI, Slash, Keyboard' },
                            { icon: Zap, label: 'MCP Support', value: 'External Integrations' },
                        ].map((stat, i) => (
                            <div key={i} className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                                <stat.icon className="w-5 h-5 text-cyan-400" />
                                <div>
                                    <div className="text-xs text-slate-500">{stat.label}</div>
                                    <div className="text-sm font-medium text-white">{stat.value}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 pb-24 relative z-20">

                {/* Quick Start */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <Play className="w-6 h-6 text-green-400" />
                        Quick Start
                    </h2>
                    <div className="bg-gradient-to-br from-green-500/10 to-cyan-500/5 border border-green-500/20 rounded-2xl p-6">
                        <CodeBlock
                            title="Get started in 30 seconds"
                            code={`# Install Claude Code
npm install -g @anthropic-ai/claude-code

# Launch interactive mode
claude

# Or start with a task
claude "explain this codebase"`}
                        />
                    </div>
                </section>

                {/* Skill Levels */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <Sparkles className="w-6 h-6 text-violet-400" />
                        Skill Levels
                    </h2>

                    {/* Level Tabs */}
                    <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto pb-2">
                        {skillLevels.map((level, idx) => (
                            <button
                                key={level.level}
                                onClick={() => setActiveLevel(idx)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeLevel === idx
                                    ? 'bg-cyan-500/20 border border-cyan-500 text-cyan-300'
                                    : 'bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10'
                                    }`}
                            >
                                <span className={`w-2 h-2 rounded-full ${activeLevel === idx ? 'bg-cyan-400' : 'bg-slate-600'}`} />
                                L{level.level}: {level.label}
                            </button>
                        ))}
                    </div>

                    {/* Level Content */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeLevel}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="bg-slate-900/50 border border-white/10 rounded-2xl p-6"
                        >
                            <h3 className="text-xl font-bold text-white mb-2">{currentLevel.content.title}</h3>
                            <p className="text-slate-400 mb-6">{currentLevel.content.description}</p>

                            <div className="space-y-4">
                                {currentLevel.content.sections.map((section, idx) => (
                                    <div key={idx} className="border border-white/5 rounded-xl overflow-hidden">
                                        <button
                                            onClick={() => setExpandedSection(expandedSection === idx ? null : idx)}
                                            className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors"
                                        >
                                            <span className="font-medium text-white">{section.title}</span>
                                            {expandedSection === idx ? (
                                                <ChevronDown className="w-5 h-5 text-slate-400" />
                                            ) : (
                                                <ChevronRight className="w-5 h-5 text-slate-400" />
                                            )}
                                        </button>
                                        <AnimatePresence>
                                            {expandedSection === idx && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <div className="p-4">
                                                        <CodeBlock code={section.code} />
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </section>

                {/* Command Reference */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <FileCode className="w-6 h-6 text-orange-400" />
                        Command Reference
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* CLI Commands */}
                        <div className="bg-slate-900/50 border border-white/10 rounded-xl overflow-hidden">
                            <div className="p-4 bg-white/5 border-b border-white/10">
                                <h3 className="font-bold text-white flex items-center gap-2">
                                    <Terminal className="w-4 h-4 text-cyan-400" />
                                    CLI Commands
                                </h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <tbody>
                                        <CommandRow command="claude" description="Start interactive REPL" />
                                        <CommandRow command='claude "query"' description="Start with initial prompt" />
                                        <CommandRow command="claude -p" description="Print mode (execute & exit)" />
                                        <CommandRow command="claude -c" description="Continue last conversation" />
                                        <CommandRow command="claude -r ID" description="Resume specific session" />
                                        <CommandRow command="claude update" description="Update to latest version" />
                                        <CommandRow command="claude doctor" description="Check installation health" />
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Slash Commands */}
                        <div className="bg-slate-900/50 border border-white/10 rounded-xl overflow-hidden">
                            <div className="p-4 bg-white/5 border-b border-white/10">
                                <h3 className="font-bold text-white flex items-center gap-2">
                                    <Code className="w-4 h-4 text-violet-400" />
                                    Slash Commands
                                </h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <tbody>
                                        <CommandRow command="/help" description="Show available commands" />
                                        <CommandRow command="/clear" description="Reset conversation" />
                                        <CommandRow command="/compact" description="Summarize & compress context" />
                                        <CommandRow command="/config" description="Open configuration" />
                                        <CommandRow command="/doctor" description="System health check" />
                                        <CommandRow command="/cos" description="Show cost & duration" />
                                        <CommandRow command="/mcp" description="MCP server management" />
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* CLI Flags */}
                        <div className="bg-slate-900/50 border border-white/10 rounded-xl overflow-hidden">
                            <div className="p-4 bg-white/5 border-b border-white/10">
                                <h3 className="font-bold text-white flex items-center gap-2">
                                    <Settings className="w-4 h-4 text-green-400" />
                                    CLI Flags
                                </h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <tbody>
                                        <CommandRow command="--model" description="Select Claude model" />
                                        <CommandRow command="--add-dir" description="Add working directories" />
                                        <CommandRow command="--allowedTools" description="Whitelist specific tools" />
                                        <CommandRow command="--disallowedTools" description="Block dangerous tools" />
                                        <CommandRow command="--output-format" description="json, text, stream-json" />
                                        <CommandRow command="--max-turns" description="Limit conversation turns" />
                                        <CommandRow command="--verbose" description="Enable detailed logging" />
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Keyboard Shortcuts */}
                        <div className="bg-slate-900/50 border border-white/10 rounded-xl overflow-hidden">
                            <div className="p-4 bg-white/5 border-b border-white/10">
                                <h3 className="font-bold text-white flex items-center gap-2">
                                    <Keyboard className="w-4 h-4 text-pink-400" />
                                    Keyboard Shortcuts
                                </h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <tbody>
                                        <CommandRow command="Ctrl+C" description="Cancel current operation" />
                                        <CommandRow command="Ctrl+D" description="Exit Claude Code" />
                                        <CommandRow command="Tab" description="Auto-complete" />
                                        <CommandRow command="↑ / ↓" description="Navigate command history" />
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Best Practices */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <Zap className="w-6 h-6 text-yellow-400" />
                        Best Practices
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        <TipCard
                            icon={Cpu}
                            title="Performance"
                            color="green"
                            tips={[
                                "Use /clear frequently between tasks",
                                "Limit context with --max-turns",
                                "Compact long conversations with /compact",
                                "Be explicit with --allowedTools"
                            ]}
                        />
                        <TipCard
                            icon={Shield}
                            title="Security"
                            color="red"
                            tips={[
                                "Avoid --dangerously-skip-permissions",
                                "Block risky commands with --disallowedTools",
                                "Review tool permissions regularly",
                                "Keep Claude Code updated"
                            ]}
                        />
                        <TipCard
                            icon={Workflow}
                            title="Workflow"
                            color="blue"
                            tips={[
                                "Create custom commands in .claude/commands/",
                                "Use --output-format json for automation",
                                "Pipe commands for complex workflows",
                                "Use session IDs for long tasks"
                            ]}
                        />
                    </div>
                </section>

                {/* Resources */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <ExternalLink className="w-6 h-6 text-cyan-400" />
                        Resources
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4">
                        <a
                            href="https://docs.anthropic.com/en/docs/claude-code"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 bg-slate-900 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all group"
                        >
                            <div className="p-3 bg-cyan-500/10 rounded-lg">
                                <ExternalLink className="w-5 h-5 text-cyan-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors">Official Documentation</h4>
                                <p className="text-xs text-slate-500">Anthropic's Claude Code docs</p>
                            </div>
                        </a>
                        <a
                            href="https://github.com/anthropics/claude-code"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 bg-slate-900 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all group"
                        >
                            <div className="p-3 bg-violet-500/10 rounded-lg">
                                <GitBranch className="w-5 h-5 text-violet-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors">GitHub Repository</h4>
                                <p className="text-xs text-slate-500">Source code and issues</p>
                            </div>
                        </a>
                    </div>
                </section>

                {/* CTA */}
                <div className="text-center pt-12 border-t border-white/10">
                    <Link to="/agentic-ai">
                        <Button variant="outline" className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Agentic AI
                        </Button>
                    </Link>
                </div>

            </main>

            <Footer />
        </div>
    );
}
