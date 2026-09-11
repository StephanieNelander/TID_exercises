import "./App.css";
import ToDoList from "./ToDoList.jsx";
import { useState } from "react";

function App() {
  return (
    <div className="main-inner">
      <ToDoList firstName={"Steph"} userId={1} faveColor={"#e9edc9"} />
      <ToDoList firstName={"Max"} userId={2} faveColor={"#d2efef"} />
    </div>
  );
}

export default App;
