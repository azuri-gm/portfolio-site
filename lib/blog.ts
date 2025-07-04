import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'app/blog/posts')

export interface BlogPost {
  id: string
  title: string
  date: string
  description?: string
  excerpt?: string
  tags?: string[]
  author?: string
  image?: string
  slug?: string
  content?: string
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const readingTime = Math.ceil(words / wordsPerMinute)
  return readingTime
}

export function formatRelativeTime(date: string): string {
  const now = new Date()
  const postDate = new Date(date)
  const diffInMs = now.getTime() - postDate.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  const diffInMonths = Math.floor(diffInDays / 30)
  const diffInYears = Math.floor(diffInDays / 365)

  if (diffInYears > 0) {
    return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`
  }
  if (diffInMonths > 0) {
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`
  }
  if (diffInDays > 0) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
  }
  return 'Today'
}

export function getSortedPostsData(): BlogPost[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, '')

      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      const matterResult = matter(fileContents)

      return {
        id,
        title: matterResult.data.title || 'Untitled',
        date: matterResult.data.date || new Date().toISOString().split('T')[0],
        description: matterResult.data.description || matterResult.data.excerpt || '',
        tags: matterResult.data.tags || [],
        author: matterResult.data.author || 'Anonymous',
        image: matterResult.data.image || '',
        slug: matterResult.data.slug || id,
      } as BlogPost
    })

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    }
    else {
      return -1
    }
  })
}

export async function getPostData(id: string): Promise<BlogPost> {
  try {
    const fullPath = path.join(postsDirectory, `${id}.md`)

    if (!fs.existsSync(fullPath)) {
      throw new Error(`Post not found: ${id}`)
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    return {
      id,
      content: matterResult.content,
      title: matterResult.data.title || 'Untitled',
      date: matterResult.data.date || new Date().toISOString().split('T')[0],
      description: matterResult.data.description || matterResult.data.excerpt || '',
      tags: matterResult.data.tags || [],
      author: matterResult.data.author || 'Anonymous',
      image: matterResult.data.image || '',
      slug: matterResult.data.slug || id,
    } as BlogPost
  }
  catch (error) {
    console.error(`Error in getPostData for id ${id}:`, error)
    throw error
  }
}
