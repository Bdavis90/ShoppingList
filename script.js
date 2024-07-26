const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const createButton = (className) => {
    const button = document.createElement("button");
    button.className = className;
    const icon = createIcon("fa-solid fa-xmark");
    button.appendChild(icon);
    console.log(button);
    return button;
}

const createIcon = (className) => {
    const icon = document.createElement("i");
    icon.className = className;
    return icon;
}

const addItem = e => {
    e.preventDefault();

    const newItem = itemInput.value;
    if(newItem === "") {
        alert("Please add an item");
        return;
    }; 
    
    const item = document.createElement("li");
    item.appendChild(document.createTextNode(newItem));
    const button = createButton("btn-link text-red");
    item.appendChild(button);
    itemList.append(item);
    itemInput.value = ""
}
itemForm.addEventListener("submit", addItem);