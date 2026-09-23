/* ============================================
   FORM.JS — Kunden-Formular Logik & Briefing-Generierung
   Nexvia Briefing Suite
   ============================================ */

// ── EmailJS Config ───────────────────────────
const EMAILJS_SERVICE  = 'service_2rr4ih8';
const EMAILJS_TEMPLATE = 'template_w72zub6';
const EMAILJS_PUBLIC   = 'qil4eefMTb5qApNIk';
const ADMIN_EMAIL      = 'info@nexvia-we.de';

// ── State ────────────────────────────────────
let customerData = null;
let uploadedFiles = []; // Array of { name, type, dataUrl, sizeKb }
let lastSubmittedHtml = null;

/* Welche Abschnitte dieser Kunde sieht und welche eigenen Fragen dazukommen.
   enabledSections === null bedeutet "noch nicht geladen" oder "keine
   Konfiguration hinterlegt" — in beiden Fällen wird alles angezeigt. */
let formConfig = { enabledSections: null, customQuestions: [] };

function isSectionEnabled(sid) {
  if (!formConfig.enabledSections) return true;
  if (formConfig.enabledSections.includes(sid)) return true;
  if (typeof LEGACY_SECTION_MAP !== 'undefined') {
    for (const [legacyId, newId] of Object.entries(LEGACY_SECTION_MAP)) {
      if (newId === sid && formConfig.enabledSections.includes(legacyId)) return true;
    }
  }
  return false;
}

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
    const jsonStr = decodeURIComponent(escape(atob(token)));
    const payload = JSON.parse(jsonStr);

    if (!payload.id || !payload.name || !payload.expiresAt) {
      showExpired();
      return;
    }

    // Check expiry
    const now     = new Date();
    const expires = new Date(payload.expiresAt);
    if (now > expires) {
      showExpired();
      return;
    }

    // Check submitted
    if (localStorage.getItem('submitted_' + payload.id)) {
      showSubmitted();
      return;
    }

    customerData = payload;
    renderFormHeader();
    applyFormConfig(payload.id);

  } catch (e) {
    showExpired();
  }
}

/* Lädt die Fragenauswahl aus briefing_forms/{id} und wendet sie an.
   Der Formularkörper bleibt so lange ausgeblendet, bis alles fertig gerendert ist. */
async function applyFormConfig(customerId) {
  const body = document.querySelector('.form-body');
  if (body) body.style.opacity = '0';

  try {
    const snap = await FORMS_COL.doc(customerId).get();
    if (snap.exists) {
      const cfg = snap.data() || {};
      if (Array.isArray(cfg.enabledSections)) formConfig.enabledSections = cfg.enabledSections;
      if (Array.isArray(cfg.customQuestions)) formConfig.customQuestions = cfg.customQuestions;
    }
  } catch (e) {
    console.warn('Fragenauswahl nicht ladbar, zeige alle Abschnitte:', e);
  }

  renderFormSections();
  if (body) body.style.opacity = '1';
}

