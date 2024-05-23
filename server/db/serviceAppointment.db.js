const pool = require('../config')

const createAppointmentdb = async ({ date, note, time_slot }) => {
  const { rows: appointment } = await pool.query(
    `INSERT INTO appointments(date, note, time_slot) 
      VALUES($1, $2, $3) 
      returning id, medical_record_id, status, date, note, time_slot`,
    [date, note, time_slot],
  )
  // console.log(Appointment[0])
  return appointment[0]
}

const createAppointmentOrderdb = async ({
  service_id,
  user_id,
  pet_id,
  total,
}) => {
  const { rows: appointment_order } = await pool.query(
    `INSERT INTO "appointment_orders"("service_id", "user_id","pet_id","total") 
        VALUES($1, $2, $3, $4) 
        returning "id", "service_id", "user_id", "pet_id", "total", "created_at"`,
    [service_id, user_id, pet_id, total],
  )
  return appointment_order[0]
}

const getAppointmentsByDateAndTimeSlotdb = async (date, time_slot) => {
  const { rows: appointments } = await pool.query(
    `SELECT * FROM appointments 
       WHERE date::date = $1::date AND time_slot = $2`,
    [date, time_slot],
  )
  return appointments
}

const getAllAppointmentbyUser_IDdb = async (user_id, isAdmin) => {
  let queryString = `
    SELECT appointments.*, appointment_orders.*
    FROM appointments
    INNER JOIN appointment_orders ON appointments.id = appointment_orders.service_id
  `
  const queryParams = []

  if (!isAdmin) {
    queryString += ' WHERE appointment_orders.user_id = $1'
    queryParams.push(user_id)
  }

  try {
    const { rows: allAppointments } = await pool.query(queryString, queryParams)
    return allAppointments
  } catch (error) {
    console.error('Error fetching appointments:', error)
    throw error
  }
}

const getAppointmentbyIDdb = async (id) => {
  const { rows: appointmentById } = await pool.query(
    `SELECT appointments.*, appointment_orders.*
    FROM appointments
    INNER JOIN appointment_orders ON appointments.id = appointment_orders.service_id
    WHERE appointments.id = $1`,
    [id],
  )
  if (appointmentById.length === 0) {
    return { message: 'No appointment found with the specified ID' }
  }
  return appointmentById[0]
}

const deleteAppointmentdb = async (id) => {
  try {
    // Bắt đầu một transaction
    await pool.query('BEGIN')

    // Xóa các bản ghi trong bảng appointment_orders theo service_id (liên kết với id của bảng appointments)
    await pool.query('DELETE FROM appointment_orders WHERE service_id = $1', [
      id,
    ])

    // Xóa bản ghi trong bảng appointments theo id
    const { rowCount } = await pool.query(
      'DELETE FROM appointments WHERE id = $1',
      [id],
    )

    // Nếu không có bản ghi nào bị xóa, trả về thông báo không có
    if (rowCount === 0) {
      await pool.query('ROLLBACK')
      return { message: 'No appointment found with the specified ID' }
    }

    // Commit transaction nếu mọi thứ suôn sẻ
    await pool.query('COMMIT')

    return { message: 'Appointment successfully deleted' }
  } catch (error) {
    // Rollback transaction nếu có lỗi
    await pool.query('ROLLBACK')
    console.error('Error in deleteAppointmentdb:', error)
    throw error
  }
}

const updateAppointmentdb = async ({ id, date, note, time_slot, pet_id }) => {
  try {
    // Bắt đầu transaction
    await pool.query('BEGIN')

    // Kiểm tra xem cuộc hẹn có tồn tại không
    const { rows: existingAppointment } = await pool.query(
      'SELECT * FROM appointments WHERE id = $1',
      [id],
    )

    if (existingAppointment.length === 0) {
      await pool.query('ROLLBACK')
      return { message: 'Appointment not found' }
    }

    // Kiểm tra xem đơn hàng cuộc hẹn có tồn tại không
    const { rows: existingAppointmentOrder } = await pool.query(
      'SELECT * FROM appointment_orders WHERE service_id = $1',
      [id],
    )

    if (existingAppointmentOrder.length === 0) {
      await pool.query('ROLLBACK')
      return { message: 'Appointment order not found' }
    }

    // Cập nhật thông tin trong bảng appointments
    const updateAppointmentsQuery = `
      UPDATE appointments
      SET date = $1, note = $2, time_slot = $3
      WHERE id = $4
    `
    await pool.query(updateAppointmentsQuery, [date, note, time_slot, id])

    // Cập nhật thông tin pet_id trong bảng appointment_orders
    const updateAppointmentOrdersQuery = `
      UPDATE appointment_orders
      SET pet_id = $1
      WHERE service_id = $2
    `
    await pool.query(updateAppointmentOrdersQuery, [pet_id, id])

    // Commit transaction nếu mọi thứ suôn sẻ
    await pool.query('COMMIT')

    return { message: 'Appointment successfully updated' }
  } catch (error) {
    // Rollback transaction nếu có lỗi
    await pool.query('ROLLBACK')
    console.error('Error in updateAppointmentdb:', error)
    throw new ErrorHandler(500, 'Internal server error')
  }
}

const updateAppointmentStatusdb = async ({ id, status }) => {
  try {
    // Bắt đầu transaction
    await pool.query('BEGIN')

    // Kiểm tra xem cuộc hẹn có tồn tại không
    const { rows: existingAppointment } = await pool.query(
      'SELECT * FROM appointments WHERE id = $1',
      [id],
    )

    if (existingAppointment.length === 0) {
      await pool.query('ROLLBACK')
      return { message: 'Appointment not found' }
    }

    // Cập nhật trạng thái trong bảng appointments
    const updateStatusQuery = `
      UPDATE appointments
      SET status = $1
      WHERE id = $2
    `
    await pool.query(updateStatusQuery, [status, id])

    // Commit transaction nếu mọi thứ suôn sẻ
    await pool.query('COMMIT')

    return { message: 'Appointment status successfully updated' }
  } catch (error) {
    // Rollback transaction nếu có lỗi
    await pool.query('ROLLBACK')
    console.error('Error in updateAppointmentStatusdb:', error)
    throw new ErrorHandler(500, 'Internal server error')
  }
}

module.exports = {
  createAppointmentdb,
  createAppointmentOrderdb,
  getAppointmentsByDateAndTimeSlotdb,
  getAllAppointmentbyUser_IDdb,
  getAppointmentbyIDdb,
  deleteAppointmentdb,
  updateAppointmentdb,
  updateAppointmentStatusdb,
}
