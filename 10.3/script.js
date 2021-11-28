const wsUri = "wss://echo-ws-service.herokuapp.com/";

const output = document.getElementById("output");
const input = document.querySelector('.input');
const btnSend = document.querySelector('.btn_send');
const btnGeo = document.querySelector('.btn_location');

let websocket = new WebSocket(wsUri);

websocket.onopen = function(event) {
    writeToChat("CONNECTED");
  };
websocket.onmessage = (event) => {
    writeToChat(event.data, true);
}

btnSend.addEventListener('click', () => {
    websocket.send(input.value);
    writeToChat(input.value, false);
    input.value === "";
}
    );
function writeToChat(message, chat) {
    let messageHTML = `<div class="${chat}">${message}</div>`;
    output.innerHTML += messageHTML;
}

const error = () => {
  let messageHTML = `<div class="location">'Невозможно получить ваше местоположение'</div>`;
  output.innerHTML += messageHTML;
}
const success = (position) => {
  console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;

   let messageHTML = `<div class="location">Широта: ${latitude} °, Долгота: ${longitude} °
  <a href = "https://www.openstreetmap.org/#map=18/${latitude}/${longitude}">Положение на карте</a></div>`;
  output.innerHTML += messageHTML  
}

btnGeo.addEventListener('click', () => {    
  if (!navigator.geolocation) {
    let messageHTML = `<div class="location">Geolocation не поддерживается вашим браузером</div>`;
    output.innerHTML += messageHTML
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
});