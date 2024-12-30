// import { advertisements } from './data.js'

const cardTemplate = document.querySelector('#card').content;
const cardPopup = cardTemplate.querySelector('.popup'); // то что мы клонируем и заполняем
const cardList = document.querySelector('#map-canvas'); // похоже сюда надо отрисовать

const renderphotos = (offer, newOffer) => {
  let photosList = newOffer.querySelector('.popup__photos'); // находим лист в который добавим фотки
  photosList.textContent = '';

  if (offer.photos && Array.isArray(offer.photos)){
  for (let i = 0; i < offer.photos.length; i++) {
    let newPhoto = document.createElement('img');// копируем новую фотку;
    newPhoto.src = offer.photos[i];
    newPhoto.classList.add('popup__photo');
    newPhoto.width = 45 ;
    newPhoto.height = 45 ;
    photosList.appendChild(newPhoto);
  }} else {
    photosList.textContent = 'Владелец не добавил фото';
  }
  return photosList
}

const renderType = (offer, newOffer) => {
  let offerType = offer.type;
  let offerTypeParagraph = newOffer.querySelector('.popup__type');
  switch(offerType) {
    case 'flat' :
      offerTypeParagraph.textContent = 'Квартира';
      break;
      case 'palace' :
        offerTypeParagraph.textContent = 'Дворец';
        break;
      case 'bungalow' :
        offerTypeParagraph.textContent = 'Бунгало';
        break;
      case 'house' :
        offerTypeParagraph.textContent = 'Дом';
        break;
      case 'hotel' :
        offerTypeParagraph.textContent = 'Отель';
        break;
        default:
          offerTypeParagraph.textContent = 'Владелец не указал тип';
          break;
  }
}

const renderFratures = (offer, newOffer) => {
  let featuresList = newOffer.querySelector('.popup__features');
  featuresList.textContent = '';
  if (offer.features && Array.isArray(offer.features)){
  for(let i = 0; i < offer.features.length; i++) {
    let newFratures = document.createElement('li');
    newFratures.classList.add('popup__feature');
    newFratures.textContent = offer.features[i];
    switch(newFratures.textContent) {
      case 'wifi' :
        newFratures.classList.add('popup__feature--wifi');
        break;
        case 'dishwasher' :
          newFratures.classList.add('popup__feature--dishwasher');
          break;
        case 'parking' :
          newFratures.classList.add('popup__feature--parking');
          break;
        case 'washer' :
          newFratures.classList.add('popup__feature--washer');
          break;
        case 'elevator' :
        newFratures.classList.add('popup__feature--elevator');
          break;
        case 'conditioner' :
        newFratures.classList.add('popup__feature--conditioner');
          break;
    }
    featuresList.appendChild(newFratures)
  }} else {
    // Добавить какое-то сообщение или обработку, если свойство features отсутствует
    let noFeaturesMessage = document.createElement('li');
    noFeaturesMessage.textContent = 'НВладелец не указал преимущества';
    featuresList.appendChild(noFeaturesMessage);
  }
}

const renderOffers = (data) => {
  const fragment = document.createDocumentFragment(); // Создаю фрагмент
  data.forEach(({offer, location, author }) => {
    let newOffer = cardPopup.cloneNode(true);

    newOffer.querySelector('.popup__title').textContent = offer.title; // ищем в копии заголовок и присваеваем ему значение
    newOffer.querySelector('.popup__text--address').textContent = offer.address; // установил адрусс
    newOffer.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`; // установил цену
    // newOffer.querySelector('.popup__type').textContent = offer.type; // тип жилья
    renderType(offer, newOffer)
    newOffer.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`; // установил комнаты для гостей
    newOffer.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin} выезд до ${offer.checkout}`; // заезд выезд
    renderFratures(offer, newOffer) // преимущества
    newOffer.querySelector('.popup__description').textContent = offer.description; // описание
    newOffer.querySelector('.popup__avatar').src = author.avatar;
    renderphotos(offer, newOffer)
    fragment.appendChild(newOffer)
  })

  return fragment
}

export { renderOffers }

