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

  const increaseboxesCounter = () => (boxesCounter += 1);
  const decreaseboxCounter = () => (boxesCounter -= 1);
  const getboxesCounter = () => boxesCounter;
  // napravi funkciju get total counter koja radi reduce na arr boxes i proveriti koliko je zbir svih countera
  // const setBoxesCounter = () => boxesCounter = boxes.lenght;

  const getTotalCounter = () => totalCounter;
  const increaseTotalCounter = () => (totalCounter += 1);
  const decreaseTotalCounter = () => (totalCounter -= 1);
  const subtractTotalCounter = (value) => totalCounter - value;
  // prettier-ignore
  return { addToBoxes, getBoxes, increaseboxesCounter, decreaseboxCounter, getboxesCounter, getTotalCounter, increaseTotalCounter, decreaseTotalCounter, subtractTotalCounter };
}

const boxManager = boxManagerCreator();

addBtn.addEventListener("click", function (e) {
  if (boxManager.getBoxes().length < 10) {
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

    boxManager.increaseboxesCounter();
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
    boxManager.decreaseTotalCounter();
  }

  if (e.target.classList.contains("add")) {
    targetBox.increaseCounter();
    boxManager.increaseTotalCounter();
  }
  element.textContent = targetBox.getCounter();
  totalNum.textContent = boxManager.getTotalCounter();

  if (e.target.classList.contains("delete")) {
    console.log(targetBox.getCounter());
    boxManager.subtractTotalCounter(3);
    totalNum.textContent = boxManager.getTotalCounter();
    console.log(boxManager.getTotalCounter());

    const deleteEl = e.target.closest(".box");
    deleteEl.remove();
    boxManager.decreaseboxCounter();
    boxesNum.textContent = boxManager.getboxesCounter();
  }
});
