/* ============================================
   FORM.JS — Kunden-Formular Logik
   ============================================ */

// ── EmailJS Config ───────────────────────────
const EMAILJS_SERVICE  = 'service_2rr4ih8';
const EMAILJS_TEMPLATE = 'template_w72zub6';
const EMAILJS_PUBLIC   = 'qil4eefMTb5qApNIk';
const ADMIN_EMAIL      = 'majosh2026we@gmail.com';

// ── State ────────────────────────────────────
let customerData = null;
let uploadedFiles = []; // Array of { name, type, dataUrl, sizeKb }
let lastSubmittedHtml = null;

// ── Init ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Load EmailJS
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
  script.onload = () => { emailjs.init(EMAILJS_PUBLIC); };
  document.head.appendChild(script);

  initForm();
});

function initForm() {
  const params = new URLSearchParams(window.location.search);
  const token  = params.get('token');

  if (!token) {
    showExpired();
    return;
  }

  try {
    const payload = JSON.parse(decodeURIComponent(escape(atob(token))));
    const now     = new Date();
    const expires = new Date(payload.expiresAt);

    if (expires <= now) {
      showExpired();
      return;
    }

    // Check if already submitted
    const submittedKey = 'submitted_' + payload.id;
    if (localStorage.getItem(submittedKey)) {
      showExpired();
      return;
    }

    customerData = payload;
    renderFormHeader();

  } catch (e) {
    showExpired();
  }
}

function renderFormHeader() {
  const name    = customerData.name.split(' ')[0]; // Vorname
  const expires = new Date(customerData.expiresAt);

  document.title = `Briefing für ${customerData.name}`;
  document.getElementById('customer-name-display').textContent = name;
  document.getElementById('success-name').textContent = name;
  document.getElementById('expires-display').textContent = expires.toLocaleDateString('de-DE', {
    day: '2-digit', month: 'long', year: 'numeric'
  });

  if (customerData.showIndividualAutomation) {
    document.getElementById('ki-individual-wrap').style.display = 'block';
  }
}

function showExpired() {
  document.getElementById('form-screen').style.display   = 'none';
  document.getElementById('success-screen').style.display = 'none';
  const exp = document.getElementById('expired-screen');
  exp.style.display = 'flex';
}

// ── Chip toggle ──────────────────────────────
function toggleChip(el) {
  el.classList.toggle('active');
}

function getChipValues(section) {
  const wrap = document.querySelector(`[data-section="${section}"]`);
  if (!wrap) return [];
  return Array.from(wrap.querySelectorAll('.chip.active')).map(c => c.textContent.trim());
}

function getFieldValue(field) {
  const el = document.querySelector(`[data-field="${field}"]`);
  return el ? el.value.trim() : '';
}

// ── File Upload ──────────────────────────────
function handleDragOver(e) {
  e.preventDefault();
  document.getElementById('upload-zone').classList.add('dragover');
}

function handleDragLeave(e) {
  document.getElementById('upload-zone').classList.remove('dragover');
}

function handleDrop(e) {
  e.preventDefault();
  document.getElementById('upload-zone').classList.remove('dragover');
  handleFiles(e.dataTransfer.files);
}

function handleFiles(fileList) {
  const maxSize = 5 * 1024 * 1024; // 5MB
  let hasLarge  = false;

  Array.from(fileList).forEach(file => {
    if (uploadedFiles.length >= 10) {
      showToast('Maximal 10 Dateien erlaubt.', 'error');
      return;
    }
    if (file.size > maxSize) {
      showToast(`"${file.name}" ist zu groß (max. 5 MB).`, 'error');
      return;
    }
    if (file.size > 500 * 1024) hasLarge = true;

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileObj = {
        name:    file.name,
        type:    file.type,
        dataUrl: e.target.result,
        sizeKb:  Math.round(file.size / 1024)
      };
      uploadedFiles.push(fileObj);
      renderPreviews();
    };
    reader.readAsDataURL(file);
  });

  if (hasLarge) {
    document.getElementById('upload-size-warning').style.display = 'block';
  }
}

