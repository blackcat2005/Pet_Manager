const petService = require("../services/pets.service");
const userService = require("../services/users.service");
const { ErrorHandler } = require("../helpers/error");
const servicesServices = require("../services/services.service");
const roomService = require("../services/room.service");
const time_slotService = require("../services/time_slot.service");
const createStorageService = async (req, res) => {
  try {
    const {
      room_id,
      date_start,
      date_end,
      note,
      pet_id,
      total,
      create_at,
      user_id,
    } = req.body
    const user = await userService.getUserById(user_id)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (+user_id === req.user.user_id || req.user.roles.includes('admin')) {
      const room = await roomService.getRoombyID({ room_id })
      if (!room) {
        return res.status(404).json({ message: 'Room not found' })
      }

      const { max_slot, current_slot } = room
      if (current_slot < max_slot) {
        const storageService = await servicesServices.createStorageService({
          status: 'created',
          room_id,
          date_start,
          date_end,
          note,
        })

        const storageOrder = await servicesServices.createStorageOrder({
          service_id: storageService.id,
          user_id,
          pet_id,
          create_at,
          total,
        })

        const updatedRoom = await roomService.updateRoom({
          room_id,
          current_slot: current_slot + 1
        })

        return res.status(201).json({
          status: 'success',
          storageService,
          storageOrder,
          updatedRoom,
        })
      } else {
        return res.status(400).json({ message: 'Maximum slot reached' })
      }
    } else {
      return res.status(401).json({ message: 'Unauthorized' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
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


const getStorageServicebyID = async(req, res) => {
    const { user_id } = req.user

    const user = await userService.getUserById(user_id)
    if (!user) {
      throw new ErrorHandler(404, 'User not found')
    }
    if (req.user.roles.includes('admin')) {
        const { service_id } = req.body
        const StorageServicebyID = await servicesServices.getStorageServicebyID({service_id})
        res.status(200).json({
            status: 'success',
            StorageServicebyID,
        })
      console.log(user_id)
    } else {
      throw new ErrorHandler(401, 'Unauthorized');
    }
}



const getStorageServicebyUser_ID = async(req, res) => {
    const {user_id} =  req.user;
    const user = await userService.getUserById(user_id);
    if (!user){
        throw new ErrorHandler(404, 'User not found');
    }
      const getStorageServicebyUser_ID =
        await servicesServices.getStorageServicebyUser_ID({user_id})
      res.status(200).json({
        status: 'success',
        getStorageServicebyUser_ID,
      })
}


const deleteStorageService = async(req, res) => {
    const { user_id } = req.user
    const {service_id} = req.body;
    const user = await userService.getUserById(user_id)
    if (!user) {
      throw new ErrorHandler(404, 'User not found')
    }
    if (req.user.roles.includes('admin')) {
      const storage = await servicesServices.getStorageServicebyID({service_id})
      const room_id = storage[0].room_id
      const room = await roomService.getRoombyID({ room_id })
      const {current_slot} = room
      const newRoom = await roomService.updateRoom({
        room_id,
        current_slot: current_slot -1 ,
      })
      const deleteStorageService = await servicesServices.deleteStorageService({service_id})

      res.status(200).json({
        status: 'success',
        newRoom,
      })
    } else {
      throw new ErrorHandler(401, 'No permission')
    }
}

const updateStorageService =  async(req, res) => {
    const { user_id } = req.user
    const { service_id, room_id, note, pet_id, date_start, date_end } = req.body
    const user = await userService.getUserById(user_id)
    if (!user) {
      throw new ErrorHandler(404, 'User not found')
    }
    if (+user_id === req.user.user_id || req.user.roles.includes('admin')) {
      const storage = await servicesServices.getStorageServicebyID({service_id});
      const old_room_id = storage.room_id;
      console.log(old_room_id);
      const old_room = await roomService.getRoombyID({ room_id: old_room_id });
      const old_slot = old_room.current_slot;
      console.log(old_slot);
      const update_Oldroom = await roomService.updateRoom({
        room_id: old_room_id,
        current_slot: old_slot + 1,
      })
      const update_storage = await servicesServices.updateStorageService({
        id: service_id,
        room_id,
        note,
        pet_id,
        date_start,
        date_end,
      })
      const new_room = await roomService.getRoombyID({ room_id })
      const { current_slot } = new_room
      console.log("Current_slot = " + current_slot);
      console.log(new_room);
      console.log(old_room);
      const update_Newroom = await roomService.updateRoom({
        room_id,
        current_slot: current_slot -1
      });

      res.status(200).json({
        status: 'success',
        update_storage,
        update_Oldroom,
        update_Newroom,
      })
    } else {
      throw new ErrorHandler(401, 'Unauthorized')
    }   
}

const updateStorageServiceStatus =  async(req, res) => {
  const { id, status } = req.body;
  const validStatuses = ['complete', 'canceled', 'processing']
  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid status',
    })
  };
  try {
    if (req.user.roles.includes('admin') || req.user.roles.includes('staff')) {
      const response = await servicesServices.updateStorageServiceStatus({id, status});
      if (response.message == "storage not found") {
        return res.status(404).json({
          status: 'error',
          message: response.message,
        })
      }
      res.status(200).json({
        status: 'success',
        message: response.message,
      })
    } else {
      if (req.user.roles.includes('customer')) {
        if (status !== 'canceled') {
          return res.status(401).json({
            status: 'error',
            message: 'Unauthorized action',
          })
        }
        const response = await servicesServices.updateStorageServiceStatus({
          id,
          status,
        })
        if (response.message === 'storage not found') {
          return res.status(404).json({
            status: 'error',
            message: response.message,
          })
        }
        res.status(200).json({
          status: 'success',
          message: response.message,
        })
      }else {
        throw new ErrorHandler(401, 'Unauthorized');
      }
    }
  } catch (error) {
    res.status(500).json({
    status: "error",
    message: error.message
    });
  }
}

const createBeauty = async (req, res) => {
  const { date, note, time_slot, create_at, pet_id, total } = req.body
  const { user_id } = req.user
  const user = await userService.getUserById(user_id)
  if (!user) {
    throw new ErrorHandler(404, 'User not found')
  }
  if (+user_id === req.user.user_id || req.user.roles.include('admin')) {
    const currentDate = new Date()
    const beautyDate = new Date(date)
    // Kiểm tra nếu date nhỏ hơn hôm nay
    if (beautyDate < currentDate.setHours(0, 0, 0, 0)) {
      throw new ErrorHandler(400, 'The beauty date cannot be in the past.')
    }
    // Kiểm tra time_slot trong bảng time_slot
    const timeSlot = await time_slotService.getTime_SlotbyID({id: time_slot});
    if (!timeSlot) {
      throw new ErrorHandler(404, 'Time slot not found');
    }

    const [hours, minutes] = timeSlot.time.split(':').map(Number)
    const beautyTime = new Date(date)
    beautyTime.setHours(hours, minutes, 0, 0)

    // Nếu ngày hẹn là hôm nay và thời gian hẹn nhỏ hơn thời gian hiện tại
    if (
      beautyDate.toDateString() === currentDate.toDateString() &&
      beautyTime < new Date()
    ) {
      throw new ErrorHandler(400, 'The appointment time cannot be in the past.')
    }

    const beauty = await servicesServices.createBeauty({
      status: "created",
      date,
      note,
      time_slot,
    })
    let service_id = beauty.id
    const beauty_order = await servicesServices.createBeautyOrder({
      service_id,
      user_id,
      pet_id,
      create_at,
      total,
    })

    res.status(201).json({
      status: 'success',
      beauty,
      beauty_order,
    })
  } else {
    throw new ErrorHandler(401, 'Unauthorized')
  }
}

const getAllBeautybyUser_ID = async (req, res) => {
  const { user_id, roles } = req.user

  const user = await userService.getUserById(user_id)
  const isAdmin = roles.includes('admin')
  if (!user) {
    throw new ErrorHandler(404, 'User not found')
  }
  if (+user_id === req.user.user_id || isAdmin) {
    const allBeauty = await servicesServices.getAllBeautybyUser_ID(
      user_id,
      isAdmin,
    )
    res.status(201).json({
      status: 'success',
      allBeauty,
    })
    console.log(user_id)
  } else {
    throw new ErrorHandler(401, 'Unauthorized')
  }
}

const getBeautybyID = async (req, res) => {
  const { user_id } = req.user

  const user = await userService.getUserById(user_id)
  if (!user) {
    throw new ErrorHandler(404, 'User not found')
  }
  if (+user_id === req.user.user_id || req.user.roles.includes('admin')) {
    const { id } = req.body
    const beautyById = await servicesServices.getBeautybyID({id})
    res.status(200).json({
      status: 'success',
      beautyById,
    })
  } else {
    throw new ErrorHandler(401, 'Unauthorized')
  }
}

const deleteBeauty = async (req, res) => {
  const { user_id } = req.user
  const { id } = req.body
  const user = await userService.getUserById(user_id)
  if (!user) {
    throw new ErrorHandler(404, 'User not found')
  }
  if (+user_id === req.user.user_id || req.user.roles.includes('admin')) {
    const delete_beauty = await servicesServices.deleteBeauty(id)
    res.status(200).json({
      status: 'success',
      delete_beauty,
    })
  } else {
    throw new ErrorHandler(401, 'Unauthorized')
  }
}

const updateBeauty = async (req, res) => {
  const { user_id } = req.user
  const { id, date, note, time_slot, pet_id } = req.body
  const user = await userService.getUserById(user_id)
  if (!user) {
    throw new ErrorHandler(404, 'User not found')
  }
  if (+user_id === req.user.user_id || req.user.roles.includes('admin')) {
    const update_beauty = await servicesServices.updateBeauty({
      id,
      date,
      note,
      time_slot,
      pet_id,
    })
    res.status(200).json({
      status: 'success',
      update_beauty,
    })
  } else {
    throw new ErrorHandler(401, 'Unauthorized')
  }
}

const updateBeautyStatus = async (req, res) => {
  const { id, status } = req.body
  const validStatuses = ['complete', 'canceled', 'processing']
  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid status',
    })
  }

  try {
    if (req.user.roles.includes('admin') || req.user.roles.includes('staff')) {
      const response = await servicesServices.updateBeautyStatus({
        id,
        status,
      })
      if (response.message === 'Beauty not found') {
        return res.status(404).json({
          status: 'error',
          message: response.message,
        })
      }

      res.status(200).json({
        status: 'success',
        message: response.message,
      })
    } else if (req.user.roles.includes('customer')) {
      if (status !== 'canceled') {
        return res.status(401).json({
          status: 'error',
          message: 'Unauthorized action',
        })
      }

      const response = await servicesServices.updateBeautyStatus({
        id,
        status,
      })
      if (response.message === 'Beauty not found') {
        return res.status(404).json({
          status: 'error',
          message: response.message,
        })
      }

      res.status(200).json({
        status: 'success',
        message: response.message,
      })
    } else {
      throw new ErrorHandler(401, 'Unauthorized')
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    })
  }
}

  const detailPet = async (req, res) => {
    const { user_id } = req.user
    const user = await userService.getUserById(user_id);
    if (!user) {
      throw new ErrorHandler(404, 'User not found')
    }
    if (req.user.roles.includes('admin') || req.user.roles.includes('staff')) {
      const { id } = req.body;
      const pets = await servicesServices.getDetailPet({ id })
      res.status(200).json(pets)
    } else {
      if (+user_id === req.user.user_id) {
        const pets = await servicesServices.getPetDetailbyUser_ID({id: user_id});
        res.status(200).json(pets);
      } else {
        throw new ErrorHandler(401, 'Unauthorized')
      }
    }
  }
