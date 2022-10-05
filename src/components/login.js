import { onNavigate } from '../main.js';
import { signInUser } from '../firebase/connection.js';

export const login = () => {
  const containerLogin = document.createElement('section');
  containerLogin.classList.add('container');

  const titleLo = document.createElement('h1');
  titleLo.textContent = 'ENJOY THE WORLD';
  titleLo.className= 'titleLo'

  const imgLogin = document.createElement('img');
  imgLogin.className = 'img-login';
  imgLogin.src = '/img/logo.png';
  imgLogin.alt = 'logo';

  const loginForm = document.createElement('section');
  loginForm.classList.add('form-login');

  const loginEmail = document.createElement('input');
  loginEmail.classList.add('inputE');
  loginEmail.setAttribute('type', 'email');
  loginEmail.setAttribute('id', 'email-login');
  loginEmail.setAttribute('placeholder', 'E-mail');
  loginEmail.setAttribute('required', '');

  const loginPassword = document.createElement('input');
  loginPassword.classList.add('inputL');
  loginPassword.setAttribute('type', 'password');
  loginPassword.setAttribute('id', 'password-login');
  loginPassword.setAttribute('placeholder', 'contraseña');
  loginPassword.setAttribute('required', '');

  const loginButton = document.createElement('button');
  loginButton.textContent = 'Regístrate';
  loginButton.setAttribute('class', 'button-login button');

  const question = document.createElement('h3');
  question.textContent = '¿Olvidaste tu contraseña?';

  const session = document.createElement('h3');
  session.textContent = 'Inicia sesión';

  const iniciaTusecion = document.createElement('h3');
  iniciaTusecion.textContent = 'Inicia sesión';
  iniciaTusecion.className = 'here';

  loginButton.addEventListener('click', () => {
    onNavigate('/'); // Debería dirigir al Home, muro o perfil
  });

  const errorText = document.createElement('p');
  errorText.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailL = loginEmail.value;
    const passL = loginPassword.value;
    signInUser(emailL, passL);
  });

  containerLogin.append(
    titleLo,
    imgLogin,
    loginEmail,
    loginPassword,
    loginButton,
    question,
    iniciaTusecion
  );

  return containerLogin;
};
