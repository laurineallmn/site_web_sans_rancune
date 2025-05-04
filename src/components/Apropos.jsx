import './Apropos.css'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

export default function Apropos(){
    return (
        <div>
            <Header/>
            <div id="a-propos">
            <h3>À PROPOS</h3>
                <p>
                    <i>Sans Rancune</i> est un court-métrage interactif policier en vue à la première personne.  
                    <br /><br />
                    Réalisé dans le cadre d’un projet étudiant à l’<a href="https://www.ingenieur-imac.fr/" target="_blank" rel="noopener noreferrer" color="#4B5D75"><b>IMAC</b></a>, une formation unique mêlant ingénierie, arts et communication visuelle.  
                    <br /><br />
                    Dans cette expérience, tu incarnes un jeune commissaire chargé d’élucider une mystérieuse affaire de meurtre. Tes choix détermineront la suite… et ta réussite !
                </p>

                <h4>Crédits</h4>
                <ul>
                    <li>Réalisateurs : Théo BONNOT et Nolan BOURREL</li>
                    <li>Acteurs : Jean LE CHAUDELEC, Vanessa BONNEAU, Laura GASQUEZ, Antoine LOUBEZ, Milo TURINES, Geoffray ODOT</li>
                    <li>Scénario : Théo BONNOT et Jean LE CHAUDELEC </li>
                    <li>Montage : Laurine ALLEMON, Théo BONNOT, Nolan BOURREL, Jean LE CHAUDELEC</li>
                    <li>Maquillage : Sarah Beaujaut</li>
                    {/* <li>Musique : </li> */}
                    {/* <li>Effets spéciaux : </li> */}
                    <li>Merci spécial à l'IMAC et Léon GOMEZ notre incroyable tuteur !</li>
                </ul>

                <p style={{ marginTop: '50px' }}>
                    Merci à toutes celles et ceux qui ont contribué à rendre cette aventure possible. Et merci à vous de nous soutenir ❤️
                </p>
            </div>
            <section className="notre-equipe">
    <h4>Notre équipe</h4>
    <div className="equipe-grid">
    <div className="membre">
            <img src="/assets/laurine.jpg" alt="Laurine Allemon" />
            <p>Laurine ALLEMON<br /><span> Cheffe Opératrice & Monteuse</span></p>
        </div>
        <div className="membre">
            <img src="/assets/théo.jpg" alt="Théo Bonnot" />
            <p>Théo BONNOT<br /><span>Réalisateur & Scénariste</span></p>
        </div>
        <div className="membre">
            <img src="/assets/nolan.jpg" alt="Nolan Bourrel" />
            <p>Nolan BOURREL<br /><span>Réalisateur & Ingénieur du son</span></p>
        </div>
        <div className="membre">
            <img src="/assets/jean.jpg" alt="Jean Le Chaudelec" />
            <p>Jean LE CHAUDELEC<br /><span>Scénariste & Acteur</span></p>
        </div>
    </div>
</section>
            <Footer/>
        </div>
    );
}