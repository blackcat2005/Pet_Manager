const petService = require("../services/pets.service");
const userService = require("../services/users.service");
const { ErrorHandler } = require("../helpers/error");
const servicesServices = require("../services/services.service");
const createStorageService = async (req, res) => {
  const { status, room_id, date_start, date_end, note, pet_id, room_type, service_type, number, total, user_id, date } = req.body;
  // const {user_id} = req.params;
  // console.log(user_id);
  const user = await userService.getUserById(user_id);

  if (!user) {
    throw new ErrorHandler(404, "User not found");
  }
  if (+user_id === req.user.user_id || req.user.roles.include("admin")) {
    const RoomInfo = await servicesServices.createRoomInfo({
      room_type, number
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
  } else {
    throw new ErrorHandler(401, "Unauthorized");
  }
};

const getAllStorageService = async (req, res) => {
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
const getStorageServicebyID = async (req, res) => {
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
const getStorageServicebyUser_ID = async (req, res) => {
  const { user_id } = req.user;
  const user = await userService.getUserById(user_id);
  if (!user) {
    throw new ErrorHandler(404, 'User not found');
  }
  if (+user_id === req.user.user_id || req.user.roles.includes('admin')) {
    const getStorageServicebyUser_ID = await servicesServices.getStorageServicebyUser_ID(user_id);
    res.status(200).json({
      status: 'success',
      getStorageServicebyUser_ID,
    })
  } else {
    throw new ErrorHandler(401, 'Unauthorized')
  }
}
const deleteStorageService = async (req, res) => {
  const { user_id } = req.user
  const { service_id } = req.body;
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
const updateStorageService = async (req, res) => {
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

//Time slot
const createTimeSlot = async (req, res) => {
  const { times } = req.body;
  if (req.user.roles.includes("admin")) {
    // Mảng để lưu trữ kết quả trả về từ cơ sở dữ liệu
    const dbResults = [];

    // Lặp qua từng thời gian trong times
    for (const timeValue of times) {
      const { time } = timeValue;
      // Gọi hàm tạo time_slot và lưu kết quả vào mảng
      const result = await servicesServices.createTimeSlot({
        time // Sử dụng time từ file JSON
      });
      dbResults.push(result);
    }

    res.status(201).json({
      status: "success",
      time_slots: dbResults, // Trả về kết quả trả về từ cơ sở dữ liệu
    });
  } else {
    throw new ErrorHandler(401, "Unauthorized");
  }
};

const getTimeSlotById = async (req, res) => {
  const { id } = req.params;

  try {
    // Gọi hàm dịch vụ để lấy time_slot theo id
    const timeSlot = await servicesServices.getTimeSlotById(id);

    // Kiểm tra nếu time_slot không tồn tại
    if (!timeSlot) {
      return res.status(404).json({
        status: "error",
        message: "Time slot not found",
      });
    }

    // Trả về thông tin time_slot
    res.status(200).json({
      status: "success",
      timeSlot,
    });
  } catch (error) {
    // Xử lý lỗi
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};


// Appointment
const createAppointment = async (req, res) => {
  const { date, note, time_slot, pet_id } = req.body;
  const { user_id } = req.user
  total = 0.00;
  const user = await userService.getUserById(user_id)
  if (!user) {
    throw new ErrorHandler(404, "User not found");
  }
  if (+user_id === req.user.user_id || req.user.roles.include("admin")) {
    const currentDate = new Date();
    const appointmentDate = new Date(date);
    // Kiểm tra nếu date nhỏ hơn hôm nay
    if (appointmentDate < currentDate.setHours(0, 0, 0, 0)) {
      throw new ErrorHandler(400, "The appointment date cannot be in the past.");
    }
    // Kiểm tra time_slot trong bảng time_slot
    const timeSlot = await servicesServices.getTimeSlotById(time_slot);
    if (!timeSlot) {
      throw new ErrorHandler(404, "Time slot not found");
    }

    const [hours, minutes] = timeSlot.time.split(':').map(Number);
    const appointmentTime = new Date(date);
    appointmentTime.setHours(hours, minutes, 0, 0);

    // Nếu ngày hẹn là hôm nay và thời gian hẹn nhỏ hơn thời gian hiện tại
    if (appointmentDate.toDateString() === currentDate.toDateString() && appointmentTime < new Date()) {
      throw new ErrorHandler(400, "The appointment time cannot be in the past.");
    }
    // Kiểm tra trùng lặp date và time_slot nếu trạng thái không phải 'canceled' hoặc 'completed'
    const existingAppointments = await servicesServices.getAppointmentsByDateAndTimeSlot(date, time_slot);
    if (existingAppointments.some(app => app.status !== 'canceled' && app.status !== 'completed')) {
      throw new ErrorHandler(400, "The time slot is already booked for the selected date.");
    }

    const appointment = await servicesServices.createAppointment({
      date, note, time_slot
    });
    let service_id = appointment.id;
    const appointment_order = await servicesServices.createAppointmentOrder({
      service_id, user_id, pet_id, total
    });

    res.status(201).json({
      status: "success",
      appointment,
      appointment_order
    });
  } else {
    throw new ErrorHandler(401, "Unauthorized");
  }
}

const getAllAppointmentbyUser_ID = async (req, res) => {
  const { user_id, roles } = req.user;

  const user = await userService.getUserById(user_id);
  const isAdmin = roles.includes("admin");
  if (!user) {
    throw new ErrorHandler(404, "User not found");
  }
  if (+user_id === req.user.user_id || isAdmin) {
    const allAppointment = await servicesServices.getAllAppointmentbyUser_ID(user_id, isAdmin)
    res.status(201).json({
      status: "success",
      allAppointment,
    });
    console.log(user_id);
  } else {
    throw new ErrorHandler(401, "Unauthorized");
  }
};

const getAppointmentbyID = async (req, res) => {
  const { user_id } = req.user

  const user = await userService.getUserById(user_id)
  if (!user) {
    throw new ErrorHandler(404, 'User not found')
  }
  if (+user_id === req.user.user_id || req.user.roles.includes('admin')) {
    const { id } = req.body
    const appointmentById = await servicesServices.getAppointmentbyID(id)
    res.status(200).json({
      status: 'success',
      appointmentById,
    })
  } else {
    throw new ErrorHandler(401, 'Unauthorized')
  }
}

const deleteAppointment = async (req, res) => {
  const { user_id } = req.user
  const { id } = req.body;
  const user = await userService.getUserById(user_id)
  if (!user) {
    throw new ErrorHandler(404, 'User not found')
  }
  if (+user_id === req.user.user_id || req.user.roles.includes('admin')) {
    const delete_appointment = await servicesServices.deleteAppointment(id)
    res.status(200).json({
      status: 'success',
      delete_appointment,
    })
  } else {
    throw new ErrorHandler(401, 'Unauthorized')
  }
}

const updateAppointment = async (req, res) => {
  const { user_id } = req.user
  const {
    id, date, note, time_slot, pet_id
  } = req.body
  const user = await userService.getUserById(user_id)
  if (!user) {
    throw new ErrorHandler(404, 'User not found')
  }
  if (+user_id === req.user.user_id || req.user.roles.includes('admin')) {
    const update_appointment = await servicesServices.updateAppointment({
      id, date, note, time_slot, pet_id
    })
    res.status(200).json({
      status: 'success',
      update_appointment,
    })
  } else {
    throw new ErrorHandler(401, 'Unauthorized')
  }
}

const updateAppointmentStatus = async (req, res) => {
  // const { user_id } = req.user
  const { id, status } = req.body;
  // const user = await userService.getUserById(user_id)
  // if (!user) {
  //   throw new ErrorHandler(404, 'User not found')
  // }
  // Kiểm tra xem trạng thái có hợp lệ không
  const validStatuses = ['complete', 'canceled', 'processing'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid status"
    });
  }

  try {
    if (req.user.roles.includes('admin') || req.user.roles.includes('staff')) {
      const response = await servicesServices.updateAppointmentStatus({ id, status });
      if (response.message === "Appointment not found") {
        return res.status(404).json({
          status: "error",
          message: response.message
        });
      }

      res.status(200).json({
        status: "success",
        message: response.message
      });
    } else if (req.user.roles.includes('customer')) {
      // Customer chỉ có thể hủy (canceled) cuộc hẹn
      if (status !== 'canceled') {
        return res.status(401).json({
          status: "error",
          message: "Unauthorized action"
        });
      }

      const response = await servicesServices.updateAppointmentStatus({ id, status });
      if (response.message === "Appointment not found") {
        return res.status(404).json({
          status: "error",
          message: response.message
        });
      }

      res.status(200).json({
        status: "success",
        message: response.message
      });
    } else {
      throw new ErrorHandler(401, 'Unauthorized')
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};
module.exports = {
  createStorageService,
  getAllStorageService,
  getStorageServicebyID,
  getStorageServicebyUser_ID,
  deleteStorageService,
  updateStorageService,

  createTimeSlot,
  getTimeSlotById,

  createAppointment,
  getAllAppointmentbyUser_ID,
  getAppointmentbyID,
  deleteAppointment,
  updateAppointment,
  updateAppointmentStatus,


}