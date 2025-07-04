import fs from 'fs'
import path from 'path'
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
