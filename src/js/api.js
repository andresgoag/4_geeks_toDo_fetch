export const getTodos = async () => {
	const response = await fetch(
		"https://assets.breatheco.de/apis/fake/todos/user/andresgoag"
	);

	if (response.status === 200) {
		const body = await response.json();
		return body;
	} else {
		await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/andresgoag",
			{
				method: "POST",
				body: "[]",
				headers: { "Content-Type": "application/json" }
			}
		);
		const todos = await getTodos();
		return todos;
	}
};

export const updateTodos = async todos => {
	await fetch("https://assets.breatheco.de/apis/fake/todos/user/andresgoag", {
		method: "PUT",
		body: JSON.stringify(todos),
		headers: { "Content-Type": "application/json" }
	});
};
