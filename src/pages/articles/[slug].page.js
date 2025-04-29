"use client"

import fs from "fs"
import path from "path"
import { useMemo } from "react"
import { bundleMDX } from "mdx-bundler"
import { getMDXComponent } from "mdx-bundler/client"
import readingTime from "reading-time"
import rehypeImgSize from "rehype-img-size"
import rehypeMinify from "rehype-preset-minify"
import rehypeSlug from "rehype-slug"
import rehypePrism from "@mapbox/rehype-prism"
import { POSTS_PATH, postFilePaths } from "utils/mdx"
import { formatTimecode } from "utils/timecode"
import { Post, postMarkdown } from "layouts/Post"
import { ArticleProgress } from "components/Articles/ArticleProgress"
import { ArticleShare } from "components/Articles/ArticleShare"

export default function PostPage({ frontmatter, code, timecode }) {
  // Memoize the MDX component
  const MDXComponent = useMemo(() => getMDXComponent(code), [code])

  return (
    <>
      <ArticleProgress />
      <Post timecode={timecode} {...frontmatter}>
        <MDXComponent components={postMarkdown} />
        <ArticleShare title={frontmatter.title} slug={frontmatter.slug} />
      </Post>
    </>
  )
}

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`)
  const source = fs.readFileSync(postFilePath, "utf-8")

  // Use bundleMDX to transform the source content
  const { code, frontmatter } = await bundleMDX({
    source,
    mdxOptions(options) {
      options.remarkPlugins = [...(options.remarkPlugins ?? [])]
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypePrism,
        rehypeSlug,
        rehypeMinify,
        [rehypeImgSize, { dir: "public" }],
      ]

      return options
    },
  })

  // Calculate reading time based on the raw MDX content
  const { time } = readingTime(source)
  const timecode = formatTimecode(time)

  // Return props with the slug for sharing
  return {
    props: {
      code,
      frontmatter: {
        ...frontmatter,
        slug: params.slug,
      },
      timecode,
    },
    notFound: process.env.NODE_ENV === "production" && frontmatter.draft,
  }
}

export const getStaticPaths = async () => {
  // Get all file paths and convert them into slug parameters
  const paths = postFilePaths.map((filePath) => filePath.replace(/\.mdx?$/, "")).map((slug) => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}
