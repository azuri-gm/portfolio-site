'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface TimelineItem {
  title: string
  company: string
  type: string
  date: string
  logo: string
  responsibilities: string[]
}

const experiences: TimelineItem[] = [
  {
    title: 'Senior Software Engineer',
    company: 'Apptegy',
    type: 'Full time',
    date: 'May 2020 - Current',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/apptegy-logo-A7HlhpkH8ZxjoZnTXpyZqRFoi23moz.webp',
    responsibilities: [
      'Leading development of a comprehensive Vue.js solution for US educational institutions, revolutionizing school-parent-student communication',
      'Implementing robust CI/CD pipelines using Jenkins for automated builds and AWS for seamless deployment',
      'Architecting scalable solutions using Vue.js, JavaScript, and Ruby while maintaining high code quality standards',
      'Collaborating with cross-functional teams to deliver features that enhance user experience and engagement',
    ],
  },
  {
    title: 'Senior Application Delivery Analyst',
    company: 'Accenture',
    type: 'Full time',
    date: 'August 2017 - May 2020',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/accenture-logo-rlYvdLKVxATMX03P9a7q5342vO61iP.png',
    responsibilities: [
      'Spearheaded full-stack development of healthcare and financial sector applications, focusing on API development and frontend implementations',
      'Engineered microservices architecture for highly scalable and decoupled applications using Node.js and TypeScript',
      'Led successful migrations of client sites from WordPress to modern stack technologies, implementing performance optimizations and accessibility improvements',
      'Architected and developed frontend solutions using React, Angular, and Gatsby.js, integrating with GraphQL APIs',
      'Established and enforced best practices for development teams, improving code quality and maintainability',
      'Implemented Azure Functions for serverless computing, optimizing application performance and cost efficiency',
    ],
  },
  {
    title: 'Front-End Web Developer',
    company: 'Scotiabank Inverlat',
    type: 'Full time',
    date: 'January 2017 - July 2017',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Scotiabank%20Logo-ZzHsnH1Sixt3J8Vxc9GawUaoiT0Ze8.webp',
    responsibilities: [
      'Developed and launched an innovative online credit card application system, streamlining the customer acquisition process',
      'Enhanced existing landing pages with modern JavaScript and jQuery implementations, improving user experience and conversion rates',
      'Collaborated in an Agile environment to deliver responsive web solutions using HTML5, CSS3, and Angular 2',
      'Implemented performance optimizations and accessibility improvements across all web properties',
    ],
  },
]

export function Timeline() {
  return (
    <div className="space-y-4">
      {experiences.map((experience, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.08 }}
        >
          <Card className="border-l-2 border-l-primary/20 hover:border-l-primary/50 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-4">
                <div className="relative w-10 h-10 rounded-md overflow-hidden bg-muted flex-shrink-0">
                  <Image
                    src={experience.logo || '/placeholder.svg'}
                    alt={`${experience.company} logo`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-semibold leading-snug">{experience.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {experience.company}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Badge variant="outline" className="text-[10px] px-2 py-0 h-5 font-normal hidden sm:inline-flex">
                        {experience.type}
                      </Badge>
                      <span className="text-[11px] text-muted-foreground whitespace-nowrap">
                        {experience.date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Separator className="mb-3" />
              <ul className="space-y-2">
                {experience.responsibilities.map((item, i) => (
                  <li key={i} className="flex items-start text-xs text-muted-foreground leading-relaxed">
                    <span className="mr-2 text-primary/40 mt-px flex-shrink-0">{'--'}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
