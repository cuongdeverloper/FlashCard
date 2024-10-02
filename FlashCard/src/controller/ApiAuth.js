const uploadCloud = require('../config/cloudinaryConfig');
const { createJWT, createRefreshToken } = require('../middleware/JWTAction');
const user = require('../modal/User');
const bcrypt = require('bcrypt');
require('dotenv').config();

const apiLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        errorCode: 1,
        message: 'Email and password are required'
      });
    }

    const userRecord = await user.findOne({ email });
    if (!userRecord) {
      return res.status(400).json({
        errorCode: 2,
        message: 'Email does not exist'
      });
    }


    const isPasswordValid = await bcrypt.compare(password, userRecord.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        errorCode: 3,
        message: 'Invalid password'
      });
    }

    const payload = {
      id:userRecord._id,
      email: userRecord.email,
      role: userRecord.role,
    };

    const accessToken = createJWT(payload);
    const refreshToken = createRefreshToken(payload);

    if (!accessToken || !refreshToken) {
      return res.status(500).json({
        errorCode: 4,
        message: 'Failed to create tokens'
      });
    }  

    return res.status(200).json({
      errorCode: 0,
      message: 'Login successful',
      data: {
        id: userRecord._id,
        access_token: accessToken,
        refresh_token: refreshToken,
        username: userRecord.username,
        role: userRecord.role,
        email: userRecord.email,
        phoneNumber: userRecord.phoneNumber,
        gender: userRecord.gender,
        image:userRecord.image
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      errorCode: 5,
      message: 'An error occurred during login'
    });
  }
};

const apiRegister = async (req, res) => {
  try {
    // Use multer for image uploads
    uploadCloud.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          errorCode: 4,
          message: `Upload Error: ${err.message}`,
        });
      }

      const { username, email, password, phoneNumber, gender, role } = req.body;
      const image = req.file ? req.file.path : null; // Retrieve the uploaded image path

      if (!username || !email || !password || !phoneNumber || !gender) {
        return res.status(400).json({
          errorCode: 1,
          message: 'All fields are required',
        });
      }

      // Check if email already exists
      const existingUser = await user.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          errorCode: 2,
          message: 'Email already exists',
        });
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10); // Use 10 rounds for hashing

      // Create new user
      const newUser = new user({
        username,
        email,
        password: hashedPassword, // Store the hashed password
        phoneNumber,
        gender,
        role: role || 'student',
        image,
      });

      await newUser.save();

      // Create JWT tokens
      const payload = {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
      };

      const accessToken = createJWT(payload);
      const refreshToken = createRefreshToken(payload);

      if (!accessToken || !refreshToken) {
        return res.status(500).json({
          errorCode: 4,
          message: 'Failed to create tokens',
        });
      }

      return res.status(201).json({
        errorCode: 0,
        message: 'Registration successful',
        data: {
          id: newUser._id,
          access_token: accessToken,
          refresh_token: refreshToken,
          username: newUser.username,
          role: newUser.role,
          email: newUser.email,
          phoneNumber: newUser.phoneNumber,
          gender: newUser.gender,
          image, 
        },
      });
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      errorCode: 5,
      message: 'An error occurred during registration',
    });
  }
};


module.exports = {
  apiLogin,apiRegister
};
