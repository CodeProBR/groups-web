export default async function Component({ data }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: data.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: `${process.env.NEXT_PUBLIC_WEB}${item.url}`
        })),
    };

    return (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    );
}
