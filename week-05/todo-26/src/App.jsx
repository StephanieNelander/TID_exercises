import "./App.css";
import ToDoList from "./components/ToDoList.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import AddNewList from "./components/AddNewList.jsx";
import { useState, useEffect } from "react";
import Parse from "parse";
import { fetchLists, createList } from "./services/toDoService.js";


// Credentials come from .env.local, which is gitignored.
// Copy .env.example to .env.local and fill in your own Back4App values.
if (!import.meta.env.VITE_PARSE_APP_ID) {
  throw new Error(
    "No Parse credentials. Copy .env.example to .env.local, fill it in, and restart `npm run dev`.",
  );
}

Parse.serverURL = import.meta.env.VITE_PARSE_SERVER_URL;
Parse.initialize(
  import.meta.env.VITE_PARSE_APP_ID,
  import.meta.env.VITE_PARSE_JS_KEY,
);

function App() {
  const [user, setUser] = useState(Parse.User.current());
  const [lists, setLists] = useState([]);

  function handleAuthenticated(loggedInUser) {
    setUser(loggedInUser);
  }

  function handleLogOut() {
    Parse.User.logOut().then(() => setUser(null));
  }

  async function handleAddList(name) {
    const createdList = await createList(name);
    setLists([...lists, createdList]);
  }

  useEffect(() => {
    if (!user) return;

    async function loadLists() {
      const results = await fetchLists();
      setLists(results);
    }

    loadLists();
  }, [user]);

  if (!user) {
    return <AuthPage onAuthenticated={handleAuthenticated} />;
  }

  return (
    <div className="main-inner">
      <button onClick={handleLogOut}>Logout</button>
      <AddNewList onAdd ={handleAddList} />
      {lists.map((list) => (
        <ToDoList key={list.id} list={list} />
      ))}
    </div>
  );
}

export default App;
