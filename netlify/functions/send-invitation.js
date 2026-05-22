exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { to, to_name, subject, html } = JSON.parse(event.body);

    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sender: { name: 'Joshua · 24/7 ON', email: 'majosh2026we@gmail.com' },
        to: [{ email: to, name: to_name || to }],
        subject: subject || 'Website-Briefing',
        htmlContent: html
      })
    });

    const resBody = await res.json();
    console.log('Brevo response:', res.status, JSON.stringify(resBody));

    if (!res.ok) {
      return { statusCode: 500, body: JSON.stringify({ error: resBody }) };
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
