/* ============================================================
   FIREBASE KONFIG — Hier deine Firebase-Daten eintragen!
   ============================================================
   1. Geh auf: https://console.firebase.google.com
   2. Neues Projekt erstellen (z.B. "247on-briefing")
   3. Firestore Database → Erstellen → Testmodus
   4. Projekteinstellungen (Zahnrad) → Web-App hinzufügen (</> Symbol)
   5. Das Konfig-Objekt von Firebase hierher kopieren
   ============================================================ */

const firebaseConfig = {
  apiKey:            "AIzaSyAbkF6VGh2RN503WcppChh7Wqrj8uLYqVw",
  authDomain:        "test-1-48aaf.firebaseapp.com",
  projectId:         "test-1-48aaf",
  storageBucket:     "test-1-48aaf.firebasestorage.app",
  messagingSenderId: "37876402862",
  appId:             "1:37876402862:web:13cd999aff1dc07317fb3f",
  measurementId:     "G-0JE5L50DD5"
};

/* ── Firebase initialisieren ── */
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const CUSTOMERS_COL = db.collection('briefing_customers');
