let mapElement;
let resultElement;
let resultScreen;
let scoreElement;
let nextButton;
let resultText;
document.addEventListener("DOMContentLoaded",()=>{
mapElement = document.getElementById("map");
resultElement = document.getElementById("result");
resultScreen = document.getElementById("resultsScreen");
scoreElement = document.getElementById("score");
nextButton = document.getElementById("nextButton");
resultText = document.getElementById("resultText");




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

})

