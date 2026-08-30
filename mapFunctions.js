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
leafletMap.on("click", onMapClick);
