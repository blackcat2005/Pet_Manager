const { ErrorHandler } = require('../helpers/error')
const {
  createStorageServicedb,
  createStorage_Orderdb,
  getAllStorageServiceDB,
  getStorageServicebyIDdb,
  getStorageServicebyUser_IDdb,
  deleteStorageServicedb,
  updateStorageServicedb,
  updateStorageServiceStatusdb,

  createBeautydb,
  createBeautyOrderdb,
  getBeautysByDateAndTimeSlotdb,
  getBeautybyIDdb,
  getAllBeautybyUser_IDdb,
  deleteBeautydb,
  updateBeautydb,
  updateBeautyStatusdb,

  getDetailPetdb,
  getPetDetailbyUser_IDdb,
} = require('../db/servicePet.db')

class ServiceService {
  createStorageService = async (StorageService) => {
    try {
      return await createStorageServicedb(StorageService)
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(error.statusCode, 'createStorageService False')
    }
  }

  createStorageOrder = async (StorageOrder) => {
    try {
      return await createStorage_Orderdb(StorageOrder)
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(error.statusCode, 'createStorageOrderdb False')
    }
  }
  getAllStorageService = async () => {
    try {
      const d = await getAllStorageServiceDB()
      return d
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(error.statusCode, 'getAllStorageServicedb False')
    }
  }
  getStorageServicebyID = async (StorageServicebyID) => {
    try {
      const e = await getStorageServicebyIDdb(StorageServicebyID)
      return e
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(error.statusCode, 'getStorageServicebyIDdb False')
    }
  }

  getStorageServicebyUser_ID = async (StorageServicebyUser_ID) => {
    try {
      return await getStorageServicebyUser_IDdb(StorageServicebyUser_ID)
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(
        error.statusCode,
        'getStorageServicebyUser_IDdb False',
      )
    }
  }
  deleteStorageService = async (service_id) => {
    try {
      return await deleteStorageServicedb(service_id)
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(error.statusCode, 'deleteStorageService False')
    }
  }
  updateStorageService = async (updateService) => {
    try {
      return await updateStorageServicedb(updateService)
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(error.statusCode, 'updateStorageService False')
    }
  }
  updateStorageServiceStatus = async (StorageServiceStatus) => {
    try {
      return await updateStorageServiceStatusdb(StorageServiceStatus)
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(
        error.statusCode,
        'updateStorageServiceStatus False',
      )
    }
  }
  //Apointment

  createBeauty = async (beauty) => {
    try {
      return await createBeautydb(beauty)
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(error.statusCode, error.message)
    }
  }

  createBeautyOrder = async (beauty_order) => {
    try {
      return await createBeautyOrderdb(beauty_order)
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(error.statusCode, error.message)
    }
  }

  getBeautysByDateAndTimeSlot = async (date, time_slot) => {
    try {
      return await getBeautysByDateAndTimeSlotdb(date, time_slot)
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(error.statusCode, error.message)
    }
  }

  getAllBeautybyUser_ID = async (user_id, isAdmin) => {
    try {
      return await getAllBeautybyUser_IDdb(user_id, isAdmin)
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(error.statusCode, 'getAllBeautybyUser_ID False')
    }
  }

  getBeautybyID = async (id) => {
    try {
      return await getBeautybyIDdb(id)
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(error.statusCode, 'getBeautybyID False')
    }
  }

  deleteBeauty = async (id) => {
    try {
      return await deleteBeautydb(id)
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(error.statusCode, 'deleteBeauty False')
    }
  }

  updateBeauty = async (update_appointment) => {
    try {
      return await updateBeautydb(update_appointment)
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(error.statusCode, 'updateBeauty False')
    }
  }

  updateBeautyStatus = async (response) => {
    try {
      console.log(response)
      return await updateBeautyStatusdb(response)
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(error.statusCode, 'updateBeautyStatus False')
    }
  }
  getDetailPet = async (id) => {
    try {
      return await getDetailPetdb(id)
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(error.statusCode, 'getDetailPet False')
    }
  }

  getPetDetailbyUser_ID = async(id) => {
    try {
      return await getPetDetailbyUser_IDdb(id);
    } catch (error) {
      console.log(error);
      throw new ErrorHandler(error.statusCode, 'getPetDetailbyUser_ID False');
    }
  }
}

module.exports = new ServiceService()
