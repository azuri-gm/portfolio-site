'use client'

import { ArrowLeft, ArrowRight, Briefcase, Clock, MapPin } from 'lucide-react'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { Btn, Chip } from '@/components/v2/primitives'
import { Reveal } from '@/components/v2/reveal'

interface Experience {
  title: string
  company: string
  type: string
  date: string
  dur: string
  logo: string
  stack: string[]
  bullets: string[]
}

const experiences: Experience[] = [
  {
    title: 'Senior Software Engineer',
    company: 'Apptegy',
    type: 'Full time',
    date: 'May 2020 — Now',
    dur: '5y 11m',
    logo:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/apptegy-logo-A7HlhpkH8ZxjoZnTXpyZqRFoi23moz.webp',
    stack: ['Vue.js', 'Ruby', 'JavaScript', 'Jenkins', 'AWS'],
    bullets: [
      'Leading development of a Vue.js platform connecting thousands of US schools with parents and students.',
      'Implementing robust CI/CD pipelines using Jenkins for automated builds and AWS for deployment.',
      'Architecting scalable solutions using Vue.js, JavaScript, and Ruby while maintaining high code quality.',
      'Collaborating with cross-functional teams on features that enhance user experience and engagement.',
    ],
  },
  {
    title: 'Senior Application Delivery Analyst',
    company: 'Accenture',
    type: 'Full time',
    date: 'Aug 2017 — May 2020',
    dur: '2y 9m',
    logo:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/accenture-logo-rlYvdLKVxATMX03P9a7q5342vO61iP.png',
    stack: ['Node.js', 'TypeScript', 'React', 'Angular', 'GraphQL', 'Azure'],
    bullets: [
      'Spearheaded full-stack development for healthcare and financial sector applications.',
      'Engineered microservices architecture for scalable, decoupled apps using Node.js and TypeScript.',
      'Led migrations from WordPress to modern stacks with performance and accessibility wins.',
      'Architected frontend solutions using React, Angular, and Gatsby.js with GraphQL APIs.',
      'Implemented Azure Functions for serverless computing to optimize performance and cost.',
    ],
  },
  {
    title: 'Front-End Web Developer',
    company: 'Scotiabank Inverlat',
    type: 'Full time',
    date: 'Jan 2017 — Jul 2017',
    dur: '7m',
    logo:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Scotiabank%20Logo-ZzHsnH1Sixt3J8Vxc9GawUaoiT0Ze8.webp',
    stack: ['HTML5', 'CSS3', 'Angular 2', 'jQuery'],
    bullets: [
      'Developed and launched an online credit card application system that streamlined acquisition.',
      'Enhanced existing landing pages with modern JavaScript and jQuery for better conversion.',
      'Delivered responsive web solutions in an Agile environment with HTML5, CSS3, and Angular 2.',
      'Implemented performance optimizations and accessibility improvements across properties.',
    ],
  },
]

const skillGroups = [
  { group: 'LANGUAGES', items: ['TypeScript', 'JavaScript', 'Ruby', 'HTML5', 'CSS3'] },
  { group: 'FRAMEWORKS', items: ['Vue.js', 'React', 'Angular', 'Node.js', 'Tailwind CSS'] },
  { group: 'PLATFORMS', items: ['AWS', 'Azure', 'Jenkins', 'CI/CD'] },
  { group: 'PRACTICE', items: ['Microservices', 'GraphQL', 'REST APIs', 'Agile'] },
]

const principles = [
  {
    n: '01',
    k: 'Ship it well',
    v: 'Done is better than perfect, but "done" means tested, accessible, and documented.',
  },
  {
    n: '02',
    k: 'Architecture your team can keep',
    v: 'The cleverest design is the one the next engineer can extend without rewriting.',
  },
  {
    n: '03',
    k: 'Boring tools, sharp outcomes',
    v: 'Pick the proven thing. Spend your novelty budget on the problem, not the stack.',
  },
]

