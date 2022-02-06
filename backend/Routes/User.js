const express = require('express');
const {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getOneUser,
} = require('../controllers/User');
const router = express.Router();

router.route('/user/create').post(createUser);
router.route('/user/update/:id').put(updateUser);
router.route('/user/delete/:id').delete(deleteUser);
router.route('/users').get(getAllUsers);
router.route('/user/:id').get(getOneUser);

module.exports = router;
