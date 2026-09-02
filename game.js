let score = 0;
let mode = "guess";

let gameMode = "singleplayer";

// testMode = prompt("Enter Mode (s,m,h)")
// if (testMode == "h"){
// gameMode = "multiplayerHost"
// } else if (testMode == "m"){
//   gameMode = "multiplayer"

// } else {
//   mode = "singleplayer"
// }


let secretLat;
let secretLng;
let currentCoords = [0, 0];

mapVisible = true;
let marker;

//getRandomLocation();
// run on start




function startGame(mode){


  switch(mode){
    case("s"):
      changeScreen(menuElements,gameElements);
      getRandomLocation();
      break;
    case("h"):
      createRoom();
      displayRoom();
  
      break;


  }

}
function changeScreen(previousScreen,newScreen){
  previousScreen.forEach(e =>{
    e.style = "visibility:hidden";
  }
  )
    newScreen.forEach(e =>{
    e.style = "visibility:visible";
  }
  )
  
}
function submitScore() {
  mode = "results";
  changeScreen(gameElements,resultsElements);

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
  scoreElement.innerHTML = String(score) + " Points";
  resultText.innerText = `Your guess was ${data[0]} miles away \nYou got ${data[1]} points`;
}
function displayRoom(){
  multiplayerPanelElement.style = "visibility:visible;  animation: fadeIn 0.2s ease-in-out forwards;";
  gameCodeElement.innerHTML = currentRoom;
}
function nextLocation() {
  mode = "guess";
  changeScreen(resultsElements,gameElements);
  currentCoords = null;
  currentMarker.remove();
  currentResult.remove();
  marker.remove();
  currentLine.remove();
  getRandomLocation();
}
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
//Calculations for scoring and miles
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

// Multiplayer functions
function generateCode(){
  return Math.floor(Math.random()*1000000).toString().padStart(6,"0"

  );
}