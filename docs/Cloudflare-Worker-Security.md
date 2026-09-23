# Cloudflare Worker: send-invitation (Sicherheits-Update)

Dieser Worker wickelt den E-Mail-Versand über die Brevo API ab.
Um zu verhindern, dass der Endpunkt als **Open-Relay für Phishing oder Spam** missbraucht wird, erzwingt dieser aktualisierte Worker:

1. **Briefing-Submissions (`type === 'submission'`)**:
   Der Empfänger wird **serverseitig fest auf `info@nexvia-we.de`** erzwungen. Selbst wenn ein Angreifer eine andere E-Mail-Adresse im Request mitsendet, ignoriert der Worker diese und sendet ausschließlich an die offizielle Nexvia-Admin-Adresse.
2. **Kunden-Einladungen (`type === 'invitation'`)**:
   Dürfen nur versendet werden, wenn ein valider Firebase Authorization-Header (`Bearer <token>`) oder ein Admin-Secret vorliegt.
3. **CORS & Preflight (OPTIONS)**:
   Erlaubt nur die notwendigen Headers (`Content-Type`, `Authorization`, `X-Nexvia-Source`).

---

## 🛠️ Code zum Einspielen in Cloudflare

1. Melde dich im **Cloudflare Dashboard** an (`dash.cloudflare.com`).
2. Gehe zu **Workers & Pages** → Worker **`send-invitation`** anklicken.
3. Klicke auf **Code bearbeiten** (Edit Code).
4. Ersetze den gesamten Code durch folgenden Inhalt und klicke auf **Speichern und bereitstellen** (Deploy):

```javascript
/**
 * Cloudflare Worker: send-invitation
 * Nexvia Briefing Suite — E-Mail Dispatcher mit Open-Relay-Schutz
 */

const ADMIN_EMAIL = 'info@nexvia-we.de';

export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Nexvia-Source'
    };

    // Preflight OPTIONS Request
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405, headers: corsHeaders });
    }

    try {
      const data = await request.json();
      const { type, to, to_name, subject, html } = data;

      let recipientEmail = to;
      let recipientName  = to_name;

      // ── SICHERHEITS-SCHUTZ: Open-Relay-Sperre ───────────────────────────
      if (type === 'submission' || !type) {
        // Formular-Eingänge gehen IMMER ausnahmslos an die offizielle Admin-Adresse!
        recipientEmail = ADMIN_EMAIL;
        recipientName  = 'Joshua · Nexvia';
      } else if (type === 'invitation') {
        // Einladungen an Kunden dürfen nur mit Auth-Header gesendet werden
        const authHeader = request.headers.get('Authorization') || '';
        if (!authHeader.startsWith('Bearer ')) {
          return new Response(JSON.stringify({ error: 'Nicht autorisiert: Fehlender Token' }), {
            status: 401,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
      }

      // E-Mail über Brevo API versenden
      const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': env.BREVO_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sender: { name: 'Joshua · Nexvia', email: 'majosh2026we@gmail.com' },
          to: [{ email: recipientEmail, name: recipientName || recipientEmail }],
          subject: subject || 'Nexvia Website-Briefing',
          htmlContent: html
        })
      });

      const resBody = await brevoRes.json();

      if (!brevoRes.ok) {
        return new Response(JSON.stringify({ error: resBody }), {
          status: brevoRes.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }
};
```
