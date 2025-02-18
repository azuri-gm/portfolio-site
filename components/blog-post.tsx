import type React from "react"
import { MDXProvider } from "@mdx-js/react"
import { motion } from "framer-motion"

const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl font-semibold mt-6 mb-3" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p className="mb-4" {...props} />,
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="bg-muted text-muted-foreground px-1 py-0.5 rounded" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="bg-muted p-4 rounded-lg overflow-x-auto" {...props} />
  ),
  // Add more components as needed
}

export function BlogPost({ children }: { children: React.ReactNode }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert mx-auto px-4 py-8"
    >
      <MDXProvider components={components}>{children}</MDXProvider>
    </motion.article>
  )
}

