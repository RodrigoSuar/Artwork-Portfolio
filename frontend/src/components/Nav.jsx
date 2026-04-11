import { Link } from "react-router-dom"
import './Nav.css'

const Nav = () => {
    return (
        <nav>
            <Link to="/" className="nav-brand">🎨 ArtGallery</Link>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/Gallery">Gallery</Link>
                <Link to="/Contact">Contact</Link>
            </div>
        </nav>
    )
}

export default Nav