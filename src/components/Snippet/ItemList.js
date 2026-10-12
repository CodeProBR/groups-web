export default async function Component({ data, name, type }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name,
        numberOfItems: data.length,
        itemListElement: data.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            ...type === "group" && {
                name: item.name,
                url: `${process.env.NEXT_PUBLIC_WEB}/groups/${item.slug}`,
            },
            ...type === "post" && {
                item: {
                    "@type": "Article",
                    headline: item.title,
                    url: `${process.env.NEXT_PUBLIC_WEB}/blog/${item.slug}`,
                    datePublished: item.publishedAt,
                    image: `${process.env.NEXT_PUBLIC_IMG}${item.image.url}`,
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
