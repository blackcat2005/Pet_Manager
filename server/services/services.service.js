const { ErrorHandler } = require('../helpers/error')
const {
  createStorageServicedb,
  createRoomInfodb,
  createStorageRegistationdb,
  createStorageOrderdb,
  createBeautyServicedb,
  getAllStorageServicedb,
  getStorageServicebyIDdb,
  getStorageServicebyUser_IDdb,
  deleteStorageServicedb,
  updateStorageServicedb,

  createTimeSlotdb,
  getTimeSlotByIddb,

  createAppointmentdb,
  createAppointmentOrderdb,
  getAppointmentsByDateAndTimeSlotdb,
  getAllAppointmentbyUser_IDdb,
  getAppointmentbyIDdb,
  deleteAppointmentdb,
  updateAppointmentdb,


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

  // Time slot
  createTimeSlot = async (time_slot) => {
    try {
      return await createTimeSlotdb(time_slot)
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  getTimeSlotById = async (id) => {
    try {
      return await getTimeSlotByIddb(id)
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(error.statusCode, 'getTimeSlotById False')
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

  //Apointment

  createAppointment = async (appointment) => {
    try { 
      return await createAppointmentdb(appointment)
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  createAppointmentOrder = async (appointment_order) => {
    try {
      return await createAppointmentOrderdb(appointment_order)
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  getAppointmentsByDateAndTimeSlot = async (date, time_slot) => {
    try {
      return await getAppointmentsByDateAndTimeSlotdb(date, time_slot)
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  getAllAppointmentbyUser_ID = async (user_id, isAdmin) => {
    try {
      // console.log(user_id)
      return await getAllAppointmentbyUser_IDdb(user_id, isAdmin)
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(error.statusCode, 'getAllAppointmentbyUser_ID False')
    }
  }

  getAppointmentbyID = async (id) => {
    try {
      // console.log(user_id)
      return await getAppointmentbyIDdb(id)
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(error.statusCode, 'getAppointmentbyID False')
    }
  }

  deleteAppointment = async(id) => {
    try {
      return await deleteAppointmentdb(id);
    } catch (error) {
      console.log(error);
      throw new ErrorHandler(error.statusCode, 'deleteAppointment False') 
    }
  }

  updateAppointment = async(update_appointment) => {
    try {
      console.log(update_appointment);
      return await updateAppointmentdb(update_appointment);
    } catch (error) {
      console.log(error);
      throw new ErrorHandler(error.statusCode, 'updateAppointment False')
    }
  }
}

module.exports = new ServiceService()
