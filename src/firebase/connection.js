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
  arrayUnion,
  arrayRemove,
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

// Funciones de Firebase para inicializar servicios
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

// Función crear usuario con email
const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);

// Función ingresar usuario
const signInUser = (email, password) => signInWithEmailAndPassword(auth, email, password);

// Función ingresar con Google
const provider = new GoogleAuthProvider();
const googleSignIn = () => signInWithPopup(auth, provider)
  .then(() => {
    window.location.pathname = '/wall';
  })
  .catch(() => { });

// Función crear nombre de usuario
const userProfile = (user, displayName) => updateProfile(user, { displayName });

// Función cerrar cesión
const signOff = () => signOut(auth);

// Función crear el post y enviarlo a Firestore
const createPosts = (post, likes) => {
  addDoc(collection(db, 'Posts'), {
    post,
    likes,
  });
};

// Función que crea una instantánea del documento actualizándolo con cada llamada.
const onGetPosts = (callback) => onSnapshot(collection(db, 'Posts'), callback);

// Función editar posts
const editPosts = (id) => getDoc(doc(db, 'Posts', id));

// Función eliminar post
const deletePosts = (id) => deleteDoc(doc(db, 'Posts', id));

// Función actualizar los post al editarlos
const updatePosts = (id, newText) => updateDoc(doc(db, 'Posts', id), newText);

// Función que determina el estado de conexión del usuario
onAuthStateChanged(auth, (user) => {
  if (user) {
    window.user = user;
    onNavigate('/wall');
  } else {
    onNavigate('/');
  }
});

// Función agregar like a un post
const addLikes = (id, userId) => updateDoc(doc(db, 'Posts', id), { likes: arrayUnion(userId) });

// Función retirar like a un post
const removeLikes = (id, userId) => updateDoc(doc(db, 'Posts', id), { likes: arrayRemove(userId) });

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
  addLikes,
  removeLikes,
  onAuthStateChanged,
};
