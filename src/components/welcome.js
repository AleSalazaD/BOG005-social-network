import { onNavigate } from '../main.js';

export const welcome = () => {
  const sectionWelcome = document.createElement('section');
  sectionWelcome.className = 'sectionWelcome';

  const imgWelcome = document.createElement('img');
  imgWelcome.className = 'FondoWelcome';
  imgWelcome.src = 'img/mundoverde.PNG';
  imgWelcome.alt = 'Name';

  const message = document.createElement('h2');
  message.className = 'description';
  message.textContent = 'Disfruta de las diferentes festividades alrededor del mundo.';

  const buttonStart = document.createElement('button');
  buttonStart.className = 'button';
  buttonStart.textContent = 'Inicia tu viaje';

  buttonStart.addEventListener('click', () => {
    onNavigate('/landing');
  });

  sectionWelcome.append(imgWelcome, message, buttonStart);

  return sectionWelcome;
};