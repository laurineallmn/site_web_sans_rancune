
import './Header.css'
import { Link } from 'react-router-dom'

export default function Header(){
    return (
        <div id="navbar">
            <Link to="/"><h1>SANS RANCUNE</h1></Link>
            {/* <Link to="/"><h3>HOME</h3></Link> */}
            <Link to="/notice"><h3>NOTICE</h3></Link>
            <Link to="/a-propos"><h3>A PROPOS</h3></Link>
            <Link to="/contact"><h3>CONTACT</h3></Link>   
            {/* <Link to="/playing"><h3 style="background-color: #669BBC;">JOUER</h3></Link> */}
            <Link to="/playing"><h3 id="jouer-button">JOUER</h3></Link>   
            {/* <Link to="/playing"><h3 style={{backgroundColor: '#669BBC'}}>JOUER</h3></Link>    */}
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