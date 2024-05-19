const {
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
  updateBeautyService,
} = require('../controllers/services.controller')
const {
  getAllUsers,
} = require('../controllers/users.controller')
const router = require("express").Router();   
// const verifyAdmin = require("../middleware/verifyAdmin");
const verifyToken = require("../middleware/verifyToken");

router.use(verifyToken);
// router.route('/').get(verifyAdmin, getAllUsers)
router.route('/CreateStorageService').post(createStorageService);
router.route('/getAllStorageService').get(getAllStorageService);
router.route('/getStorageServicebyID').get(getStorageServicebyID);
router.route('/getStorageServicebyUser_ID').get(getStorageServicebyUser_ID);
router.route('/deleteStorageService').delete(deleteStorageService);
router.route('/updateStorageService').put(updateStorageService);
router.route('/createBeautyService').post(createBeautyService);
router.route('/getAllBeautyService').get(getAllBeautyService);
router.route('/getBeautyServicebyID').get(getBeautyServicebyID);
router.route('/getBeautyServicebyUser_ID').get(getBeautyServicebyUser_ID);
router.route('/deleteBeautyService').delete(deleteBeautyService);
router.route('/updateBeautyService').put(updateBeautyService);
module.exports = router;

