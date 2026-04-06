import axios from 'axios'
const baseUrl = '/api/artwork'

const getAll = () => {
    const request = axios.get(baseUrl)
    
    return request.then((response) => response.data)
}

const create = (newObject) => {
    const request = axios.post(baseUrl,newObject)
    return request.then((response) => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then((response) => response.data)
}

const update =  async (id, newObject) => {
    try{
        const request = await axios.put(`${baseUrl}/${id}`,newObject)
        return request.data
    } catch (error) {
        console.error("Error udpating:", error)
        throw error
    }
}
const createURL =  async (file) => {
    try{
        if(!file){
            return "error no file entered"
        }

        const request = await axios.get(`${baseUrl}/upload-url/image?type=${encodeURIComponent(file.type)}`)
        //console.log(request.data)
        return request.data
    } catch (error) {
        console.log(error)
    }   
}


const uploadFile = async (file,url) => {
    try{
        //console.log(url)
        await axios.put(url,file, {
            headers:{
                "Content-Type": file.type
            }
        })

        
    } catch (error){
        console.error(error)
    }
}



export default {
    getAll,
    create,
    remove,
    update,
    createURL,
    uploadFile
}