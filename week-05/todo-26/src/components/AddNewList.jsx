import { useState } from "react";

export default function AddNewList({ onAdd }) {
  const [listName, setListName] = useState("");

  // Handle submit manually
  function handleSubmit(e) {
    e.preventDefault();
    onAdd(listName.trim());
    setListName("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        placeholder="New list name"
      />
      <button disabled={listName.trim().length === 0}>Create new list</button>
    </form>
  );
}
