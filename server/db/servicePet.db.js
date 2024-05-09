const pool = require("../config");

const createStorageServicedb = async ({
    status,
    room_id,
    date_start,
    date_end,
    note,
  }) => {
    const { rows: StorageService } = await pool.query(
      `INSERT INTO storageServices(status, room_id, date_start, date_end, note) 
          VALUES($1, $2, $3, $4, $5) 
          returning service_id, status, room_id, date_start, date_end, note`,
      [status, room_id, date_start, date_end, note]
    );
    return StorageService[0];
  };

const createStorageRegistationdb = async ({
    user_id,
    pet_id
  }) => {
    const { rows: StorageRegistation } = await pool.query(
      `INSERT INTO storageRegistations(user_id, pet_id) 
          VALUES($1, $2) 
          returning service_id, user_id, pet_id`,
      [user_id, pet_id]
    );
    return StorageRegistation[0];
  };  
const createRoomInfodb = async({
    type,
    number
}) => {
    const {rows: RoomInfo} = await pool.query(
        `INSERT INTO roomInfo(type, number) 
          VALUES($1, $2) 
          returning room_id, type, number`,
      [type, number] 
    );
    return RoomInfo[0];
}

const createStorageOrderdb = async({
    service_id,
    type,
    date,
    total
}) => {
    const {rows: StorageOrder} = await pool.query(
        `INSERT INTO stogareOrders(service_id,type,date,total) 
          VALUES($1, $2, $3, $4) 
          returning order_id, service_id, type, date, total`,
      [service_id, type, date, total] 
    );
    return StorageOrder[0];
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

module.exports = {
    createStorageServicedb,
    createRoomInfodb, 
    createStorageRegistationdb,
    createStorageOrderdb,
    createBeautyServicedb,
    createAppointmentdb
}
