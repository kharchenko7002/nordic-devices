function formatNok(value) {
  try {
    return new Intl.NumberFormat('no-NB', {
      style: 'currency',
      currency: 'NOK',
      maximumFractionDigits: 0,
    }).format(value)
  } catch {
    return `${value} NOK`
  }
}

function escape(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function buildPlainText(order) {
  const lines = []
  lines.push('Ordrebekreftelse fra Nordic Devices AS')
  lines.push('')
  lines.push(`Ordrenummer:   ${order.ordreNummer}`)
  lines.push(`Status:        ${order.status}`)
  lines.push(`Opprettet:     ${new Date(order.opprettet).toLocaleString('no-NB')}`)
  lines.push('')
  lines.push('Kundeinformasjon')
  lines.push(`  Bedrift:     ${order.form.bedriftsnavn}`)
  lines.push(`  Kontakt:     ${order.form.kontaktperson}`)
  lines.push(`  E-post:      ${order.form.epost}`)
  if (order.form.telefon) lines.push(`  Telefon:     ${order.form.telefon}`)
  lines.push(`  Adresse:     ${order.form.adresse}`)
  if (order.form.kommentar) {
    lines.push('')
    lines.push('Kommentar')
    lines.push(`  ${order.form.kommentar}`)
  }
  lines.push('')
  lines.push('Bestilte varer og tjenester')
  for (const item of order.items) {
    const sub = formatNok(item.priceFrom * item.quantity)
    lines.push(`  ${item.quantity} × ${item.name} (${item.type}, ${item.category}) — ${sub}`)
  }
  lines.push('')
  lines.push(`Total: ${formatNok(order.total)}`)
  lines.push('')
  lines.push('Dette er en bekreftelse på at vi har mottatt bestillingen din.')
  lines.push('Ved spørsmål: svar på denne e-posten eller kontakt kontakt@nordicdevices.no.')
  return lines.join('\n')
}

export function buildHtml(order) {
  const rows = order.items
    .map(
      (item) => `
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;">
        <div style="font-weight:600;color:#0f172a;">${escape(item.name)}</div>
        <div style="font-size:12px;color:#64748b;">${escape(item.type)} · ${escape(item.category)}</div>
      </td>
      <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:center;">${item.quantity}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:right;white-space:nowrap;">${escape(formatNok(item.priceFrom * item.quantity))}</td>
    </tr>`,
    )
    .join('')

  const comment = order.form.kommentar
    ? `<p style="margin:12px 0 0;color:#475569;"><strong style="color:#0f172a;">Kommentar:</strong><br>${escape(order.form.kommentar)}</p>`
    : ''

  return `<!doctype html>
<html lang="no">
<head>
  <meta charset="utf-8" />
  <title>Ordrebekreftelse ${escape(order.ordreNummer)}</title>
</head>
<body style="margin:0;padding:0;background:#f6f8fb;font-family:'Segoe UI',Helvetica,Arial,sans-serif;color:#14223d;">
  <div style="max-width:600px;margin:0 auto;padding:24px;">
    <div style="background:linear-gradient(120deg,#06b6d4,#2563eb);padding:24px;border-radius:16px 16px 0 0;color:white;">
      <p style="margin:0;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;opacity:0.8;">Nordic Devices AS</p>
      <h1 style="margin:6px 0 0;font-size:24px;">Ordrebekreftelse</h1>
      <p style="margin:8px 0 0;font-size:14px;opacity:0.9;">Takk for bestillingen, ${escape(order.form.kontaktperson)}!</p>
    </div>

    <div style="background:white;padding:24px;border-radius:0 0 16px 16px;border:1px solid #e5e7eb;border-top:none;">
      <table role="presentation" style="width:100%;border-collapse:collapse;margin-bottom:20px;">
        <tr>
          <td style="padding:8px 0;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">Ordrenummer</td>
          <td style="padding:8px 0;color:#0f172a;font-weight:700;text-align:right;">${escape(order.ordreNummer)}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">Status</td>
          <td style="padding:8px 0;color:#047857;font-weight:600;text-align:right;">${escape(order.status)}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">Bedrift</td>
          <td style="padding:8px 0;color:#0f172a;text-align:right;">${escape(order.form.bedriftsnavn)}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">Adresse</td>
          <td style="padding:8px 0;color:#0f172a;text-align:right;">${escape(order.form.adresse)}</td>
        </tr>
        ${order.form.telefon ? `<tr><td style="padding:8px 0;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">Telefon</td><td style="padding:8px 0;color:#0f172a;text-align:right;">${escape(order.form.telefon)}</td></tr>` : ''}
      </table>

      <h2 style="font-size:14px;color:#0f172a;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 8px;">Bestilte varer og tjenester</h2>
      <table role="presentation" style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
        <thead>
          <tr style="background:#f6f8fb;">
            <th align="left" style="padding:10px 12px;font-size:12px;color:#475569;">Beskrivelse</th>
            <th style="padding:10px 12px;font-size:12px;color:#475569;">Antall</th>
            <th align="right" style="padding:10px 12px;font-size:12px;color:#475569;">Sum</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
        <tfoot>
          <tr>
            <td colspan="2" style="padding:14px 12px;font-weight:700;color:#0f172a;">Total</td>
            <td align="right" style="padding:14px 12px;font-weight:700;color:#0f172a;font-size:18px;">${escape(formatNok(order.total))}</td>
          </tr>
        </tfoot>
      </table>

      ${comment}

      <p style="margin:24px 0 0;font-size:13px;color:#64748b;line-height:1.5;">
        Dette er en automatisk bekreftelse på at vi har mottatt bestillingen din.
        Vi tar kontakt så snart vi har behandlet den. Har du spørsmål, kan du
        svare direkte på denne e-posten eller kontakte
        <a href="mailto:kontakt@nordicdevices.no" style="color:#2563eb;">kontakt@nordicdevices.no</a>.
      </p>
    </div>

    <p style="margin:16px 0 0;text-align:center;font-size:12px;color:#94a3b8;">
      © 2026 Nordic Devices AS · ITK2004 prøveeksamen
    </p>
  </div>
</body>
</html>`
}
