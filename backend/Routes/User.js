const express = require('express');
const { createUser } = require('../controllers/User');
const router = express.Router();

router.route('/user/create').post(createUser);

module.exports = router;
