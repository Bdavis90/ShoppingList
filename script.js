const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemFilter = document.getElementById("item-filter");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const formBtn = itemForm.querySelector("button");
let isEditMode = false;

const displayItems = () => {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDOM(item));
  resetUI();
};

const createButton = (className) => {
  const button = document.createElement("button");
  button.className = className;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
};

const createIcon = (className) => {
  const icon = document.createElement("i");
  icon.className = className;
  return icon;
};

const onAddItemSubmit = (e) => {
  e.preventDefault();

  const newItem = itemInput.value;
  if (newItem === "") {
    alert("Please add an item");
    return;
  }

  if (isEditMode) {
    const itemToEdit = itemList.querySelector(".edit-mode");
    removeItem(itemToEdit);
    isEditMode = false;
  } else {
    if (checkIfItemExists(newItem)) {
      alert("That item already exists!");
      return;
    }
  }

  addItemToDOM(newItem);

  addItemToStorage(newItem);

  itemInput.value = "";
  resetUI();
};

const addItemToDOM = (item) => {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));
  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);
  itemList.appendChild(li);
};

const addItemToStorage = (item) => {
  const itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.push(item);

  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
};

const removeItemFromStorage = (item) => {
  let itemsFromStorage = getItemsFromStorage();
  itemsFromStorage = itemsFromStorage.filter(
    (currItem) => currItem !== item.textContent
  );
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
};

const getItemsFromStorage = () => {
  let itemsFromStorage;
  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  return itemsFromStorage;
};

const clearItems = () => {
  const items = Array.from(itemList.children);
  items.forEach((item) => item.remove());
  localStorage.removeItem("items");
  resetUI();
};

const onClickItem = (e) => {
  const item = e.target.parentElement;
  if (item.classList.contains("remove-item")) {
    removeItem(item.parentElement);
  } else {
    setItemToEdit(e.target);
  }
};

const checkIfItemExists = (item) => {
  const itemsFromStorage = getItemsFromStorage();

  return itemsFromStorage.includes(item);
};

const setItemToEdit = (item) => {
  isEditMode = true;
  itemList
    .querySelectorAll("li")
    .forEach((i) => i.classList.remove("edit-mode"));
  item.classList.add("edit-mode");
  formBtn.innerHTML = `<i class="fa-solid fa-pen"></i> Update Item`;
  formBtn.style.backgroundColor = "#228b22";
  itemInput.value = item.textContent;
};

const removeItem = (item) => {
  if (confirm("Are you sure?")) {
    item.remove();
    removeItemFromStorage(item);
    resetUI();
  }
};

const filterItems = (e) => {
  const items = Array.from(document.querySelectorAll("li"));
  const text = e.target.value.toLowerCase();
  items.forEach((item) => {
    if (!item.textContent.toLowerCase().includes(text)) {
      item.style.display = "none";
    } else {
      item.style.display = "flex";
    }
  });

  resetUI();
};

const resetUI = () => {
  const items = itemList.querySelectorAll("li");

  if (items.length === 0) {
    itemFilter.style.display = "none";
    clearBtn.style.display = "none";
  } else {
    itemFilter.style.display = "block";
    clearBtn.style.display = "block";
  }

  formBtn.innerHTML = `<i class="fa-solid fa-plus"></i> Add Item`;
  formBtn.style.backgroundColor = "#333";
};

// Initialize App

const init = () => {
  // Event Listeners
  itemForm.addEventListener("submit", onAddItemSubmit);
  itemList.addEventListener("click", onClickItem);
  clearBtn.addEventListener("click", clearItems);
  itemFilter.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayItems);
  resetUI();
};

init();
