import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft, Terminal, Copy, CheckCircle, Zap, Shield, Workflow,
    Code, ExternalLink, Keyboard, ChevronDown, ChevronRight,
    Play, Settings, Layers, Cpu, GitBranch, FileCode, Sparkles,
    AlertTriangle, Users, Lock, Activity, Database, Wrench,
    Monitor, Globe, Rocket, Target, BookOpen
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

const CommandRow = ({ command, description, example }: { command: string; description: string; example?: string }) => (
    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
        <td className="py-3 px-4 font-mono text-sm text-cyan-400">{command}</td>
        <td className="py-3 px-4 text-sm text-slate-400">{description}</td>
        {example && <td className="py-3 px-4 font-mono text-xs text-slate-500">{example}</td>}
    </tr>
);

const TipCard = ({ icon: Icon, title, tips, color }: { icon: any; title: string; tips: string[]; color: string }) => (
    <div className={`p-6 rounded-xl border border-white/10 bg-slate-900/50`}>
        <div className={`flex items-center gap-3 mb-4 text-${color}-400`}>
            <div className={`p-2 rounded-lg bg-${color}-500/10`}>
                <Icon className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white">{title}</h4>
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

const LevelHeader = ({ level, label, color, icon: Icon, description }: {
    level: number; label: string; color: string; icon: any; description: string;
}) => (
    <div className={`flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-${color}-500/10 to-transparent border-l-4 border-${color}-500`}>
        <div className={`p-3 rounded-xl bg-${color}-500/20`}>
            <Icon className={`w-6 h-6 text-${color}-400`} />
        </div>
        <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                Level {level}: {label}
            </h3>
            <p className="text-sm text-slate-400">{description}</p>
        </div>
    </div>
);

// --- All 10 Skill Levels ---

const allSkillLevels = [
    {
        level: 1,
        label: 'Basic Commands',
        color: 'green',
        icon: Play,
        description: 'Essential commands to get started',
        sections: [
            {
                title: 'Installation & Getting Started',
                code: `# Install Claude Code
curl -sL https://install.anthropic.com | sh

# Or via npm
npm install -g @anthropic-ai/claude-code

# Start interactive REPL
claude

# Start with initial prompt
claude "summarize this project"

# Check version
claude --version

# Update to latest version
claude update`
            },
            {
                title: 'Basic Navigation',
                code: `/help     # Show help and available commands
/exit     # Exit the REPL
/clear    # Clear conversation history
/config   # Open config panel
/doctor   # Check Claude Code installation health`
            },
            {
                title: 'Basic File Operations',
                code: `# Print mode (SDK) - execute and exit
claude -p "explain this function"

# Process piped content
cat logs.txt | claude -p "explain"

# Continue most recent conversation
claude -c

# Continue via SDK
claude -c -p "Check for type errors"`
            },
            {
                title: 'Session Management',
                code: `# Resume session by ID
claude -r "abc123" "Finish this PR"

# Resume with flag
claude --resume abc123 "query"

# Continue session
claude --continue`
            },
            {
                title: 'Keyboard Shortcuts',
                code: `Ctrl+C    # Cancel current operation
Ctrl+D    # Exit Claude Code
Tab       # Auto-complete
Up/Down   # Navigate command history`
            }
        ]
    },
    {
        level: 2,
        label: 'Intermediate Commands',
        color: 'yellow',
        icon: Settings,
        description: 'Configuration and model management',
        sections: [
            {
                title: 'Model Configuration',
                code: `# Switch models
claude --model sonnet                    # Use Sonnet model
claude --model opus                      # Use Opus model
claude --model claude-sonnet-4-20250514  # Use specific version`
            },
            {
                title: 'Directory Management',
                code: `# Add additional working directories
claude --add-dir ../apps ../lib

# Validate directory paths
claude --add-dir /path/to/project`
            },
            {
                title: 'Output Formatting',
                code: `# Different output formats
claude -p "query" --output-format json
claude -p "query" --output-format text
claude -p "query" --output-format stream-json

# Input formatting
claude -p --input-format stream-json`
            },
            {
                title: 'Session Control',
                code: `# Limit conversation turns
claude -p --max-turns 3 "query"

# Verbose logging
claude --verbose

# Session cost and duration
/cos    # Show total cost and duration`
            }
        ]
    },
    {
        level: 3,
        label: 'Advanced Commands',
        color: 'orange',
        icon: Shield,
        description: 'Tools and permission management',
        sections: [
            {
                title: 'Tool Management',
                code: `# Allow specific tools without prompting
claude --allowedTools "Bash(git log:*)" "Bash(git diff:*)" "Write"

# Disallow specific tools
claude --disallowedTools "Bash(rm:*)" "Bash(sudo:*)"

# Prompt for specific tool permission
claude -p --permission-prompt-tool mcp_auth_tool "query"

# Skip all permission prompts (dangerous)
claude --dangerously-skip-permissions`
            },
            {
                title: 'Slash Commands - Session Management',
                code: `/compact [instructions]  # Summarize conversation with optional focus
/clear                   # Reset conversation history and context
/exit                    # Exit the REPL
/help                    # Show available commands
/config                  # Open configuration panel`
            },
            {
                title: 'Slash Commands - System',
                code: `/doctor   # Check installation health
/cos      # Show cost and duration of current session
/ide      # Manage IDE integrations`
            }
        ]
    },
    {
        level: 4,
        label: 'Expert Commands',
        color: 'red',
        icon: Cpu,
        description: 'MCP and advanced integrations',
        sections: [
            {
                title: 'Model Context Protocol (MCP)',
                code: `# Configure MCP servers
claude --mcp

# MCP server management (via slash commands)
/mcp

# Access MCP functionality for external tools`
            },
            {
                title: 'Advanced Piping',
                code: `# Complex piping operations
git log --oneline | claude -p "summarize these commits"

cat error.log | claude -p "find the root cause"

ls -la | claude -p "explain this directory structure"

git diff HEAD~5 | claude -p "review these changes"`
            },
            {
                title: 'Programmatic Usage',
                code: `# JSON output for scripting
claude -p "analyze code" --output-format json

# Stream JSON for real-time processing
claude -p "large task" --output-format stream-json

# Batch processing
claude -p --max-turns 1 "quick query"`
            }
        ]
    },
    {
        level: 5,
        label: 'Power User Commands',
        color: 'blue',
        icon: Zap,
        description: 'Advanced workflows and automation',
        sections: [
            {
                title: 'Custom Slash Commands',
                code: `# Create custom commands in .claude/commands/
# Example: .claude/commands/debug.md

/debug    # Execute custom debug command
/test     # Execute custom test command
/deploy   # Execute custom deploy command`
            },
            {
                title: 'Complex Tool Combinations',
                code: `# Advanced tool permissions
claude --allowedTools "Bash(git:*)" "Write" "Read" \\
       --disallowedTools "Bash(rm:*)" "Bash(sudo:*)"

# Multiple directory access
claude --add-dir ../frontend ../backend ../shared`
            },
            {
                title: 'Performance Optimization',
                code: `# Limit context for performance
claude -p --max-turns 5 "focused query"

# Clear context frequently
/clear    # Use between tasks for better performance

# Compact conversations
/compact "keep only important parts"`
            }
        ]
    },
    {
        level: 6,
        label: 'Master Commands',
        color: 'violet',
        icon: Sparkles,
        description: 'Expert automation and custom workflows',
        sections: [
            {
                title: 'Advanced Configuration',
                code: `# Complex model and tool configuration
claude --model claude-sonnet-4-20250514 \\
       --add-dir ../apps ../lib ../tools \\
       --allowedTools "Bash(git:*)" "Write" "Read" \\
       --verbose \\
       --output-format json`
            },
            {
                title: 'Automation Scripts',
                code: `# Scripted Claude interactions
#!/bin/bash
claude -p "analyze codebase" --output-format json > analysis.json
claude -p "generate tests" --max-turns 3 --output-format text > tests.txt`
            },
            {
                title: 'Advanced Session Management',
                code: `# Session ID management
SESSION_ID=$(claude -p "start analysis" --output-format json | jq -r '.session_id')
claude -r "$SESSION_ID" "continue analysis"`
            },
            {
                title: 'Complex Workflows',
                code: `# Multi-step automation
claude -p "analyze project structure" | \\
       claude -p "suggest improvements" | \\
       claude -p "create implementation plan"`
            }
        ]
    },
    {
        level: 7,
        label: 'Workflow Automation',
        color: 'amber',
        icon: Workflow,
        description: 'Advanced automation patterns and multi-step processes',
        sections: [
            {
                title: 'Automated Code Review Workflows',
                code: `# Automated PR review process
#!/bin/bash
git diff HEAD~1 | claude -p "review this PR for security issues" > security_review.md
git diff HEAD~1 | claude -p "check for performance issues" > performance_review.md
git diff HEAD~1 | claude -p "suggest improvements" > improvements.md`
            },
            {
                title: 'Continuous Integration Integration',
                code: `# CI/CD pipeline integration
claude -p "analyze test coverage" --output-format json | jq '.coverage_percentage'
claude -p "generate release notes from commits" --max-turns 2 > RELEASE_NOTES.md`
            },
            {
                title: 'Batch Processing Workflows',
                code: `# Process multiple files
find . -name "*.js" -exec claude -p "analyze this file for bugs: {}" \\; > bug_report.txt

# Automated documentation generation
for file in src/*.py; do
    claude -p "generate docstring for $file" --output-format text >> docs.md
done`
            }
        ]
    },
    {
        level: 8,
        label: 'Integration & Ecosystem',
        color: 'slate',
        icon: Globe,
        description: 'IDE integrations, Git workflows, and third-party tool connections',
        sections: [
            {
                title: 'IDE Integration Commands',
                code: `/ide vscode     # Configure VS Code integration
/ide configure  # Setup IDE configurations

# Custom IDE commands
claude --ide-mode "explain selected code"
claude --ide-mode "refactor this function"`
            },
            {
                title: 'Git Workflow Integration',
                code: `# Git hooks integration
claude -p "create pre-commit hook for code quality" > .git/hooks/pre-commit

# Advanced Git operations
git log --oneline -10 | claude -p "create changelog from these commits"
git diff --name-only | claude -p "explain what changed in this commit"`
            },
            {
                title: 'Third-Party Tool Connections',
                code: `# Database integration
mysql -e "SHOW TABLES" | claude -p "analyze database structure"

# Docker integration
docker ps | claude -p "analyze running containers"
docker logs container_name | claude -p "find errors in logs"`
            }
        ]
    },
    {
        level: 9,
        label: 'Performance & Optimization',
        color: 'emerald',
        icon: Activity,
        description: 'Advanced performance tuning and resource management',
        sections: [
            {
                title: 'Memory & Resource Management',
                code: `# Optimize memory usage
claude -p --max-turns 1 "quick analysis"     # Single turn for efficiency
claude -p --compact-mode "analyze with minimal context"

# Resource monitoring
/cos              # Check current session costs
/doctor --performance  # Performance diagnostics`
            },
            {
                title: 'Caching & Optimization',
                code: `# Efficient session reuse
claude -c "continue previous analysis"   # Reuse existing context
claude --cache-results "repetitive task"  # Cache common operations

# Parallel processing
claude -p "task 1" & claude -p "task 2" & wait  # Parallel execution`
            },
            {
                title: 'Large-Scale Processing',
                code: `# Handle large codebases efficiently
claude --add-dir . --max-context 50000 "analyze entire project"
claude --stream-output "process large dataset" | head -100`
            }
        ]
    },
    {
        level: 10,
        label: 'Enterprise & Production',
        color: 'rose',
        icon: Lock,
        description: 'Production-ready configurations, team workflows, and enterprise features',
        sections: [
            {
                title: 'Team Collaboration',
                code: `# Shared team configurations
claude --config-file team-config.json "standardized analysis"

# Team session sharing
claude -r "team-session-id" "continue team discussion"`
            },
            {
                title: 'Production Environment Setup',
                code: `# Production-ready configuration
claude --production-mode \\
       --security-enabled \\
       --audit-logging \\
       --max-turns 10 \\
       "production analysis"`
            },
            {
                title: 'Enterprise Security',
                code: `# Security-focused operations
claude --disallowedTools "Bash(rm:*)" "Bash(sudo:*)" "Bash(chmod:*)" \\
       --audit-mode \\
       --no-external-calls \\
       "secure code review"`
            },
            {
                title: 'Monitoring & Compliance',
                code: `# Audit and compliance
claude --audit-log /var/log/claude-audit.log "compliance check"
claude --compliance-mode "analyze for security compliance"`
            }
        ]
    }
];

// --- Main Component ---

export default function ClaudeCodeDeepDive() {
    const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});
    const [activeTab, setActiveTab] = useState<'levels' | 'reference' | 'tips'>('levels');

    const toggleSection = (key: string) => {
        setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const expandAll = () => {
        const all: { [key: string]: boolean } = {};
        allSkillLevels.forEach((level, li) => {
            level.sections.forEach((_, si) => {
                all[`${li}-${si}`] = true;
            });
        });
        setExpandedSections(all);
    };

    const collapseAll = () => {
        setExpandedSections({});
    };

    return (
        <div className="min-h-screen bg-black font-sans text-slate-200">
            <SEO
                title="Claude Code Mastery | Complete Command Reference"
                description="The ultimate Claude Code guide: 10 skill levels, 100+ commands, automation workflows, enterprise features. Master AI-powered coding from beginner to expert."
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
                <div className="max-w-6xl mx-auto relative z-10">
                    <Link to="/agentic-ai" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Agentic AI
                    </Link>

                    <div className="text-center">
                        <Badge variant="outline" className="mb-6 text-cyan-400 border-cyan-400/30 py-1.5 px-4 text-sm backdrop-blur-md">
                            <Terminal className="w-4 h-4 mr-2" />
                            Complete Command Reference
                        </Badge>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500">
                                Claude Code
                            </span>
                            <span className="block text-3xl md:text-4xl text-white/80 mt-2">Mastery Guide</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            Your complete guide to mastering Claude Code — from zero to hero.
                            10 skill levels, 100+ commands, automation workflows, and enterprise features.
                        </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex flex-wrap justify-center gap-4 mt-12">
                        {[
                            { icon: Layers, label: '10 Skill Levels', color: 'cyan' },
                            { icon: Code, label: '100+ Commands', color: 'violet' },
                            { icon: Workflow, label: 'Automation Workflows', color: 'green' },
                            { icon: Lock, label: 'Enterprise Features', color: 'rose' },
                        ].map((stat, i) => (
                            <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                                <stat.icon className={`w-4 h-4 text-${stat.color}-400`} />
                                <span className="text-sm font-medium text-white">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 pb-24 relative z-20">

                {/* Quick Start */}
                <section className="mb-16">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                            <Rocket className="w-6 h-6 text-green-400" />
                            Quick Start
                        </h2>
                    </div>
                    <div className="bg-gradient-to-br from-green-500/10 to-cyan-500/5 border border-green-500/20 rounded-2xl p-6">
                        <CodeBlock
                            title="Get started in 30 seconds"
                            code={`# Install Claude Code
npm install -g @anthropic-ai/claude-code

# Launch interactive mode
claude

# Or start with a task
claude "explain this codebase"

# Check installation health
claude doctor`}
                        />
                    </div>
                </section>

                {/* Tab Navigation */}
                <div className="flex gap-2 mb-8 p-1 bg-white/5 rounded-xl w-fit">
                    {[
                        { id: 'levels', label: 'Skill Levels', icon: Layers },
                        { id: 'reference', label: 'Command Reference', icon: FileCode },
                        { id: 'tips', label: 'Best Practices', icon: Target },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                                ? 'bg-cyan-500/20 text-cyan-300'
                                : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                    {activeTab === 'levels' && (
                        <motion.div
                            key="levels"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            {/* Expand/Collapse Controls */}
                            <div className="flex gap-2 mb-6">
                                <Button variant="outline" size="sm" onClick={expandAll} className="text-xs">
                                    Expand All
                                </Button>
                                <Button variant="outline" size="sm" onClick={collapseAll} className="text-xs">
                                    Collapse All
                                </Button>
                            </div>

                            {/* All Skill Levels */}
                            <div className="space-y-8">
                                {allSkillLevels.map((level, levelIdx) => (
                                    <div key={level.level} className="bg-slate-900/30 border border-white/5 rounded-2xl overflow-hidden">
                                        <LevelHeader
                                            level={level.level}
                                            label={level.label}
                                            color={level.color}
                                            icon={level.icon}
                                            description={level.description}
                                        />

                                        <div className="p-4 space-y-3">
                                            {level.sections.map((section, sectionIdx) => {
                                                const key = `${levelIdx}-${sectionIdx}`;
                                                const isExpanded = expandedSections[key];

                                                return (
                                                    <div key={sectionIdx} className="border border-white/5 rounded-xl overflow-hidden">
                                                        <button
                                                            onClick={() => toggleSection(key)}
                                                            className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors"
                                                        >
                                                            <span className="font-medium text-white">{section.title}</span>
                                                            {isExpanded ? (
                                                                <ChevronDown className="w-5 h-5 text-slate-400" />
                                                            ) : (
                                                                <ChevronRight className="w-5 h-5 text-slate-400" />
                                                            )}
                                                        </button>
                                                        <AnimatePresence>
                                                            {isExpanded && (
                                                                <motion.div
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: 'auto', opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    transition={{ duration: 0.2 }}
                                                                >
                                                                    <div className="p-4 bg-black/20">
                                                                        <CodeBlock code={section.code} />
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'reference' && (
                        <motion.div
                            key="reference"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-8"
                        >
                            {/* CLI Commands Table */}
                            <div className="bg-slate-900/50 border border-white/10 rounded-xl overflow-hidden">
                                <div className="p-4 bg-white/5 border-b border-white/10">
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                        <Terminal className="w-5 h-5 text-cyan-400" />
                                        CLI Commands
                                    </h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-white/10 bg-white/5">
                                                <th className="py-3 px-4 text-left text-white font-medium">Command</th>
                                                <th className="py-3 px-4 text-left text-white font-medium">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <CommandRow command="claude" description="Start interactive REPL" />
                                            <CommandRow command='claude "query"' description="Start with initial prompt" />
                                            <CommandRow command="claude -p" description="Print mode (execute & exit)" />
                                            <CommandRow command="claude -c" description="Continue last conversation" />
                                            <CommandRow command='claude -r "id" "query"' description="Resume specific session" />
                                            <CommandRow command="claude update" description="Update to latest version" />
                                            <CommandRow command="claude doctor" description="Check installation health" />
                                            <CommandRow command="claude mcp" description="Configure MCP servers" />
                                            <CommandRow command="claude --version" description="Show version number" />
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* CLI Flags Table */}
                            <div className="bg-slate-900/50 border border-white/10 rounded-xl overflow-hidden">
                                <div className="p-4 bg-white/5 border-b border-white/10">
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                        <Settings className="w-5 h-5 text-green-400" />
                                        CLI Flags
                                    </h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-white/10 bg-white/5">
                                                <th className="py-3 px-4 text-left text-white font-medium">Flag</th>
                                                <th className="py-3 px-4 text-left text-white font-medium">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <CommandRow command="--model" description="Select Claude model (sonnet, opus)" />
                                            <CommandRow command="--add-dir" description="Add working directories" />
                                            <CommandRow command="--allowedTools" description="Whitelist specific tools" />
                                            <CommandRow command="--disallowedTools" description="Block dangerous tools" />
                                            <CommandRow command="--output-format" description="Output format (json, text, stream-json)" />
                                            <CommandRow command="--input-format" description="Input format (stream-json)" />
                                            <CommandRow command="--max-turns" description="Limit conversation turns" />
                                            <CommandRow command="--verbose" description="Enable detailed logging" />
                                            <CommandRow command="--continue" description="Continue previous session" />
                                            <CommandRow command="--resume" description="Resume specific session by ID" />
                                            <CommandRow command="--dangerously-skip-permissions" description="Skip permission prompts (dangerous!)" />
                                            <CommandRow command="--permission-prompt-tool" description="Prompt for specific tool permission" />
                                            <CommandRow command="--mcp" description="Configure MCP servers" />
                                            <CommandRow command="--ide-mode" description="IDE integration mode" />
                                            <CommandRow command="--config-file" description="Use custom config file" />
                                            <CommandRow command="--production-mode" description="Production-ready mode" />
                                            <CommandRow command="--security-enabled" description="Enable security features" />
                                            <CommandRow command="--audit-logging" description="Enable audit logging" />
                                            <CommandRow command="--audit-mode" description="Enable audit mode" />
                                            <CommandRow command="--audit-log" description="Specify audit log path" />
                                            <CommandRow command="--no-external-calls" description="Block external API calls" />
                                            <CommandRow command="--compliance-mode" description="Compliance checking mode" />
                                            <CommandRow command="--compact-mode" description="Minimal context mode" />
                                            <CommandRow command="--cache-results" description="Cache operation results" />
                                            <CommandRow command="--stream-output" description="Stream output for large tasks" />
                                            <CommandRow command="--max-context" description="Set max context size" />
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Slash Commands Table */}
                            <div className="bg-slate-900/50 border border-white/10 rounded-xl overflow-hidden">
                                <div className="p-4 bg-white/5 border-b border-white/10">
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                        <Code className="w-5 h-5 text-violet-400" />
                                        Slash Commands
                                    </h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-white/10 bg-white/5">
                                                <th className="py-3 px-4 text-left text-white font-medium">Command</th>
                                                <th className="py-3 px-4 text-left text-white font-medium">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <CommandRow command="/help" description="Show available commands" />
                                            <CommandRow command="/exit" description="Exit the REPL" />
                                            <CommandRow command="/clear" description="Reset conversation history" />
                                            <CommandRow command="/compact [instructions]" description="Summarize & compress context" />
                                            <CommandRow command="/config" description="Open configuration panel" />
                                            <CommandRow command="/doctor" description="Check installation health" />
                                            <CommandRow command="/doctor --performance" description="Performance diagnostics" />
                                            <CommandRow command="/cos" description="Show session cost & duration" />
                                            <CommandRow command="/ide" description="Manage IDE integrations" />
                                            <CommandRow command="/ide vscode" description="Configure VS Code integration" />
                                            <CommandRow command="/ide configure" description="Setup IDE configurations" />
                                            <CommandRow command="/mcp" description="MCP server management" />
                                            <CommandRow command="/debug" description="Custom debug command (user-defined)" />
                                            <CommandRow command="/test" description="Custom test command (user-defined)" />
                                            <CommandRow command="/deploy" description="Custom deploy command (user-defined)" />
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Keyboard Shortcuts Table */}
                            <div className="bg-slate-900/50 border border-white/10 rounded-xl overflow-hidden">
                                <div className="p-4 bg-white/5 border-b border-white/10">
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                        <Keyboard className="w-5 h-5 text-pink-400" />
                                        Keyboard Shortcuts
                                    </h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-white/10 bg-white/5">
                                                <th className="py-3 px-4 text-left text-white font-medium">Shortcut</th>
                                                <th className="py-3 px-4 text-left text-white font-medium">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <CommandRow command="Ctrl+C" description="Cancel current operation" />
                                            <CommandRow command="Ctrl+D" description="Exit Claude Code" />
                                            <CommandRow command="Tab" description="Auto-complete" />
                                            <CommandRow command="↑ / ↓" description="Navigate command history" />
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'tips' && (
                        <motion.div
                            key="tips"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-8"
                        >
                            {/* Best Practices Grid */}
                            <div className="grid md:grid-cols-3 gap-6">
                                <TipCard
                                    icon={Cpu}
                                    title="Performance Tips"
                                    color="green"
                                    tips={[
                                        "Use /clear frequently between tasks",
                                        "Limit context with --max-turns",
                                        "Compact long conversations with /compact",
                                        "Be explicit with --allowedTools",
                                        "Use Ctrl+C to cancel long-running operations",
                                        "Cache common operations for better performance"
                                    ]}
                                />
                                <TipCard
                                    icon={Shield}
                                    title="Security Tips"
                                    color="red"
                                    tips={[
                                        "Avoid --dangerously-skip-permissions",
                                        "Block risky commands with --disallowedTools",
                                        "Review tool permissions regularly",
                                        "Keep Claude Code updated",
                                        "Enable audit logging in production",
                                        "Use --security-enabled for sensitive operations"
                                    ]}
                                />
                                <TipCard
                                    icon={Workflow}
                                    title="Workflow Tips"
                                    color="blue"
                                    tips={[
                                        "Create custom commands in .claude/commands/",
                                        "Use --output-format json for automation",
                                        "Pipe commands for complex workflows",
                                        "Use session IDs for long-running tasks",
                                        "Create templates for common automation patterns",
                                        "Document custom workflows for team sharing"
                                    ]}
                                />
                            </div>

                            {/* Pro Tips by Level */}
                            <div className="grid md:grid-cols-3 gap-6">
                                <TipCard
                                    icon={Play}
                                    title="Beginner Tips (L1-3)"
                                    color="cyan"
                                    tips={[
                                        "Start with basic commands and gradually progress",
                                        "Use /help frequently to discover new features",
                                        "Practice with simple queries before complex ones",
                                        "Keep sessions focused with /clear between tasks"
                                    ]}
                                />
                                <TipCard
                                    icon={Zap}
                                    title="Intermediate Tips (L4-6)"
                                    color="violet"
                                    tips={[
                                        "Master tool permissions for security",
                                        "Use JSON output for automation scripts",
                                        "Learn MCP for advanced integrations",
                                        "Create custom slash commands for repeated tasks"
                                    ]}
                                />
                                <TipCard
                                    icon={Rocket}
                                    title="Advanced Tips (L7-10)"
                                    color="rose"
                                    tips={[
                                        "Implement automated workflows for repetitive tasks",
                                        "Use enterprise features for team collaboration",
                                        "Monitor performance and optimize resource usage",
                                        "Follow security best practices in production"
                                    ]}
                                />
                            </div>

                            {/* Troubleshooting */}
                            <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                    <Wrench className="w-6 h-6 text-amber-400" />
                                    Troubleshooting Common Issues
                                </h3>

                                <div className="grid md:grid-cols-3 gap-6">
                                    <div>
                                        <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                                            <AlertTriangle className="w-4 h-4 text-amber-400" />
                                            Installation Issues
                                        </h4>
                                        <CodeBlock code={`# Check installation
claude --version
claude doctor

# Reinstall if needed
npm uninstall -g @anthropic-ai/claude-code
npm install -g @anthropic-ai/claude-code`} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                                            <Activity className="w-4 h-4 text-amber-400" />
                                            Performance Issues
                                        </h4>
                                        <CodeBlock code={`# Clear context for better performance
/clear

# Limit context size
claude -p --max-turns 3 "focused query"

# Use compact mode
/compact "keep only essentials"`} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                                            <Lock className="w-4 h-4 text-amber-400" />
                                            Permission Issues
                                        </h4>
                                        <CodeBlock code={`# Check current permissions
claude --list-permissions

# Reset permissions
claude --reset-permissions

# Configure specific permissions
claude --allowedTools "Bash(git:*)" \\
       --disallowedTools "Bash(rm:*)"`} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Resources */}
                <section className="mt-16">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <BookOpen className="w-6 h-6 text-cyan-400" />
                        Resources
                    </h2>

                    <div className="grid md:grid-cols-3 gap-4">
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
                                <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors">Official Docs</h4>
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
                                <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors">GitHub Repo</h4>
                                <p className="text-xs text-slate-500">Source code and issues</p>
                            </div>
                        </a>
                        <a
                            href="https://github.com/Njengah/claude-code-cheat-sheet"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 bg-slate-900 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all group"
                        >
                            <div className="p-3 bg-green-500/10 rounded-lg">
                                <FileCode className="w-5 h-5 text-green-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors">Cheat Sheet</h4>
                                <p className="text-xs text-slate-500">Community command reference</p>
                            </div>
                        </a>
                    </div>
                </section>

                {/* CTA */}
                <div className="text-center pt-12 mt-12 border-t border-white/10">
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
