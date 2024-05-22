const {
  createAppointment,
  getAllAppointmentbyUser_ID,
  getAppointmentbyID,
  deleteAppointment,
  updateAppointment,
  updateAppointmentStatus,
} = require('../controllers/servicesAppointment.controller')
const router = require('express').Router()
const verifyStaff = require('../middleware/verifyAdmin')
const verifyToken = require('../middleware/verifyToken')

router.use(verifyToken)
// Appointment
router.route('/CreateAppointment').post(createAppointment)
router.route('/getAllAppointmentbyUser_ID').get(getAllAppointmentbyUser_ID)
router.route('/getAllAppointmentbyID').get(verifyStaff, getAppointmentbyID)
router.route('/deleteAppointment').delete(deleteAppointment)
router.route('/updateAppointment').put(updateAppointment)
router.route('/updateStatus').put(verifyStaff, updateAppointmentStatus)
module.exports = router
