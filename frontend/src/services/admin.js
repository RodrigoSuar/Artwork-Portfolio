import axios from 'axios'
const baseUrl = '/api/admin'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}



const create = async (newObject) => {
    const config = {
         headers : {Authorization: token}
    }
    const response = await axios.post(baseUrl,newObject,config)
    return response.data
}

const remove = async (id) => {
    const config = {
         headers : {Authorization: token}
    }
    const response = await axios.delete(`${baseUrl}/${id}`,config)
    return response.data
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
        
        const config = {
         headers : {Authorization: token}
        }
        
        if(!file){
            return "error no file entered"
        }

        const response = await axios.get(`${baseUrl}/upload-url/image?type=${encodeURIComponent(file.type)}`,config)
        //console.log(request.data)
        return response.data
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
    create,
    remove,
    update,
    createURL,
    uploadFile,
    setToken
}