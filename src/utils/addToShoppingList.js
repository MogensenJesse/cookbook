import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, addDoc, onSnapshot, collection } from "firebase/firestore";

import { db } from "../firebase/config";

// lol ok gwn alles dupliceren en enkel nodige stuff in shopping list ophalen

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

  console.log(recipe);
  // console.log(data);

  return (
    <div>
      <button type="submit" onClick={handleSubmit}>
        Add ingredients to shopping list
      </button>
    </div>
  );
};

export default AddToShoppingList;