function removeFile(index) {
  uploadedFiles.splice(index, 1);
  renderPreviews();
  if (uploadedFiles.every(f => f.sizeKb < 500)) {
    document.getElementById('upload-size-warning').style.display = 'none';
  }
}

function renderPreviews() {
  const container = document.getElementById('upload-previews');
  container.innerHTML = '';
  uploadedFiles.forEach((f, i) => {
    const item = document.createElement('div');
    item.className = 'upload-preview-item';
    if (f.type.startsWith('image/')) {
      item.innerHTML = `
        <img src="${f.dataUrl}" alt="${f.name}">
        <div class="remove-file" onclick="removeFile(${i})">×</div>
      `;
    } else {
      item.innerHTML = `
        <div class="file-icon">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          ${f.name.slice(0, 12)}
        </div>
        <div class="remove-file" onclick="removeFile(${i})">×</div>
      `;
    }
    container.appendChild(item);
  });
}

// ── Collect data ─────────────────────────────
function collectFormData() {
  return {
    typ:           getChipValues('typ'),
    typ_text:      getFieldValue('typ_text'),
    ziel:          getChipValues('ziel'),
    ziel_text:     getFieldValue('ziel_text'),
    zielgruppe:    getChipValues('zielgruppe'),
    zielgruppe_text: getFieldValue('zielgruppe_text'),
    seiten:        getChipValues('seiten'),
    seiten_text:   getFieldValue('seiten_text'),
    design:        getChipValues('design'),
    design_text:   getFieldValue('design_text'),
    inhalte:       getChipValues('inhalte'),
    inhalte_text:  getFieldValue('inhalte_text'),
    funktionen:    getChipValues('funktionen'),
    funktionen_text: getFieldValue('funktionen_text'),
    ki_erweiterung: getChipValues('ki_erweiterung'),
    ki_individual_text: getFieldValue('ki_individual_text'),
    socialmedia_art:      getChipValues('socialmedia_art'),
    socialmedia_plattform: getChipValues('socialmedia_plattform'),
    socialmedia_text:     getFieldValue('socialmedia_text'),
    budget:        getChipValues('budget'),
    deadline:      getChipValues('deadline'),
    deadline_text: getFieldValue('deadline_text'),
    konkurrenz:    getFieldValue('konkurrenz_text'),
    domain:        getChipValues('domain'),
    domain_text:   getFieldValue('domain_text'),
    anmerkungen:   getFieldValue('anmerkungen_text'),
    files:         uploadedFiles.map(f => ({ name: f.name, type: f.type, sizeKb: f.sizeKb, dataUrl: f.dataUrl }))
  };
}

