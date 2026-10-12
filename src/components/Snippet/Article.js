export default function Component({ data }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": data.title,
        "description": data.summary,
        "url": `${process.env.NEXT_PUBLIC_WEB}/blog/${data.slug}`,
        "image": `${process.env.NEXT_PUBLIC_IMG}${data.image?.url}`,
        "author": {
            "@type": "Person",
            "name": data.author.name
        },
        "publisher": {
            "@type": "Organization",
            "name": process.env.NEXT_PUBLIC_NAME,
            "logo": {
                "@type": "ImageObject",
                "url": `${process.env.NEXT_PUBLIC_IMG}/icons/icon-180.png`
            }
        },
        "datePublished": data.publishedAt,
        "dateModified": data.updatedAt,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${process.env.NEXT_PUBLIC_WEB}/blog/${data.slug}`
        }
    };

    return (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    );
}
