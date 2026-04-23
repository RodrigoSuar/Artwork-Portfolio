import axios from 'axios'
const baseUrl = `${import.meta.env.VITE_API_URL}/api/admin`

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

// Handle 401 responses by clearing storage and redirecting to login
const handleAuthError = () => {
    window.localStorage.removeItem('loggedAdmin')
    token = null
    window.location.href = '/admin/login'
}

// Add response interceptor to catch 401 errors
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            handleAuthError()
        }
        return Promise.reject(error)
    }
)



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
        const config = {
            headers: {Authorization:token}
        }
        const request = await axios.put(`${baseUrl}/${id}`,newObject,config)
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