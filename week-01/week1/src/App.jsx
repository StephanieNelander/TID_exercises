import ToDoList from "./ToDoList.jsx";

function App() {
  const stephToDo = ["Create GitHub repo", "Do week 1 exercises"];
  const maxToDo = ["Buy groceries"];

  return (
    <>
      <ToDoList firstName={"Steph"} todos={stephToDo} faveColor={"#e9edc9"} />
      <ToDoList firstName="Max" todos={maxToDo} faveColor={"#d2efef"} />
    </>
  );
}

export default App;
