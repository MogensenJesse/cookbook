import React from "react";
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <nav style={{ display: "flex", gap: "1rem" }}>
        <Link to="/">Home</Link>
        <Link to="/overview">Overview</Link>
        <Link to="/recipe">Recipe</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;

// const firebaseConfig = {
//   apiKey: "AIzaSyBIxDoFc594akSBAIlehgGvC1Qp9Z91QcU",
//   authDomain: "cookbook-jessemogensen.firebaseapp.com",
//   projectId: "cookbook-jessemogensen",
//   storageBucket: "cookbook-jessemogensen.appspot.com",
//   messagingSenderId: "662707412071",
//   appId: "1:662707412071:web:83205e9be4372acf8f08c2"
// };

// recepten & ingredienten toevoegen: https://codesandbox.io/s/twilight-shadow-tlojhn
