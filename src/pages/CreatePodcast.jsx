import Header from "../component/Header/Header";
import CreatePodcastComponent from "../component/createPodcast/CreatePodcastComponent";
import styles from './Signup.module.css'
function CreatePodcast() {
  return (
    <>
      <Header />
      <div className={styles.wraper_signup_page}>
        <h1 className={styles.signup_heading}>Create Podcast</h1>
        <CreatePodcastComponent/>
      </div>
    </>
  );
}

export default CreatePodcast;
