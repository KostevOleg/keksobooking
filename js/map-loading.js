import {toggleFormAccessibility} from './page-block.js'
import { renderOffers } from './render-advertisements.js'

const adressImput = document.querySelector('#address');
const mapContainer = document.querySelector('.map__canvas');
let isBlock = false;
let map;
let mainMarker;
adressImput.readOnly = true;


const mapRendering = () => {
   return new Promise((resolve, reject) => {
   map = L.map(mapContainer)
  .setView({
    lat: 35.6795,
    lng: 139.7290,
  }, 13 );

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainPinIcon = L.icon({
    iconUrl: '../leaflet/img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  mainMarker = L.marker(
      {
        lat: 35.6775,
        lng: 139.7427,
      },
      {
        draggable: true,
        icon: mainPinIcon,
      }
    ).addTo(map);

    mainMarker.on('moveend', (evt) => {
      let lat = evt.target._latlng.lat.toFixed(5);
      let lng = evt.target._latlng.lng.toFixed(5)
      adressImput.value = `${lat} : ${lng}`
    });
    resolve()
  })
}

const resetMarkerPosition = () => {
  if (map && mainMarker) {
    const initialMarkerPosition = { lat: 35.6775, lng: 139.7427 };
    mainMarker.setLatLng(initialMarkerPosition);
    adressImput.value = `${initialMarkerPosition.lat.toFixed(5)} : ${initialMarkerPosition.lng.toFixed(5)}`;
  } else {
    console.error('Ошибка: Карта или маркер не определены');
  }
};



const loadMapAndUnlockForm = async () => {
  try {
    await mapRendering(); // Дождаться загрузки карты
      toggleFormAccessibility(); // Разблокировать форму
  } catch (error) {
      console.error('Ошибка при отрисовке карты:', error);
  }
};

loadMapAndUnlockForm()



const renderMarkers = (advertisements) => {
  // удаляем маркеры если они есть
  map.eachLayer(layer => {
    if (layer instanceof L.Marker && layer !== mainMarker) {
      map.removeLayer(layer);
    }
  });

  advertisements.forEach((el) => {
    const lat = el.location.lat;
    const lng = el.location.lng;
    const otherIcon = L.icon({
      iconUrl: '../leaflet/img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],

    })
      const marker = L.marker({
        lat,
        lng,
      },
      {
        icon: otherIcon,
      }
      );
        marker.addTo(map)
        marker.bindPopup(() => renderOffers([el]), { keepInView: true });

      })
  }

export {renderMarkers, resetMarkerPosition}



