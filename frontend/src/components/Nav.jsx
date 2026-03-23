import { Link } from "react-router-dom"
const Nav = () => {

    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/Gallery">Gallery</Link>
            <Link to="/Contact">Contact</Link>
        </nav>
    )


}

export default Nav