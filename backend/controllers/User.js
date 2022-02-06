const User = require('../models/User');
const cloudinary = require('cloudinary');
const BigPromise = require('../middleware/bigPromise');
const CustomError = require('../utils/customError');

exports.createUser = BigPromise(async (req, res, next) => {
  let photo;
  let newUser;
  const { name, email, dateOfBirth, country } = req.body;
  // Check if user already exists
  const user = await User.findOne({ email });
  if (user) {
    return next(new CustomError('User already exists', 400, res));
  }
  // Upload image to cloudinary
  if (req.files) {
    let file = req.files.photo;
    photo = await cloudinary.v2.uploader.upload(file.tempFilePath, {
      folder: 'user-management-users',
      width: 150,
      crop: 'scale',
    });
  }
  //Check if all required fields are present
  if (!name || !email || !dateOfBirth || !country) {
    return next(
      new CustomError('Please enter all the required fields!', 400, res)
    );
  }
  // Create new user
  if (req.files) {
    newUser = await User.create({
      name,
      email,
      dateOfBirth,
      country,
      photo: {
        id: photo.public_id,
        secureUrl: photo.secure_url,
      },
    });
  } else {
    newUser = await User.create({
      name,
      email,
      dateOfBirth,
      country,
    });
  }
  // Send response
  res.send({
    success: true,
    message: 'User created successfully',
  });
});
