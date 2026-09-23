/**
 * ============================================================================
 * BRIEFING-AI.JS — Nexvia KI-Berater („Alex“)
 * ============================================================================
 * 100% lokaler, DSGVO-konformer KI-Strategie- & Briefing-Berater für Kunden.
 * - Berät zu allen Nexvia-Leistungsbereichen (Security Agent, KI-Agenten, Automatisierung, Web, Social)
 * - Beantwortet Fragen nach dem konkreten Nutzen („Was bringt mir ein Security Agent?“, „Warum RAG?“)
 * - Erkennt Fragennummern (z.B. „Frage 4“, „4“, „#3: Was bedeutet RAG?“)
 * - Ordnet Fragen dynamisch der tatsächlichen Kundenansicht zu
 * - Bietet direkte „Im Formular auswählen“-Aktionen für maximale Conversion
 * ============================================================================
 */

(function() {
  'use strict';

  // ── 1. Sektoren- & Lösungs-Wissen (Beratung: „Was bringt mir X?“) ─────────────
  const SECTOR_CONSULTING = [
    {
      id: 'security_agent',
      keywords: ['securit', 'sicherheits', 'sicherheit', 'cyber', 'angriff', 'hacker', 'compliance', 'wächter', 'it-schutz'],
      title: '🛡️ Was bringt Ihnen ein lokaler Sicherheits-Agent?',
      answerHtml: `
        <strong>Ein lokaler Sicherheits-Agent ist der 24/7-Wächter für Ihre gesamte Firmen-IT.</strong><br><br>
        <strong>1. Das Problem in den meisten Betrieben:</strong><br>
        Cyber-Angriffe, Ransomware und unberechtigte Datenabflüsse treffen heute überwiegend kleine und mittelständische Unternehmen. Häufig wird ein Sicherheitsvorfall erst bemerkt, wenn Daten bereits verschlüsselt oder sensible Kundendaten im Netz gelandet sind.<br><br>
        <strong>2. Die 3 messbaren Kernvorteile:</strong>
        <ul style="margin:6px 0 10px 18px;padding:0;line-height:1.6;">
          <li><strong>Echtzeit-Überwachung (24/7):</strong> Analysiert Server-Logs, Netzwerkverkehr und Login-Aktivitäten rund um die Uhr. Verdächtige Verhaltensmuster werden in Millisekunden aufgespürt.</li>
          <li><strong>100% DSGVO & Compliance-Schutz:</strong> Erkennt unberechtigte Datenzugriffe sofort und protokolliert Vorfälle revisionssicher für Datenschutzbehörden und Wirtschaftsprüfer.</li>
          <li><strong>Automatisierte Sofort-Abwehr:</strong> Blockiert kompromittierte Konten oder verdächtige IP-Adressen sofort und alarmiert die Geschäftsleitung per Push-Benachrichtigung, bevor ein echter Schaden entsteht.</li>
        </ul>
        💡 <strong>Praxis-Beispiel:</strong> Ein Mitarbeiter klickt abends versehentlich auf einen Phishing-Link oder ein Account versucht nachts, 500 Kundenakten herunterzuladen -> Der Sicherheits-Agent kappt die Verbindung sofort und schlägt Alarm!
      `,
      formTarget: {
        sectionId: 'agent_zweck',
        optionName: 'Sicherheits-Agent (IT-Security, Compliance & Systemüberwachung)'
      },
      pills: [
        { text: '„Sicherheits-Agent“ im Formular auswählen', action: (apply) => apply('agent_zweck', 'Sicherheits-Agent (IT-Security, Compliance & Systemüberwachung)') },
        { text: 'Brauche ich dafür teure Hardware?', action: (ask) => ask('hardware') },
        { text: 'Was bringt ein lokaler KI-Wissensagent?', action: (ask) => ask('was bringt ein lokaler ki agent') }
      ]
    },
    {
      id: 'local_ai_rag',
      keywords: ['rag', 'lokal', 'ki-agent', 'ki agent', 'firmengedächtnis', 'mitarbeiter-assistent', 'mitarbeiter assistent', 'dokumentenanalyse', 'chatgpt'],
      title: '🤖 Was bringt ein Lokaler KI-Agent & RAG (Firmengedächtnis)?',
      answerHtml: `
        <strong>Ein lokaler KI-Agent ist das private, digitale Wissenszentrum Ihres Unternehmens.</strong><br><br>
        <strong>1. Warum nicht einfach normales ChatGPT?</strong><br>
        Wenn Mitarbeiter interne Angebote, Kundenverträge, Source Code oder Finanzdaten in ChatGPT eingeben, fließen diese Daten in US-Clouds. Das verletzt die DSGVO und gefährdet Betriebsgeheimnisse. Zudem neigt ChatGPT zu Halluzinationen.<br><br>
        <strong>2. Was der lokale Nexvia-Agent für Sie leistet:</strong>
        <ul style="margin:6px 0 10px 18px;padding:0;line-height:1.6;">
          <li><strong>Verbindet Ihr echtes Firmenwissen:</strong> Durchsucht Tausende PDFs, Handbücher, Verträge und Notizen und liefert präzise Antworten inklusive Quellenseite in unter 2 Sekunden.</li>
          <li><strong>Spart bis zu 1,8 Arbeitsstunden/Tag pro Mitarbeiter:</strong> Niemand muss mehr stundenlang nach alten Dokumenten, Preisen oder Richtlinien suchen.</li>
          <li><strong>Turbo-Einarbeitung (Onboarding):</strong> Neue Mitarbeiter können sofort selbstständig arbeiten und müssen Senior-Kollegen nicht permanent mit Routinefragen unterbrechen.</li>
          <li><strong>100% datenschutzsicher:</strong> Läuft wahlweise komplett On-Premise in Ihren Räumen (Air-Gapped) – kein Byte verlässt Ihr Haus!</li>
        </ul>
      `,
      formTarget: {
        sectionId: 'agent_zweck',
        optionName: 'Lokale Dokumentenanalyse & RAG (PDFs, Verträge, Handbücher)'
      },
      pills: [
        { text: '„RAG & Dokumentenanalyse“ auswählen', action: (apply) => apply('agent_zweck', 'Lokale Dokumentenanalyse & RAG (PDFs, Verträge, Handbücher)') },
        { text: '„Mitarbeiter-Assistent“ auswählen', action: (apply) => apply('agent_zweck', 'Interner Mitarbeiter-Assistent für Unternehmenswissen') },
        { text: 'Was bringt mir ein Sicherheits-Agent?', action: (ask) => ask('was bringt ein security agent') }
      ]
    },
    {
      id: 'automation',
      keywords: ['automati', 'workflow', 'prozess', 'schnittstelle', 'make', 'zapier', 'n8n', 'zeitfresser', 'papierkram', 'excel'],
      title: '⚙️ Was bringt Workflow-Automatisierung für Ihr Unternehmen?',
      answerHtml: `
        <strong>Automatisierung ersetzt manuelle Büro-Routinen durch intelligente Software-Pipelines.</strong><br><br>
        <strong>1. Wo heute die meiste Arbeitszeit verloren geht:</strong><br>
        Kundendaten aus E-Mails manuell ins CRM abtippen, Rechnungen händisch anlegen, Zahlungseingänge abgleichen oder Excel-Listen pflegen. Das kostet pro Woche viele Stunden und birgt ständige Fehlerquellen.<br><br>
        <strong>2. Die messbaren Resultate:</strong>
        <ul style="margin:6px 0 10px 18px;padding:0;line-height:1.6;">
          <li><strong>5 bis 15 Stunden Zeitersparnis pro Mitarbeiter und Woche:</strong> Ihr Team gewinnt wertvolle Zeit für Kundenberatung, Vertrieb und Kernaufgaben.</li>
          <li><strong>Reaktionszeit unter 2 Sekunden:</strong> Neue Anfragen werden sofort erfasst, automatisch vorqualifiziert und bestätigt.</li>
          <li><strong>0% Fehlerquote:</strong> Keine Zahlendreher mehr in Rechnungen, keine vergessenen Termine und kein Informationsverlust zwischen Programmen.</li>
        </ul>
        💡 <strong>Praxis-Beispiel:</strong> Ein Kunde bucht auf Ihrer Website einen Termin -> Nexvia-Automation trägt den Termin in den Kalender ein, legt den Kunden im CRM an, generiert einen Projektordner und sendet dem Kunden eine WhatsApp-Bestätigung mit Vorab-Infos – vollautomatisch in 3 Sekunden!
      `,
      formTarget: {
        sectionId: 'auto_grad',
        optionName: 'Vollautomatisiert im Hintergrund (Zero-Touch)'
      },
      pills: [
        { text: '„Zero-Touch“ im Formular auswählen', action: (apply) => apply('auto_grad', 'Vollautomatisiert im Hintergrund (Zero-Touch)') },
        { text: '„Vertrieb & CRM“ auswählen', action: (apply) => apply('auto_bereiche', 'Vertrieb & Lead-Management (CRM)') },
        { text: 'Was ist Human-in-the-Loop?', action: (ask) => ask('human in the loop') }
      ]
    },
    {
      id: 'website_webapp',
      keywords: ['webseite', 'website', 'web-app', 'web app', 'homepage', 'landingpage', 'online-shop', 'relaunch'],
      title: '🌐 Was bringt eine High-End-Webseite oder Web-App von Nexvia?',
      answerHtml: `
        <strong>Aus einer passiven „digitalen Visitenkarte“ wird ein 24/7-Neukundengewinner.</strong><br><br>
        <strong>1. Das Problem herkömmlicher Websites & Baukästen:</strong><br>
        Besucher springen auf dem Smartphone nach wenigen Sekunden ab, wenn die Seite langsam lädt oder nicht sofort überzeugt. Viele Betriebe verlieren dadurch jeden Monat unbemerkt lukrative Aufträge an Mitbewerber.<br><br>
        <strong>2. Was Nexvia auszeichnet:</strong>
        <ul style="margin:6px 0 10px 18px;padding:0;line-height:1.6;">
          <li><strong>Verkaufspsychologischer Aufbau:</strong> Strukturierte Nutzerführung, die Vertrauen aufbaut und Besucher gezielt zu qualifizierten Kundenanfragen konvertiert.</li>
          <li><strong>Ladezeiten unter 1 Sekunde:</strong> High-Speed Hosting in Deutschland für Top-Google-Rankings und flüssige mobile Bedienung.</li>
          <li><strong>Web Apps digitalisieren Geschäftsprozesse:</strong> Kunden können eigene Portale nutzen, Angebote berechnen, Dokumente einsehen oder online bezahlen.</li>
        </ul>
      `,
      formTarget: {
        sectionId: 'web_ziel',
        optionName: 'Qualifizierte Kundenanfragen generieren (Leads)'
      },
      pills: [
        { text: '„Kundenanfragen (Leads)“ auswählen', action: (apply) => apply('web_ziel', 'Qualifizierte Kundenanfragen generieren (Leads)') },
        { text: '„Online-Terminkalender“ auswählen', action: (apply) => apply('web_funktionen', 'Online-Terminkalender / Buchung') },
        { text: 'Was bringt Social Media?', action: (ask) => ask('social media') }
      ]
    },
    {
      id: 'social_media',
      keywords: ['social media', 'social-media', 'instagram', 'linkedin', 'tiktok', 'performance ads', 'ads', 'werbung', 'mitarbeitergewinnung', 'recruiting'],
      title: '📱 Was bringt aktives Social Media Management & Performance Ads?',
      answerHtml: `
        <strong>Social Media ist heute der stärkste Kanal für Markenbekanntheit und Mitarbeitergewinnung.</strong><br><br>
        <strong>1. Warum auch B2B- & Handwerksbetriebe aktiv sein müssen:</strong><br>
        Kunden und Fachkräfte googeln Firmen nicht mehr nur – sie prüfen Instagram und LinkedIn. Ein verlassenes oder unprofessionelles Profil schreckt Bewerber und Neukunden ab. Wer modern auftritt, gewinnt das Vertrauen.<br><br>
        <strong>2. Die 3 großen Hebel:</strong>
        <ul style="margin:6px 0 10px 18px;padding:0;line-height:1.6;">
          <li><strong>Fachkräfte gewinnen (Employer Branding):</strong> Zeigt authentische Einblicke und begeistert Bewerber, die gar nicht aktiv auf Jobportalen suchen.</li>
          <li><strong>Planbare Neukunden durch Performance Ads:</strong> Gezielte Werbeanzeigen auf Meta & LinkedIn werden millimetergenau nur an Ihre Wunschkunden in der Region ausgespielt.</li>
          <li><strong>Rundum-Sorglos-Betreuung:</strong> Nexvia übernimmt Strategie, Grafiken, Schnitt, Texting und Veröffentlichung schlüsselfertig.</li>
        </ul>
      `,
      formTarget: {
        sectionId: 'sm_ziele',
        optionName: 'Employer Branding / Mitarbeitergewinnung'
      },
      pills: [
        { text: '„Mitarbeitergewinnung“ auswählen', action: (apply) => apply('sm_ziele', 'Employer Branding / Mitarbeitergewinnung') },
        { text: '„Performance Ads“ auswählen', action: (apply) => apply('sm_leistungen', 'Performance Ads (Meta / LinkedIn)') },
        { text: 'Was bringt Automatisierung?', action: (ask) => ask('automatisierung') }
      ]
    }
  ];

  // ── 2. Lokale Wissensbasis aller 31 Fragen des Baukastens ─────────────────────
  const QUESTION_KNOWLEDGE = {
    // 🌐 Webseiten & Web Apps
    web_typ: {
      shortExplain: 'Hier wählen Sie die Art Ihres Webprojekts aus.',
      detail: 'Eine <strong>Unternehmensseite</strong> dient der Präsentation Ihres Betriebs und der Kundengewinnung. Eine <strong>Web App / SaaS</strong> bietet individuelle Logins, Dashboards und Software-Funktionen im Browser. Ein <strong>Online-Shop</strong> verkauft Produkte direkt mit Warenkorb & Zahlung.',
      tips: 'Wenn Sie primär neue Anfragen über Google und Empfehlungen gewinnen wollen, ist „Unternehmensseite“ oder „Landingpage“ ideal. Wenn Kunden sich einloggen und Daten verwalten sollen, wählen Sie „Web App / Portal“.',
      quickPills: ['Unterschied Website vs. Web App?', 'Was ist ein Funnel?', 'Empfehlung für mich']
    },
    web_ziel: {
      shortExplain: 'Was ist das wichtigste wirtschaftliche Ziel Ihres Webauftritts?',
      detail: 'Möchten Sie vor allem <strong>qualifizierte Kundenanfragen (Leads)</strong> generieren, Mitarbeiter gewinnen (<strong>Recruiting</strong>) oder Prozesse automatisieren? Ihr Hauptziel bestimmt den gesamten Aufbau und die Handlungsaufforderungen (Calls-to-Action) der Seite.',
      tips: 'Tipp: Wählen Sie die 2–3 wichtigsten Prioritäten aus, damit wir das Design exakt auf diese Ergebnisse ausrichten können.',
      quickPills: ['Was bringt am meisten Umsatz?', 'Wie funktioniert Recruiting online?']
    },
    web_zielgruppe: {
      shortExplain: 'An wen richtet sich Ihr Angebot hauptsächlich?',
      detail: '<strong>B2B</strong> richtet sich an Geschäftskunden und Firmen (sachlich, professionell, Fokus auf ROI und Zuverlässigkeit). <strong>B2C</strong> richtet sich an Endverbraucher (emotional, direkte Ansprache, einfache Kaufanreize). <strong>Regional</strong> fokussiert das Einzugsgebiet vor Ort.',
      tips: 'Hier ist auch Mehrfachauswahl möglich, z.B. B2B + Regional.',
      quickPills: ['Unterschied B2B vs. B2C?', 'Wie spreche ich Premium-Kunden an?']
    },
    web_seiten: {
      shortExplain: 'Welche Unterseiten und Inhaltsbereiche werden benötigt?',
      detail: 'Eine Standard-Webseite besteht typischerweise aus <strong>Startseite, Leistungsseiten, Über uns und Kontakt</strong>. Spezifischere Bereiche wie <strong>Portfolio/Referenzen, Online-Shop, Blog oder Karriere</strong> können beliebig ergänzt werden.',
      tips: 'Keine Sorge: Falls Sie noch nicht sicher sind, welche Seiten nötig sind, schlägt Nexvia im Konzept die optimale Struktur vor.',
      quickPills: ['Brauche ich einen Blog?', 'Reicht eine One-Page-Seite?']
    },
    web_design: {
      shortExplain: 'Welchen optischen Eindruck soll Ihr Webauftritt vermitteln?',
      detail: '<strong>Modern & Clean:</strong> Helles, aufgeräumtes Design mit viel Weißraum. <strong>Dark Tech & High-End:</strong> Dunkle, futuristische Ästhetik mit dezentem Leuchten (wie das Nexvia-Design). <strong>Seriös & Corporate:</strong> Klassisch-solide für Kanzleien, Finanzen oder Industrie. <strong>Luxuriös:</strong> Edle Typografie und minimalistische Eleganz.',
      tips: 'Haben Sie bereits ein Logo oder Firmenfarben? Wir passen das gewählte Konzept nahtlos an Ihre Corporate Identity an.',
      quickPills: ['Was passt zu meiner Branche?', 'Kann ich Farben vorgeben?']
    },
    web_funktionen: {
      shortExplain: 'Welche technischen Zusatzfunktionen soll Ihre Website bieten?',
      detail: 'Hier geht es um interaktive Elemente wie <strong>Online-Terminkalender</strong> (Kunden buchen direkt freie Termine), <strong>Online-Zahlung</strong> (Stripe, PayPal), <strong>Preisrechner</strong> oder Schnittstellen zu Ihrem <strong>CRM-System</strong>.',
      tips: 'Ein integrierter Online-Terminkalender spart enorm viel Telefonier- und E-Mail-Aufwand bei der Terminabsprache!',
      quickPills: ['Wie funktioniert Terminbuchung?', 'Was ist eine API-Anbindung?']
    },
    web_domain: {
      shortExplain: 'Haben Sie bereits eine Domain (Webadresse) und Webhosting?',
      detail: 'Wenn Sie bereits eine Domain (z.B. <em>ihrefirma.de</em>) besitzen, können wir diese einfach übernehmen. Falls nicht, kümmert sich Nexvia um die komplette Registrierung und das High-Speed-Hosting auf deutschen Servern (ISO 27001 zertifiziert, 100% DSGVO-konform).',
      tips: 'Kreuzen Sie einfach „Nexvia soll Domain & Hosting einrichten“ oder „Beratung gewünscht“ an, wenn Sie sich um nichts Technisches kümmern möchten.',
      quickPills: ['Wo liegen die Server?', 'Kostet Domain extra?']
    },

    // 📱 Social Media
    sm_branche: {
      shortExplain: 'In welcher Branche oder Nische ist Ihr Unternehmen tätig?',
      detail: 'Die Branche bestimmt die optimale Social-Media-Strategie: Im <strong>B2B & Handwerk</strong> funktioniert LinkedIn und Vorher-Nachher-Content auf Instagram exzellent. In <strong>Gastro, Beauty & Lifestyle</strong> stehen Reels und emotionale Bildwelten im Vordergrund.',
      tips: 'Falls Ihre Nische sehr speziell ist, können Sie sie einfach unten in das Notizfeld schreiben.',
      quickPills: ['Welche Branche läuft am besten?', 'B2B auf Social Media?']
    },
    sm_plattformen: {
      shortExplain: 'Auf welchen sozialen Plattformen möchten Sie präsent sein?',
      detail: '<strong>Instagram:</strong> Ideal für Sichtbarkeit, Vertrauen, Reels & Storys. <strong>LinkedIn:</strong> Die stärkste B2B- & Recruiting-Plattform. <strong>TikTok:</strong> Schnelle organische Reichweite. <strong>YouTube:</strong> Tiefgehendes Expertenwissen und langlebiger Video-Content.',
      tips: 'Lieber 1–2 Plattformen professionell bespielen als 5 Plattformen nur halbherzig. Für die meisten Unternehmen ist Instagram + LinkedIn die perfekte Kombination.',
      quickPills: ['Lohnt sich TikTok für mich?', 'Instagram oder LinkedIn?']
    },
    sm_leistungen: {
      shortExplain: 'In welchen Bereichen der Social-Media-Betreuung suchen Sie Hilfe?',
      detail: '<strong>Account-Management:</strong> Nexvia übernimmt den Kanal komplett. <strong>Content-Creation:</strong> Wir produzieren fertige Grafiken, Reels und Karussells. <strong>Performance Ads:</strong> Bezahlte Werbeanzeigen zur planbaren Lead-Gewinnung.',
      tips: 'Content-Creation + Ads ist die effektivste Kombination für schnelles Neukundenwachstum.',
      quickPills: ['Was sind Performance Ads?', 'Was bedeutet Vollbetreuung?']
    },
    sm_ziele: {
      shortExplain: 'Was möchten Sie mit Ihrem Social-Media-Auftritt primär erreichen?',
      detail: 'Möchten Sie direkte <strong>Neukunden gewinnen</strong>, Ihre <strong>Markenbekanntheit</strong> steigern oder offene Stellen besetzen (<strong>Employer Branding</strong>)? Ihr Ziel bestimmt, welche Art von Content wir produzieren.',
      tips: 'Mitarbeitergewinnung über Social Media erzielt aktuell oft deutlich bessere Bewerber als klassische Stellenportale.',
      quickPills: ['Wie gewinnt man Kunden per Social Media?', 'Mitarbeiter über Social Media finden']
    },
    sm_material: {
      shortExplain: 'Welche Bild-, Video- und Markenmaterialien existieren bereits?',
      detail: 'Haben Sie bereits professionelle Fotos, Videos oder ein Corporate Design? Wenn ja, binden wir diese nahtlos ein. Wenn Sie bei <strong>0 starten</strong>, erstellt Nexvia Vorlagen, Grafiken und das gesamte Branding.',
      tips: 'Sie können vorhandene Dateien später bei den Rahmenbedingungen direkt im Formular hochladen.',
      quickPills: ['Brauche ich eigene Fotos?', 'Was wenn ich kein Logo habe?']
    },
    sm_frequenz: {
      shortExplain: 'Wie viele Beiträge sollen wöchentlich veröffentlicht werden?',
      detail: '<strong>1–2 Beiträge/Woche</strong> sichert eine solide Grundpräsenz. <strong>3–4 Beiträge/Woche</strong> ist der bewährte Standard für stetigen Algorithmus-Aufbau und Follower-Zuwachs. <strong>Täglich</strong> empfiehlt sich für schnelles Wachstum in umkämpften Märkten.',
      tips: 'Kontinuität ist wichtiger als Masse. 3 hochwertige Beiträge pro Woche schlagen 7 minderwertige.',
      quickPills: ['Welche Frequenz bringt am meisten?', 'Reicht 1x pro Woche?']
    },

    // ⚙️ Automatisierungen
    auto_bereiche: {
      shortExplain: 'In welchen Bereichen möchten Sie manuelle Routinearbeiten stoppen?',
      detail: 'Typische Automations-Bereiche sind: <strong>Vertrieb & CRM</strong> (neue Anfragen automatisch erfassen & nachfassen), <strong>E-Mail-Postfach</strong> (Mails vorsortieren & beantworten), <strong>Rechnungen</strong> (aus Aufträgen automatisch Rechnungen erzeugen) oder <strong>Datensynchronisation</strong> (Tools ohne manuelle Doppeleingabe verbinden).',
      tips: 'Wo verbringen Sie oder Ihre Mitarbeiter heute wöchentlich die meiste Zeit mit Copy-Paste oder manuellen Schritten?',
      quickPills: ['Typische Beispiele für Automation', 'Wie viel Zeit spart das?']
    },
    auto_plattformen: {
      shortExplain: 'Welche Büro- & Kommunikationsplattformen nutzen Sie täglich?',
      detail: 'Arbeiten Sie primär mit <strong>Microsoft 365</strong> (Outlook, Teams, SharePoint) oder <strong>Google Workspace</strong> (Gmail, Drive)? Nutzen Sie <strong>Slack</strong> oder <strong>WhatsApp Business</strong>? Nexvia verbindet Automatisierungen direkt mit Ihren gewohnten Programmen.',
      tips: 'Mehrfachauswahl ist ausdrücklich erwünscht!',
      quickPills: ['Geht WhatsApp Business automatisch?', 'MS 365 vs Google Workspace']
    },
    auto_tools: {
      shortExplain: 'Welche Fach- und Softwareprogramme sind aktuell im Einsatz?',
      detail: 'Geben Sie an, welche Tools Sie nutzen (z.B. <strong>HubSpot, Salesforce, Pipedrive</strong> als CRM, <strong>Sevdesk, Lexoffice, Datev</strong> für Buchhaltung, <strong>Shopify, WooCommerce</strong> für E-Commerce). Wir prüfen die Schnittstellenkompatibilität.',
      tips: 'Fast alle modernen Cloud-Tools verfügen über offene REST-APIs, über die wir Daten vollautomatisch austauschen können.',
      quickPills: ['Kann Datev angebunden werden?', 'Was wenn mein Tool nicht gelistet ist?']
    },
    auto_engine: {
      shortExplain: 'Haben Sie bereits Automatisierungs-Software im Einsatz oder Vorlieben?',
      detail: '<strong>Make (Integromat)</strong> ist extrem visuell, flexibel und kostengünstig. <strong>n8n</strong> ist Open-Source und kann 100% lokal gehostet werden (DSGVO-Champion). <strong>Zapier</strong> ist weit verbreitet. <strong>Power Automate</strong> ist ideal bei reiner Microsoft-Umgebung.',
      tips: 'Wenn Sie unsicher sind: Wählen Sie „Noch keine / Empfehlung durch Nexvia gewünscht“ – wir wählen die wirtschaftlichste Lösung für Sie aus.',
      quickPills: ['Make vs. Zapier?', 'Was ist n8n?']
    },
    auto_problem: {
      shortExplain: 'Hier können Sie in eigenen Worten Ihre größten Zeitfresser beschreiben.',
      detail: 'Beschreiben Sie z.B.: <em>„Wir müssen Kundendaten aus E-Mails manuell in unsere Software abtippen“</em> oder <em>„Angebote werden oft erst nach 3 Tagen verschickt, weil Zeit fehlt“</em>. Anhand Ihrer Beschreibung entwickeln wir maßgeschneiderte Automations-Szenarien.',
      tips: 'Je konkreter Ihr Alltagsbeispiel, desto präziser können wir das Sparpotenzial berechnen.',
      quickPills: ['Beispiel-Beschreibung ansehen']
    },
    auto_grad: {
      shortExplain: 'Wie autonom sollen die Automatisierungen ablaufen?',
      detail: '<strong>Zero-Touch (vollautomatisch):</strong> Der Prozess läuft komplett im Hintergrund ohne menschliches Zutun ab.<br><strong>Human-in-the-Loop (mit Freigabe):</strong> Das System bereitet alles vor (z.B. fertiger E-Mail-Entwurf oder fertige Rechnung), aber ein Mensch klickt einmal auf „Bestätigen“, bevor die Aktion ausgelöst wird.',
      tips: 'Für kritische Schritte (z.B. Verträge oder Auszahlungen) empfiehlt sich meist „Human-in-the-Loop“. Für Standard-Routinen „Zero-Touch“.',
      quickPills: ['Was bedeutet Zero-Touch?', 'Was ist Human-in-the-Loop?']
    },

    // 🤖 Individueller Lokaler KI-Agent
    agent_zweck: {
      shortExplain: 'Welche Kernaufgabe soll der lokale KI-Assistent für Sie übernehmen?',
      detail: '<strong>Mitarbeiter-Assistent:</strong> Kennt Ihr gesamtes Firmenwissen und beantwortet Mitarbeiterfragen in Sekunden.<br><strong>Dokumentenanalyse & RAG:</strong> Durchsucht Tausende PDFs, Verträge und Handbücher und zitiert Fundstellen.<br><strong>Sicherheits-Agent:</strong> Überwacht Logfiles, prüft Richtlinien (Compliance) und schlägt bei Anomalien Alarm.<br><strong>Kundenservice:</strong> Beantwortet wiederkehrende Kundenanfragen 24/7.',
      tips: 'Ein lokaler KI-Agent spart enorm viel Einarbeitungszeit bei neuen Mitarbeitern und macht internes Expertenwissen sofort für alle abrufbar.',
      quickPills: ['Was ist RAG?', 'Was macht ein Sicherheits-Agent?', 'Wie schützt das meine Daten?']
    },
    agent_plattformen: {
      shortExplain: 'Auf welchen Betriebssystemen arbeiten Ihre Mitarbeiter und Server?',
      detail: 'Läuft Ihre IT auf <strong>Windows 10/11</strong>, <strong>macOS</strong> (Macs), <strong>Linux-Servern</strong> (Ubuntu, Debian) oder virtualisiert über <strong>Docker / Proxmox</strong>? Nexvia stellt sicher, dass der Agent perfekt mit Ihrer Hardware harmoniert.',
      tips: 'Auch bei gemischten Umgebungen (z.B. Chef hat Mac, Büro hat Windows, Server läuft auf Linux) funktioniert der Zugriff nahtlos über den Web-Browser.',
      quickPills: ['Geht Mac und Windows gemischt?', 'Brauche ich Linux?']
    },
    agent_speicher: {
      shortExplain: 'Wo liegen die Dokumente und Daten, auf die der Agent zugreifen soll?',
      detail: 'Liegen Ihre Daten auf einem <strong>Netzwerkspeicher / NAS</strong> (Synology, QNAP), in <strong>SharePoint / OneDrive</strong>, auf <strong>Google Drive</strong>, in einer <strong>Nextcloud</strong> oder in internen Datenbanken? Der Agent bindet diese Ordner als Wissensquelle an.',
      tips: 'Ihre Originaldateien bleiben unberührt. Der Agent liest die Inhalte nur ein und baut einen durchsuchbaren Wissens-Index (Vektordatenbank) auf.',
      quickPills: ['Kann der Agent Synology NAS lesen?', 'Werden meine Dateien verändert?']
    },
    agent_interface: {
      shortExplain: 'Über welche Benutzeroberfläche sollen Ihre Mitarbeiter mit der KI sprechen?',
      detail: '<strong>Web-Oberfläche im Browser:</strong> Sieht aus und bedient sich wie ChatGPT, läuft aber zu 100% auf Ihrem eigenen Server.<br><strong>MS Teams / Slack:</strong> Mitarbeiter chatten direkt in ihren gewohnten Teams- oder Slack-Kanälen mit dem Bot.<br><strong>Desktop-App:</strong> Eigenes Programm für Mac & Windows.',
      tips: 'Die Web-Oberfläche im Browser ist die beliebteste und schnellste Variante, da keine Software auf den Arbeitsplätzen installiert werden muss.',
      quickPills: ['Sieht das aus wie ChatGPT?', 'Geht das in Microsoft Teams?']
    },
    agent_datenschutz: {
      shortExplain: 'Welche Sicherheits- und Hosting-Anforderungen haben Sie?',
      detail: '<strong>100% lokal / On-Premise (Air-Gapped):</strong> Die KI läuft physisch in Ihren eigenen Geschäftsräumen. Kein einziges Datenpaket verlässt Ihr Netzwerk.<br><strong>On-Premise Server:</strong> Lokaler Server mit Netzwerkfreigabe.<br><strong>EU-Cloud:</strong> Gehostet in deutschen/europäischen ISO-27001 Rechenzentren mit strikter DSGVO-Einhaltung.',
      tips: 'Für Unternehmen mit Berufsgeheimnis (Ärzte, Anwälte, Steuerberater, sensible Industrie-Patente) ist 100% On-Premise die sicherste Lösung überhaupt.',
      quickPills: ['Ist On-Premise 100% DSGVO-konform?', 'Kommen OpenAI oder Google an Daten?']
    },
    agent_hardware: {
      shortExplain: 'Über welche Server oder Rechenpower verfügt Ihr Betrieb bereits?',
      detail: 'Lokale KI-Modelle benötigen je nach Modellgröße Rechenleistung (idealerweise Grafikkarten / GPUs). Wenn Sie noch keine Hardware besitzen: <strong>Nexvia berät Sie herstellerunabhängig</strong> zur Anschaffung oder stellt eine Cloud-Testinstanz zum risikofreien Ausprobieren bereit.',
      tips: 'Mittlerweile genügen schon moderne Office-Workstations oder Mac Studio Geräte für erstaunlich leistungsfähige lokale KI-Modelle.',
      quickPills: ['Brauche ich teure Server?', 'Was ist eine Testinstanz?']
    },
    agent_zielgruppe: {
      shortExplain: 'Wer in Ihrer Firma soll auf den KI-Agenten zugreifen dürfen?',
      detail: 'Darf nur die <strong>Geschäftsführung</strong> sensible Kennzahlen abfragen, oder soll die <strong>gesamte Belegschaft</strong> Handbücher und Vorlagen durchsuchen? Mit einem <strong>Rollen- & Rechtekonzept</strong> steuern wir präzise, wer welche Dokumente sehen darf.',
      tips: 'Ein Mitarbeiter im Vertrieb sieht z.B. nur Verkaufsunterlagen, während Personalakten für ihn gesperrt bleiben.',
      quickPills: ['Kann man Rechte einschränken?', 'Können Mitarbeiter alles sehen?']
    },

    // 📋 Rahmenbedingungen
    inhalte_upload: {
      shortExplain: 'Laden Sie hier Ihr Logo, Broschüren, Fotos oder Dokumente hoch.',
      detail: 'Sie können Bilder (JPG, PNG, SVG) und PDF-Dokumente bis zu 5 MB pro Datei direkt per Drag & Drop in die Box ziehen. Größere Bilddateien optimiert unser Tool automatisch beim Upload.',
      tips: 'Haben Sie mehrere Dateien? Sie können mehrere Dokumente auf einmal auswählen.',
      quickPills: ['Welche Dateiformate gehen?', 'Was wenn Dateien zu groß sind?']
    },
    budget: {
      shortExplain: 'In welcher Größenordnung liegt das geplante Gesamtbudget?',
      detail: 'Die Budgetangabe hilft uns, von Anfang an das wirtschaftlich sinnvollste Konzept für Sie zu erstellen. So schlagen wir Ihnen keine überdimensionierten Systeme vor, sondern das Maximum an Leistung für Ihren Rahmen.',
      tips: 'Die Auswahl ist unverbindlich und dient als Orientierung für die Angebotserstellung.',
      quickPills: ['Was kostet eine typische Website?', 'Was kostet ein KI-Agent?']
    },
    timeline: {
      shortExplain: 'Bis wann soll das Projekt idealerweise live oder einsatzbereit sein?',
      detail: 'Geben Sie Ihren zeitlichen Wunschrahmen an. Typische Webprojekte oder Automations-Pipelines dauern bei Nexvia je nach Umfang zwischen 2 und 6 Wochen.',
      tips: 'Wenn Sie eine feste Deadline haben (z.B. Messe, Firmeneröffnung, Saisonstart), erwähnen Sie dies bitte im Notizfeld.',
      quickPills: ['Wie schnell geht eine Umsetzung?', 'Geht Express-Umsetzung?']
    },
    konkurrenz: {
      shortExplain: 'Nennen Sie Mitbewerber, Vorbilder oder Designs, die Ihnen gefallen.',
      detail: 'Gibt es Websites, deren Aufbau oder Optik Sie anspricht? Oder Mitbewerber, von denen Sie sich gezielt abheben möchten? Links und Stichworte helfen uns enorm, Ihren Geschmack zu treffen.',
      tips: 'Auch Negativ-Beispiele (<em>„So bitte auf keinen Fall“</em>) sind sehr hilfreich!',
      quickPills: ['Reicht ein Firmenname?']
    },
    anmerkungen: {
      shortExplain: 'Gibt es noch etwas, das wir vorab wissen sollten?',
      detail: 'Hier ist Platz für alles, was in den vorherigen Fragen nicht zur Sprache kam: Spezielle Wünsche, rechtliche Vorgaben, bisherige Erfahrungen oder Fragen an Nexvia.',
      tips: 'Keine Sorge: Alles, was hier steht, besprechen wir auch im folgenden Konzeptgespräch mit Ihnen.',
      quickPills: ['Wann meldet sich Nexvia?']
    }
  };

  // ── 3. Allgemeine FAQ & Begriffserklärungen ──────────────────────────────────
  const GENERAL_KNOWLEDGE = [
    {
      keywords: ['rag', 'retrieval', 'vektordatenbank', 'dokumentensuche'],
      title: 'Was bedeutet RAG (Retrieval-Augmented Generation)?',
      answer: '<strong>RAG</strong> ist die Technologie, mit der eine KI auf Ihre **eigenen internen Firmendokumente** (PDFs, Handbücher, Verträge, Notizen) zugreift. Statt wie ChatGPT allgemeines Wissen aus dem Internet zu nutzen, liest der RAG-Agent genau Ihre Dateien und liefert präzise Antworten inklusive Angabe der Seitenzahl – 100% lokal und ohne dass fremde Dritte Ihre Daten sehen!'
    },
    {
      keywords: ['zero touch', 'zerotouch', 'vollautomatisch', 'vollautomatisierung'],
      title: 'Was bedeutet „Zero-Touch-Automatisierung“?',
      answer: '<strong>Zero-Touch</strong> bedeutet, dass ein Prozess von Anfang bis Ende vollkommen **ohne menschliches Eingreifen** abläuft. Ein Beispiel: Ein Kunde füllt ein Formular aus -> Daten fließen ins CRM -> Rechnung wird generiert -> Bestätigungs-Mail geht raus -> Projektordner wird angelegt. Alles in 2 Sekunden im Hintergrund!'
    },
    {
      keywords: ['human in the loop', 'hitl', 'freigabe', 'menschliche freigabe'],
      title: 'Was bedeutet „Human-in-the-Loop“?',
      answer: 'Bei <strong>Human-in-the-Loop</strong> bereitet die Automatisierung oder KI alle aufwendigen Schritte vor (z.B. den Text einer Antwortmail oder eine Rechnung), aber ein Mitarbeiter muss kurz auf **„Bestätigen / Freigeben“** klicken, bevor die Aktion endgültig ausgeführt wird. Das verbindet maximale Zeitersparnis mit 100%iger Fehlerkontrolle.'
    },
    {
      keywords: ['on premise', 'on-premise', 'lokal', 'air gapped', 'air-gapped', 'server'],
      title: 'Was ist der Vorteil von On-Premise & Air-Gapped?',
      answer: '<strong>On-Premise</strong> bedeutet, dass Software und KI direkt auf Servern in Ihren eigenen Firmenräumen laufen. Bei <strong>Air-Gapped</strong> ist das System sogar komplett vom externen Internet isoliert. Das garantiert absolute Datensicherheit nach höchsten Standards – perfekt für Berufsgeheimnisträger, Kanzleien, Ärzte und innovative Industrieunternehmen.'
    },
    {
      keywords: ['kosten', 'preis', 'preise', 'was kostet', 'budget'],
      title: 'Wie setzen sich die Kosten zusammen?',
      answer: 'Die Kosten hängen vom Umfang ab: Eine fokussierte Landingpage oder gezielte Workflow-Automation startet bereits im kleineren Budgetbereich. Umfangreiche Web-Applikationen oder On-Premise KI-Server erfordern mehr Setup. Im Briefing erfassen wir Ihren Rahmen, um Ihnen ein maßgeschneidertes, faires Festpreis-Angebot ohne versteckte Kosten zu erstellen.'
    },
    {
      keywords: ['ablauf', 'wie geht es weiter', 'was passiert nach', 'nach dem absenden'],
      title: 'Wie läuft die Zusammenarbeit nach dem Absenden ab?',
      answer: 'Sobald Sie dieses Briefing absenden, analysieren unsere Experten Ihre Angaben. Innerhalb von 1–2 Werktagen erhalten Sie eine Rückmeldung mit einem maßgeschneiderten Umsetzungskonzept, einer Zeitschätzung und einem transparenten Angebot. Bei Bedarf stimmen wir Feinheiten in einem kurzen Video-Call ab.'
    }
  ];

  // ── 4. State & Kunden-Fragen-Mapping ─────────────────────────────────────────
  let activeQuestions = []; // Array von { num, id, title, subtitle, options, categoryId }
  let currentFocusedQuestion = null; // { num, id, ... }
  let isChatOpen = false;

  // ── 5. Hilfsfunktionen zur Fragenerkennung ────────────────────────────────────
  function extractQuestionNumber(text) {
    if (!text) return null;
    const clean = text.trim();

    // Reines Tippen einer Zahl: z.B. "4" oder "12"
    if (/^\d{1,2}$/.test(clean)) {
      return parseInt(clean, 10);
    }

    // Muster wie: "Frage 4", "Frage Nr. 4", "#4", "nr 4", "bei frage 4"
    const match = clean.match(/(?:frage|nr\.?|#)\s*(\d{1,2})\b/i);
    if (match && match[1]) {
      return parseInt(match[1], 10);
    }

    // Am Anfang: "4: Was bedeutet..." oder "4 - Wie ist..."
    const prefixMatch = clean.match(/^(\d{1,2})\s*[:\-\)\.]\s+/);
    if (prefixMatch && prefixMatch[1]) {
      return parseInt(prefixMatch[1], 10);
    }

    return null;
  }

  function getQuestionByNum(num) {
    return activeQuestions.find(q => q.num === num) || null;
  }

  function getQuestionById(id) {
    return activeQuestions.find(q => q.id === id) || null;
  }

  // ── 6. Chat UI Erzeugung ─────────────────────────────────────────────────────
  function injectChatWidget() {
    if (document.getElementById('nexvia-ai-widget')) return;

    const widget = document.createElement('div');
    widget.id = 'nexvia-ai-widget';
    widget.innerHTML = `
      <!-- Floating Trigger Button: Alex – KI-Berater -->
      <button id="ai-trigger-btn" class="ai-trigger-btn" onclick="window.BriefingAI.toggleChat()" title="Alex – Nexvia KI-Berater öffnen">
        <div class="ai-trigger-glow"></div>
        <div class="ai-trigger-icon">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2a8 8 0 0 0-8 8c0 3.3 2 6.2 5 7.4V20a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-2.6c3-1.2 5-4.1 5-7.4a8 8 0 0 0-8-8z"/><path d="M9 21h6"/><path d="M10 17h4"/></svg>
        </div>
        <span class="ai-trigger-text">Alex – KI-Berater</span>
        <span class="ai-pulse-dot"></span>
      </button>

      <!-- Chat Drawer / Window -->
      <div id="ai-chat-window" class="ai-chat-window" style="display:none;">
        <div class="ai-chat-header">
          <div class="ai-header-info">
            <div class="ai-avatar">
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
              <span class="ai-online-dot"></span>
            </div>
            <div>
              <div class="ai-header-title">Alex · Nexvia KI-Berater</div>
              <div class="ai-header-subtitle">Ihr digitaler Strategie- &amp; Briefing-Experte</div>
            </div>
          </div>
          <button class="ai-close-btn" onclick="window.BriefingAI.toggleChat(false)" title="Schließen">✕</button>
        </div>

        <!-- Fokus-Banner (wenn eine Frage gezielt aufgerufen wurde) -->
        <div id="ai-focus-bar" class="ai-focus-bar" style="display:none;">
          <div class="ai-focus-content">
            <span class="ai-focus-num" id="ai-focus-num">Frage 1</span>
            <span class="ai-focus-title" id="ai-focus-title">...</span>
          </div>
          <button class="ai-focus-clear" onclick="window.BriefingAI.clearQuestionFocus()" title="Fokus aufheben">✕</button>
        </div>

        <!-- Chat Messages -->
        <div id="ai-messages" class="ai-messages"></div>

        <!-- Input Area -->
        <div class="ai-input-area">
          <input type="text" id="ai-input" class="ai-input" placeholder="Fragen Sie mich alles (z.B. „Was bringt ein Security Agent?“ oder „Frage 4“)..." onkeydown="if(event.key==='Enter') window.BriefingAI.sendMessage()">
          <button id="ai-send-btn" class="ai-send-btn" onclick="window.BriefingAI.sendMessage()" title="Senden">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(widget);

    // Initial greeting if empty
    setTimeout(() => {
      appendBotGreeting();
    }, 100);
  }

  function appendBotGreeting() {
    const messages = document.getElementById('ai-messages');
    if (!messages || messages.children.length > 0) return;

    const html = `
      Hallo! Ich bin <strong>Alex</strong>, Ihr persönlicher Nexvia KI-Berater.<br><br>
      Ich berate Sie gerne zu unseren Leistungsbereichen und helfe Ihnen beim Ausfüllen dieses Briefings. Fragen Sie mich z.B.:<br>
      • <em>„Was bringt mir ein Security Agent?“</em><br>
      • <em>„Warum sollte ich Prozesse automatisieren?“</em><br>
      • <em>„Frage 4: Was bedeutet RAG?“</em> (oder einfach nur die Zahl <em>„4“</em>)
    `;

    const pills = [
      { text: 'Was bringt ein Security Agent?', action: () => processUserInput('was bringt ein security agent') },
      { text: 'Was bringt ein lokaler KI-Agent?', action: () => processUserInput('was bringt ein lokaler ki agent') },
      { text: 'Was bringt Automatisierung?', action: () => processUserInput('was bringt automatisierung') },
      { text: 'Fragen-Übersicht', action: () => showQuestionsOverview() }
    ];

    appendBotMessage(html, pills);
  }

  function showQuestionsOverview() {
    if (!activeQuestions.length) {
      appendBotMessage('Das Formular lädt noch Fragen...');
      return;
    }

    let listHtml = 'Wählen Sie eine Frage aus, um sofort eine verständliche Erklärung und Tipps zu erhalten:<br><br>';
    const pills = activeQuestions.slice(0, 10).map(q => ({
      text: `Frage ${q.num}: ${q.title.slice(0, 22)}${q.title.length > 22 ? '…' : ''}`,
      action: () => openHelpForQuestion(q.num, q.id)
    }));

    if (activeQuestions.length > 10) {
      pills.push({
        text: 'Weitere Fragen...',
        action: () => showAllQuestionsPills()
      });
    }

    appendBotMessage(listHtml, pills);
  }

  function showAllQuestionsPills() {
    const pills = activeQuestions.map(q => ({
      text: `Frage ${q.num}: ${q.title.slice(0, 22)}${q.title.length > 22 ? '…' : ''}`,
      action: () => openHelpForQuestion(q.num, q.id)
    }));
    appendBotMessage('Hier sind alle Fragen Ihres Briefings:', pills);
  }

  // ── 7. Nachrichten senden & verarbeiten ───────────────────────────────────────
  function sendMessage() {
    const input = document.getElementById('ai-input');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    input.value = '';
    appendUserMessage(text);

    // Nachdenk-Verzögerung für natürliches Chat-Gefühl (150ms)
    setTimeout(() => {
      processUserInput(text);
    }, 150);
  }

  function processUserInput(text) {
    const clean = text.toLowerCase().trim();

    // ── STUFE 1: Sektoren- & Strategieberatung („Was bringt X?“, „Warum brauche ich Y?“) ──
    const matchedSector = findSectorConsulting(clean);
    if (matchedSector) {
      deliverSectorConsulting(matchedSector);
      return;
    }

    // ── STUFE 2: Fragennummer-Erkennung (z.B. „4“, „Frage 4“, „#3: Was bedeutet...“) ──
    const num = extractQuestionNumber(text);
    if (num) {
      const q = getQuestionByNum(num);
      if (q) {
        setQuestionFocus(q);
        explainQuestion(q, text);
        return;
      } else {
        appendBotMessage(`Frage ${num} gibt es in Ihrem individuellen Briefing leider nicht. Ihr Formular umfasst die Fragen 1 bis ${activeQuestions.length}.`);
        return;
      }
    }

    // ── STUFE 3: Nachfragen zur aktuell fokussierten Frage ──
    if (currentFocusedQuestion) {
      const matchedOpt = currentFocusedQuestion.options.find(opt => clean.includes(opt.toLowerCase().slice(0, 8)));
      if (matchedOpt) {
        appendBotMessage(
          `Zu der Option <strong>„${escHtml(matchedOpt)}“</strong> bei Frage ${currentFocusedQuestion.num}:<br>` +
          `Diese Option passt hervorragend, wenn dieser Bereich für Ihr Vorhaben wichtig ist.`,
          [
            { text: `„${matchedOpt}“ im Formular auswählen`, action: () => applyOptionToForm(currentFocusedQuestion.id, matchedOpt) },
            { text: 'Zurück zur Fragenübersicht', action: () => showQuestionsOverview() }
          ]
        );
        return;
      }
    }

    // ── STUFE 4: Allgemeine Begriffserklärungen (RAG, Zero-Touch, On-Premise etc.) ──
    const matchedGeneral = GENERAL_KNOWLEDGE.find(item =>
      item.keywords.some(kw => clean.includes(kw))
    );

    if (matchedGeneral) {
      appendBotMessage(
        `<strong>${matchedGeneral.title}</strong><br><br>${matchedGeneral.answer}`,
        [
          { text: 'Fragen-Übersicht', action: () => showQuestionsOverview() },
          { text: 'Zurück zum Formular', action: () => toggleChat(false) }
        ]
      );
      return;
    }

    // ── STUFE 5: Schlagwörter gegen Fragen & Optionen matchen ──
    const matchedCategoryQuestion = activeQuestions.find(q =>
      clean.includes(q.title.toLowerCase()) ||
      (q.subtitle && clean.includes(q.subtitle.toLowerCase().slice(0, 10))) ||
      q.options.some(o => clean.includes(o.toLowerCase().slice(0, 10)))
    );

    if (matchedCategoryQuestion) {
      setQuestionFocus(matchedCategoryQuestion);
      explainQuestion(matchedCategoryQuestion, text);
      return;
    }

    // ── STUFE 6: Begrüßungen ──
    if (clean.includes('hallo') || clean.includes('hi') || clean.includes('hey') || clean.includes('guten tag')) {
      appendBotMessage(
        `Hallo! Ich berate Sie gerne zu allen Themen rund um <strong>Sicherheits-Agenten, lokale KI, Automatisierung, Webseiten und Social Media</strong>.<br><br>Was möchten Sie wissen?`,
        [
          { text: 'Was bringt ein Security Agent?', action: () => processUserInput('was bringt ein security agent') },
          { text: 'Was bringt ein lokaler KI-Agent?', action: () => processUserInput('was bringt ein lokaler ki agent') },
          { text: 'Was bringt Automatisierung?', action: () => processUserInput('was bringt automatisierung') },
          { text: 'Fragen-Übersicht öffnen', action: () => showQuestionsOverview() }
        ]
      );
      return;
    }

    // ── STUFE 7: Fallback mit klaren Aktionsvorschlägen ──
    appendBotMessage(
      `Ich helfe Ihnen gerne als digitaler Berater weiter!<br><br>` +
      `Fragen Sie mich nach dem <strong>konkreten Nutzen</strong> unserer Lösungen (z.B. <em>„Was bringt ein Security Agent?“</em>) oder nennen Sie mir einfach eine <strong>Fragennummer</strong> aus dem Formular (z.B. <em>„Frage 4“</em> oder <em>„4“</em>).`,
      [
        { text: 'Was bringt ein Security Agent?', action: () => processUserInput('was bringt ein security agent') },
        { text: 'Was bringt ein lokaler KI-Agent?', action: () => processUserInput('was bringt ein lokaler ki agent') },
        { text: 'Was bringt Automatisierung?', action: () => processUserInput('was bringt automatisierung') },
        { text: 'Fragen-Übersicht', action: () => showQuestionsOverview() }
      ]
    );
  }

  /**
   * Intelligenter Matcher für Sektorenberatung („Was bringt X?“, „Warum X?“)
   */
  function findSectorConsulting(cleanText) {
    // Liste von Signalwörtern, die nach Nutzen, Sinn oder Erklärung fragen
    const benefitSignals = ['bringt', 'warum', 'vorteil', 'nutzen', 'wieso', 'sinn', 'wozu', 'haben', 'brauche', 'was ist', 'rechnet', 'lohnt', 'funktion', 'unterschied'];
    const hasBenefitSignal = benefitSignals.some(sig => cleanText.includes(sig));

    for (const sector of SECTOR_CONSULTING) {
      const keywordHit = sector.keywords.some(kw => cleanText.includes(kw));
      // Treffer, wenn Keyword und (Nutzenfrage ODER starkes Keyword wie "security" / "automatisierung") vorhanden ist
      if (keywordHit) {
        return sector;
      }
    }
    return null;
  }

  function deliverSectorConsulting(sector) {
    const pills = [];

    // Pill: Direkt im Formular ankreuzen (wenn Target existiert)
    if (sector.formTarget) {
      const q = getQuestionById(sector.formTarget.sectionId);
      const qNumLabel = q ? ` (Frage ${q.num})` : '';
      pills.push({
        text: `✓ „${sector.formTarget.optionName.slice(0, 24)}…“${qNumLabel} auswählen`,
        action: () => applyOptionToForm(sector.formTarget.sectionId, sector.formTarget.optionName)
      });
      if (q) {
        pills.push({
          text: `📌 Zu Frage ${q.num} im Formular springen`,
          action: () => scrollToQuestion(q.num)
        });
      }
    }

    // Weitere Beratungs-Pills anbinden
    if (sector.pills) {
      sector.pills.forEach(p => {
        // Nicht duplizieren
        if (!pills.some(existing => existing.text.slice(0, 15) === p.text.slice(0, 15))) {
          pills.push({
            text: p.text,
            action: () => {
              if (typeof p.action === 'function') {
                p.action(
                  (sid, opt) => applyOptionToForm(sid, opt),
                  (query) => processUserInput(query)
                );
              } else {
                processUserInput(p.text);
              }
            }
          });
        }
      });
    }

    appendBotMessage(
      `<strong>${sector.title}</strong><br><br>${sector.answerHtml}`,
      pills
    );
  }

  // ── 8. Erklärung einer konkreten Frage ─────────────────────────────────────────
  function explainQuestion(q, originalQuery = '') {
    const info = QUESTION_KNOWLEDGE[q.id];

    let html = `<strong>Frage ${q.num}: ${escHtml(q.title)}</strong><br>`;
    if (q.subtitle) {
      html += `<span style="font-size:11px;color:var(--text-3);">${escHtml(q.subtitle)}</span><br><br>`;
    } else {
      html += `<br>`;
    }

    if (info) {
      html += `${info.detail}<br><br>`;
      if (info.tips) {
        html += `<div style="padding:8px 12px;border-radius:8px;background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.25);font-size:12px;color:var(--text-2);margin-bottom:8px;">💡 <strong>Alex' Praxis-Tipp:</strong> ${info.tips}</div>`;
      }
    } else {
      html += `Hier können Sie die zutreffenden Optionen auswählen oder Ihre individuellen Anforderungen notieren.`;
    }

    const pills = [];
    if (q.options && q.options.length > 0) {
      pills.push({
        text: `📌 Zu Frage ${q.num} im Formular springen`,
        action: () => scrollToQuestion(q.num)
      });
      q.options.slice(0, 4).forEach(opt => {
        pills.push({
          text: `+ „${opt.slice(0, 26)}${opt.length > 26 ? '…' : ''}“ auswählen`,
          action: () => applyOptionToForm(q.id, opt)
        });
      });
    }

    if (info && info.quickPills) {
      info.quickPills.forEach(qp => {
        pills.push({
          text: qp,
          action: () => processUserInput(qp)
        });
      });
    }

    appendBotMessage(html, pills);
  }

  // ── 9. Direkte Interaktion mit dem Formular ───────────────────────────────────
  function scrollToQuestion(num) {
    const sections = document.querySelectorAll('.form-section');
    sections.forEach(sec => {
      const numEl = sec.querySelector('.section-num');
      if (numEl && parseInt(numEl.textContent, 10) === num) {
        sec.scrollIntoView({ behavior: 'smooth', block: 'center' });
        sec.style.transition = 'box-shadow 0.3s, border-color 0.3s';
        sec.style.borderColor = 'var(--cyan)';
        sec.style.boxShadow = '0 0 25px rgba(6,182,212,0.4)';
        setTimeout(() => {
          sec.style.borderColor = '';
          sec.style.boxShadow = '';
        }, 2200);
      }
    });
  }

  function applyOptionToForm(sectionId, optionText) {
    const secEl = document.querySelector(`.form-section[data-sid="${sectionId}"]`);
    if (!secEl) {
      appendBotMessage(`Abschnitt im Formular nicht gefunden.`);
      return;
    }

    const chips = secEl.querySelectorAll('.chip');
    let found = false;
    chips.forEach(chip => {
      if (chip.textContent.trim().toLowerCase() === optionText.trim().toLowerCase()) {
        if (!chip.classList.contains('active')) {
          chip.click();
          found = true;
        } else {
          found = true;
        }
      }
    });

    scrollToQuestion(getQuestionById(sectionId)?.num || 1);

    if (found) {
      appendBotMessage(
        `✓ <strong>„${escHtml(optionText)}“</strong> wurde für Sie im Formular ausgewählt!`,
        [
          { text: 'Nächste Frage ansehen', action: () => {
            const current = getQuestionById(sectionId);
            if (current && current.num < activeQuestions.length) {
              openHelpForQuestion(current.num + 1);
            } else {
              showQuestionsOverview();
            }
          }},
          { text: 'Fertig, Chat schließen', action: () => toggleChat(false) }
        ]
      );
    } else {
      appendBotMessage(`Option „${escHtml(optionText)}“ konnte nicht gefunden werden.`);
    }
  }

  // ── 10. Fokus & Steuerung ────────────────────────────────────────────────────
  function setQuestionFocus(q) {
    currentFocusedQuestion = q;
    const bar = document.getElementById('ai-focus-bar');
    const numEl = document.getElementById('ai-focus-num');
    const titleEl = document.getElementById('ai-focus-title');
    if (bar && numEl && titleEl) {
      numEl.textContent = `Frage ${q.num}`;
      titleEl.textContent = q.title;
      bar.style.display = 'flex';
    }
  }

  function clearQuestionFocus() {
    currentFocusedQuestion = null;
    const bar = document.getElementById('ai-focus-bar');
    if (bar) bar.style.display = 'none';
  }

  function openHelpForQuestion(num, sectionId) {
    let q = null;
    if (num) q = getQuestionByNum(num);
    if (!q && sectionId) q = getQuestionById(sectionId);

    if (!q) return;

    toggleChat(true);
    setQuestionFocus(q);
    explainQuestion(q);
  }

  function toggleChat(forceState) {
    const win = document.getElementById('ai-chat-window');
    if (!win) return;

    isChatOpen = (typeof forceState === 'boolean') ? forceState : (win.style.display === 'none');
    win.style.display = isChatOpen ? 'flex' : 'none';

    if (isChatOpen) {
      setTimeout(() => {
        const input = document.getElementById('ai-input');
        if (input) input.focus();
        const msgs = document.getElementById('ai-messages');
        if (msgs) msgs.scrollTop = msgs.scrollHeight;
      }, 50);
    }
  }

  // ── 11. UI Message Rendering ─────────────────────────────────────────────────
  function appendUserMessage(text) {
    const messages = document.getElementById('ai-messages');
    if (!messages) return;

    const el = document.createElement('div');
    el.className = 'ai-msg ai-msg-user';
    el.innerHTML = `
      <div class="ai-msg-bubble">${escHtml(text)}</div>
    `;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
  }

  function appendBotMessage(html, pills = []) {
    const messages = document.getElementById('ai-messages');
    if (!messages) return;

    const el = document.createElement('div');
    el.className = 'ai-msg ai-msg-bot';

    let pillsHtml = '';
    if (pills && pills.length > 0) {
      pillsHtml = `
        <div class="ai-pills-wrap">
          ${pills.map((p, idx) => `<button type="button" class="ai-pill-btn" data-pill-idx="${idx}">${escHtml(p.text)}</button>`).join('')}
        </div>
      `;
    }

    el.innerHTML = `
      <div class="ai-msg-avatar">
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
      </div>
      <div class="ai-msg-content">
        <div class="ai-msg-bubble">${html}</div>
        ${pillsHtml}
      </div>
    `;

    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;

    if (pills && pills.length > 0) {
      const btns = el.querySelectorAll('.ai-pill-btn');
      btns.forEach(b => {
        const idx = parseInt(b.getAttribute('data-pill-idx'), 10);
        b.addEventListener('click', () => {
          btns.forEach(other => other.disabled = true);
          pills[idx].action();
        });
      });
    }
  }

  function escHtml(str) {
    return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // ── 12. Globale Schnittstelle für form.js ────────────────────────────────────
  window.BriefingAI = {
    init: injectChatWidget,
    toggleChat: toggleChat,
    openHelpForQuestion: openHelpForQuestion,
    clearQuestionFocus: clearQuestionFocus,
    sendMessage: sendMessage,
    applyOptionToForm: applyOptionToForm,
    syncActiveSections: function(sectionsList) {
      activeQuestions = sectionsList || [];
    }
  };

  // Auto-Initialisierung nach DOM-Ready
  document.addEventListener('DOMContentLoaded', () => {
    injectChatWidget();
  });

})();
