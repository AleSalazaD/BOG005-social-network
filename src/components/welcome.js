import { onNavigate } from '../main.js';

export const welcome = () => {
  const sectionWelcome = document.createElement('sectionWelcome');
  sectionWelcome.className = 'sectionWelcome';

  const title = document.createElement('h1');
  title.className = 'titleWelcome';
  

  const mensage = document.createElement('h1');
  mensage.textContent = 'Disfruta de las diferentes festividades alrededor del mundo.';
  mensage.className = 'messageW';

  const buttonStart = document.createElement('button');
  buttonStart.className = 'button';
  buttonStart.textContent = 'Inicia tu viaje';

  buttonStart.addEventListener('click', () => {
    onNavigate('/landing');
  });

  sectionWelcome.append(title, mensage, buttonStart);

  return sectionWelcome;
};
