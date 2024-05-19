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

const getBeautyServicebyUser_IDdb = async (user_id) => {
  const { rows: BeautyServicebyUser_ID } = await pool.query(
    `SELECT ss.*, sr.user_id, sr.pet_id, so.total
       FROM "beautyServices" ss
       JOIN "beautyRegistations" sr ON ss.service_id = sr.service_id
       JOIN "beautyOrders" so ON ss.service_id = so.service_id
       WHERE sr.user_id = $1`,
    [user_id],
  )
  return BeautyServicebyUser_ID
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
  createRoomInfodb,
  createStorageRegistrationdb,
  createStorageOrderdb,
  createBeautyServicedb,

  createBeautyServiceRegistrationdb,
  createBeautyOrderdb,
  getAllStorageServicedb,
  getStorageServicebyIDdb,
  getStorageServicebyUser_IDdb,
  deleteStorageServicedb,
  updateStorageServicedb,

  createAppointmentdb,
  createAppointmentRegistrationdb,
  createAppointmentOrderdb,
}
