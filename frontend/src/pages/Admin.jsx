import { useState } from "react"
import artworkService from '../services/artwork'
import { useEffect } from "react"
import EditBox from "../components/EditBox"
import adminService from '../services/admin'
import './Admin.css'

const Admin = () => {
    const [newArtwork, setNewArtwork] = useState({
        title: '',
        image: '',
        id: '',
        description: '',
        year: '',
        key: '',
    })
    const [artwork,setArtworks] = useState([])
    const [isPopUp, setIsPopUp] = useState(false)
    const [newTitle,setNewTitle] = useState('')
    const [id, setId] = useState("")
    const [imageFile,setImageFile] = useState(null)
    const [uploadSuccess, setUploadSuccess] = useState(false)

    useEffect(() => {
        artworkService.getAll()
            .then(data => setArtworks(data))
        
        const loggedUserJSON = window.localStorage.getItem('loggedAdmin')

        if(loggedUserJSON){
            const admin = JSON.parse(loggedUserJSON)
            adminService.setToken(admin.token)
        }
        
    },[])
    
    
    const addArtwork = async (event) => {
         event.preventDefault()

         const urls = await adminService.createURL(imageFile)
         await adminService.uploadFile(imageFile,urls.uploadURL)

         const artworkObject = {
            title: newArtwork.title,
            image: urls.fileUrl,
            description: newArtwork.description,
            key: urls.key
         }

         adminService.create(artworkObject).then((returnedArtworkObject) =>{
            setNewArtwork({
                title: '',
                image: '',
                description:'',
                year: '',
                id: '',
                key: '',
            })
            setImageFile(null)
            setArtworks([...artwork,returnedArtworkObject])
            setUploadSuccess(true)
            setTimeout(() => setUploadSuccess(false), 3000)
         })
    }

    const handleArtworkChange = (event) => { 
        const {name,value} = event.target 
        setNewArtwork({ 
            ...newArtwork,
             [name]:value 
            })
    }

    const handleFileChange = (event) => {
        const file = event.target.files?.[0]

        if(!file) return 

        if(!file.type.startsWith("image/")){
            alert("Please upload an image file")
            return;
        }
        
        setImageFile(file)
    }

    const deleteArtwork = (id) => {
        if(window.confirm("Are you sure you want to delete this artwork?")) {
            adminService.remove(id).then(() => {
                setArtworks(artwork.filter(a => a.id !== id))
            })
        }
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

        adminService
        .update(id,updatedArt)
        .then(returnedArtwork => {
            setArtworks(artwork.map(n => (n.id !== id ? n : returnedArtwork)))
        })
    }

    const handleTitleChange = (event) => {
        setNewTitle(event.target.value)
    }

    return (
        <div className="adminPage">
            <h2>Admin Dashboard</h2>
            <p>Manage your artwork collection</p>

            {uploadSuccess && <div className="success">Artwork uploaded successfully!</div>}

            <form onSubmit={addArtwork} className="addImage">
                <h3>Add New Artwork</h3>
                
                <div className="form-group">
                    <label>Photo Title</label>
                    <input 
                        name='title' 
                        value ={newArtwork.title} 
                        onChange={handleArtworkChange}
                        placeholder="Enter artwork title"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="description" 
                        value={newArtwork.description} 
                        onChange={handleArtworkChange}
                        placeholder="Describe your artwork"
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <label>Upload Image</label>
                    <input 
                        type="file" 
                        name="image"
                        onChange={handleFileChange}
                        required
                    />
                    {imageFile && <p className="file-selected-text">Selected: {imageFile.name}</p>}
                </div>

                <button type="submit">Upload Artwork</button>
            </form>

            <div>
                <h3>Your Artworks</h3>
                <p className="artwork-count">Total artworks: {artwork.length}</p>
                
                <div className="gallery">
                    {artwork.map(art =>(
                        <div key={art.id} className="artwork-card">
                            <img src={art.image} alt={art.title} />
                            <h3>{art.title}</h3>
                            <p>{art.description}</p>
                            <div className="button-group">
                                <button onClick={() => handleUpdate(art.id)}>
                                    Edit
                                </button>
                                <button 
                                    onClick={() => deleteArtwork(art.id)}
                                    className="danger"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
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