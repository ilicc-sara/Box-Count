import "./style.css";

const addBtn = document.querySelector(".add");
const boxCont = document.querySelector(".box-container");

const emptyText = document.querySelector(".empty-text");
console.log(addBtn);

function boxCreator() {
  const box = { id: crypto.randomUUID() };

  const getBox = () => box;
  const getId = () => box.id;

  return { getBox, getId };
}

// const box = boxCreator();

function boxManagerCreator() {
  const boxes = [];

  const addToBoxes = (value) => boxes.push(value);
  const getBoxes = () => boxes;

  return { addToBoxes, getBoxes };
}

const boxManager = boxManagerCreator();

addBtn.addEventListener("click", function (e) {
  const box = boxCreator();

  if (boxManager.getBoxes().length < 10) {
    boxManager.addToBoxes(box);
    const item = document.createElement("div");
    item.classList.add("box");
    item.setAttribute("data-id", box.getId());
    item.innerHTML = `<div class="box">
    <button class="btn subtract">-</button>
    <button class="btn num">0</button>
    <button class="btn add">+</button>
    <ion-icon class="icon" name="trash-bin-outline"></ion-icon>
    </div>`;
    boxCont.appendChild(item);
    console.log(boxManager.getBoxes());
  }

  emptyText.classList.add("hidden");
});
