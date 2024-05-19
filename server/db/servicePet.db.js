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
    console.log(StorageService[0].service_id);
    return StorageService[0];
  };

const createStorage_Orderdb = async({
    service_id,
    user_id,
    pet_id,
    create_at,
    total
}) => {
    const {rows: storage_order} = await pool.query(
        `INSERT INTO "storageOrders"("service_id","user_id", "pet_id", "create_at","total") 
          VALUES($1, $2, $3, $4, $5) 
          returning "id", "service_id", "user_id", "pet_id", "create_at", "total`,
      [service_id, user_id, pet_id, create_at, total] 
    );
    return storage_order[0];
}

const getAllStorageServicedb = async () => {
    const { rows: AllStorageService } = await pool.query(
      `SELECT ss.*, sr.user_id, sr.pet_id, so.total
       FROM "storage" ss
       JOIN "storage_orders" so ON ss.service_id = so.service_id
       JOIN "room" ro ON ss.room_id = ro.id`,
    )
    return AllStorageService;
}

const getAllBeautyServicedb = async() => {
  const { rows: AllBeautyService} = await pool.query(
    `SELECT bs.*, br.user_id, br.pet_id, bo.total
    FROM "beautyServices" bs
    JOIN "beautyRegistations" br on bs.service_id = br.service_id
    JOIN "beautyOrders" bo on bo.service_id = bs.service_id `,
  )
  return AllBeautyService;
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

const getBeautyServicebyIDdb = async (service_id) => {
  const { rows: BeautyServicebyID } = await pool.query(
    `SELECT ss.*, sr.user_id, sr.pet_id, so.total
       FROM "beautyServices" ss
       JOIN "beautyRegistations" sr ON ss.service_id = sr.service_id
       JOIN "beautyOrders" so ON ss.service_id = so.service_id
       WHERE ss.service_id = $1`,
    [service_id],
  )
  return BeautyServicebyID;
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

const getBeautyServicebyUser_IDdb = async (user_id) => {
  const { rows: BeautyServicebyUser_ID } = await pool.query(
    `SELECT ss.*, sr.user_id, sr.pet_id, so.total
       FROM "beautyServices" ss
       JOIN "beautyRegistations" sr ON ss.service_id = sr.service_id
       JOIN "beautyOrders" so ON ss.service_id = so.service_id
       WHERE sr.user_id = $1`,
    [user_id],
  )
  return BeautyServicebyUser_ID;
}

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
  time
}) => {
  const { rows: updatedRowBeautyService } = await pool.query(
    `UPDATE "beautyServices"
    set status=$1, date=$2, time_Slot=$3, note=$4
    WHERE service_id=$5
    returning service_id, status, date, time_slot, note`,
    [status, date_1, time_slot, note, service_id],
  )
  const {rows: updateRowBeautyRegistation} = await pool.query(
    `UPDATE "beautyRegistations"
    set pet_id=$1
    WHERE service_id=$2
    returning service_id, user_id, pet_id`,
    [pet_id, service_id]
  );
  const {rows: updateRowBeautyOrder} = await pool.query(
    `UPDATE "beautyOrders"
    set date=$1, total=$2
    WHERE service_id=$3
    returning order_id, service_id, type, date, total`,
    [date_2, total, service_id]
  );
  const time_slot = updatedRowBeautyService.time_slot;
  const { rows: updateTime_Slot } = await pool.query(
    `UPDATE "time_Slots
    set time=$1
    WHERE time_slot=$2
    returning time_slot, time`,
    [time, time_slot],
  );
  console.log({
    updatedRowBeautyService,
    updateRowBeautyRegistation,
    updateRowBeautyOrder,
    updateTime_Slot
  })
  return {
    updatedRowBeautyService,
    updateRowBeautyRegistation,
    updateRowBeautyOrder,
    updateTime_Slot
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
  date
}) => {
  const { rows: updatedRowStorageService } = await pool.query(
    `UPDATE "storageServices"
    set status=$1, room_id=$2, date_start=$3, date_end=$4, note=$5
    WHERE service_id=$6
    returning service_id, status, room_id, date_start, date_end, note`,
    [status, room_id, date_start, date_end, note, service_id],
  )
  const { rows: updateRowStorageRegistation } = await pool.query(
    `UPDATE "storageRegistations"
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
  // console.log({
  //   updatedRowStorageService,
  //   updateRowStorageRegistation,
  //   updateRowStorageOrder,
  // })
  return {
    updatedRowStorageService,
    updateRowStorageRegistation,
    updateRowStorageOrder,
  }
}

const createBeautyServicedb = async ({
    status,
    date_1,
    time_slot,
    note
  }) => {
    const { rows: BeautyService } = await pool.query(
      `INSERT INTO "beautyServices"(status, date, time_slot, note) 
          VALUES($1, $2, $3, $4) 
          returning service_id, status, date, time_slot, note`,
      [status, date_1, time_slot, note]
    );
    return BeautyService[0];
  };
const createBeautyServiceRegistationdb = async({
  service_id,
  user_id,
  pet_id
}) => {
  const {rows : BeautyServiceRegistation} = await pool.query(
    `INSERT INTO "beautyRegistations"("service_id","user_id", "pet_id")
      VALUES($1,$2,$3)
      returning "service_id", "user_id", "pet_id"`,
      [service_id,user_id,pet_id]
  ) ;
  return BeautyServiceRegistation[0];
}

const createBeautyOrderdb = async({
  type, date_2, total, service_id
}) => {
  const { rows: BeautyOrder } = await pool.query(
    `INSERT INTO "beautyOrders"(type, date, total, service_id)
     VALUES($1,$2,$3,$4)
     returning order_id, type, date, total, service_id`,
     [type, date_2, total, service_id]
  );
  return BeautyOrder[0];
}


module.exports = {
  createStorageServicedb,
  createBeautyServicedb,
  createBeautyServiceRegistationdb,
  createBeautyOrderdb,
  getAllStorageServicedb,
  getStorageServicebyIDdb,
  getStorageServicebyUser_IDdb,
  deleteStorageServicedb,
  updateStorageServicedb,
  getAllBeautyServicedb,
  getBeautyServicebyIDdb,
  getBeautyServicebyUser_IDdb,
  deleteBeautyServicedb,
  updateBeautyServicedb,
  createStorage_Orderdb
}
