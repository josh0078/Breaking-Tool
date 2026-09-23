/**
 * ============================================================================
 * BRIEFING-AI.JS — Alex • KI-Problemberater (Nexvia)
 * ============================================================================
 * 100% lokaler, DSGVO-konformer KI-Strategie- & Problemberater.
 * - Exaktes Nexvia-Design (Pill-Button „Alex • KI-Problemberater“ + High-End Modal)
 * - Vollumfassende Beratung für alle Sektoren:
 *     • Sicherheits-Agent (24/7 Wächter, IT-Security, DSGVO, Abwehr)
 *     • Lokaler KI-Agent & RAG (Firmengedächtnis, Dokumentenanalyse, kein ChatGPT)
 *     • Workflow-Automatisierung (Make, n8n, Zapier, Zero-Touch, Fehlerfreiheit)
 *     • Verkaufsstarke Webseiten & Web Apps (Conversion, Ladezeit, Portale)
 *     • Social Media Management & Performance Ads (Mitarbeiter, Sichtbarkeit)
 * - Intelligente Spracherkennung (versteht Tippfehler, Umgangssprache & „Was bringt mir X?“)
 * - Live-Fragennummer-Erkennung (z.B. „Frage 4“, „4: Was bedeutet RAG?“, „2“)
 * - Direkte Ein-Klick-Übernahme ins Formular („Im Formular auswählen“)
 * ============================================================================
 */

