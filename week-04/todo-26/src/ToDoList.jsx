import ToDoForm from "./ToDoForm.jsx";
import ToDoItem from "./ToDoItem.jsx";
import { useState, useEffect } from "react";
import { fetchToDos, createToDo, setToDoDone, deleteToDo } from "./services/toDoService.js";

export default function ToDoList({ firstName, userId, faveColor }) {
  const [toDoList, setToDoList] = useState([]);

  // Will run when the component is mounted because of []
  useEffect(() => {
    async function load() {
      setToDoList(await fetchToDos(userId));
    }
    load();
  }, []);

  // Passed on to ToDoForm as a prop and used by it to add new tasks
  async function handleAdd(newToDo) {
    const created = await createToDo(newToDo, userId);
    setToDoList([...toDoList, created]);
  }

  async function handleToggle(id) {
    const toDo = toDoList.find((t) => t.id === id);
    await setToDoDone(id, !toDo.done);
    setToDoList(
      toDoList.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  }

  async function handleRemove(idToDelete) {
    await deleteToDo(idToDelete);
    setToDoList(toDoList.filter((t) => t.id !== idToDelete));
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
