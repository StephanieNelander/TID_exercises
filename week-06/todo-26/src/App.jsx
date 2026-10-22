import "./App.css";
import AuthPage from "./pages/AuthPage.jsx";
import ListPage from "./pages/ListPage.jsx";
import ListOverview from "./components/ListOverview.jsx";
import { useState } from "react";
import Parse from "parse";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";


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

  function handleAuthenticated(loggedInUser) {
    setUser(loggedInUser);
  }

  function handleLogOut() {
    Parse.User.logOut().then(() => setUser(null));
    window.history.replaceState(null, "", import.meta.env.BASE_URL);
  }

  if (!user) {
    return <AuthPage onAuthenticated={handleAuthenticated} />;
  }

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="main-inner">
        <button onClick={handleLogOut}>Logout</button>
        <Routes>
          <Route path="/" element={<ListOverview />} />
          <Route path="/lists/:listId" element={<ListPage />} />
          <Route path="*" element={<Link to="/">No such page exists.</Link>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
