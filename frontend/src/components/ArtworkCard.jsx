import { Link } from "react-router-dom"
import './ArtworkCard.css'

export default function ArtworkCard({ artwork }) {
  return (
    <Link to={"/"} style={{ textDecoration: "none" }}>
      <div className="artwork-card">
        <img src={artwork.image} alt={artwork.title} />
        <h3>{artwork.title}</h3>
      </div>
    </Link>
  )
}

