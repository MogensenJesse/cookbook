import React, { useState } from "react";
import { db } from "../firebase/config";
import { useParams, Link } from "react-router-dom";
import { doc, collection, addDoc, deleteDoc } from "firebase/firestore";

const Popup = (props) => {
  const [form, setForm] = useState({
    name: "",
    desc: "",
    ingredients: [],
    steps: [],
    allergens: [],
    score: "",
  });

  const recipesCollectionRef = collection(db, "recipes");

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
      desc: "",
      ingredients: [],
      steps: [],
      allergens: [],
      score: "",
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
    <div>
      <div className="popup">
        {/* popupBackground dient om makkelijk weg te klikken */}
        <div className="popupBackground" onClick={() => props.setTrigger(false)}></div>
        <div className="innerPopup">
          <h2>Add a recipe</h2>
          <form>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                type="text"
                value={form.desc}
                onChange={(e) => setForm({ ...form, desc: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Ingredients</label>
              {form.ingredients.map((ingredient, i) => (
                <input
                  key={i}
                  type="text"
                  value={ingredient}
                  onChange={(e) => handleIngredient(e, i)}
                />
              ))}
            </div>
            <button type="button" onClick={handleIngredientCount}>
              Add ingredient
            </button>

            <div className="form-group">
              <label>Steps</label>
              {form.steps.map((step, i) => (
                <textarea key={i} type="text" value={step} onChange={(e) => handleStep(e, i)} />
              ))}
            </div>
            <button type="button" onClick={handleStepCount}>
              Add step
            </button>

            <div className="form-group">
              <label>
                Allergens <span className="optional-label">Optional</span>
              </label>
              {form.allergens.map((allergen, i) => (
                <input
                  key={i}
                  type="text"
                  value={allergen}
                  onChange={(e) => handleAllergen(e, i)}
                />
              ))}
            </div>
            <button type="button" onClick={handleAllergenCount}>
              Add Allergen
            </button>

            <div className="submitButtons">
              <button type="submit" onClick={handleSubmit}>
                Add recipe
              </button>
              <button type="button" onClick={() => props.setTrigger(false)}>
                Close
              </button>
            </div>
          </form>

          {/* Test om te zien of de inputs werken */}
          {/* {JSON.stringify(form)} */}
        </div>
      </div>
    </div>
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
    <div>
      <div className="popup">
        {/* popupBackground dient om makkelijk weg te klikken */}
        <div className="popupBackground" onClick={() => props.setTrigger(false)}></div>
        <div className="innerPopup">
          <h2>Are you sure?</h2>
          <button onClick={() => removeRecipe(recipe.id)}>
            <Link to="/overview">Yes, remove this recipe</Link>
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export { Popup, ConfirmDialog };
