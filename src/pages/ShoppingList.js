import React, { useState, useEffect } from "react";
import { doc, collection, onSnapshot, deleteDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

function ShoppingList() {
  const [recipes, setRecipes] = useState([]);

  const recipesCollectionRef = collection(db, "shoppingList");

  useEffect(() => {
    onSnapshot(recipesCollectionRef, (snapshot) => {
      setRecipes(
        snapshot.docs.map((doc) => {
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
    deleteDoc(doc(db, "shoppingList", id));
  };

  return (
    <div>
      <div className="mainContainer">
        <main className="shoppingList">
          <div>
            <h1>
              Your <i className="h1-italic">shopping</i> list
            </h1>
            <div className="shoppingList__container">
              {recipes.map((recipe, i) => (
                <article recipe={recipe} key={recipe.id} className="list">
                  <div className="list__info">
                    <div className="list__info__container">
                      <img className="list__thumb" src={recipe.image} alt={recipe.name}></img>
                      <h2 className="list__title">{recipe.name}</h2>
                    </div>
                    <button className="buttonSecondary" onClick={() => removeRecipe(recipe.id)}>Remove recipe</button>
                  </div>
                  <ul className="list__container">
                    {recipe.ingredients?.map((ingredient, i) => {
                      return (
                        <li key={i}>
                          <label className="list__control">
                            <input className="list__control__checkbox" type="checkbox" name="checkbox"></input>
                            {ingredient}
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ShoppingList;
