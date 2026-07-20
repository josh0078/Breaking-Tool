/* ============================================
   ADMIN.JS — Briefing-Tool Admin Logic
   ============================================ */

// ── Config ──────────────────────────────────
const EMAILJS_SERVICE  = 'service_2rr4ih8';
const EMAILJS_TEMPLATE = 'template_w72zub6';
const EMAILJS_PUBLIC   = 'qil4eefMTb5qApNIk';
const ADMIN_EMAIL      = 'majosh2026we@gmail.com';

// ── State ────────────────────────────────────
let customers        = [];   // aktive Kunden
let archivedCustomers = [];  // archivierte Kunden
let deleteTargetId   = null;
let archiveTargetId  = null;
let activeTab        = 'active'; // 'active' | 'archive'
let unsubscribe      = null;

// ── Init ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  ['email-input', 'pw-input'].forEach(id => {
    document.getElementById(id).addEventListener('keydown', e => {
      if (e.key === 'Enter') checkLogin();
    });
  });
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
  script.onload = () => emailjs.init(EMAILJS_PUBLIC);
  document.head.appendChild(script);

  // Bestehende Session wiederherstellen (überlebt jetzt ein Reload)
  auth.onAuthStateChanged(user => {
    if (user) showApp(); else showLogin();
  });
});

// ── Auth ─────────────────────────────────────
async function checkLogin() {
  const email = document.getElementById('email-input').value.trim();
  const pw    = document.getElementById('pw-input').value;
  const btn   = document.getElementById('login-btn');

  btn.disabled = true;
  try {
    await auth.signInWithEmailAndPassword(email, pw);
    // showApp() läuft über onAuthStateChanged
  } catch (err) {
    showLoginError(
      err.code === 'auth/invalid-credential' || err.code === 'auth/invalid-email'
        ? 'E-Mail oder Passwort stimmt nicht. Bitte nochmal.'
        : 'Login fehlgeschlagen: ' + err.message
    );
  } finally {
    btn.disabled = false;
  }
}

function showLoginError(msg) {
  const err = document.getElementById('login-error');
  err.textContent  = msg;
  err.style.display = 'block';
  document.getElementById('pw-input').value = '';
  document.getElementById('pw-input').focus();
  setTimeout(() => err.style.display = 'none', 5000);
}

function showApp() {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('app').style.display = 'block';
  startRealtimeSync();
}

function showLogin() {
  if (unsubscribe) { unsubscribe(); unsubscribe = null; }
  document.getElementById('app').style.display = 'none';
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('pw-input').value = '';
}

function logout() {
  auth.signOut(); // onAuthStateChanged ruft showLogin()
}

// ── Firestore Realtime Sync ───────────────────
function startRealtimeSync() {
  if (unsubscribe) unsubscribe();

  unsubscribe = CUSTOMERS_COL.onSnapshot(snapshot => {
    customers         = [];
    archivedCustomers = [];
    snapshot.forEach(doc => {
      const data = { id: doc.id, ...doc.data() };
      if (data.archived) {
        archivedCustomers.push(data);
      } else {
        customers.push(data);
      }
    });
    // Sortierung client-seitig: neueste zuerst
    customers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    archivedCustomers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    renderAll();
  }, err => {
    const dbStatus = document.getElementById('db-status');
    dbStatus.className = 'error';
    dbStatus.textContent = 'Datenbankfehler: ' + err.message;
    showToast('Fehler beim Laden der Kunden: ' + err.message, 'error');
  });
}

// ── Business days ────────────────────────────
function addBusinessDays(date, days) {
  const d = new Date(date);
  let added = 0;
  while (added < days) {
    d.setDate(d.getDate() + 1);
    const dow = d.getDay();
    if (dow !== 0 && dow !== 6) added++;
  }
  return d;
}

function businessDaysLeft(expiresAt) {
  const now = new Date();
  const exp = new Date(expiresAt);
  if (exp <= now) return 0;
  let count = 0;
  const d = new Date(now);
  while (d < exp) {
    d.setDate(d.getDate() + 1);
    const dow = d.getDay();
    if (dow !== 0 && dow !== 6) count++;
  }
  return count;
}

