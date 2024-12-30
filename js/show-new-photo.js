// импут загрузки фото пользователя
const imputDownloadsPhoto = document.querySelector('.ad-form-header__input  ');
// тег img куда рисуем фото юзера
const photoUser = document.querySelector('.ad-form-header__preview').querySelector('img');
// импут загрузки фото квартиры
const imputDownloadsPhotoApart = document.querySelector('.ad-form__input  ');
//контейнер куда отрисовываем фотки квартиры
const photoApart = document.querySelector('.ad-form__photo');



console.log(imputDownloadsPhotoApart)
const FILE_TYPE = ['gif', 'jpg', 'jpeg', 'png']

imputDownloadsPhoto.addEventListener('change', () => {
  const file = imputDownloadsPhoto.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPE.some((it) => {
    return fileName.endsWith(it)
  });
  if(matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      photoUser.src = reader.result;
    });
    reader.readAsDataURL(file)
  }

})


imputDownloadsPhotoApart.addEventListener('change', () => {
    const file = imputDownloadsPhotoApart.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPE.some((it) => {
      return fileName.endsWith(it)
    });
    if(matches) {
      const reader = new FileReader();
      const newImg = document.createElement('img');
      reader.addEventListener('load', () => {
      newImg.src = reader.result;
      newImg.style.with = '70px'
      newImg.style.height = '70px'
      photoApart.appendChild(newImg);
      });
      reader.readAsDataURL(file)
    }
})
