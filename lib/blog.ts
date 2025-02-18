import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'app/blog/posts')

export function getSortedPostsData() {
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
        ...(matterResult.data as { date: string, title: string }),
      }
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

export async function getPostData(id: string) {
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
      ...(matterResult.data as { date: string, title: string }),
    }
  }
  catch (error) {
    console.error(`Error in getPostData for id ${id}:`, error)
    throw error
  }
}
