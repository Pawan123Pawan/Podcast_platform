import { useEffect, useState } from "react";
import Header from "../component/Header/Header";
import PodcastComponent from "../component/podcast_component/PodcastComponent";
import styles from "./Signup.module.css";
import InputComponent from "../component/InputComponent/InputComponent";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";
import { setPodcasts } from "../slices/podcastSlice";
import { useDispatch, useSelector } from "react-redux";

function Podcast() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const podcasts = useSelector((state) => state.podcasts.podcasts);
  useEffect(() => {
    const unSubscribe = onSnapshot(
      query(collection(db, "podcasts")),
      (querySnapshot) => {
        const podcastData = [];
        querySnapshot.forEach((doc) => {
          podcastData.push({ id: doc.id, ...doc.data() });
        });
        dispatch(setPodcasts(podcastData));
      },
      (error) => {
        console.error("Fetching podcast data failed: ", error);
      }
    );

    return () => {
      unSubscribe();
    };
  }, [dispatch]);

var filterPodcasts = podcasts.filter((podcast)=>(podcast.title).trim().toLowerCase().includes(search.trim().toLowerCase()))
  return (
    <>
      <Header  />
      <div className={styles.podcast_page}>
        <h1 className={styles.signup_heading}>Discover Podcast</h1>
        <InputComponent
          type="text"
          value={search}
          hadleChange={(e) => setSearch(e.target.value)}
          placeholder={"Search the podcast"}
        />
        <div  className={`${styles.wraper_signup_page} ${styles.wrap_card}`}>
          {filterPodcasts.length > 0 ? (
            <>{filterPodcasts.map((item) => {
                return (
                    <PodcastComponent key={item.id}  id={item.id} title={item.title} displayImage={item.displayImage}/>
                )
            })}</>
            
          ) : (
            <p>{search? `Podcasts not found..`:`No current Podcast on this plateform..`}</p>
          )}

        </div>
      </div>
    </>
  );
}

export default Podcast;
