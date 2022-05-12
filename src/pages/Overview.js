import React from "react";
import { db } from "../firebase/config";
import { useState, useEffect } from "react";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import Popup from "../components/Popup";
import "../assets/css/reset.css";
import "../assets/css/overview.css";

function Overview() {
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

  const removeRecipe = (id) => {
    deleteDoc(doc(db, "recipes", id));
  };

  return (
    <main className="mainContainer">
      <div>
        <h1>Browse through your brilliant dishes</h1>


        {/* Dit werkt nog niet, iets met React props, te bekijken */}
        <button
          onClick={() => {
            Popup.setPopupActive(true);
          }}
        >
          Add recipe
        </button>

        <div className="recipesContainer">
          {recipes.map((recipe, i) => {
            return (
              <div key={recipe.id} className="recipeBox">
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
                <button onClick={() => removeRecipe(recipe.id)}>Remove</button>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default Overview;