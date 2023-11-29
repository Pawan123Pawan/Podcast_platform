import { useState } from "react";
import InputComponent from "../InputComponent/InputComponent";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomButton from "../CustomButton/CustomButton";
import { toast } from "react-toastify";
import FileUpload from "../InputComponent/FileUpload";
import { ref, uploadBytes, getStorage, getDownloadURL } from "firebase/storage";
import { auth, db } from "../../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

function CreatePodcastComponent() {

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [displayImage, setDisplayImage] = useState();
  const [bannerImage, setBannerImage] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit() {
    if (title && desc && displayImage && bannerImage) {
      setLoading(true)
      try {
        //Upload file  get dounload links
        console.log("Uploading")
        const storage = getStorage();
        const bannerImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(bannerImageRef, bannerImage);
        const bannerImageUrl = await getDownloadURL(bannerImageRef);
        // console.log(bannerImageUrl);

        const displayImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(displayImageRef, displayImage);
        const displayImageUrl = await getDownloadURL(displayImageRef);
        // console.log(displayImageUrl);

        const podcastData = {
          title: title,
          description: desc,
          displayImage: displayImageUrl,
          bannerImage: bannerImageUrl,
          createdBy: auth.currentUser.uid,
        };

        const docRef =  await addDoc(collection(db, "podcasts"), podcastData);
        
        setTitle("");
        setDesc("");
        setBannerImage(null);
        setDisplayImage(null);
        //created a nea doc in a new collection podcast
        //save this new podcast episodes states in our podcast
        toast.success("Podcast created successfully");
        setLoading(false)
      } catch (e) {
        console.log(e);
        toast.error(e.message);
        setLoading(false)
      }
    } else {
      toast.error("All filed are required.");
      setLoading(false)
    }
  }
  return (
    <>
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
        accept={"image/*"}
        filehandle={(files) => setDisplayImage(files)}
        id={"display-image-input"}
        text={"Display image upload"}
      />
      <FileUpload
        accept={"image/*"}
        filehandle={(files) => setBannerImage(files)}
        id={"banner-image-input"}
        text={"Banner image upload"}
      />
      <CustomButton
        onclick={handleSubmit}
        value={loading ? "Loading.." : "Create Podcast"}
      />
    </>
  );
}

export default CreatePodcastComponent;
