import API from './axios.config'

const service = {
  getMedicalRecordsbyPetId: (params) => {
    const url = '/services/getMedicalRecordsbyPetId'
    return API.get(url, { params })
  },
 
}

export default service
