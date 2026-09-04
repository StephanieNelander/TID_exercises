import ToDoForm from "./ToDoForm.jsx";
import ToDoItem from "./ToDoItem.jsx";
import { useState, useEffect } from "react";

function loadTodos() {
  const saved = localStorage.getItem("todos");
  return saved ? JSON.parse(saved) : [];
}

export default function ToDoList({ firstName }) {
  let h1Style = { color: "deeppink", backgroundColor: "white" };
  const [toDoList, setToDoList] = useState(loadTodos());

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(toDoList));
  }, [toDoList]);

  // Passed on to ToDoForm as a prop and used by it to add new tasks
  function handleAdd(newToDo) {
    setToDoList([
      ...toDoList,
      { id: crypto.randomUUID(), text: newToDo, done: false },
    ]);
  }

  function handleToggle(id) {
    setToDoList(
      toDoList.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  }

  function handleRemove(id) {
    setToDoList(toDoList.filter((t) => t.id !== id));
  }

  return (
    <>
      <h1 style={h1Style}>To Do List for {firstName}</h1>
      <ToDoForm onAdd={handleAdd} />
      {toDoList.length === 0 ? (
        <p>No tasks yet. Enjoy your day!</p>
      ) : (
        <ul>
          {toDoList.map((elem) => (
            <ToDoItem
              key={elem.id}
              ToDoElem={elem}
              onToggle={handleToggle}
              onRemove={handleRemove}
            />
          ))}
        </ul>
      )}
    </>
  );
}
