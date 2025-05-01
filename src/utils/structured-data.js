export function generateArticleSchema(article) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://connorlove.com"

    return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.abstract || "",
        image: article.banner ? `${baseUrl}${article.banner}` : `${baseUrl}/og/default-og.png`,
        author: {
            "@type": "Person",
            name: "Connor Love",
            url: baseUrl,
        },
        publisher: {
            "@type": "Organization",
            name: "Connor Love",
            logo: {
                "@type": "ImageObject",
                url: `${baseUrl}/static/avatar.jpg`,
            },
        },
        datePublished: article.date,
        dateModified: article.updatedAt || article.date,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${baseUrl}/articles/${article.slug}`,
        },
    }
}

export function generateBreadcrumbSchema(article) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://connorlove.com"

    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: baseUrl,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Articles",
                item: `${baseUrl}/articles`,
            },
            {
                "@type": "ListItem",
                position: 3,
                name: article.title,
                item: `${baseUrl}/articles/${article.slug}`,
            },
        ],
    }
}
