
import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/db";
import { urlHash } from "@/src/lib/hash";
import { appConfig } from "@/src/lib/config";
import { collectFromGoogleNews } from "@/src/lib/rss";
import { collectFromInfoMoney } from "@/src/lib/infomoney";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isWhitelisted(url: string) {
  if (!appConfig.sourcesWhitelist.length) return true;
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    return appConfig.sourcesWhitelist.some(d => host.endsWith(d));
  } catch {
    return false;
  }
}

export async function GET() {
  try {
    const [gnews, im] = await Promise.all([
      collectFromGoogleNews(appConfig.newsQueries),
      collectFromInfoMoney()
    ]);
    const all = [...gnews, ...im].filter(a => isWhitelisted(a.url));
    let inserted = 0;
    for (const a of all) {
      const h = urlHash(a.url);
      try {
        await prisma.article.create({
          data: {
            url: a.url,
            urlHash: h,
            source: a.source ?? null,
            title: a.title,
            summary: a.summary ?? null,
            imageUrl: a.imageUrl ?? null,
            publishedAt: a.publishedAt ? new Date(a.publishedAt) : null
          }
        });
        inserted++;
      } catch {}
    }
    return NextResponse.json({ ok: true, scraped: all.length, inserted });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
