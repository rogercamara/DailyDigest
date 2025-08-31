
export const appConfig = {
  brandName: process.env.BRAND_NAME || "Your Brand",
  brandTagline: process.env.BRAND_TAGLINE || "Curadoria de notícias do mercado",
  primaryColor: process.env.BRAND_PRIMARY_COLOR || "#111827",
  linkColor: process.env.BRAND_LINK_COLOR || "#0F62FE",
  logoUrl: process.env.LOGO_URL || "",

  senderName: process.env.SENDER_NAME || "Newsletter Team",
  fromEmail: process.env.FROM_EMAIL || "news@example.com",
  supportEmail: process.env.SUPPORT_EMAIL || "support@example.com",
  unsubscribeMailto: process.env.UNSUBSCRIBE_MAILTO || "mailto:support@example.com?subject=Unsubscribe",

  newsQueries: (process.env.NEWS_QUERIES || "mercado imobiliário Brasil,imóveis alto padrão")
    .split(",").map(s => s.trim()).filter(Boolean),
  sourcesWhitelist: (process.env.SOURCES_WHITELIST || "")
    .split(",").map(s => s.trim()).filter(Boolean),
  maxItems: parseInt(process.env.MAX_ITEMS || "20", 10),
};
