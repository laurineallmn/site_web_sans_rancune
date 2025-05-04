import { useRef, useEffect, useState } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import videosData from '../../assets/data/videosData.js';
import './Video.css';

const roomsData = [
  { name: "Salon", visited: false },
  { name: "Sous-sol", visited: false },
  { name: "Chambre", visited: false },
  { name: "SDB", visited: false }
];

const suspectsData = [
  { 
    name: "Sarah",
    questions: [
      { text: "Que te souviens-tu de la soirée ?", asked: false },
      { text: "Comment as-tu découvert le corps ?", asked: false },
      { text: "Étais-tu proche de Maëlys ?", asked: false },
      { text: "As-tu remarqué d'autres comportements étranges ?", asked: false },
      { text: "Qu'as-tu fait par la suite ?", asked: false },
      { text: "Qui d'autre savait pour le harcèlement d'Amélie ?", asked: false }
    ]
  },
  { 
    name: "Mathieu",
    questions: [
      { text: "Pourquoi avoir fait venir Maëlys à la soirée ?", asked: false },
      { text: "Pourquoi avez-vous un oeil au beurre noir ?", asked: false },
      { text: "De quoi vous souvenez-vous de la soirée ?", asked: false },
      { text: "Confronter Mathieu à la réalité", asked: false },
      { text: "L'accuser de mentir", asked: false },
      { text: "Quelles sont les dernières infos dont il se souvient", asked: false }
    ]
  },
  { 
    name: "Louis",
    questions: [
      { text: "Pourquoi avoir quitté la soirée ?", asked: false },
      { text: "Pourquoi être revenu à 1h du matin ?", asked: false },
      { text: "Quels sont vos liens avec les suspects ?", asked: false },
      { text: "Qu'avez-vous fait après avoir quitté la soirée ?", asked: false },
      { text: "L'accuser de mentir", asked: false },
      { text: "Lui montrer les comprimés", asked: false }
    ]
  },
  { 
    name: "Arthur",
    questions: [
      { text: "Peux-tu me parler de tes relations avec les autres suspects ?", asked: false },
      { text: "Raconte-moi ta version des faits", asked: false },
      { text: "Puis-je regarder ton téléphone ?", asked: false },
      { text: "Pourquoi t'es-tu disputé avec Maëlys ?", asked: false },
      { text: "As-tu eu des nouvelles de Maëlys ?", asked: false },
      { text: "Puis-je fouiller ta voiture ?", asked: false }
    ]
  }
];

