import './Contact.css'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

export default function Contact(){
    const address="5 boulevard Descartes, Champs-sur-Marne, 77454 Marne-la-Vallée"
    return (
        <div>
            <Header/>
            <div id="contact">
                <h2>CONTACT</h2>
                <div className="ligne">
                    {/* <h5>SOCIAL MEDIA</h5> */}
                    <div className="logo-text-line">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <img src="../../assets/logo/instagram-logo.png" alt="instagram"/>
                        </a>
                        <p><b>sansrancune</b></p>
                    </div>
                    <div className="logo-text-line">
                        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                            <img src="../../assets/logo/tiktok-logo.png" alt="tiktok"/>
                        </a>
                        <p><b>sansrancune.officiel</b> </p>
                    </div>
                    <div className="logo-text-line">
                        <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                            <img src="../../assets/logo/x-logo.png" alt="x"/>
                        </a>
                        <p><b>sans_rancune_off</b></p>
                    </div>
                </div>
                {/* <h5>EMAIL</h5> */}
                <div className="ligne">
                    <div className="logo-text-line">
                        <a href="mailto:contact@sans-rancune.fr">
                            <img src="../../assets/logo/email-logo.png" alt="email" />
                        </a>
                        <p>contact@sans-rancune.fr </p>
                    </div>  
                </div>
                {/* <h5>ADDRESS</h5> */}
                <div className="ligne">
                    <div className="logo-text-line">
                        <a href={`https://maps.google.com/maps?q=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer">
                            <img src="../../assets/logo/adresse-logo.png" alt="adresse" />
                        </a>
                        <p>5 boulevard Descartes, Champs-sur-Marne, 77454 Marne-la-Vallée cedex 2</p>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}