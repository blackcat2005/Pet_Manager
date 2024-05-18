const pool = require('../config')

const createStorageServicedb = async ({
  status,
  room_id,
  date_start,
  date_end,
  note,
}) => {
  const { rows: StorageService } = await pool.query(
    `INSERT INTO "storageServices"("status", "room_id", "date_start", "date_end", "note") 
          VALUES($1, $2, $3, $4, $5) 
          returning "service_id", "status", "room_id", "date_start", "date_end", "note"`,
    [status, room_id, date_start, date_end, note],
  )
  // console.log(StorageService);
  return StorageService[0]
}

const createStorageRegistrationdb = async ({ user_id, pet_id }) => {
  const { rows: StorageRegistration } = await pool.query(
    `INSERT INTO "storageRegistrations"("user_id", "pet_id") 
          VALUES($1, $2) 
          returning "service_id", "user_id", "pet_id"`,
    [user_id, pet_id],
  )
  console.log(StorageRegistration)
  return StorageRegistration[0]
}
const createRoomInfodb = async ({ room_type, number }) => {
  const { rows: RoomInfo } = await pool.query(
    `INSERT INTO "roomInfo"("type", "number") 
          VALUES($1, $2) 
          RETURNING "room_id", "type", "number"`,
    [room_type, number],
  )
  return RoomInfo[0]
}

const createStorageOrderdb = async ({
  service_id,
  service_type,
  date,
  total,
}) => {
  const { rows: StorageOrder } = await pool.query(
    `INSERT INTO "storageOrders"("service_id","type","date","total") 
          VALUES($1, $2, $3, $4) 
          returning "order_id", "service_id", "type", "date", "total"`,
    [service_id, service_type, date, total],
  )
  // console.log(StorageOrder);
  return StorageOrder[0]
}

const getAllStorageServicedb = async () => {
  const { rows: AllStorageService } = await pool.query(
    `SELECT ss.*, sr.user_id, sr.pet_id, so.total
       FROM "storageServices" ss
       JOIN "storageRegistrations" sr ON ss.service_id = sr.service_id
       JOIN "storageOrders" so ON ss.service_id = so.service_id`,
  )
  return AllStorageService
}

const getStorageServicebyIDdb = async (service_id) => {
  const { rows: StorageServicebyID } = await pool.query(
    `SELECT ss.*, sr.user_id, sr.pet_id, so.total
       FROM "storageServices" ss
       JOIN "storageRegistrations" sr ON ss.service_id = sr.service_id
       JOIN "storageOrders" so ON ss.service_id = so.service_id
       WHERE ss.service_id = $1`,
    [service_id],
  )
  return StorageServicebyID
}

const getStorageServicebyUser_IDdb = async (user_id) => {
  const { rows: StorageServicebyUser_ID } = await pool.query(
    `SELECT ss.*, sr.user_id, sr.pet_id, so.total
       FROM "storageServices" ss
       JOIN "storageRegistrations" sr ON ss.service_id = sr.service_id
       JOIN "storageOrders" so ON ss.service_id = so.service_id
       WHERE sr.user_id = $1`,
    [user_id],
  )
  return StorageServicebyUser_ID
}
// const deleteStorageServicedb = async(service_id) => {
//   const { rows: deleteStorageService } = await pool.query(
//     `DELETE FROM "roomInfo" WHERE "room_id" IN (SELECT "room_id" FROM "storageServices" WHERE "service_id" = $1);
//     DELETE FROM "storageRegistrations" WHERE "service_id" = $1;
//     DELETE FROM "storageOrders" WHERE "service_id" = $1;
//     DELETE FROM "storageServices" WHERE "service_id" = $1;`,
//     [service_id]
//   )
//   return deleteStorageService;
// }
const deleteStorageServicedb = async (service_id) => {
  try {
    await pool.query(`DELETE FROM "storageOrders" WHERE "service_id" = $1;`, [
      service_id,
    ])
    await pool.query(
      `DELETE FROM "storageRegistrations" WHERE "service_id" = $1;`,
      [service_id],
    )

    const { rows: deleteStorageService } = await pool.query(
      `DELETE FROM "storageServices" WHERE "service_id" = $1 RETURNING *;`,
      [service_id],
    )
    await pool.query(
      `DELETE FROM "roomInfo" WHERE "room_id" IN (SELECT "room_id" FROM "storageServices" WHERE "service_id" = $1);`,
      [service_id],
    )

    return deleteStorageService
  } catch (error) {
    console.error('Error in deleteStorageServicedb:', error)
    throw error
  }
}

