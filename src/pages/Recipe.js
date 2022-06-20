import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { Rating } from "react-simple-star-rating";

import { db } from "../utils/firebase";
import { ConfirmDialog } from "../components/Popup";
import AddToShoppingList from "../utils/addToShoppingList";

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
  const handleRating = (rate) => {
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
    return <video className="recipe__video" controls src={array.video}></video>;
  };

  return (
    <div>
      <div className="mainContainer">
        <header className="recipeImage">
          <div className="recipeImage__container">
            <img className="recipeImage__image" src={recipe.image} alt={recipe.name}></img>
            <img
              className="recipeImage__image recipeImage__image--shadow"
              src={recipe.image}
              alt={recipe.name}
            ></img>
          </div>
          <AddToShoppingList></AddToShoppingList>
          <span className="mealType recipeImage__mealType">{recipe.mealType}</span>
        </header>

        <main className="recipe">
          <Link className="buttonSecondary recipe__back" to="/overview">
            All recipes
          </Link>
          <Rating
            className="recipe__rating"
            ratingValue={recipe.score}
            fillColorArray={["#f17a45", "#f19745", "#f1a545", "#f1b345", "#f1d045"]}
            readonly={true}
            size={20}
            emptyColor={"#292726"}
          />
          <button
            className="buttonSecondary recipe__remove"
            onClick={() => setConfirmDialogActive(true)}
          >
            Remove recipe
          </button>

          <h1 className="recipe__name">{recipe.name}</h1>

          {/* dangerouslySetInnerHTML neemt de break tags vanuit de database over */}
          <p className="recipe__description" dangerouslySetInnerHTML={{ __html: recipe.desc }}></p>
          <h2>Ingredients</h2>
          <ul>
            {recipe.ingredients?.map((ingredient, i) => {
              return (
                <li className="recipe__ingredients" key={i}>
                  {ingredient}
                </li>
              );
            })}
          </ul>

          <h2>Steps</h2>
          <ol>
            {recipe.steps?.map((step, i) => {
              return (
                <li className="recipe__steps" key={i}>
                  {step}
                </li>
              );
            })}
          </ol>

          <h2>Allergens</h2>
          <ul>
            {recipe.allergens?.map((allergen, i) => {
              return (
                <li className="recipe__ingredients" key={i}>
                  {allergen}
                </li>
              );
            })}
          </ul>
          {ExistenceCheck(recipe)}
          <section className="recipe__giveRating">
            <h2 className="recipe__giveRating__title">How would you rate this creation?</h2>
            {/* <div className="recipe__giveRating__container"> */}
            <Rating
              transition
              onClick={handleRating}
              ratingValue={recipe.score}
              showTooltip
              tooltipArray={["Terrible", "Had better", "It's okay", "Nice!", "Fingerlickin' good!"]}
              fillColorArray={["#f17a45", "#f19745", "#f1a545", "#f1b345", "#f1d045"]}
              tooltipDefaultText="Rate this recipe"
              emptyColor={"#1c1b1a"}
              tooltipStyle={{ position: "absolute", marginTop: "4px", letterSpacing: "1px" }}
            />
            {/* </div> */}
          </section>
        </main>
      </div>

      <ConfirmDialog
        trigger={confirmDialogActive}
        setTrigger={setConfirmDialogActive}
      ></ConfirmDialog>
    </div>
  );
};

export default Recipe;
