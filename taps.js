"use strict";
const NS = "http://www.w3.org/2000/svg";

function init() {
  let data = JSON.parse(FooBar.getData());
  // console.log(data);
  // Make almost all templates charts etc...

  displayTaps(data);
  setInterval(update, 5000);
  // setInterval(show, 5000);
}
init();

function update() {
  let data = JSON.parse(FooBar.getData());

  updateTaps(data);
}

function updateTaps(newdata) {
  let newtapsArray = newdata.taps;
  newtapsArray.forEach(element => {
    let levelId = "tap" + element.id;
    // console.log(levelId);

    let tap = document.querySelector(`#${levelId}`);
    let height = element.level / 10;
    tap.setAttribute("height", height);
    tap.setAttribute("y", 250 - height);
    let levelNumber =
      tap.parentElement.parentElement.nextElementSibling.firstElementChild;
    levelNumber.textContent = (element.level * 100) / 2500 + "%";
  });
}

function displayTaps(data) {
  let tapsArray = data.taps;
  let beerTypesArray = data.beertypes;
  tapsArray.forEach(element => {
    const graphContainer = document.querySelector(".graph-container");
    const tapTemplate = document.querySelector(".tap-template").content;
    const rect = document.createElementNS(NS, "rect");

    let clone = tapTemplate.cloneNode(true);
    // MISSING PERCENTAGES
    clone.querySelector(".beer-name").textContent =
      (element.level * 100) / 2500 + "%";
    rect.setAttribute("width", 100);
    let height = element.level / 5;
    rect.setAttribute("height", height);
    rect.setAttribute("y", 500 - height);
    rect.classList.add("level");

    rect.id = "tap" + element.id;
    // console.log(element.beer);
    let beerImage = beerTypesArray.find(function(beerName) {
      return beerName.name === element.beer;
    });
    // console.log(beerImage);
    clone
      .querySelector(".label")
      .setAttribute("src", "labels/" + beerImage.label);
    let svg = clone.querySelector("svg");

    svg.appendChild(rect);
    graphContainer.appendChild(clone);
  });
}
