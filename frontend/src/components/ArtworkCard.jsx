import { Link } from "react-router-dom";

export default function ArtworkCard({ artwork }) {

  
  return (
    <>
    
    <Link to={"/"}>
      <div className="artwork-card">
        <img src={artwork.image} alt={artwork.title} />
        <h3>{artwork.title}</h3>
      </div>
    </Link> 
    </>
  )
}

