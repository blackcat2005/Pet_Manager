import API from './axios.config'

const service = {
  getMedicalRecordsbyPetId: (params) => {
    const url = '/services/getMedicalRecordsbyPetId'
    return API.get(url, { params })
  },
  getTimePrice: () => {
    const url = '/services/allPrice'
    return API.get(url)
  },
  createAppointment: (body) => {
    const url = `/services/appointment/CreateAppointment`
    return API.post(url, body)
  },
  createStorage: (body) => {
    const url = `/services/CreateStorageService`
    return API.post(url, body)
  },
  createBeauty: (body) => {
    const url = `/services/createBeauty`
    return API.post(url, body)
  },
}

export default service
