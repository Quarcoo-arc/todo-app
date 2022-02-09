const clearAllBtn = document.getElementById("clear");

const form = document.getElementById("form");
const taskList = document.getElementById("tasks");
let id = 0;
let selectedTasks = [];

const showClearAllBtn = () => {
  clearAllBtn.classList.remove("hidden");
};

taskList.addEventListener("dragover", (event) => {
  event.preventDefault();
  event.stopImmediatePropagation();
});

taskList.addEventListener("drop", (event) => {
  if (event.target.tagName === "UL") {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));
    event.stopImmediatePropagation();
    // console.log(document.getElementById(data));
  }
});

const taskClickHandler = (event) => {
  //Stike-through
  if (event.target.tagName === "DIV" || event.target.tagName === "LI") {
    event.target.classList.toggle("strikeThrough");
  } else if (event.target.tagName === "INPUT") {
    //Select
    if (!selectedTasks.includes(event.target.closest("div"))) {
      selectedTasks.push(event.target.closest("div"));
      console.log(selectedTasks);
      //enable clear button
      clearAllBtn.disabled = false;
    } else {
      //Deselect
      selectedTasks = selectedTasks.filter(
        (el) => el !== event.target.closest("div")
      );
      if (selectedTasks.length === 0) {
        clearAllBtn.disabled = true;
      }
      console.log(selectedTasks);
    }
    console.log(event.target);
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("Submitting...");
  console.log(event.target);

  //Show ClearAll Button
  showClearAllBtn();

  const inputBox = document.getElementById("input");

  const input = inputBox.value;

  const newTaskItem = document.createElement("div");

  newTaskItem.innerHTML = `<input type="checkbox" name="" id="checkbox-${id++}"><li>${input}<li>`;

  newTaskItem.addEventListener("click", taskClickHandler);

  newTaskItem.id = `task-${id++}`;

  newTaskItem.draggable = true;

  newTaskItem.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text", event.target.id);
    event.dataTransfer.effectAllowed = "move";
    console.log("dragging");
  });

  taskList.append(newTaskItem);
  inputBox.value = "";
});

clearAllBtn.addEventListener("click", (event) => {
  //disable button
  event.target.disabled = true;

  //Remove all children
  const elements = [...selectedTasks];
  elements.forEach((el) => el.remove());

  //Hide the button
  if (taskList.children.length === 0) {
    event.target.classList.add("hidden");
  }
});
