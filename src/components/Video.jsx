import { useRef, useEffect, useState } from 'react';
import './Video.css';

export default function Video() {
  const videoRef = useRef(null);
  const [savedTime, setSavedTime] = useState(0);

  // Quand on arrive, on remet la vidéo au bon moment
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = savedTime;
      videoRef.current.play();
    }
  }, [savedTime]);

  // Fonction pour sauvegarder l'état avant de quitter
  const saveVideoState = () => {
    if (videoRef.current) {
      setSavedTime(videoRef.current.currentTime);
    }
  };

  return (
    <div>
      {/* <Header/> */}
      {/* <p>Lol</p> */}
      <div className="video-container">
        <video
                className="video-sans-rancune"
                ref={videoRef} 
                src="../../assets/video/montage_chambre_02.mp4"
                autoPlay
                muted
                loop
                playsInline
                disablePictureInPicture
                controlsList="nodownload noremoteplayback noplaybackrate nofullscreen"
            />
        <button onClick={saveVideoState}>Sauver état</button>
      </div>
    </div>
  );
}
