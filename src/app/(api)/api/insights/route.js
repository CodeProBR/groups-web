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
    const { type, url, referer, ad, group: bodyGroup } = body;

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

        if (source === "google") {
            try {
                const forwarded = request.headers.get("x-forwarded-for");
                const ip = forwarded
                    ? forwarded.split(",")[0].trim()
                    : request.headers.get("x-real-ip") || request.headers.get("cf-connecting-ip") || "Desconhecido";

                const now = new Date().toLocaleTimeString("pt-BR", {
                    timeZone: "America/Sao_Paulo", hour12: false,
                });

                const msgLines = [
                    `${now} - ${process.env.NEXT_PUBLIC_NAME || ""}`,
                    `URL: ${url}`,
                    `IP: ${ip}`,
                ];
                if (referer) {
                    msgLines.push(`Origem: ${referer}`);
                }

                const payload = new URLSearchParams({
                    token: process.env.PUSHOVER_TOKEN || "",
                    user: process.env.PUSHOVER_USER || "",
                    device: process.env.PUSHOVER_DEVICE || "",
                    message: msgLines.join(" - "),
                    title: "Google",
                });
                await fetch("https://api.pushover.net/1/messages.json", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: payload.toString(),
                });
            } catch (err) {
                console.error("Erro ao enviar notificação Pushover:", err);
            }
        }
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

    // Identifica se é uma página de grupo ou se o ID do grupo foi fornecido diretamente
    const urlSegments = url.split('/').filter(Boolean);
    const isGroupRoute = urlSegments[0] === 'grupos' || urlSegments[0] === 'groups' || urlSegments[0] === 'grupo';
    const groupId = bodyGroup || (isGroupRoute && urlSegments[1] ? urlSegments[1] : null);

    if (groupId) {
        // Atualiza contadores totais no próprio documento do grupo
        if (type === "clicks") {
            await db.collection("groups").updateOne({ id: groupId }, { $inc: { clicks: 1 } }, { upsert: false });
        } else if (type === "views") {
            await db.collection("groups").updateOne({ id: groupId }, { $inc: { views: 1 } }, { upsert: false });
        }

        // Atualiza métricas diárias por grupo
        const dateStr = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' });
        await db.collection("groups_analytics_daily").updateOne(
            {
                group: groupId,
                date: dateStr,
            },
            {
                $inc: {
                    ...(type === 'views' ? { views: 1 } : {}),
                    ...(type === 'clicks' ? { clicks: 1 } : {}),
                },
                $setOnInsert: {
                    group: groupId,
                    date: dateStr,
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
