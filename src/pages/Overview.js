import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

import useCollection from "../hooks/useCollection";
import { Filter } from "../components/Filter";

function Overview() {
  const [rating, setRating] = useState(0);

  const [filters, setFilters] = useState({});
  const recipes = useCollection("recipes", filters);

  const handleRating = (rate) => {
    setRating(rate);
  };

  return (
    <div>
      <div className="mainContainer">
        <main className="overview">
          <h1>
            Browse through <i className="h1-italic">your brilliant</i> dishes
          </h1>

          {/* <Filter setFilters={setFilters} selectedFilters={filters} /> */}

          <div className="recipes">
            {recipes.map((recipe, i) => (
              <article recipe={recipe} key={recipe.id} className="recipeCard">
                <Link to={`/overview/${recipe.id}`} className="recipeCard__link">
                  <div className="recipeCard__container">
                    <img className="recipeCard__image" src={recipe.image} alt={recipe.name}></img>
                    <span className="recipeCard__container__mealType">{recipe.mealType}</span>
                  </div>
                  <div className="recipeCard__content">
                    <span className="recipeCard__name">{recipe.name}</span>
                    <Rating
                      ratingValue={recipe.score}
                      fillColorArray={["#f17a45", "#f19745", "#f1a545", "#f1b345", "#f1d045"]}
                      readonly={true}
                    />
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Overview;
