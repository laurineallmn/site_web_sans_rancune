import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Video.css';

export default function Video() {
  //pour se souvenir du timecode où la personne était (sil change de page)
  const videoRef = useRef(null);
  const [savedTime, setSavedTime] = useState(0);

  //pour le bouton menu en haut a droite
  const [menuOpen, setMenuOpen] = useState(false);
  //permettra d'aller vers une autre page plus bas dans le code
  const navigate = useNavigate();

  // 1st verison
  // Quand on arrive, on remet la vidéo au bon moment
  // useEffect(() => {
  //   if (videoRef.current) {
  //     videoRef.current.currentTime = savedTime;
  //     videoRef.current.play();
  //   }
  // }, [savedTime]);

  // Charger le timecode depuis localStorage quand la page charge
  useEffect(() => {
    const storedTime = localStorage.getItem('videoSavedTime');
    if (storedTime && videoRef.current) {
      videoRef.current.currentTime = parseFloat(storedTime);
      videoRef.current.play();
    }
  }, []);

  // 1st version
  // Fonction pour sauvegarder l'état avant de quitter
  // const saveVideoState = () => {
  //   if (videoRef.current) {
  //     setSavedTime(videoRef.current.currentTime);
  //   }
  // };

   // Sauvegarder dans l'état ET dans localStorage
   const saveVideoState = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      setSavedTime(current);
      localStorage.setItem('videoSavedTime', current); // <-- STOCKAGE
    }
  };

  //pour le bouton menu en haut a droite
  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  //pour les onglet du bouton menu et la redirection vers d'autre pages
  const goTo = (path) => {
    saveVideoState();
    navigate(path);
  };

  return (
    <div>
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
        {/* <button onClick={saveVideoState}>Sauver état</button> */}
        {/* BOUTON MENU */}
        <div className="menu-container">
          <button className={`menu-button ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </button>

          {/* PETITS BOUTONS */}
          {menuOpen && (
            <div className="menu-items">
              <button onClick={() => { saveVideoState(); goTo('/'); }}>Quitter</button>
              <button onClick={() => { saveVideoState(); goTo('/notice'); }}>Notice</button>
              {/* <button onClick={() => goTo('/playing')}>Recommencer</button> */}
              {/* si on veut un bouton recommencer il faudra faire : localStorage.removeItem('videoSavedTime'); */}
              {/* <button onClick={() => { saveVideoState(); goTo('/playing-english-garder-current-timecode');}}>Changer de langue</button> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
