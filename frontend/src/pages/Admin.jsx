import { useState } from "react"
import artworkService from '../services/artwork'
import { useEffect } from "react"
import EditBox from "../components/EditBox"
import adminService from '../services/admin'

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
    //const [admin,setAdmin] = useState(null)
    const [isPopUp, setIsPopUp] = useState(false)
    const [newTitle,setNewTitle] = useState('')
    const [id, setId] = useState("")

    const [imageFile,setImageFile] = useState(null)

    useEffect(() => {
        artworkService.getAll()
            .then(data => setArtworks(data))
        
        const loggedUserJSON = window.localStorage.getItem('loggedAdmin')

        if(loggedUserJSON){
            const admin = JSON.parse(loggedUserJSON)
            //setAdmin(admin)
            adminService.setToken(admin.token)
        }
        
    },[])
    
    
    const addArtwork = async (event) => {
         event.preventDefault()


         const urls = await adminService.createURL(imageFile)

         console.log(urls)

        await adminService.uploadFile(imageFile,urls.uploadURL)

         const artworkObject = {
            title: newArtwork.title,
            image: urls.fileUrl,
            description: newArtwork.description,
            key: urls.key
         }

         //console.log(artworkObject)
         adminService.create(artworkObject).then((returnedArtworkObject) =>{
            setNewArtwork({
                title: '',
                image: '',
                description:'',
                year: '',
                id: '',
                key: '',
            })
             setArtworks([...artwork,returnedArtworkObject])

           
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
        adminService.remove(id).then(() => {
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

        adminService
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
                <label>Photo title</label>
                <input 
                    name='title' 
                    value ={newArtwork.title} 
                    onChange={handleArtworkChange} 
                    required
                />

                <label>Photo description</label>
                <input 
                    name = 'description' 
                    value = {newArtwork.description} 
                    onChange={handleArtworkChange} 
                    required/>

                <label>Upload photo</label>
                <input 
                    type="file" 
                    name="image"
                    onChange={handleFileChange}
                    required
                    />


                <button type="submit">save</button>
            </form>

            

            <div className="gallery">
                {artwork.map(art =>(
                    <div key={art.id} className="artwork-card">
                        <img src={art.image} alt={art.title} />
                        <h3>{art.title}</h3>
                        <p>{`${art.description}`}</p>
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