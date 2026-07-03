import { NextRequest, NextResponse } from 'next/server'

const EMAIL_TO   = 'ventas@attle.com.co'
const EMAIL_FROM = 'Attle Cotizador <onboarding@resend.dev>'

export async function POST(req: NextRequest) {
  try {
    const form     = await req.formData()
    const sport    = form.get('sport')    as string
    const quantity = form.get('quantity') as string
    const teamName = form.get('teamName') as string
    const whatsapp = form.get('whatsapp') as string
    const email    = (form.get('email')  as string) || ''
    const image    = form.get('image')   as File | null

    /* ── Email body ──────────────────────────────────────────────── */
    const row = (label: string, value: string) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#888;font-size:11px;
          text-transform:uppercase;letter-spacing:1px;width:38%;vertical-align:top">${label}</td>
        <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#111;font-size:14px">${value}</td>
      </tr>`

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#f5f5f5">
        <div style="background:#CC0000;padding:16px 24px">
          <h1 style="color:#fff;margin:0;font-size:18px;letter-spacing:2px">
            ATTLE — NUEVA COTIZACIÓN
          </h1>
        </div>
        <div style="background:#fff;padding:24px;border:1px solid #e0e0e0;border-top:none">
          <table style="width:100%;border-collapse:collapse">
            ${row('Equipo / Empresa', `<strong>${teamName}</strong>`)}
            ${row('Deporte / Tipo', `<span style="color:#CC0000;font-weight:bold">${sport}</span>`)}
            ${row('Cantidad', `<strong>${quantity} uniformes</strong>`)}
            ${row('WhatsApp', `+57 ${whatsapp}`)}
            ${email ? row('Email', email) : ''}
            ${image ? row('Imagen de referencia', `<em>${image.name}</em> (adjunta)`) : ''}
          </table>
        </div>
        <div style="padding:14px;background:#f9f9f9;border:1px solid #e0e0e0;border-top:none;text-align:center">
          <a href="https://wa.me/573178888966?text=${encodeURIComponent(`Hola! Tengo una cotización de ${teamName}.`)}"
            style="color:#CC0000;font-size:12px">
            Responder por WhatsApp
          </a>
          &nbsp;·&nbsp;
          <span style="color:#aaa;font-size:11px">attle-int-sas.netlify.app</span>
        </div>
      </div>`

    /* ── Resend payload ──────────────────────────────────────────── */
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.warn('[cotizar] RESEND_API_KEY no configurada — revisa las env vars de Netlify')
      return NextResponse.json({ error: 'email_not_configured' }, { status: 503 })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload: Record<string, any> = {
      from:     EMAIL_FROM,
      to:       [EMAIL_TO],
      reply_to: email || undefined,
      subject:  `Cotización: ${teamName} — ${quantity} uniformes de ${sport}`,
      html,
    }

    if (image) {
      const buf    = await image.arrayBuffer()
      const b64    = Buffer.from(buf).toString('base64')
      payload.attachments = [{
        filename: image.name,
        content:  b64,
      }]
    }

    const resend = await fetch('https://api.resend.com/emails', {
      method:  'POST',
      headers: {
        Authorization:  `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!resend.ok) {
      const err = await resend.text()
      console.error('[cotizar] Resend error:', err)
      return NextResponse.json({ error: 'send_failed' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[cotizar] Unexpected error:', err)
    return NextResponse.json({ error: 'unexpected' }, { status: 500 })
  }
}
