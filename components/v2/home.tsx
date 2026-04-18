'use client'

import type { BlogPost } from '@/lib/blog'
import { format } from 'date-fns'
import { ArrowRight, Clock, ExternalLink, MapPin, Send } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { BtnLink, Chip, GlowRule, Kbd } from '@/components/v2/primitives'
import { Reveal } from '@/components/v2/reveal'
import { Prompt, Terminal, Typewriter } from '@/components/v2/terminal'
import { parseDate } from '@/lib/utils'

interface HomeV2Props {
  posts: BlogPost[]
}

const projects = [
  {
    name: 'Apptegy · Thrillshare',
    meta: 'Vue · Ruby · AWS',
    tag: 'FLAGSHIP',
    blurb: 'Platform connecting thousands of schools with their parents and students across the US.',
    stats: [
      { k: 'schools', v: '3,500+' },
      { k: 'users/day', v: '2.1M' },
      { k: 'uptime', v: '99.98%' },
    ],
  },
  {
    name: 'Ledger Mobile Banking',
    meta: 'React · TypeScript',
    tag: 'SCOTIABANK',
    blurb: 'Online credit card application flow that streamlined customer acquisition for Inverlat.',
    stats: [
      { k: 'steps', v: '7 → 3' },
      { k: 'conversion', v: '+28%' },
      { k: 'TTI', v: '1.1s' },
    ],
  },
  {
    name: 'Care Continuum',
    meta: 'Angular · GraphQL',
    tag: 'ACCENTURE',
    blurb: 'Healthcare practitioner workspace built on microservices with Node.js and Azure Functions.',
    stats: [
      { k: 'microsvc', v: '24' },
      { k: 'ttl p95', v: '180ms' },
      { k: 'a11y', v: 'AAA' },
    ],
  },
]