/* Rendert die Abschnitte dynamisch nach Kategorien strukturiert. */
function renderFormSections() {
  const container = document.getElementById('form-sections-container');
  if (!container) return;
  container.innerHTML = '';

  let globalNum = 0;
  const activeQuestionsList = [];

  FORM_CATEGORIES.forEach(cat => {
    // Prüfen ob mindestens ein Abschnitt dieser Kategorie aktiv ist
    const activeInCat = cat.sections.filter(s => isSectionEnabled(s.id));
    if (activeInCat.length === 0) return;

    // Kategorie-Banner erzeugen
    const banner = document.createElement('div');
    banner.className = 'category-banner';
    banner.setAttribute('data-cat', cat.id);
    banner.innerHTML = `
      <div class="category-banner-icon">${cat.icon}</div>
      <div>
        <div class="category-banner-subtitle">LEISTUNGSBEREICH</div>
        <h2 class="category-banner-title">${escHtml(cat.title)}</h2>
        <p class="category-banner-desc">${escHtml(cat.description)}</p>
      </div>
    `;
    container.appendChild(banner);

    // Abschnitte dieser Kategorie rendern
    activeInCat.forEach(s => {
      globalNum++;
      activeQuestionsList.push({
        num: globalNum,
        id: s.id,
        title: s.title,
        subtitle: s.subtitle,
        options: s.options || [],
        categoryId: cat.id
      });

      const secEl = document.createElement('div');
      secEl.className = 'form-section';
      secEl.setAttribute('data-sid', s.id);
      secEl.style.animationDelay = `${(globalNum * 0.04).toFixed(2)}s`;

      let innerHtml = '';

      // Chips
      if (s.options && s.options.length > 0) {
        innerHtml += `
          <div class="chips-wrap" data-section="${escHtml(s.id)}">
            ${s.options.map(opt => `<div class="chip" onclick="toggleChip(this)">${escHtml(opt)}</div>`).join('')}
          </div>
        `;
      }

      // Datei-Upload Zone bei Material & Upload
      if (s.hasUpload) {
        innerHtml += `
          <div style="margin-top:20px;">
            <label style="margin-bottom:10px;font-weight:600;font-size:13px;display:block;">Dateien hochladen (Logo, Fotos, Referenzen, Dokumente)</label>
            <div class="upload-zone" id="upload-zone" onclick="document.getElementById('file-input').click()" ondragover="handleDragOver(event)" ondragleave="handleDragLeave(event)" ondrop="handleDrop(event)">
              <input type="file" id="file-input" multiple accept="image/*,.pdf" onchange="handleFiles(this.files)">
              <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" style="margin-bottom:8px;color:var(--cyan);opacity:0.75;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              <div><strong style="color:var(--text-2);">Dateien hierher ziehen</strong> oder klicken zum Auswählen</div>
              <div style="margin-top:4px;font-size:11px;color:var(--text-3);">Bilder (JPG, PNG, SVG) · PDF · max. 5 MB pro Datei</div>
            </div>
            <div class="upload-previews" id="upload-previews"></div>
            <div id="upload-size-warning" style="display:none;color:var(--warning);font-size:12px;margin-top:8px;">
              ℹ Große Bilder werden automatisch optimiert, damit das Briefing zuverlässig übermittelt wird.
            </div>
          </div>
        `;
      }

      // Freitext / Notizen
      const placeholder = s.placeholder || (s.options && s.options.length > 0 ? 'Weitere Anmerkungen hierzu (optional) …' : 'Ihre Angaben hierzu …');
      const minHeight = (s.textOnly || s.id === 'auto_problem' || s.id === 'konkurrenz' || s.id === 'anmerkungen') ? 'min-height:96px;' : '';

      innerHtml += `
        <textarea class="input" style="margin-top:14px;${minHeight}" placeholder="${escHtml(placeholder)}" data-field="${escHtml(s.id)}_text"></textarea>
      `;

      secEl.innerHTML = `
        <div class="section-head">
          <div class="section-num">${globalNum}</div>
          <div class="section-title-wrap" style="flex:1;">
            <h3>${escHtml(s.title)}</h3>
            <div class="section-subtitle">${escHtml(s.subtitle || 'Mehrfachauswahl möglich')}</div>
          </div>
          <button type="button" class="btn-ask-ai" onclick="openAiHelpForQuestion(${globalNum}, '${escHtml(s.id)}')" title="Frage ${globalNum} unklar? Alex fragen">
            <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2a8 8 0 0 0-8 8c0 3.3 2 6.2 5 7.4V20a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-2.6c3-1.2 5-4.1 5-7.4a8 8 0 0 0-8-8z"/><path d="M9 21h6"/><path d="M10 17h4"/></svg>
            <span>Alex fragen</span>
          </button>
        </div>
        ${innerHtml}
      `;

      container.appendChild(secEl);
    });
  });

  renderCustomQuestions(globalNum, activeQuestionsList);

  // Synchronisation mit dem lokalen KI-Briefing-Assistenten
  if (window.BriefingAI) {
    window.BriefingAI.syncActiveSections(activeQuestionsList);
  }
}

