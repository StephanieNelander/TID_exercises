import { useState } from "react";

export default function ToDoForm({ onAdd }) {
  const [newToDo, setNewToDo] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAdd(newToDo);
    setNewToDo("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={newToDo}
        onChange={(e) => setNewToDo(e.target.value)}
        placeholder="Add a task"
      />
      <button id="add-btn" disabled={newToDo.trim().length === 0}>Add</button>
    </form>
  );
}
