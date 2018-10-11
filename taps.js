"use strict";
const NS = "http://www.w3.org/2000/svg";

function init() {
  let data = JSON.parse(FooBar.getData());
  // console.log(data);
  // Make almost all templates charts etc...
  const mainContainerTitles = document.querySelector(".main-container h1");

  TweenMax.from(mainContainerTitles, 1, { opacity: 0 });

  displayTaps(data);
  setTimeout(update, 100);
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
    let height = element.level / 6.25;
    tap.setAttribute("height", height);
    tap.setAttribute("y", 400 - height);
    let levelNumber =
      tap.parentElement.parentElement.nextElementSibling.firstElementChild;
    levelNumber.textContent = (element.level * 100) / 2500 + "%";
    let crossIcon = levelNumber.nextElementSibling;
    let warningIcon = crossIcon.nextElementSibling;
    console.log(crossIcon);
    if (height >= 40) {
      //do nothing
    } else if (height <= 40 && height > 0) {
      //display warning
      levelNumber.classList.add("none");
      warningIcon.classList.remove("none");
    } else {
      //display cross~
      levelNumber.classList.add("none");
      warningIcon.classList.add("none");
      crossIcon.classList.remove("none");
    }
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
    clone.querySelector(".percentage-tap").textContent =
      (element.level * 100) / 2500 + "%";
    rect.setAttribute("width", 100);
    let height = element.level / 6.25;
    rect.setAttribute("height", 0);
    rect.setAttribute("y", 400);
    rect.classList.add("level");

    rect.id = "tap" + element.id;
    console.log(element.beer);
    let beerImage = beerTypesArray.find(function(beerName) {
      return beerName.name === element.beer;
    });
    // console.log(beerImage);
    clone
      .querySelector(".label")
      .setAttribute("src", "labels/" + beerImage.label);
    let svg = clone.querySelector("svg");

    svg.appendChild(rect);
    TweenMax.fromTo(svg, 1.2, { opacity: 0 }, { opacity: 0.8 });
    TweenMax.from(clone.querySelector(".percentage-tap"), 1, { opacity: 0 });
    graphContainer.appendChild(clone);
  });
}