function getStatus(customer) {
  const left = businessDaysLeft(customer.expiresAt);
  if (left === 0) return 'expired';
  if (left <= 2)  return 'warning';
  return 'active';
}

// ── Invitation Email HTML ─────────────────────
function buildInvitationEmailHtml(name, link, daysLeft) {
  const firstName = name.split(' ')[0];
  const expDate = addBusinessDays(new Date(), 7).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' });

  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0f0f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,sans-serif;">
<table width="100%" style="background:#f0f0f5;padding:40px 0;"><tr><td align="center">
<table width="600" style="max-width:600px;background:white;border-radius:16px;overflow:hidden;box-shadow:0 8px 50px rgba(0,0,0,0.14);">

  <!-- Header -->
  <tr><td style="background:linear-gradient(135deg,#0d0d1a 0%,#1a0535 55%,#0a1128 100%);padding:48px 48px 40px;">
    <p style="margin:0 0 6px;font-size:11px;text-transform:uppercase;letter-spacing:3px;color:rgba(168,85,247,0.75);font-family:sans-serif;">Hallo ${firstName}!</p>
    <h1 style="margin:0 0 16px;font-size:28px;font-weight:800;color:white;font-family:sans-serif;line-height:1.2;">Das Website-Briefing —<br><span style="color:#a855f7;">angepasst an Ihre Wünsche.</span></h1>
    <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.5);font-family:sans-serif;line-height:1.6;">Wir freuen uns darauf, gemeinsam mit Ihnen Ihre neue Website zu entwickeln.</p>
  </td></tr>

  <!-- Body -->
  <tr><td style="padding:40px 48px;">
    <p style="margin:0 0 20px;font-size:15px;color:#333;line-height:1.7;font-family:sans-serif;">
      Damit wir Ihre Website <strong>genau nach Ihren Vorstellungen</strong> umsetzen können, haben wir ein kurzes Briefing-Formular vorbereitet. Es dauert nur wenige Minuten und hilft uns, Ihr Projekt von Anfang an richtig anzupacken.
    </p>

    <!-- Steps -->
    <table width="100%" style="border-collapse:collapse;margin:28px 0;">
      <tr>
        <td width="36" valign="top" style="padding:0 14px 18px 0;">
          <div style="width:32px;height:32px;border-radius:50%;background:#a855f7;font-size:13px;font-weight:700;color:#ffffff;text-align:center;line-height:32px;font-family:sans-serif;">1</div>
        </td>
        <td valign="top" style="padding-bottom:18px;">
          <p style="margin:0 0 3px;font-size:13px;font-weight:700;color:#1a1a2e;font-family:sans-serif;">Link öffnen</p>
          <p style="margin:0;font-size:13px;color:#888;font-family:sans-serif;">Klicken Sie unten auf den Button, um Ihr persönliches Formular zu öffnen.</p>
        </td>
      </tr>
      <tr>
        <td valign="top" style="padding:0 14px 18px 0;">
          <div style="width:32px;height:32px;border-radius:50%;background:#a855f7;font-size:13px;font-weight:700;color:#ffffff;text-align:center;line-height:32px;font-family:sans-serif;">2</div>
        </td>
        <td valign="top" style="padding-bottom:18px;">
          <p style="margin:0 0 3px;font-size:13px;font-weight:700;color:#1a1a2e;font-family:sans-serif;">Briefing ausfüllen</p>
          <p style="margin:0;font-size:13px;color:#888;font-family:sans-serif;">Beantworten Sie ein paar Fragen zu Ihren Wünschen, Zielen und Ihrem Design-Geschmack.</p>
        </td>
      </tr>
      <tr>
        <td valign="top" style="padding:0 14px 0 0;">
          <div style="width:32px;height:32px;border-radius:50%;background:#a855f7;font-size:13px;font-weight:700;color:#ffffff;text-align:center;line-height:32px;font-family:sans-serif;">3</div>
        </td>
        <td valign="top">
          <p style="margin:0 0 3px;font-size:13px;font-weight:700;color:#1a1a2e;font-family:sans-serif;">Wir melden uns</p>
          <p style="margin:0;font-size:13px;color:#888;font-family:sans-serif;">Sobald Sie das Briefing abgesendet haben, erstellen wir Ihr individuelles Angebot.</p>
        </td>
      </tr>
    </table>

    <!-- CTA Button -->
    <table width="100%" style="margin:32px 0;"><tr><td align="center">
      <a href="${link}" style="display:inline-block;padding:16px 40px;border-radius:12px;background:#a855f7;color:#ffffff !important;font-size:15px;font-weight:700;text-decoration:none;font-family:sans-serif;letter-spacing:0.3px;-webkit-text-fill-color:#ffffff;">
        Briefing jetzt ausfüllen &#8594;
      </a>
    </td></tr></table>

    <!-- Expiry notice -->
    <table width="100%" style="border-collapse:collapse;background:#fdf8ff;border:1px solid rgba(168,85,247,0.2);border-radius:10px;"><tr><td style="padding:14px 18px;">
      <p style="margin:0;font-size:12px;color:#7c3aed;font-family:sans-serif;">
        <strong>⏱ Hinweis:</strong> Ihr persönlicher Link ist bis zum <strong>${expDate}</strong> gültig (${daysLeft} Werktage). Bitte füllen Sie das Formular bis dahin aus.
      </p>
    </td></tr></table>

    <p style="margin:24px 0 0;font-size:13px;color:#aaa;font-family:sans-serif;">
      Falls der Button nicht funktioniert, kopieren Sie diesen Link in Ihren Browser:<br>
      <a href="${link}" style="color:#a855f7;word-break:break-all;">${link}</a>
    </p>
  </td></tr>

  <!-- Footer -->
  <tr><td style="background:linear-gradient(135deg,#0d0d1a,#1a0535);padding:24px 48px;">
    <table width="100%"><tr>
      <td style="font-size:12px;color:rgba(168,85,247,0.7);font-family:sans-serif;font-weight:700;letter-spacing:2px;text-transform:uppercase;">24/7 ON</td>
      <td align="right" style="font-size:11px;color:rgba(255,255,255,0.25);font-family:sans-serif;">Diese E-Mail wurde persönlich für ${name} erstellt.</td>
    </tr></table>
  </td></tr>

