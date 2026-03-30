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
export default {
    getAll,
    create,
    remove,
    update
}