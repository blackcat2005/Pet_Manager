const petService = require('../services/pets.service')
const userService = require('../services/users.service')
const { ErrorHandler } = require('../helpers/error')
const serviceAppointment = require('../services/servicesAppointment.service')

// Appointment
const createAppointment = async (req, res) => {
  const { date, note, time_slot, pet_id } = req.body
  const { user_id } = req.user
  total = 0.0
  const user = await userService.getUserById(user_id)
  if (!user) {
    throw new ErrorHandler(404, 'User not found')
  }
  if (+user_id === req.user.user_id || req.user.roles.include('admin')) {
    const currentDate = new Date()
    const appointmentDate = new Date(date)
    // Kiểm tra nếu date nhỏ hơn hôm nay
    if (appointmentDate < currentDate.setHours(0, 0, 0, 0)) {
      throw new ErrorHandler(400, 'The appointment date cannot be in the past.')
    }
    // Kiểm tra time_slot trong bảng time_slot
    const timeSlot = await serviceAppointment.getTimeSlotById(time_slot)
    if (!timeSlot) {
      throw new ErrorHandler(404, 'Time slot not found')
    }

    const [hours, minutes] = timeSlot.time.split(':').map(Number)
    const appointmentTime = new Date(date)
    appointmentTime.setHours(hours, minutes, 0, 0)

    // Nếu ngày hẹn là hôm nay và thời gian hẹn nhỏ hơn thời gian hiện tại
    if (
      appointmentDate.toDateString() === currentDate.toDateString() &&
      appointmentTime < new Date()
    ) {
      throw new ErrorHandler(400, 'The appointment time cannot be in the past.')
    }
    // Kiểm tra trùng lặp date và time_slot nếu trạng thái không phải 'canceled' hoặc 'completed'
    const existingAppointments =
      await serviceAppointment.getAppointmentsByDateAndTimeSlot(date, time_slot)
    if (
      existingAppointments.some(
        (app) => app.status !== 'canceled' && app.status !== 'completed',
      )
    ) {
      throw new ErrorHandler(
        400,
        'The time slot is already booked for the selected date.',
      )
    }

    const appointment = await serviceAppointment.createAppointment({
      date,
      note,
      time_slot,
    })
    let service_id = appointment.id
    const appointment_order = await serviceAppointment.createAppointmentOrder({
      service_id,
      user_id,
      pet_id,
      total,
    })

    res.status(201).json({
      status: 'success',
      appointment,
      appointment_order,
    })
  } else {
    throw new ErrorHandler(401, 'Unauthorized')
  }
}

const getAllAppointmentbyUser_ID = async (req, res) => {
  const { user_id, roles } = req.user

  const user = await userService.getUserById(user_id)
  const isAdmin = roles.includes('admin')
  if (!user) {
    throw new ErrorHandler(404, 'User not found')
  }
  if (+user_id === req.user.user_id || isAdmin) {
    const allAppointment = await serviceAppointment.getAllAppointmentbyUser_ID(
      user_id,
      isAdmin,
    )
    res.status(201).json({
      status: 'success',
      allAppointment,
    })
    console.log(user_id)
  } else {
    throw new ErrorHandler(401, 'Unauthorized')
  }
}

const getAppointmentbyID = async (req, res) => {
  const { user_id } = req.user

  const user = await userService.getUserById(user_id)
  if (!user) {
    throw new ErrorHandler(404, 'User not found')
  }
  if (+user_id === req.user.user_id || req.user.roles.includes('admin')) {
    const { id } = req.body
    const appointmentById = await serviceAppointment.getAppointmentbyID(id)
    res.status(200).json({
      status: 'success',
      appointmentById,
    })
  } else {
    throw new ErrorHandler(401, 'Unauthorized')
  }
}

const deleteAppointment = async (req, res) => {
  const { user_id } = req.user
  const { id } = req.body
  const user = await userService.getUserById(user_id)
  if (!user) {
    throw new ErrorHandler(404, 'User not found')
  }
  if (+user_id === req.user.user_id || req.user.roles.includes('admin')) {
    const delete_appointment = await serviceAppointment.deleteAppointment(id)
    res.status(200).json({
      status: 'success',
      delete_appointment,
    })
  } else {
    throw new ErrorHandler(401, 'Unauthorized')
  }
}

const updateAppointment = async (req, res) => {
  const { user_id } = req.user
  const { id, date, note, time_slot, pet_id } = req.body
  const user = await userService.getUserById(user_id)
  if (!user) {
    throw new ErrorHandler(404, 'User not found')
  }
  if (+user_id === req.user.user_id || req.user.roles.includes('admin')) {
    const update_appointment = await serviceAppointment.updateAppointment({
      id,
      date,
      note,
      time_slot,
      pet_id,
    })
    res.status(200).json({
      status: 'success',
      update_appointment,
    })
  } else {
    throw new ErrorHandler(401, 'Unauthorized')
  }
}

const updateAppointmentStatus = async (req, res) => {
  // const { user_id } = req.user
  const { id, status } = req.body
  // const user = await userService.getUserById(user_id)
  // if (!user) {
  //   throw new ErrorHandler(404, 'User not found')
  // }
  // Kiểm tra xem trạng thái có hợp lệ không
  const validStatuses = ['complete', 'canceled', 'processing']
  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid status',
    })
  }

  try {
    if (req.user.roles.includes('admin') || req.user.roles.includes('staff')) {
      const response = await serviceAppointment.updateAppointmentStatus({
        id,
        status,
      })
      if (response.message === 'Appointment not found') {
        return res.status(404).json({
          status: 'error',
          message: response.message,
        })
      }

      res.status(200).json({
        status: 'success',
        message: response.message,
      })
    } else if (req.user.roles.includes('customer')) {
      // Customer chỉ có thể hủy (canceled) cuộc hẹn
      if (status !== 'canceled') {
        return res.status(401).json({
          status: 'error',
          message: 'Unauthorized action',
        })
      }

      const response = await serviceAppointment.updateAppointmentStatus({
        id,
        status,
      })
      if (response.message === 'Appointment not found') {
        return res.status(404).json({
          status: 'error',
          message: response.message,
        })
      }

      res.status(200).json({
        status: 'success',
        message: response.message,
      })
    } else {
      throw new ErrorHandler(401, 'Unauthorized')
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    })
  }
}
module.exports = {
  createAppointment,
  getAllAppointmentbyUser_ID,
  getAppointmentbyID,
  deleteAppointment,
  updateAppointment,
  updateAppointmentStatus,
}
