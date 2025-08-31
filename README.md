
# 🌅 DailyDigest

O **DailyDigest** coleta automaticamente as principais notícias do dia, salva em um banco **PostgreSQL** via **Prisma** e envia uma **Newsletter diária** com visual profissional, utilizando **Next.js**, **Resend** e **Vercel Cron**.  

Depois de configurado, você receberá um email periodicamente com notícias coletadas das suas principais fontes de dados e com as palavras-chave que você definir.  [Veja o demo do e-mail](https://rogercamara.github.io/email.html)  

---

## 🔑 Serviços Necessários

Você precisará criar contas gratuitas nestes serviços:

- **Resend** (envio de e-mails): [resend.com](https://resend.com)  
  - Crie uma conta → obtenha sua **API Key** → configure um domínio próprio para ativar SPF/DKIM.  

- **Supabase** (ou outro Postgres compatível): [supabase.com](https://supabase.com)  
  - Crie um projeto → copie a **Database URL**.  

- **Vercel** (deploy e cron jobs): [vercel.com](https://vercel.com)  
  - Crie conta → importe o repositório → configure as variáveis de ambiente.  

---

## ⚙️ Variáveis de Ambiente (.env)

```env
# ----------------- Identidade / Branding -----------------
BRAND_NAME=DailyDigest
BRAND_TAGLINE=As principais notícias do dia na sua caixa de entrada
BRAND_PRIMARY_COLOR=#111827
BRAND_LINK_COLOR=#0F62FE
LOGO_URL=https://seudominio.com/logo.png

# ----------------- Remetente -----------------
SENDER_NAME=Equipe DailyDigest
FROM_EMAIL=news@seudominio.com
SUPPORT_EMAIL=suporte@seudominio.com
UNSUBSCRIBE_MAILTO=mailto:suporte@seudominio.com?subject=Descadastro

# ----------------- Infraestrutura -----------------
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DB?sslmode=require
RESEND_API_KEY=re_xxxxx

# ----------------- Configuração de Notícias -----------------
NEWS_QUERIES="Mercado Financeiro, Investimento, Criptomoedas, Dólar"
SOURCES_WHITELIST="infomoney.com.br,exame.com,valor.globo.com,istoedinheiro.com.br"
MAX_ITEMS=20

# ----------------- Destinatários -----------------
RECIPIENTS_CSV=alice@empresa.com,bob@empresa.com
```

---

## 🖥️ Rodando Localmente

```bash
# 1. Instale dependências
npm install

# 2. Gere cliente Prisma e crie schema
npx prisma generate
npx prisma db push

# 3. Execute em dev
npm run dev

# Teste endpoints:
# GET http://localhost:3000/api/collect  -> coleta notícias
# GET http://localhost:3000/api/send     -> envia e-mail
```

---

## ☁️ Deploy na Vercel

1. Suba o repositório no GitHub/GitLab.  
2. Importe na **Vercel**.  
3. Em **Project Settings → Environment Variables**, configure todas as variáveis do `.env`.  
4. Deploy automático.  
5. O arquivo `vercel.json` já agenda:  
   - `/api/collect` a cada 6h  
   - `/api/send` toda manhã de segunda (ajuste conforme necessidade).  

---

## 📦 Estrutura do Projeto

```
src/
  app/
    api/
      collect/route.ts   # coleta notícias
      send/route.ts      # envia newsletter
      health/route.ts    # healthcheck
  email/
    Weekly.tsx           # template de e-mail (React Email)
  lib/
    config.ts            # env/config centralizada
    db.ts                # cliente Prisma
    rss.ts               # Google News collector
    infomoney.ts         # coletor InfoMoney
prisma/
  schema.prisma
vercel.json
```

---

## 📝 Licença
MIT – use e adapte livremente 🚀  
