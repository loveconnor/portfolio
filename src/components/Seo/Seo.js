"use client"

import Head from "next/head"
import { useRouter } from "next/router"

/**
 * @typedef {Object} SEOProps
 * @property {string} title
 * @property {string} description
 * @property {string} [image]
 * @property {boolean} [article]
 * @property {string} [publishedTime]
 * @property {string} [modifiedTime]
 * @property {string[]} [tags]
 * @property {string} [canonicalUrl]
 */

/**
 * @param {SEOProps} props
 */
export function SEO({
    title,
    description,
    image,
    article = false,
    publishedTime,
    modifiedTime,
    tags = [],
    canonicalUrl,
}) {
    const router = useRouter()
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com"
    const fullUrl = canonicalUrl || `${siteUrl}${router.asPath}`
    const ogImage = image || `${siteUrl}/og/default-og.png`

    return (
        <Head>
            {/* Basic Meta Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={article ? "article" : "website"} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={fullUrl} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            {/* Article Specific Meta Tags */}
            {article && publishedTime && <meta property="article:published_time" content={publishedTime} />}
            {article && modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
            {article && tags.length > 0 && tags.map((tag) => <meta property="article:tag" content={tag} key={tag} />)}

            {/* JSON-LD Structured Data */}
            {article && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Article",
                            headline: title,
                            description: description,
                            image: ogImage,
                            author: {
                                "@type": "Person",
                                name: "Connor Love",
                                url: siteUrl,
                            },
                            publisher: {
                                "@type": "Organization",
                                name: "Connor Love",
                                logo: {
                                    "@type": "ImageObject",
                                    url: `${siteUrl}/static/avatar.jpg`,
                                },
                            },
                            datePublished: publishedTime,
                            dateModified: modifiedTime || publishedTime,
                            mainEntityOfPage: {
                                "@type": "WebPage",
                                "@id": fullUrl,
                            },
                        }),
                    }}
                />
            )}
        </Head>
    )
}
