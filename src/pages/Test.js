import React, { useState, useEffect } from "react";
import { Popup } from "../components/Popup";
import { doc, collection, onSnapshot, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const Home = () => {
  const [ingredients, setIngredients] = useState([])
  const recipesCollectionRef = collection(db, "shoppingList", "ingredientsCol");

  useEffect(() => {
    onSnapshot(recipesCollectionRef, snapshot => {
      setIngredients(snapshot.docs.map(doc => {
        return {
          id: doc.id,
          viewing: false,
          ...doc.data()
        }
      }))
    })
  }, [])

  console.log("ingredients")


  return (
    <div>Home</div>
  )
}

export default Home