// ── Build HTML email body ────────────────────
function buildEmailHtml(data) {
  const now = new Date();
  const fmtDate = d => d.toLocaleDateString('de-DE', { day:'2-digit', month:'2-digit', year:'numeric' });
  const fmtTime = d => d.toLocaleTimeString('de-DE', { hour:'2-digit', minute:'2-digit' });

  const chipHtml = (items, allOptions) => {
    if (!allOptions) {
      return items.length > 0
        ? items.map(i => `<span style="display:inline-block;padding:4px 12px;margin:3px;border-radius:20px;font-size:12px;font-weight:500;background:rgba(168,85,247,0.12);border:1px solid rgba(168,85,247,0.4);color:#7c3aed;">${i}</span>`).join('')
        : '<span style="color:#aaa;font-size:12px;font-style:italic;">Keine Auswahl</span>';
    }
    return allOptions.map(opt => {
      const sel = items.includes(opt);
      return `<span style="display:inline-block;padding:4px 12px;margin:3px;border-radius:20px;font-size:12px;font-weight:${sel?'600':'400'};background:${sel?'rgba(168,85,247,0.12)':'#f5f5f8'};border:1px solid ${sel?'rgba(168,85,247,0.4)':'#e5e5ea'};color:${sel?'#7c3aed':'#aaa'};">${sel?'✓ ':''} ${opt}</span>`;
    }).join('');
  };

  const textRow = (label, val) => val
    ? `<tr><td colspan="2" style="padding:8px 0;"><p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.8px;color:#888;">${label}</p><p style="margin:0;font-size:13px;color:#333;background:#f9f9fc;border-left:3px solid #a855f7;padding:8px 12px;border-radius:0 6px 6px 0;">${val.replace(/\n/g,'<br>')}</p></td></tr>`
    : '';

  const sectionHtml = (num, title, chips, allOpts, text) => `
    <tr><td colspan="2" style="padding:16px 0 0;">
      <table width="100%" style="border-collapse:collapse;border:1px solid #eee;border-radius:10px;overflow:hidden;">
        <tr style="background:linear-gradient(135deg,#f8f4ff,#f0f4ff);">
          <td style="padding:12px 16px;">
            <table><tr>
              <td style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#a855f7,#6366f1);text-align:center;vertical-align:middle;color:white;font-weight:700;font-size:12px;font-family:sans-serif;">${num}</td>
              <td style="padding-left:10px;font-family:sans-serif;font-size:13px;font-weight:700;color:#1a1a2e;text-transform:uppercase;letter-spacing:0.8px;">${title}</td>
            </tr></table>
          </td>
        </tr>
        <tr><td style="padding:14px 16px;">${chipHtml(chips, allOpts)}</td></tr>
        ${text ? `<tr><td style="padding:0 16px 14px;"><p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.8px;color:#888;">Anmerkung</p><p style="margin:0;font-size:13px;color:#333;background:#f9f9fc;border-left:3px solid #a855f7;padding:8px 12px;border-radius:0 6px 6px 0;">${text.replace(/\n/g,'<br>')}</p></td></tr>` : ''}
      </table>
    </td></tr>
  `;

  // Images to embed
  const imageSection = data.files.length > 0 ? `
    <tr><td colspan="2" style="padding:16px 0 0;">
      <table width="100%" style="border-collapse:collapse;border:1px solid #eee;border-radius:10px;overflow:hidden;">
        <tr style="background:linear-gradient(135deg,#f8f4ff,#f0f4ff);">
          <td style="padding:12px 16px;">
            <table><tr>
              <td style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#a855f7,#6366f1);text-align:center;vertical-align:middle;color:white;font-weight:700;font-size:12px;font-family:sans-serif;">📎</td>
              <td style="padding-left:10px;font-family:sans-serif;font-size:13px;font-weight:700;color:#1a1a2e;text-transform:uppercase;letter-spacing:0.8px;">Hochgeladene Dateien (${data.files.length})</td>
            </tr></table>
          </td>
        </tr>
        <tr><td style="padding:14px 16px;">
          <table><tr>
            ${data.files.map(f => `
              <td style="padding:4px;vertical-align:top;">
                ${f.type.startsWith('image/') ? `<img src="${f.dataUrl}" style="width:100px;height:100px;object-fit:cover;border-radius:6px;border:1px solid #eee;" alt="${f.name}"><br><span style="font-size:10px;color:#888;">${f.name}</span>` : `<div style="width:100px;height:100px;background:#f5f5f8;border:1px solid #eee;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:11px;color:#888;text-align:center;padding:8px;">${f.name}<br><span style="font-size:10px;">(${f.sizeKb} KB)</span></div>`}
              </td>
            `).join('')}
          </tr></table>
        </td></tr>
      </table>
    </td></tr>
  ` : '';

  const adminUrl = 'https://josh0078.github.io/Breaking-Tool/index.html';

  return `
<!DOCTYPE html>
<html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f0f0f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table width="100%" style="background:#f0f0f5;padding:30px 0;"><tr><td align="center">
<table width="680" style="max-width:680px;background:white;border-radius:12px;overflow:hidden;box-shadow:0 4px 40px rgba(0,0,0,0.12);">

  <!-- Notification Banner -->
  <tr><td style="background:#16a34a;padding:14px 40px;">
    <table width="100%"><tr>
      <td style="font-family:sans-serif;font-size:14px;font-weight:700;color:white;">✅ Neues Briefing eingegangen — ${escHtml(customerData.name)}</td>
      <td align="right" style="font-family:sans-serif;font-size:12px;color:rgba(255,255,255,0.8);">${fmtDate(now)}, ${fmtTime(now)}</td>
    </tr></table>
  </td></tr>

  <!-- Header -->
  <tr><td style="background:linear-gradient(135deg,#0d0d1a 0%,#1a0535 50%,#0a1128 100%);padding:36px 40px;">
    <p style="margin:0 0 10px;font-size:11px;text-transform:uppercase;letter-spacing:2px;color:rgba(168,85,247,0.8);font-family:sans-serif;">Website-Briefing Dokument</p>
    <h1 style="margin:0 0 6px;font-size:28px;color:white;font-family:sans-serif;">Briefing: <span style="color:#a855f7;">${escHtml(customerData.name)}</span></h1>
    <p style="margin:0 0 28px;font-size:13px;color:rgba(255,255,255,0.45);font-family:sans-serif;">Ausgefüllt am ${fmtDate(now)} um ${fmtTime(now)}</p>

    <!-- PDF Download CTA -->
    <table style="margin-bottom:28px;border-collapse:collapse;"><tr>
      <td>
        <a href="${adminUrl}" style="display:inline-block;padding:14px 32px;border-radius:10px;background:linear-gradient(135deg,#a855f7,#6366f1);color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;font-family:sans-serif;letter-spacing:0.3px;">⬇ PDF herunterladen</a>
      </td>
      <td style="padding-left:16px;">
        <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.5);font-family:sans-serif;">Im Admin-Panel öffnen<br>und PDF generieren</p>
      </td>
    </tr></table>

    <table style="border-collapse:collapse;">
      <tr>
        <td style="padding-right:32px;"><p style="margin:0 0 4px;font-size:9px;text-transform:uppercase;letter-spacing:1px;color:rgba(168,85,247,0.6);font-family:sans-serif;">Kunde</p><p style="margin:0;font-size:13px;color:rgba(255,255,255,0.85);font-weight:500;font-family:sans-serif;">${escHtml(customerData.name)}</p></td>
        <td style="padding-right:32px;"><p style="margin:0 0 4px;font-size:9px;text-transform:uppercase;letter-spacing:1px;color:rgba(168,85,247,0.6);font-family:sans-serif;">E-Mail</p><p style="margin:0;font-size:13px;color:rgba(255,255,255,0.85);font-weight:500;font-family:sans-serif;">${customerData.email || '—'}</p></td>
        <td style="padding-right:32px;"><p style="margin:0 0 4px;font-size:9px;text-transform:uppercase;letter-spacing:1px;color:rgba(168,85,247,0.6);font-family:sans-serif;">Formular-ID</p><p style="margin:0;font-size:13px;color:rgba(255,255,255,0.85);font-weight:500;font-family:sans-serif;">${customerData.id}</p></td>
        <td><p style="margin:0 0 4px;font-size:9px;text-transform:uppercase;letter-spacing:1px;color:rgba(168,85,247,0.6);font-family:sans-serif;">Abgesendet</p><p style="margin:0;font-size:13px;color:rgba(255,255,255,0.85);font-weight:500;font-family:sans-serif;">${fmtDate(now)}, ${fmtTime(now)}</p></td>
      </tr>
    </table>
  </td></tr>

  <!-- Body -->
  <tr><td style="padding:32px 40px;">
    <table width="100%" style="border-collapse:collapse;">
      ${sectionHtml(1,'Website-Typ',data.typ,['Unternehmensseite','Portfolio','Online-Shop','Landing Page','Blog','Visitenkarten-Seite','Sonstiges'],data.typ_text)}
      ${sectionHtml(2,'Ziel & Zweck',data.ziel,['Neue Kunden gewinnen','Termine buchen','Produkte verkaufen','Marke aufbauen','Informieren / Aufklären','Bewerber ansprechen','Bestandskunden betreuen'],data.ziel_text)}
      ${sectionHtml(3,'Zielgruppe',data.zielgruppe,['Geschäftskunden (B2B)','Privatkunden (B2C)','Regional','National (Deutschland)','International','18–35 Jahre','35–60 Jahre','60+ Jahre'],data.zielgruppe_text)}
      ${sectionHtml(4,'Gewünschte Seiten',data.seiten,['Startseite','Über uns','Leistungen','Portfolio / Referenzen','Kontakt','Blog','Online-Shop','FAQ','Impressum & Datenschutz','Login-Bereich','Karriere / Jobs'],data.seiten_text)}
      ${sectionHtml(5,'Design-Vorstellungen',data.design,['Modern & Clean','Minimalistisch','Klassisch & Seriös','Verspielt & Kreativ','Luxuriös & Premium','Technisch & Digital','Natürlich & Organisch','Bold & Auffällig'],data.design_text)}
      ${sectionHtml(6,'Inhalte & Materialien',data.inhalte,['Logo vorhanden','Eigene Fotos vorhanden','Eigene Texte vorhanden','Logo muss erstellt werden','Fotos müssen gemacht werden','Texte müssen geschrieben werden','Alles muss erstellt werden'],data.inhalte_text)}
      ${imageSection}
      ${sectionHtml(7,'Spezielle Funktionen',data.funktionen,['Kontaktformular','Newsletter-Anmeldung','Online-Buchung / Kalender','Mehrsprachigkeit','Live-Chat','Login-Bereich','Zahlungssystem','Social Media Integration','Google Maps','Galerie / Slider'],data.funktionen_text)}
      ${sectionHtml(8,'KI & Automatisierung',data.ki_erweiterung,['Instagram Bot','Website-Chatbot','Beides (Instagram Bot + Chatbot)','E-Mail Automatisierung','Social Media Automatisierung','Rechnungs-Automatisierung','Komplexere Vorgänge auf Wunsch','Nein, nicht gewünscht'], customerData.showIndividualAutomation && data.ki_individual_text ? '💡 Individuelle Automatisierung: ' + data.ki_individual_text : (customerData.showIndividualAutomation ? '💡 Individuelle Automatisierung: Keine Angabe' : ''))}
      ${sectionHtml(9,'Social Media',data.socialmedia_art,['Social Media Management','Kurs / Coaching','Beides','Nein, nicht gewünscht'], (data.socialmedia_plattform.length > 0 ? 'Plattformen: ' + data.socialmedia_plattform.join(', ') : '') + (data.socialmedia_text ? '\n' + data.socialmedia_text : ''))}
      ${sectionHtml(10,'Budget',data.budget,['Unter 500 €','500 – 1.500 €','1.500 – 5.000 €','5.000 – 10.000 €','Über 10.000 €','Noch unklar'],'')}
      ${sectionHtml(11,'Wunsch-Termin',data.deadline,['So schnell wie möglich','In 1 Monat','In 2–3 Monaten','In 6 Monaten','Kein festes Datum'],data.deadline_text)}
      <tr><td colspan="2" style="padding:16px 0 0;">
        <table width="100%" style="border-collapse:collapse;border:1px solid #eee;border-radius:10px;overflow:hidden;">
          <tr style="background:linear-gradient(135deg,#f8f4ff,#f0f4ff);">
            <td style="padding:12px 16px;font-family:sans-serif;font-size:13px;font-weight:700;color:#1a1a2e;text-transform:uppercase;letter-spacing:0.8px;">12 · Mitbewerber & Referenzen</td>
          </tr>
          <tr><td style="padding:14px 16px;font-size:13px;color:#333;">${data.konkurrenz ? data.konkurrenz.replace(/\n/g,'<br>') : '<span style="color:#aaa;font-style:italic;">Keine Angabe</span>'}</td></tr>
        </table>
      </td></tr>
      ${sectionHtml(13,'Domain & Hosting',data.domain,['Domain bereits vorhanden','Hosting bereits vorhanden','Domain wird benötigt','Hosting wird benötigt','Beides wird benötigt','Weiß ich noch nicht'],data.domain_text)}
      <tr><td colspan="2" style="padding:16px 0 0;">
        <table width="100%" style="border-collapse:collapse;border:1px solid #eee;border-radius:10px;overflow:hidden;">
          <tr style="background:linear-gradient(135deg,#f8f4ff,#f0f4ff);">
            <td style="padding:12px 16px;font-family:sans-serif;font-size:13px;font-weight:700;color:#1a1a2e;text-transform:uppercase;letter-spacing:0.8px;">14 · Sonstige Anmerkungen</td>
          </tr>
          <tr><td style="padding:14px 16px;font-size:13px;color:#333;">${data.anmerkungen ? data.anmerkungen.replace(/\n/g,'<br>') : '<span style="color:#aaa;font-style:italic;">Keine Angabe</span>'}</td></tr>
        </table>
      </td></tr>
    </table>
  </td></tr>

  <!-- Footer -->
  <tr><td style="background:linear-gradient(135deg,#0d0d1a,#1a0535);padding:20px 40px;display:flex;justify-content:space-between;">
    <table width="100%"><tr>
      <td style="font-size:11px;color:rgba(168,85,247,0.7);font-family:sans-serif;">Erstellt mit dem Briefing-Tool</td>
      <td align="right" style="font-size:10px;color:rgba(255,255,255,0.3);font-family:sans-serif;">${customerData.id} · ${fmtDate(now)}</td>
    </tr></table>
  </td></tr>

