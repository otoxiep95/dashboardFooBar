"use strict"

function init() {
    let data = JSON.parse(FooBar.getData());
    console.log(data);
    // Make almost all templates charts etc...

    displayMenu(data);
    setInterval(update, 5000);

}
init();

function update() {
    let data = JSON.parse(FooBar.getData());

    updateMenu(data);
}

function updateMenu(data) {
    let bartendersArray = data.bartenders;
    bartendersArray.forEach(bartender => {
        if (bartender.status === "WORKING") {
            let bartenderId = bartender.name;

            document.querySelector(`#${bartenderId} .cercle`).style.backgroundColor = "rgba(29,221,24,0.6)";
        }

    })
}

function displayMenu(data) {
    let bartendersArray = data.bartenders;
    let templateBartenders = document.querySelector(".bartender-template").content;
    let containerBartenders = document.querySelector(".bartender-container");
    bartendersArray.forEach(bartender => {
        let clone = templateBartenders.cloneNode(true);
        clone.querySelector(".bartender-name").textContent = bartender.name;
        clone.querySelector(".cercle").style.backgroundColor = "rgba(244,181,78,0.6)";
        clone.querySelector(".bartender").id = bartender.name

        containerBartenders.appendChild(clone);
    });

}