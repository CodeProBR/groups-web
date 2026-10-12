export default async function Component({ name, url, description }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name,
        url: `${process.env.NEXT_PUBLIC_WEB}${url}`,
        description
    };

    return (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    );
}
