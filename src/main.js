import "./style.css";

const addBtn = document.querySelector(".add");
const boxCont = document.querySelector(".box-container");

const emptyText = document.querySelector(".empty-text");

const boxesNum = document.querySelector(".boxes-num");
const totalNum = document.querySelector(".total-boxes-num");

function boxCreator() {
  let id = crypto.randomUUID();
  let counter = 0;
  // variabla let id
  const getId = () => id;
  const getCounter = () => counter;

  const increaseCounter = () => (counter += 1);
  const decreaseCounter = () => (counter -= 1);

  return { getId, getCounter, increaseCounter, decreaseCounter };
}

// const box = boxCreator();

function boxManagerCreator() {
  const boxes = [];
  let boxesCounter = 0;

  const addToBoxes = (value) => boxes.push(value);
  const getBoxes = () => boxes;

  const increaseboxesCounter = () => (boxesCounter += 1);
  const getboxesCounter = () => boxesCounter;

  return { addToBoxes, getBoxes, increaseboxesCounter, getboxesCounter };
}

const boxManager = boxManagerCreator();

addBtn.addEventListener("click", function (e) {
  const box = boxCreator();

  // if (boxManager.getBoxes().length < 10) {
  boxManager.addToBoxes(box);
  const item = document.createElement("div");
  item.classList.add("box");
  item.setAttribute("data-id", box.getId());
  item.innerHTML = `
    <button class="btn subtract">-</button>
    <button id="${box.getId()}" class="btn num">0</button>
    <button class="btn add">+</button>
    <ion-icon class="icon" name="trash-bin-outline"></ion-icon>
    `;
  boxCont.appendChild(item);

  boxManager.increaseboxesCounter();
  // }

  emptyText.classList.add("hidden");
  boxesNum.textContent = boxManager.getboxesCounter();
});

boxCont.addEventListener("click", function (e) {
  // prettier-ignore
  if (!e.target.classList.contains("subtract") && !e.target.classList.contains("add")) return;

  const targetBox = boxManager
    .getBoxes()
    .find(
      (box) => box.getId() === e.target.closest(".box").getAttribute("data-id")
    );

  const element = document.getElementById(targetBox.getId());

  if (e.target.classList.contains("subtract")) {
    targetBox.decreaseCounter();
  }

  if (e.target.classList.contains("add")) {
    targetBox.increaseCounter();
  }
  element.textContent = targetBox.getCounter();
});
