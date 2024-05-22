const {
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
router.route('/updateStorageServiceStatus').put(updateStorageServiceStatus);

router.route('/createBeauty').post(createBeauty);
router.route('/getAllBeautybyUser_ID').get(getAllBeautybyUser_ID);
router.route('/getBeautybyID').get(getBeautybyID);
router.route('/deleteBeauty').delete(deleteBeauty);
router.route('/updateBeauty').put(updateBeauty);
router.route('/updateBeautyStatus').put(updateBeautyStatus);

router.route('/detailPet').get(detailPet)

router.route('/servicePrice').get(servicePrice);
router.route('/allPrice').get(allPrice);
module.exports = router;

