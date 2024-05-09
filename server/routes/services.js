const { 
    createStorageService
 } = require("../controllers/services.controller")

const router = require("express").Router();
const verifyAdmin = require("../middleware/verifyAdmin");
const verifyToken = require("../middleware/verifyToken");

router.use(verifyToken);
router.route("/service").post(createStorageService);

