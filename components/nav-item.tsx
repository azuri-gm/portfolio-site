"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface NavItemProps {
  href: string
  label: string
  onClick?: () => void
  className?: string
}

export function NavItem({ href, label, onClick, className }: NavItemProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        "relative px-3 py-2 transition-colors hover:text-primary",
        isActive ? "text-primary" : "text-foreground",
        className,
      )}
      onClick={onClick}
    >
      {label}
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-primary"
          layoutId="navbar-indicator"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  )
}

