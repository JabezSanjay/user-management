const express = require('express');
const { createUser, updateUser } = require('../controllers/User');
const router = express.Router();

router.route('/user/create').post(createUser);
router.route('/user/update/:id').put(updateUser);

module.exports = router;
