import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft, ArrowRight, FileText, Zap,
    Code, ExternalLink, CheckCircle, Folder, Settings,
    Copy, Terminal, Puzzle, BookOpen, Layers, GitBranch,
    Shield, Users, Package
} from 'lucide-react';
import { NeuralBackground } from '@/components/NeuralBackground';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// --- Reusable Components ---

const Section = ({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) => (
    <section className={`mb-16 ${className}`}>
        <h2 className="text-3xl font-bold text-slate-100 mb-6 border-b-4 border-orange-500 inline-block pb-2">
            {title}
        </h2>
        {children}
    </section>
);

const FeatureCard = ({ icon: Icon, title, description, color }: { icon: any; title: string; description: string; color: string }) => (
    <div className={`p-6 rounded-xl border border-white/10 bg-slate-900/50 backdrop-blur-sm hover:border-${color}-500/50 transition-all duration-300 hover:-translate-y-1`}>
        <div className={`p-3 rounded-lg bg-${color}-500/10 text-${color}-400 w-fit mb-4`}>
            <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
);

const CodeBlock = ({ code, language = "markdown", title }: { code: string; language?: string; title?: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="rounded-xl overflow-hidden border border-white/10 bg-black/60">
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

// --- Interactive Demos ---

const SkillsFlowDiagram = () => {
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        { label: 'Discovery', desc: 'Claude Code scans ~/.claude/skills/ and .claude/skills/', icon: Folder, color: 'blue' },
        { label: 'Match', desc: 'User request triggers a Skill based on its description', icon: Puzzle, color: 'orange' },
        { label: 'Load', desc: 'SKILL.md content is loaded into Claude\'s context', icon: FileText, color: 'purple' },
        { label: 'Execute', desc: 'Claude follows the Skill instructions to complete the task', icon: Zap, color: 'green' },
    ];

    return (
        <div className="bg-slate-900/50 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-orange-400" />
                How Agent Skills Work
            </h3>

            <div className="flex flex-wrap gap-2 justify-center mb-8">
                {steps.map((step, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveStep(idx)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeStep === idx
                                ? 'bg-orange-500/20 border-2 border-orange-500 text-orange-300'
                                : 'bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10'
                            }`}
                    >
                        <step.icon className="w-4 h-4" />
                        {step.label}
                    </button>
                ))}
            </div>

            <div className="flex items-center justify-between gap-4 px-4">
                {steps.map((step, idx) => (
                    <React.Fragment key={idx}>
                        <div className={`flex flex-col items-center text-center transition-all duration-300 ${activeStep >= idx ? 'opacity-100' : 'opacity-30'
                            }`}>
                            <div className={`p-3 rounded-full mb-2 ${activeStep === idx ? 'bg-orange-500/20 ring-2 ring-orange-500' : 'bg-white/5'
                                }`}>
                                <step.icon className={`w-5 h-5 ${activeStep === idx ? 'text-orange-400' : 'text-slate-400'}`} />
                            </div>
                            <span className="text-xs font-medium text-white">{step.label}</span>
                        </div>
                        {idx < steps.length - 1 && (
                            <ArrowRight className={`w-4 h-4 flex-shrink-0 ${activeStep > idx ? 'text-orange-400' : 'text-slate-600'}`} />
                        )}
                    </React.Fragment>
                ))}
            </div>

            <div className="mt-6 p-4 bg-black/40 rounded-lg border border-white/5 text-center">
                <p className="text-slate-300 font-mono text-sm">{steps[activeStep].desc}</p>
            </div>
        </div>
    );
};

// --- Main Component ---

export default function AnthropicSkillsDeepDive() {

    const basicSkillExample = `---
name: explaining-code
description: Explains code with visual diagrams and analogies.
  Use when explaining how code works, teaching about a codebase,
  or when the user asks "how does this work?"
---

# Explaining Code

When explaining code, always include:

1. **Start with an analogy**: Compare the code to something from everyday life
2. **Draw a diagram**: Use ASCII art to show the flow, structure, or relationships
3. **Walk through the code**: Explain step-by-step what happens
4. **Highlight a gotcha**: What's a common mistake or misconception?

Keep explanations conversational. For complex concepts, use multiple analogies.`;

    const commitHelperExample = `---
name: generating-commit-messages
description: Generates clear commit messages from git diffs.
  Use when writing commit messages or reviewing staged changes.
---

# Generating Commit Messages

## Instructions
1. Run \`git diff --staged\` to see changes
2. I'll suggest a commit message with:
   - Summary under 50 characters
   - Detailed description
   - Affected components

## Best practices
- Use present tense
- Explain what and why, not how`;

    const advancedSkillExample = `---
name: pdf-processing
description: Extract text, fill forms, merge PDFs.
  Use when working with PDF files, forms, or document extraction.
  Requires pypdf and pdfplumber packages.
allowed-tools: Read, Bash(python:*)
---

# PDF Processing

## Quick start

Extract text:
\`\`\`python
import pdfplumber
with pdfplumber.open("doc.pdf") as pdf:
    text = pdf.pages[0].extract_text()
\`\`\`

For form filling, see [FORMS.md](FORMS.md).
For detailed API reference, see [REFERENCE.md](REFERENCE.md).

## Requirements
\`\`\`bash
pip install pypdf pdfplumber
\`\`\``;

    const directoryStructure = `~/.claude/skills/           # User-level Skills (apply to all projects)
├── explaining-code/
│   └── SKILL.md
├── commit-helper/
│   └── SKILL.md

.claude/skills/              # Project-level Skills (version controlled)
├── pdf-processing/
│   ├── SKILL.md
│   ├── FORMS.md
│   ├── REFERENCE.md
│   └── scripts/
│       ├── fill_form.py
│       └── validate.py`;

    return (
        <div className="min-h-screen bg-black font-sans text-slate-200">
            <Navigation />
            <NeuralBackground />

            {/* Hero Header */}
            <header className="pt-32 pb-24 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                    <Puzzle size={400} className="text-orange-500" />
                </div>
                <div className="max-w-4xl mx-auto relative z-10">
                    {/* Breadcrumb */}
                    <Link to="/trending" className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 mb-6 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Trending AI Tech
                    </Link>

                    <div className="text-center">
                        <Badge variant="outline" className="mb-6 text-orange-400 border-orange-400/30 py-1.5 px-4 text-sm backdrop-blur-md">
                            🔥 Breaking Technology
                        </Badge>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-orange-600">
                                Claude Code Agent Skills
                            </span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            Extend Claude Code's capabilities with custom Skills. Teach Claude domain-specific knowledge,
                            workflows, and best practices using simple Markdown files.
                        </p>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 pb-24 relative z-20">

                {/* Intro Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid md:grid-cols-3 gap-6 mb-16"
                >
                    <FeatureCard
                        icon={FileText}
                        title="Markdown-Based"
                        description="Skills are just SKILL.md files. No code required—write instructions in plain Markdown."
                        color="orange"
                    />
                    <FeatureCard
                        icon={Puzzle}
                        title="Auto-Triggered"
                        description="Claude automatically activates Skills based on user requests matching the description."
                        color="green"
                    />
                    <FeatureCard
                        icon={Package}
                        title="Shareable"
                        description="Commit to version control, share via plugins, or deploy organization-wide."
                        color="blue"
                    />
                </motion.div>

                {/* Section 1: What Are Skills */}
                <Section title="1. What are Agent Skills?">
                    <div className="space-y-6 text-lg text-slate-400">
                        <p>
                            <strong className="text-white">Agent Skills</strong> are a way to extend Claude Code's capabilities
                            by teaching it domain-specific knowledge, workflows, and best practices. Instead of repeating
                            instructions every time, you write them once in a <code className="text-orange-400">SKILL.md</code> file.
                        </p>

                        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-6">
                            <h4 className="font-bold text-orange-400 mb-3 flex items-center gap-2">
                                <Zap className="w-5 h-5" />
                                Key Insight
                            </h4>
                            <p className="text-sm">
                                Skills are like <strong className="text-white">specialized training documents</strong> for Claude.
                                When a user's request matches a Skill's description, Claude automatically loads that Skill
                                and follows its instructions. It's like giving Claude a reference manual for specific tasks.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mt-8">
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5">
                                <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-400" />
                                    What Skills Can Do
                                </h4>
                                <ul className="text-sm text-slate-400 space-y-2">
                                    <li>• Teach Claude your coding standards</li>
                                    <li>• Define step-by-step workflows</li>
                                    <li>• Provide domain-specific knowledge</li>
                                    <li>• Restrict available tools for safety</li>
                                    <li>• Include reference files and scripts</li>
                                </ul>
                            </div>
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5">
                                <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                                    <Settings className="w-5 h-5 text-blue-400" />
                                    Use Cases
                                </h4>
                                <ul className="text-sm text-slate-400 space-y-2">
                                    <li>• Code review guidelines</li>
                                    <li>• Commit message conventions</li>
                                    <li>• API documentation helpers</li>
                                    <li>• Testing best practices</li>
                                    <li>• Company-specific workflows</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* Section 2: How It Works */}
                <Section title="2. How Skills Work">
                    <p className="text-lg text-slate-400 mb-8">
                        Skills follow a simple lifecycle: Discovery → Match → Load → Execute.
                        Claude scans for Skills at startup and activates them when your request matches their description.
                    </p>
                    <SkillsFlowDiagram />
                </Section>

                {/* Section 3: Create Your First Skill */}
                <Section title="3. Create Your First Skill">
                    <div className="space-y-6">
                        <p className="text-lg text-slate-400">
                            Let's create a simple Skill that teaches Claude how to explain code with analogies and diagrams.
                        </p>

                        <div className="bg-slate-900 p-4 rounded-xl border border-white/10 mb-6">
                            <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                                <Terminal className="w-5 h-5 text-green-400" />
                                Step 1: Create the Skill directory
                            </h4>
                            <CodeBlock
                                code="mkdir -p ~/.claude/skills/explaining-code"
                                language="bash"
                                title="Terminal"
                            />
                        </div>

                        <div className="mb-6">
                            <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-orange-400" />
                                Step 2: Write SKILL.md
                            </h4>
                            <CodeBlock
                                code={basicSkillExample}
                                language="markdown"
                                title="~/.claude/skills/explaining-code/SKILL.md"
                            />
                        </div>

                        <div className="bg-slate-900 p-4 rounded-xl border border-white/10">
                            <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-blue-400" />
                                Step 3: Test it
                            </h4>
                            <p className="text-sm text-slate-400 mb-3">
                                Ask Claude Code: <code className="text-orange-400">"What Skills are available?"</code> to verify it loaded.
                                Then try: <code className="text-orange-400">"How does this code work?"</code> to see the Skill in action.
                            </p>
                        </div>
                    </div>
                </Section>

                {/* Section 4: Skill Anatomy */}
                <Section title="4. Anatomy of a SKILL.md">
                    <div className="space-y-6">
                        <p className="text-lg text-slate-400">
                            Every Skill starts with YAML frontmatter followed by Markdown instructions.
                        </p>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-slate-900 p-4 rounded-xl border border-white/10">
                                <h4 className="font-bold text-white mb-3">Required Fields</h4>
                                <ul className="text-sm text-slate-400 space-y-3">
                                    <li>
                                        <code className="text-orange-400">name</code>
                                        <p className="text-xs text-slate-500 mt-1">Unique identifier for the Skill</p>
                                    </li>
                                    <li>
                                        <code className="text-orange-400">description</code>
                                        <p className="text-xs text-slate-500 mt-1">When to use this Skill (crucial for auto-triggering)</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-slate-900 p-4 rounded-xl border border-white/10">
                                <h4 className="font-bold text-white mb-3">Optional Fields</h4>
                                <ul className="text-sm text-slate-400 space-y-3">
                                    <li>
                                        <code className="text-blue-400">allowed-tools</code>
                                        <p className="text-xs text-slate-500 mt-1">Restrict which tools Claude can use</p>
                                    </li>
                                    <li>
                                        <code className="text-blue-400">model</code>
                                        <p className="text-xs text-slate-500 mt-1">Specify a particular Claude model</p>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <CodeBlock
                            code={commitHelperExample}
                            language="markdown"
                            title="Example: Commit Message Helper"
                        />
                    </div>
                </Section>

                {/* Section 5: Where Skills Live */}
                <Section title="5. Where Skills Live">
                    <div className="space-y-6">
                        <p className="text-lg text-slate-400">
                            Skills can be stored at different levels depending on how you want to share them.
                        </p>

                        <CodeBlock
                            code={directoryStructure}
                            language="plaintext"
                            title="Skill Directory Structure"
                        />

                        <div className="grid md:grid-cols-3 gap-4 mt-6">
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5 text-center">
                                <div className="p-3 rounded-full bg-purple-500/10 w-fit mx-auto mb-3">
                                    <Users className="w-6 h-6 text-purple-400" />
                                </div>
                                <h4 className="font-bold text-white mb-1">User-Level</h4>
                                <p className="text-xs text-slate-500">~/.claude/skills/</p>
                                <p className="text-xs text-slate-400 mt-2">Personal Skills across all projects</p>
                            </div>
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5 text-center">
                                <div className="p-3 rounded-full bg-green-500/10 w-fit mx-auto mb-3">
                                    <GitBranch className="w-6 h-6 text-green-400" />
                                </div>
                                <h4 className="font-bold text-white mb-1">Project-Level</h4>
                                <p className="text-xs text-slate-500">.claude/skills/</p>
                                <p className="text-xs text-slate-400 mt-2">Shared via version control</p>
                            </div>
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5 text-center">
                                <div className="p-3 rounded-full bg-blue-500/10 w-fit mx-auto mb-3">
                                    <Shield className="w-6 h-6 text-blue-400" />
                                </div>
                                <h4 className="font-bold text-white mb-1">Enterprise</h4>
                                <p className="text-xs text-slate-500">Managed settings</p>
                                <p className="text-xs text-slate-400 mt-2">Organization-wide deployment</p>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* Section 6: Advanced Features */}
                <Section title="6. Advanced Features">
                    <div className="space-y-8">
                        <div>
                            <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Shield className="w-5 h-5 text-blue-400" />
                                Restrict Tool Access
                            </h4>
                            <p className="text-slate-400 mb-4">
                                Use <code className="text-blue-400">allowed-tools</code> to limit what Claude can do when a Skill is active.
                                Perfect for read-only operations or security-sensitive workflows.
                            </p>
                            <CodeBlock
                                code={advancedSkillExample}
                                language="markdown"
                                title="Example: PDF Processing with Restricted Tools"
                            />
                        </div>

                        <div className="bg-slate-900 p-6 rounded-xl border border-white/10">
                            <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Layers className="w-5 h-5 text-purple-400" />
                                Multi-File Skills
                            </h4>
                            <p className="text-slate-400 mb-4">
                                For complex Skills, use progressive disclosure—<code className="text-orange-400">SKILL.md</code> provides
                                an overview and links to additional files that Claude loads when needed.
                            </p>
                            <ul className="text-sm text-slate-400 space-y-2">
                                <li>• <code className="text-white">SKILL.md</code> - Entry point with overview</li>
                                <li>• <code className="text-white">reference.md</code> - Detailed API docs (loaded on demand)</li>
                                <li>• <code className="text-white">examples.md</code> - Usage examples</li>
                                <li>• <code className="text-white">scripts/</code> - Utility scripts Claude can execute</li>
                            </ul>
                        </div>
                    </div>
                </Section>

                {/* Section 7: Skills vs Other Options */}
                <Section title="7. Skills vs Other Options">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left py-3 px-4 text-white">Feature</th>
                                    <th className="text-left py-3 px-4 text-white">Best For</th>
                                    <th className="text-left py-3 px-4 text-white">Triggered By</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-400">
                                <tr className="border-b border-white/5">
                                    <td className="py-3 px-4 font-medium text-orange-400">Skills</td>
                                    <td className="py-3 px-4">Domain knowledge, workflows, best practices</td>
                                    <td className="py-3 px-4">Auto (description match)</td>
                                </tr>
                                <tr className="border-b border-white/5">
                                    <td className="py-3 px-4 font-medium text-blue-400">Slash Commands</td>
                                    <td className="py-3 px-4">Explicit actions like /deploy</td>
                                    <td className="py-3 px-4">Manual (/command)</td>
                                </tr>
                                <tr className="border-b border-white/5">
                                    <td className="py-3 px-4 font-medium text-green-400">CLAUDE.md</td>
                                    <td className="py-3 px-4">Project-wide context always loaded</td>
                                    <td className="py-3 px-4">Always active</td>
                                </tr>
                                <tr className="border-b border-white/5">
                                    <td className="py-3 px-4 font-medium text-purple-400">Subagents</td>
                                    <td className="py-3 px-4">Parallel, isolated tasks</td>
                                    <td className="py-3 px-4">Agent spawns</td>
                                </tr>
                                <tr>
                                    <td className="py-3 px-4 font-medium text-pink-400">MCP Servers</td>
                                    <td className="py-3 px-4">External APIs and services</td>
                                    <td className="py-3 px-4">Tool calls</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Section>

                {/* Section 8: Resources */}
                <Section title="8. Links & Resources">
                    <div className="grid md:grid-cols-2 gap-4">
                        <a
                            href="https://code.claude.com/docs/en/skills"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 bg-slate-900 rounded-xl border border-white/10 hover:border-orange-500/50 transition-all group"
                        >
                            <div className="p-3 bg-orange-500/10 rounded-lg">
                                <ExternalLink className="w-5 h-5 text-orange-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white group-hover:text-orange-400 transition-colors">Official Docs</h4>
                                <p className="text-xs text-slate-500">Claude Code Skills Documentation</p>
                            </div>
                        </a>
                        <a
                            href="https://docs.claude.com/en/docs/agents-and-tools/agent-skills/best-practices"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 bg-slate-900 rounded-xl border border-white/10 hover:border-orange-500/50 transition-all group"
                        >
                            <div className="p-3 bg-blue-500/10 rounded-lg">
                                <BookOpen className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white group-hover:text-orange-400 transition-colors">Best Practices</h4>
                                <p className="text-xs text-slate-500">Writing effective Skills</p>
                            </div>
                        </a>
                        <a
                            href="https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 bg-slate-900 rounded-xl border border-white/10 hover:border-orange-500/50 transition-all group"
                        >
                            <div className="p-3 bg-purple-500/10 rounded-lg">
                                <Zap className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white group-hover:text-orange-400 transition-colors">Engineering Blog</h4>
                                <p className="text-xs text-slate-500">Equipping agents for the real world</p>
                            </div>
                        </a>
                        <a
                            href="https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 bg-slate-900 rounded-xl border border-white/10 hover:border-orange-500/50 transition-all group"
                        >
                            <div className="p-3 bg-green-500/10 rounded-lg">
                                <Code className="w-5 h-5 text-green-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white group-hover:text-orange-400 transition-colors">Platform Overview</h4>
                                <p className="text-xs text-slate-500">Agent Skills overview on Claude Platform</p>
                            </div>
                        </a>
                    </div>
                </Section>

                {/* CTA */}
                <div className="text-center pt-12 border-t border-white/10">
                    <Link to="/trending">
                        <Button variant="outline" className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Trending AI Tech
                        </Button>
                    </Link>
                </div>

            </main>

            <Footer />
        </div>
    );
}