/* Hängt die individuellen Fragen als weitere Abschnitte an. */
function renderCustomQuestions(startNum, activeQuestionsList = []) {
  const box = document.getElementById('custom-questions');
  if (!box) return;
  box.innerHTML = '';

  if (!formConfig.customQuestions || formConfig.customQuestions.length === 0) return;

  let n = startNum || 0;

  const banner = document.createElement('div');
  banner.className = 'category-banner';
  banner.innerHTML = `
    <div class="category-banner-icon">✨</div>
    <div>
      <div class="category-banner-subtitle">INDIVIDUELL</div>
      <h2 class="category-banner-title">Spezifische Fragen für Ihr Projekt</h2>
      <p class="category-banner-desc">Individuelle Zusatzfragen Ihres Ansprechpartners</p>
    </div>
  `;
  box.appendChild(banner);

  formConfig.customQuestions.forEach(q => {
    n++;
    activeQuestionsList.push({
      num: n,
      id: q.id,
      title: q.title,
      subtitle: 'Individuelle Frage',
      options: q.options || [],
      categoryId: 'custom'
    });

    const el = document.createElement('div');
    el.className = 'form-section';
    el.setAttribute('data-sid', q.id);
    el.innerHTML = `
      <div class="section-head">
        <div class="section-num">${n}</div>
        <div class="section-title-wrap" style="flex:1;">
          <h3>${escHtml(q.title)}</h3>
          <div class="section-subtitle">Mehrfachauswahl möglich</div>
        </div>
        <button type="button" class="btn-ask-ai" onclick="openAiHelpForQuestion(${n}, '${escHtml(q.id)}')" title="Frage ${n} unklar? Alex fragen">
          <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2a8 8 0 0 0-8 8c0 3.3 2 6.2 5 7.4V20a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-2.6c3-1.2 5-4.1 5-7.4a8 8 0 0 0-8-8z"/><path d="M9 21h6"/><path d="M10 17h4"/></svg>
          <span>Alex fragen</span>
        </button>
      </div>
      <div class="chips-wrap" data-section="${escHtml(q.id)}">
        ${q.options.map(o => `<div class="chip" onclick="toggleChip(this)">${escHtml(o)}</div>`).join('')}
      </div>
      <textarea class="input" style="margin-top:14px;" placeholder="Weitere Anmerkungen hierzu (optional) …" data-field="${escHtml(q.id)}_text"></textarea>
    `;
    box.appendChild(el);
  });
}

function openAiHelpForQuestion(num, sid) {
  if (window.BriefingAI) {
    window.BriefingAI.openHelpForQuestion(num, sid);
  }
}

function renderFormHeader() {
  const name    = customerData.name.split(' ')[0]; // Vorname
  const expires = new Date(customerData.expiresAt);

  document.title = `Nexvia Briefing · ${customerData.name}`;
  document.getElementById('customer-name-display').textContent = name;
  document.getElementById('success-name').textContent = name;
  document.getElementById('expires-display').textContent = expires.toLocaleDateString('de-DE', {
    day: '2-digit', month: 'long', year: 'numeric'
  });
}

function showExpired() {
  document.getElementById('form-screen').style.display   = 'none';
  document.getElementById('success-screen').style.display = 'none';
  const exp = document.getElementById('expired-screen');
  if (exp) exp.style.display = 'flex';
}

function showSubmitted() {
  document.getElementById('form-screen').style.display    = 'none';
  document.getElementById('expired-screen').style.display = 'none';
  const succ = document.getElementById('success-screen');
  if (succ) succ.style.display = 'flex';
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
  const zone = document.getElementById('upload-zone');
  if (zone) zone.classList.add('dragover');
}

function handleDragLeave(e) {
  const zone = document.getElementById('upload-zone');
  if (zone) zone.classList.remove('dragover');
}

function handleDrop(e) {
  e.preventDefault();
  const zone = document.getElementById('upload-zone');
  if (zone) zone.classList.remove('dragover');
  handleFiles(e.dataTransfer.files);
}

const SHRINK_ABOVE_KB = 400;   // darunter wird nichts angefasst
const MAX_EDGE_PX     = 1600;  // längste Kante nach dem Verkleinern
const JPEG_QUALITY    = 0.82;

