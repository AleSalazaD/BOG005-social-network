import { onNavigate } from '../main.js';
import { createUser } from '../firebase/connection.js';

export const register = () => {
  const containerRegister = document.createElement('section');
  containerRegister.classList.add('container');

  const imgLogin = document.createElement('img');
  imgLogin.className = 'img-login';
  imgLogin.src = '/img/logo.png';
  imgLogin.alt = 'logo';

  const title = document.createElement('h1');
  title.textContent = 'REGISTRATE';
  title.className = 'titleR';

  const registerForm = document.createElement('section');
  registerForm.classList.add('formRegister');

  const userName = document.createElement('input');
  userName.classList.add('inputName');
  userName.setAttribute('type', 'text');
  // userName.setAttribute('id', 'userName');
  userName.setAttribute('placeholder', 'User Name');
  userName.setAttribute('required', '');

  const registerEmail = document.createElement('input');
  registerEmail.classList.add('inputEmail');
  registerEmail.setAttribute('type', 'email');
  // registerEmail.setAttribute('id', 'emailRegister');
  registerEmail.setAttribute('placeholder', 'E-mail');
  registerEmail.setAttribute('required', '');

  const registerPassword = document.createElement('input');
  registerPassword.classList.add('inputPass');
  registerPassword.setAttribute('type', 'password');
  // registerPassword.setAttribute('id', 'passwordRegister');
  registerPassword.setAttribute('placeholder', 'contraseña');
  registerPassword.setAttribute('required', '');

  const registerButton = document.createElement('button');
  registerButton.textContent = 'Iniciar Sesión';
  registerButton.setAttribute('class', 'buttonRegister button');
  registerButton.setAttribute('id', 'buttonStartRegister')

  const question = document.createElement('h3');
  question.textContent = '¿Ya eres miembro?';
  question.classList = 'question';

  const session = document.createElement('h3');
  session.textContent = 'Inicia tu sesión';
  session.className = 'here';

  registerButton.addEventListener('click', () => {
    const emailR = registerEmail.value;
    const passR = registerPassword.value;
    console.log(createUser(emailR, passR));
    createUser(emailR, passR)
      .then(() => {
        console.log('dentroooo');
        onNavigate('/login'); // si ya se registreo que entre a muro
      })
      .catch(() => {});
  });

  const errorText = document.createElement('p');
  errorText.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailR = registerEmail.value;
    const passR = registerPassword.value;
    createUser(emailR, passR)
      .then(() => {
        onNavigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/email-already-in-use') {
          errorText.textContent = 'El e-mail ingresado ya existe';
        } else if (errorCode === 'auth/weak-password') {
          errorText.textContent = 'Su contraseña debe tener al menos 6 caracteres';
        } else if (errorCode === 'auth/invalid-email') {
          errorText.textContent = 'No es un e-mail válido';
        }
      });
  });

  containerRegister.append(registerForm);
  registerForm.append(
    title,
    imgLogin,
    userName,
    registerEmail,
    registerPassword,
    registerButton,
    question,
    session,
    errorText,
  );

  return containerRegister;
};
