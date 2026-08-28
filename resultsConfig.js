const resultsMap = L.map("result", { zoomControl: false }).setView(
  [51.505, -0.09],
  3
);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  zoomControl: false,
}).addTo(resultsMap);
let currentMarker;
let currentLine;
let currentResult;
function showResults(data) {
  currentMarker = L.marker(currentCoords).addTo(resultsMap);
  currentResult = L.marker([secretLat, secretLng], { icon: greenIcon }).addTo(
    resultsMap
  );
  currentLine = L.polyline([currentCoords, [secretLat, secretLng]], {
    color: "black",
    dashArray: ["5", "10"],
  }).addTo(resultsMap);
  resultsMap.fitBounds(currentLine.getBounds());
}

var greenIcon = new L.Icon({
  iconUrl:
    "https://github.com/pointhi/leaflet-color-markers/blob/master/img/marker-icon-2x-red.png?raw=true",
  shadowUrl:
    "https://github.com/pointhi/leaflet-color-markers/blob/master/img/marker-shadow.png?raw=true",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
