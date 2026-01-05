# WhatsGoingOnAI Site Configuration Reference

> **Purpose**: Reference guide for adding content to the website. Contains all pages, sections, data schemas, and metadata settings.

---

## Table of Contents

1. [Site Overview](#site-overview)
2. [Navigation Structure](#navigation-structure)
3. [Main Pages](#main-pages)
4. [Trending AI Tech Section](#trending-ai-tech-section)
5. [AI Decoded Section](#ai-decoded-section)
6. [Social Sharing & SEO](#social-sharing--seo)
7. [Home Page Ticker](#home-page-ticker)
8. [Adding New Content](#adding-new-content)

---

## Site Overview

| Property | Value |
|----------|-------|
| **Site URL** | `https://whatsgoingonai.com` |
| **Base Path** | `/` (configured in `vite.config.ts`) |
| **Default OG Image** | `/og-image.png` |
| **Hosting** | GitHub Pages (static) |
| **Framework** | React + Vite + React Router |

---

## Navigation Structure

The main navigation is defined in `src/components/Navigation.tsx`.

### Top-Level Menu Items

| Label | Route | Icon | Type |
|-------|-------|------|------|
| Home | `/` | — | Link |
| News | — | Newspaper | Dropdown |
| Research Papers | `/research` | BookOpen | Link |
| AI Decoded | `/decoded` | — | Link (animated gradient) |
| Trending AI Tech | `/trending` | — | Link (animated gradient) |
| Discover | — | — | Dropdown |
| Blog | `/blog` | — | Link |

### News Dropdown

| Label | Route | Icon | Description |
|-------|-------|------|-------------|
| AI News | `/updates` | Newspaper | Latest headlines and breakthroughs |
| Videos | `/videos` | Video | Curated video feeds from top AI creators |

### Discover Dropdown

| Label | Route | Icon | Description |
|-------|-------|------|-------------|
| Young Minds | `/young-minds` | GraduationCap | AI education for the next generation |
| Google DeepMind | `/deepmind` | Brain | Latest from Google's AI research lab |
| Jobs Board | `/jobs` | Briefcase | Find your next role in AI & ML |
| Learning | `/learning` | GraduationCap | Courses & Videos to master AI |
| Tools Directory | `/tools` | Wrench | Explore standard tools and MCP servers |
| Claude Skills | `/skills` | Sparkles | Agent skills across industries |
| Timeline | `/history` | Clock | Interactive history of AI milestones |
| About | `/about` | Info | Learn about this platform |

---

## Main Pages

All pages located in `src/pages/`.

| Page | File | Route | Description |
|------|------|-------|-------------|
| Home | `Home.tsx` | `/` | Main landing page with bento grid |
| About | `About.tsx` | `/about` | About the platform |
| Blog | `Blog.tsx` | `/blog` | Blog listing page |
| Blog Post | `BlogPost.tsx` | `/blog/:slug` | Individual blog posts |
| Research | `Research.tsx` | `/research` | Research papers feed |
| News/Updates | `LatestUpdates.tsx` | `/updates` | Latest AI news |
| Videos | `Videos.tsx` | `/videos` | Video curation |
| Jobs | `Jobs.tsx` | `/jobs` | Job listings |
| Tools | `Tools.tsx` | `/tools` | Tools directory |
| Learning | `Learning.tsx` | `/learning` | Learning resources |
| History/Timeline | `History.tsx` | `/history` | AI milestones timeline |
| Profile | `Profile.tsx` | `/profile` | User profile |
| Young Minds | `YoungMinds.tsx` | `/young-minds` | Youth AI education |
| DeepMind | `DeepMind.tsx` | `/deepmind` | Google DeepMind content |
| Claude Skills | `ClaudeSkills.tsx` | `/skills` | Agent skills overview |
| Trending | `Trending.tsx` | `/trending` | Trending AI tech overview |
| Decoded | `Decoded.tsx` | `/decoded` | AI concepts decoded overview |
| Admin | `Admin.tsx` | `/admin` | Admin dashboard |

---

## Trending AI Tech Section

### Data Schema

**File**: `src/data/trendingTech.ts`

```typescript
interface TrendingTopic {
    id: string;              // URL-safe identifier (e.g., 'nemotron-cascade')
    title: string;           // Display title
    shortDescription: string; // One-liner for cards
    fullDescription: string;  // Expanded description
    icon: string;            // Currently unused (empty string)
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    readTime: string;        // e.g., '12 min'
    tags: string[];          // Topic tags for filtering
    link: string;            // Route path (e.g., '/trending/nemotron-cascade')
    color: string;           // Tailwind gradient (e.g., 'from-emerald-500 to-teal-500')
    isBreaking?: boolean;    // Show "BREAKING" badge
    date?: string;           // Format: 'YYYY-MM'
}
```

### Current Topics

| ID | Title | Color | Difficulty | Route |
|----|-------|-------|------------|-------|
| `anthropic-skills` | Claude Code Agent Skills | `from-orange-500 to-red-500` | Intermediate | `/trending/anthropic-skills` |
| `context-graphs` | Context Graphs & Decision Traces | `from-purple-500 to-indigo-500` | Advanced | `/trending/context-graphs` |
| `agentic-crafting` | Agentic Crafting (ROME) | `from-rose-500 to-orange-500` | Advanced | `/trending/agentic-crafting` |
| `nemotron-cascade` | Nemotron-Cascade (Cascaded RL) | `from-emerald-500 to-teal-500` | Advanced | `/trending/nemotron-cascade` |
| `geometry-of-reason` | Geometry of Reason | `from-cyan-500 to-blue-500` | Advanced | `/trending/geometry-of-reason` |

### Deep-Dive Pages

Located in `src/pages/trending/`:

| File | Sections | Key Features |
|------|----------|--------------|
| `AnthropicSkills.tsx` | Skills system, SKILL.md format | Interactive demos |
| `ContextGraphs.tsx` | Decision traces, event clock | Visualizations |
| `AgenticCrafting.tsx` | ALE ecosystem, ROCK/ROLL/ROME | Architecture demo |
| `NemotronCascade.tsx` | Cascade RL pipeline, benchmarks | IOI 2025 spotlight |
| `GeometryOfReason.tsx` | Spectral metrics, attention graphs | Safety applications |

---

## AI Decoded Section

### Data Schema

**File**: `src/data/aiDecoded.ts`

```typescript
interface DecodedTopic {
    id: string;              // URL-safe identifier
    title: string;           // Display title
    shortDescription: string; // One-liner for cards
    fullDescription: string;  // Expanded description
    icon: string;            // Currently unused (empty string)
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    readTime: string;        // e.g., '5 min'
    tags: string[];          // Topic tags
    link: string;            // Route path (e.g., '/decoded/transformers')
    color: string;           // Tailwind gradient for glow effect
}
```

### Current Topics

| ID | Title | Color | Difficulty | Route |
|----|-------|-------|------------|-------|
| `transformers` | The Transformer | `from-blue-500 to-cyan-500` | Intermediate | `/decoded/transformers` |
| `diffusion` | Diffusion Models | `from-purple-500 to-pink-500` | Beginner | `/decoded/diffusion` |
| `rlhf` | RLHF | `from-emerald-500 to-green-500` | Intermediate | `/decoded/rlhf` |
| `moe` | Mixture of Experts | `from-orange-500 to-red-500` | Advanced | `/decoded/moe` |
| `embeddings` | Vector Embeddings | `from-yellow-400 to-orange-400` | Beginner | `/decoded/embeddings` |
| `lora` | LoRA | `from-blue-600 to-indigo-600` | Advanced | `/decoded/lora` |

### Deep-Dive Pages

Located in `src/pages/decoded/`:

| File | Topic |
|------|-------|
| `Transformers.tsx` | Attention mechanism, architecture |
| `Diffusion.tsx` | Image generation from noise |
| `RLHF.tsx` | Reinforcement learning from human feedback |
| `MoE.tsx` | Sparse mixture of experts |
| `Embeddings.tsx` | Vector representations |
| `LoRA.tsx` | Low-rank adaptation fine-tuning |

---

## Social Sharing & SEO

### SEO Component Usage

**File**: `src/components/SEO.tsx`

Add to every page:
```tsx
<SEO
    title="Page Title"
    description="Page description for search engines and social previews"
    url="/route-path"
    type="article"  // or "website"
/>
```

### Meta Generation Script

**File**: `scripts/generate-meta.mjs`

This script generates static HTML files for each route with proper Open Graph and Twitter Card meta tags. It runs automatically during `npm run build`.

**To add a new route with social sharing:**

```javascript
// In routes array:
{
    path: '/your/route',
    title: 'Your Page Title',
    description: 'Description for social previews (max ~200 chars)',
}
```

### Current Social Routes

| Route | Title |
|-------|-------|
| `/trending` | Trending AI Tech \| WhatsGoingOnAI |
| `/trending/context-graphs` | Context Graphs: AI's Trillion-Dollar Opportunity |
| `/trending/agentic-crafting` | Agentic Crafting: ROCK, ROLL, and ROME |
| `/trending/anthropic-skills` | Claude Code Agent Skills |
| `/trending/nemotron-cascade` | Nemotron-Cascade: Scaling Cascaded RL... |
| `/trending/geometry-of-reason` | Geometry of Reason: Spectral Signatures... |
| `/about` | About \| WhatsGoingOnAI |
| `/news` | AI News \| WhatsGoingOnAI |
| `/learning` | AI Learning Resources \| WhatsGoingOnAI |

---

## Home Page Ticker

The scrolling ticker on the home page showcases trending topics.

**File**: `src/pages/Home.tsx` (around line 203-230)

**Current Items**:
- Claude Agent Skills (primary color)
- Decision Traces (purple)
- Agentic Crafting (rose)
- Cascade RL (emerald)
- Explore All → (primary)

**To add a new ticker item:**
```tsx
<Link to="/trending/your-topic" className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:scale-105 transition-all duration-300 group">
  <span className="text-xs uppercase whitespace-nowrap font-bold text-[COLOR]-400 group-hover:text-[COLOR]-300">
    Ticker Label
  </span>
</Link>
```

---

## Adding New Content

### Add a New Trending Topic

1. **Create deep-dive page**: `src/pages/trending/YourTopic.tsx`
   - Include: `SEO`, `Navigation`, `NeuralBackground`, `Footer`, `ShareButtons`
   - Use `Section` and `FeatureCard` components for consistency

2. **Add to data file**: `src/data/trendingTech.ts`
   ```typescript
   {
       id: 'your-topic-id',
       title: 'Your Topic Title',
       shortDescription: 'One-liner description.',
       fullDescription: 'Expanded description...',
       icon: '',
       difficulty: 'Advanced',
       readTime: '10 min',
       tags: ['Tag1', 'Tag2'],
       link: '/trending/your-topic-id',
       color: 'from-COLOR-500 to-COLOR-500',
       isBreaking: true,
       date: '2025-01'
   }
   ```

3. **Add route**: `src/App.tsx`
   ```typescript
   import YourTopic from '@/pages/trending/YourTopic';
   // In Routes:
   <Route path="/trending/your-topic-id" element={<YourTopic />} />
   ```

4. **Add to home ticker**: `src/pages/Home.tsx` (line ~216)

5. **Add social meta**: `scripts/generate-meta.mjs`
   ```javascript
   {
       path: '/trending/your-topic-id',
       title: 'Your Topic Title',
       description: 'Social sharing description...',
   }
   ```

6. **Build and verify**: `npm run build`

### Add a New Decoded Topic

Same process but use:
- Data file: `src/data/aiDecoded.ts`
- Page location: `src/pages/decoded/YourTopic.tsx`
- Route prefix: `/decoded/`

---

## Color Palette Reference

Common Tailwind gradient pairs used in the site:

| Theme | Color Pair |
|-------|------------|
| Primary/Orange | `from-orange-500 to-red-500` |
| Purple/Indigo | `from-purple-500 to-indigo-500` |
| Rose/Orange | `from-rose-500 to-orange-500` |
| Emerald/Teal | `from-emerald-500 to-teal-500` |
| Blue/Cyan | `from-blue-500 to-cyan-500` |
| Yellow/Orange | `from-yellow-400 to-orange-400` |

---

## Key Files Quick Reference

| Purpose | File Path |
|---------|-----------|
| Routing | `src/App.tsx` |
| Navigation | `src/components/Navigation.tsx` |
| Trending Data | `src/data/trendingTech.ts` |
| Decoded Data | `src/data/aiDecoded.ts` |
| SEO Component | `src/components/SEO.tsx` |
| Social Meta Script | `scripts/generate-meta.mjs` |
| Home Page | `src/pages/Home.tsx` |
| Main Layout | Uses `Navigation` + `Footer` + `NeuralBackground` |
