const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const messageContainer = document.getElementById("message-container");
const clearAllContainer = document.getElementById("clear-all-container");
const clearAllButton = document.getElementById("clear-all-button");



inputBox.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addTask();
  }
});

let isClearAllVisible = localStorage.getItem("clearAllVisible") === "true";
if (isClearAllVisible && listContainer.children.length > 0) {
    clearAllContainer.style.display = "block";
} else {
    clearAllContainer.style.display = "none";
}

function addTask() {
  if (inputBox.value.trim() === '') {
    showMessage("You must write something!");
} else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.insertBefore(li, listContainer.firstChild);

    let spanDelete = document.createElement("span");
    spanDelete.innerHTML = "\u00d7";
    spanDelete.className = "delete";
    li.appendChild(spanDelete);
    
    
    let editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.classList.add("edit-button");
    li.appendChild(editButton);
    clearAllContainer.style.display = "block";
    isClearAllVisible = true;
    localStorage.setItem("clearAllVisible", "true");


    if (listContainer.children.length === 0) {
        clearAllContainer.style.display = "none";
        isClearAllVisible = false;
    } else if (!isClearAllVisible) {
        clearAllContainer.style.display = "block";
        isClearAllVisible = true;
    }
      localStorage.setItem("clearAllVisible", isClearAllVisible.toString());
}

  
  inputBox.value = "";
  saveData();
}

function showMessage(message) {
    messageContainer.textContent = message;
    messageContainer.style.display = "block";
    setTimeout(() => {
      messageContainer.style.display = "none";
    }, 3000);
}

function editTask(listItem) {
    const taskText = listItem.firstChild;
    const editText = document.createElement("input");
    editText.type = "text";
    editText.value = taskText.textContent;
    listItem.replaceChild(editText, taskText);
    editText.focus();
  
    editText.addEventListener("keyup", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        const newText = editText.value;
        if (newText.trim() !== "") {
          taskText.textContent = newText;
        }
        listItem.replaceChild(taskText, editText);
      }
    });
  
    editText.addEventListener("blur", function() {
      const newText = editText.value;
      if (newText.trim() !== "") {
        taskText.textContent = newText;
      }
      listItem.replaceChild(taskText, editText);
    });
  }
  

listContainer.addEventListener("click", function(e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveData();
  } else if (e.target.classList.contains("edit-button")) {
    editTask(e.target.parentElement);
  }
});

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

function clearData() {
    localStorage.clear();
    listContainer.innerHTML = "";
}

function clearAllTasks() {
    listContainer.innerHTML = "";
    clearAllContainer.style.display = "none";
    isClearAllVisible = false;
    localStorage.setItem("clearAllVisible", "false");
    saveData();
}

clearAllButton.addEventListener("click", clearAllTasks);


