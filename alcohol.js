"use strict";


function init() {
    let data = JSON.parse(FooBar.getData());
    console.log(data);
    document.querySelector("#tap-button").addEventListener("click", showTap);
    document.querySelector("#alc-button").addEventListener("click", showAlc);

    document.querySelector("#desc-button").addEventListener("click", showDesc);
    document.querySelector("#type-button").addEventListener("click", showType);

    displayBeerTypes(data);

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
    console.log(beerArray);

    beerArray.forEach(element => {
        const alcContainer = document.querySelector("#alcohol-container");
        const alcTemplate = document.querySelector(".alcohol-template").content;

        const typeContainer = document.querySelector("#type-container");
        const typeTemplate = document.querySelector(".type-template").content;

        const descContainer = document.querySelector("#desc-container");
        const descTemplate = document.querySelector(".desc-template").content;

        let cloneAlc = alcTemplate.cloneNode(true);
        let cloneType = typeTemplate.cloneNode(true);
        let cloneDesc = descTemplate.cloneNode(true);

        cloneAlc.querySelector(".beer-name").textContent = element.name;
        cloneAlc.querySelector(".alcohol-percentage").textContent = (element.alc) + "%";

        cloneType.querySelector(".beer-name").textContent = element.name;
        cloneType.querySelector(".type-name").textContent = element.category;

        alcContainer.appendChild(cloneAlc);
        typeContainer.appendChild(cloneType);


    })
}

init();