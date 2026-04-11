import { Link } from "react-router-dom"
import './Home.css'

const Home = () => {
    return (
        <div className="hero">
            <h1>Welcome to My Art Portfolio</h1>
            <p>Explore a curated collection of contemporary artwork and creative expressions</p>
            <Link to="/Gallery">
                <button style={{ marginTop: "1rem" }}>View Gallery</button>
            </Link>
        </div>
    )
}

export default Home