import API from "api/axios.config";
const beautyService = {
    getAllBeautyService: () => {
      const url = '/services/getAllBeautybyUser_ID'
      return API.get(url)
    },
    
    createBeautyService: (body) => {
      console.log(body)
      const url = '/services/createBeauty'
      return API.post(url, body)
    },
    
    updateBeautyService: (body) => {
      const url = '/services/updateBeauty'
      return API.put(url, body)
    },
    
    deleteBeautyService: (body) => {
      const url = '/services/deleteBeauty'
      return API.delete(url, { data: body })
    },

    updateBeautyStatus: (status) => {
      const url = '/services/updateBeautyStatus'
      return API.put(url, status)
    }
}
export default beautyService