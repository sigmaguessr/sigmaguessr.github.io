let secretLat;
let secretLng;
async function getRandomLocation() {
  let data = await fetch(
    "https://raw.githubusercontent.com/codergautam/worldguessr/refs/heads/master/data/world-main.json"
  );
  let text = await data.text();
  const lines = text.split("},{");
  randomLocation = "{" + lines[Math.floor(Math.random() * lines.length)] + "}";
  locData = JSON.parse(randomLocation);
  lat = locData.lat;
  lng = locData.lng;

  secretLat = lat;
  secretLng = lng;

  url = `https://www.google.com/maps/embed/v1/streetview?location=${lat},${lng}&key=AIzaSyA_t5gb2Mn37dZjhsaJ4F-OPp1PWDxqZyI&fov=100&language=en&heading=307`;
  document.getElementById("MainMap").src = url;
}
getRandomLocation();
function calcScore(miles) {
  c = 1.00108;
  t = -0.999222;
  return [miles.toFixed(1), (5000 * Math.pow(c, miles * t)).toFixed()];
}
function calcDist(lat1, lng1, lat2, lng2) {
  return (
    3958.8 *
    Math.acos(
      Math.sin(lat1 * (Math.PI / 180)) * Math.sin(lat2 * (Math.PI / 180)) +
        Math.cos(lat1 * (Math.PI / 180)) *
          Math.cos(lat2 * (Math.PI / 180)) *
          Math.cos(lng2 * (Math.PI / 180) - lng1 * (Math.PI / 180))
    )
  );
}
mapVisible = true;

document.addEventListener("keydown", (event) => {
  map = document.getElementById("map");
});
