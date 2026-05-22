---
title: Briefing-Tool · Changelog & Dokumentation
date: 2026-05-22
tags:
  - projekt/247on
  - briefing-tool
  - changelog
status: aktiv
---

# Briefing-Tool · Changelog & Dokumentation

Alle Verbesserungen und neuen Features die am **24/7 ON Briefing-Tool** umgesetzt wurden.

> [!info] Live-URL
> [silver-malabi-927b15.netlify.app](https://silver-malabi-927b15.netlify.app)

---

## ✅ Umgesetzte Features

### 4. KI & Automatisierung — Neue Leistungsoptionen (2026-05-22)

- [x] 4 neue Chips in **Abschnitt 8 „KI & Automatisierung"** des Kunden-Formulars ergänzt
- [x] Beschreibungsbox im Formular um alle neuen Optionen erweitert
- [x] Harte Chip-Liste in `sectionHtml()` (`form.js`) aktualisiert → neue Optionen erscheinen korrekt im Briefing-Dokument (PDF & E-Mail)

**Neue Auswahloptionen:**
- E-Mail Automatisierung
- Social Media Automatisierung
- Rechnungs-Automatisierung
- Komplexere Vorgänge auf Wunsch

> [!bug] Gelöster Bug — Chips fehlten im Briefing-Dokument
> **Problem:** Die Chip-Liste in `sectionHtml(8, ...)` in `form.js` war hart kodiert und enthielt nur die ursprünglichen 4 Optionen.
> **Lösung:** Liste in `form.js:312` um alle 4 neuen Chips erweitert.

**Relevante Dateien:**
- `form.html` → neue `<div class="chip">` Einträge + Beschreibungsbox
- `form.js:312` → harte Chip-Liste in `sectionHtml()` Call

---

### 5. Admin-Modal — Fertig-Button nach Link-Erstellung (2026-05-22)

- [x] Nach erfolgreichem Klick auf „Link erstellen" wird der Button durch **„Fertig"** ersetzt
- [x] Klick auf „Fertig" schließt das Modal → zurück zum Dashboard
- [x] Beim nächsten Öffnen des Modals wird alles sauber zurückgesetzt (Felder, Checkbox, Button-Zustand)

> [!tip] Warum diese Änderung?
> Vorher blieb nach dem Erstellen nur wieder „Link erstellen" sichtbar — ein zweiter Klick hätte einen doppelten Kunden erzeugt. Jetzt ist der Flow eindeutig: erstellen → Link sehen → fertig.

**Relevante Funktionen:**
- `createCustomer()` → `admin.js` — setzt `create-link-btn` auf `display:none`, `fertig-btn` auf sichtbar
- `openNewModal()` → `admin.js` — setzt beide Buttons beim Öffnen zurück
- `index.html` — neuer Button `#fertig-btn` im Modal

---

### 1. PDF-Download

- [x] `html2pdf.js` per CDN in `form.html` und `index.html` eingebunden
- [x] **Erfolgsseite** (`form.html`): Button „Briefing als PDF herunterladen" nach dem Absenden
- [x] **Admin-Panel** (`index.html`): PDF-Button bei jedem abgesendeten Kunden (aktiv + Archiv)
- [x] `form.js`: speichert `briefingHtml` beim Submit in Firestore → Admin kann es jederzeit abrufen
- [x] Bug behoben: leeres/weißes PDF

> [!bug] Gelöster Bug — Weißes PDF
> **Problem:** Element wurde mit `left:-9999px` positioniert → `html2canvas` rendert off-screen Elemente nicht.
> **Lösung:** HTML-String per `DOMParser` parsen, nur `body.innerHTML` extrahieren und direkt als String an `html2pdf()` übergeben — kein DOM-Element nötig.

**Relevante Funktionen:**
- `downloadBriefingPdf()` → `form.js`
- `downloadCustomerPdf(id)` → `admin.js`

---

### 2. Kunden-Einladungsmail

- [x] Beim Anlegen eines Kunden **mit E-Mail** → Mail wird automatisch versendet
- [x] „Senden"-Button im Admin sendet dieselbe Mail erneut (z. B. als Erinnerung)
- [x] Netlify Function `netlify/functions/send-invitation.js` als Backend
- [x] **Brevo API** als E-Mail-Dienst

> [!warning] Verworfene Ansätze
> **EmailJS `{{{html_content}}}`** → Template-Limit erreicht, HTML wurde nicht gerendert.
> **Resend Free Tier** → Ohne verifizierte Domain nur Versand an die eigene Account-E-Mail möglich.
> **Lösung: Brevo** → 300 E-Mails/Tag kostenlos, nur E-Mail-Verifikation nötig (kein Domain-Zwang).

**API-Endpoint:** `https://api.brevo.com/v3/smtp/email`
**Env-Variable:** `BREVO_API_KEY` (in Netlify hinterlegt)

**Relevante Funktionen:**
- `buildInvitationEmailHtml(name, link, daysLeft)` → `admin.js`
- `sendInvitationEmail(to, name, subject, html)` → `admin.js`

---

### 3. E-Mail Design

- [x] Betreff: **„Website-Briefing"**
- [x] Header: „Hallo [Vorname]!" + „Das Website-Briefing — angepasst an Ihre Wünsche."
- [x] 3-Schritte-Prozess mit lila Kreisen
- [x] CTA-Button „Briefing jetzt ausfüllen →"
- [x] Hinweis-Box mit Ablaufdatum
- [x] Absender: `Joshua · 24/7 ON <majosh2026we@gmail.com>` via Brevo
- [x] Durchgehend **Sie-Form** (formelle Ansprache)

> [!tip] E-Mail CSS Gotchas
> - `display:flex` → **funktioniert nicht** in E-Mail-Clients → Zahlen in Kreisen mit `line-height:32px` zentrieren
> - CSS-Gradienten auf Buttons → **unzuverlässig** → Solid Color `background:#a855f7` verwenden
> - Textfarbe auf Buttons immer **doppelt** setzen: `color:#ffffff` + `-webkit-text-fill-color:#ffffff`

---

## 🛠 Technischer Stack

| Komponente | Dienst / Technologie |
|---|---|
| Hosting | Netlify (`silver-malabi-927b15`) |
| Datenbank | Firebase Firestore |
| Briefing-Benachrichtigung (Admin) | EmailJS (`template_w72zub6`, `service_2rr4ih8`) |
| Einladungsmail (Kunden) | Brevo API via Netlify Function |
| PDF-Generierung | html2pdf.js (CDN) |
| Backend-Logik | Netlify Functions (Node.js) |

---

## 📁 Dateistruktur (Änderungen)

```
24:7 on/
├── form.html              ← html2pdf CDN + Firebase SDKs + PDF-Button Erfolgsseite
├── form.js                ← downloadBriefingPdf(), Firestore-Speicherung briefingHtml
├── index.html             ← html2pdf CDN
├── admin.js               ← buildInvitationEmailHtml(), sendInvitationEmail(),
│                              downloadCustomerPdf(), PDF-Buttons in Karten
└── netlify/
    └── functions/
        └── send-invitation.js   ← Brevo API Call
```

---

## 🔑 Zugänge & Keys

> [!danger] Sicherheit
> API Keys **niemals** im Code oder Chat teilen. Alle Keys sind als Netlify Environment Variables hinterlegt.

| Dienst | Variable | Hinweis |
|---|---|---|
| Brevo | `BREVO_API_KEY` | In Netlify → Site configuration → Environment variables |
| Resend | `RESEND_API_KEY` | Noch gesetzt, aber nicht mehr aktiv genutzt |
