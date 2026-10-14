export const dynamic = 'force-dynamic';

export async function GET() {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 10);

    const content = `Contact: mailto:${process.env.NEXT_PUBLIC_EMAIL}
Expires: ${expires.toISOString()}
`;
    return new Response(content, { headers: { 'Content-Type': 'text/plain' } });
}