const servicePrice =  async(req, res) => {
  const { user_id } = req.user;
  const user = await userService.getUserById(user_id);
  if (!user) {
    throw new ErrorHandler(404, 'User not found')
  }
  if (+user_id === req.user.user_id) {
    const {name, room_id, time_slot} = req.body;
    if (!room_id) {
      if (name == 'Dịch vụ khám chữa bệnh') {
        const time_slot_price = await time_slotService.getTimeSlotApointment({
          id: time_slot,
        })
        console.log(time_slot_price)
        const { price, unit } = time_slot_price
        res.json({ 
          price: price,
          unit: unit
        })
      }
      if (name == 'Dịch vụ vệ sinh') {
        const time_slot_price = await time_slotService.getTime_SlotbyID({
          id: time_slot,
        })
        const { price, unit } = time_slot_price
        res.json({ price: price, unit: unit })
      }
    } else {
        const room = await roomService.getRoombyID({ room_id })
        const { price, unit } = room
        res.json({
          price: price,
          unit: unit,
        })
    }
  }else {
    throw new ErrorHandler(401, 'Unauthorized');
  }
}

const allPrice = async(req, res) => {
  res.json({
    storage : await roomService.allRoom(),
    beauty : await time_slotService.getAllTime_Slot_beauty(),
    appointment : await time_slotService.getAllTime_Slot_appointment()
  });
}

module.exports = {
  createStorageService,
  getAllStorageService,
  getStorageServicebyID,
  getStorageServicebyUser_ID,
  deleteStorageService,
  updateStorageService,
  updateStorageServiceStatus,

  createBeauty,
  getAllBeautybyUser_ID,
  getBeautybyID,
  deleteBeauty,
  updateBeauty,
  updateBeautyStatus,

  detailPet,

  servicePrice,
  allPrice,
}   