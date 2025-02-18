"use client"

import { motion } from "framer-motion"
import { Laptop, Keyboard, Mouse, Code, GitBranch, Send, BookText, Trello } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const categories = [
  {
    title: "Computer & Hardware",
    items: [
      {
        name: "Macbook Pro 16",
        description:
          "So far it has been a breeze working on this machine, can deal with pretty much everything you throw at it.",
        icon: Laptop,
      },
      {
        name: "Apple Magic Keyboard",
        description: "Sleek, responsive, and comfortable for long coding sessions.",
        icon: Keyboard,
      },
      {
        name: "Apple Magic Trackpad",
        description: "Precise control with gesture support for efficient navigation.",
        icon: Mouse,
      },
    ],
  },
  {
    title: "Development Tools",
    items: [
      {
        name: "Visual Studio Code",
        description:
          "My editor of choice, it's a very lightweight but pretty extensible piece of software. One of the selling points for me is how customizable it is (if you want to see my settings you can find them here).",
        icon: Code,
      },
      {
        name: "Github Copilot",
        description: "Using OpenAI Codex to help you code everyday, what more can I say?",
        icon: GitBranch,
      },
      { name: "Git", description: "Essential for version control and collaboration.", icon: GitBranch },
      { name: "Postman", description: "Indispensable for API testing and development.", icon: Send },
    ],
  },
  {
    title: "Productivity Tools",
    items: [
      { name: "Notion", description: "All-in-one workspace for notes, tasks, and project management.", icon: BookText },
      { name: "Jira", description: "Robust project tracking and agile management tool.", icon: Trello },
    ],
  },
]

export default function UsesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Tech Stack and Tools
      </motion.h1>
      <motion.p
        className="text-xl text-center mb-12 text-muted-foreground"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        This is a list of the equipment I use as part of my day-to-day work as a software engineer.
      </motion.p>

      {categories.map((category, index) => (
        <motion.div
          key={category.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold mb-4">{category.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.items.map((item, itemIndex) => (
              <Card key={item.name} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

