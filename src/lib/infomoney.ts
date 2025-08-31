
import * as cheerio from "cheerio";

const BASE = "https://www.infomoney.com.br/";
const TAG_URL = new URL("tudo-sobre/mercado-imobiliario/", BASE).toString();

export async function collectFromInfoMoney(limit = 40) {
  const r = await fetch(TAG_URL, { headers: { "User-Agent": "NewsletterBot/1.0" }, cache: "no-store" });
  if (!r.ok) throw new Error(`InfoMoney list ${r.status}`);
  const html = await r.text();
  const $ = cheerio.load(html);
  const links: string[] = [];
  $("article a, a[href*='/mercado-imobiliario']").each((_, el) => {
    const href = $(el).attr("href");
    if (!href) return;
    const full = href.startsWith("/") ? new URL(href, BASE).toString() : href;
    if (full.startsWith(BASE)) links.push(full);
  });
  const uniq = Array.from(new Set(links)).slice(0, limit);
  const out: any[] = [];
  for (const url of uniq) {
    try {
      const rr = await fetch(url, { headers: { "User-Agent": "NewsletterBot/1.0" }, cache: "no-store" });
      if (!rr.ok) continue;
      const page = await rr.text();
      const $p = cheerio.load(page);
      const og = (prop: string) => $p(`meta[property='${prop}'], meta[name='${prop}']`).attr("content");
      out.push({
        url,
        source: "InfoMoney",
        title: og("og:title") || url,
        summary: og("og:description"),
        imageUrl: og("og:image"),
        publishedAt: undefined
      });
      await new Promise(r => setTimeout(r, 120));
    } catch {}
  }
  return out;
}
