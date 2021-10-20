import React from "react";

//include images into your bundle
import { ToDoList } from "./todolist.jsx";

//create your first component
const Home = () => {
	return (
		<div className="home-container">
			<ToDoList />
		</div>
	);
};

export default Home;
