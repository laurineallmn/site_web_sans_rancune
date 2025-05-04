import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import Header from './Header.jsx'
import Footer from './Footer.jsx'

export default function App() {
  const [isFading, setIsFading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [volume, setVolume] = useState(0.5); // Valeur par défaut du volume à 50%
  const [videoRef, setVideoRef] = useState(null);

  const navigate = useNavigate();

  // Lire le localStorage AU CHARGEMENT de App.jsx pour voir si hasstarted est true ou false
  useEffect(() => {
    const started = localStorage.getItem('hasStarted');
    if (started === 'true') {
      setHasStarted(true);
    }
    
    // Récupérer le volume sauvegardé si disponible
    const savedVolume = localStorage.getItem('videoVolume');
    if (savedVolume) {
      setVolume(parseFloat(savedVolume));
    }
  }, []); 

  // Effet pour appliquer le volume à la vidéo quand videoRef ou volume change
  useEffect(() => {
    if (videoRef) {
      videoRef.volume = volume;
    }
  }, [videoRef, volume]);

  const handleStart = () => {
    localStorage.setItem('hasStarted', 'true');
    setHasStarted(true);
    setIsFading(true);
    setTimeout(() => {
      navigate('/playing');
    }, 1000);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    localStorage.setItem('videoVolume', newVolume);
    
    if (videoRef) {
      videoRef.volume = newVolume;
    }
  };

  return (
    <div className="app-container">
      <Header />

      <div className={`trailer-background-container ${isFading ? 'fade-out' : ''}`}>
        <video
          className="background-trailer"
          src="../../assets/video/bande_annonce.mp4"
          ref={(el) => setVideoRef(el)}
          autoPlay
          loop
          playsInline
          disablePictureInPicture
          controlsList="nodownload noremoteplayback noplaybackrate nofullscreen"
        />
        
        <div className="controls-container">
          <button className="start-button" onClick={handleStart}>
            {hasStarted ? 'CONTINUER LA PARTIE' : 'LANCER LA PARTIE'}
          </button>
          
          <div className="volume-control">
            <label htmlFor="volume">Volume:</label>
            <input 
              type="range" 
              id="volume" 
              min="0" 
              max="1" 
              step="0.1" 
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
        </div>
      </div>
     
      <Footer />
    </div>
  );
}