const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemFilter = document.getElementById("item-filter");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");

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

const addItem = (e) => {
  e.preventDefault();

  const newItem = itemInput.value;
  if (newItem === "") {
    alert("Please add an item");
    return;
  }

  const item = document.createElement("li");
  item.appendChild(document.createTextNode(newItem));
  const button = createButton("remove-item btn-link text-red");
  item.appendChild(button);
  itemList.append(item);
  itemInput.value = "";
  checkUI();
};

const clearItems = () => {
  const items = Array.from(itemList.children);
  items.forEach((item) => item.remove());
  checkUI();
};

const removeItem = (e) => {
  const removeBtn = e.target.parentElement;
  if (removeBtn.classList.contains("remove-item")) {
    if (confirm("Are you sure?")) {
      removeBtn.parentElement.remove();
    }
  }

  checkUI();
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

  checkUI();
};

const checkUI = () => {
  const items = itemList.querySelectorAll("li");

  if (items.length === 0) {
    itemFilter.style.display = "none";
    clearBtn.style.display = "none";
  } else {
    itemFilter.style.display = "block";
    clearBtn.style.display = "block";
  }
};

// Event Listeners
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearItems);
itemFilter.addEventListener("input", filterItems);
checkUI();
