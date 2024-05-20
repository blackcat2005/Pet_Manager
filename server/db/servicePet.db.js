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

const updateStorageServiceStatusdb = async({id, status}) => {
  try {
      await pool.query(`BEGIN`)

      const { rows: existingStorage } = await pool.query(
        `SELECT * FROM storage where id = $1`,
        [id],
      )
      if (existingStorage.length == 0) {
        await pool.query(`ROLLBACK`)
        return { message: 'storage not found' }
      }

      const updateStatusQuery = `
      UPDATE storage
      SET "status " = $1
      WHERE id = $2
    `
      await pool.query(updateStatusQuery, [status, id])

      await pool.query('COMMIT')

      return { message: 'storage status successfully updated' }
  } catch (error) {
      await pool.query('ROLLBACK');
      console.error('Error in updateStorageServiceStatusdb:', error);
      throw new ErrorHandler(500, 'Internal server error');
  }

}
const createBeautydb = async({status, date, time_slot, note}) => {
  const { rows: beauty } = await pool.query(
    `INSERT INTO beauty(status, date, note, time_slot) 
        VALUES($1, $2, $3, $4) 
        returning id, status, date, note, time_slot`,
    [status, date, note, time_slot],
  )
  return beauty[0]
}

const createBeautyOrderdb = async ({
  service_id,
  user_id,
  pet_id,
  create_at, 
  total,
}) => {
  const { rows: beauty_order } = await pool.query(
    `INSERT INTO "beauty_orders"("service_id", "user_id","pet_id","create_at","total") 
        VALUES($1, $2, $3, $4, $5) 
        returning "id", "service_id", "user_id", "pet_id", "total", "create_at"`,
    [service_id, user_id, pet_id, create_at, total],
  )
  return beauty_order[0];
}

const getBeautysByDateAndTimeSlotdb = async (date, time_slot) => {
  const { rows: beautys } = await pool.query(
    `SELECT * FROM beauty 
       WHERE date::date = $1::date AND time_slot = $2`,
    [date, time_slot],
  )
  return beautys;
}

const getAllBeautybyUser_IDdb = async (user_id, isAdmin) => {
  let queryString = `
    SELECT beauty.*, beauty_orders.*
    FROM beauty
    INNER JOIN beauty_orders ON beauty.id = beauty_orders.service_id
  `
  const queryParams = []

  if (!isAdmin) {
    queryString += ' WHERE beauty_orders.user_id = $1'
    queryParams.push(user_id)
  }

  try {
    const { rows: allAppointments } = await pool.query(queryString, queryParams)
    return allAppointments
  } catch (error) {
    console.error('Error fetching beautys:', error)
    throw error
  }
}

const getBeautybyIDdb = async ({id}) => {
  const { rows: beautyById } = await pool.query(
    `SELECT beauty.*, beauty_orders.*
    FROM beauty
    INNER JOIN beauty_orders ON beauty.id = beauty_orders.service_id
    WHERE beauty.id = $1`,
    [id],
  )
  if (beautyById.length === 0) {
    return { message: 'No appointment found with the specified ID' }
  }
  return beautyById[0];
}

const deleteBeautydb = async (id) => {
  try {

    await pool.query('BEGIN')

    await pool.query('DELETE FROM beauty_orders WHERE service_id = $1', [
      id,
    ])

    const { rowCount } = await pool.query(
      'DELETE FROM beauty WHERE id = $1',
      [id],
    )

    if (rowCount === 0) {
      await pool.query('ROLLBACK')
      return { message: 'No beauty found with the specified ID' }
    }

    await pool.query('COMMIT')

    return { message: 'beauty successfully deleted' }
  } catch (error) {
    await pool.query('ROLLBACK')
    console.error('Error in deleteBeautydb:', error)
    throw error
  }
}

const updateBeautydb = async ({ id, date, note, time_slot, pet_id }) => {
  try {
    await pool.query('BEGIN')

    const { rows: existingBeauty } = await pool.query(
      'SELECT * FROM beauty WHERE id = $1',
      [id],
    )

    if (existingBeauty.length === 0) {
      await pool.query('ROLLBACK')
      return { message: 'Appointment not found' }
    }

    const { rows: existingBeautyOrder } = await pool.query(
      'SELECT * FROM beauty_orders WHERE service_id = $1',
      [id],
    )

    if (existingBeautyOrder.length === 0) {
      await pool.query('ROLLBACK')
      return { message: 'Beauty order not found' }
    }

    const updateBeautyQuery = `
      UPDATE beauty
      SET date = $1, note = $2, time_slot = $3
      WHERE id = $4
    `
    await pool.query(updateBeautyQuery, [date, note, time_slot, id])

    const updateAppointmentOrdersQuery = `
      UPDATE beauty_orders
      SET pet_id = $1
      WHERE service_id = $2
    `
    await pool.query(updateAppointmentOrdersQuery, [pet_id, id])

    await pool.query('COMMIT')

    return { message: 'Beauty successfully updated' }
  } catch (error) {
    await pool.query('ROLLBACK')
    console.error('Error in updateBeautydb:', error)
    throw new ErrorHandler(500, 'Internal server error')
  }
}

