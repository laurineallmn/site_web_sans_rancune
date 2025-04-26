
import './Header.css'
import { Link } from 'react-router-dom'

export default function Header(){
    return (
        <div id="navbar">
            <Link to="/"><h1>SANS RANCUNE</h1></Link>
            {/* <Link to="/"><h3>HOME</h3></Link> */}
            <Link to="/a-propos"><h3>A PROPOS</h3></Link>
            <Link to="/contact"><h3>CONTACT</h3></Link>   
        </div>
    );
}