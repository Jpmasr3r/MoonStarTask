export default class TaskView {
	constructor(documentRoot = document) {
		this.divTasks = documentRoot.getElementById("divTasks");
		this.btnAddTask = documentRoot.getElementById("btnAddTask");
		this.divFloatCreateTask = documentRoot.getElementById("divFloatCreateTask");
		this.btnFloatCreate = documentRoot.getElementById("btnFloatCreate");
		this.inpFloatCreateTitle = documentRoot.getElementById(
			"inpFloatCreateTitle",
		);
		this.inpFloatCreateDescription = documentRoot.getElementById(
			"inpFloatCreateDescription",
		);
		this.divFloatUpdateTask = documentRoot.getElementById("divFloatUpdateTask");
		this.inpFloatUpdateTitle = documentRoot.getElementById(
			"inpFloatUpdateTitle",
		);
		this.inpFloatUpdateDescription = documentRoot.getElementById(
			"inpFloatUpdateDescription",
		);
		this.btnFloatUpdate = documentRoot.getElementById("btnFloatUpdate");
		this.btnFilterTask = documentRoot.getElementById("btnFilterTask");
		this.divFloatFilterTask = documentRoot.getElementById("divFloatFilterTask");
		this.inpFloatFilterTitle = documentRoot.getElementById(
			"inpFloatFilterTitle",
		);
		this.inpFloatFilterDescription = documentRoot.getElementById(
			"inpFloatFilterDescription",
		);
		this.btnFloatFilter = documentRoot.getElementById("btnFloatFilter");
		this.html = documentRoot.documentElement;
		this.btnToggleTheme = documentRoot.getElementById("btnToggleTheme");
		this.imgToggleTheme = documentRoot.getElementById("imgToggleTheme");
		this.btnToggleMusic = documentRoot.getElementById("btnToggleMusic");
		this.imgToggleMusic = documentRoot.getElementById("imgToggleMusic");
		this.body = documentRoot.body;
		this.audBackgroundMusic = documentRoot.getElementById("audBackgroundMusic");
	}

	async toggleBackgroundMusic() {
		if (this.audBackgroundMusic.paused) {
			try {
				await this.audBackgroundMusic.play();
			} catch {
				this.btnToggleMusic.disabled = true;
				this.btnToggleMusic.setAttribute("aria-label", "Música indisponível");
				this.btnToggleMusic.title = "Música indisponível";
				return;
			}
		} else {
			this.audBackgroundMusic.pause();
		}

		const isPlaying = !this.audBackgroundMusic.paused;
		const label = isPlaying ? "Pausar música" : "Tocar música";
		this.btnToggleMusic.setAttribute("aria-pressed", String(isPlaying));
		this.btnToggleMusic.setAttribute("aria-label", label);
		this.btnToggleMusic.title = label;
	}

	setTheme(theme) {
		this.theme = theme;
		this.html.dataset.theme = this.theme ? "dark" : "light";
		this.imgToggleTheme.src = this.theme
			? "images/tema-escuro.svg"
			: "images/tema-claro.svg";
		this.imgToggleMusic.src = this.theme
			? "images/nota-musical-escuro.svg"
			: "images/nota-musical-claro.svg";
	}

	toggleTheme() {
		this.setTheme(!this.theme);
	}

	bindToggleTheme(handler) {
		this.btnToggleTheme.addEventListener("click", handler);
	}

	bindToggleMusic(handler) {
		this.btnToggleMusic.addEventListener("click", handler);
	}

	bindOpenCreate(handler) {
		this.btnAddTask.addEventListener("click", handler);
	}

	bindOpenFilter(handler) {
		this.btnFilterTask.addEventListener("click", handler);
	}

	bindCreate(handler) {
		this.btnFloatCreate.addEventListener("click", () => {
			handler({
				title: this.inpFloatCreateTitle.value,
				description: this.inpFloatCreateDescription.value,
			});
		});
	}

	bindUpdate(handler) {
		this.btnFloatUpdate.addEventListener("click", () => {
			handler({
				title: this.inpFloatUpdateTitle.value,
				description: this.inpFloatUpdateDescription.value,
			});
		});
	}

	bindFilter(handler) {
		this.btnFloatFilter.addEventListener("click", () => {
			handler({
				title: this.inpFloatFilterTitle.value,
				description: this.inpFloatFilterDescription.value,
			});
		});
	}

	openCreate() {
		this.divFloatCreateTask.style.display = "flex";
	}

	closeCreate() {
		this.divFloatCreateTask.style.display = "none";
		this.inpFloatCreateTitle.value = "";
		this.inpFloatCreateDescription.value = "";
	}

	openUpdate(task) {
		this.inpFloatUpdateTitle.value = task.title;
		this.inpFloatUpdateDescription.value = task.description;
		this.divFloatUpdateTask.style.display = "flex";
	}

	closeUpdate() {
		this.divFloatUpdateTask.style.display = "none";
	}

	openFilter() {
		this.divFloatFilterTask.style.display = "flex";
	}

	closeFilter() {
		this.divFloatFilterTask.style.display = "none";
		this.inpFloatFilterTitle.value = "";
		this.inpFloatFilterDescription.value = "";
	}

	toggleFilter(filtred) {
		if (filtred) {
			this.btnFilterTask.classList.add("filtred");
			this.btnFilterTask.textContent = "Filtrado";
		} else {
			this.btnFilterTask.classList.remove("filtred");
			this.btnFilterTask.textContent = "Filtrar";
		}
	}

	render(tasks, onRemove, onEdit, onFinish) {
		this.divTasks.replaceChildren();

		for (const task of tasks) {
			const divTask = document.createElement("div");
			divTask.classList.add("divTask");

			const taskDragHandle = document.createElement("div");
			taskDragHandle.classList.add("taskDragHandle");
			taskDragHandle.setAttribute("aria-hidden", "true");

			const taskDragDots = document.createElement("span");
			taskDragDots.classList.add("taskDragDots");

			const taskDragBar = document.createElement("span");
			taskDragBar.classList.add("taskDragBar");
			taskDragHandle.append(taskDragBar, taskDragDots);

			const h1TaskTitle = document.createElement("h1");
			h1TaskTitle.classList.add("h1TaskTitle");
			h1TaskTitle.textContent = task.title;

			const pTaskDescription = document.createElement("p");
			pTaskDescription.classList.add("pTaskDescription");
			pTaskDescription.textContent = task.description;

			const btnTaskRemove = document.createElement("button");
			btnTaskRemove.classList.add("btnTaskRemove");
			btnTaskRemove.type = "button";
			btnTaskRemove.textContent = "X";
			btnTaskRemove.addEventListener("click", () => onRemove(task.id));

			const btnTaskUpdate = document.createElement("button");
			btnTaskUpdate.classList.add("btnTaskUpdate");
			btnTaskUpdate.type = "button";
			btnTaskUpdate.textContent = "Editar";
			btnTaskUpdate.addEventListener("click", () => onEdit(task.id));

			const btnTaskStatus = document.createElement("button");
			btnTaskStatus.classList.add(
				"btnTaskStatus",
				task.finished ? "taskCompleted" : "taskRunning",
			);
			btnTaskStatus.type = "button";
			btnTaskStatus.textContent = task.finished ? "Completa" : "Em execução";
			btnTaskStatus.addEventListener("click", () => onFinish(task.id));

			divTask.append(
				taskDragHandle,
				h1TaskTitle,
				pTaskDescription,
				btnTaskRemove,
				btnTaskUpdate,
				btnTaskStatus,
			);
			this.divTasks.appendChild(divTask);
		}
	}
}
