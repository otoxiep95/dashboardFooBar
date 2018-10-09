"use strict";
const queueList = document.querySelector(".list-queue");

function init() {
  let data = JSON.parse(FooBar.getData());
  console.log(data);

  // Make almost all templates charts etc...
  buildQueue(data);

  setInterval(update, 5000);
  //setInterval(show, 5000);
}
init();

function update() {
  let data = JSON.parse(FooBar.getData());

  updateQueue(data);
}

function buildQueue(data) {
  let queueArray = data.queue;
  let beerTypesArray = data.beertypes;
  //let bartendersArray = data.bartenders;
  //console.log(queueArray);

  queueArray.forEach(customerOrder => {
    //set variuables
    let oneOrder = customerOrder.order;

    //https://stackoverflow.com/questions/44959165/remove-duplicates-from-array-convert-to-array-of-objects-and-add-duplicate-coun
    const result = oneOrder.reduce(function(prev, curr) {
      const index = prev.findIndex(el => el.name === curr);

      if (index !== -1) {
        prev[index].count += 1;
      } else {
        prev.push({ name: curr, count: 1, id: customerOrder.id });
      }

      return prev;
    }, []);

    result.forEach(orderObject => {
      //console.log(orderObject, beerTypesArray);
      let beerImage = beerTypesArray.find(function(beer) {
        return beer.name === orderObject.name;
      });
      orderObject.label = beerImage.label;
    });

    // console.log(result);
    showQueueItem(result);
    //end outer foreach
  });

  //console.log(beerTypesArray);
  //console.log(result);

  // queueList.appendChild(clone);
}
function updateQueue(data) {
  console.log(data);
  let beerTypesArray = data.beertypes;
  const template = document.querySelector(".order-item-template").content;
  const existing = document.querySelectorAll("ol li");
  existing.forEach(item => {
    const inQueue = data.queue.find(function(el) {
      return el.id == item.dataset.qid;
    });
    if (inQueue) {
      //do nothing
    } else {
      item.remove();
    }
  });
  /*console.log(
    "I need to show " +
      (data.queue.length - document.querySelectorAll("ol li").length)
  );*/
  data.queue.forEach(item => {
    if (document.querySelector(`li[data-qid="${item.id}"]`)) {
    } else {
      console.log("add", item);

      //console.log(item);
      //change content

      let newOrder = item.order;
      console.log(newOrder);

      const result = newOrder.reduce(function(prev, curr) {
        const index = prev.findIndex(el => el.name === curr);

        if (index !== -1) {
          prev[index].count += 1;
        } else {
          prev.push({ name: curr, count: 1, id: item.id });
        }

        return prev;
      }, []);
      console.log(result);
      result.forEach(orderObject => {
        //console.log(orderObject, beerTypesArray);
        let beerImage = beerTypesArray.find(function(beer) {
          return beer.name === orderObject.name;
        });
        orderObject.label = beerImage.label;
      });
      showQueueItem(result);
    }
  });
}

function showQueueItem(order) {
  //console.log(order);
  const li = document.createElement("li");
  li.dataset.qid = order[0].id;
  const template = document.querySelector(".order-item-template").content;

  order.forEach(item => {
    const clone = template.cloneNode(true);
    //console.log(item);
    //change content
    clone
      .querySelector("img")
      .setAttribute("src", "Images/labels/" + item.label);
    clone.querySelector("p").textContent = item.count;
    li.appendChild(clone);
  });

  document.querySelector(".list-queue").appendChild(li);
}

function addNewItem(newOrder) {
  const clone = template.cloneNode(true);
  const li = document.createElement("li");
  li.dataset.qid = item.id;
  clone.querySelector("img").setAttribute("src", "Images/labels/" + item.label);
  clone.querySelector("p").textContent = item.count;
  li.appendChild(clone);
  document.querySelector(".list-queue").appendChild(li);
}
