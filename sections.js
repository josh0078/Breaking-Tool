/* ============================================================
   SECTIONS.JS — Zentrale Definition der Formular-Abschnitte

   Wird von BEIDEN Seiten geladen:
   - index.html / admin.js → baut daraus die Häkchenliste beim Anlegen
   - form.html  / form.js  → baut daraus das Briefing-Dokument

   Die Chips im Formular selbst stehen weiterhin direkt in form.html.
   Wenn du dort eine Option ergänzt, trag sie hier ebenfalls ein,
   sonst fehlt sie im Briefing-Dokument (genau der Bug vom 22.05.).
   ============================================================ */

const FORM_SECTIONS = [
  {
    id: 'typ', num: 1, title: 'Website-Typ',
    options: ['Unternehmensseite','Portfolio','Online-Shop','Landing Page','Blog','Visitenkarten-Seite','Sonstiges']
  },
  {
    id: 'ziel', num: 2, title: 'Ziel & Zweck',
    options: ['Neue Kunden gewinnen','Termine buchen','Produkte verkaufen','Marke aufbauen','Informieren / Aufklären','Bewerber ansprechen','Bestandskunden betreuen']
  },
  {
    id: 'zielgruppe', num: 3, title: 'Zielgruppe',
    options: ['Geschäftskunden (B2B)','Privatkunden (B2C)','Regional','National (Deutschland)','International','18–35 Jahre','35–60 Jahre','60+ Jahre']
  },
  {
    id: 'seiten', num: 4, title: 'Gewünschte Seiten',
    options: ['Startseite','Über uns','Leistungen','Portfolio / Referenzen','Kontakt','Blog','Online-Shop','FAQ','Impressum & Datenschutz','Login-Bereich','Karriere / Jobs']
  },
  {
    id: 'design', num: 5, title: 'Design-Vorstellungen',
    options: ['Modern & Clean','Minimalistisch','Klassisch & Seriös','Verspielt & Kreativ','Luxuriös & Premium','Technisch & Digital','Natürlich & Organisch','Bold & Auffällig']
  },
  {
    id: 'inhalte', num: 6, title: 'Inhalte & Materialien',
    options: ['Logo vorhanden','Eigene Fotos vorhanden','Eigene Texte vorhanden','Logo muss erstellt werden','Fotos müssen gemacht werden','Texte müssen geschrieben werden','Alles muss erstellt werden'],
    note: 'Enthält den Datei-Upload'
  },
  {
    id: 'funktionen', num: 7, title: 'Spezielle Funktionen',
    options: ['Kontaktformular','Newsletter-Anmeldung','Online-Buchung / Kalender','Mehrsprachigkeit','Live-Chat','Login-Bereich','Zahlungssystem','Social Media Integration','Google Maps','Galerie / Slider']
  },
  {
    id: 'ki_erweiterung', num: 8, title: 'KI & Automatisierung',
    options: ['Instagram Bot','Website-Chatbot','Beides (Instagram Bot + Chatbot)','E-Mail Automatisierung','Social Media Automatisierung','Rechnungs-Automatisierung','Komplexere Vorgänge auf Wunsch','Nein, nicht gewünscht']
  },
  {
    id: 'socialmedia', num: 9, title: 'Social Media',
    options: ['Social Media Management','Kurs / Coaching','Beides','Nein, nicht gewünscht'],
    note: 'Enthält zusätzlich die Plattform-Auswahl'
  },
  {
    id: 'budget', num: 10, title: 'Budget-Rahmen',
    options: ['Unter 500 €','500 – 1.500 €','1.500 – 5.000 €','5.000 – 10.000 €','Über 10.000 €','Noch unklar']
  },
  {
    id: 'deadline', num: 11, title: 'Wunsch-Termin',
    options: ['So schnell wie möglich','In 1 Monat','In 2–3 Monaten','In 6 Monaten','Kein festes Datum']
  },
  {
    id: 'konkurrenz', num: 12, title: 'Mitbewerber & Referenzen',
    options: [], textOnly: true
  },
  {
    id: 'domain', num: 13, title: 'Domain & Hosting',
    options: ['Domain bereits vorhanden','Hosting bereits vorhanden','Domain wird benötigt','Hosting wird benötigt','Beides wird benötigt','Weiß ich noch nicht']
  },
  {
    id: 'anmerkungen', num: 14, title: 'Sonstige Anmerkungen',
    options: [], textOnly: true
  }
];

/* Alle Abschnitts-IDs — der Standard, wenn ein Kunde keine
   eigene Konfiguration hat (z.B. alle vor diesem Feature angelegten). */
const ALL_SECTION_IDS = FORM_SECTIONS.map(s => s.id);
