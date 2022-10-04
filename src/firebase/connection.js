import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js';

const firebaseConfig = {
  apiKey: 'AIzaSyB5L_8-iWK_fcuTnIWV4peHFJMmOL8v7Qo',
  authDomain: 'enjoy-the-world.firebaseapp.com',
  databaseURL: 'https://enjoy-the-world-default-rtdb.firebaseio.com',
  projectId: 'enjoy-the-world',
  storageBucket: 'enjoy-the-world.appspot.com',
  messagingSenderId: '976150175703',
  appId: '1:976150175703:web:009703b036b923ca747592',
  measurementId: 'G-R81NHVQFFX',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const createUser = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // signed in
      const user = userCredential.user;
      console.log(user);
      console.log('oh yeah');
      swal({
        title: "Genial!",
        text: "Conseguiste registrarte!",
        icon: "success",
        button: "Inicia tu viaje!",
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      // const errorMessage = error.message;
      console.log('ay no!')
      if (errorCode === "auth/email-already-in-use") {
        swal({
          title: "Por favor verifica,",
          text: "El usuario ya existe",
          icon: "error",
        });
      }
      else if (errorCode === "auth/invalid-email") {
        swal({
          title: "Ingresa un email válido, por favor.",
          text: "debe tener formato de email",
          icon: "error",
        });
      }
      else if (errorCode === "auth/weak-password") {
        swal({
          title: "Tu contraseña es muy débil!,",
          text: "Por favor usa más de seis caracteres",
          icon: "error",
        });
      }
    });
};

const signInUser = (email, password) => {
  console.log('email: ', email, 'password: ', password);
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(user, 'Signed in');
      // signed in
      const user = userCredential.user;
      //  ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};

// Detectando el estado de autenticación
onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log('In Firebase');

    const uid = user.uid;
  } else {
    console.log('Not in Firebase');
  }
});

// signOut(auth).then(() => {
//   // signout successful.
// }).catch((error) => {
//   // An error happened.
// });

// const user = auth.currentUser;
// if (user !== null) {
//   // The user object has basic properties such as display name, email, etc.
//   const displayName = user.displayName;
//   const email = user.email;
//   const photoURL = user.photoURL;
//   const emailVerified = user.emailVerified;

// The user's ID, unique to the Firebase project. Do NOT use
// this value to authenticate with your backend server, if
// you have one. Use User.getToken() instead.
//   const uid = user.uid;
// }


const provider = new GoogleAuthProvider();

const googleSignIn = () => signInWithPopup(auth, provider)
  .then((result) => {
    //la redirijo segun ejm main al wall
    window.location.pathname = '/wall';
  }).catch((error) => {
  });


export { auth, createUser, signInUser, provider, googleSignIn };

// ***1.Importar el código inicial provisto por Firebase (línea 1 y de 4 hasta 15 ) esa es la conexión con FBase y la id única de la App.
// ***2.Importar el código de autenticación, el de crear usuario y el de loguear usuario línea y el del observador 2 (getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged)
// ese se puede encontrar en la documentación como: firebase/documentos/comenzar o primeros pasos.
// ***3.Copiar el código con los métodos createUserWithEmailAndPassword y signInWithEmailAndPassword que se encuentran en esa misma página. (ambas son promesas)
// las reconocen porque tienen un .then y un .catch. Línea de 20 hasta la 41
// ***4.Pegar el código de onAuthStateChanged que aparece en la misma página, es una condicional línea 44 a 54.
// ***5.Crear variable con función flecha que crea al usuario y que engloba la promesa. se hace con el createUserWithEmailAndPassword y el signInWithEmailAndPassword.
// ***6.Crearíamos un archivo .js para la autenticación... ir a auth.js.
