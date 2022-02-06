const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a name!'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please enter an email!'],
    unique: [true, 'Email already exists!'],
    validate: [validator.isEmail, 'Please enter a valid email!'],
  },
  photo: {
    id: String,
    secureUrl: String,
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Please enter a date of birth!'],
  },
  country: {
    type: String,
    required: [true, 'Please enter a country!'],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  updatedAt: Date,
  updatedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('User', userSchema);
