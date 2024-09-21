const uploadCloud = require('../config/cloudinaryConfig');
const Comment = require('../modal/Comment');
const FlashCard = require('../modal/FlashCard');

const addComment = async (req, res) => {
    uploadCloud.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          errorCode: 7,
          message: `Upload Error: ${err.message}`
        });
      }
  
      const { user, content, flashcardId } = req.body;
      let imageUrl = '';
  
      if (req.file) {
        // Retrieve the image URL from the file path provided by multer-storage-cloudinary
        imageUrl = req.file.path; // The path should be the URL provided by Cloudinary
      }
  
      if (!user || !content || !flashcardId) {
        return res.status(400).json({
          errorCode: 5,
          message: 'User, content, and flashcardId are required fields'
        });
      }
  
      try {
        const newComment = new Comment({
          user,
          content,
          image: imageUrl, // Save the image URL
          flashcard: flashcardId
        });
  
        await newComment.save();
  
        // Optionally: Update the flashcard to include the new comment if needed
        await FlashCard.findByIdAndUpdate(
          flashcardId,
          { $push: { comments: newComment._id } },
          { new: true }
        );
  
        return res.status(201).json({
          errorCode: 0,
          message: 'Comment added successfully',
          data: newComment
        });
      } catch (error) {
        console.error('Error adding comment:', error);
        return res.status(500).json({
          errorCode: 6,
          message: 'An error occurred while adding the comment'
        });
      }
    });
  };
  const getComments = async (req, res) => {
    const { flashcardId } = req.params;
    const { page = 1, limit = 4 } = req.query; 

    try {
        const comments = await Comment.find({ flashcard: flashcardId })
            .skip((page - 1) * limit)  // Calculate offset
            .limit(parseInt(limit))    // Limit number of results
            .populate({
                path: 'user',
                select: 'username email phoneNumber gender image role type' // include user ID here if necessary
            });

        const totalComments = await Comment.countDocuments({ flashcard: flashcardId });
console.log(req.user)
        res.status(200).json({
            errorCode: 0,
            message: 'Comments retrieved successfully',
            data: comments.map(comment => ({
                ...comment.toObject(),
                isOwner: comment.user.toString() === req.user.id // Check if the comment's user ID matches the current user's ID
            })),
            total: totalComments,
            page: parseInt(page),
            totalPages: Math.ceil(totalComments / limit)
        });
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({
            errorCode: 6,
            message: 'An error occurred while fetching comments'
        });
    }
};



const getCommentById = async (req, res) => {
    const { commentId } = req.params;

    try {
        // Find the comment by its ID and populate the user field for more information
        const comment = await Comment.findById(commentId).populate({
            path: 'user',
            select: 'username' // Include username in the response
        });

        if (!comment) {
            return res.status(200).json({
                errorCode: 0,
                message: 'No comments found for this Flashcard',
                data: [] // Return an empty array instead of an error
            });
        }

        res.status(200).json({
            errorCode: 0,
            message: 'Comment retrieved successfully',
            data: comment
        });
    } catch (error) {
        console.error('Error fetching comment:', error);
        res.status(500).json({
            errorCode: 6,
            message: 'An error occurred while fetching the comment'
        });
    }
};
const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user.id; // Assuming you're storing user info in req.user

  try {
      const comment = await Comment.findById(commentId);

      // Check if comment exists
      if (!comment) {
          return res.status(404).json({
              errorCode: 1,
              message: 'Comment not found'
          });
      }

      // Check if the user is the owner of the comment
      if (comment.user.toString() !== userId) {
          return res.status(403).json({
              errorCode: 2,
              message: 'You are not authorized to delete this comment'
          });
      }

      // Delete the comment
      await Comment.findByIdAndDelete(commentId);

      // Optionally: Remove the comment ID from the related flashcard
      await FlashCard.findByIdAndUpdate(
          comment.flashcard,
          { $pull: { comments: commentId } }
      );

      return res.status(200).json({
          errorCode: 0,
          message: 'Comment deleted successfully'
      });
  } catch (error) {
      console.error('Error deleting comment:', error);
      return res.status(500).json({
          errorCode: 6,
          message: 'An error occurred while deleting the comment'
      });
  }
};

module.exports = { addComment, getComments, getCommentById, deleteComment };

