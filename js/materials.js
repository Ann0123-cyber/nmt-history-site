import {
  fetchMonuments,
  filterByStyle,
  sortByName,
  searchMonument
} from './t5-asyncArrayFunctions.js';

export const monumentsData = [
  {
    id: 1,
    name: "Софійський собор",
    location: "Київ",
    image: "../img/monuments/sofSobor.jpg",
    style: "Українське бароко"
  },
  {
    id: 2,
    name: "Спасо-Преображенський собор",
    location: "Чернігів",
    image: "../img/monuments/spaso.jpg",
    style: "Візантійський стиль"
  },
  {
    id: 3,
    name: "Успенський собор Києво-Печерської лаври",
    location: "Київ",
    image: "../img/monuments/uspenskiy.jpg",
    style: "Українське бароко"
  },
  {
    id: 4,
    name: "Михайлівський Золотоверхий собор",
    location: "Київ",
    image: "../img/monuments/mikhalivskiy.jpg",
    style: "Українське бароко"
  },
  {
    id: 5,
    name: "П’ятницька церква",
    location: "Чернігів",
    image: "../img/monuments/piatnitska.jpg",
    style: "Українське бароко"
  },
  {
    id: 6,
    name: "Вірменський собор",
    location: "Львів",
    image: "../img/monuments/virmenskiy.jpg",
    style: "Вірменська архітектура "
  },
  {
    id: 7,
    name: "Хотинська фортеця",
    location: "Хотин",
    image: "../img/monuments/hotinskiy.jpg",
    style: "Неокласичний"
  },
  {
    id: 8,
    name: "Будинок Корнякта",
    location: "Львів",
    image: "../img/monuments/korniatka.jpg",
    style: "Ренесанс"
  }
];

const monumentContainer = document.getElementById('monument-list');
const btnLoad = document.getElementById('btn-load');
const btnSort = document.getElementById('btn-sort');
const btnFilter = document.getElementById('btn-filter');
const btnSearch = document.getElementById('btn-search');
const searchInput = document.getElementById('search-input');

let currentMonuments = [];
let controller = null;

function renderMonuments(monuments) {
  monumentContainer.innerHTML = '';
  if (monuments.length === 0) {
    monumentContainer.innerHTML = '<p>Нічого не знайдено.</p>';
    return;
  }

  monuments.forEach(m => {
    const card = document.createElement('div');
    card.className = 'monument-card';
    card.innerHTML = `
      <img src="${m.image}" alt="${m.name}" />
      <h3>${m.name}</h3>
      <p><strong>Місце:</strong> ${m.location}</p>
      <p><strong>Архітектурний стиль:</strong> ${m.style}</p>
    `;
    monumentContainer.appendChild(card);
  });
}

btnLoad.addEventListener('click', async () => {
  currentMonuments = await fetchMonuments();
  renderMonuments(currentMonuments);
});

btnSort.addEventListener('click', async () => {
  const sorted = await sortByName(currentMonuments);
  renderMonuments(sorted);
});

btnFilter.addEventListener('click', async () => {
  const filtered = await filterByStyle(currentMonuments, 'Українське бароко');
  renderMonuments(filtered);
});

let debounceTimer = null;

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();

  clearTimeout(debounceTimer);
  if (controller) {
    controller.abort();
  }

  debounceTimer = setTimeout(async () => {
    controller = new AbortController();
    const signal = controller.signal;

    try {
      const monuments = await fetchMonuments();
      const results = await searchMonument(monuments, query);
      if (!signal.aborted) {
        renderMonuments(results);
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Пошук скасовано');
      } else {
        console.error('Помилка:', error);
      }
    }
  }, 400);
});

