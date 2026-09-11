import ToDoForm from "./ToDoForm.jsx";
import ToDoItem from "./ToDoItem.jsx";
import { useState, useEffect } from "react";

function loadTodos(toDoName) {
  const saved = localStorage.getItem(toDoName);
  return saved ? JSON.parse(saved) : [];
}

export default function ToDoList({ firstName, userId, faveColor }) {
  const listStyle = { listStyleType: "none", padding: "1rem 0", margin: 0 };
  const h1Style = {
    fontFamily: "'Saira Semi Condensed', sans-serif",
    fontWeight: "600",
    marginTop: "0",
    padding: "0",
  };
  const [toDoList, setToDoList] = useState(loadTodos("todos" + userId));

  useEffect(() => {
    localStorage.setItem("todos" + userId, JSON.stringify(toDoList));
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
    <div className="todo-list" style={{backgroundColor: faveColor}}>
      <h1>To Do List for {firstName}</h1>
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
    </div>
  );
}
