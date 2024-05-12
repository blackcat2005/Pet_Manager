const { ErrorHandler } = require('../helpers/error')
const {
  createStorageServicedb,
  createRoomInfodb,
  createStorageRegistationdb,
  createStorageOrderdb,
  createBeautyServicedb,
  createAppointmentdb,
  getAllStorageServicedb,
  getStorageServicebyIDdb,
  getStorageServicebyUser_IDdb,
  deleteStorageServicedb,
  updateStorageServicedb,
} = require('../db/servicePet.db')

class ServiceService {
  createRoomInfo = async (RoomInfo) => {
    try {
      return await createRoomInfodb(RoomInfo)
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message)
    }
  }
  createStorageService = async (StorageService) => {
    try {
      const a = await createStorageServicedb(StorageService)
      // console.log(a)
      return a
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(error.statusCode, 'createStorageService False')
    }
  }
  createStorageRegistation = async (StorageRegistation) => {
    try {
      const b = await createStorageRegistationdb(StorageRegistation)
      return b
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(error.statusCode, 'CreateStorageRegistation False')
    }
  }
  createStorageOrder = async (StorageOrder) => {
    try {
      const c = await createStorageOrderdb(StorageOrder)
      return c
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(error.statusCode, 'createStorageOrderdb False')
    }
  }
  getAllStorageService = async () => {
    try {
      const d = await getAllStorageServicedb()
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
      throw new ErrorHandler(error.statusCode, 'getStorageServicebyUser_IDdb False')
    }
  }
  deleteStorageService = async(service_id) => {
    try {
      return await deleteStorageServicedb(service_id);
    } catch (error) {
      console.log(error);
      throw new ErrorHandler(error.statusCode, 'deleteStorageService False') 
    }
  }
  updateStorageService = async(updateService) => {
    try {
      console.log(updateService);
      return await updateStorageServicedb(updateService);
    } catch (error) {
      console.log(error);
      throw new ErrorHandler(error.statusCode, 'updateStorageService False')
    }
  }

  // createBeautyService = async(BeautyService) => {
  //     try {
  //         return await createBeautyServicedb(BeautyService);
  //     } catch (error) {
  //         throw new ErrorHandler(error.statusCode, error.message);
  //     }
  // }
  // createAppointment = async(Appointment) => {
  //     try {
  //         return await createAppointmentdb(Appointment);
  //     } catch (error) {
  //         throw new ErrorHandler(error.statusCode, error.message);
  //     }
  // }
}

module.exports = new ServiceService()
