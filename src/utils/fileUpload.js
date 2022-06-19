import { useState } from "react";
import { storage } from "./firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
// import { nanoid } from "nanoid";

const Upload = ({ onSuccess, acceptedFileTypes }) => {
  // State om file op te slaan
  const [file, setFile] = useState("");

  // progress state
  const [percent, setPercent] = useState(0);

  // File uploading handler, state updaten
  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a file first!");
    }

    // _${nanoid()} --> NanoId om duplicate names te vermijden, maar is dit nodig?
    const storageRef = ref(storage, `/recipeImages/${file.name}`);

    // Ontvangt storage reference en het up te loaden bestand
    // uploadBytesResumable exposet het upload proces
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url, wordt meegegeven in de Firestore setForm
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          // prop
          onSuccess(url);
        });
      }
    );
  };

  return (
    <>
      <input type="file" onChange={handleChange} accept={acceptedFileTypes} />
      <span className="optional-label">{percent}% done</span>
      <button onClick={handleUpload}>Upload to Firebase</button>
    </>
  );
};

export default Upload;
