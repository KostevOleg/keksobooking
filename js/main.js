import { checkEscapeKey, shuffleArray } from './utils.js'
import {request} from './fetch.js'
import {renderMarkers} from './map-loading.js'

import './utils.js'
import './render-advertisements.js'
import './form.js'
import './map-loading.js'
import './page-block.js'
import './fetch.js'
import './sending-form.js'
import './show-new-photo.js'

const map = document.querySelector('.map')
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const body = document.querySelector('body');
// находим все селекты
const domFilteres = {
  'housing-type': document.querySelector('#housing-type'),
  'housing-price': document.querySelector('#housing-price'),
  'housing-rooms': document.querySelector('#housing-rooms'),
  'housing-guests': document.querySelector('#housing-guests'),
};
//нахожу чебоксы фильтра и перевожу их в масив
const domFiltresChecbox = Array.from(document.querySelectorAll('.map__checkbox '))


let advertisements= [];
//массив фильрованый в селектах
let advertismentFiltterdSelect = [];
//массив фильтрованный в чекбоксах
let advertisementsFelteredCheckboxses = []

const onSuccess = (data) => {
  advertisements = data;
  let advertisementsSlice = data.slice(0, 10);
  renderMarkers(advertisementsSlice);
};

const onError = () => {
  const errorPopup = errorTemplate.cloneNode(true);
  errorPopup.querySelector('.error__message').textContent = 'Объявления не загрузились';
  const erroreBtn = errorPopup.querySelector('.error__button');
  erroreBtn.textContent = 'Закрыть'
  body.appendChild(errorPopup);
  map.style.zIndex = '-1'
  const closeErrorRecievingSection = () => {
    map.style.zIndex = '+2'
    errorPopup.remove()
    erroreBtn.removeEventListener('click', closeErrorRecievingSection);
    window.removeEventListener('keydown', onEscapeKey)
    window.removeEventListener('click', onClickScreen)

  }
  const onEscapeKey = (evt) => {
    if (checkEscapeKey && evt.code === 'Escape') { // Добавляем проверку checkEscapeKey
      console.log('Лтав')
      closeErrorRecievingSection();

    }
  };
  const onClickScreen = () => {
    closeErrorRecievingSection();
}
  window.addEventListener('keydown', onEscapeKey);
  window.addEventListener('click', onClickScreen)
  erroreBtn.addEventListener('click', closeErrorRecievingSection)
};

request(onSuccess, onError, 'GET');



  // диапы цен по значения.
  const rangesPrices = [
    { name: 'low', min: 0, max: 9999 },
    { name: 'middle', min: 10000, max: 49999 },
    { name: 'high', min: 50000, max: Infinity },
    { name: 'any', min: 0, max: Infinity }
  ];
  // просто названия фильров бегаем по этому масиву и слушаем.
  const typesFiltres = [
    'housing-type',
    'housing-price',
    'housing-rooms',
    'housing-guests'
  ];
  // непосредственно обьект с методами фильтров.
  const filtres = {
    'housing-type': (currentType, array) => {
      return array.filter(el => {
        const rgx = new RegExp(currentType, 'i');
        return rgx.test(el.offer.type);
      });
    },
    'housing-price': (currentId, array) => {
      const currentPriceMin = rangesPrices.find((el) => el.name === currentId).min;
      const currentPriceMax = rangesPrices.find((el) => el.name === currentId).max;
      return array.filter((el) => el.offer.price >= currentPriceMin && el.offer.price <= currentPriceMax)
    },
    'housing-rooms': (currentRooms, array) => {
      return array.filter(el => {
        const rgx = new RegExp(currentRooms, 'i');
        return rgx.test(el.offer.rooms);
      });
    },
    'housing-guests': (currentGuests, array) => {
      return array.filter(el => {
        const rgx = new RegExp(currentGuests, 'i');
        return rgx.test(el.offer.rooms);
      });
    },
    'checkbox': (type ,array) => {
        return array.filter(el => el.offer.features.includes(type));
      }
  };
  // функция принимает все виды фильтров.
  const filterListingsByCriteria = (filters) => {
    domFilteres[filters ].onchange = (evt) => {
    const currentType = evt.target.value;
    const currentId = evt.target.id;
    advertismentFiltterdSelect = filtres[currentId](currentType, advertisements);
    let fulladvertismentFiltterdSelect = chekOtherFilteres(typesFiltres, advertismentFiltterdSelect);
    fulladvertismentFiltterdSelect= chekOtherChecbox(fulladvertismentFiltterdSelect, domFiltresChecbox)
    renderMarkers(fulladvertismentFiltterdSelect.slice(0,10));
  }
  };
  // следим за изменениями  в фильтрах.
  typesFiltres.forEach((type) => filterListingsByCriteria(type));
  /// чекаем значения соседних фильтров.


  function chekOtherFilteres(typesFiltres, advertismentFiltterdSelect) {
   // фильтруем уже отфильтрованый массив по значениям остальных фильтров
    let updateadvertismentFiltterdSelect = advertismentFiltterdSelect;
    typesFiltres.forEach((type) => {
      //ходим по каждому импуту и берем значения импута, для того чтобы прогнать фильтр
      const value = domFilteres[type].value;
      // так же берем ид что бы вызвать нужный фильтр из filtres
      const id = domFilteres[type].id;
      let newadvertismentFiltterdSelect = filtres[id](value, updateadvertismentFiltterdSelect)
      updateadvertismentFiltterdSelect = newadvertismentFiltterdSelect;
    })
    return updateadvertismentFiltterdSelect
  };

  const handleCheckboxClick = (evt) => {
    const value = evt.target.value;
    const isChecked = evt.target.checked;

    // Проверяем, отмечен ли чекбокс
    if (isChecked) {
      // Если отмечен, фильтруем массив и обновляем данные на карте
      advertisementsFelteredCheckboxses = advertisements.filter(item => item.offer && item.offer.features && item.offer.features.includes(value));
    } else {
      // Если снят фильтр, возвращаемся к исходному массиву и обновляем данные на карте
      advertisementsFelteredCheckboxses = advertisements;
    }

    // Применяем остальные фильтры и обновляем данные на карте
    let finalFilteredArray = chekOtherChecbox(advertisementsFelteredCheckboxses, domFiltresChecbox);
    finalFilteredArray = chekOtherFilteres(typesFiltres, finalFilteredArray);
    renderMarkers(finalFilteredArray.slice(0, 10));
  }

  function chekOtherChecbox(advertisementsFelteredCheckboxses) {
    let allChrckboxses = domFiltresChecbox.filter(el => el.checked);
    let updateFilteredNewArray = advertisementsFelteredCheckboxses;
    allChrckboxses.forEach(checkbox => {
        const valueCheckedCheckbox = checkbox.value;
        updateFilteredNewArray = updateFilteredNewArray.filter(item =>
          item.offer && item.offer.features && item.offer.features.includes(valueCheckedCheckbox)
        );
    });
    return updateFilteredNewArray
  }

  domFiltresChecbox.forEach(el => {
    el.addEventListener('click', handleCheckboxClick)
  })

  domFiltresChecbox.forEach(checkbox => {
    checkbox.addEventListener('change', handleCheckboxChange);
  });
