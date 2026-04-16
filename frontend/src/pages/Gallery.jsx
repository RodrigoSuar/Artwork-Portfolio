import ArtworkCard from "../components/ArtworkCard"
import { useEffect, useState } from "react"
import artworkService from '../services/artwork'
import Pagination from "../components/Pagination"
import './Gallery.css'

export default function Gallery() {
  const [artworks, setArtworks] = useState([])
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(20)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setLoading(true)

    artworkService.getAll(page, limit)
      .then(data => {
        setArtworks(data.artworks)
        setTotal(data.total)
        setLoading(false)
      })
  }, [page, limit])

  const totalPages = Math.ceil(total / limit)

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
        <>
          <Pagination
            page={page}
            totalPages={totalPages}
            total={total}
            limit={limit}
            setPage={setPage}
            setLimit={setLimit}
          />

          <div className="gallery">
            {artworks.map((art) => (
              <ArtworkCard key={art.id} artwork={art} />
            ))}
          </div>

          <Pagination
            page={page}
            totalPages={totalPages}
            total={total}
            limit={limit}
            setPage={setPage}
            setLimit={setLimit}
          />
        </>
      )}
    </div>
  )
}