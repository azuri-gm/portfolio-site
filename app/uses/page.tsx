'use client'

import { motion } from 'motion/react'
import { BookText, Code, GitBranch, Keyboard, Laptop, Mouse, Send, Trello } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

const categories = [
  {
    title: 'Hardware',
    items: [
      {
        name: 'Macbook Pro 16',
        description:
          'So far it has been a breeze working on this machine, can deal with pretty much everything you throw at it.',
        icon: Laptop,
      },
      {
        name: 'Apple Magic Keyboard',
        description: 'Sleek, responsive, and comfortable for long coding sessions.',
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
    items: [
      {
        name: 'Visual Studio Code',
        description:
          "My editor of choice. Lightweight, extensible, and endlessly customizable.",
        icon: Code,
      },
      {
        name: 'Github Copilot',
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
    items: [
      {
        name: 'Notion',
        description: 'All-in-one workspace for notes, tasks, and project management.',
        icon: BookText,
      },
      {
        name: 'Jira',
        description: 'Robust project tracking and agile management tool.',
        icon: Trello,
      },
    ],
  },
]

export default function UsesPage() {
  return (
    <div className="container mx-auto px-4 py-16 pt-24 max-w-2xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-bold tracking-tight mb-2">Uses</h1>
        <p className="text-muted-foreground">
          The tools, hardware, and software I rely on day to day.
        </p>
      </motion.div>

      {/* Categories */}
      <div className="space-y-10">
        {categories.map((category, categoryIndex) => (
          <motion.section
            key={category.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: categoryIndex * 0.08 }}
          >
            <Badge variant="outline" className="text-[10px] font-medium mb-5 uppercase tracking-wider">
              {category.title}
            </Badge>

            <div>
              {category.items.map((item, itemIndex) => (
                <div key={item.name}>
                  <div className="group flex items-start gap-4 py-4 -mx-3 px-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted flex-shrink-0 mt-0.5">
                      <item.icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium leading-snug">{item.name}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  {itemIndex < category.items.length - 1 && (
                    <Separator />
                  )}
                </div>
              ))}
            </div>

            {categoryIndex < categories.length - 1 && (
              <Separator className="mt-6" />
            )}
          </motion.section>
        ))}
      </div>
    </div>
  )
}
