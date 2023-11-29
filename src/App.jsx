import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { auth, db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { setUser } from "./slices/userSlice";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import PrivateRouter from "./component/privateRouter/PrivateRouter";
import CreatePodcast from "./pages/CreatePodcast";
import Podcast from "./pages/Podcast";
import PodcastDetails from "./pages/PodcastDetails";
import CreateAnEpisode from "./pages/CreateAnEpisode";

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const unsuscribeAuth = onAuthStateChanged(auth,(user) => {

      if(user){
        const unsuscribeSnapshot = onSnapshot(
          doc(db,"users",user.uid),
          (userDoc)=>{
            if(userDoc.exists()){
              const userData = userDoc.data();
              dispatch(
                setUser({
                  name: userData.name,
                  email:userData.email,
                  uid :user.uid
                 })
              );
            }
          },
          (error)=>{
            console.log("error comming from useEffect ",error);
          }
        )
        return ()=>unsuscribeSnapshot()
      }
    });

    return ()=>unsuscribeAuth()
  },[dispatch])

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<SignUp/>} />
        <Route element={<PrivateRouter/>}>
           <Route path="/profile" element={<Profile/>} />
           <Route path="/podcasts" element={<Podcast/>} />
           <Route path="/create_podcast" element={<CreatePodcast/>} />
           <Route path="/podcast/:id" element={<PodcastDetails/>} />
           <Route path="/podcast/:id/create_a_episodee" element={<CreateAnEpisode/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
