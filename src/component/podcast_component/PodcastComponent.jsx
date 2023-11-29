import { Link } from "react-router-dom";
import playImage from "../../assets/play.png";
import styles from "./style.module.css";

function PodcastComponent({id,title,displayImage}) {
//   console.log(data.id);
  return (

    <Link to={`/podcast/${id}`}>
      <div className={styles.podcast_card}>
        <img
          src={displayImage}
          alt="display_image"
          className={styles.podcast_image}
        />
        <div className={styles.podcast_description}>
          <div className={styles.title}>{title}</div>
          <img src={playImage} alt="play" className={styles.playImage} />
        </div>
      </div>
    </Link>
  );
}

export default PodcastComponent;
