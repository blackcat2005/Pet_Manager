const pool = require('../config')
const { ErrorHandler } = require('../helpers/error')

const formatDateToISO = (dateString) => {
  const [day, month, year] = dateString.split('/')
  return new Date(`${year}-${month}-${day}`).toISOString()
}

const createStorageServicedb = async ({
  status,
  room_id,
  date_start,
  date_end,
  note,
}) => {
    const formattedDateStart = formatDateToISO(date_start)
    const formattedDateEnd = formatDateToISO(date_end)
    const { rows: StorageService } = await pool.query(
      `INSERT INTO "storage" ("status ","room_id", "date_start", "date_end", "note") 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING "id", "status ", "room_id", "date_start", "date_end", "note"`,
      [status, room_id, formattedDateStart, formattedDateEnd, note],
    )
    return StorageService[0];
}

const createStorage_Orderdb = async ({
  service_id,
  user_id,
  pet_id,
  create_at,
  total,
}) => {
  const { rows: StorageOrder } = await pool.query(
    `INSERT INTO "storage_orders"("service_id","user_id","pet_id","create_at","total") 
          VALUES($1, $2, $3, $4,$5) 
          returning "id", "service_id","user_id","pet_id","create_at","total"`,
    [service_id, user_id, pet_id, create_at, total],
  )
  return StorageOrder[0]
}

const getAllStorageServiceDB = async () => {
    const query = `
      SELECT 
        s.*, 
        r.type AS room_type,
        so.id AS order_id,
        so.service_id AS order_service_id,
        so.user_id AS order_user_id,
        so.pet_id AS order_pet_id,
        so.create_at AS order_created_at,
        so.total AS order_total
      FROM 
        storage s
      LEFT JOIN 
        room r ON s.room_id = r.id
      LEFT JOIN 
        storage_orders so ON s.id = so.service_id
    `
    const { rows: allStorageService } = await pool.query(query)
    return allStorageService;

}   


const getStorageServicebyIDdb = async ({service_id}) => {
  const { rows: StorageServicebyID } = await pool.query(
    `SELECT ss.*, so.user_id, so.pet_id, so.total, so.create_at
       FROM "storage" ss
       JOIN "storage_orders" so ON ss.id = so.service_id
       JOIN "room" ro ON ss.room_id = ro.id
       WHERE ss.id = $1`,
    [service_id],
  )
  return StorageServicebyID[0]
}

const getStorageServicebyUser_IDdb = async ({user_id}) => {
  const { rows: StorageServicebyUser_ID } = await pool.query(
    `SELECT ss.*, so.user_id, so.pet_id, so.total, so.create_at
       FROM "storage" ss
       JOIN "storage_orders" so ON ss.id = so.service_id
       JOIN "room" ro ON ss.room_id = ro.id
       WHERE so.user_id = $1`,
    [user_id],
  )
  return StorageServicebyUser_ID
}


const deleteStorageServicedb = async ({service_id}) => {
  try {
    await pool.query(`DELETE FROM "storage_orders" WHERE "id" = $1;`, [
      service_id,
    ])

    await pool.query(
      `DELETE FROM "storage" WHERE "id" = $1 RETURNING *;`,
      [service_id],
    )
    return "Success";
  } catch (error) {
    console.error('Error in deleteStorageServicedb:', error)
    throw error
  }
}