function shrinkImage(dataUrl, mime) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      const factor = MAX_EDGE_PX / Math.max(img.width, img.height);
      if (factor >= 1) { resolve(dataUrl); return; }

      const canvas  = document.createElement('canvas');
      canvas.width  = Math.round(img.width  * factor);
      canvas.height = Math.round(img.height * factor);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);

      resolve(mime === 'image/png'
        ? canvas.toDataURL('image/png')
        : canvas.toDataURL('image/jpeg', JPEG_QUALITY));
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

const dataUrlKb = url => Math.round((url.length - (url.indexOf(',') + 1)) * 0.75 / 1024);

function handleFiles(fileList) {
  const maxSize = 5 * 1024 * 1024; // 5MB
  let shrunkAny = false;

  Array.from(fileList).forEach(file => {
    if (uploadedFiles.length >= 10) {
      showToast('Maximal 10 Dateien erlaubt.', 'error');
      return;
    }
    if (file.size > maxSize) {
      showToast(`"${file.name}" ist zu groß (max. 5 MB).`, 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      let dataUrl = e.target.result;
      const originalKb = Math.round(file.size / 1024);

      if (file.type.startsWith('image/') && originalKb > SHRINK_ABOVE_KB) {
        dataUrl = await shrinkImage(dataUrl, file.type);
        shrunkAny = true;
      }

      uploadedFiles.push({
        name:    file.name,
        type:    file.type,
        dataUrl: dataUrl,
        sizeKb:  dataUrlKb(dataUrl)
      });
      renderPreviews();

      const warning = document.getElementById('upload-size-warning');
      if (shrunkAny && warning) warning.style.display = 'block';
    };
    reader.readAsDataURL(file);
  });
}

function removeFile(index) {
  uploadedFiles.splice(index, 1);
  renderPreviews();
}

function renderPreviews() {
  const container = document.getElementById('upload-previews');
  if (!container) return;
  container.innerHTML = '';
  uploadedFiles.forEach((file, i) => {
    const item = document.createElement('div');
    item.className = 'preview-item';
    if (file.type.startsWith('image/')) {
      item.innerHTML = `
        <img src="${file.dataUrl}" alt="${escHtml(file.name)}">
        <div class="preview-name">${escHtml(file.name)}</div>
        <div class="remove-file" onclick="removeFile(${i})">×</div>
      `;
    } else {
      item.innerHTML = `
        <div class="file-icon">📄</div>
        <div class="preview-name">${escHtml(file.name)}</div>
        <div class="remove-file" onclick="removeFile(${i})">×</div>
      `;
    }
    container.appendChild(item);
  });
}

// ── Collect data ─────────────────────────────
function collectFormData() {
  const sectionsData = {};
  FORM_SECTIONS.forEach(s => {
    if (isSectionEnabled(s.id)) {
      sectionsData[s.id] = {
        id: s.id,
        title: s.title,
        categoryId: s.categoryId,
        chips: getChipValues(s.id),
        text: getFieldValue(s.id + '_text') || getFieldValue(s.id)
      };
    }
  });

  return {
    sections: sectionsData,
    custom: formConfig.customQuestions.map(q => ({
      id: q.id,
      title: q.title,
      options: q.options,
      answers: getChipValues(q.id),
      text: getFieldValue(q.id + '_text')
    })),
    files: uploadedFiles.map(f => ({ name: f.name, type: f.type, sizeKb: f.sizeKb, dataUrl: f.dataUrl }))
  };
}

// ── Build HTML email body ────────────────────
function buildEmailHtml(data) {
  const now = new Date();
  const fmtDate = d => d.toLocaleDateString('de-DE', { day:'2-digit', month:'2-digit', year:'numeric' });
  const fmtTime = d => d.toLocaleTimeString('de-DE', { hour:'2-digit', minute:'2-digit' });

  const chipHtml = (items, allOptions) => {
    if (!allOptions || allOptions.length === 0) {
      return items && items.length > 0
        ? items.map(i => `<span style="display:inline-block;padding:4px 12px;margin:3px;border-radius:20px;font-size:12px;font-weight:500;background:rgba(34,197,94,0.12);border:1px solid rgba(34,197,94,0.4);color:#15803d;">${escHtml(i)}</span>`).join('')
        : '<span style="color:#aaa;font-size:12px;font-style:italic;">Keine Auswahl</span>';
    }
    return allOptions.map(opt => {
      const sel = (items || []).includes(opt);
      return `<span style="display:inline-block;padding:4px 12px;margin:3px;border-radius:20px;font-size:12px;font-weight:${sel?'600':'400'};background:${sel?'rgba(34,197,94,0.12)':'#f5f5f8'};border:1px solid ${sel?'rgba(34,197,94,0.4)':'#e5e5ea'};color:${sel?'#15803d':'#aaa'};">${sel?'✓ ':''} ${escHtml(opt)}</span>`;
    }).join('');
  };

  const sectionShell = (num, title, bodyHtml, text) => `
    <tr><td colspan="2" style="padding:14px 0 0;">
      <table width="100%" style="border-collapse:collapse;border:1px solid #eee;border-radius:10px;overflow:hidden;">
        <tr style="background:linear-gradient(135deg,#f0fdf4,#f0fdfa);">
          <td style="padding:12px 16px;">
            <table><tr>
              <td style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#22c55e,#06b6d4);text-align:center;vertical-align:middle;color:#040912;font-weight:700;font-size:12px;font-family:sans-serif;">${num}</td>
              <td style="padding-left:10px;font-family:sans-serif;font-size:13px;font-weight:700;color:#1a1a2e;letter-spacing:0.8px;">${escHtml(String(title).toUpperCase())}</td>
            </tr></table>
          </td>
        </tr>
        <tr><td style="padding:14px 16px;">${bodyHtml}</td></tr>
        ${text ? `<tr><td style="padding:0 16px 14px;"><p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.8px;color:#888;">Anmerkung</p><p style="margin:0;font-size:13px;color:#333;background:#f9f9fc;border-left:3px solid #22c55e;padding:8px 12px;border-radius:0 6px 6px 0;">${escHtml(text).replace(/\n/g,'<br>')}</p></td></tr>` : ''}
      </table>
    </td></tr>
  `;

  const categoryBannerHtml = (cat) => `
    <tr><td colspan="2" style="padding:28px 0 6px;">
      <table width="100%" style="border-collapse:collapse;background:linear-gradient(135deg,#060b14,#0c1930);border-radius:10px;border-left:4px solid #22c55e;">
        <tr><td style="padding:14px 20px;">
          <table style="border-collapse:collapse;"><tr>
            <td style="font-size:22px;padding-right:12px;vertical-align:middle;">${cat.icon}</td>
            <td>
              <div style="font-family:sans-serif;font-size:10px;text-transform:uppercase;letter-spacing:1.5px;color:#06b6d4;font-weight:700;">LEISTUNGSBEREICH</div>
              <div style="font-family:sans-serif;font-size:16px;font-weight:800;color:white;">${escHtml(cat.title)}</div>
            </td>
          </tr></table>
        </td></tr>
      </table>
    </td></tr>
  `;

  const fileRows = [];
  for (let i = 0; i < data.files.length; i += 2) fileRows.push(data.files.slice(i, i + 2));

  const safeDataUrl = url => (typeof url === 'string' && (url.startsWith('data:image/') || url.startsWith('data:application/pdf'))) ? url : '#';

  const filePreview = f => f.type.startsWith('image/')
    ? `<img src="${safeDataUrl(f.dataUrl)}" alt="${escHtml(f.name)}" style="width:100%;max-width:260px;height:auto;border-radius:6px;border:1px solid #eee;display:block;">
       <span style="display:block;margin-top:5px;font-size:10px;color:#888;font-family:sans-serif;">${escHtml(f.name)}</span>`
    : `<a href="${safeDataUrl(f.dataUrl)}" download="${escHtml(f.name)}" style="text-decoration:none;">
         <div style="width:100%;max-width:260px;background:#f5f5f8;border:1px solid #eee;border-radius:6px;font-size:11px;color:#888;text-align:center;padding:24px 8px;font-family:sans-serif;">${escHtml(f.name)}<br><span style="font-size:10px;">(${f.sizeKb} KB) · zum Öffnen klicken</span></div>
       </a>`;

  const imageSectionHtml = (files) => `
    <tr><td colspan="2" style="padding:14px 0 0;">
      <table width="100%" style="border-collapse:collapse;border:1px solid #eee;border-radius:10px;overflow:hidden;">
        <tr style="background:linear-gradient(135deg,#f0fdf4,#f0fdfa);">
          <td style="padding:12px 16px;">
            <table><tr>
              <td style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#22c55e,#06b6d4);text-align:center;vertical-align:middle;color:#040912;font-weight:700;font-size:12px;font-family:sans-serif;">${files.length}</td>
              <td style="padding-left:10px;font-family:sans-serif;font-size:13px;font-weight:700;color:#1a1a2e;letter-spacing:0.8px;">HOCHGELADENE DATEIEN</td>
            </tr></table>
          </td>
        </tr>
        <tr><td style="padding:14px 16px;">
          <table width="100%" style="border-collapse:collapse;">
            ${fileRows.map(row => `<tr>
              ${row.map(f => `<td width="50%" style="padding:6px;vertical-align:top;">${filePreview(f)}</td>`).join('')}
              ${row.length === 1 ? '<td width="50%"></td>' : ''}
            </tr>`).join('')}
          </table>
        </td></tr>
      </table>
    </td></tr>
  `;

  let sectionCounter = 0;
  let sectionsHtml = '';

  FORM_CATEGORIES.forEach(cat => {
    const activeInCat = cat.sections.filter(s => isSectionEnabled(s.id));
    if (activeInCat.length === 0) return;

    sectionsHtml += categoryBannerHtml(cat);

    activeInCat.forEach(s => {
      sectionCounter++;
      const sData = (data.sections && data.sections[s.id]) ? data.sections[s.id] : { chips: [], text: '' };

      let body = '';
      if (s.options && s.options.length > 0) {
        body = chipHtml(sData.chips, s.options);
      } else if (sData.text) {
        body = `<span style="font-size:13px;color:#333;">${escHtml(sData.text).replace(/\n/g,'<br>')}</span>`;
      } else {
        body = '<span style="color:#aaa;font-size:12px;font-style:italic;">Keine Angabe</span>';
      }

      const noteText = (s.options && s.options.length > 0) ? sData.text : '';
      sectionsHtml += sectionShell(sectionCounter, s.title, body, noteText);

      if (s.hasUpload && data.files && data.files.length > 0) {
        sectionsHtml += imageSectionHtml(data.files);
      }
    });
  });

  // Custom sections
  if (data.custom && data.custom.length > 0) {
    sectionsHtml += `
      <tr><td colspan="2" style="padding:28px 0 6px;">
        <table width="100%" style="border-collapse:collapse;background:linear-gradient(135deg,#060b14,#0c1930);border-radius:10px;border-left:4px solid #06b6d4;">
          <tr><td style="padding:14px 20px;">
            <table style="border-collapse:collapse;"><tr>
              <td style="font-size:22px;padding-right:12px;vertical-align:middle;">✨</td>
              <td>
                <div style="font-family:sans-serif;font-size:10px;text-transform:uppercase;letter-spacing:1.5px;color:#06b6d4;font-weight:700;">INDIVIDUELL</div>
                <div style="font-family:sans-serif;font-size:16px;font-weight:800;color:white;">Spezifische Fragen</div>
              </td>
            </tr></table>
          </td></tr>
        </table>
      </td></tr>
    `;
    data.custom.forEach(q => {
      sectionCounter++;
      sectionsHtml += sectionShell(sectionCounter, q.title, chipHtml(q.answers, q.options), q.text || '');
    });
  }

  const adminUrl = new URL('index.html', window.location.href).href;

  const cName  = escHtml((customerData && customerData.name) || 'Kunde');
  const cEmail = escHtml((customerData && customerData.email) || '—');
  const cId    = escHtml((customerData && customerData.id) || '—');

  return `
<!DOCTYPE html>
<html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f0f0f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table width="100%" style="background:#f0f0f5;padding:30px 0;"><tr><td align="center">
<table width="680" style="max-width:680px;background:white;border-radius:12px;overflow:hidden;box-shadow:0 4px 40px rgba(0,0,0,0.12);">

  <!-- Notification Banner -->
  <tr><td style="background:#16a34a;padding:14px 40px;">
    <table width="100%"><tr>
      <td style="font-family:sans-serif;font-size:14px;font-weight:700;color:white;">✅ Neues Nexvia Briefing eingegangen — ${cName}</td>
      <td align="right" style="font-family:sans-serif;font-size:12px;color:rgba(255,255,255,0.8);">${fmtDate(now)}, ${fmtTime(now)}</td>
    </tr></table>
  </td></tr>

  <!-- Header -->
  <tr><td style="background:linear-gradient(135deg,#060b14 0%,#0c1930 50%,#081426 100%);padding:36px 40px;">
    <p style="margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#22c55e;font-family:sans-serif;font-weight:700;">NEXVIA · Next Vision Intelligence Automation</p>
    <h1 style="margin:0 0 6px;font-size:28px;color:white;font-family:sans-serif;">Briefing: <span style="color:#22c55e;">${cName}</span></h1>
    <p style="margin:0 0 28px;font-size:13px;color:rgba(255,255,255,0.5);font-family:sans-serif;">Ausgefüllt am ${fmtDate(now)} um ${fmtTime(now)}</p>

    <!-- PDF Download CTA -->
    <table style="margin-bottom:28px;border-collapse:collapse;"><tr>
      <td>
        <a href="${adminUrl}" style="display:inline-block;padding:14px 32px;border-radius:10px;background:#22c55e;background-color:#22c55e;color:#040912 !important;font-size:15px;font-weight:800;text-decoration:none;font-family:sans-serif;letter-spacing:0.3px;-webkit-text-fill-color:#040912;box-shadow:0 4px 16px rgba(34,197,94,0.3);">⬇ PDF herunterladen</a>
      </td>
      <td style="padding-left:16px;">
        <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.5);font-family:sans-serif;">Im Admin-Panel öffnen<br>und PDF generieren</p>
      </td>
    </tr></table>

    <table style="border-collapse:collapse;">
      <tr>
        <td style="padding-right:32px;"><p style="margin:0 0 4px;font-size:9px;text-transform:uppercase;letter-spacing:1px;color:#22c55e;font-family:sans-serif;font-weight:600;">Kunde</p><p style="margin:0;font-size:13px;color:rgba(255,255,255,0.9);font-weight:500;font-family:sans-serif;">${cName}</p></td>
        <td style="padding-right:32px;"><p style="margin:0 0 4px;font-size:9px;text-transform:uppercase;letter-spacing:1px;color:#22c55e;font-family:sans-serif;font-weight:600;">E-Mail</p><p style="margin:0;font-size:13px;color:rgba(255,255,255,0.9);font-weight:500;font-family:sans-serif;">${cEmail}</p></td>
        <td style="padding-right:32px;"><p style="margin:0 0 4px;font-size:9px;text-transform:uppercase;letter-spacing:1px;color:#22c55e;font-family:sans-serif;font-weight:600;">Formular-ID</p><p style="margin:0;font-size:13px;color:rgba(255,255,255,0.9);font-weight:500;font-family:sans-serif;">${cId}</p></td>
        <td><p style="margin:0 0 4px;font-size:9px;text-transform:uppercase;letter-spacing:1px;color:#22c55e;font-family:sans-serif;font-weight:600;">Abgesendet</p><p style="margin:0;font-size:13px;color:rgba(255,255,255,0.9);font-weight:500;font-family:sans-serif;">${fmtDate(now)}, ${fmtTime(now)}</p></td>
      </tr>
    </table>
  </td></tr>

  <!-- Body -->
  <tr><td style="padding:32px 40px;">
    <table width="100%" style="border-collapse:collapse;">
      ${sectionsHtml}
    </table>
  </td></tr>

  <!-- Footer -->
  <tr><td style="background:linear-gradient(135deg,#060b14,#0c1930);padding:20px 40px;">
    <table width="100%"><tr>
      <td style="font-size:11px;color:#22c55e;font-family:sans-serif;font-weight:700;">NEXVIA · Next Vision Intelligence Automation</td>
      <td align="right" style="font-size:10px;color:rgba(255,255,255,0.4);font-family:sans-serif;">${cId} · ${fmtDate(now)}</td>
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

  const data     = collectFormData();
  const htmlBody = buildEmailHtml(data);
  lastSubmittedHtml = htmlBody;

  // Größencheck vor dem Absenden (Firestore-Dokumentenlimit ca. 1 MiB)
  const payloadSize = new Blob([htmlBody]).size;
  if (payloadSize > 850000) {
    showToast('Das Briefing ist durch die vielen Dateien zu groß für den Upload (max. ca. 850 KB gesamt). Bitte entfernen Sie einzelne große Dateien.', 'error');
    btn.disabled = false;
    btn.innerHTML = `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Briefing absenden`;
    return;
  }

  // Header-Injection-Schutz für Mail-Betreff
  const safeName = String(customerData.name || '').replace(/[\r\n]+/g, ' ').trim();
  const safeId   = String(customerData.id || '').replace(/[\r\n]+/g, ' ').trim();

  try {
    // 1. Zuerst in Firestore abspeichern (Prüft Server-Frist und Sperre gegen Mehrfachabsenden)
    await CUSTOMERS_COL.doc(customerData.id).update({
      submitted: true,
      submittedAt: new Date().toISOString(),
      briefingHtml: htmlBody
    });

    // 2. Benachrichtigungs-Mail an den Admin versenden
    try {
      await fetch('https://send-invitation.majosh2026we.workers.dev/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Nexvia-Source': 'briefing-form'
        },
        body: JSON.stringify({
          type:    'submission',
          to:      ADMIN_EMAIL,
          to_name: 'Joshua',
          subject: `✅ Nexvia Briefing von ${safeName} (${safeId})`,
          html:    htmlBody
        })
      });
    } catch (mailErr) {
      console.warn('Briefing in Datenbank gespeichert, aber E-Mail-Zustellung fehlgeschlagen:', mailErr);
    }

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
    const successScreen = document.getElementById('success-screen');
    successScreen.style.display = 'flex';
    window.scrollTo({ top: 0, behavior: 'smooth' });

  } catch (err) {
    showToast('Fehler beim Absenden: ' + err.message, 'error');
    btn.disabled = false;
    btn.innerHTML = `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Briefing absenden`;
  }
}

