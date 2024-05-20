const { ErrorHandler } = require('../helpers/error')
const {
  createStorageServicedb,
  createBeautyServicedb,
  createBeautyOrderdb,
  getAllStorageServiceDB,
  getStorageServicebyIDdb,
  getStorageServicebyUser_IDdb,
  deleteStorageServicedb,
  updateStorageServicedb,
  createStorage_Orderdb,
} = require('../db/servicePet.db')

class ServiceService {

  createStorageService = async (StorageService) => {
    try {
      return await createStorageServicedb(StorageService);
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(error.statusCode, 'createStorageService False')
    }
  }

  createStorageOrder = async (StorageOrder) => {
    try {
      return await createStorage_Orderdb(StorageOrder);
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
  updateBeautyService = async (BeautyService) => {
    try {
      console.log(BeautyService);
      return await updateStorageServicedb(BeautyService)
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(error.statusCode, 'updateBeautyService False')
    }
  }

  createTimeSlot = async (TimeSlot) => {
    try {
      console.log(TimeSlot)
      return await createTimeSlotdb(TimeSlot)
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(error.statusCode, 'createTimeslot False')
    }
  }

  createBeautyService = async (BeautyService) => {
    try {
      console.log(BeautyService)
      return await createBeautyServicedb(BeautyService)
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(error.statusCode, 'createBeautyServicedb False')
    }
  }

  createBeautyServiceRegistation = async (BeautyServiceRegistation) => {
    try {
      console.log(BeautyServiceRegistation)
      return await createBeautyServiceRegistationdb(BeautyServiceRegistation)
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(
        error.statusCode,
        'createBeautyServiceRegistationdb False',
      )
    }
  }

  createBeautyOrder = async (BeautyOrder) => {
    try {
      console.log(BeautyOrder)
      return await createBeautyOrderdb(BeautyOrder)
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(error.statusCode, 'createBeautyOrderdb False')
    }
  }
  getAllBeautyService = async () => {
    try {
      return await getAllBeautyServicedb()
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(error.statusCode, 'getAllBeautyService False')
    }
  }
  getBeautyServicebyID = async (service_id) => {
    try {
      return await getBeautyServicebyIDdb(service_id)
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(error.statusCode, 'getBeautyServicebyIDdb Flase')
    }
  }
  getBeautyServicebyUser_ID = async (user_id) => {
    try {
      return await getBeautyServicebyUser_IDdb(user_id)
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(
        error.statusCode,
        ' getBeautyServicebyUser_ID False',
      )
    }
  }
  deleteBeautyService = async (service_id) => {
    try {
      return await deleteBeautyServicedb(service_id)
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(error.statusCode, 'deletaBeautyService False')
    }
  }
}

module.exports = new ServiceService()
