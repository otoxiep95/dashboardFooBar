"use strict";

const objBeerDesc = {
  nameBeer: "",
  image: "",
  appearance: "",
  flavor: "",
  aroma: ""
};

let beerDesc = "";
const beerDescArray = [];
let index = 0;

function init() {
  let data = JSON.parse(FooBar.getData());
  console.log(data);
  document.querySelector("#tap-button").addEventListener("click", showTap);
  document.querySelector("#alc-button").addEventListener("click", showAlc);

  document.querySelector("#desc-button").addEventListener("click", showDesc);
  document.querySelector("#type-button").addEventListener("click", showType);

  document.querySelector("#next").addEventListener("click", nextDesc);
  document.querySelector("#previous").addEventListener("click", preDesc);

  displayBeerTypes(data);
  buildBeer(data);
}

function nextDesc() {
  console.log("next");

  if (index === beerDescArray.length) {
    index = 0;
  } else {
    index++;
  }
  displayDesc();
}

function preDesc() {
  console.log("previous");
  if (index === 0) {
    index = beerDescArray.length;
  } else {
    index--;
  }
  displayDesc();
}

function showAlc() {
  console.log("show Alc");
  document.querySelector("#desc-screen").classList.remove("here");
  document.querySelector("#desc-screen").classList.add("none");
  document.querySelector("#tap-screen").classList.remove("here");
  document.querySelector("#tap-screen").classList.add("none");
  document.querySelector("#type-screen").classList.add("none");
  document.querySelector("#type-screen").classList.remove("here");

  document.querySelector("#alc-screen").classList.remove("none");
  document.querySelector("#alc-screen").classList.add("here");
}

function showTap() {
  document.querySelector("#desc-screen").classList.add("none");
  document.querySelector("#desc-screen").classList.remove("here");
  document.querySelector("#alc-screen").classList.add("none");
  document.querySelector("#alc-screen").classList.remove("here");
  document.querySelector("#type-screen").classList.add("none");
  document.querySelector("#type-screen").classList.remove("here");

  document.querySelector("#tap-screen").classList.add("here");
  document.querySelector("#tap-screen").classList.remove("none");
}

function showDesc() {
  document.querySelector("#alc-screen").classList.add("none");
  document.querySelector("#alc-screen").classList.remove("here");
  document.querySelector("#tap-screen").classList.add("none");
  document.querySelector("#tap-screen").classList.remove("here");
  document.querySelector("#type-screen").classList.add("none");
  document.querySelector("#type-screen").classList.remove("here");

  document.querySelector("#desc-screen").classList.add("here");
  document.querySelector("#desc-screen").classList.remove("none");
}

function showType() {
  document.querySelector("#alc-screen").classList.add("none");
  document.querySelector("#alc-screen").classList.remove("here");
  document.querySelector("#tap-screen").classList.add("none");
  document.querySelector("#tap-screen").classList.remove("here");
  document.querySelector("#desc-screen").classList.add("none");
  document.querySelector("#desc-screen").classList.remove("here");

  document.querySelector("#type-screen").classList.add("here");
  document.querySelector("#type-screen").classList.remove("none");
}

function displayBeerTypes(data) {
  let beerArray = data.beertypes;
  //console.log(beerArray);

  beerArray.forEach(element => {
    const alcContainer = document.querySelector("#alcohol-container");
    const alcTemplate = document.querySelector(".alcohol-template").content;

    const typeContainer = document.querySelector("#type-container");
    const typeTemplate = document.querySelector(".type-template").content;

    let cloneAlc = alcTemplate.cloneNode(true);
    let cloneType = typeTemplate.cloneNode(true);

    cloneAlc.querySelector(".beer-name").textContent = element.name;
    cloneAlc.querySelector(".alcohol-percentage").textContent =
      element.alc + "%";
    let percentIcons = cloneAlc.querySelector(".alcohol-percentage")
      .nextElementSibling;
    let lastIcon = percentIcons.firstElementChild;
    let middleIcon = lastIcon.nextElementSibling;

    if (element.alc < 7 && element.alc > 6) {
      lastIcon.style.opacity = "0.3";
    } else if (element.alc <= 6) {
      lastIcon.style.opacity = "0.3";
      middleIcon.style.opacity = "0.3";
    }

    cloneType.querySelector(".beer-name").textContent = element.name;
    cloneType.querySelector(".type-name").textContent = element.category;

    alcContainer.appendChild(cloneAlc);
    typeContainer.appendChild(cloneType);
  });
}

function buildBeer(data) {
  let beerArray = data.beertypes;
  beerArray.forEach(element => {
    beerDesc = Object.create(objBeerDesc);
    beerDesc.nameBeer = element.name;
    beerDesc.image = element.label;
    beerDesc.appearance = element.description.appearance;
    beerDesc.flavor = element.description.flavor;
    beerDesc.aroma = element.description.aroma;
    beerDescArray.push(beerDesc);
  });
  displayDesc();
}

function displayDesc() {
  console.log(index);
  document.querySelector(".beer-title").textContent =
    beerDescArray[index].nameBeer;
  document
    .querySelector(".beer-image")
    .setAttribute("src", "labels/" + beerDescArray[index].image);
  document.querySelector(".beer-appearance").textContent =
    beerDescArray[index].appearance;
  document.querySelector(".beer-flavor").textContent =
    beerDescArray[index].flavor;
  document.querySelector(".beer-aroma").textContent =
    beerDescArray[index].aroma;
}

init();
