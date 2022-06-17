import { db } from "../firebase/config";
import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
import { Popup } from "../components/Popup";
import { Rating } from "react-simple-star-rating";

import useCollection from "../hooks/useCollection";
import { Filter } from "../components/Filter";

import "../assets/css/reset.css";
import "../assets/css/overview.css";

function Overview() {
  // const [recipes, setRecipes] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [rating, setRating] = useState(0);

  const [filters, setFilters] = useState({});
  const recipes = useCollection("recipes", filters);

  const handleRating = (rate: number) => {
    setRating(rate);
    // other logic
  };

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
                <Link to={`/overview/${recipe.id}`} className="cardLink"></Link>
                <img className="recipe-image-card" src={recipe.image} alt={recipe.name}></img>
                <span>{recipe.mealType}</span>
                <div className="contentContainer">
                  <h2>{recipe.name}</h2>
                  <Rating
                    ratingValue={recipe.score}
                    fillColorArray={["#f17a45", "#f19745", "#f1a545", "#f1b345", "#f1d045"]}
                    readonly={true}
                    // allowHalfIcon
                  />
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
