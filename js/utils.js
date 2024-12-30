const getRandomIntInclusive = (min, max) => {
  if (min < 0 || max < 0) {
    return -1; // Классический вариант возвращение ошибки, Так как функция должно возвращать число она вернет число
  }
  if(max < min) {
    [min, max] = [max, min]
  }
  min = Math.floor(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // Максимум и минимум включаются
}


const getRandomFloatWithTwoDecimals = (min, max) => {
  if (min < 0 || max < 0) {
    return -1; // Классический вариант возвращение ошибки, Так как функция должно возвращать число она вернет число
  }
  if(max < min) {
    [min, max] = [max, min]
  }
  min = Math.floor(min  * 1000);
  max = Math.floor(max * 1000);

  let randomFloat = Math.random() * (max - min +1 ) + min; //
  let roundedFloat  = Math.floor(randomFloat) / 1000

  return roundedFloat
}
const checkEscapeKey = (evt) => evt.key === ('Escape' || 'Esc');

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const stringCount = (text, sing) => text.length <= sing ? true : false ;

export {getRandomIntInclusive, getRandomFloatWithTwoDecimals, checkEscapeKey, stringCount, shuffleArray }
