// Add imports above this line
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);


const gallery = document.querySelector('.gallery');
const imgMarkUp = makeGallery(galleryItems);
gallery.insertAdjacentHTML('beforeend', imgMarkUp);

function makeGallery(items) {
  return items.map(item => {
      return `<div class="gallery__item">
            <a class="gallery__link" href="${item.original}">
                <img
                    class="gallery__image"
                    src="${item.preview}"
                    data-source="${item.original}"
                    alt="${item.description}"
                />
             </a>
        </div>`;
    })
    .join(' ');
}


gallery.addEventListener('click', modalOpen);


//lightbox
function modalOpen(event) {
    if (!event.target.classList.contains('gallery__image')) {
        return;
    }
    event.preventDefault();
    const image = event.target.getAttribute('data-source')
    const instance = basicLightbox.create(`<div class = "modal"><img src="${image}" width="800" height="600"></div>`);
    instance.show();


    document.addEventListener('keyup', modalClose);

    function modalClose(event) {
        if (event.key === 'Escape') {
            instance.close();
        }
    }
}