import { useState } from "react";
import { db, storage } from "../firebase/config";
import { useParams, Link } from "react-router-dom";
import { doc, collection, addDoc, deleteDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { nanoid } from "nanoid";

// to do: foto's en videos id geven ipv random name

const Popup = (props) => {
  // State to store uploaded file
  const [image, setImage] = useState("");

  // progress
  const [percent, setPercent] = useState(0);

  // Handle file upload event and update state
  function handleChange(event) {
    setImage(event.target.files[0]);
  }

  const handleUpload = (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please upload an image first!");
    }

    const storageRef = ref(storage, `/recipeImages/${image.name + nanoid()}`);

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setForm({ ...form, image: url });
        });
      }
    );
  };



  // State to store uploaded file
  const [video, setvideo] = useState("");

  // progress
  const [percentV, setpercentV] = useState(0);

  // Handle file upload event and update state
  function handleChangeV(event) {
    setvideo(event.target.files[0]);
  }

  const handleVideoUpload = (e) => {
    e.preventDefault();
    if (!video) {
      alert("Please upload a video first!");
    }

    const videoStorageRef = ref(storage, `/recipeVideos/${video.name + nanoid()}`);

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadVideoTask = uploadBytesResumable(videoStorageRef, video);

    uploadVideoTask.on(
      "state_changed",
      (snapshot) => {
        const percentV = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

        // update progress
        setpercentV(percentV);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadVideoTask.snapshot.ref).then((url) => {
          console.log(url);
          setForm({ ...form, video: url });
        });
      }
    );
  };





  const [form, setForm] = useState({
    name: "",
    desc: "",
    ingredients: [],
    steps: [],
    allergens: [],
    score: "",
    image: "",
    video: "",
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
              <label>Picture</label>
              <div className="optional">
                <input type="file" onChange={handleChange} accept=".jpeg,.jpg,.png" />
                <span className="optional-label">{percent}% done</span>
              </div>
              <button onClick={handleUpload}>Upload to Firebase</button>
            </div>

            <div className="form-group">
              <label>Instructional video</label>
              <div className="optional">
                <input type="file" onChange={handleChangeV} accept="video/*" />
                <span className="optional-label">{percentV}% done</span>
              </div>
              <button onClick={handleVideoUpload}>Upload to Firebase</button>
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
