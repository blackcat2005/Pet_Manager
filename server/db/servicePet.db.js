const pool = require("../config");

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
      [status, room_id, date_start, date_end, note]
    );
    // console.log(StorageService);
    return StorageService[0];
  };

const createStorageRegistationdb = async ({
    user_id,
    pet_id
  }) => {
    const { rows: StorageRegistation } = await pool.query(
      `INSERT INTO "storageRegistations"("user_id", "pet_id") 
          VALUES($1, $2) 
          returning "service_id", "user_id", "pet_id"`,
      [user_id, pet_id]
    );
    console.log(StorageRegistation);
    return StorageRegistation[0];
  };  
const createRoomInfodb = async ({ room_type, number }) => {
  const { rows: RoomInfo } = await pool.query(
    `INSERT INTO "roomInfo"("type", "number") 
          VALUES($1, $2) 
          RETURNING "room_id", "type", "number"`,
    [room_type, number],
  )
  return RoomInfo[0]
}


const createStorageOrderdb = async({
    service_id,
    service_type,
    date,
    total
}) => {
    const {rows: StorageOrder} = await pool.query(
        `INSERT INTO "storageOrders"("service_id","type","date","total") 
          VALUES($1, $2, $3, $4) 
          returning "order_id", "service_id", "type", "date", "total"`,
      [service_id, service_type, date, total] 
    );
    // console.log(StorageOrder);
    return StorageOrder[0];
}

const getAllStorageServicedb = async () => {
    const { rows: AllStorageService } = await pool.query(
      `SELECT ss.*, sr.user_id, sr.pet_id, so.total
       FROM "storageServices" ss
       JOIN "storageRegistations" sr ON ss.service_id = sr.service_id
       JOIN "storageOrders" so ON ss.service_id = so.service_id`,
    )
    return AllStorageService;
}

const getStorageServicebyIDdb = async (service_id) => {
    const { rows: StorageServicebyID } = await pool.query(
      `SELECT ss.*, sr.user_id, sr.pet_id, so.total
       FROM "storageServices" ss
       JOIN "storageRegistations" sr ON ss.service_id = sr.service_id
       JOIN "storageOrders" so ON ss.service_id = so.service_id
       WHERE ss.service_id = $1`,
      [service_id],
    )
    return StorageServicebyID;
}

const getStorageServicebyUser_IDdb = async (user_id) => {
  const { rows: StorageServicebyUser_ID } = await pool.query(
    `SELECT ss.*, sr.user_id, sr.pet_id, so.total
       FROM "storageServices" ss
       JOIN "storageRegistations" sr ON ss.service_id = sr.service_id
       JOIN "storageOrders" so ON ss.service_id = so.service_id
       WHERE sr.user_id = $1`,
    [user_id],
  )
  return StorageServicebyUser_ID
}
// const deleteStorageServicedb = async(service_id) => {
//   const { rows: deleteStorageService } = await pool.query(
//     `DELETE FROM "roomInfo" WHERE "room_id" IN (SELECT "room_id" FROM "storageServices" WHERE "service_id" = $1);
//     DELETE FROM "storageRegistations" WHERE "service_id" = $1;
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
      `DELETE FROM "storageRegistations" WHERE "service_id" = $1;`,
      [service_id],
    )

    const { rows: deleteStorageService } = await pool.query(
      `DELETE FROM "storageServices" WHERE "service_id" = $1 RETURNING *;`,
      [service_id],
    )
    await pool.query(`DELETE FROM "roomInfo" WHERE "room_id" IN (SELECT "room_id" FROM "storageServices" WHERE "service_id" = $1);`,
    [service_id])

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
  const {rows: updateRowStorageRegistation} = await pool.query(
    `UPDATE "storageRegistations"
    set pet_id=$1
    WHERE service_id=$2
    returning service_id, user_id, pet_id`,
    [pet_id, service_id]
  );
  const {rows: updateRowStorageOrder} = await pool.query(
    `UPDATE "storageOrders"
    set date=$1, total=$2
    WHERE service_id=$3
    returning order_id, service_id, type, date, total   `,
    [date, total, service_id]
  );
  console.log({
    updatedRowStorageService,
    updateRowStorageRegistation,
    updateRowStorageOrder,
  })
  return {
    updatedRowStorageService,
    updateRowStorageRegistation,
    updateRowStorageOrder,
  }
}



const createBeautyServicedb = async ({
    status,
    date,
    time_slot,
    note
  }) => {
    const { rows: BeautyService } = await pool.query(
      `INSERT INTO beautyServices(status, date, time_slot, note) 
          VALUES($1, $2, $3, $4) 
          returning service_id, status, date, time_slot, note`,
      [status, date, time_slot, note]
    );
    return BeautyService[0];
  };
const createBeautyServiceRegistationdb = async({
  user_id,
  pet_id
}) => {
  const {rows : BeautyServiceRegistation} = await pool.query(
    `INSERT INTO beautyRegistations(user_id, pet_id)
      VALUES($1,$2)
      returning service_id, user_id, pet_id`
      [user_id,pet_id]
  ) ;
  return BeautyServiceRegistation[0];
}

const createBeautyOrderdb = async({
  type, date, total, service_id
}) => {
  const { rows: BeautyOrder } = await pool.query(
    `INSERT INTO beautyOrders(type, date, total, service_id)
     VALUES($1,$2,$3)
     returning order_id, type, date, total, service_id`
     [type, date, total, service_id]
  );
  return BeautyOrder[0];
}

const createAppointmentdb = async ({
    medical_record_id,
    status,
    date,
    time_slot
  }) => {
    const { rows: Appointment } = await pool.query(
      `INSERT INTO appointments(medical_record_id, status, date, time_slot) 
          VALUES($1, $2, $3, $4) 
          returning service_id, medical_record_id, status, date, time_slot`,
      [medical_record_id, status, date, time_slot]
    );
    return Appointment[0];
  };

const createAppointmentRegistationdb = async({
  user_id, pet_id
}) => {
  const {rows : AppointmentRegistation} = await pool.query(
    `INSERT INTO appointOrders(user_id,pet_id)
    VALUES ($1,$2)
    returning service_id, user_id, pet_id`
    [user_id, pet_id]
  );
  return AppointmentRegistation[0];
}
module.exports = {
  createStorageServicedb,
  createRoomInfodb,
  createStorageRegistationdb,
  createStorageOrderdb,
  createBeautyServicedb,
  createAppointmentdb,
  createBeautyServiceRegistationdb,
  createBeautyOrderdb,
  createAppointmentRegistationdb,
  getAllStorageServicedb,
  getStorageServicebyIDdb,
  getStorageServicebyUser_IDdb,
  deleteStorageServicedb,
  updateStorageServicedb,
}
