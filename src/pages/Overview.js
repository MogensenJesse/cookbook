import { db } from "../firebase/config";
import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
import { Popup } from "../components/Popup";

import useCollection from "../hooks/useCollection";
import { Filter } from "../components/Filter";

import "../assets/css/reset.css";
import "../assets/css/overview.css";

function Overview() {
  // const [recipes, setRecipes] = useState([]);
  const [popupActive, setPopupActive] = useState(false);

  const [filters, setFilters] = useState({});
  const recipes = useCollection("recipes", filters);

  // console.log(recipes);

  // const recipesCollectionRef = collection(db, "recipes");

  // useEffect(() => {
  //   onSnapshot(recipesCollectionRef, (snapshot) => {
  //     setRecipes(
  //       snapshot.docs.map((doc) => {
  //         // console.log(doc.data());
  //         return {
  //           id: doc.id,
  //           viewing: false,
  //           ...doc.data(),
  //         };
  //       })
  //     );
  //   });
  // }, []);

  return (
    <div>
      <main className="mainContainer">
        <div>
          <h1>Browse through your brilliant dishes</h1>

          {/* <Filter setFilters={setFilters} selectedFilters={filters} />
          {recipes.map((recipe, i) => (
            <div recipe={recipe} key={recipe.id} />
          ))} */}

          <button onClick={() => setPopupActive(true)}>Add recipe</button>

          <Filter setFilters={setFilters} selectedFilters={filters} />

          <div className="recipesContainer">
            {recipes.map((recipe, i) => (
              <div recipe={recipe} key={recipe.id} className="recipeBox">
                <img className="recipe-image-card" src={recipe.image} alt={recipe.name}></img>
                <div className="contentContainer">
                  <Link to={`/overview/${recipe.id}`}>View recipe</Link>

                  <h2>{recipe.name}</h2>

                  <span>{recipe.score}</span>

                  {/* dangerouslySetInnerHTML neemt de break tags vanuit de database over */}
                  <p dangerouslySetInnerHTML={{ __html: recipe.desc }}></p>
                  {/* <p>{recipe.desc}</p> */}

                  <div>
                    <h4>Ingredients</h4>
                    <ul>
                      {recipe.ingredients.map((ingredient, i) => {
                        return <li key={i}>{ingredient}</li>;
                      })}
                    </ul>

                    <h4>Steps</h4>
                    <ol>
                      {recipe.steps.map((step, i) => {
                        return <li key={i}>{step}</li>;
                      })}
                    </ol>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Popup trigger={popupActive} setTrigger={setPopupActive}></Popup>
    </div>
  );
}

export default Overview;
