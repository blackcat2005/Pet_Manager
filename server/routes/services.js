const {
  createStorageService,
  getAllStorageService,
  getStorageServicebyID,
  getStorageServicebyUser_ID,
  deleteStorageService,
  updateStorageService,

  createTimeSlot,

  createAppointment,
  getAllAppointmentbyUser_ID,
  getAppointmentbyID,
  deleteAppointment,
  updateAppointment



} = require('../controllers/services.controller')
const {
  getAllUsers,
} = require('../controllers/users.controller')
const router = require("express").Router();
// const verifyAdmin = require("../middleware/verifyAdmin");
const verifyToken = require("../middleware/verifyToken");

router.use(verifyToken);
// router.route('/').get(verifyAdmin, getAllUsers)

//Storage
router.route('/CreateStorageService').post(createStorageService)
router.route('/getAllStorageService').get(getAllStorageService)
router.route('/getStorageServicebyID').get(getStorageServicebyID);
router.route('/getStorageServicebyUser_ID').get(getStorageServicebyUser_ID);
router.route('/deleteStorageService').delete(deleteStorageService);
router.route('/updateStorageService').put(updateStorageService);

//Time slot
router.route('/add-time-slot').post(createTimeSlot)

//Beauty

// Appointment
router.route('/appointment/CreateAppointment').post(createAppointment);
router.route('/appointment/getAllAppointmentbyUser_ID').get(getAllAppointmentbyUser_ID);
router.route('/appointment/getAllAppointmentbyID').get(getAppointmentbyID);
router.route('/appointment/deleteAppointment').delete(deleteAppointment);
router.route('/appointment/updateAppointment').put(updateAppointment);
module.exports = router;

