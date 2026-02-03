# CLAUDE.md - Portfolio Site Documentation

This document provides essential context for AI assistants working with this codebase.

## Project Overview

A modern personal portfolio website for Eduardo Gaytan built with Next.js 15, featuring a blog with markdown support, dark/light theme toggle, and responsive design.

**Tech Stack:**
- **Runtime:** Node.js 22+ (see `.nvmrc`)
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5.9 (strict mode)
- **Styling:** Tailwind CSS 3 with CSS variables for theming
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Package Manager:** pnpm
- **Animations:** Framer Motion 12
- **Markdown:** gray-matter + react-markdown + remark-gfm

## Directory Structure

```
portfolio-site/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx            # Root layout with providers
│   ├── page.tsx              # Home page (hero section)
│   ├── globals.css           # Global styles and CSS variables
│   ├── about/page.tsx        # About page with timeline
│   ├── uses/page.tsx         # Tools/tech stack page
│   └── blog/
│       ├── page.tsx          # Blog listing page
│       ├── [id]/page.tsx     # Dynamic blog post page
│       └── posts/            # Markdown blog posts (.md files)
├── components/               # React components
│   ├── ui/                   # shadcn/ui components
│   ├── nav.tsx               # Navigation bar
│   ├── blog-list.tsx         # Blog listing component
│   ├── command-menu.tsx      # Command palette (Cmd+K)
│   ├── theme-toggle.tsx      # Dark/light mode toggle
│   └── timeline.tsx          # About page timeline
├── lib/                      # Utility functions
│   ├── utils.ts              # cn(), calculateReadingTime(), formatRelativeTime()
│   └── blog.ts               # Blog post fetching utilities
├── hooks/                    # Custom React hooks (aliased as @/hooks)
├── types/                    # TypeScript type definitions
└── public/                   # Static assets
```

## Prerequisites

- **Node.js 22+** - Use `nvm use` to switch to the correct version (reads from `.nvmrc`)
- **pnpm** - Package manager (specified in `package.json` as `pnpm@10.12.4`)

## Key Commands

```bash
# Setup
nvm use           # Switch to Node 22 (reads .nvmrc)
pnpm install      # Install dependencies

# Development
pnpm dev          # Start dev server on localhost:3000

# Build
pnpm build        # Production build

# Linting
pnpm lint         # Run ESLint
```

## Architecture & Conventions

### Path Aliases

The project uses `@/` path aliases configured in `tsconfig.json`:
- `@/components` -> `./components`
- `@/lib` -> `./lib`
- `@/hooks` -> `./hooks`
- `@/*` -> `./*`

### TypeScript Conventions

1. **Type Imports:** Use `import type` for type-only imports (enforced by ESLint)
   ```typescript
   import type { BlogPost } from '@/lib/blog'
   ```

2. **Strict Mode:** TypeScript strict mode is enabled

3. **Interface vs Type:** Use interfaces for object shapes, types for unions

### Component Conventions

1. **Client Components:** Mark with `'use client'` directive when using hooks or browser APIs

2. **UI Components:** Located in `components/ui/` - these are shadcn/ui components
   - Don't modify these directly; they're managed by shadcn CLI
   - Install new components via: `npx shadcn@latest add <component>`

3. **Custom Components:** Located directly in `components/`
   - Use PascalCase for component files
   - Export named functions, not default exports for non-page components

### Styling Conventions

1. **Tailwind CSS:** Primary styling method
   - Use `cn()` utility from `@/lib/utils` for conditional classes
   - Theme colors use CSS variables (e.g., `bg-background`, `text-foreground`)

2. **Dark Mode:** Implemented via `next-themes` with class-based switching
   - Default theme is dark
   - Theme colors defined in `app/globals.css`

3. **Responsive Design:** Mobile-first approach
   - Breakpoints: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
   - Mobile nav handled by `MobileNav` component

### Blog System

1. **Post Location:** `app/blog/posts/` directory

2. **Frontmatter Schema:**
   ```yaml
   ---
   title: 'Post Title'
   date: 'YYYY-MM-DD'
   description: 'Brief description'
   tags: ['tag1', 'tag2']
   author: 'Author Name'
   image: '/image-path.png'
   ---
   ```

3. **Blog Utilities:** `lib/blog.ts`
   - `getSortedPostsData()` - Get all posts sorted by date
   - `getPostData(id)` - Get single post content

4. **URL Pattern:** Blog posts are accessed at `/blog/[filename-without-extension]`

### Animation Patterns

- Use Framer Motion for animations
- Common pattern:
  ```tsx
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
  ```

## Adding New Features

### Adding a New Page

1. Create directory in `app/` with `page.tsx`
2. Pages are server components by default
3. Add to navigation in `components/nav.tsx` `navItems` array

### Adding a Blog Post

1. Create `.md` file in `app/blog/posts/`
2. Add frontmatter with required fields (title, date)
3. Write content in Markdown (supports GFM)
4. Post will automatically appear in blog listing

### Adding a UI Component

```bash
npx shadcn@latest add <component-name>
```

Components are added to `components/ui/` and can be customized after installation.

## Important Files

| File | Purpose |
|------|---------|
| `.nvmrc` | Node.js version (22) |
| `app/layout.tsx` | Root layout, theme provider, nav |
| `app/globals.css` | CSS variables, base styles |
| `lib/utils.ts` | `cn()` helper, utility functions |
| `lib/blog.ts` | Blog post fetching logic |
| `components.json` | shadcn/ui configuration |
| `tailwind.config.ts` | Tailwind theme configuration |
| `next.config.mjs` | Next.js configuration with MDX support |

## Development Notes

- **ESLint:** Configured for Next.js with TypeScript
- **Prettier:** Formatting configured (see `.prettierrc.json`)
- **Images:** Use unoptimized images (configured in `next.config.mjs`)
- **Build:** TypeScript and ESLint errors are ignored during builds (see `next.config.mjs`)

## Dependencies of Note

- `cmdk` - Command menu component
- `date-fns` - Date formatting
- `geist` - Font family
- `lucide-react` - Icon library
- `react-type-animation` - Typing animation on home page
- `react-syntax-highlighter` - Code highlighting in blog posts

## Common Tasks

### Update Theme Colors
Edit CSS variables in `app/globals.css` under `:root` and `.dark` selectors.

### Add Navigation Item
Edit `navItems` array in `components/nav.tsx`.

### Modify Blog Post Styling
Edit `components` object in `app/blog/[id]/page.tsx` for markdown rendering styles.
