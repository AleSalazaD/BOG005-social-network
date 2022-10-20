import { onNavigate } from '../main.js';

export const welcome = () => {
  const sectionWelcome = document.createElement('section');
  sectionWelcome.id = 'section-welcome';
  sectionWelcome.className = 'container';

  const headerWelcome = document.createElement('header');
  headerWelcome.id = 'header-welcome';

  const imgWelcome = document.createElement('img');
  imgWelcome.id = 'background-welcome';
  imgWelcome.src = 'img/fondo1.PNG';
  imgWelcome.alt = 'Name';

  const title = document.createElement('h1');
  title.textContent = 'ENJOY THE WORLD';
  title.id = 'mainTitle';

  const message = document.createElement('h2');
  message.id = 'description-welcome';
  message.textContent = 'Comparte con todo el mundo las festividades de tu ciudad y entérate de lo que pasa en otros lugares';

  const buttonStart = document.createElement('button');
  buttonStart.className = 'button';
  buttonStart.textContent = 'Inicia tu Viaje';
  buttonStart.addEventListener('click', () => {
    onNavigate('/landing');
  });

  headerWelcome.append(imgWelcome, title);
  sectionWelcome.append(headerWelcome, message, buttonStart);

  return sectionWelcome;
};
