const mongoose = require('mongoose');
const uploadCloud = require("../config/cloudinaryConfig");
const QuestionPack = require('../modal/QuestionPack');
const User = require('../modal/User'); // Assuming the User model is imported

const createQuestionPack = async (req, res) => {
  uploadCloud.single('imagePreview')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        errorCode: 4,
        message: `Upload Error: ${err.message}`
      });
    }

    const { title, description, teacher, semester, questions, subject } = req.body;
    const imagePreview = req.file ? req.file.path : null;

    // Validate required fields
    if (!title || !teacher || !semester || !subject) {
      return res.status(400).json({
        errorCode: 5,
        message: 'All required fields must be provided'
      });
    }


    try {
      // Check if the authenticated user is a teacher
      const authenticatedUser = req.user;
      if (authenticatedUser.role !== 'teacher') {
        return res.status(403).json({
          errorCode: 7,
          message: 'Only teachers can create question packs'
        });
      }

      // Check if the provided teacher ID exists in the User collection and has the role of "teacher"
      const teacherUser = await User.findById(teacher);
      if (!teacherUser || teacherUser.role !== 'teacher') {
        return res.status(404).json({
          errorCode: 8,
          message: 'Invalid teacher ID or the user is not a teacher'
        });
      }


      // Create the new question pack
      const newQuestionPack = new QuestionPack({
        title,
        description,
        teacher: new mongoose.Types.ObjectId(teacher), 
        semester,
        questions: questions ? questions.map(q => mongoose.Types.ObjectId(q)) : [],
        subject,
        imagePreview
      });

      // Save the question pack to the database
      await newQuestionPack.save();

      return res.status(201).json({
        errorCode: 0,
        message: 'Question pack created successfully',
        data: newQuestionPack
      });
    } catch (saveError) {
      console.error('Error saving question pack:', saveError);
      return res.status(500).json({
        errorCode: 6,
        message: 'An error occurred while saving the question pack'
      });
    }
  });
};
const getAllQuestionPack = async (req, res) => {
  try {
    // Retrieve all question packs from the database
    const questionPacks = await QuestionPack.find().populate('teacher', 'name email').populate('questions', 'content');

    // Send the question packs as the response
    return res.status(200).json({
      errorCode: 0,
      message: 'Question packs retrieved successfully',
      data: questionPacks
    });
  } catch (err) {
    console.error('Error fetching question packs:', err);
    return res.status(500).json({
      errorCode: 6,
      message: 'An error occurred while fetching the question packs'
    });
  }
};
const searchQuestionPack = async (req, res) => {
  const { query } = req.query;

  try {
    // Perform the search query with regex on multiple fields
    const questionPacks = await QuestionPack.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },    
        { semester: { $regex: query, $options: 'i' } }, 
        { subject: { $regex: query, $options: 'i' } }    
      ]
    })
    .populate('teacher', 'name email') 
    .populate('questions', 'content');

    // If no results are found, return a success response with an empty array
    if (questionPacks.length === 0) {
      return res.status(200).json({
        errorCode: 0,
        message: 'No question packs found',
        data: [] // Return an empty array
      });
    }

    // Return the found question packs
    return res.status(200).json({
      errorCode: 0,
      message: 'Question packs found',
      data: questionPacks
    });

  } catch (err) {
    console.error('Error searching question packs:', err);
    return res.status(500).json({
      errorCode: 6,
      message: 'An error occurred while searching the question packs'
    });
  }
};

module.exports = { createQuestionPack,getAllQuestionPack,searchQuestionPack };
