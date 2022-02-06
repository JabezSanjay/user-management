const express = require('express');
const {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getOneUser,
  restoreUser,
} = require('../controllers/User');
const router = express.Router();

//Create user
router.route('/user/create').post(createUser);
//Read users or user
router.route('/users').get(getAllUsers);
router.route('/user/:id').get(getOneUser);
//Update user
router.route('/user/update/:id').put(updateUser);
//Delete or Restore user
router.route('/user/delete/:id').delete(deleteUser);
router.route('/user/restore/:id').put(restoreUser);

module.exports = router;
