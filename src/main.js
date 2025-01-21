import "./style.css";

const addBtn = document.querySelector(".add");
const boxCont = document.querySelector(".box-container");

const emptyText = document.querySelector(".empty-text");

const boxesNum = document.querySelector(".boxes-num");
const totalNum = document.querySelector(".total-boxes-num");

function boxCreator() {
  let id = crypto.randomUUID();
  let counter = 0;

  const getId = () => id;
  const getCounter = () => counter;

  const increaseCounter = () => (counter += 1);
  const decreaseCounter = () => (counter -= 1);

  return { getId, getCounter, increaseCounter, decreaseCounter };
}

function boxManagerCreator() {
  const boxes = [];
  let boxesCounter = 0;
  let totalCounter = 0;

  const addToBoxes = (value) => boxes.push(value);
  const getBoxes = () => boxes;

  const getboxesCounter = () => (boxesCounter = boxes.length);
  // napravi funkciju get total counter koja radi reduce na arr boxes i proveriti koliko je zbir svih countera

  const getTotalCounter = () =>
    (totalCounter = boxes.reduce((acc, cur) => {
      return acc + cur.getCounter();
    }, 0));
  // prettier-ignore
  return { addToBoxes, getBoxes, getboxesCounter, getTotalCounter };
}

const boxManager = boxManagerCreator();

addBtn.addEventListener("click", function (e) {
  // boxManager.setBoxesCounter();
  if (boxManager.getboxesCounter() < 10) {
    const box = boxCreator();
    boxManager.addToBoxes(box);
    const item = document.createElement("div");
    item.classList.add("box");
    item.setAttribute("data-id", box.getId());
    item.innerHTML = `
    <button class="btn subtract">-</button>
    <button id="${box.getId()}" class="btn num">${box.getCounter()}</button>
    <button class="btn add">+</button>
    <ion-icon class="delete" name="trash-bin-outline"></ion-icon>
    `;
    boxCont.appendChild(item);
  }

  emptyText.classList.add("hidden");
  boxesNum.textContent = boxManager.getboxesCounter();
});

boxCont.addEventListener("click", function (e) {
  // prettier-ignore
  if (!e.target.classList.contains("subtract") && !e.target.classList.contains("add") && !e.target.classList.contains("delete")) return;
  const targetId = e.target.closest(".box").getAttribute("data-id");

  const targetBox = boxManager
    .getBoxes()
    .find((box) => box.getId() === targetId);

  const element = document.getElementById(targetId);

  if (e.target.classList.contains("subtract")) {
    targetBox.decreaseCounter();
  }

  if (e.target.classList.contains("add")) {
    targetBox.increaseCounter();
  }
  element.textContent = targetBox.getCounter();
  totalNum.textContent = boxManager.getTotalCounter();

  if (e.target.classList.contains("delete")) {
    const deleteIndex = boxManager
      .getBoxes()
      .findIndex((box) => box.getId() === targetId);

    boxManager.getBoxes().splice(deleteIndex, 1);
    boxesNum.textContent = boxManager.getboxesCounter();
    totalNum.textContent = boxManager.getTotalCounter();

    const deleteEl = e.target.closest(".box");
    deleteEl.remove();
  }
});
