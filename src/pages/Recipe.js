import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/config";
import { doc, onSnapshot, deleteDoc } from "firebase/firestore";

const Recipe = () => {
  const [recipe, setRecipe] = useState([]);

  const { recipeid } = useParams();

  // console.log(recipeid);

  useEffect(() => {
    const docRef = doc(db, `recipes`, recipeid);

    onSnapshot(docRef, (snapshot) => {
      console.log(snapshot.data());
      setRecipe(snapshot.data());
    });
  }, []);

  const removeRecipe = (id) => {
    deleteDoc(doc(db, "recipes", recipeid));
  };

// To do: deletebutton werkt niet

  return (
    <div>
      <h1>{recipe.name}</h1>
      <p dangerouslySetInnerHTML={{ __html: recipe.desc }}></p>
      <span>Score: {recipe.score}</span>
      <div>
        <h4>Ingredients</h4>
        <ul>
          {recipe.ingredients?.map((ingredient, i) => {
            return <li key={i}>{ingredient}</li>;
          })}
        </ul>

        <h4>Steps</h4>
        <ol>
          {recipe.steps?.map((step, i) => {
            return <li key={i}>{step}</li>;
          })}
        </ol>
        <button onClick={() => removeRecipe(recipe.id)}>Remove recipe</button>
      </div>
    </div>
  );
};

export default Recipe;
