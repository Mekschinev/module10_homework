const btn = document.querySelector("#location");
const messages = document.querySelector(".messages");
const btnSend = document.querySelector("#start");
const msgInpunt = document.getElementById("input");

const socket = new WebSocket("wss://echo-ws-service.herokuapp.com");

socket.onmessage = function (event) {
  const message = event.data;
  showRecevedMessage(message);
};

btnSend.addEventListener("click", () => {
  const message = msgInpunt.value;
  msgInpunt.value = "";
  socket.send(message);
  showSentMessage(message);
});

const sendPositionLink = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const locationLink = `<a href="https://www.openstreetmap.org/#map=18/${latitude}/${longitude}" target="_blank">Гео-локация</a>`;
  showSentMessage(locationLink);
};

btn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(sendPositionLink).style.visibility = "hidden";
  }
});


function showSentMessage(message) {
    const sent = document.createElement("div");
    sent.classList.add("sent");
    sent.innerHTML = message;
    messages.prepend(sent);
  }

function showRecevedMessage(message) {
  const recevied = document.createElement("div");
  recevied.classList.add("recevied");
  recevied.innerHTML = message;
  messages.prepend(recevied); 
}
