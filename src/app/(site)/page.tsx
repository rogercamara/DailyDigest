
import { appConfig } from "@/src/lib/config";

export default function HomePage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>{appConfig.brandName} – Newsletter Whitelabel</h1>
      <p>Coleta automática de notícias (Google News/InfoMoney) e disparo por e‑mail usando Resend + React Email. Agendamento por Vercel Cron.</p>
      <ul>
        <li><code>/api/collect</code> – coleta e grava novas matérias.</li>
        <li><code>/api/send</code> – renderiza e envia o e‑mail com destaques.</li>
        <li><code>/api/health</code> – healthcheck simples.</li>
      </ul>
    </main>
  );
}