export default function AboutPage() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [scrollPct, setScrollPct] = useState(0)

  const onScroll = () => {
    const el = scrollerRef.current
    if (!el)
      return
    const max = el.scrollWidth - el.clientWidth
    setScrollPct(max ? (el.scrollLeft / max) * 100 : 0)
  }

  const scrollBy = (dir: number) => {
    scrollerRef.current?.scrollBy({ left: dir * 420, behavior: 'smooth' })
  }

  return (
    <main style={{ paddingTop: 104, paddingBottom: 80 }}>
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-8">
        {/* Header */}
        <Reveal>
          <div className="eyebrow-v2 mb-4">/ABOUT</div>
        </Reveal>
        <Reveal delay={1}>
          <h1
            className="font-mono"
            style={{
              fontSize: 'clamp(40px,6vw,64px)',
              letterSpacing: '-0.04em',
              fontWeight: 600,
              margin: '0 0 20px',
              lineHeight: 1,
            }}
          >
            A bit about me
            <span style={{ color: 'hsl(24 95% 53%)' }}>.</span>
          </h1>
        </Reveal>
        <Reveal delay={2}>
          <p
            className="text-foreground/70"
            style={{ maxWidth: 620, fontSize: 17, lineHeight: 1.6, margin: '0 0 24px' }}
          >
            Senior software engineer with eight years shipping web apps across education, healthcare,
            and financial services. I care about clean code, thoughtful design, and shipping things
            that matter.
          </p>
        </Reveal>
        <Reveal delay={3}>
          <div
            className="font-mono flex flex-wrap gap-4 text-muted-foreground"
            style={{ fontSize: 12, marginBottom: 80 }}
          >
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {' '}
              Based in the US
            </span>
            <span style={{ color: 'hsl(24 95% 53% / 0.35)' }}>/</span>
            <span className="inline-flex items-center gap-1.5">
              <Briefcase className="h-3.5 w-3.5" />
              {' '}
              Senior Software Engineer, Apptegy
            </span>
            <span style={{ color: 'hsl(24 95% 53% / 0.35)' }}>/</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {' '}
              8+ years
            </span>
          </div>
        </Reveal>

        {/* SKILLS */}
        <section style={{ marginBottom: 96 }}>
          <Reveal>
            <div className="eyebrow-v2" style={{ marginBottom: 32 }}>01 — TOOLBELT</div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {skillGroups.map((s, i) => (
              <Reveal key={s.group} delay={(Math.min(i + 1, 4)) as 1 | 2 | 3 | 4}>
                <div
                  className="bg-card/60"
                  style={{
                    padding: '20px 22px',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 10,
                  }}
                >
                  <div
                    className="font-mono"
                    style={{
                      fontSize: 10,
                      letterSpacing: '0.14em',
                      color: 'hsl(24 95% 53% / 0.9)',
                      marginBottom: 14,
                    }}
                  >
                    {s.group}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {s.items.map(it => (
                      <Chip key={it}>{it}</Chip>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* HORIZONTAL TIMELINE */}
        <section>
          <Reveal>
            <div className="flex items-baseline justify-between mb-3.5">
              <div>
                <div className="eyebrow-v2 mb-3.5">02 — COMMIT LOG</div>
                <h2
                  className="font-mono"
                  style={{
                    fontSize: 32,
                    letterSpacing: '-0.03em',
                    fontWeight: 600,
                    margin: 0,
                  }}
                >
                  Work experience
                </h2>
              </div>
              <div className="hidden sm:flex gap-2">
                <Btn
                  variant="ghost"
                  onClick={() => scrollBy(-1)}
                  aria-label="Scroll left"
                  style={{ height: 38, padding: '0 12px' }}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Btn>
                <Btn
                  variant="ghost"
                  onClick={() => scrollBy(1)}
                  aria-label="Scroll right"
                  style={{ height: 38, padding: '0 12px' }}
                >
                  <ArrowRight className="h-4 w-4" />
                </Btn>
              </div>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <div className="relative" style={{ marginTop: 12 }}>
              <div
                style={{
                  position: 'absolute',
                  top: 60,
                  left: 0,
                  right: 0,
                  height: 1,
                  background:
                    'linear-gradient(to right, transparent, hsl(var(--border)) 5%, hsl(var(--border)) 95%, transparent)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: 60,
                  left: 0,
                  height: 1,
                  width: `${scrollPct}%`,
                  background: 'hsl(24 95% 53%)',
                  boxShadow: '0 0 8px hsl(24 95% 53% / 0.6)',
                  transition: 'width .1s',
                }}
              />
            </div>

            <div ref={scrollerRef} onScroll={onScroll} className="timeline-h">
              {experiences.map(x => (
                <article
                  key={x.company}
                  className="relative bg-card/60"
                  style={{
                    padding: '26px 26px 22px',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 12,
                  }}
                >
                  {/* marker on rail */}
                  <div
                    style={{
                      position: 'absolute',
                      top: -34,
                      left: 26,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    <span
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        background: 'hsl(var(--background))',
                        border: '2px solid hsl(24 95% 53%)',
                        boxShadow: '0 0 12px hsl(24 95% 53% / 0.7)',
                      }}
                    />
                    <span
                      className="font-mono text-muted-foreground"
                      style={{ fontSize: 11, letterSpacing: '0.05em' }}
                    >
                      {x.date.split(' — ')[0].toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="relative flex-shrink-0 overflow-hidden bg-muted/50"
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 6,
                        border: '1px solid hsl(var(--border))',
                      }}
                    >
                      <Image src={x.logo} alt={`${x.company} logo`} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3
                        className="font-mono"
                        style={{
                          fontSize: 15,
                          fontWeight: 600,
                          margin: 0,
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {x.title}
                      </h3>
                      <div
                        className="font-mono"
                        style={{ fontSize: 12, color: 'hsl(24 95% 53%)', marginTop: 2 }}
                      >
                        {x.company}
                      </div>
                    </div>
                    <Chip>{x.dur}</Chip>
                  </div>

                  <div
                    className="font-mono text-muted-foreground"
                    style={{ fontSize: 11, marginBottom: 14 }}
                  >
                    {x.date}
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {x.stack.map(s => (
                      <Chip key={s}>{s}</Chip>
                    ))}
                  </div>

                  <div style={{ borderTop: '1px dashed hsl(var(--border))', paddingTop: 14 }}>
                    <ul
                      className="list-none p-0 m-0 flex flex-col gap-2.5"
                      style={{ listStyle: 'none' }}
                    >
                      {x.bullets.map((b, j) => (
                        <li
                          key={j}
                          className="flex gap-2.5 text-foreground/70"
                          style={{ fontSize: 13, lineHeight: 1.55 }}
                        >
                          <span
                            className="font-mono flex-shrink-0"
                            style={{ color: 'hsl(24 95% 53% / 0.5)' }}
                          >
                            --
                          </span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
              {/* end card */}
              <article
                className="flex flex-col justify-center items-center text-center"
                style={{
                  padding: 26,
                  border: '1px dashed hsl(var(--border))',
                  borderRadius: 12,
                  background: 'transparent',
                  minHeight: 340,
                }}
              >
                <div
                  className="font-mono"
                  style={{ fontSize: 28, color: 'hsl(24 95% 53%)', marginBottom: 10 }}
                >
                  ?
                </div>
                <div
                  className="font-mono text-foreground/80"
                  style={{ fontSize: 13, marginBottom: 6 }}
                >
                  What&apos;s next?
                </div>
                <div
                  className="font-mono text-muted-foreground"
                  style={{ fontSize: 11, maxWidth: 240 }}
                >
                  Open to thoughtful teams building tools people rely on.
                </div>
              </article>
            </div>
          </Reveal>
        </section>

        {/* PRINCIPLES */}
        <section style={{ marginTop: 96 }}>
          <Reveal>
            <div className="eyebrow-v2" style={{ marginBottom: 32 }}>03 — PRINCIPLES</div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {principles.map((p, i) => (
              <Reveal key={p.n} delay={(Math.min(i + 1, 3)) as 1 | 2 | 3}>
                <div
                  className="bg-card/60"
                  style={{
                    padding: '26px 24px',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 10,
                  }}
                >
                  <div
                    className="font-mono"
                    style={{
                      fontSize: 11,
                      color: 'hsl(24 95% 53% / 0.8)',
                      letterSpacing: '0.1em',
                      marginBottom: 16,
                    }}
                  >
                    P ·
                    {' '}
                    {p.n}
                  </div>
                  <h3
                    className="font-mono"
                    style={{
                      fontSize: 17,
                      fontWeight: 500,
                      margin: '0 0 10px',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {p.k}
                  </h3>
                  <p
                    className="text-muted-foreground"
                    style={{ fontSize: 13.5, lineHeight: 1.6, margin: 0 }}
                  >
                    {p.v}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
