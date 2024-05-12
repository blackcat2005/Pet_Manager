const petService = require("../services/pets.service");
const userService = require("../services/users.service");
const { ErrorHandler } = require("../helpers/error");
const servicesServices = require("../services/services.service");
const createStorageService = async (req,res) => {
    const {status, room_id, date_start, date_end, note, pet_id, room_type, service_type, number, total, user_id, date} = req.body;
    // const {user_id} = req.params;
    // console.log(user_id);
    const user = await userService.getUserById(user_id);

    if (!user){
        throw new ErrorHandler(404, "User not found");
    }
    if (+user_id === req.user.user_id || req.user.roles.include("admin")){
        const RoomInfo = await servicesServices.createRoomInfo({
            room_type,number
        });
        const StorageService = await servicesServices.createStorageService({
            status, room_id, date_start, date_end, note
        });
        const StorageRegistation = await servicesServices.createStorageRegistation({
            user_id, pet_id
        });
        const service_id = StorageRegistation.service_id;
        // console.log(service_id);
        const StorageOrder = await servicesServices.createStorageOrder({
            service_id, service_type, date, total
        });

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

const getAllStorageService = async(req, res) => {
    const { user_id } = req.user;

    const user = await userService.getUserById(user_id);
    if (!user) {
        throw new ErrorHandler(404, "User not found");
    }
    if (+user_id === req.user.user_id || req.user.roles.includes("admin")) {
        const AllStorageService = await servicesServices.getAllStorageService()
        res.status(201).json({
            status: "success",
            AllStorageService,
        });
        console.log(user_id);
    } else {
        throw new ErrorHandler(401, "Unauthorized");
    }
  };
const getStorageServicebyID = async(req, res) => {
    const { user_id } = req.user

    const user = await userService.getUserById(user_id)
    if (!user) {
      throw new ErrorHandler(404, 'User not found')
    }
    if (+user_id === req.user.user_id || req.user.roles.includes('admin')) {
        const { service_id } = req.body
        const StorageServicebyID = await servicesServices.getStorageServicebyID(service_id)
        res.status(200).json({
            status: 'success',
            StorageServicebyID,
        })
      console.log(user_id)
    } else {
      throw new ErrorHandler(401, 'Unauthorized')
    }
}
const getStorageServicebyUser_ID = async(req, res) => {
    const {user_id} =  req.user;
    const user = await userService.getUserById(user_id);
    if (!user){
        throw new ErrorHandler(404, 'User not found');
    }
    if (+user_id === req.user.user_id || req.user.roles.includes('admin')){
        const getStorageServicebyUser_ID =  await servicesServices.getStorageServicebyUser_ID(user_id);
        res.status(200).json({
        status: 'success',
        getStorageServicebyUser_ID,
        })
    } else {
         throw new ErrorHandler(401, 'Unauthorized')
    }
}
const deleteStorageService = async(req, res) => {
    const { user_id } = req.user
    const {service_id} = req.body;
    const user = await userService.getUserById(user_id)
    if (!user) {
      throw new ErrorHandler(404, 'User not found')
    }
    if (+user_id === req.user.user_id || req.user.roles.includes('admin')) {
      const deleteStorageService = await servicesServices.deleteStorageService(service_id)
      res.status(200).json({
        status: 'success',
        deleteStorageService,
      })
    } else {
      throw new ErrorHandler(401, 'Unauthorized')
    }
}
const updateStorageService =  async(req, res) => {
    const { user_id } = req.user
    const {
      service_id,
      status,
      room_id,
      date_start,
      date_end,
      note,
      pet_id,
      total,
      date,
    } = req.body
    const user = await userService.getUserById(user_id)
    if (!user) {
      throw new ErrorHandler(404, 'User not found')
    }
    if (+user_id === req.user.user_id || req.user.roles.includes('admin')) {
      const updateStorageService = await servicesServices.updateStorageService({
        service_id,
        status,
        room_id,
        date_start,
        date_end,
        note,
        pet_id,
        total,
        date,
        })
      res.status(200).json({
        status: 'success',
        updateStorageService,
      })
    } else {
      throw new ErrorHandler(401, 'Unauthorized')
    }   
}
module.exports = {
  createStorageService,
  getAllStorageService,
  getStorageServicebyID,
  getStorageServicebyUser_ID,
  deleteStorageService,
  updateStorageService,
}