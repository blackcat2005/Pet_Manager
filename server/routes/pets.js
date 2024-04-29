const { 
    createPet,
    getPetList,
    getPetById,
    deletePet,
    updatePet
 } = require("../controllers/pets.controller")
const router = require("express").Router();
const verifyAdmin = require("../middleware/verifyAdmin");
const verifyToken = require("../middleware/verifyToken");

router.use(verifyToken);
router.route("/:user_id/add-pet").post(createPet);
router.route("/pet-list").get(getPetList);
router.route("/:pet_id").get(getPetById).put(updatePet).delete(deletePet);
module.exports = router;