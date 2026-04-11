import './EditBox.css'

const EditBox = (props) => {
    return (
        <div className="edit-box">
            <div className="edit-box-content">
                <h3 className="edit-box-header">Edit Artwork Title</h3>
                <form onSubmit={(event) => props.update(event)}>
                    <div className="form-group">
                        <label>New Title</label>
                        <input 
                            type="text" 
                            value={props.title} 
                            onChange={(event) => props.handleTitleChange(event)}
                            placeholder="Enter new title"
                            required
                        />
                    </div>
                    <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
                        <button 
                            type="button" 
                            className="secondary"
                            onClick={() => props.setIsPopUp(false)}
                        >
                            Cancel
                        </button>
                        <button type="submit">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    )
}   

export default EditBox