const form = document.querySelector('.ad-form'); // форму которую блокируем
const formFieldset = form.querySelectorAll('.ad-form__element'); // на филдсеты так же накидываем класс
const formFilters = document.querySelector('.map__filters')// форма с фильтрами тоже блочик
const formFilteresFildset = formFilters.querySelectorAll('.map__filter') // элементы второй формы
let isBlock = false;


const toggleFormAccessibility  = () => {

  if(!isBlock) {
  form.classList.add('ad-form--disabled')
  formFieldset.forEach((el) => {
    el.setAttribute('disabled', 'disabled')
  })
  formFilters.classList.add('ad-form--disabled')
  formFilteresFildset.forEach((el) => {
    el.setAttribute('disabled', 'disabled')
  })
  isBlock = true;
  } else {
    form.classList.remove('ad-form--disabled')
    formFieldset.forEach((el) => {
      el.removeAttribute('disabled')
    })
    formFilters.classList.remove('ad-form--disabled')
    formFilteresFildset.forEach((el) => {
      el.removeAttribute('disabled')
    })
    isBlock = false;
  }
}


toggleFormAccessibility();



export {toggleFormAccessibility}
