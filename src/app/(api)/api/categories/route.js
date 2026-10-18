import { NextResponse } from 'next/server';
import { default as mongodb } from '@/lib/mongoDB';
import { revalidateTag } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const client = await mongodb(process.env.DATABASE);
        const db = client.db();

        // 1. Agrupar e contar os grupos ativos por categoryId
        const counts = await db.collection('groups').aggregate([
            { $match: { status: 'active', categoryId: { $ne: null } } },
            {
                $group: {
                    _id: '$categoryId',
                    total: { $sum: 1 }
                }
            }
        ]).toArray();

        const countsMap = new Map();
        for (const item of counts) {
            if (item._id) {
                countsMap.set(item._id.toString(), item.total);
            }
        }

        // 2. Buscar todas as categorias para garantir que as que não têm grupos fiquem com groups: 0
        const categories = await db.collection('categories').find({}, { projection: { _id: 1 } }).toArray();

        if (categories.length === 0) {
            return NextResponse.json({ ok: true, updated: 0, totalCategories: 0 });
        }

        const bulkOps = categories.map((cat) => {
            const total = countsMap.get(cat._id.toString()) || 0;
            return {
                updateOne: {
                    filter: { _id: cat._id },
                    update: { $set: { groups: total } }
                }
            };
        });

        const result = await db.collection('categories').bulkWrite(bulkOps);

        // Revalida a tag de cache do Next.js
        try {
            revalidateTag('categories');
        } catch (e) {
            console.error('Erro ao revalidar tag categories:', e);
        }

        return NextResponse.json({
            ok: true,
            updated: result.modifiedCount ?? result.matchedCount,
            matched: result.matchedCount,
            totalCategories: categories.length
        });
    } catch (error) {
        console.error('Erro ao atualizar total de grupos em categories (GET):', error);
        return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
}
