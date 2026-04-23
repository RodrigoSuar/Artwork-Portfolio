import { Link } from "react-router-dom"
import './ArtworkCard.css'

// Sanitize text to prevent XSS in HTML attributes
const sanitizeForHtml = (text) => {
  if (!text) return ""
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
}

export default function ArtworkCard({ artwork }) {
  return (
    <Link to={"/"} style={{ textDecoration: "none" }}>
      <div className="artwork-card">
        <img src={artwork.image} alt={sanitizeForHtml(artwork.title)} />
        <h3>{artwork.title}</h3>
      </div>
    </Link>
  )
}

