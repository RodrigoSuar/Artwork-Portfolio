import ArtworkCard from "../components/ArtworkCard"
import { useEffect, useState } from "react"
import artworkService from '../services/artwork'
import './Gallery.css'

export default function Gallery() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    artworkService.getAll().then(art => {
      setArtworks(art)
      setLoading(false)
    })
  },[])

  return (
    <div style={{ animation: "fadeIn 0.5s ease-in" }}>
      <div className="gallery-header">
        <h1>Gallery</h1>
        <p>Explore my latest works and creative projects</p>
      </div>

      {loading ? (
        <div className="gallery-loading">
          <p>Loading artworks...</p>
        </div>
      ) : artworks.length === 0 ? (
        <div className="gallery-empty">
          <p>No artworks available yet</p>
        </div>
      ) : (
        <div className="gallery">
          {artworks.map((art) => (
            <ArtworkCard key={art.id} artwork={art} />
          ))}
        </div>
      )}
    </div>
  )
}