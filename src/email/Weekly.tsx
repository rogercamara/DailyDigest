
import { Html, Head, Preview, Tailwind, Body, Container, Section, Text, Img, Link } from "@react-email/components";
import { appConfig } from "@/src/lib/config";

type Article = {
  url: string; source?: string | null; title: string; summary?: string | null;
  imageUrl?: string | null; publishedAt?: string | null;
};

export default function Weekly({ articles }: { articles: Article[] }) {
  const items = (articles || []).slice(0, 10);
  const today = new Date().toLocaleDateString("pt-BR");
  const brand = {
    bg: "#f6f7fb",
    card: "#ffffff",
    text: "#0B0C0E",
    subtle: "#6B7280",
    border: "#E5E7EB",
    primary: appConfig.primaryColor,
    link: appConfig.linkColor,
  };
  return (
    <Html>
      <Head />
      <Preview>Top 10 • {appConfig.brandName}</Preview>
      <Tailwind>
        <Body className="m-0" style={{ backgroundColor: brand.bg, color: brand.text }}>
          <Container className="mx-auto" style={{ maxWidth: 720, backgroundColor: brand.card }}>
            <Section className="px-8 pt-10 pb-6" style={{ backgroundColor: brand.primary, color: "#FFFFFF" }}>
              {appConfig.logoUrl ? (
                <Img src={appConfig.logoUrl} alt={appConfig.brandName} width="120" height="36" style={{ marginBottom: 10 }} />
              ) : (
                <Text className="m-0" style={{ fontSize: 14, letterSpacing: 2, textTransform: "uppercase", opacity: 0.95 }}>{appConfig.brandName}</Text>
              )}
              <Text className="m-0" style={{ fontSize: 28, fontWeight: 700, marginTop: 6 }}>Radar de Notícias</Text>
              <Text className="m-0" style={{ fontSize: 14, marginTop: 6, opacity: 0.9 }}>Top 10 da semana • {today}</Text>
              <div style={{ marginTop: 18, height: 6, width: 120, backgroundColor: "#FFFFFF", opacity: 0.25, borderRadius: 9999 }} />
            </Section>

            <Section className="px-8 py-6">
              <Text className="m-0" style={{ fontSize: 16, color: brand.subtle }}>{appConfig.brandTagline}. Clique para ler a matéria completa.</Text>
            </Section>

            {items[0] && (
              <Section className="px-8 pb-4">
                <div style={{ border: `1px solid ${brand.border}`, borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
                  {items[0].imageUrl && (
                    <Img src={items[0].imageUrl} alt="Imagem da matéria" width="720" height="404" style={{ display: "block", width: "100%", height: "auto" }} />
                  )}
                  <div style={{ padding: 20 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <span style={{ display: "inline-block", backgroundColor: brand.primary, color: "#FFFFFF", borderRadius: 9999, padding: "4px 10px", fontSize: 12, fontWeight: 700, letterSpacing: 0.3 }}>Destaque</span>
                      {items[0].source ? (
                        <span style={{ display: "inline-block", backgroundColor: "#F3F4F6", color: brand.subtle, borderRadius: 9999, padding: "4px 10px", fontSize: 12, fontWeight: 600 }}>{items[0].source}</span>
                      ) : null}
                    </div>
                    <Text className="m-0" style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.35 }}>{items[0].title}</Text>
                    {items[0].summary ? <Text className="m-0" style={{ fontSize: 14, color: brand.subtle, marginTop: 8 }}>{items[0].summary}</Text> : null}
                    <div style={{ marginTop: 12 }}>
                      <Link href={items[0].url} target="_blank" className="no-underline" style={{ display: "inline-block", backgroundColor: brand.link, color: "#FFFFFF", fontSize: 13, borderRadius: 8, padding: "10px 14px" }}>Ler matéria em destaque</Link>
                    </div>
                  </div>
                </div>
              </Section>
            )}

            <Section className="px-8 pb-2">
              <Text className="m-0" style={{ fontSize: 14, color: brand.subtle, marginBottom: 8 }}>Mais destaques</Text>
            </Section>

            {items.slice(1).map((a, idx) => {
              const rank = idx + 2;
              return (
                <Section key={rank} className="px-8 pb-5">
                  <div style={{ border: `1px solid ${brand.border}`, borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", backgroundColor: "#FCFCFD", borderBottom: `1px solid ${brand.border}` }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div aria-label={`Posição ${rank}`} style={{ width: 28, height: 28, borderRadius: 8, display: "grid", placeItems: "center", backgroundColor: brand.primary, color: "#fff", fontWeight: 700, fontSize: 14 }}>{rank}</div>
                        {a.source ? <span style={{ display: "inline-block", backgroundColor: "#F3F4F6", color: brand.subtle, borderRadius: 9999, padding: "4px 10px", fontSize: 12, fontWeight: 600 }}>{a.source}</span> : null}
                      </div>
                      {a.publishedAt ? <span style={{ fontSize: 12, color: brand.subtle }}>{new Date(a.publishedAt).toLocaleDateString("pt-BR")}</span> : <span style={{ fontSize: 12, color: brand.subtle }}>—</span>}
                    </div>
                    {a.imageUrl ? <Img src={a.imageUrl} alt="Imagem da matéria" width="720" height="360" style={{ display: "block", width: "100%", height: "auto" }} /> : null}
                    <div style={{ padding: 16 }}>
                      <Text className="m-0" style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.4 }}>{a.title}</Text>
                      {a.summary ? <Text className="m-0" style={{ fontSize: 14, color: brand.subtle, marginTop: 6 }}>{a.summary}</Text> : null}
                      <div style={{ marginTop: 12 }}>
                        <Link href={a.url} target="_blank" className="no-underline" style={{ display: "inline-block", backgroundColor: brand.primary, color: "#FFFFFF", fontSize: 12, borderRadius: 8, padding: "8px 12px" }}>Ler a matéria</Link>
                      </div>
                    </div>
                  </div>
                </Section>
              );
            })}

            <Section className="px-8 pb-10">
              <div style={{ borderTop: `1px solid ${brand.border}`, paddingTop: 16, display: "flex", flexDirection: "column", gap: 6 }}>
                <Text className="m-0" style={{ fontSize: 12, color: brand.subtle }}>Enviado por <strong>{appConfig.brandName}</strong>. {appConfig.brandTagline}.</Text>
                <Text className="m-0" style={{ fontSize: 12, color: brand.subtle }}>Dúvidas? <Link href={`mailto:${appConfig.supportEmail}`} style={{ color: brand.link }}>{appConfig.supportEmail}</Link>.</Text>
                <Text className="m-0" style={{ fontSize: 12, color: brand.subtle }}>Descadastro: <Link href={appConfig.unsubscribeMailto} style={{ color: brand.link }}>clique aqui</Link>.</Text>
              </div>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
