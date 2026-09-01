let mapElement;
let resultElement;
let resultScreen;
let scoreElement;
let nextButton;
let menuBg;
let resultText;
let resultsMapElement;

let menuElements;
let gameElements;
let resultsElements; 

document.addEventListener("DOMContentLoaded",()=>{
mapElement = document.getElementById("map");
resultElement = document.getElementById("result");
resultScreen = document.getElementById("resultsScreen");
scoreElement = document.getElementById("score");
nextButton = document.getElementById("nextButton");
resultText = document.getElementById("resultText");
menuBg = document.getElementById("menuBg");
resultsMapElement = document.getElementById("result");
mainMapElement = document.getElementById("MainMap");
menuDivElement = document.getElementById("menuDiv");
menuButtonBarElement =  document.getElementById("menuButtonBar");

menuElements = [menuBg,menuDiv];
resultsElements = [scoreElement,resultElement,resultsScreen,resultsMapElement];
gameElements = [scoreElement,MainMap];

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

