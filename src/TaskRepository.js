import Task from "./Task.js";

export default class TaskRepository {
	constructor(
		storage = localStorage,
		keys = { tasks: "tasks", theme: "theme" },
	) {
		this.storage = storage;
		this.keys = keys;
	}

	getAll() {
		try {
			const storedTasks = JSON.parse(
				this.storage.getItem(this.keys.tasks) ?? "[]",
			);
			const storedTheme =
				(this.storage.getItem(this.keys.theme) ?? "true") === "true";

			if (!Array.isArray(storedTasks)) {
				return [];
			}

			return {
				storedTasks: storedTasks
					.filter((task) => task && typeof task === "object")
					.map((task) => Task.fromJSON(task)),
				storedTheme: storedTheme,
			};
		} catch {
			return {
				storedTasks: [],
				storedTheme: true,
			};
		}
	}

	saveAll(tasks, theme = this.storage.getItem(this.keys.theme)) {
		this.storage.setItem(this.keys.tasks, JSON.stringify(tasks));
		this.storage.setItem(this.keys.theme, theme);
	}
}
