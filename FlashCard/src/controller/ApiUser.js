const uploadCloud = require("../config/cloudinaryConfig");
const User = require("../modal/User");

const addUser = async (req, res) => {
  uploadCloud.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: `Image upload error: ${err.message}` });
    }

    const { username, password, role, email, phoneNumber, gender } = req.body;
    const image = req.file ? req.file.path : null; // Retrieve the uploaded image URL

    if (!username || !password || !role || !email || !phoneNumber || !gender) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const validRoles = ['teacher', 'student', 'admin'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role.' });
    }

    try {
      const newUser = new User({
        username,
        password,
        role,
        email,
        phoneNumber,
        gender,
        image
      });

      // Save user to the database
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      if (error.code === 11000) { // Duplicate value error code
        return res.status(400).json({ message: 'Username or email already exists.' });
      }
      res.status(500).json({ message: 'Error registering user', error });
    }
  });
};
const getUserFromUserId = async(req,res) =>{
  try {
    let{userId} = req.params;
    if(!userId) {
      return res.status(400).json({ message: 'Invalid userId.' })
    }
    const userData = await User.findById(userId);
    return res.status(200).json({
      errorCode: 0,
      message: 'Get user success',
      data: userData
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorCode: 7,
      message: 'An error occurred while find user'
    });
  }
}
module.exports = { addUser,getUserFromUserId };
