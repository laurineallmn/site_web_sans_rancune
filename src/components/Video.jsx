import { useRef, useEffect, useState } from 'react';

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
      <video ref={videoRef} src="/video.mp4" controls />
      <button onClick={saveVideoState}>Sauver état</button>
    </div>
  );
}
