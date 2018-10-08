"use strict";

function init() {
  let data = JSON.parse(FooBar.getData());
  console.log(data);

  // Make almost all templates charts etc...
  buildQueue(data);

  //setInterval(update, 5000);
  //setInterval(show, 5000);
}
init();
function update() {
  let data = JSON.parse(FooBar.getData());
  console.log(data);
}

function buildQueue(data) {}
