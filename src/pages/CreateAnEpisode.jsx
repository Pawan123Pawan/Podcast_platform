import React, { useState } from "react";
import Header from "../component/Header/Header";
import { useNavigate, useParams } from "react-router-dom";
import InputComponent from "../component/InputComponent/InputComponent";
import CustomButton from "../component/CustomButton/CustomButton";
import { toast } from "react-toastify";
import FileUpload from "../component/InputComponent/FileUpload";
import styles from './Signup.module.css';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { auth, db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

function CreateAnEpisode() {
    const {id} = useParams();  
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [audioFile, setAudioFile] = useState();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit() {
    setLoading(true);
    if (title && desc && audioFile && id) {
      try {
        const storage = getStorage();
        const audioRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(audioRef, audioFile);

        const audioUrl = await getDownloadURL(audioRef);

        const episodeData = {
          title: title,
          description: desc,
          audioFile: audioUrl
        };

        const docRef =  await addDoc(collection(db, "podcasts", id, "episodes"), episodeData);
        
        toast.success("Episodes added successfully")
        setLoading(false);
        navigate(`/podcast/${id}`)
        setTitle("");
        setDesc("");
        setAudioFile(null);
        toast.success("Episodes added");

      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      toast.error("All fields should be required");
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <div className={styles.wraper_signup_page}>
        <InputComponent
          type="text"
          value={title}
          hadleChange={(e) => setTitle(e.target.value)}
          placeholder={"Title"}
        />
        <InputComponent
          type="text"
          value={desc}
          hadleChange={(e) => setDesc(e.target.value)}
          placeholder={"Description"}
        />
        <FileUpload
          accept={"audio/*"}
          filehandle={(files) => setAudioFile(files)}
          id={"audio-image-input"}
          text={"Audio file upload here..."}
        />
        <CustomButton
          onclick={handleSubmit}
          value={loading ? "Loading.." : "Create Episode"}
        />
      </div>
    </>
  );
}

export default CreateAnEpisode;
