import Task from "./Task.js";
import TaskRepository from "./TaskRepository.js";
import TaskView from "./TaskView.js";

export default class TaskApp {
	constructor(repository = new TaskRepository(), view = new TaskView()) {
		this.repository = repository;
		this.view = view;
		this.tasks = [];
		this.selectedTaskId = null;
	}

	start() {
		const stored = this.repository.getAll();
		this.setTasks(stored.storedTasks);
		this.view.setTheme(stored.storedTheme);

		this.view.bindOpenCreate(() => this.view.openCreate());
		this.view.bindOpenFilter(() => this.view.openFilter());
		this.view.bindCreate((data) => this.createTask(data));
		this.view.bindUpdate((data) => this.updateTask(data));
		this.view.bindFilter((data) => this.filterTasks(data));
		this.view.bindToggleTheme(() => {
			this.view.toggleTheme();
			this.repository.saveAll(this.tasks, this.view.theme);
		});
		this.view.bindToggleMusic(() => this.view.toggleBackgroundMusic());
		this.render();
	}

	setTasks(tasks) {
		this.tasks = tasks ?? [];
	}

	createTask({ title, description }) {
		this.tasks.push(new Task(title, description));
		this.repository.saveAll(this.tasks);
		this.view.closeCreate();
		this.render();
	}

	selectTask(id) {
		const task = this.tasks.find((item) => item.id === id);

		if (!task) {
			return;
		}

		this.selectedTaskId = id;
		this.view.openUpdate(task);
	}

	updateTask({ title, description }) {
		const task = this.tasks.find((item) => item.id === this.selectedTaskId);

		if (!task) {
			return;
		}

		task.update(title, description);
		this.selectedTaskId = null;
		this.repository.saveAll(this.tasks);
		this.view.closeUpdate();
		this.render();
	}

	finishTask(id) {
		const task = this.tasks.find((item) => item.id === id);

		if (!task) {
			return;
		}

		task.update(task.title, task.description, !task.finished);
		this.repository.saveAll(this.tasks);
		this.render();
	}

	removeTask(id) {
		this.tasks = this.tasks.filter((task) => task.id !== id);
		this.repository.saveAll(this.tasks);
		this.render();
	}

	filterTasks({ title, description }) {
		const filteredTasks = this.tasks.filter((task) => {
			const searchDescription = task.description.trim().toLowerCase();
			const searchTitle = task.title.trim().toLowerCase();

			const matchedTitle =
				searchTitle === "" || searchTitle.includes(title.trim().toLowerCase());
			const matchedDescription =
				searchDescription === "" ||
				searchDescription.includes(description.trim().toLowerCase());

			return matchedTitle && matchedDescription;
		});

		this.render(filteredTasks);
		this.view.closeFilter();
		this.view.toggleFilter(title || description);
	}

	swapTasks(primaryId, secundaryId) {
		const primaryIndex = this.tasks.findIndex((task) => task.id === primaryId);
		const secundaryIndex = this.tasks.findIndex(
			(task) => task.id === secundaryId,
		);

		if (primaryIndex === -1 || secundaryIndex === -1) {
			return;
		}

		[this.tasks[primaryIndex], this.tasks[secundaryIndex]] = [
			this.tasks[secundaryIndex],
			this.tasks[primaryIndex],
		];

		this.repository.saveAll(this.tasks);
		this.render();
	}

	render(tasks = this.tasks) {
		this.view.render(
			tasks,
			(id) => this.removeTask(id),
			(id) => this.selectTask(id),
			(id) => this.finishTask(id),
			(element, onReorder) => this.view.dragTask(element, onReorder),
			(primaryElement, secundaryElement) =>
				this.swapTasks(primaryElement, secundaryElement),
		);
	}
}
