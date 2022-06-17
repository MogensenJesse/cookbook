import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { useParams, Link } from "react-router-dom";
import { doc, collection, addDoc, updateDoc, onSnapshot } from "firebase/firestore";
import Upload from "../utils/fileUpload";

const EditPopup = (props) => {
  const { recipeid } = useParams();
  const [docRef, setDocRef] = useState(false);
  const [recipe, setRecipe] = useState(false);

  useEffect(() => {
    const _docRef = doc(db, `recipes`, recipeid);
    setDocRef(_docRef);
    onSnapshot(_docRef, (snapshot) => {
      console.log(snapshot.data());
      setRecipe(snapshot.data());
    });
  }, []);

  const [form, setForm] = useState({
    name: "",
  });

  const handleRecipe = () => {
    updateDoc(docRef, {
      name: recipe.name,
    });
    setForm({
      name: "test",
      mealType: "",
      desc: "",
      ingredients: [],
      steps: [],
      allergens: [],
      score: "",
      image: "",
      video: "",
    });
  };

  console.log(recipe);

  const handleSubmit = (e) => {
    e.preventDefault();


    props.setTrigger(false);
  };

  return props.trigger ? (
    <div>
      <div className="popup">
        {/* popupBackground dient om makkelijk weg te klikken */}
        <div className="popupBackground" onClick={() => props.setTrigger(false)}></div>
        <div className="innerPopup">
          <h2>Edit recipe</h2>
          <form>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="submitButtons">
              <button type="submit" onClick={handleSubmit}>
                Add recipe
              </button>
              <button type="button" onClick={() => props.setTrigger(false)}>
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default EditPopup;
