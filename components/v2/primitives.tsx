'use client'

import { cn } from '@/lib/utils'

interface EyebrowProps {
  children: React.ReactNode
  className?: string
}

export function Eyebrow({ children, className }: EyebrowProps) {
  return <span className={cn('eyebrow-v2', className)}>{children}</span>
}

interface ChipProps {
  children: React.ReactNode
  solid?: boolean
  dot?: boolean
  className?: string
}

export function Chip({ children, solid, dot, className }: ChipProps) {
  return (
    <span className={cn('chip-v2', solid && 'solid', className)}>
      {dot && <span className="dot" />}
      {children}
    </span>
  )
}

interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost'
  asChild?: never
}

export function Btn({ variant = 'primary', children, className, ...rest }: BtnProps) {
  return (
    <button type="button" className={cn('btn-v2', variant, className)} {...rest}>
      {children}
    </button>
  )
}

interface BtnLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'primary' | 'ghost'
}

export function BtnLink({ variant = 'primary', children, className, ...rest }: BtnLinkProps) {
  return (
    <a className={cn('btn-v2', variant, className)} {...rest}>
      {children}
    </a>
  )
}

export function Kbd({ children }: { children: React.ReactNode }) {
  return <span className="v2-kbd">{children}</span>
}

export function GlowRule({ className }: { className?: string }) {
  return <div className={cn('glow-rule', className)} />
}
