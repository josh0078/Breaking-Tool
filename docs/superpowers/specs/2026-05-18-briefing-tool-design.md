# Design Spec: Kunden-Briefing-Tool

**Datum:** 2026-05-18  
**Status:** Approved

---

## Überblick

Zwei-seitiges Web-Tool: Ein Admin-Dashboard für Joshua und ein temporäres Kunden-Formular. Kein Backend nötig — reines HTML/CSS/JS mit EmailJS für E-Mail-Versand.

---

## Design

- **Stil:** Gradient Glow — dunkle Hintergründe (#07070f), weiche lila/blaue Leuchten, Farbverläufe
- **Farben:** Schwarz · Lila (#a855f7) · Blau (#6366f1, #3b82f6)
- **Schrift:** System-Font (-apple-system, Segoe UI)

---

## Seite 1: Admin-Dashboard (`index.html`)

### Funktion
- Passwortschutz (einfaches lokales Passwort, im JS gespeichert)
- Neuen Kunden anlegen: Name eingeben → Link + Ablaufdatum (7 Werktage) wird generiert
- Kunden-Karten-Ansicht mit Status-Badge: Aktiv (grün) / Läuft bald ab (gelb, <2 Tage) / Abgelaufen (rot)
- Aktionen pro Karte: Link kopieren, per E-Mail verschicken, verlängern, löschen
- Daten gespeichert in `localStorage`

### Link-Generierung
- Token = `btoa(JSON.stringify({ name, email, expires }))` — Base64-kodiert
- URL: `form.html?token=<base64>`
- Ablauf: 7 Werktage ab Erstellungsdatum (Wochenenden zählen nicht)

---

## Seite 2: Kunden-Formular (`form.html`)

### Funktion
- Token aus URL lesen, dekodieren, Ablaufdatum prüfen
- Wenn abgelaufen → "Link abgelaufen"-Seite zeigen
- Persönliche Begrüßung mit Kundenname + Countdown bis Ablauf
- Alle 12 Abschnitte auf einer Seite (scrollbar), Mehrfachauswahl überall

### 12 Abschnitte (alle Mehrfachauswahl-Chips + optionales Freitextfeld)
1. Website-Typ (Unternehmensseite, Portfolio, Online-Shop, Landing Page, Blog, Sonstiges)
2. Ziel & Zweck (Kunden gewinnen, Termine buchen, Produkte verkaufen, Marke aufbauen, Informieren)
3. Zielgruppe (B2B, B2C, Regional, National, International, Jung 18-35, 35-60, 60+)
4. Gewünschte Seiten (Startseite, Über uns, Leistungen, Portfolio, Kontakt, Blog, Shop, FAQ, Impressum, Login)
5. Design-Vorstellungen (Modern, Minimalistisch, Klassisch, Verspielt, Luxuriös, Technisch) + Freitext für Referenzen
6. Inhalte & Materialien (Logo vorhanden, Eigene Fotos, Eigene Texte, Alles muss erstellt werden)
7. Spezielle Funktionen (Kontaktformular, Newsletter, Online-Buchung, Mehrsprachigkeit, Chat, Login-Bereich, Kalender)
8. Budget (unter 500€, 500–1.500€, 1.500–5.000€, 5.000–10.000€, 10.000€+)
9. Wunsch-Termin (So schnell wie möglich, In 1 Monat, In 2–3 Monaten, In 6 Monaten, Kein festes Datum)
10. Mitbewerber & Referenzen — Freitextfeld
11. Domain & Hosting (Domain vorhanden, Hosting vorhanden, Beides nötig, Weiß ich nicht)
12. Sonstige Anmerkungen — Freitextfeld

### Absenden
- Formular-Daten als strukturiertes HTML-Dokument (PDF-Stil) zusammenstellen
- Via EmailJS an Joshua senden (HTML-E-Mail)
- Bestätigungsseite für den Kunden

---

## PDF / E-Mail-Dokument

- **Format:** HTML-E-Mail im PDF-Stil (weißer Hintergrund, Gradient-Header, Footer)
- **Header:** Kundenname, E-Mail, Formular-ID (#BRF-YYYY-XXXX), Datum & Uhrzeit
- **Body:** Alle 12 Abschnitte — ausgewählte Chips lila hervorgehoben, nicht ausgewählte grau
- **Footer:** Branding + Formular-Nummer
- Zusätzlich: Rohdaten als JSON im E-Mail-Body versteckt (für spätere Verarbeitung)

---

## Technik

- **Dateien:** `index.html`, `form.html`, `expired.html`, `style.css`, `app.js`, `form.js`
- **EmailJS:** Kostenloser Plan (200 Mails/Monat) — API-Key im JS
- **Kein Server nötig** — funktioniert als statische Dateien (lokal öffnen oder auf GitHub Pages / Netlify hosten)
- **localStorage** für Admin-Daten (Kunden-Liste)

---

## Dateistruktur

```
/
├── index.html       — Admin-Dashboard
├── form.html        — Kunden-Formular
├── expired.html     — Link abgelaufen
├── style.css        — Gemeinsame Styles (Gradient Glow)
├── admin.js         — Admin-Logik (Token-Generierung, CRUD)
└── form.js          — Formular-Logik (Token-Validierung, EmailJS)
```
