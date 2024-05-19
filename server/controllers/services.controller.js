const petService = require("../services/pets.service");
const userService = require("../services/users.service");
const { ErrorHandler } = require("../helpers/error");
const servicesServices = require("../services/services.service");
const createStorageService = async (req,res) => {
    const { room_id, date_start, date_end, note, pet_id, total, create_at} = req.body;
    const user_id = req.params['user_id'];
    console.log(user_id);
    const status = "created";
    const user = await userService.getUserById(user_id);

    if (!user){
        throw new ErrorHandler(404, "User not found");
    }
    if (+user_id === req.user.user_id || req.user.roles.includes("admin")){
        const StorageService = await servicesServices.createStorageService({
            status, room_id, date_start, date_end, note
        });
        const service_id = StorageService.service_id;
        const StorageOrder = await servicesServices.createStorageOrder({
            service_id, user_id, pet_id, create_at, total
        });
        
        res.status(201).json({
            status: "success",
            StorageService,
            StorageOrder,
        });   
    }else {
        throw new ErrorHandler(401, "Unauthorized");
    }
};

const createBeautyService = async (req, res) => {
  const {
    status,
    date_1,
    note,
    pet_id,
    type,
    date_2,
    total,
    user_id,
    time
  } = req.body
  // const {user_id} = req.params;
  // console.log(user_id);
  const user = await userService.getUserById(user_id)

  if (!user) {
    throw new ErrorHandler(404, 'User not found')
  }
  if (+user_id === req.user.user_id || req.user.roles.includes('admin')) {
    const TimeSlot = await servicesServices.createTimeSlot({
      time
    });
    const time_slot = TimeSlot.time_slot;
    const BeautyService = await servicesServices.createBeautyService({
      status,
      date_1,
      time_slot,
      note,
    })
    const service_id = BeautyService.service_id
    const BeautyRegistation = await servicesServices.createBeautyServiceRegistation({
      service_id,
      user_id,
      pet_id,
    })
    // console.log(service_id);
    const BeautyOrder = await servicesServices.createBeautyOrder({
      type,
      date_2,
      total,
      service_id,
    })

    res.status(201).json({
      status: 'success',
      BeautyService,
      BeautyRegistation,
      BeautyOrder,
      TimeSlot,
    })
  } else {
    throw new ErrorHandler(401, 'Unauthorized')
  }
}
const getAllStorageService = async(req, res) => {
    const { user_id } = req.user;

    const user = await userService.getUserById(user_id);
    if (!user) {
        throw new ErrorHandler(404, "User not found");
    }
    if (req.user.roles.includes("admin")) {
        const AllStorageService = await servicesServices.getAllStorageService()
        res.status(201).json({
            status: "success",
            AllStorageService,
        });
        console.log(user_id);
    } else {
        throw new ErrorHandler(401, "No Permission");
    }
  };

const getAllBeautyService = async(req,res) => {
    const { user_id } = req.user

    const user = await userService.getUserById(user_id)
    if (!user) {
      throw new ErrorHandler(404, 'User not found')
    }
    if (req.user.roles.includes('admin')) {
      const AllBeautyService = await servicesServices.getAllBeautyService();
      res.status(201).json({
        status: 'success',
        AllBeautyService,
      })
      console.log(user_id)
    } else {
      throw new ErrorHandler(401, 'No Permission')
    }  
}
const getStorageServicebyID = async(req, res) => {
    const { user_id } = req.user

    const user = await userService.getUserById(user_id)
    if (!user) {
      throw new ErrorHandler(404, 'User not found')
    }
    if (req.user.roles.includes('admin')) {
        const { service_id } = req.body
        const StorageServicebyID = await servicesServices.getStorageServicebyID(service_id)
        res.status(200).json({
            status: 'success',
            StorageServicebyID,
        })
      console.log(user_id)
    } else {
      throw new ErrorHandler(401, 'Unauthorized');
    }
}

const getBeautyServicebyID = async (req, res) => {
  const { user_id } = req.user

  const user = await userService.getUserById(user_id)
  if (!user) {
    throw new ErrorHandler(404, 'User not found')
  }
  const a = req.user.roles.includes('admin');
  console.log(a);
  if (a) {
    const { service_id } = req.body
    const BeautyServicebyID = await servicesServices.getBeautyServicebyID(
      service_id,
    )
    res.status(200).json({
      status: 'success',
      BeautyServicebyID,
    })
    console.log(user_id)
  } else {
    throw new ErrorHandler(401, 'No Permission')
  }
}

const getStorageServicebyUser_ID = async(req, res) => {
    const {user_id} =  req.user;
    const user = await userService.getUserById(user_id);
    if (!user){
        throw new ErrorHandler(404, 'User not found');
    }
    if (+user_id === req.user.user_id || req.user.roles.includes('admin')) {
      const getStorageServicebyUser_ID =
        await servicesServices.getStorageServicebyUser_ID(user_id)
      res.status(200).json({
        status: 'success',
        getStorageServicebyUser_ID,
      })
    } else {
      throw new ErrorHandler(401, 'Unauthorized')
    }
}

const getBeautyServicebyUser_ID = async(req, res) => {
    const {user_id} =  req.user;
    // console.log("user_id = " + user_id);
    const user = await userService.getUserById(user_id);
    if (!user){
        throw new ErrorHandler(404, 'User not found');
    }
    if (+user_id === req.user.user_id || req.user.roles.includes('admin')) {
      const BeautyServicebyUser_ID =
        await servicesServices.getBeautyServicebyUser_ID(user_id)
      res.status(200).json({
        status: 'success',
        BeautyServicebyUser_ID,
      })
    } else {
      throw new ErrorHandler(401, 'No Permission')
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

const deleteBeautyService = async (req, res) => {
  const { user_id } = req.user
  const { service_id } = req.body
  const user = await userService.getUserById(user_id)
  if (!user) {
    throw new ErrorHandler(404, 'User not found')
  }
  if (+user_id === req.user.user_id || req.user.roles.includes('admin')) {
    const deleteBeautyService = await servicesServices.deleteBeautyService(service_id)
    res.status(200).json({
      status: 'success',
      deleteBeautyService,
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

const updateBeautyService = async (req, res) => {
  const { user_id } = req.user
  const {
    service_id,
    status,
    date_1,
    note,
    pet_id,
    total,
    date_2,
    time,
  } = req.body
  const user = await userService.getUserById(user_id)
  if (!user) {
    throw new ErrorHandler(404, 'User not found')
  }
  if (+user_id === req.user.user_id || req.user.roles.includes('admin')) {
    const updateBeautyService = await servicesServices.updateBeautyService({
      service_id,
      status,
      date_1,
      note,
      pet_id,
      total,
      date_2,
      time,
    })
    res.status(200).json({
      status: 'success',
      updateBeautyService,
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
  createBeautyService,
  getAllBeautyService,
  getBeautyServicebyID,
  getBeautyServicebyUser_ID,
  deleteBeautyService,
  updateBeautyService
}