const updateStorageServicedb = async({id, room_id, note, pet_id, date_start, date_end}) => {
  try {
    await pool.query(`BEGIN`);
    
    const {rows: existingStorage} = await pool.query(
      `SELECT * FROM storage where id = $1`,
      [id]
    );
    if (existingStorage.length == 0) {
      await pool.query(`ROLLBACK`);
      return {message: "storage not found"};
    }

    const {rows: existingStorageOrder} = await pool.query(
      `SELECT * FROM storage_orders where service_id = $1`,
      [id]
    );

    if (existingStorageOrder.length == 0 ) {
      await pool.query(`ROLLBACK`);
      return {message: "storage order not found"};
    }

    // Update storage
    const storageQuery = `
      UPDATE storage 
      set room_id = $1, date_start=$2, date_end=$3, note=$4
      where id = $5`;
    await pool.query(storageQuery, [room_id, date_start, date_end, note, id]);

    const storage_ordersQuery = `
      UPDATE storage_orders
      set pet_id=$1
      where service_id=$2`;
    await pool.query(storage_ordersQuery, [pet_id, id]);

    await pool.query('COMMIT');

    return { message: 'storage successfully updated'};

  } catch (error) {
    await pool.query('ROLLBACK');
    console.log(error);
    throw new ErrorHandler(500, 'Internal server error');
  }
}
const deleteBeautyServicedb = async (service_id) => {
  try {
    await pool.query(`DELETE FROM "beautyOrders" WHERE "service_id" = $1;`, [
      service_id,
    ])
    await pool.query(
      `DELETE FROM "beautyRegistations" WHERE "service_id" = $1;`,
      [service_id],
    )

    const { rows: deleteBeautyService } = await pool.query(
      `DELETE FROM "beautyServices" WHERE "service_id" = $1 RETURNING *;`,
      [service_id],
    )
    await pool.query(
      `DELETE FROM "timeSlots" WHERE "time_slot" IN (SELECT "time_slot" FROM "beautyServices" WHERE "service_id" = $1);`,
      [service_id],
    )

    return deleteBeautyService
  } catch (error) {
    console.error('Error in deleteBeautyServicedb:', error)
    throw error
  }
}

const updateBeautyServicedb = async ({
  service_id,
  status,
  date_1,
  note,
  pet_id,
  date_2,
  total,
  time,
}) => {
  const { rows: updatedRowBeautyService } = await pool.query(
    `UPDATE "beautyServices"
    set status=$1, date=$2, time_Slot=$3, note=$4
    WHERE service_id=$5
    returning service_id, status, date, time_slot, note`,
    [status, date_1, time_slot, note, service_id],
  )
  const { rows: updateRowBeautyRegistation } = await pool.query(
    `UPDATE "beautyRegistations"
    set pet_id=$1
    WHERE service_id=$2
    returning service_id, user_id, pet_id`,
    [pet_id, service_id],
  )
  const { rows: updateRowBeautyOrder } = await pool.query(
    `UPDATE "beautyOrders"
    set date=$1, total=$2
    WHERE service_id=$3
    returning order_id, service_id, type, date, total`,
    [date_2, total, service_id],
  )
  const time_slot = updatedRowBeautyService.time_slot
  const { rows: updateTime_Slot } = await pool.query(
    `UPDATE "time_Slots
    set time=$1
    WHERE time_slot=$2
    returning time_slot, time`,
    [time, time_slot],
  )
  console.log({
    updatedRowBeautyService,
    updateRowBeautyRegistation,
    updateRowBeautyOrder,
    updateTime_Slot,
  })
  return {
    updatedRowBeautyService,
    updateRowBeautyRegistation,
    updateRowBeautyOrder,
    updateTime_Slot,
  }
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

const createAppointmentdb = async ({ status, date, time_slot }) => {
  const { rows: Appointment } = await pool.query(
    `INSERT INTO appointments(status, date, time_slot) 
      VALUES($1, $2, $3) 
      returning service_id, medical_record_id, status, date, time_slot`,
    [status, date, time_slot],
  )
  // console.log(Appointment[0])
  return Appointment[0]
}

const createAppointmentRegistrationdb = async ({ user_id, pet_id }) => {
  const { rows: AppointmentRegistration } = await pool.query(
    `INSERT INTO "appointmentRegistrations"(user_id, pet_id)
      VALUES ($1, $2)
      RETURNING service_id, user_id, pet_id`,
    [user_id, pet_id], // Thiếu dấu phẩy ở đây
  )
  console.log(AppointmentRegistration[0])
  return AppointmentRegistration[0]
}

const createAppointmentOrderdb = async ({ service_id, type, date, total }) => {
  const { rows: AppointmentOrder } = await pool.query(
    `INSERT INTO "appointmentOrders"("service_id","type","date","total") 
        VALUES($1, $2, $3, $4) 
        returning "order_id", "service_id", "type", "date", "total"`,
    [service_id, type, date, total],
  )
  return AppointmentOrder[0]
}
module.exports = {
  createStorageServicedb,
  createStorage_Orderdb,
  createBeautyServicedb,
  createBeautyServiceRegistrationdb,
  createBeautyOrderdb,
  getAllStorageServiceDB,
  getStorageServicebyIDdb,
  getStorageServicebyUser_IDdb,
  deleteStorageServicedb,
  updateStorageServicedb,
  createAppointmentdb,
  createAppointmentRegistrationdb,
  createAppointmentOrderdb,
}
