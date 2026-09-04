import "./App.css";
import ToDoList from "./ToDoList.jsx";
import { useState } from "react";

function App() {
  const annasToDoList = ["Call the landlord", "Book the dentist"];

  return (
    <>
      <ToDoList firstName={"Anna"} />
    </>
  );
}

export default App;
