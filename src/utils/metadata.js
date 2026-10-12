export default async function metadata(seo, slug) {
    const image = seo.image || '/logo.webp';
    const url = process.env.NEXT_PUBLIC_URL + '/' + slug;

    return {
        title: seo.title,
        description: seo.description,
        keywords: seo.keywords,
        url: url,
        image: process.env.NEXT_PUBLIC_IMG + image,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title: seo.title,
            description: seo.description,
            url: url,
            siteName: process.env.NEXT_PUBLIC_NAME,
            locale: "pt_BR",
            type: "website",
            images: [
                {
                    url: process.env.NEXT_PUBLIC_IMG + image,
                    alt: process.env.NEXT_PUBLIC_NAME,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: seo.title,
            description: seo.description,
            images: [process.env.NEXT_PUBLIC_IMG + image],
        },
        robots: {
            index: seo.index ?? true,
            follow: seo.index ?? true,
            nocache: true,
        },
        icons: {
            icon: [
                { url: process.env.NEXT_PUBLIC_IMG + `/icons/icon-16.png`, sizes: "16x16", type: 'image/png' },
                { url: process.env.NEXT_PUBLIC_IMG + `/icons/icon-32.png`, sizes: "32x32", type: 'image/png' },
            ],
            apple: [
                { url: process.env.NEXT_PUBLIC_IMG + `/icons/icon-180.png`, sizes: "180x180", type: 'image/png' }
            ]
        },
        manifest: process.env.NEXT_PUBLIC_URL + "/manifest.webmanifest",
    };
}
