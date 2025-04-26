import './Apropos.css'
import Header from './header.jsx'
import Footer from './footer.jsx'

export default function Notice(){
    return (
        <div>
            <Header/>
            <div id="a-propos">
                <h3>NOTICE D'UTILISATION</h3>
                <p>
                    Quand tu lances <i>Sans Rancune</i>, prépare-toi : ton clavier et ta souris vont devenir tes meilleurs alliés ! 🕵️‍♂️
                    <br /><br />
                    ➔ Sois rapide sur les QTE (Quick Time Events) pour réagir en temps réel.  
                    ➔ Fais les bons choix pour guider l’histoire selon ta logique d’enquêteur.  
                    <br /><br />
                    Tu es LE commissaire : chaque décision compte, chaque erreur peut changer l’issue du meurtre... Alors ouvre l'œil et reste vif ! 👀  
                    <br /><br />
                    Petit bonus motivant : à la fin, on t'affiche tes statistiques. Sauras-tu résoudre l’affaire comme un(e) pro ?
                </p>
            </div>
            <Footer/>
        </div>
    );
}