# WhatsgoingOnAI

A futuristic, neural-network themed personal blog with animated backgrounds, markdown-powered content, and a beautiful dark design.

## Features

- 🎨 **Dark/Neural Network Theme** - Stunning animated particle background with glowing effects
- 📝 **Markdown Blog System** - Write posts in Markdown with automatic HTML conversion
- 🎯 **Fully Responsive** - Works perfectly from mobile to 4K displays
- ⚡ **Fast & Modern** - Built with React, TypeScript, and Tailwind CSS
- 🔧 **Configurable** - Easy customization via `config.json`

## Pages

- **Home** - Hero section with neural network animation, intro, and recent posts
- **About** - Bio, skills, career timeline, and interests
- **Blog** - Automatically generated post index with tag filtering
- **Projects** - Grid of project cards with hover effects

## Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/yourusername/neural-blog.git
cd neural-blog
npm install
npm run dev
```

### 2. Customize

Edit `public/config.json` to update your personal information:

```json
{
  "name": "Your Name",
  "title": "Your Title",
  "bio": "Your bio here...",
  "social": {
    "github": "https://github.com/yourusername",
    "twitter": "https://twitter.com/yourusername",
    "linkedin": "https://linkedin.com/in/yourusername",
    "email": "your@email.com"
  },
  // ... more options
}
```

### 3. Add Blog Posts

Create markdown files in `public/posts/` with frontmatter:

```markdown
---
title: Your Post Title
date: 2024-01-15
description: A brief description of your post.
tags: [tag1, tag2]
---

# Your Post Content

Write your content here using Markdown...
```

**Important:** After adding a new post, update the `availablePosts` array in `src/lib/config.ts`:

```typescript
const availablePosts = [
  'welcome',
  'your-new-post-slug',
  // ... other posts
];
```

## Deployment to GitHub Pages

### Option 1: Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. The `dist` folder contains your static site. Push it to GitHub Pages.

### Option 2: GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

3. Enable GitHub Pages in your repository settings, set source to "gh-pages" branch.

## Customization

### Theme Colors

Edit `src/index.css` to modify the color scheme:

```css
:root {
  --primary: 180 100% 50%;    /* Cyan */
  --secondary: 300 100% 50%;  /* Magenta */
  --background: 0 0% 4%;      /* Near black */
  /* ... */
}
```

### Fonts

The blog uses JetBrains Mono and Inter. To change fonts:

1. Update the Google Fonts import in `src/index.css`
2. Modify the font family in `tailwind.config.ts`

### Animation Speed

Adjust animation timing in `tailwind.config.ts` under `keyframes` and `animation`.

## Project Structure

```
├── public/
│   ├── config.json          # Site configuration
│   └── posts/               # Markdown blog posts
│       ├── welcome.md
│       └── ...
├── src/
│   ├── components/          # React components
│   │   ├── NeuralBackground.tsx
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   ├── pages/               # Page components
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Blog.tsx
│   │   ├── BlogPost.tsx
│   │   └── Projects.tsx
│   ├── lib/                 # Utilities
│   │   └── config.ts        # Config & Markdown loading
│   ├── types/               # TypeScript types
│   └── index.css            # Global styles & theme
└── tailwind.config.ts       # Tailwind configuration
```

## Tech Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Marked** - Markdown parsing
- **Vite** - Build tool

## License

## License

**Proprietary & Confidential**

All rights reserved. This project and its contents are the property of Ajmal. 
Unauthorized copying, modification, distribution, or use of this file, via any medium, is strictly prohibited.
This repository is for portfolio and demonstration purposes only.


---

Built with ♥ and neural networks.
