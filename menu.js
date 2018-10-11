"use strict";

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
  //https://stackoverflow.com/questions/21728852/javascript-convert-timestamp-to-2-digit-style-of-hours-minutes
  var h = new Date(data.timestamp).getHours();
  var m = new Date(data.timestamp).getMinutes();

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;

  var output = h + ":" + m;
  if (h >= 22) {
    document.querySelector("#open").textContent = "closed";
  }
  document.querySelector("#time").textContent = output;
  bartendersArray.forEach(bartender => {
    if (bartender.status === "WORKING") {
      let bartenderId = bartender.name;

      document.querySelector(`#${bartenderId} .cercle`).style.backgroundColor =
        "rgba(29,221,24,0.6)";
    }
  });
}

function displayMenu(data) {
  let bartendersArray = data.bartenders;
  let templateBartenders = document.querySelector(".bartender-template")
    .content;
  let containerBartenders = document.querySelector(".bartender-container");
  //https://stackoverflow.com/questions/21728852/javascript-convert-timestamp-to-2-digit-style-of-hours-minutes
  var h = new Date(data.timestamp).getHours();
  var m = new Date(data.timestamp).getMinutes();

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;

  var output = h + ":" + m;
  document.querySelector("#time").textContent = output;

  bartendersArray.forEach(bartender => {
    let clone = templateBartenders.cloneNode(true);
    clone.querySelector(".bartender-name").textContent = bartender.name;
    clone.querySelector(".cercle").style.backgroundColor =
      "rgba(244,181,78,0.6)";
    clone.querySelector(".bartender").id = bartender.name;

    containerBartenders.appendChild(clone);
  });
}
