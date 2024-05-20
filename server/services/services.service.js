const { ErrorHandler } = require('../helpers/error')
const {
  createStorageServicedb,
  getAllStorageServiceDB,
  getStorageServicebyIDdb,
  getStorageServicebyUser_IDdb,
  deleteStorageServicedb,
  updateStorageServicedb,
  createStorage_Orderdb,
  updateStorageServiceStatusdb,
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
  updateStorageServiceStatus = async(StorageServiceStatus) => {
    try {
      return await updateStorageServiceStatusdb(StorageServiceStatus)
    } catch (error) {
      console.log(error);
      throw new ErrorHandler(error.statusCode, 'updateStorageServiceStatus False');
    }
  }
}

module.exports = new ServiceService()
