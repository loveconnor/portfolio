const Robots = () => {
    return null
}

export const getServerSideProps = ({ res }) => {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://connorlove.com"

    const robots = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml
`

    res.setHeader("Content-Type", "text/plain")
    res.write(robots)
    res.end()

    return {
        props: {},
    }
}

export default Robots
