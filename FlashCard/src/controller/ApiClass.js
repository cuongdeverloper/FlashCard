const Class = require('../modal/Class');
const User = require('../modal/User'); // Importing User model

const createClass = async (req, res) => {
    console.log('Request body:', req.body); 

    try {
        const name = req.body.name;

        // Initialize students as an empty array if it's undefined
        const students = Array.isArray(req.body.students) ? req.body.students : [];

        const authenticatedUser = req.user;
        const creatorId = authenticatedUser.id;

        let validStudents = [];
        if (students.length > 0) {
            validStudents = await User.find({ 
                _id: { $in: students }
            });

            // Check if all provided users exist
            if (validStudents.length !== students.length) {
                return res.status(400).json({
                    errorCode: 5,
                    message: 'One or more user IDs are invalid'
                });
            }
        }

        // Create the new class
        const newClass = new Class({
            name,
            teacher: creatorId, 
            students: validStudents.map(student => student._id) // Store valid student IDs
        });

        await newClass.save();

        return res.status(201).json({
            errorCode: 0,
            message: 'Class created successfully',
            data: newClass
        });
    } catch (error) {
        console.error('Error creating class:', error);
        return res.status(500).json({
            errorCode: 6,
            message: 'An error occurred while creating the class'
        });
    }
};
  
  const getAllClasses = async (req, res) => {
    try {
      const authenticatedUser = req.user;
  
      const classes = await Class.find({
        $or: [
          { teacher: authenticatedUser._id },  // If user is the teacher (creator)
          { students: authenticatedUser._id }  // If user is a student in the class
        ]
      })
        .populate('students', 'username email')  // Populate student info
        .populate('teacher', 'username email');  // Populate teacher info
  
      return res.status(200).json({
        errorCode: 0,
        message: 'Classes retrieved successfully',
        data: classes
      });
    } catch (err) {
      console.error('Error fetching classes:', err);
      return res.status(500).json({
        errorCode: 6,
        message: 'An error occurred while fetching the classes'
      });
    }
  };
  
  const inviteStudentToClass = async (req, res) => {
    try {
      const { classId, studentId } = req.body;
  
      const authenticatedUser = req.user;
        console.log(authenticatedUser)
      // Find the class and check if the authenticated user is the teacher (creator of the class)
      const classData = await Class.findById(classId);
      if (!classData || classData.teacher.toString() !== authenticatedUser.id.toString()) {
        return res.status(403).json({
          errorCode: 7,
          message: 'You are not authorized to invite students to this class'
        });
      }
  
      // Check if the student exists and is not already in the class
      const student = await User.findById(studentId);
      if (!student || student.role !== 'student') {
        return res.status(404).json({
          errorCode: 8,
          message: 'Student not found or invalid role'
        });
      }
  
      if (classData.students.includes(studentId)) {
        return res.status(400).json({
          errorCode: 9,
          message: 'Student is already in the class'
        });
      }
  
      // Add the student to the class
      classData.students.push(studentId);
      await classData.save();
  
      return res.status(200).json({
        errorCode: 0,
        message: 'Student invited successfully',
        data: classData
      });
    } catch (error) {
      console.error('Error inviting student:', error);
      return res.status(500).json({
        errorCode: 6,
        message: 'An error occurred while inviting the student'
      });
    }
  };
  const getClassesForUser = async (req, res) => {
    try {
        const authenticatedUser = req.user; 
        const classes = await Class.find({
            $or: [
                { teacher: authenticatedUser.id },  // If user is the teacher (creator)
                { students: authenticatedUser.id }  // If user is a student in the class
            ]
        })
        .populate('students', 'username email')  // Populate student info
        .populate('teacher', 'username email');   // Populate teacher info

        return res.status(200).json({
            errorCode: 0,
            message: 'Classes retrieved successfully',
            data: classes
        });
    } catch (err) {
        console.error('Error fetching classes:', err);
        return res.status(500).json({
            errorCode: 6,
            message: 'An error occurred while fetching the classes'
        });
    }
};

const getClassByClassId = async (req, res) => {
  try {
    const { classId } = req.params;  
    const authenticatedUser = req.user;  


    const classData = await Class.findById(classId)
        .populate('students', 'username email') 
        .populate('teacher', 'username email');   

    if (!classData) {
        return res.status(404).json({
            errorCode: 1,
            message: 'Class not found'
        });
    }
    const isTeacher = classData.teacher._id.toString() === authenticatedUser.id.toString();
    const isStudent = classData.students.some(student => student._id.toString() === authenticatedUser.id.toString());

    if (!isTeacher && !isStudent) {
        return res.status(403).json({
            errorCode: 7,
            message: 'You are not authorized to view this class'
        });
    }

    return res.status(200).json({
        errorCode: 0,
        message: 'Class retrieved successfully',
        data: classData
    });
} catch (err) {
    console.error('Error fetching class by ID:', err);
    return res.status(500).json({
        errorCode: 6,
        message: 'An error occurred while fetching the class'
    });
}
};
  module.exports = { createClass, getAllClasses, inviteStudentToClass,getClassesForUser,getClassByClassId };