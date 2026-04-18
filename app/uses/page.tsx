'use client'

import type { LucideIcon } from 'lucide-react'
import { BookText, Code, GitBranch, Keyboard, Laptop, Mouse, Send, Trello } from 'lucide-react'
import { Reveal } from '@/components/v2/reveal'

interface UsesItem {
  name: string
  description: string
  icon: LucideIcon
}

interface UsesCategory {
  title: string
  num: string
  items: UsesItem[]
}

const categories: UsesCategory[] = [
  {
    title: 'Hardware',
    num: '01',
    items: [
      {
        name: 'MacBook Pro 16',
        description: 'Handles everything I throw at it. Fans stay quiet when I need to think.',
        icon: Laptop,
      },
      {
        name: 'Apple Magic Keyboard',
        description: 'Sleek, responsive, comfortable for long coding sessions.',
        icon: Keyboard,
      },
      {
        name: 'Apple Magic Trackpad',
        description: 'Precise control with gesture support for efficient navigation.',
        icon: Mouse,
      },
    ],
  },
  {
    title: 'Development',
    num: '02',
    items: [
      {
        name: 'Visual Studio Code',
        description: 'My editor of choice. Lightweight, extensible, endlessly customizable.',
        icon: Code,
      },
      {
        name: 'GitHub Copilot',
        description: 'AI-assisted coding that genuinely speeds up everyday development.',
        icon: GitBranch,
      },
      {
        name: 'Git',
        description: 'Essential for version control and collaboration.',
        icon: GitBranch,
      },
      {
        name: 'Postman',
        description: 'Indispensable for API testing and development.',
        icon: Send,
      },
    ],
  },
  {
    title: 'Productivity',
    num: '03',
    items: [
      {
        name: 'Notion',
        description: 'All-in-one workspace for notes, tasks, and project management.',
        icon: BookText,
      },
      {
        name: 'Jira',
        description: 'Robust project tracking and agile management.',
        icon: Trello,
      },
    ],
  },
]

export default function UsesPage() {
  return (
    <main style={{ paddingTop: 104, paddingBottom: 80 }}>
      <div className="mx-auto w-full max-w-[760px] px-4 sm:px-8">
        <Reveal>
          <div className="eyebrow-v2 mb-4">/USES</div>
        </Reveal>
        <Reveal delay={1}>
          <h1
            className="font-mono"
            style={{
              fontSize: 'clamp(40px,6vw,64px)',
              letterSpacing: '-0.04em',
              fontWeight: 600,
              margin: '0 0 18px',
              lineHeight: 1,
            }}
          >
            My setup
            <span style={{ color: 'hsl(24 95% 53%)' }}>.</span>
          </h1>
        </Reveal>
        <Reveal delay={2}>
          <p className="text-muted-foreground" style={{ fontSize: 16, lineHeight: 1.6, margin: '0 0 56px' }}>
            The tools, hardware, and software I rely on day to day. Updated when something actually
            changes — not when a press release lands.
          </p>
        </Reveal>

        {categories.map((cat, ci) => (
          <section key={cat.title} style={{ marginBottom: ci === categories.length - 1 ? 0 : 56 }}>
            <Reveal>
              <div className="flex items-center gap-3.5 mb-5">
                <span
                  className="font-mono"
                  style={{
                    fontSize: 11,
                    color: 'hsl(24 95% 53% / 0.8)',
                    letterSpacing: '0.14em',
                  }}
                >
                  {cat.num}
                </span>
                <h2
                  className="font-mono uppercase text-foreground/80"
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    margin: 0,
                    letterSpacing: '0.02em',
                  }}
                >
                  {cat.title}
                </h2>
                <div
                  className="flex-1"
                  style={{
                    height: 1,
                    background: 'linear-gradient(to right, hsl(var(--border)), transparent)',
                  }}
                />
              </div>
            </Reveal>
            <div
              className="bg-card/40"
              style={{
                border: '1px solid hsl(var(--border))',
                borderRadius: 10,
                overflow: 'hidden',
              }}
            >
              {cat.items.map((it, ii) => {
                const Icon = it.icon
                return (
                  <Reveal key={it.name} delay={(Math.min(ii + 1, 4)) as 1 | 2 | 3 | 4}>
                    <div
                      className="group flex items-start gap-4 transition-colors duration-200 hover:bg-primary/[0.03]"
                      style={{
                        padding: '18px 20px',
                        borderTop: ii === 0 ? 'none' : '1px solid hsl(var(--border) / 0.6)',
                      }}
                    >
                      <div
                        className="flex items-center justify-center flex-shrink-0"
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 7,
                          background: 'hsl(24 95% 53% / 0.08)',
                          border: '1px solid hsl(24 95% 53% / 0.15)',
                          color: 'hsl(24 95% 53%)',
                        }}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="font-mono" style={{ fontSize: 14, fontWeight: 500, marginBottom: 3 }}>
                          {it.name}
                        </div>
                        <div className="text-muted-foreground" style={{ fontSize: 13, lineHeight: 1.55 }}>
                          {it.description}
                        </div>
                      </div>
                      <span className="font-mono text-muted-foreground/70" style={{ fontSize: 10 }}>
                        0
                        {ii + 1}
                      </span>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
