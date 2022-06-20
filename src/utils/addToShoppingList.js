import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, addDoc, onSnapshot, collection } from "firebase/firestore";

import { db } from "./firebase";

// Workaround: duplicate database document in shopping list collection

const AddToShoppingList = () => {
  const [recipe, setRecipe] = useState([]);

  const { recipeid } = useParams();

  useEffect(() => {
    const docRef = doc(db, `recipes`, recipeid);

    onSnapshot(docRef, (snapshot) => {
      //   console.log(snapshot.data());
      setRecipe(snapshot.data());
    });
  }, []);

  const recipesCollectionRef = collection(db, "shoppingList");

  const handleSubmit = (e) => {
    addDoc(recipesCollectionRef, recipe);
    // setRecipe({});
  };

  // console.log(recipe);
  // console.log(data);

  return (
    <>
      <button className="button recipeImage__shoppingList" type="submit" onClick={handleSubmit}>
        Add ingredients to shopping list
      </button>
    </>
  );
};

export default AddToShoppingList;
