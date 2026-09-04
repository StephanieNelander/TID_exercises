export default function ToDoItem({ ToDoElem, onToggle, onRemove }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={ToDoElem.done}
        onChange={() => onToggle(ToDoElem.id)}
      />
      <span className={ToDoElem.done ? "done" : ""} key={ToDoElem.id}>
        {ToDoElem.text}
      </span>
      <button onClick={() => onRemove(ToDoElem.id)}>x</button>
    </li>
  );
}
