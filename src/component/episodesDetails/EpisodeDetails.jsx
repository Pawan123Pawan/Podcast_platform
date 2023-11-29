import styles from './style.module.css';

function EpisodeDetails({title,description,handlePlay}) {
    // function handlePlay(){
    //     console.log("playing",audioFile);
    // }
  return (
    <div>
        <h2 style={{fontSize:"20px",margin:"0" }}>{title}</h2>
        <p style={{color: "rgba(255, 255, 255, 0.50)",fontSize:"13px", marginTop:"2px"}}>{description}</p>
        <div className={styles.custom_button} style={{width:"100px"}} onClick={handlePlay}>Play</div>
    </div>
  )
}

export default EpisodeDetails