export const dynamic = 'force-static';

export async function GET(request) {
    const content = `User-Agent: *
Allow: /

Sitemap: ${process.env.NEXT_PUBLIC_WEB}/sitemap.xml`;
    return new Response(content, { headers: { 'Content-Type': 'text/plain' } });
}