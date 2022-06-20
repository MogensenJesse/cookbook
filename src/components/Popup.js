import { useState } from "react";
import { db } from "../utils/firebase";
import { useParams, Link } from "react-router-dom";
import { doc, collection, addDoc, deleteDoc } from "firebase/firestore";
import Upload from "../utils/fileUpload";

// import "../assets/main.css";

const Popup = (props) => {
  const [form, setForm] = useState({
    name: "",
    mealType: "",
    desc: "",
    ingredients: [],
    steps: [],
    allergens: [],
    score: "",
    image: "",
    video: "",
  });

  const recipesCollectionRef = collection(db, "recipes");
  // const ingredientCollectionRef = doc(db, "recipes", "ingredients");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form);

    if (!form.name || !form.desc || !form.ingredients || !form.steps) {
      alert("Please fill in all fields");
      return;
    }

    addDoc(recipesCollectionRef, form);
    setForm({
      name: "",
      mealType: "",
      desc: "",
      ingredients: [],
      steps: [],
      allergens: [],
      score: "",
      image: "",
      video: "",
    });

    props.setTrigger(false);
  };

  const handleIngredient = (e, i) => {
    const ingredientsClone = [...form.ingredients];
    ingredientsClone[i] = e.target.value;
    setForm({ ...form, ingredients: ingredientsClone });
  };

  const handleAllergen = (e, i) => {
    const allergensClone = [...form.allergens];
    allergensClone[i] = e.target.value;
    setForm({ ...form, allergens: allergensClone });
  };

  const handleStep = (e, i) => {
    const stepsClone = [...form.steps];
    stepsClone[i] = e.target.value;
    setForm({ ...form, steps: stepsClone });
  };

  const handleIngredientCount = (e) => {
    setForm({ ...form, ingredients: [...form.ingredients, ""] });
  };

  const handleAllergenCount = (e) => {
    setForm({ ...form, allergens: [...form.allergens, ""] });
  };

  const handleStepCount = (e) => {
    setForm({ ...form, steps: [...form.steps, ""] });
  };

  return props.trigger ? (
    <>
      <div className="popupContainer">
        {/* popupBackground dient om makkelijk weg te klikken */}
        <div
          className="popupContainer__background"
          onClick={() =>
            props.setTrigger(false) &
            setForm({
              name: "",
              mealType: "",
              desc: "",
              ingredients: [],
              steps: [],
              allergens: [],
              score: "",
              image: "",
              video: "",
            })
          }
        ></div>
        <div className="popup">
          <h2 className="popup__title">Add a recipe</h2>
          <form className="form">
            <div className="form__group">
              <label className="form__label">
                Name
                <input
                  className="form__input"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </label>
              <label className="form__label">
                This recipe is...
                <select
                  className="form__input form__input--select"
                  value={form.mealType}
                  onChange={(e) => setForm({ ...form, mealType: e.target.value })}
                >
                  <option value="">Choose wisely...</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Snack">Snack</option>
                  <option value="Dinner">Dinner</option>
                </select>
              </label>
            </div>
            <label for="picture" className="form__label">
              Picture
            </label>
            <div className="form__section">
              <div className="form__label form__label--file">
                <Upload
                  id="picture"
                  onSuccess={(url) => {
                    setForm({ ...form, image: url });
                    console.log(url);
                  }}
                  acceptedFileTypes=".jpeg,.jpg,.png"
                />
              </div>
            </div>

            <label className="form__label">
              Description
              <textarea
                className="form__input form__input--textarea"
                type="text"
                value={form.desc}
                onChange={(e) => setForm({ ...form, desc: e.target.value })}
              />
            </label>
            <label className="form__label">
              Ingredients
              {form.ingredients.map((ingredient, i) => (
                <input
                  className="form__input"
                  autoFocus
                  key={i}
                  type="text"
                  value={ingredient}
                  onChange={(e) => handleIngredient(e, i)}
                />
              ))}
              <button
                className="buttonSecondary form__button"
                type="button"
                onClick={handleIngredientCount}
              >
                Add ingredient
              </button>
            </label>
            <label className="form__label">
              Steps
              {form.steps.map((step, i) => (
                <textarea
                  className="form__input"
                  autoFocus
                  key={i}
                  type="text"
                  value={step}
                  onChange={(e) => handleStep(e, i)}
                />
              ))}
              <button
                className="buttonSecondary form__button"
                type="button"
                onClick={handleStepCount}
              >
                Add step
              </button>
            </label>
            <label className="form__label">
              Allergens <span className="form__optional">Optional</span>
              {form.allergens.map((allergen, i) => (
                <input
                  className="form__input"
                  autoFocus
                  key={i}
                  type="text"
                  value={allergen}
                  onChange={(e) => handleAllergen(e, i)}
                />
              ))}
              <button
                type="button"
                className="buttonSecondary form__button"
                onClick={handleAllergenCount}
              >
                Add Allergen
              </button>
            </label>

            <label for="video" className="form__label">
              Instructional video
            </label>
            <div className="form__section">
              <div className="form__label form__label--file">
                <Upload
                  id="video"
                  onSuccess={(url) => {
                    setForm({ ...form, video: url });
                    console.log(url);
                  }}
                  acceptedFileTypes="video/*"
                />
              </div>
            </div>

            <div className="form__label">
              <button
                className="button form__button form__button--submit"
                type="submit"
                onClick={handleSubmit}
              >
                Add recipe!
              </button>
            </div>
          </form>
          <button
            className="popup__close"
            type="button"
            onClick={() =>
              props.setTrigger(false) &
              setForm({
                name: "",
                mealType: "",
                desc: "",
                ingredients: [],
                steps: [],
                allergens: [],
                score: "",
                image: "",
                video: "",
              })
            }
          ></button>

          {/* Test om te zien of de inputs werken */}
          {/* {JSON.stringify(form)} */}
        </div>
      </div>
    </>
  ) : (
    ""
  );
};

const ConfirmDialog = (props) => {
  const [recipe, setRecipe] = useState([]);

  const { recipeid } = useParams();
  const removeRecipe = () => {
    deleteDoc(doc(db, "recipes", recipeid));
  };
  return props.trigger ? (
    <>
      <div className="popupContainer">
        {/* popupBackground dient om makkelijk weg te klikken */}
        <div className="popupContainer__background" onClick={() => props.setTrigger(false)}></div>
        <div className="popup">
          <h2 className="popup__title">Are you sure?</h2>
          <div className="form__label">
            <Link
              className="button form__button form__button--submit"
              onClick={() => removeRecipe(recipe.id)}
              to="/overview"
            >
              Yes, remove this recipe
            </Link>
          </div>
          <button
            className="popup__close"
            type="button"
            onClick={() => props.setTrigger(false)}
          ></button>
        </div>
      </div>
    </>
  ) : (
    ""
  );
};

export { Popup, ConfirmDialog };
