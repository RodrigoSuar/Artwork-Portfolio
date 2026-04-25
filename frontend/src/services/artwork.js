import axios from 'axios'
const baseUrl = `/api/artwork`


const getAll = (page, limit) => {
  const request = axios.get(`${baseUrl}`, {
    params: { page, limit }
  });

  return request.then((response) => response.data);
};



export default {
    getAll,
    
}