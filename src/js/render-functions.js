import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const gallery = document.querySelector('.gallery');

export function templateImages(images) {
  const markup = images
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}" >
            <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
            </a>
            <div class="image-info">
              <p><strong>Likes</strong> ${likes}</p>
              <p><strong>Views</strong> ${views}</p>
              <p><strong>Comments</strong> ${comments}</p>
              <p><strong>Downloads</strong> ${downloads}</p>
            </div>
          </li>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    captionPosition: 'bottom',
    overlayOpacity: 1,
    showCounter: false,
  });

  lightbox.refresh();
}