</table>
</td></tr></table>
</body></html>
  `.trim();
}

// ── Submit ────────────────────────────────────
async function submitForm() {
  const btn = document.getElementById('submit-btn');
  btn.disabled = true;
  btn.innerHTML = `<div class="spinner"></div> Wird gesendet …`;

  const data    = collectFormData();
  const htmlBody = buildEmailHtml(data);
  lastSubmittedHtml = htmlBody;

  try {
    const res = await fetch('https://send-invitation.majosh2026we.workers.dev/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to:      ADMIN_EMAIL,
        to_name: 'Joshua',
        subject: `✅ Briefing von ${customerData.name} (${customerData.id})`,
        html:    htmlBody
      })
    });
    if (!res.ok) throw new Error('send failed');

    // Save briefing HTML to Firestore for admin PDF download
    try {
      await CUSTOMERS_COL.doc(customerData.id).update({
        submitted: true,
        submittedAt: new Date().toISOString(),
        briefingHtml: htmlBody
      });
    } catch (_) {}

    // Mark as submitted
    localStorage.setItem('submitted_' + customerData.id, '1');

    // Update admin storage if same browser
    try {
      const stored = JSON.parse(localStorage.getItem('briefing_customers') || '[]');
      const idx = stored.findIndex(c => c.id === customerData.id);
      if (idx !== -1) { stored[idx].submitted = true; localStorage.setItem('briefing_customers', JSON.stringify(stored)); }
    } catch {}

    // Show success
    document.getElementById('form-screen').style.display = 'none';
    const s = document.getElementById('success-screen');
    s.style.display = 'flex';

  } catch (err) {
    console.error(err);
    showToast('Fehler beim Senden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.', 'error');
    btn.disabled = false;
    btn.innerHTML = `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Briefing absenden`;
  }
}

// ── PDF Download ──────────────────────────────
function downloadBriefingPdf() {
  if (!lastSubmittedHtml) return;
  const btn = document.getElementById('pdf-download-btn');
  if (btn) { btn.disabled = true; btn.textContent = 'Wird erstellt …'; }

  const name = customerData ? customerData.name.replace(/\s+/g, '_') : 'Briefing';
  const parser = new DOMParser();
  const parsed = parser.parseFromString(lastSubmittedHtml, 'text/html');
  const bodyHtml = parsed.body.innerHTML;

  html2pdf().set({
    margin: 0,
    filename: `Briefing_${name}.pdf`,
    image: { type: 'jpeg', quality: 0.95 },
    html2canvas: { scale: 2, useCORS: true, backgroundColor: '#f0f0f5' },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  }).from(bodyHtml).save().finally(() => {
    if (btn) { btn.disabled = false; btn.innerHTML = '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Briefing als PDF herunterladen'; }
  });
}

// ── Toast ─────────────────────────────────────
function showToast(msg, type = 'success') {
  const c = document.getElementById('toast-container');
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<span style="color:${type==='success'?'var(--success)':'var(--danger)'};font-weight:700;">${type==='success'?'✓':'✕'}</span> ${msg}`;
  c.appendChild(t);
  setTimeout(() => { t.style.opacity='0'; t.style.transform='translateY(8px)'; t.style.transition='0.3s'; setTimeout(()=>t.remove(),300); }, 4000);
}

// ── Utils ─────────────────────────────────────
function escHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
