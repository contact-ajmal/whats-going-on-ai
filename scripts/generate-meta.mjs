/**
 * Post-build script to generate static HTML files for each route
 * with proper meta tags for social media sharing.
 * 
 * This is necessary because:
 * - GitHub Pages serves static files
 * - Social media crawlers (LinkedIn, Twitter) don't execute JavaScript
 * - Without this, all pages show the same generic meta tags
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Go up one level from scripts/ to project root, then into dist/
const distDir = path.join(__dirname, '..', 'dist');

// Route configurations with meta tags
const routes = [
    {
        path: '/trending',
        title: 'Trending AI Tech | WhatsGoingOnAI',
        description: 'Breaking developments in AI. New capabilities, features, and tools explained as they emerge.',
    },
    {
        path: '/trending/context-graphs',
        title: "Context Graphs: AI's Trillion-Dollar Opportunity",
        description: "The missing layer that captures WHY decisions were made. From Foundation Capital's viral thesis on decision traces, the event clock, and building the next generation of enterprise AI.",
    },
    {
        path: '/trending/agentic-crafting',
        title: 'Agentic Crafting: ROCK, ROLL, and ROME',
        description: 'Deep dive into ROCK, ROLL, and ROME—the new ALE ecosystem for building autonomous agents. From arXiv:2512.24873, learn how to train reliable agent LLMs.',
    },
    {
        path: '/agentic-ai/anthropic-skills',
        title: 'Claude Code Agent Skills | Agentic AI',
        description: "Extend Claude Code's capabilities with custom Skills. Teach Claude domain-specific knowledge, workflows, and best practices using simple Markdown files.",
    },
    {
        path: '/agentic-ai/claude-code',
        title: 'Claude Code Mastery | Agentic AI',
        description: "Master Claude Code from beginner to expert. Interactive guide covering installation, CLI commands, tool management, MCP integrations, and power-user workflows.",
    },
    {
        path: '/trending/nemotron-cascade',
        title: 'Nemotron-Cascade: Scaling Cascaded RL for Reasoning Models',
        description: "NVIDIA's open Cascade RL framework trains unified reasoning LLMs by sequentially optimizing across domains—achieving SOTA on math, code, and SWE benchmarks.",
    },
    {
        path: '/trending/geometry-of-reason',
        title: 'Geometry of Reason: Spectral Signatures of Valid Mathematical Reasoning',
        description: "A training-free method to detect valid mathematical reasoning through spectral analysis of attention patterns. 85-95% accuracy with no fine-tuning required.",
    },
    {
        path: '/trending/nvidia-rubin',
        title: 'NVIDIA Rubin Architecture: The 2026 AI Supercomputer Platform',
        description: "Deep dive into NVIDIA's Rubin architecture: HBM4 memory (288GB, 22TB/s), Vera CPU with 88 Olympus cores, NVLink 6, and 5x performance over Blackwell.",
    },
    {
        path: '/trending/nvidia-alpamayo',
        title: 'NVIDIA Alpamayo: Thinking & Reasoning AI for Autonomous Driving',
        description: "The world's first chain-of-thought AI for Level 4 autonomous vehicles. 10B VLA model launching with Mercedes-Benz CLA Q1 2026.",
    },
    {
        path: '/trending/universal-commerce-protocol',
        title: 'Universal Commerce Protocol (UCP) | Google Open Standard',
        description: "Google's open-source standard for agentic commerce. Endorsed by Shopify, Stripe, Visa, and 20+ partners. Enable AI agents to discover, checkout, and pay seamlessly.",
    },
    {
        path: '/trending/personaplex',
        title: 'NVIDIA PersonaPlex-7B-v1 | Trending AI Tech',
        description: "NVIDIA's specialized 7B model for full-duplex conversational speech. Control voice, role, and personality for next-gen digital humans and NPCs.",
    },
    {
        path: '/about',
        title: 'About | WhatsGoingOnAI',
        description: 'Learn about WhatsGoingOnAI - your daily hub for AI news, research, and emerging technologies.',
    },
    {
        path: '/news',
        title: 'AI News | WhatsGoingOnAI',
        description: 'Latest AI news and updates from around the web. Stay informed on the latest developments in artificial intelligence.',
    },
    {
        path: '/learning',
        title: 'AI Learning Resources | WhatsGoingOnAI',
        description: 'Curated AI learning resources, tutorials, and courses to help you master artificial intelligence.',
    },
    {
        path: '/robotics',
        title: 'AI Robotics | WhatsGoingOnAI',
        description: 'Explore the latest in AI-powered robotics: humanoids, autonomous systems, industrial automation, and the future of physical AI.',
    },
    {
        path: '/robotics/boston-dynamics-deepmind',
        title: 'Boston Dynamics × DeepMind: Foundational AI for Humanoid Robots',
        description: 'Explore the historic Boston Dynamics and Google DeepMind partnership bringing Gemini Robotics AI to the new all-electric Atlas humanoid robot.',
    },
    {
        path: '/agentic-ai',
        title: 'Agentic AI | WhatsGoingOnAI',
        description: 'Discover the world of autonomous AI agents: reasoning models, tool use, multi-agent systems, and the future of AI that can act.',
    },
    {
        path: '/blog/cowork-research-preview',
        title: 'Cowork with Claude: Protocol for the Future of Work',
        description: 'Cowork brings agentic AI to everyone. We dive deep into real-world use cases—from automating expense reports to organizing chaotic file systems.',
        image: '/images/cowork-research-preview.jpg'
    },
    {
        path: '/daily',
        title: 'AI Daily Brief | WhatsGoingOnAI',
        description: 'Your curated daily digest of the most important AI news, research, and tools. Filtered signal from the noise.',
        image: '/og-image.png'
    },
];

const siteUrl = 'https://whatsgoingonai.com';
const defaultImage = '/og-image.png';

function generateMetaTags(route) {
    const fullUrl = `${siteUrl}${route.path}`;
    const fullImage = `${siteUrl}${route.image || defaultImage}`;

    return `
    <!-- Route-specific meta tags generated by generate-meta.mjs -->
    <title>${route.title}</title>
    <meta name="description" content="${route.description}" />
    <link rel="canonical" href="${fullUrl}" />
    
    <!-- Open Graph -->
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${route.title}" />
    <meta property="og:description" content="${route.description}" />
    <meta property="og:image" content="${fullImage}" />
    <meta property="og:url" content="${fullUrl}" />
    <meta property="og:site_name" content="WhatsGoingOnAI" />
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${route.title}" />
    <meta name="twitter:description" content="${route.description}" />
    <meta name="twitter:image" content="${fullImage}" />`;
}

function createRouteHtml(baseHtml, route) {
    // Remove existing meta tags that we'll replace
    let html = baseHtml;

    // Replace title
    html = html.replace(/<title>.*?<\/title>/g, '');

    // Replace description meta
    html = html.replace(/<meta name="description"[^>]*>/g, '');

    // Replace og: tags
    html = html.replace(/<meta property="og:[^"]*"[^>]*>/g, '');

    // Replace twitter: tags
    html = html.replace(/<meta name="twitter:[^"]*"[^>]*>/g, '');

    // Replace canonical link
    html = html.replace(/<link rel="canonical"[^>]*>/g, '');

    // Insert new meta tags after <head>
    const metaTags = generateMetaTags(route);
    html = html.replace('<head>', `<head>${metaTags}`);

    return html;
}

async function main() {
    console.log('🔧 Generating route-specific HTML files for social sharing...\n');

    // Read the base index.html
    const indexPath = path.join(distDir, 'index.html');
    if (!fs.existsSync(indexPath)) {
        console.error('❌ dist/index.html not found. Run npm run build first.');
        process.exit(1);
    }

    const baseHtml = fs.readFileSync(indexPath, 'utf-8');

    for (const route of routes) {
        // Create directory structure
        const routeDir = path.join(distDir, route.path);
        fs.mkdirSync(routeDir, { recursive: true });

        // Generate HTML with route-specific meta tags
        const routeHtml = createRouteHtml(baseHtml, route);

        // Write index.html for this route
        const routeIndexPath = path.join(routeDir, 'index.html');
        fs.writeFileSync(routeIndexPath, routeHtml);

        console.log(`✅ Created ${route.path}/index.html`);
    }

    console.log('\n🎉 Done! Social media crawlers will now see proper meta tags.');
}

main().catch(console.error);
