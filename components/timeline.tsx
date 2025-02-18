"use client"

import { motion } from "framer-motion"
import Image from "next/image"

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
    title: "Senior Software Engineer",
    company: "Apptegy",
    type: "Full time",
    date: "May 2020 - Current",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/apptegy-logo-A7HlhpkH8ZxjoZnTXpyZqRFoi23moz.webp",
    responsibilities: [
      "Leading development of a comprehensive Vue.js solution for US educational institutions, revolutionizing school-parent-student communication",
      "Implementing robust CI/CD pipelines using Jenkins for automated builds and AWS for seamless deployment",
      "Architecting scalable solutions using Vue.js, JavaScript, and Ruby while maintaining high code quality standards",
      "Collaborating with cross-functional teams to deliver features that enhance user experience and engagement",
    ],
  },
  {
    title: "Senior Application Delivery Analyst",
    company: "Accenture",
    type: "Full time",
    date: "August 2017 - May 2020",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/accenture-logo-rlYvdLKVxATMX03P9a7q5342vO61iP.png",
    responsibilities: [
      "Spearheaded full-stack development of healthcare and financial sector applications, focusing on API development and frontend implementations",
      "Engineered microservices architecture for highly scalable and decoupled applications using Node.js and TypeScript",
      "Led successful migrations of client sites from WordPress to modern stack technologies, implementing performance optimizations and accessibility improvements",
      "Architected and developed frontend solutions using React, Angular, and Gatsby.js, integrating with GraphQL APIs",
      "Established and enforced best practices for development teams, improving code quality and maintainability",
      "Implemented Azure Functions for serverless computing, optimizing application performance and cost efficiency",
    ],
  },
  {
    title: "Front-End Web Developer",
    company: "Scotiabank Inverlat",
    type: "Full time",
    date: "January 2017 - July 2017",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Scotiabank%20Logo-ZzHsnH1Sixt3J8Vxc9GawUaoiT0Ze8.webp",
    responsibilities: [
      "Developed and launched an innovative online credit card application system, streamlining the customer acquisition process",
      "Enhanced existing landing pages with modern JavaScript and jQuery implementations, improving user experience and conversion rates",
      "Collaborated in an Agile environment to deliver responsive web solutions using HTML5, CSS3, and Angular 2",
      "Implemented performance optimizations and accessibility improvements across all web properties",
    ],
  },
]

export function Timeline() {
  return (
    <div className="relative container mx-auto px-4 py-16">
      <motion.h1
        className="text-5xl font-bold mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        WORK EXPERIENCE
      </motion.h1>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 md:left-[7px] top-0 bottom-0 w-0.5 bg-primary/30" />

        {/* Timeline items */}
        <div className="space-y-12">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              className="relative pl-6 md:pl-12"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-2 w-3.5 h-3.5 rounded-full border-4 border-primary bg-background" />

              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-accent/10">
                    <Image
                      src={experience.logo || "/placeholder.svg"}
                      alt={`${experience.company} logo`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{experience.title}</h3>
                    <p className="text-muted-foreground">
                      {experience.company} | {experience.type}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground md:ml-auto">{experience.date}</p>
              </div>

              <ul className="space-y-2 text-sm text-muted-foreground">
                {experience.responsibilities.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2">›</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

