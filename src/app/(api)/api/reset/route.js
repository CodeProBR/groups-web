import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const collectionParam = searchParams.get('collection');

    if (!collectionParam) {
        return NextResponse.json({
            error: 'Nenhuma coleção informada. Use ?collection=nome1,nome2'
        }, { status: 400 });
    }

    const collections = collectionParam
        .split(',')
        .map((c) => c.trim().toLowerCase())
        .filter(Boolean);

    const revalidated = [];

    for (const tag of collections) {
        try {
            revalidateTag(tag);
            revalidated.push(tag);
        } catch (error) {
            console.error(`Erro ao revalidar tag ${tag}:`, error);
        }
    }

    return NextResponse.json({
        success: true,
        revalidated,
        now: new Date().toISOString()
    });
}
