import { onNavigate } from '../main.js';
import {
  auth,
  createPosts,
  signOff,
  onGetPosts,
  deletePosts,
  editPosts,
  updatePosts,
  onAuthStateChanged,
} from '../firebase/connection.js';

export const wall = () => {
  const containerWall = document.createElement('section'); // Main container
  containerWall.class = 'container';
  containerWall.id = 'containerWall';

  // HEADER CONTAINER
  const header = document.createElement('header');
  header.classList.add('header');

  const imgTitle = document.createElement('img'); // Title image or logo
  imgTitle.src = 'img/nameLogo.png';
  imgTitle.alt = 'Logo';
  imgTitle.id = 'imgTitle';

  // Nodo for the username
  const profileName = document.createElement('h1');
  profileName.className = 'userProfile';
  profileName.textContent = window.user !== undefined ? window.user.displayName : '';

  const title = document.createElement('h1'); // Title
  title.textContent = '¿Qué festividad se celebra hoy en tu ciudad?';
  title.id = 'titleWall';

  const buttonExit = document.createElement('button'); // Buton icon exit
  buttonExit.classList.add('buttonIcons');
  buttonExit.id = 'btnExit';

  // TEXTAREA AND SEND ICON CONTAINER
  const wallFormContainer = document.createElement('article');
  wallFormContainer.classList.add('wallForm');

  const wallPost = document.createElement('textarea'); // Textarea
  wallPost.classList.add('post');
  wallPost.setAttribute('type', 'text');
  wallPost.setAttribute('id', 'postWall');
  wallPost.setAttribute('rows', '4');
  wallPost.setAttribute('placeholder', ' Tu post aquí');

  const iconContainer = document.createElement('article'); // container for send icon
  iconContainer.setAttribute('id', 'iconContainer');

  const buttonSend = document.createElement('button'); // send button icon
  buttonSend.classList.add('buttonIcons');
  buttonSend.id = 'btnSend';

  const postZoneContainer = document.createElement('article'); // container for the post print
  postZoneContainer.setAttribute('id', 'postZoneContainer');

  let editStatus = false;
  let id = '';

  onGetPosts((querySnapshot) => {
    postZoneContainer.innerHTML = '';

    querySnapshot.forEach((doc) => {
      // crea un elemento p donde quedará el post
      const postBox = document.createElement('p'); // here lives the post after print
      postBox.className = 'textPost';
      postBox.textContent = doc.data().post;
      const postNameUser = document.createElement('h4');
      postNameUser.textContent = doc.data().name;
      const postedUser = document.createElement('p');
      postedUser.textContent = doc.data().title;

      // boton de dar like al post
      const buttonHeart = document.createElement('button');
      buttonHeart.classList.add('buttonIcons');
      buttonHeart.id = 'btnHeart';

      // boton de editar el post
      const buttonEdit = document.createElement('button');
      buttonEdit.setAttribute('data-id', doc.id);
      buttonEdit.classList.add('buttonIcons');
      buttonEdit.id = 'btnEdit';

      // boton de eliminar post
      const buttonTrash = document.createElement('button');
      buttonTrash.setAttribute('data-id', doc.id);
      buttonTrash.classList.add('buttonIcons');
      buttonTrash.id = 'btnTrash';

      // se pinta el post junto botones de eliminar, editar, like
      postBox.append(postNameUser, postedUser);
      postZoneContainer.append(postBox, buttonHeart, buttonEdit, buttonTrash);

      buttonEdit.addEventListener('click', async (e) => {
        const docId = await editPosts(e.target.dataset.id);
        const postText = docId.data();

        wallPost.value = postText.post;

        editStatus = true;
        id = e.target.dataset.id;
      });

      buttonTrash.addEventListener('click', ({ target: { dataset } }) => {
        deletePosts(dataset.id);
      });
    });
  });

  buttonExit.addEventListener('click', () => {
    signOff().then(() => {
      onNavigate('/');
    }).catch((error) => {
      console.log(error, 'Algo pasó');
    });
  });

  buttonSend.addEventListener('click', () => {
    const post = wallPost.value;
    console.log(post);

    if (!editStatus) {
      createPosts(post);
    } else {
      updatePosts(id, { post });
      deletePosts(id, { post });
      editStatus = false;
    }
    wallPost.value = '';
  });

  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      profileName.textContent = user.displayName;
    }
  });

  header.append(imgTitle, profileName, buttonExit);
  wallFormContainer.append(title, wallPost, iconContainer);
  iconContainer.append(buttonSend);

  containerWall.append(header, wallFormContainer, postZoneContainer);

  return containerWall;
};
