const { ErrorHandler } = require('../helpers/error')
const {
  createAppointmentdb,
  createAppointmentOrderdb,
  getAppointmentsByDateAndTimeSlotdb,
  getAllAppointmentbyUser_IDdb,
  getAppointmentbyIDdb,
  deleteAppointmentdb,
  updateAppointmentdb,
  updateAppointmentStatusdb,
} = require('../db/servicePet.db')

class ServiceAppointment {
  //Apointment

  createAppointment = async (appointment) => {
    try {
      return await createAppointmentdb(appointment)
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(error.statusCode, error.message)
    }
  }

  createAppointmentOrder = async (appointment_order) => {
    try {
      return await createAppointmentOrderdb(appointment_order)
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(error.statusCode, error.message)
    }
  }

  getAppointmentsByDateAndTimeSlot = async (date, time_slot) => {
    try {
      return await getAppointmentsByDateAndTimeSlotdb(date, time_slot)
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(error.statusCode, error.message)
    }
  }

  getAllAppointmentbyUser_ID = async (user_id, isAdmin) => {
    try {
      // console.log(user_id)
      return await getAllAppointmentbyUser_IDdb(user_id, isAdmin)
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(
        error.statusCode,
        'getAllAppointmentbyUser_ID False',
      )
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

  deleteAppointment = async (id) => {
    try {
      return await deleteAppointmentdb(id)
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(error.statusCode, 'deleteAppointment False')
    }
  }

  updateAppointment = async (update_appointment) => {
    try {
      // console.log(update_appointment);
      return await updateAppointmentdb(update_appointment)
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(error.statusCode, 'updateAppointment False')
    }
  }

  updateAppointmentStatus = async (response) => {
    try {
      console.log(response)
      return await updateAppointmentStatusdb(response)
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(error.statusCode, 'updateAppointmentStatus False')
    }
  }
}

module.exports = new ServiceAppointment()
