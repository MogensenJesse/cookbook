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
    <div>
      <div className="popup">
        {/* popupBackground dient om makkelijk weg te klikken */}
        <div className="popup__popupBackground" onClick={() => props.setTrigger(false)}></div>
        <div className="popup__innerPopup">
          <h2>Add a recipe</h2>
          <form>
            <div className="formGroup">
              <label>Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="formGroup">
              <label>This recipe is...</label>
              <select
                value={form.mealType}
                onChange={(e) => setForm({ ...form, mealType: e.target.value })}
              >
                <option value="">Choose wisely...</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Snack">Snack</option>
                <option value="Dinner">Dinner</option>
              </select>
            </div>

            <div className="formGroup">
              <label>Picture</label>
              <div className="formGroup__optional">
                <Upload
                  onSuccess={(url) => {
                    setForm({ ...form, image: url });
                    console.log(url);
                  }}
                  acceptedFileTypes=".jpeg,.jpg,.png"
                />
              </div>
            </div>

            <div className="formGroup">
              <label>Video</label>
              <div className="formGroup__optional">
                <Upload
                  onSuccess={(url) => {
                    setForm({ ...form, video: url });
                    console.log(url);
                  }}
                  acceptedFileTypes="video/*"
                />
              </div>
            </div>

            <div className="formGroup">
              <label>Description</label>
              <textarea
                type="text"
                value={form.desc}
                onChange={(e) => setForm({ ...form, desc: e.target.value })}
              />
            </div>

            <div className="formGroup">
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

            <div className="formGroup">
              <label>Steps</label>
              {form.steps.map((step, i) => (
                <textarea key={i} type="text" value={step} onChange={(e) => handleStep(e, i)} />
              ))}
            </div>
            <button type="button" onClick={handleStepCount}>
              Add step
            </button>

            <div className="formGroup">
              <label>
                Allergens <span className="formGroup__optionalLabel">Optional</span>
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
