
import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/db";
import { appConfig } from "@/src/lib/config";
import { Resend } from "resend";
import Weekly from "@/src/email/Weekly";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await prisma.article.findMany({
      where: { sent: false },
      orderBy: [{ publishedAt: "desc" }, { fetchedAt: "desc" }],
      take: appConfig.maxItems
    });
    if (!rows.length) return NextResponse.json({ ok: true, message: "Nada novo para enviar" });

    const articles = rows.map(r => ({
      url: r.url, source: r.source, title: r.title, summary: r.summary,
      imageUrl: r.imageUrl, publishedAt: r.publishedAt?.toISOString() ?? null
    }));

    const html = await (await import("react-dom/server")).renderToStaticMarkup(Weekly({ articles }));

    const csv = process.env.RECIPIENTS_CSV || "";
    const recipients = csv.split(",").map(s => s.trim()).filter(Boolean);
    if (!recipients.length) throw new Error("RECIPIENTS_CSV vazio. Configure no .env ou Project Settings da Vercel.");

    const resend = new Resend(process.env.RESEND_API_KEY);
    const subject = `Radar de Notícias – ${new Date().toISOString().slice(0,10)} – ${appConfig.brandName}`;

    const { error } = await resend.emails.send({
      from: `${appConfig.senderName} <${appConfig.fromEmail}>`,
      to: recipients,
      subject,
      html
    });
    if (error) throw error;

    await prisma.article.updateMany({
      where: { id: { in: rows.map(r => r.id) } },
      data: { sent: true }
    });
    await prisma.emailLog.create({
      data: { subject, recipients: recipients.join(","), count: rows.length }
    });

    return NextResponse.json({ ok: true, sent: rows.length, recipients });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
