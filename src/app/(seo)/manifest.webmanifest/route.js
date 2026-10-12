export const dynamic = 'force-static';

export async function GET(request) {
    const content = {
        name: process.env.NEXT_PUBLIC_NAME,
        short_name: process.env.NEXT_PUBLIC_NAME,
        description: '',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        lang: 'pt-BR',
        background_color: '#fff',
        theme_color: '#27A7E7',
        icons: [
            { src: process.env.NEXT_PUBLIC_IMG + `/icons/icon-192.png`, sizes: '192x192', type: 'image/png' },
            { src: process.env.NEXT_PUBLIC_IMG + `/icons/icon-512.png`, sizes: '512x512', type: 'image/png' },
        ],
    };
    return new Response(JSON.stringify(content), {
        headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' },
    });
}