export default function Video() {
  // Références
  const videoRef = useRef(null);
  const audioQTERef = useRef(null);
  
  // Navigation et location
  const navigate = useNavigate();
  const location = useLocation(); 

  // États
  const [savedTime, setSavedTime] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [questionAlreadyAnswered, setQuestionAlreadyAnswered] = useState(false);
  const [showQTE, setShowQTE] = useState(false);
  const [qteSucceeded, setQteSucceeded] = useState(false);
  const [qteAlreadyFailed, setQteAlreadyFailed] = useState(false);
  const [qteProgress, setQteProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);
  const [pauseImage, setPauseImage] = useState('');
  const [volume, setVolume] = useState(0.5); // Volume par défaut à 50%
  const [showVolumeControl, setShowVolumeControl] = useState(false);

  // Trouver la scène en cours depuis l'URL
  const currentSceneId = location.pathname.split('/').pop();
  const scene = videosData.find(s => s.id === currentSceneId) || videosData[0];

  // Charger le timecode et le volume depuis localStorage au chargement
  useEffect(() => {
    const storedTime = localStorage.getItem('videoSavedTime');
    const storedVolume = localStorage.getItem('videoVolume');
    
    if (videoRef.current) {
      if (storedTime) {
        videoRef.current.currentTime = parseFloat(storedTime);
      }
      
      if (storedVolume) {
        setVolume(parseFloat(storedVolume));
        videoRef.current.volume = parseFloat(storedVolume);
      } else {
        videoRef.current.volume = volume;
      }
      
      videoRef.current.play();
    }
  }, []);

  // Sauvegarder dans l'état ET dans localStorage
  const saveVideoState = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      setSavedTime(current);
      localStorage.setItem('videoSavedTime', current);
    }
  };

  // Toggle menu
  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  // Toggle contrôle du volume
  const toggleVolumeControl = () => {
    setShowVolumeControl(prev => !prev);
  };

  // Changer le volume
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    localStorage.setItem('videoVolume', newVolume);
    
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  // Navigation
  const goTo = (path) => {
    saveVideoState();
    navigate(path);
  };

  // Convertir timecode du type "0:02:13:00" en sec
  const timecodeToSeconds = (tc) => {
    if (!tc) return 0;
    const parts = tc.split(':').map(p => parseInt(p, 10));
    const [h, m, s] = parts;
    return (h * 3600) + (m * 60) + s;
  };

  // Timecodes importants
  const startDisplay = timecodeToSeconds(scene.timecode_display_question);
  const endDisplay = timecodeToSeconds(scene.timecode_remove_question);
  const defaultNextSceneId = scene.defaultNextSceneId;
  const startQTE = timecodeToSeconds(scene.timecode_display_qte);
  const endQTE = timecodeToSeconds(scene.timecode_remove_qte);
  const failTimecode = timecodeToSeconds(scene.fail_next_scene_timecode);

  // Gestion des questions
  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef.current) {
        const current = videoRef.current.currentTime;
  
        if (!questionAlreadyAnswered && current >= startDisplay && current <= endDisplay) {
          setShowQuestion(true);
          if (!isPaused) {
            videoRef.current.pause();
            setIsPaused(true);
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
  
  // Gérer les choix
  const handleChoiceClick = (choice) => {
    if (choice.timecode_jump && videoRef.current) {
      videoRef.current.currentTime = timecodeToSeconds(choice.timecode_jump);
      setShowQuestion(false);
      setQuestionAlreadyAnswered(true);
      videoRef.current.play();
      setIsPaused(false);
    }
  };
  
  // Gérer la fin de scène
  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef.current) {
        const current = videoRef.current.currentTime;
        const finScene = timecodeToSeconds(scene.timecode_fin_scene);
        const jumpNext = timecodeToSeconds(scene.timecode_jump_next_scene);
  
        if (finScene && jumpNext && current >= finScene) {
          const nextScene = videosData.find(scene => timecodeToSeconds(scene.timecode) === jumpNext);
          if (nextScene) {
              goTo(`/playing/${nextScene.id}`);
          }
        }
      }
    }, 500);
  
    return () => clearInterval(interval);
  }, [scene]);
  
  // Réinitialiser QTE à chaque changement de scène
  useEffect(() => {
    setQteAlreadyFailed(false);
  }, [scene]);

  // Gestion des QTE
  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef.current) {
        const current = videoRef.current.currentTime;
  
        // Jouer le son QTE avant l'affichage
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
  
  // Gestion des touches pour QTE
  useEffect(() => {
    const handleKeyPress = (event) => {
      const expectedKey = scene.keyboard?.length > 0 ? scene.keyboard[0].label.toLowerCase() : null;
      if (showQTE && expectedKey && event.key.toLowerCase() === expectedKey) {
        setQteSucceeded(true);
  
        setTimeout(() => {
          setShowQTE(false);
        }, 1000);
      }
    };
  
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [showQTE, scene]);
  
  // Progress bar pour QTE
  useEffect(() => {
    let interval;
  
    if (showQTE) {
      const duration = (endQTE - startQTE) * 1000;
      const startTime = Date.now();
  
      interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.max(0, 100 - (elapsed / duration) * 100);
        setQteProgress(progress);
  
        if (progress <= 0) {
          clearInterval(interval);
        }
      }, 50);
    } else {
      setQteProgress(100);
    }
  
    return () => clearInterval(interval);
  }, [showQTE, startQTE, endQTE]);

  // Gestion pause/play avec espace
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === ' ') {
        if (isPaused) {
          videoRef.current.play();
          setIsPaused(false);
          setPauseImage('');
        } else {
          videoRef.current.pause();
          setIsPaused(true);
          setPauseImage('../../assets/photo/pause.JPG');
        }
      }
      
      // Touches pour contrôle du volume
      if (event.key === 'ArrowUp' && volume < 1) {
        const newVolume = Math.min(1, volume + 0.1);
        setVolume(newVolume);
        localStorage.setItem('videoVolume', newVolume);
        if (videoRef.current) {
          videoRef.current.volume = newVolume;
        }
      }
      
      if (event.key === 'ArrowDown' && volume > 0) {
        const newVolume = Math.max(0, volume - 0.1);
        setVolume(newVolume);
        localStorage.setItem('videoVolume', newVolume);
        if (videoRef.current) {
          videoRef.current.volume = newVolume;
        }
      }
      
      // Touche M pour mute/unmute
      if (event.key === 'm' || event.key === 'M') {
        if (videoRef.current.muted) {
          videoRef.current.muted = false;
        } else {
          videoRef.current.muted = true;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isPaused, volume]);
  
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
      
      {/* Affichage de l'image de pause */}
      {isPaused && pauseImage && (
        <div className="pause-overlay">
          <img src={pauseImage} alt="Pause" className="pause-image" />
        </div>
      )}
  
      <audio ref={audioQTERef} src="../../assets/audio/QTE.mp3" preload="auto"></audio>
      
      {/* Contrôle du volume */}
      <div className="volume-controls">
        <button className="volume-button" onClick={toggleVolumeControl}>
          {videoRef.current && videoRef.current.muted ? '🔇' : volume > 0.5 ? '🔊' : volume > 0 ? '🔉' : '🔈'}
        </button>
        
        {showVolumeControl && (
          <div className="volume-slider-container">
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.1" 
              value={volume}
              onChange={handleVolumeChange}
              className="volume-slider"
            />
            <button 
              className="mute-button"
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.muted = !videoRef.current.muted;
                }
              }}
            >
              {videoRef.current && videoRef.current.muted ? 'Unmute' : 'Mute'}
            </button>
          </div>
        )}
      </div>
  
      {/* Affichage de la QTE */}
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
                  strokeDasharray: 282,
                  strokeDashoffset: (282 * (100 - qteProgress)) / 100,
                }}
              />
            </svg>
            <div className="qte-text">{scene.keyboard && scene.keyboard.length > 0 ? scene.keyboard[0].label.toUpperCase() : ''}</div>
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
                videoRef.current.currentTime = 0;
              }
              localStorage.removeItem('videoSavedTime');
              navigate('/playing');
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
            
            <button onClick={() => {
              if (videoRef.current) {
                videoRef.current.muted = !videoRef.current.muted;
              }
            }}>{videoRef.current && videoRef.current.muted ? 'Activer son' : 'Couper son'}</button>
          </div>
        )}
      </div>
      
      {/* Questions et choix */}
      {showQuestion && (
        <div className="question-proposition-centered">
          <div className="question-box">
            <h2 className="question-text">{scene.question}</h2>
            <div className="choices">
              {scene.choices.map((choice, index) => (
                <button key={index} onClick={() => handleChoiceClick(choice)}>
                  {choice.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}