import Task from "./src/Task.js";

const divTasks = document.getElementById("divTasks");
const btnAddTask = document.getElementById("btnAddTask");
const divFloatCreateTask = document.getElementById("divFloatCreateTask");
const btnFloatCreate = document.getElementById("btnFloatCreate");
const inpFloatTitle = document.getElementById("inpFloatTitle");
const inpFloatDescription = document.getElementById("inpFloatDescription");

const tasks = [];

btnAddTask.addEventListener("click", () => {
	divFloatCreateTask.style.display = "flex";
});

btnFloatCreate.addEventListener("click", () => {
	divFloatCreateTask.style.display = "none";

	const task = new Task(inpFloatTitle.value, inpFloatDescription.value);

	tasks.push(task);
	createAndAppendTask();
});

function createAndAppendTask() {
	tasks.forEach((e) => {
		const divTask = document.createElement("div");
		divTask.classList.add("divTask");

		const h1TaskTitle = document.createElement("h1");
		h1TaskTitle.classList.add("h1TaskTitle");
		h1TaskTitle.textContent = e.title;

		const pTaskDescription = document.createElement("p");
		pTaskDescription.classList.add("pTaskDescription");
		pTaskDescription.textContent = e.description;

		const btnTaskRemove = document.createElement("button");
		btnTaskRemove.classList.add("btnTaskRemove");
		btnTaskRemove.textContent = "X";

		const btnTaskUpdate = document.createElement("button");
		btnTaskUpdate.classList.add("btnTaskUpdate");
		btnTaskUpdate.textContent = "Update";

		divTask.appendChild(h1TaskTitle);
		divTask.appendChild(pTaskDescription);
		divTask.appendChild(btnTaskRemove);
		divTask.appendChild(btnTaskUpdate);

		divTasks.appendChild(divTask);
	});
}

createAndAppendTask();
