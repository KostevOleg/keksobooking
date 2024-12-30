import { resetMarkerPosition } from './map-loading.js'
const selectType = document.querySelector('#type');
const selectPrice = document.querySelector('#price');
const selectTimeIn = document.querySelector('#timein');
const selectTimeOut = document.querySelector('#timeout');
const form = document.querySelector('.ad-form')
const inputRooms = form.querySelector('#room_number');
const inputGuests = form.querySelector('#capacity');
const resetFormBtn = form.querySelector('.ad-form__reset')

selectPrice.min = '1000';
selectPrice.placeholder  = '1000';

//сброс формв
const resetForm = () => {
  form.reset()
  resetMarkerPosition()
}
resetFormBtn.addEventListener('click', resetForm)


//валидация колличество комнат и гостец
const checkGuestsQuantity = () => {
  let valueInputRooms = parseInt(inputRooms.value);
  let valueInputGuests = parseInt(inputGuests.value);
  inputGuests.setCustomValidity('');


  if (valueInputRooms === 1 && valueInputGuests !== 1) {
    inputGuests.setCustomValidity('В одной комнате возможно размещение максимум 1 человека');
  } else
  if (valueInputRooms === 2 && valueInputGuests !== 1) {
    inputGuests.setCustomValidity('В двух комнатах возможно размещение от 1 до 2 человек');
  } else
  if (valueInputRooms === 2  && valueInputGuests !== 2) {
    inputGuests.setCustomValidity('В двух комнатах возможно размещение максимум 2 человек');
  } else
  if (valueInputRooms === 3  && valueInputGuests !== 1) {
    inputGuests.setCustomValidity('В двух комнатах возможно размещение от 1 до 3 человек');
  } else
  if (valueInputRooms === 3  && valueInputGuests !== 2) {
    inputGuests.setCustomValidity('В двух комнатах возможно размещение от 1 до 3 человек');
  } else
  if (valueInputRooms === 3  && valueInputGuests !== 3) {
    inputGuests.setCustomValidity('В двух комнатах возможно размещение от 1 до 3 человек');
  } else
  if (valueInputRooms === 100  && valueInputGuests !== 0) {
    inputGuests.setCustomValidity('Только не для гостей');
  }
  else {
    inputGuests.setCustomValidity('');
  }

}
//запускаю валидацию выше при загрузке страницы вдруг пользователя устроят начальные данные
document.addEventListener('DOMContentLoaded', () => {
  checkGuestsQuantity();
});

inputGuests.addEventListener('blur', checkGuestsQuantity);
inputGuests.addEventListener('change', checkGuestsQuantity);



// меняю мин значение и плайсхолдер цены для типа ис тоимости жилья
const handleTypeChange = (evt) => {
  const currentValue = evt.target.value;

  switch(currentValue) {
    case 'bungalow' :
      selectPrice.min = '0';
      selectPrice.placeholder  = '0';
      break;
      case 'flat' :
        selectPrice.min = '1000';
        selectPrice.placeholder  = '1000';
        break;
      case 'house' :
        selectPrice.min = '3000';
        selectPrice.placeholder  = '3000';
        break;
      case 'palace' :
        selectPrice.min = '10000';
        selectPrice.placeholder  = '10000';
        break;
  }
 console.log(currentValue)
}
// связываю импути чекин и чек аут
const handleTimeChange = (evt) => {
  const currentValue = evt.target.value;

  selectTimeIn.value = currentValue;
  selectTimeOut.value = currentValue;


  selectTimeIn.querySelectorAll('option').forEach(option => {
    option.removeAttribute('selected');
  });
  selectTimeOut.querySelectorAll('option').forEach(option => {
    option.removeAttribute('selected');
  });

  selectTimeIn.querySelector(`option[value="${currentValue}"]`).setAttribute('selected', 'selected');
  selectTimeOut.querySelector(`option[value="${currentValue}"]`).setAttribute('selected', 'selected');
}

selectTimeIn.addEventListener('change', handleTimeChange);
selectTimeOut.addEventListener('change', handleTimeChange);
selectType.addEventListener('change', handleTypeChange)

export { resetForm }
