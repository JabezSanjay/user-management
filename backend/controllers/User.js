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

exports.updateUser = BigPromise(async (req, res, next) => {
  const { name, email, dateOfBirth, country } = req.body;
  const { id } = req.params;
  const updatedData = {
    name,
    email,
    dateOfBirth,
    country,
  };
  if (req.files) {
    const user = await User.findById(id);
    await cloudinary.v2.uploader.destroy(user.photo.id);
    const updatedPhoto = await cloudinary.v2.uploader.upload(
      req.files.photo.tempFilePath,
      {
        folder: 'user-management-users',
        width: 150,
        crop: 'scale',
      }
    );
    updatedData.photo = {
      id: updatedPhoto.public_id,
      secureUrl: updatedPhoto.secure_url,
    };
  }
  await User.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: 'User updated successfully!',
  });
});

exports.deleteUser = BigPromise(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new CustomError('User not found!', 404, res));
  }
  await User.findByIdAndUpdate(
    req.params.id,
    {
      isDeleted: true,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    message: 'User deleted successfully!',
  });
});

exports.getAllUsers = BigPromise(async (req, res, next) => {
  const users = await User.find({ isDeleted: false });
  res.status(200).json({
    success: true,
    users,
  });
});

exports.getAllDeletedUsers = BigPromise(async (req, res, next) => {
  const users = await User.find({ isDeleted: true });
  res.status(200).json({
    success: true,
    users,
  });
});

exports.getOneUser = BigPromise(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new CustomError('User not found!', 404, res));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

exports.restoreUser = BigPromise(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new CustomError('User not found!', 404, res));
  }
  await User.findByIdAndUpdate(
    req.params.id,
    {
      isDeleted: false,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    message: 'User restored successfully!',
  });
});
