import { onNavigate } from '../main.js';
import { createUser } from '../firebase/connection.js';

export const register = () => {
  const containerRegister = document.createElement('section');
  containerRegister.classList.add('container');

  const title = document.createElement('h1');
  title.textContent = 'REGÍSTRATE';
  title.className = 'title';

  const imgLogin = document.createElement('img');
  imgLogin.className = 'img-login';
  imgLogin.src = '/img/logo.png';
  imgLogin.alt = 'logo';

  const registerForm = document.createElement('section');
  registerForm.classList.add('formRegister');

  const userName = document.createElement('input');
  userName.classList.add('input');
  userName.setAttribute('type', 'text');
  userName.setAttribute('id', 'userName');
  userName.setAttribute('placeholder', 'Usuario');
  userName.setAttribute('required', '');

  const registerEmail = document.createElement('input');
  registerEmail.classList.add('input');
  registerEmail.setAttribute('type', 'email');
  registerEmail.setAttribute('placeholder', 'E-mail');
  registerEmail.setAttribute('required', '');

  const registerPassword = document.createElement('input');
  registerPassword.classList.add('input');
  registerPassword.setAttribute('type', 'password');
  registerPassword.setAttribute('placeholder', 'Contraseña');
  registerPassword.setAttribute('required', '');

  const registerButton = document.createElement('button');
  registerButton.textContent = 'Inicia tu Viaje';
  registerButton.setAttribute('class', 'button');
  registerButton.id = 'registerButton';

  const question = document.createElement('h3');
  question.textContent = '¿Ya eres miembro?';
  question.classList = 'question';

  const session = document.createElement('h3');
  session.textContent = 'Inicia Sesión';
  session.className = 'here';

  registerButton.addEventListener('click', () => {
    const emailRegister = registerEmail.value;
    const passRegister = registerPassword.value;
    console.log(emailRegister, passRegister);

    const createRegister = async (email, password) => {
      ;
      try {
        createUser(email, password);
      }
      catch (error) {
        return error;
      }
    };

    createRegister(emailRegister, passRegister)
      .then(() => {
        console.log('dentroooo');
        onNavigate('/wall'); // si ya se registró que entre a muro
      })
      .catch(() => {
        console.log('fail');
        onNavigate('/register')
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
  );

  return containerRegister;
};
