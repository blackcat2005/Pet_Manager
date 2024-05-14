import API from './axios.config'
const pet = {
  getPetList: () => {
    const url = '/pets/pet-list'
    return API.get(url)
  },
  getPetInfo: (pet_id, params) => {
    const url = `/pets/${pet_id}`
    return API.get(url, params)
  },
  
}

export default pet
