// todo vísa í rétta hluti með import
import getRandomImage from './nasa-api';
import { el } from './helpers';
import { load, save } from './storage';

// breytur til þess að halda utan um html element nodes
let title; // titill fyrir mynd á forsíðu
let text; // texti fyrir mynd á forsíðu
let img; // mynd á forsíðu

let image; // object sem inniheldur núverandi mynd á forsíðu.

/*
 * Sækir nýja Mynd af handahófi frá Nasa API og birtir hana á forsíðunni
 * ásamt titli og texta.
 */
function getNewImage() {
  const section = document.querySelector('section');
  const currImg = document.querySelector('img');
  const currVid = document.querySelector('iframe');
  if (currImg) {
    currImg.remove();
  }
  if (currVid) {
    currVid.remove();
  }
  getRandomImage()
    .then((data) => {
      if (data.media_type === 'video') {
        const video = el('iframe');
        video.src = data.url;
        video.classList.add('youtube');
        section.insertBefore(video, title);
      } else {
        img = el('img');
        img.src = data.hdurl;
        img.classList.add('apod__image');
        section.insertBefore(img, title);
      }
      title.innerText = data.title;
      text.innerText = data.explanation;
    });
}

/*
 * Vistar núverandi mynd í storage.
 */
function saveCurrentImage() {
  let type = 'image';
  if (image.children[0].classList.contains('youtube')) {
    type = 'video';
  }
  save(type, image.children[0].src, image.children[2].innerText, image.children[1].innerText);
}

/*
 * Upphafsstillir forsíðuna. Setur event listeners á takkana, og sækir eina mynd.
 *
 */
export default function init(apod) {
  img = apod.children['0'];
  title = apod.children['1'];
  text = apod.children['2'];
  image = apod;
  getNewImage();
  const newBtn = document.getElementById('new-image-button');
  newBtn.addEventListener('click', getNewImage);
  const saveBtn = document.getElementById('save-image-button');
  saveBtn.addEventListener('click', saveCurrentImage);
}

/*
 * Fall fyrir favourites.html. Sér um að sækja allar vistuðu myndirnar og birta þær ásamt
 * titlum þeirra.
 */
export function loadFavourites() {
  const loaded = load();
  const main = document.querySelector('main');
  for (let i = 0; i < loaded.length; i += 1) {
    if (loaded[i].type === 'image') {
      const newImg = el('img');
      newImg.src = loaded[i].mediaUrl;
      newImg.classList.add('apod__image');
      main.appendChild(newImg);
    } else if (loaded[i].type === 'video') {
      const newVid = el('iframe');
      newVid.src = loaded[i].mediaUrl;
      newVid.classList.add('youtube');
      main.appendChild(newVid);
    }
    const newTitle = el('h2');
    newTitle.appendChild(document.createTextNode(loaded[i].title));
    newTitle.classList.add('apod__title');
    main.appendChild(newTitle);
    const newText = el('p');
    newText.appendChild(document.createTextNode(loaded[i].text));
    newText.classList.add('apod__text');
    main.appendChild(newText);
  }
}
