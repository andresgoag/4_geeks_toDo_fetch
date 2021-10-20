import React from "react";
import { getTodos } from "../api";

export const ToDoList = () => {
	const user = "andresgoag";
	const [newTask, setNewTask] = React.useState("");
	const [listOfTasks, setListOfTasks] = React.useState(null);

	const newTaskKeyDownHandler = e => {
		if (e.key === "Enter") {
			if (newTask === "") {
				alert("Please enter a task");
			} else {
				addToList();
			}
		}
	};

	const addToList = () => {
		setListOfTasks([...listOfTasks, { label: newTask, done: false }]);
		setNewTask("");
	};

	const deleteTask = index => {
		const newArray = listOfTasks.filter((item, i) => {
			return i !== index;
		});

		setListOfTasks(newArray);
	};

	React.useEffect(() => {
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`)
			.then(response => {
				if (response.status == 200) {
					return response.json();
				} else {
					throw new Error("Error getting data from the server");
				}
			})
			.then(data => setListOfTasks(data))
			.catch(error => console.error(error));
	}, []);

	React.useEffect(() => {
		const postData = () => {
			fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(listOfTasks)
			});
		};

		if (listOfTasks !== null) {
			if (listOfTasks.length == 0) {
				fetch(
					`https://assets.breatheco.de/apis/fake/todos/user/${user}`,
					{
						method: "DELETE",
						headers: { "Content-Type": "application/json" }
					}
				);
			} else {
				postData();
			}
		}
	}, [listOfTasks]);

	return (
		<div className="main-container">
			<div>
				<h1>Tasks to do</h1>
			</div>
			<input
				placeholder="Add new task"
				className="new-task-input"
				type="text"
				value={newTask}
				onChange={e => setNewTask(e.target.value)}
				onKeyDown={newTaskKeyDownHandler}
			/>

			{listOfTasks ? (
				listOfTasks.length == 0 ? (
					<p className="info">No tasks, add a task</p>
				) : null
			) : null}

			{listOfTasks
				? listOfTasks.map((item, index) => {
						return (
							<div className="todo" key={index}>
								<p className="todo_content">{item.label}</p>
								<p
									className="todo_delete"
									onClick={() => {
										deleteTask(index);
									}}>
									<i className="fas fa-times"></i>
								</p>
							</div>
						);
				  })
				: null}

			{listOfTasks ? (
				listOfTasks.length > 0 ? (
					<p className="info">{`${listOfTasks.length} item${
						listOfTasks.length > 1 ? "s" : ""
					} left`}</p>
				) : null
			) : null}
		</div>
	);
};
