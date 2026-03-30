import { useState } from "react"
import artworkService from '../services/artwork'
import { useEffect } from "react"
import EditBox from "../components/EditBox"

const Admin = () => {
    const [newArtwork, setNewArtwork] = useState({
        title: '',
        image: '',
        id: ''
    })
    const [artwork,setArtworks] = useState([])

    const [isPopUp, setIsPopUp] = useState(false)
    const [newTitle,setNewTitle] = useState('')
    const [id, setId] = useState("")
    useEffect(() => {
        artworkService.getAll()
            .then(data => setArtworks(data))
        
    },[])
    
    
    const addArtwork = event => {
         event.preventDefault()
         const artworkObject = {
            title: newArtwork.title,
            image: newArtwork.image
         }

         artworkService.create(artworkObject).then((returnedArtworkObject) =>{
            setNewArtwork({
                title: '',
                image: ''
            })
             setArtworks([...artwork,returnedArtworkObject])

           
         })
    }

    const handleArtworkTitleChange = (event) => {
        setNewArtwork({
            ...newArtwork,
            title:event.target.value
        })
    }

    const handleArtworkImageChange = (event) => {
        setNewArtwork({
            ...newArtwork,
            image:event.target.value
        })
    }

    const deleteArtwork = (id) => {
        artworkService.remove(id).then(() => {
            setArtworks(artwork.filter(a => a.id !== id))
        })
    }
    

    const handleUpdate = (id) => {
        setIsPopUp(true)
        setId(id)
    }

    const update = (event) => {
        event.preventDefault()
        setIsPopUp(false)
        const art = artwork.find(n => n.id === id)
        const updatedArt = {...art,title:newTitle}

        artworkService
        .update(id,updatedArt)
        .then(returnedArtwork => {
            setArtworks(artwork.map(n => (n.id !== id ? n : returnedArtwork)))
        })
        .catch(() => {
            setArtworks(artwork.filter(n => n.id !== id))
        })
    }

    const handleTitleChange = (event) => {
        setNewTitle(event.target.value)
    }
    

    return (
        <div className="adminPage">
            welcome to admin pages

            <form onSubmit={addArtwork} className="addImage">
                <input value ={newArtwork.title} onChange={handleArtworkTitleChange} required/>
                <input value = {newArtwork.image} onChange={handleArtworkImageChange} required/>
                <button type="submit">save</button>
            </form>

            <div className="gallery">
                {artwork.map(art =>(
                    <div key={art.id} className="artwork-card">
                        <img src={art.image} alt={art.title} />
                        <h3>{art.title}</h3>
                        <button onClick={() => deleteArtwork(art.id)}>Delete</button>
                        <button onClick={() => handleUpdate(art.id)}>Update</button>
                    </div>
                ))}

            </div>

            {isPopUp && (
                <EditBox
                title={newTitle}
                setIsPopUp={setIsPopUp}
                handleTitleChange={handleTitleChange}
                update={update}
                />
            )}



        </div>
    )
}

export default Admin