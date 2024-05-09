const petService = require("../services/pets.service");
const userService = require("../services/users.service");
const { ErrorHandler } = require("../helpers/error");
const servicesServices = require("../services/services.service");
const createStorageService = async (req,res) => {
    const {status, room_id, date_start, date_end, note, pet_id, type, number} = req.body;
    const {user_id} = req.params;
    const user = await userService.getUserById(user_id);
    if (!user){
        throw new ErrorHandler(404, "User not found");
    }
    if (+user_id === req.user.user_id || req.user.roles.include("admin")){
        const StorageService = await servicesServices.createStorageService({
            status, room_id, date_start, date_end, note
        });

        const StorageRegistation = await servicesServices.createStorageRegistation({
            user_id, pet_id
        });

        const StorageOrder = await servicesServices.createStorageOrder({
            type, date, total
        });

        const RoomInfo = await servicesServices.createRoomInfo({
            type, number
        })
        res.status(201).json({
            status: "success",
            StorageService,
            StorageRegistation,
            StorageOrder,
            RoomInfo
        });   
    }else {
        throw new ErrorHandler(401, "Unauthorized");
    }
};

module.exports = {
    createStorageService
}