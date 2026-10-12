export const dynamic = 'force-static';

export async function GET() {
    const content = `/* Team */
Developer: ${process.env.NEXT_PUBLIC_NAME}
Site: ${process.env.NEXT_PUBLIC_WEB}

/* Thanks */
Community
    `;
    return new Response(content, { headers: { 'Content-Type': 'text/plain' } });
}