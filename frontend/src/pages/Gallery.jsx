import ArtworkCard from "../components/ArtworkCard"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import artworkService from "../services/artwork"
import Pagination from "../components/Pagination"
import "./Gallery.css"

export default function Gallery() {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(20)

  const { data, isLoading, isError } = useQuery({
    queryKey: ["artworks", page, limit],
    queryFn: () => artworkService.getAll(page, limit),
    keepPreviousData: true, // keeps old page visible while new one loads
  })

  const artworks = data?.artworks || []
  const total = data?.total || 0
  const totalPages = Math.ceil(total / limit)

  return (
    <div style={{ animation: "fadeIn 0.5s ease-in" }}>
      <div className="gallery-header">
        <h1>Gallery</h1>
        <p>Explore my latest works and creative projects</p>
      </div>

      {isLoading ? (
        <div className="gallery-loading">
          <p>Loading artworks...</p>
        </div>
      ) : isError ? (
        <div className="gallery-empty">
          <p>Failed to load artworks</p>
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