import { NextResponse } from "next/server";
import { default as mongodb, ObjectId } from "@/lib/mongoDB";

export async function POST(request) {
    try {
        const client = await mongodb(process.env.DATABASE);
        const db = client.db();

        const body = await request.json();
        const { product, pathname, referer } = body || {};

        if (!product) {
            return NextResponse.json({ ok: false, error: "Missing product" }, { status: 400 });
        }

        const userAgent = request.headers.get("user-agent") || "";
        const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || null;

        // 1. Inserir documento de clique em products_clicks
        const clickDoc = {
            product: {
                _id: product._id && ObjectId.isValid(product._id) ? new ObjectId(product._id) : null,
                name: product.name || null,
                url: product.url || null,
                price: product.price.current || null
            },
            pathname: pathname || null,
            referer: referer || null,
            userAgent,
            ip,
            createdAt: new Date()
        };

        await db.collection("products_clicks").insertOne(clickDoc);

        // 2. Incrementar atributo clicks na coleção products (+1)
        if (product._id && ObjectId.isValid(product._id)) {
            await db.collection("products").updateOne(
                { _id: new ObjectId(product._id) },
                { $inc: { clicks: 1 } }
            );
        } else if (product.url) {
            await db.collection("products").updateOne(
                { url: product.url },
                { $inc: { clicks: 1 } }
            );
        }

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error("Erro na rota /api/products:", error);
        return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
}
