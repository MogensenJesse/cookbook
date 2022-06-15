import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

// import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]);

  const recipesCollectionRef = collection(db, "recipes");

  useEffect(() => {
    onSnapshot(recipesCollectionRef, (snapshot) => {
      setRecipes(
        snapshot.docs.map((doc) => {
          // console.log(doc.data());
          return {
            id: doc.id,
            viewing: false,
            ...doc.data(),
          };
        })
      );
    });
  }, []);

  const fruit = recipes.map((recipe, i) => recipe.name);

  const [filter, setFilter] = useState("");

  return (
    <div className="App">
      <p>
        Type to filter the list:
        <input
          id="filter"
          name="filter"
          type="text"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
      </p>
      <div>
      <ul>
          {recipes.name?.map((ingredient, i) => {
            return <li key={i}>{ingredient}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;


// {fruit
//   .filter((recipe) => recipe.includes(filter) || filter === "")
//   .map((recipe) => (
//     // <li key={f}>{f}</li>
//     <div recipe={recipe} key={recipe.id} className="recipeBox">
//       <img className="recipe-image-card" src={recipe.image} alt={recipe.name}></img>
//       <div className="contentContainer">
//         {/* <Link to={`/overview/${recipe.id}`}>View recipe</Link> */}

//         <h2>{recipe}</h2>

        
//       </div>
//     </div>
//   ))}