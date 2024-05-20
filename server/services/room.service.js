const { ErrorHandler } = require('../helpers/error')
const { getRoombyIDdb, updateRoomdb } = require('../db/room.db')
class RoomService {
  getRoombyID = async(room_id) => {
    try {
      const c = await getRoombyIDdb(room_id)
      return c;
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(error.statusCode, 'Get Room by Id false')
    }
  }
  updateRoom = async(Rooms) => {
    try {
        return await updateRoomdb(Rooms);
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(error.statusCode, 'Update room false')
    }
  }
}
module.exports = new RoomService()