</table>
</td></tr></table>
</body></html>`;
}

// ── Token / Link ─────────────────────────────
function generateToken(customer) {
  const payload = { id: customer.id, name: customer.name, email: customer.email, expiresAt: customer.expiresAt, showIndividualAutomation: !!customer.showIndividualAutomation };
  return btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
}

function generateLink(customer) {
  const token = generateToken(customer);
  const base  = window.location.href.replace('index.html', '').replace(/\/$/, '');
  return `${base}/form.html?token=${token}`;
}

// ── CRUD (Firestore) ──────────────────────────
// ── Formular-Konfiguration (Abschnitte + eigene Fragen) ──

function renderSectionPicker() {
  document.getElementById('section-picker').innerHTML = FORM_SECTIONS.map(s => `
    <label style="display:flex;align-items:center;gap:9px;padding:5px 2px;cursor:pointer;user-select:none;font-size:13px;">
      <input type="checkbox" class="section-toggle" value="${s.id}" checked
             style="accent-color:var(--purple);width:15px;height:15px;flex-shrink:0;">
      <span style="color:var(--text-3);min-width:20px;">${s.num}</span>
      <span style="color:var(--text-1);">${escHtml(s.title)}</span>
    </label>
  `).join('');
}

function toggleAllSections(on) {
  document.querySelectorAll('#section-picker .section-toggle').forEach(cb => cb.checked = on);
}

function addCustomQuestion() {
  const row = document.createElement('div');
  row.className = 'custom-q-row';
  row.style.cssText = 'border:1px solid var(--border);border-radius:10px;padding:10px 12px;display:flex;flex-direction:column;gap:8px;';
  row.innerHTML = `
    <div style="display:flex;gap:8px;align-items:center;">
      <input type="text" class="input cq-title" placeholder="Frage, z.B. Welches CMS bevorzugen Sie?" style="flex:1;">
      <button type="button" class="btn btn-ghost btn-sm" title="Frage entfernen"
              onclick="this.closest('.custom-q-row').remove()">✕</button>
    </div>
    <textarea class="input cq-options" style="min-height:76px;"
      placeholder="Antwortmöglichkeiten — eine pro Zeile:&#10;WordPress&#10;Webflow&#10;Egal, bitte empfehlen"></textarea>
  `;
  document.getElementById('custom-q-list').appendChild(row);
  row.querySelector('.cq-title').focus();
}

/* Liest den Baukasten aus. Gibt null zurück (und meckert), wenn etwas
   halb ausgefüllt ist — lieber abbrechen als stillschweigend verschlucken. */
function collectFormConfig() {
  const enabledSections = [...document.querySelectorAll('#section-picker .section-toggle')]
    .filter(cb => cb.checked).map(cb => cb.value);

  const customQuestions = [];
  const rows = [...document.querySelectorAll('.custom-q-row')];

  for (let i = 0; i < rows.length; i++) {
    const title   = rows[i].querySelector('.cq-title').value.trim();
    const options = rows[i].querySelector('.cq-options').value
                      .split('\n').map(o => o.trim()).filter(Boolean);

    if (!title && !options.length) continue;          // leere Zeile → ignorieren
    if (!title) {
      showToast(`Eigene Frage ${i + 1}: Fragetext fehlt.`, 'error');
      return null;
    }
    if (!options.length) {
      showToast(`„${title}“: mindestens eine Antwortmöglichkeit angeben.`, 'error');
      return null;
    }
    customQuestions.push({ id: 'custom_' + (customQuestions.length + 1), title, options });
  }

  if (!enabledSections.length && !customQuestions.length) {
    showToast('Das Formular wäre leer — mindestens eine Frage auswählen.', 'error');
    return null;
  }

  return { enabledSections, customQuestions };
}

async function createCustomer() {
  const name                 = document.getElementById('new-name').value.trim();
  const email                = document.getElementById('new-email').value.trim();
  const note                 = document.getElementById('new-note').value.trim();
  const showIndividualAutomation = document.getElementById('new-individual-automation').checked;

  if (!name) { showToast('Bitte einen Namen eingeben.', 'error'); return; }

  const config = collectFormConfig();
  if (!config) return;   // Baukasten unvollständig — collectFormConfig() hat gemeckert

  const now     = new Date();
  const expires = addBusinessDays(now, 7);
  const customer = {
    name,
    email,
    note,
    showIndividualAutomation,
    createdAt:  now.toISOString(),
    expiresAt:  expires.toISOString(),
    submitted:  false,
    archived:   false
  };

  try {
    const docRef = await CUSTOMERS_COL.add(customer);
    customer.id  = docRef.id;

    // Fragenauswahl unter derselben ID ablegen. Schlägt das fehl, existiert
    // der Kunde trotzdem — dann sieht er das vollständige Formular.
    try {
      await FORMS_COL.doc(docRef.id).set(config);
    } catch (err) {
      showToast('Kunde angelegt, aber die Fragenauswahl wurde nicht gespeichert — er sieht alle Fragen. ' + err.message, 'error');
    }

    const link   = generateLink(customer);
    document.getElementById('generated-link-text').textContent = link;
    document.getElementById('generated-link-box').style.display = 'block';
    document.getElementById('create-link-btn').style.display = 'none';
    document.getElementById('fertig-btn').style.display = '';

    if (email) {
      const left     = businessDaysLeft(customer.expiresAt);
      const htmlBody = buildInvitationEmailHtml(name, link, left);
      sendInvitationEmail(email, name, `Website-Briefing`, htmlBody)
        .then(() => showToast(`✓ Einladungsmail an ${email} gesendet!`, 'success'))
        .catch(() => showToast('Kunde erstellt, aber E-Mail fehlgeschlagen. Manuell senden.', 'error'));
    } else {
      showToast(`Link für ${name} erstellt!`, 'success');
    }
  } catch (err) {
    showToast('Fehler beim Speichern: ' + err.message, 'error');
  }
}

async function extendCustomer(id) {
  try {
    await CUSTOMERS_COL.doc(id).update({
      expiresAt: addBusinessDays(new Date(), 7).toISOString()
    });
    showToast('Link um 7 Werktage verlängert.', 'success');
  } catch (err) {
    showToast('Fehler: ' + err.message, 'error');
  }
}

function openDeleteModal(id) {
  deleteTargetId = id;
  document.getElementById('delete-modal').style.display = 'flex';
}

async function confirmDelete() {
  try {
    await CUSTOMERS_COL.doc(deleteTargetId).delete();
    closeModal('delete-modal');
    showToast('Kunde gelöscht.', 'success');
  } catch (err) {
    showToast('Fehler: ' + err.message, 'error');
  }
}

function openArchiveModal(id) {
  archiveTargetId = id;
  document.getElementById('archive-modal').style.display = 'flex';
}

async function confirmArchive() {
  try {
    await CUSTOMERS_COL.doc(archiveTargetId).update({ archived: true });
    closeModal('archive-modal');
    showToast('Kunde archiviert.', 'success');
  } catch (err) {
    showToast('Fehler: ' + err.message, 'error');
  }
}

async function restoreCustomer(id) {
  try {
    await CUSTOMERS_COL.doc(id).update({ archived: false });
    showToast('Kunde wiederhergestellt.', 'success');
  } catch (err) {
    showToast('Fehler: ' + err.message, 'error');
  }
}

function copyLink(id) {
  const all = [...customers, ...archivedCustomers];
  const c   = all.find(x => x.id === id);
  if (!c) return;
  navigator.clipboard.writeText(generateLink(c)).then(() => showToast('Link kopiert!', 'success'));
}

function copyGeneratedLink() {
  const text = document.getElementById('generated-link-text').textContent;
  navigator.clipboard.writeText(text).then(() => showToast('Link kopiert!', 'success'));
}

function sendLinkEmail(id) {
  const c = customers.find(x => x.id === id);
  if (!c) return;
  if (!c.email) { showToast('Keine E-Mail-Adresse für diesen Kunden.', 'error'); return; }
  const link     = generateLink(c);
  const left     = businessDaysLeft(c.expiresAt);
  const htmlBody = buildInvitationEmailHtml(c.name, link, left);
  sendInvitationEmail(c.email, c.name, `Website-Briefing`, htmlBody)
    .then(() => showToast(`Einladungsmail an ${c.email} gesendet!`, 'success'))
    .catch(() => showToast('Fehler beim Senden.', 'error'));
}

// ── Tabs ──────────────────────────────────────
function switchTab(tab) {
  activeTab = tab;
  document.getElementById('tab-active').classList.toggle('tab-current', tab === 'active');
  document.getElementById('tab-archive').classList.toggle('tab-current', tab === 'archive');
  document.getElementById('section-active').style.display  = tab === 'active'  ? 'block' : 'none';
  document.getElementById('section-archive').style.display = tab === 'archive' ? 'block' : 'none';
  document.getElementById('btn-new-customer').style.display = tab === 'active' ? '' : 'none';
}

// ── Render ────────────────────────────────────
function renderAll() {
  renderStats();
  renderGrid();
  renderArchive();
  updateTopbarCount();
}

function renderStats() {
  let active = 0, warning = 0, expired = 0;
  customers.forEach(c => {
    const s = getStatus(c);
    if (s === 'active')  active++;
    if (s === 'warning') warning++;
    if (s === 'expired') expired++;
  });
  document.getElementById('stat-active').textContent   = active;
  document.getElementById('stat-warning').textContent  = warning;
  document.getElementById('stat-expired').textContent  = expired;
  document.getElementById('stat-archived').textContent = archivedCustomers.length;
}

function updateTopbarCount() {
  const total = customers.length;
  document.getElementById('topbar-count').textContent = total === 0 ? '' : `${total} Kunden`;
}

function renderGrid() {
  const grid  = document.getElementById('customers-grid');
  const empty = document.getElementById('empty-state');
  grid.innerHTML = '';

  if (customers.length === 0) {
    empty.style.display = 'block';
  } else {
    empty.style.display = 'none';
  }

  const sorted = [...customers].sort((a, b) => {
    const order = { active: 0, warning: 1, expired: 2 };
    return order[getStatus(a)] - order[getStatus(b)];
  });

  sorted.forEach((c, i) => {
    const status = getStatus(c);
    const left   = businessDaysLeft(c.expiresAt);
    const exp    = new Date(c.expiresAt);
    const cre    = new Date(c.createdAt);
    const pct    = status === 'expired' ? 100 : Math.max(0, Math.min(100, ((7 - left) / 7) * 100));

    let badgeHtml, barColor;
    if (status === 'active')  { badgeHtml = `<span class="badge badge-active">● Aktiv · ${left} Werktage</span>`; barColor = 'var(--success)'; }
    if (status === 'warning') { badgeHtml = `<span class="badge badge-warning">⚠ ${left} Werktag${left===1?'':'e'}</span>`; barColor = 'var(--warning)'; }
    if (status === 'expired') { badgeHtml = `<span class="badge badge-expired">✕ Abgelaufen</span>`; barColor = 'var(--danger)'; }

    const card = document.createElement('div');
    card.className = `customer-card ${status === 'expired' ? 'expired-card' : ''} ${status === 'warning' ? 'warning-card' : ''}`;
    card.style.animationDelay = `${i * 0.06}s`;
    card.innerHTML = `
      <div class="card-top">
        <div>
          <div class="customer-name">${escHtml(c.name)}</div>
          <div class="customer-email">${c.email ? escHtml(c.email) : '<span style="color:var(--text-3)">Keine E-Mail</span>'}</div>
        </div>
        ${badgeHtml}
      </div>
      ${c.submitted ? '<div style="font-size:12px;color:var(--success);margin-bottom:10px;">✓ Formular abgesendet</div>' : ''}
      <div class="countdown-bar">
        <div class="countdown-fill" style="width:${pct}%;background:${barColor};"></div>
      </div>
      <div class="card-meta">
        <span>ID:</span> ${escHtml(c.id)}<br>
        <span>Erstellt:</span> ${fmtDate(cre)}<br>
        <span>Läuft ab:</span> ${fmtDate(exp)}<br>
        ${c.note ? `<span>Notiz:</span> ${escHtml(c.note)}` : ''}
      </div>
      <div class="card-actions">
        ${c.submitted ? `<button class="btn btn-ghost btn-sm" onclick="downloadCustomerPdf('${escHtml(c.id)}')" title="PDF herunterladen">
          <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          PDF
        </button>` : ''}
        <button class="btn btn-ghost btn-sm" onclick="copyLink('${escHtml(c.id)}')" title="Link kopieren">
          <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          Link
        </button>
        ${c.email ? `<button class="btn btn-ghost btn-sm" onclick="sendLinkEmail('${escHtml(c.id)}')" title="Per E-Mail senden">
          <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          Senden
        </button>` : ''}
        ${status === 'expired' ? `<button class="btn btn-ghost btn-sm" onclick="extendCustomer('${escHtml(c.id)}')">↺ Verlängern</button>` : ''}
        <button class="btn btn-archive btn-sm" onclick="openArchiveModal('${escHtml(c.id)}')">
          <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>
          Abschließen
        </button>
        <button class="btn btn-danger btn-sm" onclick="openDeleteModal('${escHtml(c.id)}')">Löschen</button>
      </div>
    `;
    grid.appendChild(card);
  });

  const addCard = document.createElement('div');
  addCard.className = 'add-card';
  addCard.onclick = openNewModal;
  addCard.innerHTML = `<div class="add-icon">+</div><span>Neuen Kunden anlegen</span>`;
  grid.appendChild(addCard);
}

function renderArchive() {
  const grid  = document.getElementById('archive-grid');
  const empty = document.getElementById('archive-empty');
  grid.innerHTML = '';

  if (archivedCustomers.length === 0) {
    empty.style.display = 'block';
  } else {
    empty.style.display = 'none';
  }

  archivedCustomers.forEach((c, i) => {
    const cre  = new Date(c.createdAt);
    const card = document.createElement('div');
    card.className = 'customer-card archived-card';
    card.style.animationDelay = `${i * 0.06}s`;
    card.innerHTML = `
      <div class="card-top">
        <div>
          <div class="customer-name">${escHtml(c.name)}</div>
          <div class="customer-email">${c.email ? escHtml(c.email) : '<span style="color:var(--text-3)">Keine E-Mail</span>'}</div>
        </div>
        <span class="badge badge-archived">✓ Abgeschlossen</span>
      </div>
      ${c.submitted ? '<div style="font-size:12px;color:var(--success);margin-bottom:10px;">✓ Formular abgesendet</div>' : ''}
      <div class="card-meta">
        <span>ID:</span> ${escHtml(c.id)}<br>
        <span>Erstellt:</span> ${fmtDate(cre)}<br>
        ${c.note ? `<span>Notiz:</span> ${escHtml(c.note)}` : ''}
      </div>
      <div class="card-actions">
        ${c.submitted ? `<button class="btn btn-ghost btn-sm" onclick="downloadCustomerPdf('${escHtml(c.id)}')" title="PDF herunterladen">
          <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          PDF
        </button>` : ''}
        <button class="btn btn-ghost btn-sm" onclick="restoreCustomer('${escHtml(c.id)}')">
          <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.5"/></svg>
          Wiederherstellen
        </button>
        <button class="btn btn-danger btn-sm" onclick="openDeleteModal('${escHtml(c.id)}')">Löschen</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ── Modal helpers ─────────────────────────────
