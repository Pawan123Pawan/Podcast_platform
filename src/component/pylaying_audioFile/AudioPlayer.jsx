import { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
import { FaPlay, FaPause, FaVolumeMute } from "react-icons/fa";
import { IoVolumeHigh } from "react-icons/io5";

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}

function AudioPlayer({ audioSrc, image }) {
  const audioRef = useRef();
  const [audioRange, setAudioRange] = useState(0);
  const [volumeRange, setVolumeRange] = useState(0.5);
  const [mute, setMute] = useState(false);
  const [pause, setPause] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0); // Initialize duration state

  useEffect(() => {
    if (pause) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [pause]);

  useEffect(() => {
    if (mute) {
      audioRef.current.volume = 0;
    } else {
      audioRef.current.volume = volumeRange;
    }
  }, [mute, volumeRange]);

  useEffect(() => {
    const updateDuration = () => {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;

      // Set duration state only when it's available
      if (!isNaN(duration)) {
        setDuration(duration);
      }

      const progress = (currentTime / duration) * 100;
      setAudioRange(progress.toFixed(1));
      setCurrentTime(currentTime);
      // Check if the current time is equal to the duration, then pause
      if (currentTime === duration) {
        setPause(false);
        // setAudioRange(0)
      }
    };

    audioRef.current.addEventListener("timeupdate", updateDuration);

    // return () => {
    //   audioRef.current.removeEventListener("timeupdate", updateDuration);
    // };
  }, [duration]); // Run when duration changes

  const handleAudioRangeChange = (e) => {
    const newPosition = parseFloat(e.target.value);
    const newTime = (newPosition / 100) * duration;
    audioRef.current.currentTime = newTime;
    setAudioRange(newPosition.toFixed(1));
  };


  return (
    <div className={styles.audio_player_div}>
      <img src={image} alt="audio_src" className={styles.auido_image} />
      <audio ref={audioRef} src={audioSrc} />
      {pause ? (
        <p onClick={() => setPause(false)} className={styles.icon_button}>
          <FaPause />
        </p>
      ) : (
        <p onClick={() => setPause(true)} className={styles.icon_button}>
          <FaPlay />
        </p>
      )}

      <div className={styles.player_div}>
        <p>{formatTime(currentTime)}</p>
        <input
          type="range"
          className={`${styles.audio_range} ${styles.icon_button}`}
          max={100}
          min={0}
          step={0.1}
          value={audioRange}
          onChange={handleAudioRangeChange}
        />
        <p>{formatTime(duration)}</p>
      </div>

      {mute ? (
        <p onClick={() => setMute(false)} className={`${styles.icon_button}`}>
          <FaVolumeMute />
        </p>
      ) : (
        <p onClick={() => setMute(true)} className={styles.icon_button}>
          <IoVolumeHigh />
        </p>
      )}

      <input
        type="range"
        className={`${styles.volume_range} ${styles.icon_button}`}
        max={1}
        min={0}
        step={0.1}
        value={volumeRange}
        onChange={(e) => setVolumeRange(parseFloat(e.target.value))}
      />
    </div>
  );
}

export default AudioPlayer;
