import { searchImages } from './js/pixabay-api.js';
import { templateImages } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('.form'),
  input: document.querySelector('.input'),
  loader: document.querySelector('#loader'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.more-btn'),
};

function showLoader() {
  refs.loader.classList.remove('hidden');
}

function hideLoader() {
  refs.loader.classList.add('hidden');
}

function showLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove('hidden');
}

function hideLoadMoreBtn() {
  refs.loadMoreBtn.classList.add('hidden');
}

const params = {
  query: '',
  page: 1,
  totalHits: 0,
  perPage: 40,
};

refs.form.addEventListener('submit', async e => {
  e.preventDefault();
  params.query = e.target.elements.query.value.trim();
  params.page = 1;
  refs.gallery.innerHTML = '';

  if (!params.query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term!',
      position: 'topRight',
    });
    return;
  }

  showLoader();
  hideLoadMoreBtn();

  try {
    const { hits, totalHits } = await searchImages(
      params.query,
      params.page,
      params.perPage
    );

    params.totalHits = totalHits;
    hideLoader();

    if (hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    } else {
      templateImages(hits);
      if (hits.length < params.totalHits) {
        showLoadMoreBtn();
      }
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong! Please try again later.',
      position: 'topRight',
    });
    console.log('Помилка при отриманні зображень:', error);
  }
  refs.form.reset();
});

refs.loadMoreBtn.addEventListener('click', async () => {
  params.page += 1;
  hideLoadMoreBtn();
  showLoader();

  try {
    const { hits } = await searchImages(
      params.query,
      params.page,
      params.perPage
    );
    hideLoader();
    showLoadMoreBtn();

    if (hits.length === 0) {
      hideLoadMoreBtn();
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      templateImages(hits);
      smoothScroll();

      if (params.page * params.perPage >= params.totalHits) {
        hideLoadMoreBtn();
        iziToast.info({
          title: 'Info',
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
        });
      }
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong! Please try again later.',
      position: 'topRight',
    });
    console.log('Помилка при отриманні зображень:', error);
  }
});

function smoothScroll() {
  const elem = refs.gallery.firstElementChild.getBoundingClientRect();
  const height = elem.height;
  window.scrollBy({
    top: height * 3,
    behavior: 'smooth',
  });
}
