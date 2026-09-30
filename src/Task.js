export default class Task {
	constructor(title, description, finished, id = crypto.randomUUID()) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.finished = finished;
	}

	update(title, description, finished = false) {
		this.title = title;
		this.description = description;
		this.finished = finished;
	}

	static fromJSON(data) {
		return new Task(
			data.title ?? "",
			data.description ?? "",
			data.finished ?? false,
			data.id,
		);
	}
}
