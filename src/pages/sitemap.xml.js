import { postFilePaths, POSTS_PATH } from "../utils/mdx"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

const Sitemap = () => {
    return null
}

export const getServerSideProps = async ({ res }) => {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://connorlove.com"

    // Get all post data for the sitemap
    const posts = postFilePaths.map((filePath) => {
        const source = fs.readFileSync(path.join(POSTS_PATH, filePath), "utf8")
        const { data } = matter(source)

        return {
            url: `${baseUrl}/articles/${filePath.replace(/\.mdx?$/, "")}`,
            lastModified: data.updatedAt || data.date || new Date().toISOString(),
            changefreq: "weekly",
            priority: data.featured ? "1.0" : "0.8",
        }
    })

    // Add other important pages
    const pages = [
        {
            url: baseUrl,
            lastModified: new Date().toISOString(),
            changefreq: "daily",
            priority: "1.0",
        },
        {
            url: `${baseUrl}/articles`,
            lastModified: new Date().toISOString(),
            changefreq: "daily",
            priority: "0.9",
        },
        // Add other important pages here
    ]

    const allPages = [...pages, ...posts]

    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPages
            .map((page) => {
                return `
            <url>
              <loc>${page.url}</loc>
              <lastmod>${page.lastModified}</lastmod>
              <changefreq>${page.changefreq}</changefreq>
              <priority>${page.priority}</priority>
            </url>
          `
            })
            .join("")}
    </urlset>
  `

    res.setHeader("Content-Type", "text/xml")
    res.write(sitemap)
    res.end()

    return {
        props: {},
    }
}

export default Sitemap
