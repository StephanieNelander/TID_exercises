export default function ToDoItem({ item }) {
  return (
    <li className="todo-item">
      <div>
        <input
          type="checkbox"
          defaultChecked={false}
          style={{ marginRight: "10px" }}
        />
        <label>{item}</label>
      </div>
    </li>
  );
}