export default function HomeV2({ posts }: HomeV2Props) {
  const [step, setStep] = useState(0)
  const [mouse, setMouse] = useState({ x: 50, y: 30 })

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 2200)
    const t2 = setTimeout(() => setStep(2), 3800)
    const t3 = setTimeout(() => setStep(3), 5400)
    return () => {
      [t1, t2, t3].forEach(clearTimeout)
    }
  }, [])

  const onCardMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
    e.currentTarget.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
  }

  const blogTeasers = posts.slice(0, 3)

  return (
    <main>
      {/* ===== HERO ===== */}
      <section
        className="relative flex items-center overflow-hidden"
        style={{ minHeight: '100vh', paddingTop: 64 }}
        onMouseMove={e =>
          setMouse({
            x: (e.clientX / window.innerWidth) * 100,
            y: (e.clientY / window.innerHeight) * 100,
          })}
      >
        <div className="bg-grid-v2" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(600px circle at ${mouse.x}% ${mouse.y}%, hsl(24 95% 53% / 0.08), transparent 60%)`,
            transition: 'background .3s',
          }}
        />

        <div className="relative mx-auto w-full max-w-[1120px] px-4 sm:px-8" style={{ paddingTop: 40, paddingBottom: 40 }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
            <div>
              <Reveal>
                <div className="eyebrow-v2 mb-7">SOFTWARE ENGINEER · 2017 — NOW</div>
              </Reveal>
              <Reveal delay={1}>
                <h1
                  className="font-mono"
                  style={{
                    fontSize: 'clamp(44px, 7vw, 84px)',
                    lineHeight: 0.96,
                    letterSpacing: '-0.04em',
                    fontWeight: 600,
                    margin: '0 0 8px',
                    background: 'linear-gradient(180deg, hsl(var(--foreground)), hsl(var(--foreground) / 0.65))',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  Eduardo
                  <br />
                  Gaytan
                  <span style={{ color: 'hsl(24 95% 53%)' }}>.</span>
                </h1>
              </Reveal>
              <Reveal delay={2}>
                <p className="text-foreground/70" style={{ fontSize: 17, lineHeight: 1.55, maxWidth: 460, margin: '24px 0 32px' }}>
                  Senior engineer. Eight years building fast, accessible web apps across
                  education, healthcare, and fintech. Shipping thoughtful things with Vue,
                  React, Ruby, and Node.
                </p>
              </Reveal>
              <Reveal delay={3}>
                <div className="flex flex-wrap gap-3">
                  <Link href="/about" className="btn-v2 primary">
                    About me
                    {' '}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/blog" className="btn-v2 ghost">
                    Read the blog
                  </Link>
                </div>
              </Reveal>
              <Reveal delay={4}>
                <div
                  className="font-mono text-muted-foreground"
                  style={{ marginTop: 56, display: 'flex', gap: 24, fontSize: 11, flexWrap: 'wrap' }}
                >
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {' '}
                    Based in the US
                  </span>
                  {/* <span style={{ color: 'hsl(24 95% 53% / 0.35)' }}>/</span>
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className="inline-block"
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        background: 'hsl(140 60% 55%)',
                        boxShadow: '0 0 8px hsl(140 60% 55% / 0.7)',
                      }}
                    />
                    {' '}
                    Available for select work
                  </span> */}
                </div>
              </Reveal>
            </div>

            {/* Terminal REPL */}
            <Reveal delay={2}>
              <Terminal title="~ whoami">
                <Prompt cmd="whoami" />
                <div style={{ color: 'hsl(var(--foreground) / 0.7)', paddingLeft: 22 }}>
                  <Typewriter
                    speed={16}
                    lines={[
                      'eduardo · senior software engineer',
                      'apptegy · full-stack · vue + ruby',
                      '',
                    ]}
                  />
                </div>
                {step >= 1 && <Prompt cmd="cat ./principles.md" />}
                {step >= 1 && (
                  <div style={{ color: 'hsl(var(--foreground) / 0.7)', paddingLeft: 22 }}>
                    <div>
                      {'// shipping > perfection, but ship it '}
                      <span style={{ color: 'hsl(24 95% 53%)' }}>well</span>
                      .
                    </div>
                    <div>// accessibility is not a phase.</div>
                    <div>// the best architecture is the one your team can keep.</div>
                    <div>&nbsp;</div>
                  </div>
                )}
                {step >= 2 && <Prompt cmd="ls ./toolbelt" />}
                {step >= 2 && (
                  <div
                    style={{
                      paddingLeft: 22,
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '4px 14px',
                      color: 'hsl(var(--foreground) / 0.75)',
                    }}
                  >
                    {['typescript', 'vue', 'react', 'angular', 'node', 'ruby', 'graphql', 'aws', 'azure', 'jenkins'].map(
                      t => (
                        <span
                          key={t}
                          style={{ color: t === 'vue' || t === 'ruby' ? 'hsl(24 95% 53%)' : 'inherit' }}
                        >
                          {t}
                        </span>
                      ),
                    )}
                    <div style={{ width: '100%' }}>&nbsp;</div>
                  </div>
                )}
                {step >= 3 && <Prompt cmd="./contact.sh --now" />}
                {step >= 3 && (
                  <div style={{ color: 'hsl(140 60% 55%)', paddingLeft: 22 }}>
                    → ready. press
                    {' '}
                    <Kbd>⌘K</Kbd>
                    {' '}
                    to open the command palette
                    <span className="caret" />
                  </div>
                )}
              </Terminal>
            </Reveal>
          </div>
        </div>

        {/* coordinates strip */}
        <div
          className="hidden sm:flex font-mono"
          style={{
            position: 'absolute',
            bottom: 24,
            left: 0,
            right: 0,
            padding: '0 32px',
            justifyContent: 'space-between',
            fontSize: 10,
            color: 'hsl(var(--muted-foreground) / 0.7)',
            letterSpacing: '0.1em',
          }}
        >
          <span>LAT 00.000 · LON 00.000</span>
          <span>SCROLL TO EXPLORE ↓</span>
          <span>v2.1.0 · 2026-04</span>
        </div>
      </section>

      {/* ===== FEATURED PROJECTS ===== */}
      <section className="relative" style={{ padding: '96px 0' }}>
        <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-8">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4 mb-10">
              <div>
                <div className="eyebrow-v2 mb-3.5">01 — SELECTED WORK</div>
                <h2
                  className="font-mono"
                  style={{ fontSize: 36, letterSpacing: '-0.03em', fontWeight: 600, margin: 0 }}
                >
                  Things I&apos;ve shipped.
                </h2>
              </div>
              <Link
                href="/about"
                className="link-u inline-flex items-center gap-2 font-mono"
                style={{ fontSize: 13 }}
              >
                Full experience
                {' '}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p, i) => (
              <Reveal key={p.name} delay={(Math.min(i + 1, 3)) as 1 | 2 | 3}>
                <article className="proj-card" onMouseMove={onCardMove}>
                  <div className="flex justify-between items-center mb-4.5" style={{ marginBottom: 18 }}>
                    <Chip dot>{p.tag}</Chip>
                    <span
                      className="font-mono"
                      style={{ fontSize: 11, color: 'hsl(var(--muted-foreground) / 0.7)' }}
                    >
                      0
                      {i + 1}
                    </span>
                  </div>
                  <h3
                    className="font-mono"
                    style={{
                      fontSize: 20,
                      fontWeight: 600,
                      margin: '0 0 6px',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {p.name}
                  </h3>
                  <div className="v2-meta" style={{ marginBottom: 14 }}>{p.meta}</div>
                  <p
                    className="text-foreground/70"
                    style={{ fontSize: 13.5, lineHeight: 1.6, margin: '0 0 22px', minHeight: 60 }}
                  >
                    {p.blurb}
                  </p>
                  <div
                    className="grid grid-cols-3 gap-2"
                    style={{ paddingTop: 16, borderTop: '1px dashed hsl(var(--border))' }}
                  >
                    {p.stats.map(s => (
                      <div key={s.k}>
                        <div
                          className="font-mono"
                          style={{
                            fontSize: 18,
                            color: 'hsl(24 95% 53%)',
                            fontWeight: 500,
                            letterSpacing: '-0.02em',
                          }}
                        >
                          {s.v}
                        </div>
                        <div
                          className="font-mono"
                          style={{
                            fontSize: 10,
                            color: 'hsl(var(--muted-foreground) / 0.8)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            marginTop: 2,
                          }}
                        >
                          {s.k}
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BLOG TEASER ===== */}
      {blogTeasers.length > 0 && (
        <section className="relative" style={{ paddingTop: 40, paddingBottom: 96 }}>
          <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-16 items-start">
              <Reveal>
                <div className="lg:sticky" style={{ top: 100 }}>
                  <div className="eyebrow-v2 mb-3.5">02 — WRITING</div>
                  <h2
                    className="font-mono"
                    style={{
                      fontSize: 36,
                      letterSpacing: '-0.03em',
                      fontWeight: 600,
                      margin: '0 0 16px',
                      lineHeight: 1.1,
                    }}
                  >
                    Notes from the
                    <br />
                    terminal.
                  </h2>
                  <p
                    className="text-muted-foreground"
                    style={{ fontSize: 14, lineHeight: 1.6, margin: '0 0 22px' }}
                  >
                    Things I&apos;ve learned shipping production software, from performance to CI/CD pipelines.
                  </p>
                  <Link
                    href="/blog"
                    className="link-u inline-flex items-center gap-2 font-mono"
                    style={{ fontSize: 13, color: 'hsl(24 95% 53%)' }}
                  >
                    All posts
                    {' '}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>

              <div>
                {blogTeasers.map((p, i) => (
                  <Reveal key={p.id} delay={(Math.min(i + 1, 3)) as 1 | 2 | 3}>
                    <Link
                      href={`/blog/${p.id}`}
                      className="group block w-full text-left"
                      style={{
                        padding: '24px 0',
                        borderTop: i === 0 ? 'none' : '1px solid hsl(var(--border))',
                      }}
                    >
                      <div className="v2-meta mb-2 flex items-center gap-1">
                        <span>{format(parseDate(p.date), 'MMM d, yyyy')}</span>
                        <span className="sep">/</span>
                        <Clock className="h-3 w-3" />
                        <span>5 min</span>
                      </div>
                      <h3
                        className="font-mono flex gap-3 items-baseline"
                        style={{
                          fontSize: 20,
                          fontWeight: 500,
                          letterSpacing: '-0.02em',
                          margin: '0 0 8px',
                        }}
                      >
                        <span className="flex-1">{p.title}</span>
                        <ArrowRight
                          className="h-4 w-4 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1.5"
                          style={{ color: 'hsl(24 95% 53%)' }}
                        />
                      </h3>
                      {p.description && (
                        <p
                          className="text-muted-foreground"
                          style={{ fontSize: 13.5, lineHeight: 1.6, margin: '0 0 12px' }}
                        >
                          {p.description}
                        </p>
                      )}
                      <div className="flex gap-1.5 flex-wrap">
                        {p.tags?.slice(0, 3).map(t => (
                          <Chip key={t}>{t}</Chip>
                        ))}
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== FOOTER CONTACT ===== */}
      <section style={{ padding: '40px 0 60px' }}>
        <div className="mx-auto w-full max-w-[760px] px-4 sm:px-8">
          <Reveal>
            <GlowRule className="mb-14" />
          </Reveal>
          <Reveal delay={1}>
            <div className="text-center">
              <div className="eyebrow-v2 mb-4" style={{ justifyContent: 'center' }}>
                LET&apos;S TALK
              </div>
              <p
                className="font-mono text-foreground/85"
                style={{
                  fontSize: 28,
                  letterSpacing: '-0.02em',
                  margin: '0 0 32px',
                  lineHeight: 1.3,
                }}
              >
                Building something that needs a steady pair of hands?
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <BtnLink href="mailto:lalo@hey.com">
                  lalo@hey.com
                  {' '}
                  <Send className="h-4 w-4" />
                </BtnLink>
                <BtnLink
                  href="https://github.com/azuri-gm"
                  target="_blank"
                  rel="noreferrer"
                  variant="ghost"
                >
                  github.com/azuri-gm
                  {' '}
                  <ExternalLink className="h-3.5 w-3.5" />
                </BtnLink>
              </div>
            </div>
          </Reveal>
          <div
            className="font-mono flex justify-between text-muted-foreground"
            style={{ marginTop: 80, fontSize: 11 }}
          >
            <span>© 2026 eduardo gaytan</span>
            <span>built with care</span>
          </div>
        </div>
      </section>
    </main>
  )
}
