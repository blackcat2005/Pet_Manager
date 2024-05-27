import API from './axios.config'

const service = {
  getMedicalRecordsbyPetId: (params) => {
    const url = '/services/getMedicalRecordsbyPetId'
    return API.get(url, { params })
  },
  updateMedicalRecordsbyPetId: (body) => {
    const url = '/services/appointment/updateMedicalRecord'
    return API.put(url,  body)
  },
  getAllServiceByUserId: () => {
    const url = '/services/detailPet'
    return API.get(url)
  }
}

export default service
