import React, { useState, useEffect } from "react";
import { Popup } from "../components/Popup";
import { doc, collection, onSnapshot, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/config";

import "../assets/css/reset.css";
import "../assets/css/overview.css";

function ShoppingList() {
  const [popupActive, setPopupActive] = useState(false);
  const [recipes, setRecipes] = useState([])

  const recipesCollectionRef = collection(db, "shoppingList");

  useEffect(() => {
    onSnapshot(recipesCollectionRef, snapshot => {
      setRecipes(snapshot.docs.map(doc => {
        return {
          id: doc.id,
          viewing: false,
          ...doc.data()
        }
      }))
    })
  }, [])

  const removeRecipe = (id) => {
    deleteDoc(doc(db, "shoppingList", id));
  };

  return (
    <div>
      <main className="mainContainer">
        <div>
          <h1>Your shopping list</h1>

          <button onClick={() => setPopupActive(true)}>Add recipe</button>

          <div className="shoppingContainer">
            {recipes.map((recipe, i) => (
              <div recipe={recipe} key={recipe.id} className="shoppingListBox">
                <img className="recipe-thumb" src={recipe.image} alt={recipe.name}></img>
                <div>
                  <h2>{recipe.name}</h2>
                  <ul>
                    {recipe.ingredients?.map((ingredient, i) => {
                      return (
                        <li key={i}>
                          <label>
                            <input type="checkbox"></input>
                            {ingredient}
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <button onClick={() => removeRecipe(recipe.id)}>Remove recipe</button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Popup trigger={popupActive} setTrigger={setPopupActive}></Popup>
    </div>
  );
}

export default ShoppingList;
