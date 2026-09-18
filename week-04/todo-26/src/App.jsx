import "./App.css";
import ToDoList from "./ToDoList.jsx";
import Parse from "parse";

Parse.initialize(
  "vlbcBC3taIZqmrsfbNA77pzEEee2i8RwK27sBz3A",
  "BDIwEPonsYtItzu3kPmXK423c29UYvnux1ebX894"
);
Parse.serverURL = "https://parseapi.back4app.com/";

function App() {
  return (
    <div className="main-inner">
      <ToDoList firstName={"Steph"} userId={1} faveColor={"#e9edc9"} />
      <ToDoList firstName={"Max"} userId={2} faveColor={"#d2efef"} />
    </div>
  );
}

export default App;
