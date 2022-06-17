import React from "react";
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <nav style={{ display: "flex", gap: "1rem" }}>
        <Link to="/">Home</Link>
        <Link to="/overview">Overview</Link>
        <Link to="/shopping-list">Shopping list</Link>
        {/* <Link to="/test">test</Link> */}
      </nav>
      <Outlet />
    </div>
  );
}

export default App;


// recepten & ingredienten toevoegen: https://codesandbox.io/s/twilight-shadow-tlojhn
