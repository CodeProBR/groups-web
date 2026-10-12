import { NextResponse } from "next/server";
import { default as mongodb } from "@/lib/mongoDB";
import { parse } from "tldts";

function sanitizeKey(str) {
    return str.replace(/\./g, "[dot]").replace(/\$/g, "[dollar]");
}

export async function POST(request) {
    const client = await mongodb(process.env.DATABASE);
    const db = client.db();

    const body = await request.json();
    const { type, url, referer, ad } = body;

    if (!url) return NextResponse.json({ ok: false, error: "Missing url" });

    const userAgent = (request.headers.get("user-agent") || "").toLowerCase();
    const isBot = ["bot", "spider", "crawler", "preview", "fetch", "scraper"].some((bot) =>
        userAgent.includes(bot)
    );
    if (isBot) return NextResponse.json({ ok: true });

    // Data "limpa" no estilo Mongo (sempre 00:00:00 UTC)
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    // Descobre a source (apenas para views)
    let source = "direct";
    if (type === "views") {
        try {
            if (referer) {
                if (!referer.includes(".")) {
                    source = referer.toLowerCase();
                } else {
                    const safeUrl = referer.startsWith("http") ? referer : `http://${referer}`;
                    const { domain } = parse(safeUrl);
                    if (domain) source = domain.split(".")[0];
                }
            }
        } catch (e) { }
        source = sanitizeKey(source);
    }

    const query = { url, date: today };
    const update = { $setOnInsert: { url, date: today } };

    if (type === "views") {
        update.$inc = {
            views: 1,
            [`sources.${source}`]: 1,
        };
    } else if (type === "clicks") {
        update.$inc = { clicks: 1 };
    } else if (type === "shares") {
        update.$inc = { shares: 1 };
    } else if (type === "ads") {
        update.$inc = {
            [`ads.${ad}`]: 1,
        };
    }

    await db.collection("insights").updateOne(query, update, { upsert: true });

    /*if (type === "views" && url.split('/')[1] == 'grupo') {
        await db.collection("groups").updateOne({ slug: url.split('/')[2] }, { $inc: { view: 1 } }, { upsert: false });
    }

    if (type === "clicks" && url.split('/')[1] == 'grupo') {
        await db.collection("groups").updateOne({ slug: url.split('/')[2] }, { $inc: { clicks: 1 } }, { upsert: false });
    }*/

    if (url.split('/')[1] == 'grupo') {
        const slug = url.split('/')[2];
        const group = slug.split('-').pop();
        await db.collection("groups_analytics_daily").updateOne(
            {
                group,
                date: new Date().toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' }),
            },
            {
                $inc: {
                    ...(type === 'views' ? { views: 1 } : {}),
                    ...(type === 'clicks' ? { clicks: 1 } : {}),
                    //...(type === 'shares' ? { shares: 1 } : {})
                    //...(type === 'saves' ? { saves: 1 } : {})
                    //...(type === 'reports' ? { reports: 1 } : {})
                },

                $setOnInsert: {
                    group,
                    date: new Date().toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' }),
                    createdAt: new Date(),
                },

                $set: {
                    updatedAt: new Date(),
                }
            },
            {
                upsert: true
            }
        );
    }

    return NextResponse.json({ ok: true });
}
