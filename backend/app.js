//Express setup
const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');

//Regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: true }));

//File upload middleware
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })
);

//Morgan middleware
app.use(morgan('tiny'));

//Import all other routes
app.use('/api', require('./routes/User'));

module.exports = app;
