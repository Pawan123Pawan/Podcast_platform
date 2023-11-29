import { useNavigate, useParams } from "react-router-dom";
import Header from "../component/Header/Header";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { toast } from "react-toastify";
import styles from "./style.module.css";
import EpisodeDetails from "../component/episodesDetails/EpisodeDetails";
import AudioPlayer from "../component/pylaying_audioFile/AudioPlayer";

function PodcastDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [podcast, setPodcast] = useState({});
  const [episode, setEpisode] = useState([]);
  const[playingFile,setPlayingFile] = useState("")

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  const getData = async () => {
    try {
      const docRef = doc(db, "podcasts", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPodcast({ id: id, ...docSnap.data() });

      } else {
        navigate("/podcasts");
        toast.error("Podcast not found");
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  useEffect(() => {
    const unSubscribe = onSnapshot(
      query(collection(db, "podcasts", id, "episodes")),
      (querySnapshot) => {
        const episodeData = [];
        querySnapshot.forEach((doc) => {
          episodeData.push({ id: doc.id, ...doc.data() });
        });
        setEpisode(episodeData);
      },
      (error) => {
        console.error("Fetching episode data failed: ", error);
      }
    );

    return () => {
      unSubscribe();
    };
  }, [id]);

  return (
    <>
      <Header />
      {podcast.id && (
        <div className={styles.podcast_details_page}>
          <div className={styles.episode_title_div}>
            <h2 style={{ margin: "0px" }}>{podcast.title}</h2>
            <div
              className={styles.custom_button}
              onClick={() => navigate(`/podcast/${id}/create_a_episodee`)}
            >
              Create Episode
            </div>
          </div>
          <img
            src={podcast.bannerImage}
            alt="banner-image"
            className={styles.banner_image}
          />
          <p style={{color: "rgba(255, 255, 255, 0.50)",fontSize:"16px"}}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad,
            veritatis velit nam recusandae quod consequatur a ratione voluptas
            dolorum quisquam consequuntur non, at tempore earum ut error impedit
            sit. Suscipit.
          </p>
          <h2 style={{ margin: "0" }}>Episode</h2>
          {episode.length > 0 ? (
            <ol>
              <li>
                {episode.map((episode,index) => (
                  <EpisodeDetails
                    key={index}
                    title={episode.title}
                    description={episode.description}
                    handlePlay={()=>setPlayingFile(episode.audioFile)}
                  />
                ))}
              </li>
            </ol>
          ) : (
            <p>No episode here......</p>
          )}
         
        </div>
      )}
       {playingFile && <AudioPlayer audioSrc={playingFile} image = {podcast.displayImage}/>}
    </>
  );
}

export default PodcastDetails;
