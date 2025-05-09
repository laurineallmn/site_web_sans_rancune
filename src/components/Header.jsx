import { useEffect, useState } from 'react';
import './Header.css'
import { Link } from 'react-router-dom'

export default function Header(){
    //si la video sans rancune a commencé
    const [hasStarted, setHasStarted] = useState(false);

    const handleStartHeader = () => {
        localStorage.setItem('hasStarted', 'true'); //au clic du bouton 'lancer la partie" on dit que ca a commencé
      };

    useEffect(() => {
        const started = localStorage.getItem('hasStarted');
        if (started === 'true') {
        setHasStarted(true);
        }
    }, []); //au chargement seulement

    return (
        <div id="navbar">
            <div id="navbar-droite">
                <Link to="/"><h1>SANS RANCUNE</h1></Link>
            </div>
            {/* <Link to="/"><h3>HOME</h3></Link> */}
            <div id="navbar-droite">
                <Link to="/notice"><h3>NOTICE</h3></Link>
                <Link to="/a-propos"><h3>A PROPOS</h3></Link>
                <Link to="/contact"><h3>CONTACT</h3></Link>   
                {/* <Link to="/playing"><h3 style="background-color: #669BBC;">JOUER</h3></Link> */}
                <Link to="/playing">
                    <h3 id="jouer-button" onClick={handleStartHeader}>{hasStarted ? 'CONTINUER PARTIE' : 'JOUER'}</h3>
                </Link>  
            </div> 
        </div>
        
        // //  <div id="navbar">
        // //     <Link to="/"><h1>SANS RANCUNE</h1></Link>
        // //     <Link to="/notice">NOTICE</Link>  
        // //     <Link to="/a-propos">A PROPOS</Link>
        // //     <Link to="/contact">CONTACT</Link>   
        // //     <Link to="/playing">JOUER</Link>   
        // // </div> 
    );
}