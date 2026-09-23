/* ============================================================
   SECTIONS.JS — Zentrale Definition der Formular-Abschnitte & Kategorien
   Nexvia Briefing Suite

   Wird von BEIDEN Seiten geladen:
   - index.html / admin.js → baut das modulare Kategoriensystem im Modal
   - form.html  / form.js  → steuert Anzeige, Nummerierung & Briefing-Generierung
   ============================================================ */

const FORM_CATEGORIES = [
  {
    id: 'web',
    title: 'Webseiten & Web Apps',
    icon: '🌐',
    description: 'Websites, Web-Applikationen, Shops, Funnels & Portale',
    sections: [
      {
        id: 'web_typ',
        title: 'Art des Webprojekts',
        subtitle: 'Was für ein digitales Produkt benötigen Sie? (Mehrfachauswahl möglich)',
        options: [
          'Unternehmensseite',
          'Web App / SaaS-Plattform',
          'Online-Shop (E-Commerce)',
          'Landing Page / Funnel',
          'Kundenportal / Dashboard',
          'Blog / Magazin',
          'Relaunch bestehende Website',
          'Sonstiges'
        ]
      },
      {
        id: 'web_ziel',
        title: 'Hauptziel & Kernaufgabe',
        subtitle: 'Was soll die Website / Web App primär erreichen?',
        options: [
          'Neukunden & Leads gewinnen',
          'Bestehende Prozesse digitalisieren',
          'Produkte / Abonnements verkaufen',
          'Markenauftritt & Vertrauen stärken',
          'Bewerber ansprechen (Recruiting)',
          'Bestandskunden betreuen / Self-Service'
        ]
      },
      {
        id: 'web_zielgruppe',
        title: 'Zielgruppe & Markt',
        subtitle: 'An wen richtet sich Ihr Angebot hauptsächlich?',
        options: [
          'B2B (Geschäftskunden / Unternehmen)',
          'B2C (Endverbraucher)',
          'Regional',
          'DACH-Raum (Deutschland, Österreich, Schweiz)',
          'International',
          'Gehobenes / Premium-Segment'
        ]
      },
      {
        id: 'web_seiten',
        title: 'Gewünschte Seiten & Bereiche',
        subtitle: 'Welche Seiten oder Modulbereiche werden benötigt?',
        options: [
          'Startseite',
          'Leistungsseiten',
          'Über uns / Philosophie',
          'Portfolio / Referenzen',
          'Kontakt & Terminbuchung',
          'Blog / News',
          'Online-Shop',
          'FAQ',
          'Login- / Mitgliederbereich',
          'Karriere / Jobs'
        ]
      },
      {
        id: 'web_design',
        title: 'Design & Markenidentität',
        subtitle: 'In welche visuelle Richtung soll das Design gehen?',
        options: [
          'Modern & Clean',
          'Dark Tech & High-End',
          'Minimalistisch & Zeitlos',
          'Seriös & Corporate',
          'Bunt, Lebendig & Kreativ',
          'Luxuriös & Elegant'
        ]
      },
      {
        id: 'web_funktionen',
        title: 'Spezielle Funktionen & Schnittstellen',
        subtitle: 'Welche interaktiven Funktionen sind erforderlich?',
        options: [
          'Interaktives Kontaktformular',
          'Online-Terminkalender / Buchung',
          'Kunden-Login / Rollensystem',
          'Online-Zahlung (Stripe/PayPal)',
          'Mehrsprachigkeit',
          'Interaktiver Preisrechner / Konfigurator',
          'CRM- / API-Anbindung',
          'Google Maps / Standortkarte'
        ]
      },
      {
        id: 'web_domain',
        title: 'Domain & Webhosting',
        subtitle: 'Wie ist der aktuelle Stand bzgl. Domain und Server?',
        options: [
          'Domain bereits vorhanden',
          'Hosting bereits vorhanden',
          'Nexvia soll Domain & Hosting einrichten',
          'Beratung gewünscht'
        ]
      }
    ]
  },
  {
    id: 'socialmedia',
    title: 'Social Media',
    icon: '📱',
    description: 'Strategie, Content Creation, Performance Ads & Management',
    sections: [
      {
        id: 'sm_plattformen',
        title: 'Relevante Plattformen',
        subtitle: 'Auf welchen Netzwerken möchten Sie aktiv sein oder wachsen?',
        options: [
          'Instagram',
          'LinkedIn',
          'TikTok',
          'YouTube',
          'Facebook',
          'X (Twitter)'
        ]
      },
      {
        id: 'sm_leistungen',
        title: 'Gewünschte Leistungen',
        subtitle: 'In welchen Bereichen suchen Sie Unterstützung?',
        options: [
          'Ganzheitliches Account-Management',
          'Content-Creation (Reels, Karussells, Posts)',
          'Performance Ads (Meta / LinkedIn)',
          'Strategie & Redaktionsplan',
          'Community-Management & DM-Betreuung'
        ]
      },
      {
        id: 'sm_ziele',
        title: 'Ziele des Social-Media-Auftritts',
        subtitle: 'Welcher Erfolg soll messbar erzielt werden?',
        options: [
          'Reichweite & Markenbekanntheit',
          'Organische Neukundengewinnung',
          'Employer Branding / Mitarbeitergewinnung',
          'Expertenstatus & Personal Brand aufbauen',
          'Community-Bindung stärken'
        ]
      },
      {
        id: 'sm_material',
        title: 'Vorhandenes Material & Brand Guidelines',
        subtitle: 'Welche Vorarbeiten und Medien existieren bereits?',
        options: [
          'Eigenes Foto- / Videomaterial vorhanden',
          'Corporate Design / CI vorhanden',
          'Vorlagen & Templates gewünscht',
          'Komplett bei 0 starten (Nexvia erstellt alles)'
        ]
      },
      {
        id: 'sm_frequenz',
        title: 'Geplante Posting-Frequenz',
        subtitle: 'Wie oft soll neuer Content veröffentlicht werden?',
        options: [
          '1–2 Beiträge pro Woche',
          '3–4 Beiträge pro Woche',
          'Täglicher Content (High-Volume)',
          'Kampagnen- / Event-basiert'
        ]
      }
    ]
  },
  {
    id: 'automation',
    title: 'Automatisierungen',
    icon: '⚙️',
    description: 'Workflows, Systemintegrationen, CRM- & E-Mail-Pipelines',
    sections: [
      {
        id: 'auto_bereiche',
        title: 'Einsatzbereiche der Automatisierung',
        subtitle: 'In welchen Unternehmensbereichen möchten Sie Zeit sparen?',
        options: [
          'Vertrieb & Lead-Management (CRM)',
          'E-Mail- & Posteingangs-Workflows',
          'Rechnungsstellung & vorbereitende Buchhaltung',
          'Kunden- & Mitarbeiter-Onboarding',
          'Kundensupport & Ticket-Routing',
          'Datensynchronisation zwischen Systemen'
        ]
      },
      {
        id: 'auto_tools',
        title: 'Bestehende Software & Tools',
        subtitle: 'Welche Tools sind bei Ihnen aktuell im Einsatz?',
        options: [
          'HubSpot / Salesforce / Pipedrive',
          'Google Workspace / Gmail',
          'Microsoft 365 / Outlook',
          'Sevdesk / Lexoffice',
          'Slack / Microsoft Teams',
          'Notion / Airtable',
          'Zapier / Make / n8n',
          'Stripe / Zahlungsanbieter',
          'Eigene API / Datenbank'
        ]
      },
      {
        id: 'auto_problem',
        title: 'Engpässe & manuelle Prozesse',
        subtitle: 'Wo verlieren Sie heute die meiste Zeit durch Routineaufgaben?',
        options: [],
        textOnly: true,
        placeholder: 'Beschreiben Sie kurz die zeitraubendsten manuellen Schritte (z.B. Daten von A nach B kopieren, Angebote nachfassen, Mails sortieren) …'
      },
      {
        id: 'auto_grad',
        title: 'Gewünschter Automatisierungsgrad',
        subtitle: 'Wie autonom sollen die Prozesse ablaufen?',
        options: [
          'Vollautomatisiert im Hintergrund (Zero-Touch)',
          'Teilautomatisiert mit menschlicher Freigabe (Human-in-the-Loop)',
          'Hybrides Modell je nach Sensibilität der Daten'
        ]
      }
    ]
  },
  {
    id: 'ai_agent',
    title: 'Individueller Lokaler KI Agent',
    icon: '🤖',
    description: 'DSGVO-konforme, lokale On-Premise KI-Assistenten & RAG',
    sections: [
      {
        id: 'agent_zweck',
        title: 'Haupteinsatzzweck des KI-Agenten',
        subtitle: 'Welche Hauptaufgabe soll der lokale Agent übernehmen?',
        options: [
          'Interner Mitarbeiter-Assistent für Unternehmenswissen',
          'Lokale Dokumentenanalyse & RAG (PDFs, Verträge, Handbücher)',
          'Automatisierte Recherche & Berichterstellung',
          'Intelligenter Kundenservice- / Support-Agent',
          'Automatisierte Daten- & Textverarbeitung'
        ]
      },
      {
        id: 'agent_datenschutz',
        title: 'Datenschutz & Hosting-Modell',
        subtitle: 'Welche Sicherheits- und Compliance-Vorgaben gelten?',
        options: [
          '100 % lokal ohne Internet (Air-Gapped / Maximale DSGVO)',
          'Lokaler On-Premise Server im Firmennetzwerk',
          'Hybride Cloud mit EU-Rechenzentrum & Verschlüsselung',
          'Vorhandene Firmenrichtlinien müssen eingehalten werden'
        ]
      },
      {
        id: 'agent_quellen',
        title: 'Anzuschließende Datenquellen',
        subtitle: 'Aus welchen Quellen soll der Agent Wissen beziehen?',
        options: [
          'Lokale Verzeichnisse (PDFs, Word, Excel, CSV)',
          'Interne SQL- / NoSQL-Datenbanken',
          'Intranet / Notion / Confluence / Wiki',
          'E-Mail-Postfächer / Ticketarchive',
          'CRM- / ERP-Systeme'
        ]
      },
      {
        id: 'agent_hardware',
        title: 'Vorhandene Hardware & Infrastruktur',
        subtitle: 'Auf welchen Systemen soll der Agent laufen?',
        options: [
          'Eigener Server mit dedizierter GPU vorhanden',
          'Bestehende Büro-Server / Workstations vorhanden',
          'Hardware-Empfehlung & Beschaffung durch Nexvia gewünscht',
          'Cloud-Testinstanz vorab gewünscht'
        ]
      },
      {
        id: 'agent_zugriff',
        title: 'Nutzerkreis & Berechtigungen',
        subtitle: 'Wer im Unternehmen soll Zugriff auf den KI-Agenten haben?',
        options: [
          'Nur Geschäftsführung / Führungskräfte',
          'Spezifisches Team / Fachabteilung (Vertrieb, Support, HR etc.)',
          'Gesamte Belegschaft',
          'Detailliertes Rollen- und Rechtekonzept erforderlich'
        ]
      }
    ]
  },
  {
    id: 'general',
    title: 'Projekt-Rahmenbedingungen',
    icon: '📋',
    description: 'Budget, Zeitplan, Vorlagen, Mitbewerber & Uploads',
    sections: [
      {
        id: 'inhalte_upload',
        title: 'Vorhandenes Material & Datei-Upload',
        subtitle: 'Welche Materialien liegen bereits vor? (Dateien können hochgeladen werden)',
        options: [
          'Logo vorhanden',
          'Eigene Fotos vorhanden',
          'Eigene Texte vorhanden',
          'Brand Guidelines / CI vorhanden',
          'Inhalte müssen komplett erstellt werden'
        ],
        hasUpload: true
      },
      {
        id: 'budget',
        title: 'Budget-Rahmen',
        subtitle: 'In welcher Größenordnung liegt das geplante Budget?',
        options: [
          'Unter 1.500 €',
          '1.500 – 3.000 €',
          '3.000 – 6.000 €',
          '6.000 – 12.000 €',
          'Über 12.000 €',
          'Individuell / Noch offen'
        ]
      },
      {
        id: 'timeline',
        title: 'Wunsch-Fertigstellung',
        subtitle: 'Wann soll das Projekt idealerweise live bzw. einsatzbereit sein?',
        options: [
          'So schnell wie möglich',
          'In 2–4 Wochen',
          'In 1–2 Monaten',
          'In 3–6 Monaten',
          'Flexibel / Kein fester Termin'
        ]
      },
      {
        id: 'konkurrenz',
        title: 'Mitbewerber & Referenzen',
        subtitle: 'Gibt es Mitbewerber, Vorbilder oder Webseiten/Systeme, die Ihnen gefallen?',
        options: [],
        textOnly: true,
        placeholder: 'Links oder Namen von Vorbildern, Best Practices oder Mitbewerbern …'
      },
      {
        id: 'anmerkungen',
        title: 'Sonstige Anmerkungen',
        subtitle: 'Gibt es noch etwas, das wir vorab wissen sollten?',
        options: [],
        textOnly: true,
        placeholder: 'Ihre Anmerkungen, spezielle Anforderungen oder Fragen …'
      }
    ]
  }
];

// Flache Liste für Kompatibilität mit allen bestehenden Lookups
const FORM_SECTIONS = [];
let _globalNum = 1;
FORM_CATEGORIES.forEach(cat => {
  cat.sections.forEach(s => {
    FORM_SECTIONS.push({
      ...s,
      num: _globalNum++,
      categoryId: cat.id,
      categoryTitle: cat.title,
      categoryIcon: cat.icon
    });
  });
});

const ALL_SECTION_IDS = FORM_SECTIONS.map(s => s.id);

// Mapping für ältere Formular-IDs
const LEGACY_SECTION_MAP = {
  typ: 'web_typ',
  ziel: 'web_ziel',
  zielgruppe: 'web_zielgruppe',
  seiten: 'web_seiten',
  design: 'web_design',
  inhalte: 'inhalte_upload',
  funktionen: 'web_funktionen',
  ki_erweiterung: 'auto_bereiche',
  socialmedia: 'sm_leistungen',
  deadline: 'timeline',
  domain: 'web_domain'
};
