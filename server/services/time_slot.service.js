const { getTimeSlotbyID } = require('../db/timeSlot.db')
const { ErrorHandler } = require('../helpers/error')

class time_slotService {
    getTime_SlotbyID = async(id) => {
        try {
            return await getTimeSlotbyID(id);
        } catch (error) {
            console.log(error);
            throw new ErrorHandler(error.statusCode, 'getTimeSlotbyID False');
        }
    } 
}
module.exports = new time_slotService()
