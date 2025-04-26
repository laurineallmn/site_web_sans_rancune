import './Apropos.css'
import Header from './header.jsx'
import Footer from './footer.jsx'

export default function Apropos(){
    return (
        <div>
            <Header/>
            <div id="a-propos">
                <h3>A Propos</h3>
                <p>
                    Sans Rancune <span>courtt-metrage</span> interactif.
                </p>
            </div>
            <Footer/>
        </div>
    );
}