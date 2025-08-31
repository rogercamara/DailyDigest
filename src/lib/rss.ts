
import Parser from "rss-parser";
const parser = new Parser({
  headers: { "User-Agent": "NewsletterBot/1.0 (+whitelabel)" }
});
export async function collectFromGoogleNews(queries: string[]) {
  const results: any[] = [];
  for (const q of queries) {
    const url = `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=pt-BR&gl=BR&ceid=BR:pt-419`;
    const feed = await parser.parseURL(url);
    for (const e of feed.items) {
      results.push({
        url: e.link!,
        source: "Google News",
        title: e.title || e.link || "",
        summary: e.contentSnippet || undefined,
        imageUrl: undefined,
        publishedAt: e.isoDate ? new Date(e.isoDate) : undefined
      });
    }
    await new Promise(r => setTimeout(r, 350));
  }
  return results;
}
