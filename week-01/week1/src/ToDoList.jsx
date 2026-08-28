import ToDoItem from "./ToDoItem.jsx";

export default function ToDoList({ firstName, todos, faveColor }) {
  function handleAdd(event) {
    console.log("New task added");
  }

  return (
    <div
      className="todo-list-panel"
      style={{
        backgroundColor: faveColor,
      }}
    >
      <h1>{firstName}'s To Do</h1>

      <input id="new-task" type="text" placeholder="Add a new task..." />
      <button onClick={handleAdd}>Add new task</button>

      <ul className="todo-list">
        {todos.map((elem, index) => (
          <ToDoItem item={elem} key={index} />
        ))}
      </ul>
    </div>
  );
}
