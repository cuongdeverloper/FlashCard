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
        gender: userRecord.gender
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


module.exports = {
  apiLogin
};
