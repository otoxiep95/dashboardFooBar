"use strict"
const NS = "http://www.w3.org/2000/svg";


function init() {
    let data = JSON.parse(FooBar.getData());
    console.log(data);
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
        let height = (element.level) / 5;
        tap.setAttribute("height", height);
        tap.setAttribute("y", 500 - height);
    })
}


function displayTaps(data) {
    let tapsArray = data.taps;

    tapsArray.forEach(element => {
        const graphContainer = document.querySelector(".graph-container");
        const tapTemplate = document.querySelector(".tap-template").content;
        const rect = document.createElementNS(NS, "rect");

        let clone = tapTemplate.cloneNode(true);

        clone.querySelector(".beer-name").textContent = element.beer;
        rect.setAttribute("width", 100);
        let height = (element.level) / 5;
        rect.setAttribute("height", height);
        rect.setAttribute("y", 500 - height);
        rect.setAttribute("fill", "white");
        rect.setAttribute("opacity", 0.8);
        rect.id = "tap" + element.id;

        let svg = clone.querySelector("svg");

        svg.appendChild(rect);
        graphContainer.appendChild(clone);
    });
}
