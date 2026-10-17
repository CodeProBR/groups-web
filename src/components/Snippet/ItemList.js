export default async function Component({ data, name, type, slug }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name,
        numberOfItems: data.length,
        itemListElement: data.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            ...(type === "group") && {
                name: item.name,
                url: `${process.env.NEXT_PUBLIC_WEB}/${slug}/${item.slug}`,
            },
            ...(type === "post" || type === "guide") && {
                item: {
                    "@type": "Article",
                    headline: item.title,
                    url: `${process.env.NEXT_PUBLIC_WEB}/${slug}/${item.slug}`,
                    ...(item.publishedAt && { datePublished: new Date(item.publishedAt).toISOString() }),
                    ...(item.image && {
                        image: item.image
                    }),
                    ...(item.author && item.author?.name && {
                        author: {
                            "@type": "Person",
                            name: item.author.name
                        }
                    })
                }
            },
        })),
    };

    return (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    );
}
