import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";
import { Popup, ConfirmDialog } from "../components/Popup";
import "../assets/css/recipe.css";

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

  const ExistenceCheck = (array) => {
    if (array.video === "") {
      // vervangen door infotekst?
      return console.log("no video");
    }
    return <video className="recipe-image" controls src={array.video}></video>;
  }


  return (
    <div>
      <button onClick={() => setPopupActive(true)}>Add recipe</button>
      <Link to="/overview">Back to overview</Link>
      <h1>{recipe.name}</h1>
      <img className="recipe-image" src={recipe.image} alt={recipe.name}></img>
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
        {ExistenceCheck(recipe)}
        {/* <video controls className="recipe-image" src={recipe.video}></video> */}
        <button onClick={() => setConfirmDialogActive(true)}>remove recipe</button>
      </div>
      <Popup trigger={popupActive} setTrigger={setPopupActive}></Popup>
      <ConfirmDialog
        trigger={confirmDialogActive}
        setTrigger={setConfirmDialogActive}
      ></ConfirmDialog>
    </div>
  );
};

export default Recipe;
