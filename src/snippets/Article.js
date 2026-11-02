export default function Component({ data }) {
    if (!data) return null;

    const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": data.title,
        "description": data.description,
        "url": `${process.env.NEXT_PUBLIC_WEB}/blog/${data.slug}`,
        ...(data.image ? { "image": data.image } : {}),
        ...(data.author?.name ? {
            "author": {
                "@type": "Person",
                "name": data.author.name
            }
        } : {
            "author": {
                "@type": "Organization",
                "name": process.env.NEXT_PUBLIC_NAME
            }
        }),
        "publisher": {
            "@type": "Organization",
            "name": process.env.NEXT_PUBLIC_NAME,
            "logo": {
                "@type": "ImageObject",
                "url": `${process.env.NEXT_PUBLIC_IMG}/icons/icon-180.png`
            }
        },
        "datePublished": data.publishedAt ? new Date(data.publishedAt).toISOString() : (data.createdAt ? new Date(data.createdAt).toISOString() : undefined),
        "dateModified": data.updatedAt ? new Date(data.updatedAt).toISOString() : (data.publishedAt ? new Date(data.publishedAt).toISOString() : undefined),
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${process.env.NEXT_PUBLIC_WEB}/blog/${data.slug}`
        }
    };

    return (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    );
}
