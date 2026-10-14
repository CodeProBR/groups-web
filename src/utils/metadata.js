export default async function metadata({ title, description, index, image, url }) {
    return {
        title: title,
        description: description,
        url: process.env.NEXT_PUBLIC_WEB + url,
        image: process.env.NEXT_PUBLIC_IMG + (image || '/logo.webp'),
        alternates: {
            canonical: process.env.NEXT_PUBLIC_WEB + url,
        },
        openGraph: {
            title: title,
            description: description,
            url: process.env.NEXT_PUBLIC_WEB + url,
            siteName: process.env.NEXT_PUBLIC_NAME,
            locale: process.env.NEXT_PUBLIC_LOCALE,
            type: "website",
            images: [
                {
                    url: process.env.NEXT_PUBLIC_IMG + (image || '/logo.webp'),
                    alt: process.env.NEXT_PUBLIC_NAME,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: title,
            description: description,
            images: [process.env.NEXT_PUBLIC_IMG + (image || '/logo.webp')],
        },
        robots: {
            index: index ?? true,
            follow: index ?? true,
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
        manifest: process.env.NEXT_PUBLIC_WEB + "/manifest.webmanifest",
    };
}
