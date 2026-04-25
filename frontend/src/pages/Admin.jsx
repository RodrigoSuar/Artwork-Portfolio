import { useState, useRef, useEffect } from "react"
import { Navigate } from "react-router-dom"
import { useQuery, useQueryClient } from "@tanstack/react-query"

import artworkService from "../services/artwork"
import EditBox from "../components/EditBox"
import adminService from "../services/admin"
import Pagination from "../components/Pagination"
import "./Admin.css"

// Check if JWT token is expired
const isTokenExpired = (token) => {
    try {
        const base64Url = token.split(".")[1]
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join("")
        )
        const { exp } = JSON.parse(jsonPayload)
        return exp * 1000 < Date.now()
    } catch {
        return true
    }
}

const Admin = () => {
    const queryClient = useQueryClient()

    const [newArtwork, setNewArtwork] = useState({
        title: "",
        image: "",
        id: "",
        description: "",
        year: "",
        key: "",
    })

    const [isPopUp, setIsPopUp] = useState(false)
    const [newTitle, setNewTitle] = useState("")
    const [id, setId] = useState("")
    const [imageFile, setImageFile] = useState(null)
    const [uploadSuccess, setUploadSuccess] = useState(false)

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)

    const fileInputRef = useRef(null)

    // ---------- AUTH CHECK ----------
    const loggedUserJSON = window.localStorage.getItem("loggedAdmin")
    const admin = loggedUserJSON ? JSON.parse(loggedUserJSON) : null

    const tokenInvalid = !admin?.token || isTokenExpired(admin.token)

    useEffect(() => {
        const token = admin?.token

        if (token && !tokenInvalid) {
            adminService.setToken(token)
        }
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // ---------- REACT QUERY ----------
    const { data, isLoading } = useQuery({
        queryKey: ["admin-artworks", page, limit],
        queryFn: () => artworkService.getAll(page, limit),
        enabled: !!admin && !tokenInvalid, // only run if logged in
        keepPreviousData: true,
    })

    const artworks = data?.artworks || []
    const total = data?.total || 0
    const totalPages = Math.ceil(total / limit)

    // ---------- ADD ----------
    const addArtwork = async (event) => {
        try{

            event.preventDefault()

        const urls = await adminService.createURL(imageFile)
        await adminService.uploadFile(imageFile, urls.uploadURL)

        const artworkObject = {
            title: newArtwork.title,
            
            description: newArtwork.description,
            key: urls.key,
        }

        await adminService.create(artworkObject)

        setNewArtwork({
            title: "",
            image: "",
            description: "",
            year: "",
            id: "",
            key: "",
        })

        setImageFile(null)
        fileInputRef.current.value = ""

        setUploadSuccess(true)
        setTimeout(() => setUploadSuccess(false), 3000)

        // 🔥 refresh list automatically
        queryClient.invalidateQueries({
            queryKey: ["admin-artworks"],
        })
        } catch (error){
            console.error(error)
        }
        
    }

    // ---------- DELETE ----------
    const deleteArtwork = async (id) => {
        if (!window.confirm("Are you sure?")) return

        await adminService.remove(id)

        queryClient.invalidateQueries({
            queryKey: ["admin-artworks"],
        })
    }

    // ---------- UPDATE ----------
    const update = async (event) => {
        event.preventDefault()
        setIsPopUp(false)

        const art = artworks.find((n) => n.id === id)
        const updatedArt = { ...art, title: newTitle }

        await adminService.update(id, updatedArt)

        queryClient.invalidateQueries({
            queryKey: ["admin-artworks"],
        })
    }

    const handleUpdate = (id) => {
        setIsPopUp(true)
        setId(id)
    }

    const handleTitleChange = (e) => setNewTitle(e.target.value)

    // ---------- AUTH GUARD ----------
    if (!admin || tokenInvalid) {
        return <Navigate to="/admin/login" />
    }

    return (
        <div className="adminPage">
            <h2>Admin Dashboard</h2>

            {uploadSuccess && (
                <div className="success">Artwork uploaded successfully!</div>
            )}

            <form onSubmit={addArtwork} className="addImage">
                <h3>Add New Artwork</h3>
                <div className="form-group">
                    <input
                        name="title"
                        value={newArtwork.title}
                        onChange={(e) =>
                            setNewArtwork({ ...newArtwork, title: e.target.value })
                        }
                        required
                    />
                </div>

                <div className="form-group">
                    <textarea
                        name="description"
                        value={newArtwork.description}
                        onChange={(e) =>
                            setNewArtwork({
                                ...newArtwork,
                                description: e.target.value,
                            })
                        }
                        required
                    />
                </div>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => setImageFile(e.target.files[0])}
                    required
                />
                {imageFile && (
                        <p className="file-selected-text">
                            Selected: {imageFile.name}
                        </p>
                    )}

                <button type="submit">Upload Artwork</button>
            </form>


            <h3>Your Artworks</h3>
            <p>Total: {total}</p>

            <Pagination
                page={page}
                totalPages={totalPages}
                total={total}
                limit={limit}
                setPage={setPage}
                setLimit={setLimit}
            />

            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className="gallery">
                    {artworks.map((art) => (
                        <div key={art.id} className="artwork-card">
                            <img src={art.image} alt={art.title} />
                            <h3>{art.title}</h3>
                            <p>{art.description}</p>

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
                    ))}
                </div>
            )}

            <Pagination
                page={page}
                totalPages={totalPages}
                total={total}
                limit={limit}
                setPage={setPage}
                setLimit={setLimit}
            />

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