import { useRef, useEffect, useState } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import videosData from '../../assets/data/videosData.js';
import './Video.css';

// => indique code fait pour : les boutons de menu et la memorisation du timecode en cours
/// => indique code fait pour : affichage des bouton de choix et QTE etc avec VideoData.js  /


export default function Video() {

  //pour se souvenir du timecode où la personne était (sil change de page)
  const videoRef = useRef(null);
  const audioQTERef = useRef(null);
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

  const [showQTE, setShowQTE] = useState(false);
  const [qteSucceeded, setQteSucceeded] = useState(false);
  const [qteAlreadyFailed, setQteAlreadyFailed] = useState(false);
  const [qteProgress, setQteProgress] = useState(100); // en pourcentage
  const [isPaused, setIsPaused] = useState(false);





  /// por trouver la scène en cours depuis l'URL
  const currentSceneId = location.pathname.split('/').pop(); // ex: '/playing/chambre' => 'chambre'
  const scene = videosData.find(s => s.id === currentSceneId) || videosData[0]; // fallback (solution de secours si 1st solution ne marhce pas)


  // pour charger le timecode depuis localStorage quand la page charge
  useEffect(() => {
    const storedTime = localStorage.getItem('videoSavedTime');
    if (storedTime && videoRef.current) {
      videoRef.current.currentTime = parseFloat(storedTime);
      videoRef.current.play();
    }
  }, []);

   // pour sauvegarder dans l'état ET dans localStorage
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
  };

  ///
  const startDisplay = timecodeToSeconds(scene.timecode_display_question);
  const endDisplay = timecodeToSeconds(scene.timecode_remove_question);
  const defaultNextSceneId = scene.defaultNextSceneId;
  const startQTE = timecodeToSeconds(scene.timecode_display_qte);
const endQTE = timecodeToSeconds(scene.timecode_remove_qte);
const failTimecode = timecodeToSeconds(scene.fail_next_scene_timecode);


  ///
  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef.current) {
        const current = videoRef.current.currentTime;
  
        if (!questionAlreadyAnswered && current >= startDisplay && current <= endDisplay) {
          setShowQuestion(true);
          if (!isPaused) {
            videoRef.current.pause();  // Mettre en pause la vidéo
            setIsPaused(true);  // Mettre à jour l'état pour indiquer que la vidéo est en pause
          }
        }
  
        if (!questionAlreadyAnswered && current > endDisplay) {
          setShowQuestion(false);
          if (defaultNextSceneId) {
            goTo(`/playing/${defaultNextSceneId}`);
          }
          setQuestionAlreadyAnswered(true);
        }
      }
    }, 500);
  
    return () => clearInterval(interval);
  }, [startDisplay, endDisplay, questionAlreadyAnswered, defaultNextSceneId, isPaused]);
  
  


  const handleChoiceClick = (choice) => {
    if (choice.timecode_jump && videoRef.current) {
      videoRef.current.currentTime = timecodeToSeconds(choice.timecode_jump);
      setShowQuestion(false);
      setQuestionAlreadyAnswered(true);
      videoRef.current.play();  // Reprendre la lecture de la vidéo
      setIsPaused(false);  // Mettre à jour l'état pour indiquer que la vidéo est en lecture
    }
  };
  

  /// si timecode_fin_scene est atteint ET qu'il existe un timecode_jump_next_scene, alors on avance automatiquement vers timecode_jump_next_scene.
  /// utile surtout pour passer de historique de recherche à "chambre-fin"
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
  }, [scene])
  
  useEffect(() => {
    setQteAlreadyFailed(false); // réinitialiser l'état à chaque changement de scène
  }, [scene]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef.current) {
        const current = videoRef.current.currentTime;
  
        // Jouer le son QTE 1 seconde avant l'affichage du QTE
        if (!qteSucceeded && !qteAlreadyFailed && 
            current >= (startQTE - 0.35) && current < startQTE) {
          if (audioQTERef.current) {
            audioQTERef.current.play().catch(e => console.log("Erreur audio:", e));
          }
        }
  
        if (!qteSucceeded && current >= startQTE && current <= endQTE) {
          setShowQTE(true);
        }
  
        if (!qteSucceeded && !qteAlreadyFailed && current > endQTE) {
          setQteAlreadyFailed(true);
  
          setTimeout(() => {
            setShowQTE(false);
            if (failTimecode) {
              videoRef.current.currentTime = failTimecode;
            }
          }, 1000);
        }
      }
    }, 200);
  
    return () => clearInterval(interval);
  }, [startQTE, endQTE, qteSucceeded, failTimecode, qteAlreadyFailed]);
  
  

  useEffect(() => {
    const handleKeyPress = (event) => {
      const expectedKey = scene.keyboard.length > 0 ? scene.keyboard[0].label.toLowerCase() : null;
      if (showQTE && expectedKey && event.key.toLowerCase() === expectedKey) {
        setQteSucceeded(true);
  
        setTimeout(() => {
          setShowQTE(false);
        }, 1000); // attendre 1 seconde pour afficher la réussite visuellement
      }
    };
  
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [showQTE, scene]);
  
  useEffect(() => {
    let interval;
  
    if (showQTE) {
      const duration = (endQTE - startQTE) * 1000; // en millisecondes
      const startTime = Date.now();
  
      interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.max(0, 100 - (elapsed / duration) * 100);
        setQteProgress(progress);
  
        if (progress <= 0) {
          clearInterval(interval);
        }
      }, 50); // actualisation fluide
    } else {
      setQteProgress(100); // reset quand pas de QTE
    }
  
    return () => clearInterval(interval);
  }, [showQTE, startQTE, endQTE]);
  
  
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
            <audio ref={audioQTERef} src="../../assets/audio/QTE.mp3" preload="auto"></audio>
 {/* ICI, TON AFFICHAGE QTE */}
 {showQTE && (
  <div className={`qte-container ${qteSucceeded ? 'qte-success' : qteAlreadyFailed ? 'qte-fail' : ''}`}>
    <div className="qte-circle-wrapper">
      <svg className="qte-circle" viewBox="0 0 100 100">
        <circle className="qte-circle-bg" cx="50" cy="50" r="45" />
        <circle
          className="qte-circle-fg"
          cx="50"
          cy="50"
          r="45"
          style={{
            strokeDasharray: 282, // 2 * PI * r (2 * 3.14 * 45)
            strokeDashoffset: (282 * (100 - qteProgress)) / 100,
          }}
        />
      </svg>
      <div className="qte-text">{scene.keyboard[0]?.label.toUpperCase()}</div>
    </div>
  </div>
)}




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