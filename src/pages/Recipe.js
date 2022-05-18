import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

const Recipe = () => {
  const [recipe, setRecipe] = useState([]);

  // nu nog uit het juiste document trekken
  const recipesCollectionRef = collection(db, "recipes");

  useEffect(() => {
    onSnapshot(recipesCollectionRef, (snapshot) => {
      setRecipe(
        snapshot.docs.map((doc) => {
          console.log(doc.data());
          return {
            id: doc.id,
            viewing: false,
            ...doc.data(),
          };
        })
      );
    });
  }, []);

  return (
    <div>
      {recipe.map((data, i) => {
              return (
                <div key={data.id} className="recipeBox">
                  
                  <h2>{data.name}</h2>

                  <span>{data.score}</span>

                  {/* dangerouslySetInnerHTML neemt de break tags vanuit de database over */}
                  <p dangerouslySetInnerHTML={{ __html: data.desc }}></p>
                  {/* <p>{recipe.desc}</p> */}

                  <div>
                    <h4>Ingredients</h4>
                    <ul>
                      {data.ingredients.map((ingredient, i) => {
                        return <li key={i}>{ingredient}</li>;
                      })}
                    </ul>

                    <h4>Steps</h4>
                    <ol>
                      {data.steps.map((step, i) => {
                        return <li key={i}>{step}</li>;
                      })}
                    </ol>
                  </div>
                  {/* <button onClick={() => removeRecipe(data.id)}>Remove</button> */}
                </div>
              );
            })}
    </div>
  );
};

export default Recipe;
