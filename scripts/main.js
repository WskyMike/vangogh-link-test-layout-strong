/* eslint-disable max-len */
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

import travelersData from './travelersData.js';

function getFilterTemplateId() {
  if (window.innerWidth <= 710) return 'filter-template-desktop';
  if (window.innerWidth <= 1055) return 'filter-template-tablet';
  return 'filter-template-desktop';
}

function getTravelerTemplateId() {
  if (window.innerWidth <= 718) return 'traveler-template-mobile';
  if (window.innerWidth <= 1360) return 'traveler-template-tablet';
  return 'traveler-template-desktop';
}

function renderFilter() {
  const root = document.getElementById('filter-root');
  const templateId = getFilterTemplateId();
  const template = document.getElementById(templateId);

  if (template && root) {
    root.innerHTML = '';
    root.appendChild(template.content.cloneNode(true));
    // После вставки фильтра инициализируем обработчики
    initFilterHandlers();
    initLevelSlider();
  }
}

window.addEventListener('DOMContentLoaded', renderFilter);
window.addEventListener('resize', renderFilter);

function renderTravelers(travelers) {
  const container = document.getElementById('travelers');
  container.innerHTML = '';

  const templateId = getTravelerTemplateId();
  const template = document.getElementById(templateId);

  travelers.forEach(traveler => {
    const clone = template.content.cloneNode(true);

    // Заполняем основную информацию
    const photo = clone.querySelector('.traveler__photo-img');
    photo.src = traveler.photo;
    photo.alt = traveler.name;

    // обработчик для лайка
    clone.querySelector('.traveler__likes-count').textContent = traveler.likes;

    const likeBtn = clone.querySelector('.traveler__likes-button');
    likeBtn.innerHTML = '<img src="images/icons/like_btn.svg" alt="Лайк не стоит" />';

    let liked = false;
    likeBtn.addEventListener('click', function () {
      liked = !liked;
      likeBtn.innerHTML = liked
        ? '<img src="images/icons/like btn_active.svg" alt="Лайк стоит" />'
        : '<img src="images/icons/like_btn.svg" alt="Лайк не стоит" />';
    });

    // Имя
    const nameElem = clone.querySelector('.traveler__name');
    if (templateId === 'traveler-template-mobile') {
      // Разделяем имя и фамилию по первому пробелу для мобильной версии
      const [firstName, ...lastName] = traveler.name.split(' ');
      nameElem.innerHTML = `${firstName}<br>${lastName.join(' ')}`;
    } else {
      nameElem.textContent = traveler.name;
    }

    // Добавляем модификатор цвета кружка перед именем по ключу
    if (traveler.nameStatus) {
      nameElem.classList.add(traveler.nameStatus);
    }

    // Добавляем теги
    const tagsContainer = clone.querySelector('.traveler__tags');
    traveler.tags.forEach(tag => {
      const tagSpan = document.createElement('span');
      tagSpan.className = 'traveler__tag';
      tagSpan.textContent = tag;
      tagsContainer.appendChild(tagSpan);
    });

    // Добавляем направления
    const destinationsContainer = clone.querySelector('.traveler__destinations');
    traveler.destinations.forEach(dest => {
      const destDiv = document.createElement('div');
      destDiv.className = 'traveler__destination';
      destDiv.innerHTML = `<img class="traveler__flag" src="${dest.flag}" alt="${dest.country}"> ${dest.country}`;
      destinationsContainer.appendChild(destDiv);
    });

    // Настраиваем транспорт
    const transportIcons = clone.querySelectorAll('.traveler__transport-option');
    transportIcons.forEach(icon => {
      const type = icon.getAttribute('data-type');
      if (traveler.transport.includes(type)) {
        icon.classList.add('traveler__transport-option_active');
      }
    });

    // Динамически подставляем картинку уровня
    const levelImg = clone.querySelector('.traveler__level');
    if (levelImg) {
      if (templateId === 'traveler-template-mobile') {
        levelImg.src = `images/levels/mob_${traveler.level}.svg`;
      } else {
        levelImg.src = `images/levels/${traveler.level}.svg`;
      }
      levelImg.alt = `Уровень ${traveler.level}`;
    }

    container.appendChild(clone);
  });
}

// Инициализация обработчиков фильтра
function initFilterHandlers() {
  // Обработчики для транспорта
  const transportOptions = document.querySelectorAll('.filter__transport-option');
  if (transportOptions.length) {
    transportOptions.forEach(option => {
      option.addEventListener('click', function () {
        option.classList.toggle('selected');
      });
    });
  }

  // Обработчики для разворачивания/сворачивания разделов фильтра
  const filterSections = document.querySelectorAll('.filter__section-title');
  filterSections.forEach(section => {
    section.addEventListener('click', function () {
      if (window.innerWidth <= 1024 && window.innerWidth > 770) return;
      const content = this.nextElementSibling;
      if (content) {
        const isOpen = content.style.display !== 'none';
        content.style.display = isOpen ? 'none' : 'block';
        this.classList.toggle('filter__section-title--open', !isOpen);
      }
    });
  });
}

// Инициализация noUiSlider для ЛЕВЕЛ
function initLevelSlider() {
  const levelSlider = document.getElementById('levelSlider');
  const minInput = document.getElementById('levelMinInput');
  const maxInput = document.getElementById('levelMaxInput');

  if (levelSlider && minInput && maxInput) {
    // Если слайдер уже инициализирован, удаляем его
    if (levelSlider.noUiSlider) {
      levelSlider.noUiSlider.destroy();
    }
    noUiSlider.create(levelSlider, {
      start: [30, 100],
      connect: true,
      step: 1,
      range: {
        min: 0,
        max: 100
      },
      format: {
        to: value => Math.round(value),
        from: value => Number(value)
      }
    });

    // Слайдер -> input
    levelSlider.noUiSlider.on('update', function (values) {
      minInput.value = values[0];
      maxInput.value = values[1];
    });

    // input -> слайдер
    minInput.addEventListener('change', function () {
      const min = Math.min(Number(minInput.value), Number(maxInput.value));
      levelSlider.noUiSlider.set([min, null]);
    });

    maxInput.addEventListener('change', function () {
      const max = Math.max(Number(maxInput.value), Number(minInput.value));
      levelSlider.noUiSlider.set([null, max]);
    });
  }
}

let currentTemplate = '';

window.addEventListener('resize', () => {
  const newTemplate = getTravelerTemplateId();
  if (newTemplate !== currentTemplate) {
    currentTemplate = newTemplate;
    renderTravelers(travelersData);
  }
});

// Инициализация страницы
document.addEventListener('DOMContentLoaded', function () {
  currentTemplate = getTravelerTemplateId();
  renderTravelers(travelersData);
});