import './Contact.css'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

export default function Contact(){
    return (
        <div>
            <Header/>
            <div id="contact">
                <h2>CONTACT</h2>
                <div className="ligne">
                    <h5>SOCIAL MEDIA</h5>
                    <p>INSTAGRAM : <b>sansrancune</b></p>
                    <p>TIKTOK : <b>sansrancune.officiel</b> </p>
                    <p>X : <b>sans_rancune_off</b></p>
                </div>
                <div className="ligne">
                    <h5>EMAIL</h5>
                    <p>contact@sans-rancune.fr </p>
                </div>
                <div className="ligne">
                    <h5>ADDRESSE</h5>
                    <p>N Crescent Heights Blvd, Los Angeles, CA 90046, United States </p>
                </div>
            </div>
            <Footer/>
        </div>
    );
}