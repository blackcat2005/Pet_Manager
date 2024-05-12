const {
  getAllUsers,
  createUser,
  deleteUser,
  getUserById,
  updateUser,
  getUserProfile,
} = require('../controllers/users.controller')
const router = require('express').Router()
const verifyStaff = require('../middleware/verifyAdmin')
const verifyToken = require('../middleware/verifyToken')

router.use(verifyToken)
router.route('/').get(verifyStaff, getAllUsers).post(verifyStaff, createUser)
router.route('/profile').get(getUserProfile)
router.route('/:user_id').get(getUserById).put(updateUser).delete(deleteUser)

module.exports = router
