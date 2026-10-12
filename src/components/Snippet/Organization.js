export default async function Component() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": process.env.NEXT_PUBLIC_NAME,
        "url": process.env.NEXT_PUBLIC_WEB,
        "logo": {
            "@type": "ImageObject",
            "url": `${process.env.NEXT_PUBLIC_IMG}/icons/icon-180.png`
        }
    };

    return (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    );
}
