const firebaseConfig = {
  apiKey: "AIzaSyDpMZNhVOWwrwdBJiozhz1-ncupwBCqfic",
  authDomain: "polyfantechsoft.firebaseapp.com",
  projectId: "polyfantechsoft",
  storageBucket: "polyfantechsoft.firebasestorage.app",
  messagingSenderId: "237140991907",
  appId: "1:237140991907:web:da7143920dbe5e1420c416"
};

try {
  if (!firebase.apps.length) { 
    firebase.initializeApp(firebaseConfig); 
  }
  // Exportamos la base de datos al entorno global (window)
  window.db = firebase.firestore();
  window.db.settings({ experimentalForceLongPolling: true });
  console.log("Conexión a Firebase: ESTABLECIDA");
} catch (err) {
  console.error("Fallo crítico en Firebase: " + err.message);
}
