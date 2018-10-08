function init() {
  let data = JSON.parse(FooBar.getData());
  console.log(data);
  // Make almost all templates charts etc...

  //setInterval(update, 5000);
  setInterval(show, 5000);
}
init();
function show() {
  let data = JSON.parse(FooBar.getData());
  console.log(data);
}
