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
  window.db = firebase.firestore();
  window.db.settings({ experimentalForceLongPolling: true });
  console.log("Firebase conectado correctamente en GitHub Pages.");
} catch (err) {
  console.error("Firebase no pudo iniciar: " + err.message);
}