const updateBeautyStatusdb = async ({ id, status }) => {
  try {
    await pool.query('BEGIN')

    const { rows: existingBeauty } = await pool.query(
      'SELECT * FROM beauty WHERE id = $1',
      [id],
    )

    if (existingBeauty.length === 0) {
      await pool.query('ROLLBACK')
      return { message: 'Beauty not found' }
    }

    const updateStatusQuery = `
      UPDATE beauty
      SET status = $1
      WHERE id = $2
    `
    await pool.query(updateStatusQuery, [status, id])

    await pool.query('COMMIT')

    return { message: 'Beauty status successfully updated' }
  } catch (error) {
    await pool.query('ROLLBACK')
    console.error('Error in updateBeautyStatusdb:', error)
    throw new ErrorHandler(500, 'Internal server error')
  }
}


const getDetailPetdb = async ({ id }) => {
  const petQuery = `      
      SELECT 
        p.pet_id, p.fullname, p.species, p.age, p.weight, p.sex, p.health, p.describe, 
        u.user_id, u.username, u.email, u.fullname AS owner_name
      FROM 
        pets p
      JOIN 
        users u ON p.user_id = u.user_id
      WHERE 
        p.pet_id = $1`
  const petResult = await pool.query(petQuery, [id])
  if (petResult.rows.length === 0) {
    return { message: 'Pet not found' }
  }
  const petDetails = petResult.rows[0]
const serviceQuery = `
      SELECT 
        so.id AS order_id, 
        'storage' AS service_type, 
        s."status ", 
        s.date_start AS service_date, 
        so.total
      FROM 
        storage_orders so
      JOIN 
        storage s ON so.service_id = s.id
      WHERE 
        so.pet_id = $1

      UNION

      SELECT 
        bo.id AS order_id, 
        'beauty' AS service_type, 
        b.status, 
        b.date AS service_date, 
        bo.total
      FROM 
        beauty_orders bo
      JOIN 
        beauty b ON bo.service_id = b.id
      WHERE 
        bo.pet_id = $1

      UNION

      SELECT 
        ao.id AS order_id, 
        'appointment' AS service_type, 
        a.status, 
        a.date AS service_date, 
        ao.total
      FROM 
        appointment_orders ao
      JOIN 
        appointments a ON ao.service_id = a.id
      WHERE 
        ao.pet_id = $1;
    `
  const serviceResult = await pool.query(serviceQuery, [id])
  const services = serviceResult.rows
  return {
    
    petDetails,
    services,
  }
}
const getPetDetailbyUser_IDdb = async({id}) => {
   const petQuery = `
      SELECT 
        p.pet_id, p.fullname AS pet_name, p.species, p.age, p.weight, p.sex, p.health, p.describe
      FROM 
        pets p
      WHERE 
        p.user_id = $1
    `;
  const petResult = await pool.query(petQuery, [id]);

  if (petResult.rows.length === 0) {
    throw new Error('Pet not found or does not belong to the user')
  }

  const pets = petResult.rows
  const servicesQuery = `
      SELECT 
        so.pet_id, 
        so.id AS order_id, 
        'storage' AS service_type, 
        s."status ", 
        s.date_start AS service_date, 
        so.total
      FROM 
        storage_orders so
      JOIN 
        storage s ON so.service_id = s.id
      WHERE 
        so.pet_id = ANY($1::int[])

      UNION

      SELECT 
        bo.pet_id, 
        bo.id AS order_id, 
        'beauty' AS service_type, 
        b.status, 
        b.date AS service_date, 
        bo.total
      FROM 
        beauty_orders bo
      JOIN 
        beauty b ON bo.service_id = b.id
      WHERE 
        bo.pet_id = ANY($1::int[])

      UNION

      SELECT 
        ao.pet_id, 
        ao.id AS order_id, 
        'appointment' AS service_type, 
        a.status, 
        a.date AS service_date, 
        ao.total
      FROM 
        appointment_orders ao
      JOIN 
        appointments a ON ao.service_id = a.id
      WHERE 
        ao.pet_id = ANY($1::int[])
    `;
  const petIds = pets.map((pet) => pet.pet_id)

  const serviceResult = await pool.query(servicesQuery, [petIds])
  const services = serviceResult.rows;
  const petsWithServices = pets.map((pet) => ({
    ...pet,
    services: services.filter((service) => service.pet_id === pet.pet_id),
  }))
  return petsWithServices
}
module.exports = {
  createStorageServicedb,
  createStorage_Orderdb,
  getAllStorageServiceDB,
  getStorageServicebyIDdb,
  getStorageServicebyUser_IDdb,
  deleteStorageServicedb,
  updateStorageServicedb,
  updateStorageServiceStatusdb,

  createBeautydb,
  createBeautyOrderdb,
  getBeautysByDateAndTimeSlotdb,
  getBeautybyIDdb,
  getAllBeautybyUser_IDdb,
  deleteBeautydb,
  updateBeautydb,
  updateBeautyStatusdb,

  getDetailPetdb,
  getPetDetailbyUser_IDdb,
}
