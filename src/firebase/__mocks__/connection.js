// Import the functions you need from the SDKs you need
import { initializeApp, getAuth,  createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyD2v7-YRP-DRZyiKnDmrnWnp9TYTSGoliA",
  authDomain: "pruebas-f-ec13d.firebaseapp.com",
  projectId: "pruebas-f-ec13d",
  storageBucket: "pruebas-f-ec13d.appspot.com",
  messagingSenderId: "951145660608",
  appId: "1:951145660608:web:5a09e7f5ece3cffd81ad25"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const createUser= (email, password) => {
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
};

signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  export {createUser}