function openNewModal() {
  document.getElementById('new-name').value  = '';
  document.getElementById('new-email').value = '';
  document.getElementById('new-note').value  = '';
  document.getElementById('new-individual-automation').checked = false;
  document.getElementById('custom-q-list').innerHTML = '';
  renderSectionPicker();   // setzt alle Häkchen zurück auf "an"
  document.getElementById('generated-link-box').style.display = 'none';
  document.getElementById('create-link-btn').style.display = '';
  document.getElementById('fertig-btn').style.display = 'none';
  document.getElementById('new-modal').style.display = 'flex';
  setTimeout(() => document.getElementById('new-name').focus(), 50);
}

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
}

function closeModalOnBg(e, id) {
  if (e.target === e.currentTarget) closeModal(id);
}

// ── Toast ─────────────────────────────────────
function showToast(msg, type = 'success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icon  = type === 'success' ? '✓' : '✕';
  const color = type === 'success' ? 'var(--success)' : 'var(--danger)';
  toast.innerHTML = `<span style="color:${color};font-weight:700;">${icon}</span> ${msg}`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0'; toast.style.transform = 'translateY(8px)'; toast.style.transition = '0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ── Invitation via Resend (Netlify Function) ──
async function sendInvitationEmail(to, name, subject, html) {
  const res = await fetch('https://send-invitation.majosh2026we.workers.dev/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ to, to_name: name, subject, html })
  });
  if (!res.ok) throw new Error('send failed');
}

// ── PDF Download ──────────────────────────────
async function downloadCustomerPdf(id) {
  showToast('PDF wird erstellt …', 'success');
  try {
    const doc = await CUSTOMERS_COL.doc(id).get();
    const data = doc.data();
    if (!data || !data.briefingHtml) {
      showToast('Kein PDF verfügbar (Briefing vor Update eingegangen).', 'error');
      return;
    }
    const parser = new DOMParser();
    const parsed = parser.parseFromString(data.briefingHtml, 'text/html');
    const bodyHtml = parsed.body.innerHTML;

    const name = (data.name || id).replace(/\s+/g, '_');
    await html2pdf().set({
      margin: 0,
      filename: `Briefing_${name}.pdf`,
      image: { type: 'jpeg', quality: 0.95 },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: '#f0f0f5' },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }).from(bodyHtml).save();
  } catch (err) {
    showToast('Fehler beim Erstellen des PDFs: ' + err.message, 'error');
  }
}

// ── Utils ─────────────────────────────────────
function escHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function fmtDate(d) {
  return d.toLocaleDateString('de-DE', { day:'2-digit', month:'2-digit', year:'numeric' });
}
