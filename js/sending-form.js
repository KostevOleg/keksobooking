import { request } from './fetch.js';
import { resetForm } from './form.js'
import { checkEscapeKey } from './utils.js'
const form = document.querySelector('.ad-form')
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const body = document.querySelector('body');
const map = document.querySelector('.map'); // накинуть z undex при показе попапа




const onSuccess = (data) => {
  const successPopup = successTemplate.cloneNode(true);
  map.style.zIndex = '-1'
  body.appendChild(successPopup);
  const closeSuccessRecievingSection = () => {
    successPopup.remove();
    resetForm();
    map.style.zIndex = '+2';
    window.removeEventListener('keydown', onEscapeKey)
    window.removeEventListener('click', onClickScreen)
  }
  const onEscapeKey = (evt) => {
    if (checkEscapeKey && evt.code === 'Escape') { // Добавляем проверку checkEscapeKey
      closeSuccessRecievingSection();
    }
  };
  const onClickScreen = () => {
    closeSuccessRecievingSection();
}
  window.addEventListener('keydown', onEscapeKey);
  window.addEventListener('click', onClickScreen)
}

const onError = () => {
  const errorPopup = errorTemplate.cloneNode(true);
  const erroreBtn = errorPopup.querySelector('.error__button');
  body.appendChild(errorPopup);
  map.style.zIndex = '-1'
  const closeErrorRecievingSection = () => {
    errorPopup.remove()
    map.style.zIndex = '+2';
    erroreBtn.removeEventListener('click', closeErrorRecievingSection);
    window.removeEventListener('keydown', onEscapeKey)
    window.removeEventListener('click', onClickScreen)
  }
  const onEscapeKey = (evt) => {
    if (checkEscapeKey && evt.code === 'Escape') { // Добавляем проверку checkEscapeKey
      closeErrorRecievingSection();
    }
  };
  const onClickScreen = () => {
      closeErrorRecievingSection();
  }
  erroreBtn.addEventListener('click', closeErrorRecievingSection);
  window.addEventListener('keydown', onEscapeKey);
  window.addEventListener('click', onClickScreen)
}

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);
  for (const pair of formData.entries()) {
    console.log(pair[0] + ': ' + pair[1]);
  }
  request(onSuccess, onError, 'POST', formData)
})
