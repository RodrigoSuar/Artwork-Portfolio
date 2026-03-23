
const EditBox = (props) => {

    return (
        <>
            <div className="edit-box">
                <div className="edit-box-content">
                    <form onSubmit={(event) => props.update(event)}>
                        <label className="edit-box-header">Enter new Title</label>
                        <input type="text" value={props.title} onChange={(event) => props.handleTitleChange(event)}/>
                        <button onClick={() => props.setIsPopUp(false)}>Cancel</button>
                        <button>Save</button>
                    </form>
                </div>

            </div>
        </>
    )
}   

export default EditBox