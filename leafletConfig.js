const leafletMap = L.map("map", { zoomControl: false }).setView(
  [51.505, -0.09],
  3
);
let marker;
let mode = "guess";
let resultElement = document.getElementById("result");
let resultScreen = document.getElementById("resultsScreen");
let scoreElement = document.getElementById("score");
let mapElement = document.getElementById("map");
let score = 0;
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  zoomControl: false,
}).addTo(leafletMap);

let currentCoords = [0, 0];

function onMapClick(e) {
  const lat = e.latlng.lat;
  const lng = e.latlng.lng;
  const b = [lat, lng];
  if (marker != null) {
    marker.remove();
  }

  marker = L.marker(b).addTo(leafletMap);
  currentCoords = b;
}

function submitScore() {
  mode = "results";
  resultElement.style = "visibility:visible";
  resultScreen.style = "visibility:visible";
  data = calcScore(
    calcDist(
      parseFloat(currentCoords[0]),
      parseFloat(currentCoords[1]),
      secretLat,
      secretLng
    )
  );
  showResults(data);
  score += parseInt(data[1]);
  scoreElement.innerHTML = String(score);
  resultsScreen.innerText = `Your guess was ${data[0]} miles away \nYou got ${data[1]} points`;
}
function nextLocation() {
  mode = "guess";
  resultElement.style = "visibility:hidden";
  resultScreen.style = "visibility:hidden";
  currentCoords = null;
  currentMarker.remove();
  currentResult.remove();
  marker.remove();
  currentLine.remove();
  getRandomLocation();
}
leafletMap.on("click", onMapClick);

mapElement.addEventListener("mouseenter", (event) => {
  setTimeout(() => {
    leafletMap.invalidateSize();
  }, 100);
});

mapElement.addEventListener("mouseleave", (event) => {
  setTimeout(() => {
    leafletMap.invalidateSize();
  }, 100);
});

document.addEventListener("keydown", (event) => {
  if (event.key === " ") {
    if (mode == "guess" && currentCoords != null) {
      submitScore();
    } else if (mode == "results") {
      nextLocation();
    }
  }
});
