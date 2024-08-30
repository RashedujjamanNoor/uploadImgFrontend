import "./App.css";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import app from "./firebase";
import { useState } from "react";

function App() {
  const [imgUrl, setImgUrl] = useState("");
  const handleImage = async (e) => {
    const image = e.target.files[0];

    try {
      if (image) {
        const storage = getStorage(app);
        const storeRef = ref(storage, "images/" + image.name);
        await uploadBytes(storeRef, image);
        const downloadUrl = await getDownloadURL(storeRef);
        console.log(downloadUrl);
        setImgUrl(downloadUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <input type="file" onChange={handleImage} />
      <button>Upload</button>
    </>
  );
}

export default App;
