import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { Rating } from "react-simple-star-rating";

import { db } from "../firebase/config";
import { Popup, ConfirmDialog } from "../components/Popup";
// import EditPopup from "../components/EditPopup";
import AddToShoppingList from "../utils/addToShoppingList";

import "../assets/css/recipe.css";

const Recipe = () => {
  const [recipe, setRecipe] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  // const [editPopupActive, setEditPopupActive] = useState(false);
  const [confirmDialogActive, setConfirmDialogActive] = useState(false);
  // const [videoBox, setVideoBox] = useState(false);
  const [docRef, setDocRef] = useState(false);

  const [rating, setRating] = useState(0); // initial rating value

  const { recipeid } = useParams();

  // Catch Rating value
  const handleRating = (rate: number) => {
    setRating(rate);
    updateDoc(docRef, {
      score: rate,
    });
  };

  useEffect(() => {
    const _docRef = doc(db, `recipes`, recipeid);
    setDocRef(_docRef);
    onSnapshot(_docRef, (snapshot) => {
      // console.log(snapshot.data());
      setRecipe(snapshot.data());
    });
  }, []);

  // console.log("score" + " " + recipe.score);

  const ExistenceCheck = (array) => {
    if (array.video === "") {
      // vervangen door infotekst?
      return;
      // console.log("no video");
    }
    return <video className="recipe-image" controls src={array.video}></video>;
  };

  return (
    <div>
      <button onClick={() => setPopupActive(true)}>Add recipe</button>
      {/* <button onClick={() => setEditPopupActive(true)}>Edit recipe</button> */}
      <Link to="/overview">Back to overview</Link>
      <div>
        <img className="recipe-image" src={recipe.image} alt={recipe.name}></img>
        <AddToShoppingList></AddToShoppingList>
        <Rating
          ratingValue={recipe.score}
          fillColorArray={["#f17a45", "#f19745", "#f1a545", "#f1b345", "#f1d045"]}
          readonly={true}
        />

        <h1>{recipe.name}</h1>

        {/* dangerouslySetInnerHTML neemt de break tags vanuit de database over */}
        <p dangerouslySetInnerHTML={{ __html: recipe.desc }}></p>
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
        <button onClick={() => setConfirmDialogActive(true)}>remove recipe</button>
      </div>
      <Popup trigger={popupActive} setTrigger={setPopupActive}></Popup>
      {/* <EditPopup trigger={editPopupActive} setTrigger={setEditPopupActive}></EditPopup> */}
      <Rating
        transition
        onClick={handleRating}
        ratingValue={recipe.score}
        showTooltip
        tooltipArray={["Terrible", "Had better", "It's okay", "Nice!", "Fingerlickin' good!"]}
        fillColorArray={["#f17a45", "#f19745", "#f1a545", "#f1b345", "#f1d045"]}
        tooltipDefaultText="Rate this recipe"
      />
      <ConfirmDialog
        trigger={confirmDialogActive}
        setTrigger={setConfirmDialogActive}
      ></ConfirmDialog>
    </div>
  );
};

export default Recipe;
