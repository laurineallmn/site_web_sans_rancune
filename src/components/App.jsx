
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; //pour rediriger via le code directement (on peut pas utiliser LINK) (LINK est pas fait pour changer de page mais pour lier un element a une page grace au clique)
import './App.css';
import Video from './Video.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'


export default function App() {
  // const [buttonPlayClicked, setButtonPlayClicked] = useState(false);
  const [isFading, setIsFading] = useState(false);
  //verifier si Sans Rancune a été lancé 
  const [hasStarted, setHasStarted] = useState(false);

  //permettra d'aller vers la page video plus bas dans le code
  const navigate = useNavigate();

// on lit le localStorage AU CHARGEMENT de App.jsx pour voir si hasstarted est true ou false
  useEffect(() => {
    const started = localStorage.getItem('hasStarted');
    if (started === 'true') {
      setHasStarted(true);
    }
  }, []); 

  const handleStart = () => {
    localStorage.setItem('hasStarted', 'true'); //au clic du bouton 'lancer la partie" on dit que ca a commencé
    setHasStarted(true); //on met a jour l'etat local de react
    setIsFading(true);
    setTimeout(() => {
      navigate('/playing');
    }, 1000); // attend la fin du fade pour lancer le jeu
  };

  return (
    <div className="app-container">
      <Header /> {/* on passe la variable hasStarted au Header */}

      {/* {!buttonPlayClicked && ( */}
        <div className={`trailer-background-container ${isFading ? 'fade-out' : ''}`}>
          <video
              className="background-trailer"
              src="../../assets/video/bande_annonce.mp4"
              autoPlay
              muted
              loop
              playsInline
              disablePictureInPicture
              controlsList="nodownload noremoteplayback noplaybackrate nofullscreen"
          />
          <button className="start-button" onClick={handleStart}>
            {hasStarted ? 'CONTINUER LA PARTIE' : 'LANCER LA PARTIE'}
          </button>
        </div>
     
      <Footer />
    </div>
  );
}