const updateStorageServicedb = async ({
  service_id,
  status,
  room_id,
  date_start,
  date_end,
  note,
  pet_id,
  total,
  date,
}) => {
  const { rows: updatedRowStorageService } = await pool.query(
    `UPDATE "storageServices"
    set status=$1, room_id=$2, date_start=$3, date_end=$4, note=$5
    WHERE service_id=$6
    returning service_id, status, room_id, date_start, date_end, note`,
    [status, room_id, date_start, date_end, note, service_id],
  )
  const { rows: updateRowStorageRegistration } = await pool.query(
    `UPDATE "storageRegistrations"
    set pet_id=$1
    WHERE service_id=$2
    returning service_id, user_id, pet_id`,
    [pet_id, service_id],
  )
  const { rows: updateRowStorageOrder } = await pool.query(
    `UPDATE "storageOrders"
    set date=$1, total=$2
    WHERE service_id=$3
    returning order_id, service_id, type, date, total   `,
    [date, total, service_id],
  )
  console.log({
    updatedRowStorageService,
    updateRowStorageRegistration,
    updateRowStorageOrder,
  })
  return {
    updatedRowStorageService,
    updateRowStorageRegistration,
    updateRowStorageOrder,
  }
}

const createTimeSlotdb = async ({ time }) => {
  const { rows: time_slot } = await pool.query(
    `INSERT INTO time_slot(time) 
          VALUES($1) 
          returning id, time`,
    [time],
  )
  return time_slot
}

const getTimeSlotByIddb = async (id) => {
  const { rows: time_slot } = await pool.query(
    'SELECT time_slot.* FROM time_slot WHERE time_slot.id = $1',
    [id]
  );
  return time_slot[0];
}

const createBeautyServicedb = async ({ status, date, time_slot, note }) => {
  const { rows: BeautyService } = await pool.query(
    `INSERT INTO beautyServices(status, date, time_slot, note) 
          VALUES($1, $2, $3, $4) 
          returning service_id, status, date, time_slot, note`,
    [status, date, time_slot, note],
  )
  return BeautyService[0]
}
const createBeautyServiceRegistrationdb = async ({ user_id, pet_id }) => {
  const { rows: BeautyServiceRegistration } = await pool.query(
    `INSERT INTO beautyRegistrations(user_id, pet_id)
      VALUES($1,$2)
      returning service_id, user_id, pet_id`[(user_id, pet_id)],
  )
  return BeautyServiceRegistration[0]
}

const createBeautyOrderdb = async ({ type, date, total, service_id }) => {
  const { rows: BeautyOrder } = await pool.query(
    `INSERT INTO beautyOrders(type, date, total, service_id)
     VALUES($1,$2,$3)
     returning order_id, type, date, total, service_id`[
      (type, date, total, service_id)
    ],
  )
  return BeautyOrder[0]
}

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

const createAppointmentOrderdb = async ({ service_id, user_id, pet_id, total }) => {
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
      [date, time_slot]
    );
    return appointments;
}

