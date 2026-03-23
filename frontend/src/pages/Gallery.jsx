import ArtworkCard from "../components/ArtworkCard"
import { useEffect, useState } from "react"
import artworkService from '../services/artwork'

export default function Gallery() {
  const [artworks,setartworks] = useState([]);

  useEffect(() => {
    artworkService.getAll().then(art => {
      setartworks(art)
    })
  },[])
  return (
    <>

    
    <div className="gallery">


      {artworks.map((art) => (
        <ArtworkCard key={art.id} artwork={art} />
      ))}

    </div>

    </>
  )
}