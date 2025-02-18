declare module 'gray-matter' {
  function matter(
    content: string,
    options?: {
      excerpt?: boolean
      excerpt_separator?: string
    }
  ): {
    data: { [key: string]: any }
    content: string
    excerpt?: string
  }

  export default matter
}