(function() {
  'use strict';

  // ── 1. Vollumfassende Sektoren- & Lösungsberatung („Was bringt mir X?“) ──────
  const SECTOR_CONSULTING = [
    {
      id: 'security_agent',
      // Erkennt „was bringt ein security agent“, „warum security“, „sicherheits ageten“, „it schutz“, „hacker abwehr“
      keywords: [
        'securit', 'sekurit', 'sicherheits', 'sicherheit', 'cyber', 'angriff', 'hacker', 'compliance',
        'wächter', 'it-schutz', 'phishing', 'ransomware', 'datenleck', 'datenabfluss', 'firewall',
        'antivirus', 'antiviren', 'schadsoftware', 'it security', 'it-security', 'it sicherheit'
      ],
      title: '🛡️ Warum ein lokaler Sicherheits-Agent für jedes Unternehmen entscheidend ist',
      answerHtml: `
        <div style="line-height:1.65;font-size:12.5px;">
          <strong>Ein lokaler Sicherheits-Agent ist der 24/7-Wächter für Ihre gesamte Firmen-IT.</strong><br><br>
          
          <div style="padding:10px 12px;border-radius:10px;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.25);margin-bottom:10px;">
            ⚠️ <strong>Das reale Problem in Unternehmen heute:</strong><br>
            Cyber-Angriffe, Phishing und Erpressungs-Trojaner (Ransomware) zielen heute vor allem auf mittelständische Betriebe und Dienstleister. Ein Sicherheitsvorfall wird im Schnitt erst nach <strong>200 Tagen</strong> bemerkt – wenn Kundendaten bereits im Darknet sind oder der Betrieb stillsteht. Hinzu kommen strenge gesetzliche Haftungsrisiken für Geschäftsführer (DSGVO & NIS-2).
          </div>

          <strong>Die 4 zentralen Schutz-Säulen des Nexvia Sicherheits-Agenten:</strong>
          <ul style="margin:8px 0 12px 18px;padding:0;line-height:1.65;">
            <li><strong>1. Echtzeit-Verhaltensanalyse (24/7):</strong> Überwacht Server-Logs, Login-Aktivitäten und Netzwerkverkehr rund um die Uhr. Ungewöhnliche Datenabflüsse oder Angriffe werden in Millisekunden aufgespürt.</li>
            <li><strong>2. Sofortige automatisierte Gefahrenabwehr:</strong> Blockiert kompromittierte Konten oder verdächtige IP-Adressen sofort automatisch und alarmiert die Geschäftsleitung via Push/SMS, bevor ein Schaden entsteht.</li>
            <li><strong>3. 100% DSGVO & Compliance-Schutz:</strong> Protokolliert Zugriffsrechte revisionssicher für Wirtschaftsprüfer und Datenschutzbehörden.</li>
            <li><strong>4. 100% lokal im eigenen Haus:</strong> Der Agent läuft autark auf Ihren Servern. Keine sensiblen Sicherheitsdaten fließen in externe US-Clouds!</li>
          </ul>

          <div style="padding:10px 12px;border-radius:10px;background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.25);margin-bottom:10px;">
            💡 <strong>Praxis-Beispiel:</strong> Ein Mitarbeiter klickt abends versehentlich auf einen Phishing-Link oder ein Konto versucht nachts um 03:00 Uhr, 500 Kundenverträge herunterzuladen -> Der Sicherheits-Agent kappt die Session in 0,2 Sekunden, sperrt das Profil und meldet den Vorfall an die Geschäftsleitung!
          </div>

          💰 <strong>Wirtschaftlicher Nutzen:</strong> Verhindert existenzbedrohende Betriebsausfälle und DSGVO-Bußgelder – schützt Ihr Unternehmen schon ab dem ersten Tag.
        </div>
      `,
      formTarget: {
        sectionId: 'agent_zweck',
        optionName: 'Sicherheits-Agent (IT-Security, Compliance & Systemüberwachung)'
      },
      pills: [
        { text: '„Sicherheits-Agent“ im Formular auswählen', action: (apply) => apply('agent_zweck', 'Sicherheits-Agent (IT-Security, Compliance & Systemüberwachung)') },
        { text: 'Welche Hardware wird benötigt?', action: (ask) => ask('hardware für sicherheits agent') },
        { text: 'Was bringt ein lokaler KI-Wissensagent (RAG)?', action: (ask) => ask('was bringt ein lokaler ki agent') }
      ]
    },

    {
      id: 'local_ai_rag',
      // Erkennt „was bringt ein lokaler ki agent“, „warum rag“, „warum nicht chatgpt“, „firmengedächtnis“
      keywords: [
        'rag', 'lokal', 'ki-agent', 'ki agent', 'firmengedächtnis', 'mitarbeiter-assistent', 'mitarbeiter assistent',
        'dokumentenanalyse', 'chatgpt', 'wissensmanagement', 'firmenwissen', 'ki berater', 'ki-berater',
        'wissensagent', 'dokumenten agent', 'pdf agent', 'firmendaten', 'ai agent', 'ki assistent',
        'ki-assistent', 'sprachmodell', 'llm', 'ollama', 'lokale ki', 'lokaler ki'
      ],
      title: '🤖 Was bringt ein Lokaler KI-Agent & RAG (Firmengedächtnis)?',
      answerHtml: `
        <div style="line-height:1.65;font-size:12.5px;">
          <strong>Ein lokaler KI-Agent ist das zentrale, intelligente Wissenszentrum Ihres Unternehmens.</strong><br><br>
          
          <div style="padding:10px 12px;border-radius:10px;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.25);margin-bottom:10px;">
            ⚠️ <strong>Warum normales ChatGPT für Firmen gefährlich ist:</strong><br>
            Wenn Mitarbeiter Angebote, Kundenverträge, Quellcode oder Finanzdaten in öffentliches ChatGPT eingeben, landen diese Daten auf US-Servern (großer DSGVO-Verstoß & Spionagegefahr). Zudem erfindet ChatGPT bei Fachfragen oft frei Fakten („Halluzinationen“).
          </div>

          <strong>Was der lokale RAG-Agent von Nexvia leistet:</strong>
          <ul style="margin:8px 0 12px 18px;padding:0;line-height:1.65;">
            <li><strong>Greift auf Ihre echten Firmendaten zu:</strong> Liest Tausende PDFs, Handbücher, Verträge, Notizen und SharePoint-Dateien ein und beantwortet Fragen in 2 Sekunden inklusive genauer Quellenseite.</li>
            <li><strong>Spart bis zu 1,8 Arbeitsstunden/Tag pro Mitarbeiter:</strong> Nie wieder stundenlang in alten Ordnern, E-Mails oder Datenbanken nach Preisen, Klauseln oder Anleitungen suchen.</li>
            <li><strong>Turbo-Onboarding:</strong> Neue Mitarbeiter fragen einfach den Bot, statt erfahrene Kollegen ständig im Arbeitsfluss zu unterbrechen.</li>
            <li><strong>Stoppt Wissensverlust:</strong> Wenn Mitarbeiter in Rente gehen oder wechseln, bleibt ihr dokumentiertes Expertenwissen im Betrieb erhalten.</li>
            <li><strong>100% datenschutzsicher:</strong> Läuft wahlweise komplett On-Premise (Air-Gapped) in Ihren eigenen Räumen – kein einziges Byte verlässt Ihr Haus!</li>
          </ul>

          💡 <strong>Praxis-Beispiel:</strong> Ein Vertriebler fragt den Bot: <em>„Dürfen wir Kunden XY 15% Rabatt gewähren?“</em> -> Der Agent antwortet in 2 Sekunden: <em>„Laut Rahmenvertrag von 2024 (Seite 4) sind maximal 10% Skonto vereinbart, es sei denn, die Geschäftsführung stimmt schriftlich zu.“</em>
        </div>
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
      // Erkennt „was bringt automatisierung“, „prozesse automatisieren“, „warum make zapier n8n“
      keywords: [
        'automati', 'workflow', 'prozess', 'schnittstelle', 'make', 'zapier', 'n8n', 'zeitfresser',
        'papierkram', 'excel', 'crm-automation', 'rechnungsworkflow', 'abtippen', 'händisch',
        'manuell', 'zeit sparen', 'routineaufgabe', 'routinen'
      ],
      title: '⚙️ Was bringt Workflow-Automatisierung für Ihr Unternehmen?',
      answerHtml: `
        <div style="line-height:1.65;font-size:12.5px;">
          <strong>Automatisierung ersetzt manuelle Büro-Routinen durch intelligente Software-Pipelines.</strong><br><br>
          
          <div style="padding:10px 12px;border-radius:10px;background:rgba(6,182,212,0.08);border:1px solid rgba(6,182,212,0.25);margin-bottom:10px;">
            📊 <strong>Typische Zeitfresser in Betrieben heute:</strong><br>
            Kundendaten manuell aus Mails ins CRM abtippen, Rechnungen händisch erstellen, Zahlungseingänge abgleichen oder Excel-Listen pflegen. Das raubt wöchentlich 5–15 Stunden Arbeitszeit pro Kopf und führt regelmäßig zu Tippfehlern.
          </div>

          <strong>Die 3 messbaren Kernvorteile:</strong>
          <ul style="margin:8px 0 12px 18px;padding:0;line-height:1.65;">
            <li><strong>Enorme Zeit- & Kostenersparnis:</strong> Ihr Team gewinnt wertvolle Stunden für Kundenberatung, Vertrieb und Kernaufgaben.</li>
            <li><strong>Reaktionszeit unter 2 Sekunden:</strong> Neue Anfragen werden sofort erfasst, automatisch vorqualifiziert und bestätigt – während die Konkurrenz noch Tage braucht.</li>
            <li><strong>0% Fehlerquote:</strong> Keine Zahlendreher mehr in Rechnungen, keine verlorenen Leads und keine vergessenen Termine.</li>
          </ul>

          💡 <strong>Praxis-Beispiel:</strong> Ein Kunde bucht auf Ihrer Website einen Termin -> Nexvia-Automation trägt den Termin in den Kalender ein, legt den Kunden im CRM an, generiert einen Projektordner und sendet automatisch eine WhatsApp-Bestätigung mit Vorab-Infos – vollautomatisch in 3 Sekunden!
        </div>
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
      // Erkennt „was bringt eine webseite“, „warum web app“, „unterschied homepage webseite“
      keywords: [
        'webseite', 'website', 'web-app', 'web app', 'homepage', 'landingpage', 'online-shop',
        'relaunch', 'baukasten', 'wix', 'wordpress', 'internetseite', 'webauftritt', 'webdesign',
        'neue seite', 'portal', 'kundenportal'
      ],
      title: '🌐 Was bringt eine High-End-Webseite oder Web-App von Nexvia?',
      answerHtml: `
        <div style="line-height:1.65;font-size:12.5px;">
          <strong>Aus einer passiven „digitalen Visitenkarte“ wird ein 24/7-Neukundengewinner.</strong><br><br>
          
          <div style="padding:10px 12px;border-radius:10px;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.25);margin-bottom:10px;">
            ⚠️ <strong>Das Problem herkömmlicher Websites & Baukästen:</strong><br>
            Besucher springen auf dem Smartphone nach wenigen Sekunden ab, wenn die Seite langsam lädt oder unübersichtlich ist. Viele Betriebe verlieren dadurch jeden Monat unbemerkt lukrative Aufträge an Mitbewerber.
          </div>

          <strong>Was Nexvia Webseiten & Web Apps auszeichnet:</strong>
          <ul style="margin:8px 0 12px 18px;padding:0;line-height:1.65;">
            <li><strong>Verkaufspsychologischer Aufbau:</strong> Strukturierte Nutzerführung, die Vertrauen schafft und Besucher gezielt zu qualifizierten Kundenanfragen konvertiert.</li>
            <li><strong>Ladezeiten unter 1 Sekunde:</strong> High-Speed Hosting in Deutschland für Top-Google-Rankings und flüssige mobile Bedienung.</li>
            <li><strong>Web Apps digitalisieren Geschäftsprozesse:</strong> Kunden können eigene Portale nutzen, Angebote berechnen, Dokumente einsehen oder online bezahlen.</li>
          </ul>

          💡 <strong>Unterschied Webseite vs. Web App:</strong> Eine Website informiert und gewinnt Anfragen. Eine Web-App (Portal/SaaS) digitalisiert echte Arbeitsprozesse (z.B. Kundenlogins, Auftragsverwaltung, Online-Rechner).
        </div>
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
      // Erkennt „was bringt social media“, „warum instagram“, „mitarbeitergewinnung“, „performance ads“
      keywords: [
        'social media', 'social-media', 'socialmedia', 'instagram', 'linkedin', 'tiktok',
        'performance ads', 'ads', 'werbung', 'mitarbeitergewinnung', 'recruiting', 'fachkräftemangel',
        'facebook', 'reels', 'postings', 'follower', 'sichtbarkeit', 'personal gewinnen', 'social'
      ],
      title: '📱 Was bringt professionelles Social Media & Performance Ads?',
      answerHtml: `
        <div style="line-height:1.65;font-size:12.5px;">
          <strong>Social Media ist heute der stärkste Kanal für Markenbekanntheit und Mitarbeitergewinnung.</strong><br><br>
          
          <div style="padding:10px 12px;border-radius:10px;background:rgba(6,182,212,0.08);border:1px solid rgba(6,182,212,0.25);margin-bottom:10px;">
            💼 <strong>Warum auch B2B- & Handwerksbetriebe aktiv sein müssen:</strong><br>
            Kunden und Fachkräfte googeln Firmen nicht mehr nur – sie prüfen Instagram und LinkedIn. Ein verlassenes oder unprofessionelles Profil schreckt Bewerber und Neukunden ab. Wer modern auftritt, gewinnt das Vertrauen.
          </div>

          <strong>Die 3 großen Hebel von Nexvia Social Media:</strong>
          <ul style="margin:8px 0 12px 18px;padding:0;line-height:1.65;">
            <li><strong>Fachkräfte gewinnen (Employer Branding):</strong> Zeigt authentische Einblicke und begeistert Bewerber, die gar nicht aktiv auf Jobportalen suchen.</li>
            <li><strong>Planbare Neukunden durch Performance Ads:</strong> Gezielte Werbeanzeigen auf Meta & LinkedIn werden millimetergenau nur an Ihre Wunschkunden in der Region ausgespielt.</li>
            <li><strong>Rundum-Sorglos-Betreuung:</strong> Nexvia übernimmt Strategie, Grafiken, Schnitt, Texting und Veröffentlichung schlüsselfertig.</li>
          </ul>
        </div>
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

  // ── 2. Kontextuelle Fragen- & Dilemma-Beratung („Frage 3: Woher weiß ich...?“) ──────
  const CONTEXT_CONSULTING = [
    // 🎯 Zielgruppe & Markt (web_zielgruppe / Frage 3)
    {
      id: 'zielgruppe_ermitteln',
      sectionId: 'web_zielgruppe',
      keywords: [
        'welche kunden', 'kunden ansprechen', 'zielgruppe', 'wen ansprechen', 'wen soll ich ansprechen',
        'kunden will', 'kunden wil', 'zielkunden', 'wunschkunden', 'b2b oder b2c', 'zielgruppe finden',
        'wer ist meine zielgruppe', 'welche kunden will', 'wen ansprechen soll', 'kundenfokus'
      ],
      title: '🎯 Frage {num}: Woher wissen Sie, welche Kunden Sie ansprechen sollten?',
      answerHtml: `
        <div style="line-height:1.65;font-size:12.5px;">
          <strong>Ihre Zielgruppe entscheidet über das gesamte Design, die Ansprache und den wirtschaftlichen Erfolg Ihrer Website.</strong><br><br>

          Hier ist ein bewährter 3-Schritte-Leitfaden von Nexvia, um in 2 Minuten Klarheit zu bekommen:<br><br>

          <strong>1. Die 80/20-Umsatzregel (Der einfachste Praxistest):</strong><br>
          Schauen Sie auf Ihre bestehenden Kunden: Welche 20% Ihrer Aufträge bringen Ihnen 80% Ihres Gewinns und machen Ihnen die geringste Mühe? Das sind Ihre echten Wunschkunden! Richten Sie Ihre neue Website primär an genau diesem Kundentyp aus.<br><br>

          <strong>2. B2B (Unternehmen) vs. B2C (Privatkunden):</strong>
          <ul style="margin:6px 0 10px 18px;padding:0;line-height:1.6;">
            <li><strong>B2B (Geschäftskunden / Firmen):</strong> Entscheider suchen nach Zuverlässigkeit, Referenzen, messbarem ROI, Zertifizierungen und schneller Erreichbarkeit. Die Sprache muss professionell, sachlich und faktenbasiert sein.</li>
            <li><strong>B2C (Endverbraucher / Privat):</strong> Privatkunden entscheiden emotionaler. Wichtig sind: sofortiges Vertrauen, Kundenstimmen, transparente Preise und eine kinderleichte Kontaktaufnahme.</li>
          </ul>

          <strong>3. Regional vor Ort vs. Überregional:</strong><br>
          Müssen Sie persönlich vor Ort sein (z.B. Handwerk, Praxis, Kanzlei, lokale Dienstleistung)? Dann wählen Sie unbedingt <strong>„Regional“</strong>, damit wir Ihre Website für lokale Google-Suchen („in meiner Nähe“) optimieren können.<br><br>

          💡 <strong>Alex' konkrete Empfehlung:</strong> Eine Mehrfachauswahl ist ausdrücklich möglich! Die meisten erfolgreichen Betriebe wählen z.B. <em>„B2B (Geschäftskunden)“ + „Regional“</em> oder <em>„B2C“ + „Regional“</em>.
        </div>
      `,
      pills: [
        { text: '✓ „B2B (Geschäftskunden)“ auswählen', action: (apply) => apply('web_zielgruppe', 'B2B (Geschäftskunden / Unternehmen)') },
        { text: '✓ „B2C (Endverbraucher)“ auswählen', action: (apply) => apply('web_zielgruppe', 'B2C (Endverbraucher)') },
        { text: '✓ „Regional“ auswählen', action: (apply) => apply('web_zielgruppe', 'Regional') },
        { text: '✓ „Gehobenes Segment“ auswählen', action: (apply) => apply('web_zielgruppe', 'Gehobenes / Premium-Segment') }
      ]
    },

    // 🌐 Domain & Hosting / Keine IT-Kenntnisse (web_domain / Frage 7)
    {
      id: 'domain_bestehend_unsicher',
      sectionId: 'web_domain',
      keywords: [
        'habe eine webseite', 'habe schon eine webseite', 'habe schon website', 'habe webseite',
        'habe website', 'kenne mich nicht aus', 'kenne mich da nich aus', 'kenne mich nich aus',
        'technisch keine ahnung', 'was empieflst du', 'was empfiehlst du', 'domain umzug',
        'bestehende domain', 'keine ahnung von hosting', 'nicht auskennen', 'technisch nicht',
        'alte webseite', 'domain vorhanden'
      ],
      title: '🌐 Frage {num}: Sie haben bereits eine Website, kennen sich technisch aber nicht aus?',
      answerHtml: `
        <div style="line-height:1.65;font-size:12.5px;">
          <strong>Das ist absolut kein Problem – Sie müssen sich um keinerlei technische Details kümmern!</strong><br><br>

          Genau dafür ist Nexvia da: Wir übernehmen das gesamte technische Setup schlüsselfertig im Hintergrund.<br><br>

          <strong>So läuft der reibungslose Ablauf für Sie:</strong>
          <ul style="margin:8px 0 12px 18px;padding:0;line-height:1.65;">
            <li><strong>0% Ausfallzeit:</strong> Ihre bisherige Website und Ihre Firmen-E-Mail-Adressen bleiben während der gesamten Konzeptions- und Bauphase unterbrechungsfrei erreichbar.</li>
            <li><strong>Nexvia regelt den Umzug:</strong> Wir fordern (falls nötig) einfach den sogenannten Auth-Code bei Ihrem bisherigen Anbieter an und schalten Ihre neue High-End-Webseite nahtlos auf Ihre gewohnte Webadresse auf.</li>
            <li><strong>High-Speed & DSGVO inklusive:</strong> Gehostet auf deutschen ISO-27001-Servern mit automatischer SSL-Verschlüsselung, täglichen Backups und modernstem Spamschutz.</li>
          </ul>

          💡 <strong>Alex' konkrete Empfehlung:</strong><br>
          Wählen Sie im Formular einfach <strong>„Domain & Webhosting vorhanden (soll übernommen werden)“</strong> oder <strong>„Nexvia soll Domain & Hosting einrichten“</strong>. Wir stimmen danach alles Nötige einfach und unkompliziert mit Ihnen ab!
        </div>
      `,
      pills: [
        { text: '✓ „Domain bereits vorhanden“ auswählen', action: (apply) => apply('web_domain', 'Domain bereits vorhanden') },
        { text: '✓ „Nexvia soll Domain & Hosting einrichten“ auswählen', action: (apply) => apply('web_domain', 'Nexvia soll Domain & Hosting einrichten') },
        { text: '✓ „Beratung gewünscht“ auswählen', action: (apply) => apply('web_domain', 'Beratung gewünscht') }
      ]
    },

    // 📱 Social Media Reichweite & Nutzen (sm_ziele / Frage 10)
    {
      id: 'social_reichweite_nutzen',
      sectionId: 'sm_ziele',
      keywords: [
        'was bringt mir reichweite', 'was bringt reichweite', 'warum reichweite', 'bringt reichweite kunden',
        'reichweite', 'markenbekanntheit was bringt', 'was nützen follower', 'follower bringen nichts',
        'wozu reichweite', 'warum sichtbar sein'
      ],
      title: '📱 Frage {num}: Was bringt Ihnen Reichweite auf Social Media wirklich?',
      answerHtml: `
        <div style="line-height:1.65;font-size:12.5px;">
          <strong>Reine Klicks oder Follower zahlen keine Rechnungen – aber gezielte Reichweite ist der stärkste Hebel für planbares Unternehmenswachstum.</strong><br><br>

          Hier ist der reale geschäftliche Nutzen von qualifizierter Reichweite:<br><br>

          <strong>1. Der „Top-of-Mind“-Effekt (Aufträge ohne Kaltakquise):</strong><br>
          Kunden haben nicht jeden Tag sofort akuten Bedarf. Wenn jemand aber in 3 Monaten einen Dienstleister, Handwerker oder IT-Partner sucht, ruft er genau die Firma an, die er in den letzten 12 Wochen regelmäßig positiv, modern und kompetent in seinem Instagram- oder LinkedIn-Feed gesehen hat.<br><br>

          <strong>2. Vertrauensvorsprung bei Neukunden:</strong><br>
          Bevor ein Interessent bei Ihnen anfragt oder einen hochpreisigen Vertrag unterschreibt, prüft er Ihre Social-Media-Kanäle. Ein verwaistes Profil wirkt unsicher – ein aktiver Kanal mit hoher regionaler Sichtbarkeit strahlt Marktführerschaft und Zuverlässigkeit aus.<br><br>

          <strong>3. Die #1 Waffe gegen Fachkräftemangel (Employer Branding):</strong><br>
          Die besten Fachkräfte und Auszubildenden sind bereits in Arbeit und suchen nicht aktiv auf Jobbörsen. Durch regionale Social-Media-Reichweite sehen diese Fachkräfte Ihre Mitarbeiter, Ihre Kultur und bewerben sich direkt bei Ihnen.<br><br>

          💡 <strong>Alex' Empfehlung:</strong> Kombinieren Sie <strong>„Reichweite & Markenbekanntheit“</strong> immer mit <strong>„Organische Neukundengewinnung“</strong> oder <strong>„Employer Branding / Mitarbeitergewinnung“</strong>.
        </div>
      `,
      pills: [
        { text: '✓ „Reichweite & Markenbekanntheit“ auswählen', action: (apply) => apply('sm_ziele', 'Reichweite & Markenbekanntheit') },
        { text: '✓ „Organische Neukundengewinnung“ auswählen', action: (apply) => apply('sm_ziele', 'Organische Neukundengewinnung') },
        { text: '✓ „Employer Branding / Mitarbeitergewinnung“ auswählen', action: (apply) => apply('sm_ziele', 'Employer Branding / Mitarbeitergewinnung') }
      ]
    },

    // 🌐 Webseiten-Typ: Website vs. Web App vs. Shop (web_typ / Frage 1)
    {
      id: 'web_typ_auswahl',
      sectionId: 'web_typ',
      keywords: [
        'unterschied website web app', 'webseite oder web app', 'brauche ich eine web app',
        'was ist eine web app', 'was brauche ich für eine seite', 'onlineshop oder website',
        'relaunch oder neu', 'portal oder webseite'
      ],
      title: '🌐 Frage {num}: Unternehmensseite, Web-App oder Online-Shop?',
      answerHtml: `
        <div style="line-height:1.65;font-size:12.5px;">
          <strong>Die Wahl des richtigen Produkts spart Ihnen unnötige Kosten und Fehlentwicklungen:</strong><br><br>

          • <strong>Unternehmensseite / Landingpage:</strong> Präsentiert Ihre Leistungen, stärkt Ihr Image und verwandelt Besucher in planbare Kundenanfragen (Leads). Ideal für 90% aller Dienstleister, Handwerker und Kanzleien.<br>
          • <strong>Web App / Kundenportal:</strong> Wenn Kunden sich einloggen sollen, eigene Verträge/Projekte einsehen, Daten hochladen oder interaktive Online-Rechner nutzen sollen.<br>
          • <strong>Online-Shop (E-Commerce):</strong> Wenn Sie physische oder digitale Waren direkt mit Warenkorb und Sofort-Zahlung (Stripe, PayPal) verkaufen wollen.<br><br>

          💡 <strong>Alex' Empfehlung:</strong> Wenn Sie bestehende Kundenanfragen steigern möchten, wählen Sie <strong>„Unternehmensseite“</strong> (oder <strong>„Relaunch bestehende Website“</strong>).
        </div>
      `,
      pills: [
        { text: '✓ „Unternehmensseite“ auswählen', action: (apply) => apply('web_typ', 'Unternehmensseite') },
        { text: '✓ „Web App / SaaS-Plattform“ auswählen', action: (apply) => apply('web_typ', 'Web App / SaaS-Plattform') },
        { text: '✓ „Relaunch bestehende Website“ auswählen', action: (apply) => apply('web_typ', 'Relaunch bestehende Website') }
      ]
    },

    // 🌐 Hauptziel der Website (web_ziel / Frage 2)
    {
      id: 'web_ziel_auswahl',
      sectionId: 'web_ziel',
      keywords: [
        'wie gewinne ich leads', 'qualifizierte anfragen', 'was bringt am meisten kunden',
        'wie funktioniert lead generierung', 'mehr kunden über website', 'hauptziel website'
      ],
      title: '🎯 Frage {num}: Welches Hauptziel bringt Ihnen wirtschaftlich am meisten?',
      answerHtml: `
        <div style="line-height:1.65;font-size:12.5px;">
          <strong>Eine Website darf kein digitaler Staubfänger sein – sie muss messbar Umsatz bringen.</strong><br><br>

          Die beiden profitabelsten Ziele im Mittelstand:<br>
          1. <strong>Neukunden & Leads gewinnen:</strong> Besucher finden über Google zu Ihnen, verstehen Ihr Angebot sofort und fordern ein Angebot an oder buchen ein Erstgespräch.<br>
          2. <strong>Bewerber ansprechen (Recruiting):</strong> Qualifizierte Mitarbeiter bewerben sich über ein 60-Sekunden-Bewerbungsformular direkt vom Smartphone aus.<br><br>

          💡 <strong>Alex' Empfehlung:</strong> Wählen Sie <strong>„Neukunden & Leads gewinnen“</strong> als Priorität #1, ergänzt durch <strong>„Markenauftritt & Vertrauen stärken“</strong>!
        </div>
      `,
      pills: [
        { text: '✓ „Neukunden & Leads gewinnen“ auswählen', action: (apply) => apply('web_ziel', 'Neukunden & Leads gewinnen') },
        { text: '✓ „Markenauftritt & Vertrauen stärken“ auswählen', action: (apply) => apply('web_ziel', 'Markenauftritt & Vertrauen stärken') },
        { text: '✓ „Bewerber ansprechen (Recruiting)“ auswählen', action: (apply) => apply('web_ziel', 'Bewerber ansprechen (Recruiting)') }
      ]
    },

    // 🌐 Gewünschte Seiten (web_seiten / Frage 4)
    {
      id: 'web_seiten_auswahl',
      sectionId: 'web_seiten',
      keywords: [
        'welche seiten brauche ich', 'welche seiten', 'reicht eine onepage', 'reicht eine landingpage',
        'brauche ich einen blog', 'wie viele unterseiten', 'welche unterseiten'
      ],
      title: '📑 Frage {num}: Welche Unterseiten werden wirklich benötigt?',
      answerHtml: `
        <div style="line-height:1.65;font-size:12.5px;">
          <strong>Weniger ist oft mehr – aber diese Seiten sind für Google-Rankings und Vertrauen unverzichtbar:</strong><br><br>

          • <strong>Startseite:</strong> Der erste Eindruck mit klarer Positionierung, Nutzenversprechen und Kontakt-Aufruf.<br>
          • <strong>Individuelle Leistungsseiten:</strong> Jede Ihrer Hauptleistungen braucht eine eigene Seite – nur so ranken Sie bei Google auf Seite 1 für spezifische Suchanfragen!<br>
          • <strong>Über uns / Team:</strong> Die am zweithäufigsten geklickte Seite. Kunden wollen die Gesichter hinter dem Unternehmen sehen.<br>
          • <strong>Portfolio / Referenzen:</strong> Echte Kundenprojekte schaffen sofortige Kaufsicherheit.<br><br>

          💡 <strong>Brauche ich einen Blog?</strong> Nur, wenn Sie monatlich Zeit haben, Fachbeiträge zu schreiben. Falls nicht, lassen Sie ihn weg – eine verwaiste Blogseite schadet mehr als sie nützt.
        </div>
      `,
      pills: [
        { text: '✓ „Startseite“ auswählen', action: (apply) => apply('web_seiten', 'Startseite') },
        { text: '✓ „Leistungsseiten“ auswählen', action: (apply) => apply('web_seiten', 'Leistungsseiten') },
        { text: '✓ „Über uns“ auswählen', action: (apply) => apply('web_seiten', 'Über uns') },
        { text: '✓ „Portfolio / Referenzen“ auswählen', action: (apply) => apply('web_seiten', 'Portfolio / Referenzen') }
      ]
    },

    // 🌐 Design & Stil (web_design / Frage 5)
    {
      id: 'web_design_auswahl',
      sectionId: 'web_design',
      keywords: [
        'welches design', 'habe kein logo', 'habe keine farben', 'designstil',
        'dark tech oder clean', 'welcher stil passt', 'welches design passt'
      ],
      title: '🎨 Frage {num}: Welcher Design-Stil passt zu Ihrem Betrieb?',
      answerHtml: `
        <div style="line-height:1.65;font-size:12.5px;">
          <strong>Das Design transportiert Ihre Preisklasse und Qualität innerhalb von 0,05 Sekunden:</strong><br><br>

          • <strong>Modern & Clean:</strong> Helle Farben, klare Typografie, viel Weißraum. Ideal für Kanzleien, Ärzte, Therapeuten, Dienstleister.<br>
          • <strong>Dark Tech & High-End:</strong> Dunkler Hintergrund mit dezentem Cyan/Grün-Glow (wie das Nexvia-Design). Perfekt für Software, IT, innovative Handwerksbetriebe und zukunftsorientierte Marken.<br>
          • <strong>Seriös & Corporate:</strong> Klassische Eleganz, gedeckte Töne für Industrie und Finanzen.<br><br>

          💡 <strong>Sie haben noch kein Logo oder Farbkonzept?</strong> Kein Problem! Kreuzen Sie einfach Ihren Wunschstil an – Nexvia entwickelt bei Bedarf ein harmonisches, professionelles Branding für Sie.
        </div>
      `,
      pills: [
        { text: '✓ „Modern & Clean“ auswählen', action: (apply) => apply('web_design', 'Modern & Clean') },
        { text: '✓ „Dark Tech & High-End“ auswählen', action: (apply) => apply('web_design', 'Dark Tech & High-End') },
        { text: '✓ „Seriös & Corporate“ auswählen', action: (apply) => apply('web_design', 'Seriös & Corporate') }
      ]
    },

    // 🌐 Spezielle Funktionen & Kalender (web_funktionen / Frage 6)
    {
      id: 'web_funktionen_auswahl',
      sectionId: 'web_funktionen',
      keywords: [
        'wie funktioniert online termin', 'online kalender', 'terminbuchung', 'brauche ich einen rechner',
        'crm anbindung', 'online bezahlung', 'preisrechner', 'schnittstelle crm'
      ],
      title: '⚡ Frage {num}: Welche technischen Funktionen lohnen sich?',
      answerHtml: `
        <div style="line-height:1.65;font-size:12.5px;">
          <strong>Zusatzfunktionen automatisieren zeitraubende Routinearbeiten:</strong><br><br>

          • <strong>Online-Terminkalender:</strong> Kunden buchen Termine direkt auf der Website. Keine 5 E-Mails mehr hin und her! Termine landen automatisch in Ihrem Google- oder Outlook-Kalender.<br>
          • <strong>Kundenportal / Login:</strong> Ermöglicht Kunden den geschützten Zugriff auf Dokumente, Rechnungen oder Status-Updates.<br>
          • <strong>Schnittstelle zu CRM:</strong> Anfragen landen direkt in Ihrem Kundensystem ohne manuelles Abtippen.<br><br>

          💡 <strong>Alex' Empfehlung:</strong> Ein Online-Terminkalender rechnet sich ab dem ersten Monat durch die gewonnene Zeit!
        </div>
      `,
      pills: [
        { text: '✓ „Online-Terminkalender / Buchung“ auswählen', action: (apply) => apply('web_funktionen', 'Online-Terminkalender / Buchung') },
        { text: '✓ „Kundenportal / Login-Bereich“ auswählen', action: (apply) => apply('web_funktionen', 'Kundenportal / Login-Bereich') },
        { text: '✓ „Schnittstelle zu CRM / ERP“ auswählen', action: (apply) => apply('web_funktionen', 'Schnittstelle zu CRM / ERP') }
      ]
    },

    // 📱 Social Media Plattformen (sm_plattformen / Frage 9)
    {
      id: 'sm_plattformen_auswahl',
      sectionId: 'sm_plattformen',
      keywords: [
        'welche plattform', 'lohnt sich tiktok', 'instagram oder linkedin', 'welches netzwerk',
        'wo soll ich starten', 'plattformen social media', 'welche netzwerke'
      ],
      title: '📲 Frage {num}: Welche Social-Media-Plattform passt am besten zu Ihnen?',
      answerHtml: `
        <div style="line-height:1.65;font-size:12.5px;">
          <strong>Fokussieren Sie sich auf die Plattformen, auf denen Ihre echten Entscheider unterwegs sind:</strong><br><br>

          • <strong>Instagram:</strong> Der Spitzenreiter für regionale Bekanntheit, Handwerk, Gastronomie, Dienstleistung, Reels und Mitarbeitergewinnung.<br>
          • <strong>LinkedIn:</strong> Das #1 B2B-Netzwerk für Firmenkunden, Kanzleien, Industrie und gehobene Fachkräfte.<br>
          • <strong>TikTok:</strong> Perfekt für extrem schnelle organische Reichweite und Azubi-Recruiting.<br><br>

          💡 <strong>Alex' Empfehlung:</strong> Für 90% aller Unternehmen ist die Kombination aus <strong>Instagram + LinkedIn</strong> der absolute Erfolgsgarant.
        </div>
      `,
      pills: [
        { text: '✓ „Instagram“ auswählen', action: (apply) => apply('sm_plattformen', 'Instagram') },
        { text: '✓ „LinkedIn“ auswählen', action: (apply) => apply('sm_plattformen', 'LinkedIn') },
        { text: '✓ „TikTok“ auswählen', action: (apply) => apply('sm_plattformen', 'TikTok') }
      ]
    },

    // 📱 Social Media Leistungen (sm_leistungen / Frage 10)
    {
      id: 'sm_leistungen_auswahl',
      sectionId: 'sm_leistungen',
      keywords: [
        'content oder ads', 'was sind performance ads', 'lohnen sich werbeanzeigen',
        'account management was ist das', 'vollbetreuung social media', 'was bringen ads'
      ],
      title: '🚀 Frage {num}: Content-Creation vs. Performance Ads',
      answerHtml: `
        <div style="line-height:1.65;font-size:12.5px;">
          <strong>Zwei Seiten derselben Medaille für maximales Wachstum:</strong><br><br>

          • <strong>Content-Creation (Organisch):</strong> Hochwertige Beiträge, Reels und Karussells bauen langfristiges Vertrauen, Markenbekanntheit und Follower auf.<br>
          • <strong>Performance Ads (Bezahlte Werbeanzeigen):</strong> Werden millimetergenau nur an Ihre Wunschzielgruppe in Ihrer Region ausgespielt. Liefert sofort messbare Anfragen und Bewerbungen ab Tag 1!<br><br>

          💡 <strong>Alex' Empfehlung:</strong> Wer schnell Mitarbeiter oder Neukunden braucht, wählt <strong>„Performance Ads (Meta / LinkedIn)“</strong> in Kombination mit <strong>„Content-Creation“</strong>.
        </div>
      `,
      pills: [
        { text: '✓ „Content-Creation (Reels, Karussells, Posts)“ auswählen', action: (apply) => apply('sm_leistungen', 'Content-Creation (Reels, Karussells, Posts)') },
        { text: '✓ „Performance Ads (Meta / LinkedIn)“ auswählen', action: (apply) => apply('sm_leistungen', 'Performance Ads (Meta / LinkedIn)') },
        { text: '✓ „Ganzheitliches Account-Management“ auswählen', action: (apply) => apply('sm_leistungen', 'Ganzheitliches Account-Management') }
      ]
    },

    // 📱 Social Media Material (sm_material / Frage 12)
    {
      id: 'sm_material_auswahl',
      sectionId: 'sm_material',
      keywords: [
        'habe keine fotos', 'kein videomaterial', 'keine videos', 'muss ich vor die kamera',
        'habe kein material', 'start bei null', 'keine fotos vorhanden'
      ],
      title: '📸 Frage {num}: Sie haben noch keine professionellen Fotos oder Videos?',
      answerHtml: `
        <div style="line-height:1.65;font-size:12.5px;">
          <strong>Überhaupt kein Problem – die meisten unserer Kunden starten genau an diesem Punkt!</strong><br><br>

          Sie müssen sich nicht vor die Kamera stellen und kein teures Studio mieten:<br>
          • Nexvia erstellt professionelle Grafiken, animierte Erklär-Posts, Vorlagen und Brand-Designs schlüsselfertig.<br>
          • Wenn Sie einfache Schnappschüsse mit dem Smartphone machen (z.B. Baustellen, Arbeitsplatz, Vorher-Nachher), schneidet unser Schnitt-Team daraus hochwertige Kurzvideos (Reels).<br><br>

          💡 <strong>Alex' Empfehlung:</strong> Wählen Sie <strong>„Komplett bei 0 starten (Nexvia erstellt alles)“</strong> oder <strong>„Vorlagen & Templates gewünscht“</strong>!
        </div>
      `,
      pills: [
        { text: '✓ „Komplett bei 0 starten“ auswählen', action: (apply) => apply('sm_material', 'Komplett bei 0 starten (Nexvia erstellt alles)') },
        { text: '✓ „Vorlagen & Templates gewünscht“ auswählen', action: (apply) => apply('sm_material', 'Vorlagen & Templates gewünscht') },
        { text: '✓ „Eigenes Material vorhanden“ auswählen', action: (apply) => apply('sm_material', 'Eigenes Foto- / Videomaterial vorhanden') }
      ]
    },

    // ⚙️ Automations-Bereiche (auto_bereiche / Frage 14)
    {
      id: 'auto_bereiche_auswahl',
      sectionId: 'auto_bereiche',
      keywords: [
        'was als erstes automatisieren', 'wo anfangen bei automatisierung', 'welcher bereich lohnt sich',
        'welche prozesse automatisieren', 'zeitfresser stoppen', 'automatisierung einstieg'
      ],
      title: '⚙️ Frage {num}: Welche Prozesse sollten Sie als Erstes automatisieren?',
      answerHtml: `
        <div style="line-height:1.65;font-size:12.5px;">
          <strong>Starten Sie dort, wo Ihre Mitarbeiter jede Woche die meiste Zeit mit manuellem Copy-Paste verschwenden:</strong><br><br>

          1. <strong>Vertrieb & CRM:</strong> Neue Website-Anfragen automatisch im CRM anlegen, Vertriebsmitarbeiter per WhatsApp/Push alarmieren und Kunden sofort eine automatisierte Vorab-Bestätigung senden.<br>
          2. <strong>E-Mail-Postfach:</strong> E-Mails automatisch kategorisieren, Rechnungen extrahieren und Standardanfragen vorbereiten.<br>
          3. <strong>Rechnungsstellung & vorbereitende Buchhaltung:</strong> Aus erledigten Aufträgen automatisch Rechnungen erzeugen und an sevdesk/lexoffice/Datev übergeben.<br><br>

          💡 <strong>Alex' Empfehlung:</strong> Wählen Sie die 2–3 Bereiche aus, die Ihnen heute das meiste Kopfzerbrechen bereiten.
        </div>
      `,
      pills: [
        { text: '✓ „Vertrieb & Lead-Management (CRM)“ auswählen', action: (apply) => apply('auto_bereiche', 'Vertrieb & Lead-Management (CRM)') },
        { text: '✓ „E-Mail- & Posteingangs-Workflows“ auswählen', action: (apply) => apply('auto_bereiche', 'E-Mail- & Posteingangs-Workflows') },
        { text: '✓ „Rechnungsstellung & Buchhaltung“ auswählen', action: (apply) => apply('auto_bereiche', 'Rechnungsstellung & vorbereitende Buchhaltung') }
      ]
    },

    // ⚙️ Software & Tools Anbindung (auto_tools / Frage 16)
    {
      id: 'auto_tools_auswahl',
      sectionId: 'auto_tools',
      keywords: [
        'geht datev', 'datev anbinden', 'sevdesk anbinden', 'lexoffice synchronisieren',
        'mein tool ist nicht dabei', 'schnittstelle möglich', 'crm schnittstelle', 'kann man tools verbinden'
      ],
      title: '🔌 Frage {num}: Können Ihre bestehenden Programme angebunden werden?',
      answerHtml: `
        <div style="line-height:1.65;font-size:12.5px;">
          <strong>Ja, zu 100%! Nexvia verbindet Ihre bestehende Softwarelandschaft nahtlos.</strong><br><br>

          Fast jedes moderne Cloud- oder Server-Tool verfügt über eine sogenannte REST-API:<br>
          • <strong>Buchhaltung:</strong> Datev, Sevdesk, Lexoffice.<br>
          • <strong>CRM:</strong> HubSpot, Salesforce, Pipedrive.<br>
          • <strong>Zahlung:</strong> Stripe, PayPal.<br><br>

          💡 <strong>Ihr Tool ist nicht in der Liste?</strong> Kein Problem! Notieren Sie den Namen einfach unten im Textfeld. Wir prüfen die Schnittstelle kostenlos für Sie und binden sie an.
        </div>
      `,
      pills: [
        { text: '✓ „Sevdesk / Lexoffice“ auswählen', action: (apply) => apply('auto_tools', 'Sevdesk / Lexoffice') },
        { text: '✓ „Datev“ auswählen', action: (apply) => apply('auto_tools', 'Datev') },
        { text: '✓ „Eigene Branchensoftware / API“ auswählen', action: (apply) => apply('auto_tools', 'Eigene Branchensoftware / API') }
      ]
    },

    // ⚙️ Automationsgrad & Fehlergefahr (auto_grad / Frage 19)
    {
      id: 'auto_grad_auswahl',
      sectionId: 'auto_grad',
      keywords: [
        'was wenn fehler passiert', 'ist zero touch sicher', 'was ist human in the loop',
        'vollautomatisch gefährlich', 'fehlergefahr automatisierung', 'kann das schiefgehen'
      ],
      title: '🛡️ Frage {num}: Zero-Touch vs. Human-in-the-Loop – Wie sicher ist das?',
      answerHtml: `
        <div style="line-height:1.65;font-size:12.5px;">
          <strong>Sie müssen bei Automatisierung niemals die Kontrolle aus der Hand geben:</strong><br><br>

          • <strong>Vollautomatisiert (Zero-Touch):</strong> Ideal für unkritische Standardroutinen ohne Fehlerrisiko (z.B. Kontaktanfrage ins CRM eintragen, Benachrichtigung senden, Kalender synchronisieren).<br>
          • <strong>Teilautomatisiert (Human-in-the-Loop):</strong> Die Automation bereitet den aufwendigen Teil vor (z.B. fertiger E-Mail-Entwurf oder fertige Rechnung), aber ein Mensch klickt einmal auf „Freigeben / Senden“.<br><br>

          💡 <strong>Alex' Empfehlung:</strong> Für den Start ist <strong>„Teilautomatisiert mit menschlicher Freigabe (Human-in-the-Loop)“</strong> ideal, um Vertrauen in das System aufzubauen.
        </div>
      `,
      pills: [
        { text: '✓ „Human-in-the-Loop (mit Freigabe)“ auswählen', action: (apply) => apply('auto_grad', 'Teilautomatisiert mit menschlicher Freigabe (Human-in-the-Loop)') },
        { text: '✓ „Zero-Touch (vollautomatisch)“ auswählen', action: (apply) => apply('auto_grad', 'Vollautomatisiert im Hintergrund (Zero-Touch)') },
        { text: '✓ „Hybrides Modell“ auswählen', action: (apply) => apply('auto_grad', 'Hybrides Modell je nach Sensibilität der Daten') }
      ]
    },

    // 🤖 KI-Agent Zugriffsrechte & Datenschutz (agent_zugriff / Frage 26)
    {
      id: 'agent_zugriff_auswahl',
      sectionId: 'agent_zugriff',
      keywords: [
        'können mitarbeiter alles sehen', 'geheime chef daten', 'rollen und rechte',
        'sehen mitarbeiter verträge', 'zugriffsrechte ki', 'vertrauliche daten mitarbeiter'
      ],
      title: '🔒 Frage {num}: Können Mitarbeiter vertrauliche Firmendaten in der KI sehen?',
      answerHtml: `
        <div style="line-height:1.65;font-size:12.5px;">
          <strong>Klares NEIN – sensible Firmendaten bleiben absolut geschützt!</strong><br><br>

          Nexvia richtet ein präzises <strong>Rollen- und Rechtekonzept</strong> für Sie ein:<br>
          • Vertriebsmitarbeiter können z.B. alle Produktkataloge, Preise und Handbücher abfragen – haben aber 0 Zugriff auf Gehaltslisten, Bilanzen oder Personalakten.<br>
          • Die Geschäftsleitung hat vollen Zugriff auf strategische Kennzahlen, Analysen und Management-Berichte.<br>
          • Jeder Zugriff wird protokolliert und erfüllt höchste Compliance-Standards.
        </div>
      `,
      pills: [
        { text: '✓ „Detailliertes Rollen- und Rechtekonzept“ auswählen', action: (apply) => apply('agent_zugriff', 'Detailliertes Rollen- und Rechtekonzept erforderlich') },
        { text: '✓ „Nur Geschäftsführung“ auswählen', action: (apply) => apply('agent_zugriff', 'Nur Geschäftsführung / Führungskräfte') },
        { text: '✓ „Gesamte Belegschaft“ auswählen', action: (apply) => apply('agent_zugriff', 'Gesamte Belegschaft') }
      ]
    },

    // 🤖 KI-Agent Hardware & Anschaffung (agent_hardware / Frage 25)
    {
      id: 'agent_hardware_auswahl',
      sectionId: 'agent_hardware',
      keywords: [
        'brauche ich teure server', 'welche hardware brauche ich', 'welche server für ki',
        'reicht ein mac', 'gpu nötig', 'hardware anschaffung'
      ],
      title: '🖥️ Frage {num}: Welche Hardware wird für einen lokalen KI-Agenten benötigt?',
      answerHtml: `
        <div style="line-height:1.65;font-size:12.5px;">
          <strong>Sie müssen keine teuren Großserver für zehntausende Euro anschaffen!</strong><br><br>

          Dank modernster Open-Source-Modelle genügen heute oft bereits:<br>
          • Ein bestehender Büro-Server oder eine moderne Workstation mit NVIDIA-GPU.<br>
          • Oder ein kompakter Apple Mac Studio (extrem energieeffizient und schnell für lokale KI).<br><br>

          💡 <strong>Alex' Empfehlung:</strong> Wählen Sie <strong>„Cloud-Testinstanz vorab gewünscht“</strong> oder <strong>„Hardware-Empfehlung durch Nexvia“</strong> – so können Sie das System risikolos ausprobieren, bevor Sie investieren!
        </div>
      `,
      pills: [
        { text: '✓ „Cloud-Testinstanz vorab gewünscht“ auswählen', action: (apply) => apply('agent_hardware', 'Cloud-Testinstanz vorab gewünscht') },
        { text: '✓ „Hardware-Empfehlung durch Nexvia“ auswählen', action: (apply) => apply('agent_hardware', 'Hardware-Empfehlung & Beschaffung durch Nexvia gewünscht') },
        { text: '✓ „Bestehende Server vorhanden“ auswählen', action: (apply) => apply('agent_hardware', 'Bestehende Büro-Server / Workstations vorhanden') }
      ]
    },

    // 💰 Budget-Orientierung (budget / Frage 28)
    {
      id: 'budget_beratung',
      sectionId: 'budget',
      keywords: [
        'was kostet das ungefähr', 'welches budget ist realistisch', 'wie viel geld',
        'kosten webseite', 'preise nexvia', 'was kostet ein ki agent', 'budget rahmen'
      ],
      title: '💰 Frage {num}: Welches Budget ist realistisch?',
      answerHtml: `
        <div style="line-height:1.65;font-size:12.5px;">
          <strong>Transparente Orientierung ohne versteckte Kosten:</strong><br><br>

          • <strong>1.500 – 3.000 €:</strong> Ideal für zielgerichtete High-End Landingpages, Relaunches kleinerer Websites oder fokussierte E-Mail-/CRM-Automationen.<br>
          • <strong>3.000 – 6.000 €:</strong> Der bewährte Standard für vollständige Unternehmensauftritte mit Unterseiten, Online-Terminkalender, Social-Media-Setup oder lokale RAG-Assistenten.<br>
          • <strong>6.000 – 12.000 €+:</strong> Für komplexe Webportale mit Kunden-Logins, On-Premise KI-Server-Architekturen oder unternehmensweite Automations-Pipelines.<br><br>

          💡 <strong>Unverbindlich:</strong> Ihre Angabe dient nur als Orientierung. Nexvia erstellt Ihnen ein faires, maßgeschneidertes Festpreis-Angebot.
        </div>
      `,
      pills: [
        { text: '✓ „1.500 – 3.000 €“ auswählen', action: (apply) => apply('budget', '1.500 – 3.000 €') },
        { text: '✓ „3.000 – 6.000 €“ auswählen', action: (apply) => apply('budget', '3.000 – 6.000 €') },
        { text: '✓ „Individuell / Noch offen“ auswählen', action: (apply) => apply('budget', 'Individuell / Noch offen') }
      ]
    },

    // ⏱️ Timeline & Dauer (timeline / Frage 29)
    {
      id: 'timeline_beratung',
      sectionId: 'timeline',
      keywords: [
        'wie lange dauert das', 'wie schnell geht die umsetzung', 'wann ist es fertig',
        'geht express', 'timeline umsetzung', 'wie schnell'
      ],
      title: '⏱️ Frage {num}: Wie schnell kann Nexvia Ihr Projekt umsetzen?',
      answerHtml: `
        <div style="line-height:1.65;font-size:12.5px;">
          <strong>Schnelle, schlüsselfertige Umsetzung ohne monatelangen Stillstand:</strong><br><br>

          • <strong>In 2–4 Wochen:</strong> Der typische Turnaround für High-End-Webseiten, Social-Media-Setups und Workflow-Pipelines.<br>
          • <strong>So schnell wie möglich:</strong> Wenn Sie eine feste Deadline haben (z.B. Messe, Neugründung, Saisonstart), priorisieren wir Ihr Projekt gerne per Express!<br><br>

          💡 <strong>Alex' Empfehlung:</strong> Wählen Sie <strong>„In 2–4 Wochen“</strong> oder <strong>„So schnell wie möglich“</strong>.
        </div>
      `,
      pills: [
        { text: '✓ „In 2–4 Wochen“ auswählen', action: (apply) => apply('timeline', 'In 2–4 Wochen') },
        { text: '✓ „So schnell wie möglich“ auswählen', action: (apply) => apply('timeline', 'So schnell wie möglich') },
        { text: '✓ „Flexibel / Kein fester Termin“ auswählen', action: (apply) => apply('timeline', 'Flexibel / Kein fester Termin') }
      ]
    }
  ];

  // ── 3. Wissensbasis aller 31 Fragen des Baukastens ────────────────────────────
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
    agent_zugriff: {
      shortExplain: 'Wer in Ihrer Firma soll auf den KI-Agenten zugreifen dürfen?',
      detail: 'Darf nur die <strong>Geschäftsführung</strong> sensible Kennzahlen abfragen, oder soll die <strong>gesamte Belegschaft</strong> Handbücher und Vorlagen durchsuchen? Mit einem <strong>Rollen- & Rechtekonzept</strong> steuern wir präzise, wer welche Dokumente sehen darf.',
      tips: 'Ein Mitarbeiter im Vertrieb sieht z.B. nur Verkaufsunterlagen, während Personalakten für ihn gesperrt bleiben.',
      quickPills: ['Kann man Rechte einschränken?', 'Können Mitarbeiter alles sehen?']
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
  let currentFocusedQuestion = null;
  let isChatOpen = false;
  let isThinking = false;

  // ── 5. Robuste Normalisierung & Fragennummer-Erkennung ─────────────────────────
  function normalizeText(str) {
    if (!str) return '';
    return str.toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

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

  // ── 6. UI Erzeugung: Pill-Button & High-End Modal ─────────────────────────────
  function injectChatWidget() {
    if (document.getElementById('alex-chat-widget')) return;

    const widget = document.createElement('div');
    widget.id = 'alex-chat-widget';
    widget.innerHTML = `
      <!-- Floating Trigger Button: Exakt wie Screenshot („Alex • KI-Problemberater“) -->
      <button id="alex-trigger-btn" type="button" onclick="window.BriefingAI.toggleChat()" aria-label="Alex • KI-Problemberater öffnen">
        <span class="alex-ping-wrap">
          <span class="alex-ping-outer"></span>
          <span class="alex-ping-inner"></span>
        </span>
        <span class="alex-bot-icon">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
        </span>
        <span class="alex-btn-label">Alex <span class="alex-accent">• KI-Problemberater</span></span>
      </button>

      <!-- Floating Chat Modal: High-End Nexvia Glassmorphism -->
      <div id="alex-chat-modal" style="display:none;" role="dialog" aria-modal="true">
        <!-- Header -->
        <div class="alex-modal-header">
          <div style="display:flex;align-items:center;gap:10px;">
            <div class="alex-modal-avatar">
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
            </div>
            <div>
              <div class="alex-modal-title">
                Alex <span class="alex-modal-badge">Nexvia KI-Berater</span>
              </div>
              <div class="alex-modal-sub">
                <span class="alex-sub-dot"></span>
                <span>Problemanalyse &amp; Empfehlung • 100% DSGVO</span>
              </div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:6px;">
            <button id="alex-reset-btn" type="button" class="alex-header-icon-btn" onclick="window.BriefingAI.resetChat()" title="Chat neustarten">
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
            </button>
            <button id="alex-close-btn" type="button" class="alex-header-icon-btn" onclick="window.BriefingAI.toggleChat(false)" title="Schließen">
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
        </div>

        <!-- Fokus-Banner (wenn eine Frage gezielt aufgerufen wurde) -->
        <div id="alex-focus-bar" class="alex-focus-bar" style="display:none;">
          <div style="display:flex;align-items:center;gap:8px;min-width:0;">
            <span class="alex-focus-num" id="alex-focus-num">Frage 1</span>
            <span class="alex-focus-title" id="alex-focus-title">...</span>
          </div>
          <button class="alex-focus-clear" onclick="window.BriefingAI.clearQuestionFocus()" title="Fokus aufheben">✕</button>
        </div>

        <!-- Chat Messages Body -->
        <div id="alex-messages" class="alex-messages-body"></div>

        <!-- Typing Indicator -->
        <div id="alex-typing" class="alex-typing" style="display:none;">
          <span class="alex-typing-dot"></span>
          <span class="alex-typing-dot" style="animation-delay:0.2s;"></span>
          <span class="alex-typing-dot" style="animation-delay:0.4s;"></span>
          <span style="font-size:11px;color:#94a3b8;margin-left:4px;">Alex analysiert Ihr Anliegen...</span>
        </div>

        <!-- Chat Input Form -->
        <form id="alex-input-form" class="alex-input-form" onsubmit="event.preventDefault(); window.BriefingAI.sendMessage();">
          <input type="text" id="alex-input-field" class="alex-input-field" placeholder="Fragen Sie mich alles (z.B. „Was bringt ein Security Agent?“)..." autocomplete="off">
          <button type="submit" id="alex-send-btn" class="alex-send-btn" title="Nachricht senden">
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
          </button>
        </form>
      </div>
    `;

    document.body.appendChild(widget);

    setTimeout(() => {
      resetChat();
    }, 100);
  }

  function resetChat() {
    const messages = document.getElementById('alex-messages');
    if (!messages) return;
    messages.innerHTML = '';
    currentFocusedQuestion = null;
    const bar = document.getElementById('alex-focus-bar');
    if (bar) bar.style.display = 'none';

    const html = `
      Hallo! Ich bin <strong>Alex</strong>, Ihr persönlicher KI-Problemberater bei Nexvia.<br><br>
      Egal ob E-Mail-Überlastung, IT-Sicherheit, Zeitmangel oder Website-Relaunch: <strong>Beschreiben Sie mir einfach kurz Ihr Anliegen oder Ihre Frage in eigenen Worten.</strong> Ich erkläre Ihnen den konkreten Nutzen und empfehle Ihnen die passende Lösung!<br><br>
      Sie können mich auch zu jeder beliebigen <strong>Fragennummer</strong> fragen (z.B. <em>„4“</em> oder <em>„Frage 4: Was bedeutet RAG?“</em>).
    `;

    const pills = [
      { text: 'Was bringt ein Security Agent?', action: () => processUserInput('was bringt ein security agent') },
      { text: 'Was bringt ein lokaler KI-Agent?', action: () => processUserInput('was bringt ein lokaler ki agent') },
      { text: 'Was bringt Automatisierung?', action: () => processUserInput('was bringt automatisierung') },
      { text: 'Fragen-Übersicht des Briefings', action: () => showQuestionsOverview() }
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
        text: 'Weitere Fragen anzeigen...',
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
    const input = document.getElementById('alex-input-field');
    if (!input) return;
    const text = input.value.trim();
    if (!text || isThinking) return;

    input.value = '';
    appendUserMessage(text);
    showTyping(true);

    setTimeout(() => {
      showTyping(false);
      processUserInput(text);
    }, 250);
  }

  function showTyping(show) {
    isThinking = show;
    const t = document.getElementById('alex-typing');
    if (t) t.style.display = show ? 'flex' : 'none';
    const msgs = document.getElementById('alex-messages');
    if (msgs && show) msgs.scrollTop = msgs.scrollHeight;
  }

  function matchesKeyword(text, kw) {
    if (!text || !kw) return false;
    if (kw.length <= 4) {
      const escaped = kw.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp('(?:^|\\s)' + escaped + '(?:$|\\s)', 'i');
      return regex.test(text);
    }
    return text.includes(kw);
  }

  /**
   * Kontextueller Matcher für Beratungs-Dilemmas (z.B. Zielgruppe, Reichweite, Domain ohne IT-Wissen)
   * Prüft bevorzugt die Frage falls angegeben, ansonsten alle Einträge
   */
  function findContextConsulting(cleanText, questionNum) {
    let targetSectionId = null;
    if (questionNum) {
      const q = getQuestionByNum(questionNum);
      if (q) targetSectionId = q.id;
    }

    // 1. Wenn Frage-Nummer angegeben: Bevorzugt Einträge für diesen Abschnitt matchen
    if (targetSectionId) {
      for (const item of CONTEXT_CONSULTING) {
        if (item.sectionId === targetSectionId) {
          const kwHit = item.keywords.some(kw => matchesKeyword(cleanText, kw));
          if (kwHit) return { item, questionNum, q: getQuestionByNum(questionNum) };
        }
      }
    }

    // 2. Globaler Match über Keywords (z.B. „was bringt mir reichweite“ ohne Fragennummer)
    for (const item of CONTEXT_CONSULTING) {
      const kwHit = item.keywords.some(kw => matchesKeyword(cleanText, kw));
      if (kwHit) {
        const q = getQuestionById(item.sectionId);
        return { item, questionNum: q ? q.num : questionNum, q };
      }
    }

    return null;
  }

  function deliverContextConsulting(match) {
    const { item, q, questionNum } = match;
    const numDisplay = q ? q.num : (questionNum || '');
    let title = item.title;
    if (numDisplay) {
      title = title.replace('{num}', numDisplay);
    } else {
      title = title.replace('Frage {num}:', '').replace('Frage {num}', '').trim();
    }

    if (q) {
      setQuestionFocus(q);
    }

    const pills = [];

    // Pill: Zu Frage springen
    if (q) {
      pills.push({
        text: `📌 Zu Frage ${q.num} im Formular springen`,
        action: () => scrollToQuestion(q.num)
      });
    }

    // Aktions-Pills aus CONTEXT_CONSULTING
    if (item.pills && item.pills.length > 0) {
      item.pills.forEach(p => {
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
      });
    }

    pills.push({
      text: 'Fragen-Übersicht',
      action: () => showQuestionsOverview()
    });

    appendBotMessage(
      `<strong>${title}</strong><br><br>${item.answerHtml}`,
      pills
    );
  }

  function processUserInput(rawText) {
    const clean = normalizeText(rawText);

    // ── STUFE 0: Reine Fragennummer-Eingabe (z.B. „4“, „Frage 4“, „#4“) ──
    const pureNumMatch = rawText.trim().match(/^(?:frage|nr\.?|#)?\s*(\d{1,2})$/i);
    if (pureNumMatch && pureNumMatch[1]) {
      const num = parseInt(pureNumMatch[1], 10);
      const q = getQuestionByNum(num);
      if (q) {
        setQuestionFocus(q);
        explainQuestion(q, rawText);
        return;
      } else {
        appendBotMessage(`Frage ${num} gibt es in Ihrem individuellen Briefing leider nicht. Ihr Formular umfasst die Fragen 1 bis ${activeQuestions.length}.`);
        return;
      }
    }

    // Frage-Nummer extrahieren falls vorhanden (z.B. bei „Frage 3 woher weiß ich...“)
    const questionNum = extractQuestionNumber(rawText);

    // ── STUFE 1: Kontextuelle Fragen- & Dilemma-Beratung ──
    // Matcht Fragen wie:
    // • „frage 3 woher weiß ich welche kunden ich ansprechen wil“
    // • „frage 7 ich habe eine webseite aber ich kenne mich da nich aus was empieflst du“
    // • „Frage 10 was bringt mir reichweite“
    // • oder ohne Fragennummer: „was bringt mir reichweite“, „welche kunden ansprechen“
    const matchedContext = findContextConsulting(clean, questionNum);
    if (matchedContext) {
      deliverContextConsulting(matchedContext);
      return;
    }

    // ── STUFE 2: Sektoren- & Nutzen-Beratung („Was bringt mir ein Security Agent?“) ──
    const matchedSector = findSectorConsulting(clean);
    if (matchedSector) {
      deliverSectorConsulting(matchedSector);
      return;
    }

    // ── STUFE 3: Fragennummer-Erklärung wenn keine spezifische Dilemma-Frage erkannt wurde ──
    if (questionNum) {
      const q = getQuestionByNum(questionNum);
      if (q) {
        setQuestionFocus(q);
        explainQuestion(q, rawText);
        return;
      }
    }

    // ── STUFE 4: Nachfragen zur aktuell fokussierten Frage ──
    if (currentFocusedQuestion) {
      const matchedOpt = currentFocusedQuestion.options.find(opt => clean.includes(normalizeText(opt).slice(0, 8)));
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

    // ── STUFE 5: Allgemeine Begriffserklärungen (RAG, Zero-Touch, On-Premise etc.) ──
    const matchedGeneral = GENERAL_KNOWLEDGE.find(item =>
      item.keywords.some(kw => matchesKeyword(clean, kw))
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

    // ── STUFE 6: Schlagwörter gegen Fragen & Optionen matchen ──
    const matchedCategoryQuestion = activeQuestions.find(q =>
      clean.includes(normalizeText(q.title)) ||
      (q.subtitle && clean.includes(normalizeText(q.subtitle).slice(0, 10))) ||
      q.options.some(o => clean.includes(normalizeText(o).slice(0, 10)))
    );

    if (matchedCategoryQuestion) {
      setQuestionFocus(matchedCategoryQuestion);
      explainQuestion(matchedCategoryQuestion, rawText);
      return;
    }

    // ── STUFE 7: Begrüßungen ──
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

    // ── STUFE 8: Fallback mit klaren Aktionsvorschlägen ──
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
   * Intelligenter Matcher für Sektorenberatung
   * Erkennt auch Tippfehler wie „ageten“ oder „securit“
   */
  function findSectorConsulting(cleanText) {
    for (const sector of SECTOR_CONSULTING) {
      const keywordHit = sector.keywords.some(kw => matchesKeyword(cleanText, kw));
      if (keywordHit) {
        return sector;
      }
    }
    return null;
  }

  function deliverSectorConsulting(sector) {
    const pills = [];

    // Pill: Direkt im Formular ankreuzen
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

    if (sector.pills) {
      sector.pills.forEach(p => {
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
    const targetNorm = normalizeText(optionText);

    chips.forEach(chip => {
      const chipNorm = normalizeText(chip.textContent);
      if (
        chipNorm === targetNorm ||
        chipNorm.includes(targetNorm) ||
        targetNorm.includes(chipNorm) ||
        (chipNorm.slice(0, 10) === targetNorm.slice(0, 10) && chipNorm.length > 5)
      ) {
        if (!chip.classList.contains('active')) {
          chip.click();
        }
        found = true;
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
      appendBotMessage(`Option „${escHtml(optionText)}“ konnte im Formular nicht automatisch zugeordnet werden.`);
    }
  }

  // ── 10. Fokus & Steuerung ────────────────────────────────────────────────────
  function setQuestionFocus(q) {
    currentFocusedQuestion = q;
    const bar = document.getElementById('alex-focus-bar');
    const numEl = document.getElementById('alex-focus-num');
    const titleEl = document.getElementById('alex-focus-title');
    if (bar && numEl && titleEl) {
      numEl.textContent = `Frage ${q.num}`;
      titleEl.textContent = q.title;
      bar.style.display = 'flex';
    }
  }

  function clearQuestionFocus() {
    currentFocusedQuestion = null;
    const bar = document.getElementById('alex-focus-bar');
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
    const modal = document.getElementById('alex-chat-modal');
    if (!modal) return;

    isChatOpen = (typeof forceState === 'boolean') ? forceState : (modal.style.display === 'none');
    modal.style.display = isChatOpen ? 'flex' : 'none';

    if (isChatOpen) {
      setTimeout(() => {
        const input = document.getElementById('alex-input-field');
        if (input) input.focus();
        const msgs = document.getElementById('alex-messages');
        if (msgs) msgs.scrollTop = msgs.scrollHeight;
      }, 50);
    }
  }

  // ── 11. UI Message Rendering ─────────────────────────────────────────────────
  function appendUserMessage(text) {
    const messages = document.getElementById('alex-messages');
    if (!messages) return;

    const el = document.createElement('div');
    el.className = 'alex-msg alex-msg-user';
    el.innerHTML = `
      <div class="alex-msg-bubble">${escHtml(text)}</div>
    `;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
  }

  function appendBotMessage(html, pills = []) {
    const messages = document.getElementById('alex-messages');
    if (!messages) return;

    const el = document.createElement('div');
    el.className = 'alex-msg alex-msg-bot';

    let pillsHtml = '';
    if (pills && pills.length > 0) {
      pillsHtml = `
        <div class="alex-pills-wrap">
          ${pills.map((p, idx) => `<button type="button" class="alex-pill-btn" data-pill-idx="${idx}">${escHtml(p.text)}</button>`).join('')}
        </div>
      `;
    }

    el.innerHTML = `
      <div class="alex-msg-avatar">
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
      </div>
      <div class="alex-msg-content">
        <div class="alex-msg-bubble">${html}</div>
        ${pillsHtml}
      </div>
    `;

    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;

    if (pills && pills.length > 0) {
      const btns = el.querySelectorAll('.alex-pill-btn');
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

  // ── 12. Globale Schnittstelle ────────────────────────────────────────────────
  window.BriefingAI = {
    init: injectChatWidget,
    toggleChat: toggleChat,
    resetChat: resetChat,
    openHelpForQuestion: openHelpForQuestion,
    clearQuestionFocus: clearQuestionFocus,
    sendMessage: sendMessage,
    ask: processUserInput,
    applyOptionToForm: applyOptionToForm,
    syncActiveSections: function(sectionsList) {
      activeQuestions = sectionsList || [];
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    injectChatWidget();
  });

})();
