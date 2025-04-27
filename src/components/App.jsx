
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; //pour rediriger via le code directement (on peut pas utiliser LINK) (LINK est pas fait pour changer de page mais pour lier un element a une page grace au clique)
import './App.css';
import Video from './Video.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'


export default function App() {
  // const [buttonPlayClicked, setButtonPlayClicked] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const navigate = useNavigate();

  const handleStart = () => {
    setIsFading(true);
    setTimeout(() => {
      navigate('/playing');
    }, 1000); // attend la fin du fade pour lancer le jeu
  };

  return (
    <div className="app-container">
      <Header />

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
            LANCER LA PARTIE
          </button>
        </div>
      {/* )} */}

      {/* {buttonPlayClicked && (
        // <Video />
        <Link to="/playing"></Link>
      )} */}

      <Footer />
    </div>
  );
}


