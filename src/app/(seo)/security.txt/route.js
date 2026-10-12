export const dynamic = 'force-static';

export async function GET() {
    const content = `Contact: mailto:${process.env.NEXT_PUBLIC_EMAIL}
Expires: 2030-12-31
    `;
    return new Response(content, { headers: { 'Content-Type': 'text/plain' } });
}