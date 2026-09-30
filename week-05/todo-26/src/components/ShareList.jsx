import { useState } from "react";

export default function ShareList({ onShare }) {
  const [username, setUsername] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const name = username.trim();
    if (!name) return;

    onShare(name);
    setUsername("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username to share with"
      />

      <button
        type="submit"
        disabled={username.trim().length === 0}
      >
        Share
      </button>
    </form>
  );
}