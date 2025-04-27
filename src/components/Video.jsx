import { useRef, useEffect, useState } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import videosData from '../../assets/data/videosData.js';
import './Video.css';

// => indique code fait pour : les boutons de menu et la memorisation du timecode en cours
/// => indique code fait pour : affichage des bouton de choix et QTE etc avec VideoData.js  /


export default function Video() {

  //pour se souvenir du timecode où la personne était (sil change de page)
  const videoRef = useRef(null);
  //permettra d'aller vers une autre page plus bas dans le code
  const navigate = useNavigate();
  ///pour savoir dans quel url est l'user
  const location = useLocation(); 



  const [savedTime, setSavedTime] = useState(0);
  //pour le bouton menu en haut a droite
  const [menuOpen, setMenuOpen] = useState(false);
  ///
  const [showQuestion, setShowQuestion] = useState(false);
  const [questionAlreadyAnswered, setQuestionAlreadyAnswered] = useState(false);

  /// por trouver la scène en cours depuis l'URL
  const currentSceneId = location.pathname.split('/').pop(); // ex: '/playing/chambre' => 'chambre'
  const scene = videosData.find(s => s.id === currentSceneId) || videosData[0]; // fallback (solution de secours si 1st solution ne marhce pas)


  // Charger le timecode depuis localStorage quand la page charge
  useEffect(() => {
    const storedTime = localStorage.getItem('videoSavedTime');
    if (storedTime && videoRef.current) {
      videoRef.current.currentTime = parseFloat(storedTime);
      videoRef.current.play();
    }
  }, []);

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


   /// convertir timecode du type "0:02:13:00" en sec
   const timecodeToSeconds = (tc) => {
    if (!tc) return 0;
    const parts = tc.split(':').map(p => parseInt(p, 10));
    const [h, m, s] = parts;
    return (h * 3600) + (m * 60) + s;
    //ce calcul decale son et image (son est en avance)
    // const [h, m, s, frames] = parts;
    // return (h * 3600) + (m * 60) + s + (frames / 25); // 25 fps classique
  };

  ///
  const startDisplay = timecodeToSeconds(scene.timecode_display_question);
  const endDisplay = timecodeToSeconds(scene.timecode_remove_question);
  const defaultNextSceneId = scene.defaultNextSceneId;

  ///
  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef.current) {
        const current = videoRef.current.currentTime;
  
        if (!questionAlreadyAnswered && current >= startDisplay && current <= endDisplay) {
          setShowQuestion(true);
        }
  
        if (!questionAlreadyAnswered && current > endDisplay) {
          setShowQuestion(false); // pour cacher les boutons et question s'il est trop tard
          if (defaultNextSceneId) {
            goTo(`/playing/${defaultNextSceneId}`);
          }
          setQuestionAlreadyAnswered(true);
        }
      }
    }, 500);
  
    return () => clearInterval(interval);
  }, [startDisplay, endDisplay, questionAlreadyAnswered, defaultNextSceneId]);
  
  ///
  // const handleChoiceClick = (nextSceneId) => {
  //   setQuestionAlreadyAnswered(true);
  //   goTo(`/playing/${nextSceneId}`);
  // };

  const handleChoiceClick = (choice) => {
    if (choice.timecode_jump && videoRef.current) {
      videoRef.current.currentTime = timecodeToSeconds(choice.timecode_jump);
      setShowQuestion(false); // pour cacher les boutons et la question après clic
      setQuestionAlreadyAnswered(true); // pour indiquer que la question est répondue
    }
  };

  /// si timecode_fin_scene est atteint ET qu'il existe un timecode_jump_next_scene, alors on avance automatiquement vers timecode_jump_next_scene.
  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef.current) {
        const current = videoRef.current.currentTime;
        const finScene = timecodeToSeconds(scene.timecode_fin_scene);
        const jumpNext = timecodeToSeconds(scene.timecode_jump_next_scene);
  
        if (finScene && jumpNext && current >= finScene) {
          const nextScene = videosData.find(scene => timecodeToSeconds(scene.timecode) === jumpNext);
          if (nextScene) {
              goTo(`/playing/${nextScene.id}`); //on change pas suelement le timecode mais aussi l'url pour que ca affiche les bonne questions
          }
      }
      }
    }, 500);
  
    return () => clearInterval(interval);
  }, [scene]);
  
  return (
      <div className="video-container">
        <video
                className="video-sans-rancune"
                ref={videoRef} 
                src="../../assets/video/montage_chambre_02.mp4"
                autoPlay
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
              
              <button onClick={() => {
              if (videoRef.current) {
                videoRef.current.currentTime = 0; // remet la vidéo au début
              }
              localStorage.removeItem('videoSavedTime');  //remet le timecode à zéro
              // localStorage.removeItem('hasStarted');  // pour mettre bouton à "LANCER PARTIE" au lieu de "CONTINUER")
              navigate('/playing'); // on recharge la page de jeu
              }}>Recommencer</button>

             <button onClick={() => {
              if (videoRef.current) {
                videoRef.current.currentTime += 60;
              }
              }}>Avancer 1 min</button>

              <button onClick={() => {
                if (videoRef.current) {
                  videoRef.current.currentTime -= 30;
                }
              }}>Reculer 30 sec</button>
              {/* <button onClick={() => { saveVideoState(); goTo('/playing-english-garder-current-timecode');}}>Changer de langue</button> */}
            </div>
          )}

        
            {/* /// AFFICHAGE QUESTION et PROPOSITION CHOIX*/}
          {showQuestion && (
            <div className="question-proposition-container">
              <h2>{scene.question}</h2>
              <div className="choices">
                {scene.choices.map((choice, index) => (
                  <button
                    key={index}
                    onClick={() => handleChoiceClick(choice)}
                  >
                    {choice.label}
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
  );
}