import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../firebase/config";
import { doc, onSnapshot, deleteDoc } from "firebase/firestore";
import { Popup, ConfirmDialog } from "../components/Popup";

const Recipe = () => {
  const [recipe, setRecipe] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [confirmDialogActive, setConfirmDialogActive] = useState(false);

  const { recipeid } = useParams();

  // console.log(recipeid);

  useEffect(() => {
    const docRef = doc(db, `recipes`, recipeid);

    onSnapshot(docRef, (snapshot) => {
      console.log(snapshot.data());
      setRecipe(snapshot.data());
    });
  }, []);

  return (
    <div>
      <button onClick={() => setPopupActive(true)}>Add recipe</button>
      <Link to="/overview">Back to overview</Link>
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
        <button onClick={() => setConfirmDialogActive(true)}>

          remove recipe
        </button>
      </div>
      <Popup trigger={popupActive} setTrigger={setPopupActive}></Popup>
      <ConfirmDialog trigger={confirmDialogActive} setTrigger={setConfirmDialogActive}></ConfirmDialog>


    </div>
  );
};

export default Recipe;
