export const dynamic = 'force-static';

export async function GET(request) {
    const content = {
        name: process.env.NEXT_PUBLIC_NAME,
        short_name: process.env.NEXT_PUBLIC_NAME,
        description: process.env.NEXT_PUBLIC_DESCRIPTION,
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        lang: process.env.NEXT_PUBLIC_LOCALE,
        background_color: '#fff',
        theme_color: process.env.NEXT_PUBLIC_COLOR,
        icons: [
            { src: process.env.NEXT_PUBLIC_IMG + `/icons/icon-192.png`, sizes: '192x192', type: 'image/png' },
            { src: process.env.NEXT_PUBLIC_IMG + `/icons/icon-512.png`, sizes: '512x512', type: 'image/png' },
        ],
    };
    return new Response(JSON.stringify(content), {
        headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' },
    });
}