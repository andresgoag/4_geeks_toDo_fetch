import React from "react";
import { getTodos, updateTodos } from "../api";

export const ToDoList = () => {
	const [newTask, setNewTask] = React.useState("");
	const [listOfTasks, setListOfTasks] = React.useState([]);

	const addToList = () => {
		setListOfTasks([...listOfTasks, newTask]);
		setNewTask("");
	};

	const deleteTask = index => {
		const newArray = listOfTasks.filter((item, i) => {
			return i !== index;
		});

		setListOfTasks(newArray);
	};

	React.useEffect(() => {
		const fn = async () => {
			const todos = await getTodos();
			setListOfTasks(todos.map(item => item.label));
		};
		fn();
	}, []);

	React.useEffect(() => {
		const fn = async () => {
			updateTodos(
				listOfTasks.map(item => ({ label: item, done: false }))
			);
		};
		if (listOfTasks !== null) {
			fn();
		}
	}, [listOfTasks]);

	return (
		<div className="notePad container-fluid">
			<div className="text-center mt-5">
				<h1>To Do List</h1>
			</div>
			<input
				placeholder="Add new task"
				className="container"
				type="text"
				value={newTask}
				onChange={event => setNewTask(event.target.value)}
				onKeyUp={event => {
					if (event.key === "Enter") {
						if (newTask === "") {
							alert("Please enter a task");
						} else {
							addToList();
						}
					}
				}}
			/>
			{listOfTasks.length == 0 ? <p>No tasks, add a task</p> : null}

			{listOfTasks.map((item, index) => {
				return (
					<div className="todo" key={index}>
						<p className="todo_content">{item}</p>
						<p
							className="todo_delete"
							onClick={() => {
								deleteTask(index);
							}}>
							<i className="fas fa-times"></i>
						</p>
					</div>
				);
			})}

			{listOfTasks.length > 0 ? (
				<p>{`${listOfTasks.length} item${
					listOfTasks.length > 1 ? "s" : ""
				} left`}</p>
			) : null}
		</div>
	);
};
