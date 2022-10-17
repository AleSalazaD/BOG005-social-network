import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  GoogleAuthProvider,
  updateProfile,
  signOut,
} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js';
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  query,
} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js';
import { onNavigate } from '../main.js';

const firebaseConfig = {
  apiKey: 'AIzaSyB5L_8-iWK_fcuTnIWV4peHFJMmOL8v7Qo',
  authDomain: 'enjoy-the-world.firebaseapp.com',
  databaseURL: 'https://enjoy-the-world-default-rtdb.firebaseio.com',
  projectId: 'enjoy-the-world',
  storageBucket: 'enjoy-the-world.appspot.com',
  messagingSenderId: '976150175703',
  appId: '1:976150175703:web:9812817e989a64db747592',
  measurementId: 'G-DWY854X4RL',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

// función crear usuario con email
const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);

// función de ingresar usuario
const signInUser = (email, password) => signInWithEmailAndPassword(auth, email, password);

// función de ingreso con google
const provider = new GoogleAuthProvider();
const googleSignIn = () => signInWithPopup(auth, provider)
  .then(() => {
    window.location.pathname = '/wall';
  })
  .catch(() => { });

// función para crear nombre de usuario
const userProfile = (user, displayName) => updateProfile(user, { displayName });
console.log(userProfile);

// función de cerrar cesión
const signOff = () => signOut(auth);

// funcion asíncrona para crear el post y enviarlo a firestore
const createPosts = async (text) => {
  await addDoc(collection(db, 'Posts'), {
    post: text,
    like: false,
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
};

// Se crea la constante que nos permitirá postear
// recibe una función callback que ejecuta el onSnapshot.
const onGetPosts = (callback) => onSnapshot(collection(db, 'Posts'), callback);

// funcion para traer los post de firestore al muro
const postUser = () => query(collection(db, 'Posts'));

// Función para editar posts
const editPosts = (id) => getDoc(doc(db, 'Posts', id));

// Función para eliminar post
const deletePosts = (id) => deleteDoc(doc(db, 'Posts', id));

// Función para actualizar los post al editarlos
const updatePosts = (id, newText) => updateDoc(doc(db, 'Posts', id), newText);

// Revisa el estado de autenticacion(dice si estamos conectados)
onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log('Usuario Conectado');
  } else {
    console.log('No se encuentra el usuario');
  }
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    window.user = user;
    console.log(user);
    onNavigate('/wall');
  } else {
    console.log('No es user');
    onNavigate('/');
  }
});

export {
  auth,
  createUser,
  signInUser,
  googleSignIn,
  userProfile,
  signOff,
  createPosts,
  onGetPosts,
  editPosts,
  deletePosts,
  updatePosts,
  onAuthStateChanged,
  postUser,
};