// ── PDF Download (Erfolgsseite) ───────────────
function downloadBriefingPdf() {
  if (!lastSubmittedHtml) return;
  const btn = document.getElementById('pdf-download-btn');
  if (btn) { btn.disabled = true; btn.textContent = 'PDF wird erstellt …'; }

  const parser = new DOMParser();
  const doc = parser.parseFromString(lastSubmittedHtml, 'text/html');

  // CTA-Download-Button im PDF entfernen
  const ctaLinks = doc.querySelectorAll('a');
  ctaLinks.forEach(a => {
    if (a.textContent.includes('PDF')) a.closest('table')?.remove();
  });

  const opt = {
    margin: [8, 8, 8, 8],
    filename: `Briefing_${customerData.name.replace(/\s+/g, '_')}.pdf`,
    image: { type: 'jpeg', quality: 0.95 },
    html2canvas: { scale: 2, useCORS: true, logging: false },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(doc.body.innerHTML).save().then(() => {
    if (btn) { btn.disabled = false; btn.innerHTML = `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Briefing als PDF herunterladen`; }
  }).catch(() => {
    if (btn) { btn.disabled = false; btn.textContent = 'Fehler — bitte nochmal versuchen'; }
  });
}

// ── Toast ─────────────────────────────────────
function showToast(msg, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    toast.style.transition = '0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ── HTML Escape Helper ────────────────────────
function escHtml(str) {
  if (typeof str !== 'string') return String(str || '');
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
