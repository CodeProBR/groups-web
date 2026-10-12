export default async function Component({ description }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": process.env.NEXT_PUBLIC_NAME,
        "url": process.env.NEXT_PUBLIC_WEB,
        "description": description,
        "inLanguage": process.env.NEXT_PUBLIC_LOCALE
    };

    return (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    );
}
