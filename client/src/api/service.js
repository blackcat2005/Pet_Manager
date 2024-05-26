import API from './axios.config'

const service = {
  getMedicalRecordsbyPetId: (pet_id) => {
    const url = '/services/getMedicalRecordsbyPetId'
    return API.get(url, pet_id)
  },
 
}

export default service
