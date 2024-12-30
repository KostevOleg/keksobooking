const URLS = {
  GET: 'https://23.javascript.htmlacademy.pro/keksobooking/data',
  POST: 'https://reqres.in/api/users'
}

const request = (onSuccess, onErrore, method, data) => {
  fetch(URLS[method], {
    method: method,
    body: data,})
    .then((respons) => respons.json())
    .then((data) => onSuccess(data))
    .catch(() => onErrore())
}


export { request }
