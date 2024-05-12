const {
  createStorageService,
  getAllStorageService,
  getStorageServicebyID,
  getStorageServicebyUser_ID,
  deleteStorageService,
  updateStorageService,
} = require('../controllers/services.controller')
const {
  getAllUsers,
} = require('../controllers/users.controller')
const router = require("express").Router();
// const verifyAdmin = require("../middleware/verifyAdmin");
const verifyToken = require("../middleware/verifyToken");

router.use(verifyToken);
// router.route('/').get(verifyAdmin, getAllUsers)
router.route('/CreateStorageService').post(createStorageService)
router.route('/getAllStorageService').get(getAllStorageService)
router.route('/getStorageServicebyID').get(getStorageServicebyID);
router.route('/getStorageServicebyUser_ID').get(getStorageServicebyUser_ID);
router.route('/deleteStorageService').delete(deleteStorageService);
router.route('/updateStorageService').put(updateStorageService);
module.exports = router;

