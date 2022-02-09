const clearAllBtn = document.getElementById("clear");

const form = document.getElementById("form");
const taskList = document.getElementById("tasks");

const showClearAllBtn = () => {
  clearAllBtn.classList.remove("hidden");
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

  newTaskItem.innerHTML = `<input type="checkbox" name="" id=""><li>${input}<li>`;
  newTaskItem.addEventListener("click", (event) => {
    if (event.target.tagName === "DIV") {
      event.target.classList.toggle("strikeThrough");
    }
  });
  taskList.append(newTaskItem);
  inputBox.value = "";
});

clearAllBtn.addEventListener("click", (event) => {
  //Remove all children
  const elements = [...taskList.children];
  elements.forEach((el) => el.remove());

  //Hide the button
  event.target.classList.add("hidden");
});
