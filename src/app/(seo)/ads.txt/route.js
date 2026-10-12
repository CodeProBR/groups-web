export const dynamic = 'force-static';

export async function GET() {
    const content = `google.com, pub-1452757382037765, DIRECT, f08c47fec0942fa0`;
    return new Response(content, { headers: { 'Content-Type': 'text/plain' }});
}