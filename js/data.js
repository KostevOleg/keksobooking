// import {getRandomIntInclusive,  getRandomFloatWithTwoDecimals,} from './utils.js'
// const LONG_DATA = 9;

// const NAMES = [
//   'Валя',
//   'Саша',
//   'Олег',
//   'Аскольт',
//   'Никита',
//   'Гиви',
//   'Оля',
//   'Дима',
//   'Миша',
//   'Юля',
//   'Даша',
//   'Маша',
//   'Кира',
//   'Роман',
// ];

// const DESCRIPTION = [
//   "Просторная и уютная квартира в центре города с прекрасным видом на парк. Идеальный вариант для тех, кто ценит комфорт и удобство.",
//   "Современная и функциональная квартира в деловом центре. Отличный выбор для деловых людей и компаний, желающих быть в центре событий.",
//   "Элегантный и просторный дом с садом и бассейном, идеально расположенный на окраине города. Подходит для семейного проживания и отдыха.",
//   "Светлое и уютное офисное помещение в новом бизнес-комплексе с современной инфраструктурой. Оптимальное решение для развития вашего бизнеса.",
//   "Привлекательное торговое помещение в оживленном торговом районе. Идеально подходит для размещения вашего бизнеса и привлечения клиентов.",
//   "Комфортабельная квартира с качественным ремонтом, мебелью и бытовой техникой. Готова к проживанию сразу после заключения договора аренды.",
//   "Просторные и удобные складские помещения с удобным подъездом для грузового транспорта. Идеальное решение для вашего складского хранения.",
//   "Светлая и креативная студия для различных видов деятельности. Расположена в историческом здании, придающем особый шарм вашему творчеству.",
//   "Современное офисное пространство с панорамным видом на городскую набережную. Идеальный выбор для успешных компаний и бизнесменов.",
//   "Привлекательное помещение под ресторан с оборудованной кухней и зоной обслуживания. Создайте атмосферу уюта и комфорта для ваших посетителей."
// ]


// const advantages = [
//   'wifi',
//   'dishwasher',
//   'parking',
//   'washer',
//   'elevator',
//   'conditioner'
// ]

// const TITLES = [
//   "Уютная квартира в центре города с видом на парк.",
//   "Современный офисный блок в деловом центре.",
//   "Просторный дом с садом и бассейном на окраине города.",
//   "Офисное помещение в новом бизнес-комплексе с отличной инфраструктурой.",
//   "Аренда торгового помещения в оживленном торговом районе.",
//   "Квартира с ремонтом и всей необходимой мебелью и бытовой техникой.",
//   "Сдача в аренду складских помещений с удобным подъездом для грузового транспорта.",
//   "Студия для креативной деятельности в историческом здании.",
//   "Офисное пространство с панорамным видом на городскую набережную.",
//   "Аренда помещения под ресторан с оборудованной кухней и зоной обслуживания."
// ];

// const LOCATION = {
//   MIN_LAT: 35.495,
//   MAX_LAT: 35.9895,
//   MIN_LNG: 139.34,
//   MAX_LNG: 139.9217,
// }

// const PRICES = {
//   MIN: 2500,
//   MAX: 7500,
// }

// const TYPE = [
//   'palace',
//   'flat',
//   'house',
//   'hotel',
//   'bungalow'
// ]

// const ROOMS = {
//   MIN: 1,
//   MAX: 5,
// }

// const CHEKING = [
//   '12:00',
//   '13:00',
//   '14:00'
// ]
// let numberAvatar = 0;


// const creaAeuthor = () => {
//   numberAvatar += 1;
//   return { avatar: `img/avatars/user${numberAvatar < 10 ? '0' + numberAvatar: numberAvatar}.png`}

// }

// const createLocation = () => {
//   return {
//     'x': getRandomFloatWithTwoDecimals(LOCATION.MIN_LAT, LOCATION.MAX_LAT),
//     'y': getRandomFloatWithTwoDecimals(LOCATION.MIN_LNG , LOCATION.MAX_LNG),
//   }
// }

// const getRandomFeatures = () => {
//   const features = [];
//   features.length = Math.max(1, Math.floor(Math.random() * (advantages.length + 1)))

//   for (let i = 0; i <features.length; i++) {
//     features[i] = advantages[i]

//   }
//   return features
// }

// const getRandomPhotos = () => {
//   const photos = [];
//   photos.length = Math.max(1, Math.floor(Math.random() * 7))

//   for (let i = 0; i <photos.length; i++) {
//     photos[i] = `http://o0.github.io/assets/images/tokyo/hotel${i}.jpg`

//   }
//   return photos
// }

// const createOffer = () => {
//   const randomTitlex = getRandomIntInclusive(0, TITLES.length - 1);
//   const randomType = getRandomIntInclusive(0, TYPE.length - 1);
//   const randomCheckin = getRandomIntInclusive(0, CHEKING.length - 1);
//   const randomDeskr = getRandomIntInclusive(0, DESCRIPTION.length - 1);
//   return {
//     'title': TITLES[randomTitlex],
//     'address': `x: 123, y: 456 `,
//     'price': getRandomIntInclusive(PRICES.MIN, PRICES.MAX),
//     'type': TYPE[randomType],
//     'rooms': getRandomIntInclusive(ROOMS.MIN,ROOMS.MAX),
//     'guests': getRandomIntInclusive(ROOMS.MIN,ROOMS.MAX),
//     'checkin': CHEKING[randomCheckin],
//     'checkout': CHEKING[randomCheckin],
//     'features': getRandomFeatures(),
//     'description': DESCRIPTION[randomDeskr],
//     'photos': getRandomPhotos()
//   }
// }

// const createData = () => {
//   const data = []
//   data.length = 1;

//   for (let i = 0; i <= LONG_DATA; i++) {
//     data[i] = {
//       'author': creaAeuthor(),
//       'offer': createOffer(),
//       'location': createLocation()
//     }
//   }
//   return data

// }

// const advertisements = createData()


// export {
//   advertisements
// }