const getAllAppointmentbyUser_IDdb = async (user_id, isAdmin) => {
  let queryString = `
    SELECT appointments.*, appointment_orders.*
    FROM appointments
    INNER JOIN appointment_orders ON appointments.id = appointment_orders.service_id
  `;
  const queryParams = [];

  if (!isAdmin) {
    queryString += ' WHERE appointment_orders.user_id = $1';
    queryParams.push(user_id);
  }

  try {
    const { rows: allAppointments } = await pool.query(
      queryString,
      queryParams
    );
    return allAppointments;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
}

const getAppointmentbyIDdb = async (id) => {
  const { rows: appointmentById } = await pool.query(
    `SELECT appointments.*, appointment_orders.*
    FROM appointments
    INNER JOIN appointment_orders ON appointments.id = appointment_orders.service_id
    WHERE appointments.id = $1`,
    [id]
  );
  if (appointmentById.length === 0) {
    return { message: 'No appointment found with the specified ID' };
  }
  return appointmentById[0];
}

const deleteAppointmentdb = async (id) => {
  try {
    // Bắt đầu một transaction
    await pool.query('BEGIN');

    // Xóa các bản ghi trong bảng appointment_orders theo service_id (liên kết với id của bảng appointments)
    await pool.query(
      'DELETE FROM appointment_orders WHERE service_id = $1',
      [id]
    );

    // Xóa bản ghi trong bảng appointments theo id
    const { rowCount } = await pool.query(
      'DELETE FROM appointments WHERE id = $1',
      [id]
    );

    // Nếu không có bản ghi nào bị xóa, trả về thông báo không có
    if (rowCount === 0) {
      await pool.query('ROLLBACK');
      return { message: 'No appointment found with the specified ID' };
    }

    // Commit transaction nếu mọi thứ suôn sẻ
    await pool.query('COMMIT');

    return { message: 'Appointment successfully deleted' };
  } catch (error) {
    // Rollback transaction nếu có lỗi
    await pool.query('ROLLBACK');
    console.error('Error in deleteAppointmentdb:', error);
    throw error;
  }
}

const updateAppointmentdb = async ({ id, date, note, time_slot, pet_id }) => {
  try {
    // Bắt đầu transaction
    await pool.query('BEGIN');

    // Kiểm tra xem cuộc hẹn có tồn tại không
    const { rows: existingAppointment } = await pool.query(
      'SELECT * FROM appointments WHERE id = $1',
      [id]
    );

    if (existingAppointment.length === 0) {
      await pool.query('ROLLBACK');
      return { message: "Appointment not found" };
    }

    // Kiểm tra xem đơn hàng cuộc hẹn có tồn tại không
    const { rows: existingAppointmentOrder } = await pool.query(
      'SELECT * FROM appointment_orders WHERE service_id = $1',
      [id]
    );

    if (existingAppointmentOrder.length === 0) {
      await pool.query('ROLLBACK');
      return { message: "Appointment order not found" };
    }

    // Cập nhật thông tin trong bảng appointments
    const updateAppointmentsQuery = `
      UPDATE appointments
      SET date = $1, note = $2, time_slot = $3
      WHERE id = $4
    `;
    await pool.query(updateAppointmentsQuery, [date, note, time_slot, id]);

    // Cập nhật thông tin pet_id trong bảng appointment_orders
    const updateAppointmentOrdersQuery = `
      UPDATE appointment_orders
      SET pet_id = $1
      WHERE service_id = $2
    `;
    await pool.query(updateAppointmentOrdersQuery, [pet_id, id]);

    // Commit transaction nếu mọi thứ suôn sẻ
    await pool.query('COMMIT');

    return { message: 'Appointment successfully updated' };
  } catch (error) {
    // Rollback transaction nếu có lỗi
    await pool.query('ROLLBACK');
    console.error('Error in updateAppointmentdb:', error);
    throw new ErrorHandler(500, 'Internal server error');
  }
};

const updateAppointmentStatusdb = async ({ id, status }) => {
  try {
    // Bắt đầu transaction
    await pool.query('BEGIN');

    // Kiểm tra xem cuộc hẹn có tồn tại không
    const { rows: existingAppointment } = await pool.query(
      'SELECT * FROM appointments WHERE id = $1',
      [id]
    );

    if (existingAppointment.length === 0) {
      await pool.query('ROLLBACK');
      return { message: "Appointment not found" };
    }

    // Cập nhật trạng thái trong bảng appointments
    const updateStatusQuery = `
      UPDATE appointments
      SET status = $1
      WHERE id = $2
    `;
    await pool.query(updateStatusQuery, [status, id]);

    // Commit transaction nếu mọi thứ suôn sẻ
    await pool.query('COMMIT');

    return { message: 'Appointment status successfully updated' };
  } catch (error) {
    // Rollback transaction nếu có lỗi
    await pool.query('ROLLBACK');
    console.error('Error in updateAppointmentStatusdb:', error);
    throw new ErrorHandler(500, 'Internal server error');
  }
};



module.exports = {
  createStorageServicedb,
  createRoomInfodb,
  createStorageRegistrationdb,
  createStorageOrderdb,
  createBeautyServicedb,

  createTimeSlotdb,
  getTimeSlotByIddb,

  createBeautyServiceRegistrationdb,
  createBeautyOrderdb,
  getAllStorageServicedb,
  getStorageServicebyIDdb,
  getStorageServicebyUser_IDdb,
  deleteStorageServicedb,
  updateStorageServicedb,

  createAppointmentdb,
  createAppointmentOrderdb,
  getAppointmentsByDateAndTimeSlotdb,
  getAllAppointmentbyUser_IDdb,
  getAppointmentbyIDdb,
  deleteAppointmentdb,
  updateAppointmentdb,
  updateAppointmentStatusdb,

}
