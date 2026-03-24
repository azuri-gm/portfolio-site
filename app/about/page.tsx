'use client'

import { motion } from 'motion/react'
import { Briefcase, MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Timeline } from '@/components/timeline'

const skills = [
  'TypeScript', 'JavaScript', 'Vue.js', 'React', 'Angular',
  'Node.js', 'Ruby', 'GraphQL', 'REST APIs',
  'AWS', 'Azure', 'Jenkins', 'CI/CD',
  'HTML5', 'CSS3', 'Tailwind CSS',
  'Microservices', 'Agile',
]

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 pt-24 max-w-2xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-bold tracking-tighter mb-2">About</h1>
        <p className="text-muted-foreground">
          A bit about me, my background, and what I work with.
        </p>
      </motion.div>

      {/* Bio */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="mb-10"
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <MapPin className="h-3.5 w-3.5 text-primary/70" />
          <span>Based in the US</span>
          <span className="text-primary/30">{'/'}</span>
          <Briefcase className="h-3.5 w-3.5 text-primary/70" />
          <span>Senior Software Engineer</span>
        </div>
        <div className="space-y-4 text-sm leading-relaxed text-foreground/80">
          <p>
            {"I'm Eduardo Gaytan, a senior software engineer with a focus on building web applications that are fast, accessible, and well-crafted. I've spent the last 8+ years working across the full stack, from designing frontend architectures to deploying scalable backend services."}
          </p>
          <p>
            {"Currently at Apptegy, I lead the development of a Vue.js platform that connects schools, parents, and students across the US. Before that, I worked at Accenture building applications for healthcare and financial institutions, and at Scotiabank shipping consumer-facing products."}
          </p>
          <p>
            {"I care deeply about clean code, thoughtful design, and shipping things that matter. Outside of work, I write about development practices and experiment with new technologies."}
          </p>
        </div>
      </motion.section>

      <Separator className="mb-10 bg-border/50" />

      {/* Skills */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-10"
      >
        <h2 className="text-sm font-medium text-primary/80 mb-4 tracking-wide uppercase">Technologies I work with</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map(skill => (
            <Badge
              key={skill}
              variant="secondary"
              className="text-xs font-normal border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </motion.section>

      <Separator className="mb-10 bg-border/50" />

      {/* Experience */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        <h2 className="text-sm font-medium text-primary/80 mb-6 tracking-wide uppercase">Work experience</h2>
        <Timeline />
      </motion.section>
    </div>
  )
}
