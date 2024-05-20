const pool = require('../config')

const getTimeSlotbyID = async({id}) => {
  const { rows: TimeSlot } = await pool.query(
    `SELECT * FROM "time_slot_beauty" WHERE id = $1`,
    [id],
  )
  return TimeSlot[0];
}
module.exports = { getTimeSlotbyID };