'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface TerminalProps {
  title?: string
  children: React.ReactNode
  className?: string
}

export function Terminal({ title = '~/eduardo', children, className }: TerminalProps) {
  return (
    <div className={cn('term', className)}>
      <div className="term-head">
        <div className="term-dots">
          <span className="term-dot term-dot-r" />
          <span className="term-dot term-dot-y" />
          <span className="term-dot term-dot-g" />
        </div>
        <span className="term-title">{title}</span>
        <span style={{ opacity: 0.4 }}>zsh</span>
      </div>
      <div className="term-body">{children}</div>
    </div>
  )
}

interface PromptProps {
  cmd?: string
  children?: React.ReactNode
}

export function Prompt({ cmd, children }: PromptProps) {
  return (
    <div className="v2-prompt">
      <span className="sym">❯</span>
      <span className="user">eduardo</span>
      <span className="at">@</span>
      <span className="host">mbp</span>
      <span className="at">:</span>
      <span className="path">~</span>
      <span className="cmd">{cmd || children}</span>
    </div>
  )
}

interface TypewriterProps {
  lines: string[]
  speed?: number
  onDone?: () => void
}

export function Typewriter({ lines, speed = 22, onDone }: TypewriterProps) {
  const [lineIdx, setLineIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (done)
      return
    if (lineIdx >= lines.length) {
      setDone(true)
      onDone?.()
      return
    }
    const current = lines[lineIdx]
    if (charIdx < current.length) {
      const t = setTimeout(() => setCharIdx(c => c + 1), speed)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setLineIdx(i => i + 1)
      setCharIdx(0)
    }, 280)
    return () => clearTimeout(t)
  }, [lineIdx, charIdx, done, lines, speed, onDone])

  return (
    <div style={{ whiteSpace: 'pre-wrap' }}>
      {lines.slice(0, lineIdx).map((l, i) => (
        <div key={i}>{l || '\u00A0'}</div>
      ))}
      {lineIdx < lines.length && (
        <div>
          {lines[lineIdx].slice(0, charIdx)}
          <span className="caret" />
        </div>
      )}
    </div>
  )
}
