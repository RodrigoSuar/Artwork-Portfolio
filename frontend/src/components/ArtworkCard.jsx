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

export default function ArtworkCard({ artwork, variant = "card" }) {
  if (variant === "grid") {
    return (
      <div className="artwork-grid-box">
        <img src={artwork.image} alt={sanitizeForHtml(artwork.title)} loading="lazy" />
      </div>
    )
  }

  return (
    <Link to={"/"} style={{ textDecoration: "none" }}>
      <div className="artwork-card">
        <div className="artwork-card-frame">
          <img src={artwork.image} alt={sanitizeForHtml(artwork.title)} />
        </div>
        <h3>{artwork.title}</h3>
      </div>
    </Link>
  )
}

