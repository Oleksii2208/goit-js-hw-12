import axios from 'axios';

const API_KEY = '48867408-88b49db3a4e372b4d460477c4';

export async function searchImages(query, page, perPage) {
  const BASE_URL = 'https://pixabay.com';
  const END_POINT = '/api/';

  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: perPage,
    page: page,
  });

  try {
    const response = await axios.get(BASE_URL + END_POINT, { params });
    return response.data;
  } catch (error) {
    console.log('Помилка при отриманні зображень:', error);
  }
}
