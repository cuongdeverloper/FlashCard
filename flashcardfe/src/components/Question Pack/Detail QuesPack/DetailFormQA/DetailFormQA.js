import { useState, useEffect } from "react";
import { FaTrash, FaUpload } from "react-icons/fa"; // Import upload icon from react-icons
import "./DetailFormQA.scss";
import { deleteCommentApi, getAllCommentFlashCard, postComment } from "../../../../service/ApiService";
import Form from 'react-bootstrap/Form';
import Cookies from 'js-cookie'; // Import Cookies for token management
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { toast } from "react-toastify";

const DetailFormQA = (props) => {
  const { dataQuestion, currentQuestionIndex, isAnimating, idAuthor } = props;
  const navigate = useNavigate(); // Initialize navigate
  const [isFlipped, setIsFlipped] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [loadingComments, setLoadingComments] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [file, setFile] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setIsFlipped(false);
  }, [currentQuestionIndex]);

  const fetchComments = async () => {
    if (dataQuestion && dataQuestion[currentQuestionIndex]) {
      const flashcardId = dataQuestion[currentQuestionIndex]._id;

      setLoadingComments(true);
      try {
        const response = await getAllCommentFlashCard(flashcardId, page);
        setComments(response.data || []);
        setTotalPages(response.totalPages || 1);
      } catch (error) {
        console.error("Error fetching comments:", error.message);
        setComments([]);
      } finally {
        setLoadingComments(false);
      }
    }
  };

  const handleDeleteComment = async (commentId) => {
    const token = Cookies.get('accessToken');

    if (!token) {
        localStorage.setItem('redirectAfterLogin', window.location.href);
        navigate('/login');
        return;
    }

    try {
        let response = await deleteCommentApi(commentId);
        if (response && response.errorCode === 0) {
          toast.success(response.message)
        }
        await fetchComments();
        console.log('Comment deleted successfully');
    } catch (error) {
        console.error('Error deleting comment:', error.message);
    }
};

  useEffect(() => {
    fetchComments(); // Initial fetch on mount

  }, [dataQuestion, currentQuestionIndex, page]);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImageUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    const flashcardId = dataQuestion[currentQuestionIndex]._id;

    const token = Cookies.get('accessToken');
    if (!token) {
      // If not authenticated, redirect to login and store the current URL
      localStorage.setItem('redirectAfterLogin', window.location.href);
      navigate('/login');
      return;
    }

    try {
      const result = await postComment(idAuthor, newComment, flashcardId, file);
      if (result) {
        console.log('Comment posted successfully:', result);
        await fetchComments(); // Refresh comments after posting
        setNewComment("");
        setFile(null);
        setImageUrl('');
      }
    } catch (error) {
      console.error("Error posting comment:", error.message);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  if (!dataQuestion || !dataQuestion[currentQuestionIndex]) {
    return <p>Loading questions...</p>;
  }

  const currentQuestion = dataQuestion[currentQuestionIndex];

  return (
    <div className="flashcard-container">
      <div
        className={`flashcard ${isFlipped ? "flipped" : ""} ${isAnimating ? "animating" : ""}`}
        onClick={handleCardClick}
      >
        <div className="flashcard-front">
          <p>{currentQuestion.questionText}</p>
          {currentQuestion.questionImage && (
            <img
              src={currentQuestion.questionImage}
              alt="Question"
              style={{ height: "80%", width: "auto" }}
            />
          )}
        </div>
        <div className="flashcard-back">
          {currentQuestion.correctAnswers && currentQuestion.correctAnswers.length > 0 ? (
            <ul>
              {currentQuestion.correctAnswers.map((correctAnswerIndex, idx) => (
                <li key={idx}>
                  {currentQuestion.answers[correctAnswerIndex]}
                </li>
              ))}
            </ul>
          ) : (
            <p>No correct answers available</p>
          )}
        </div>
      </div>

      <button onClick={() => setShowComments(!showComments)}>
        {showComments ? "Hide Comments" : "Show Comments"}
      </button>

      {showComments && (
        <div className="comments-section">
          <h4>Comments</h4>
          {loadingComments ? (
            <p>Loading comments...</p>
          ) : comments.length > 0 ? (
            <ul>
              {comments.map((comment) => (
                <li key={comment._id}>
                  <img src={comment.user.image} style={{ height: '50px', width: '50px' }} alt="Author" />
                  <p><strong>{comment.user.username}:</strong> {comment.content}</p>
                  {comment.image && (
                    <img
                      src={comment.image}
                      alt="Comment"
                      style={{ width: '100px', height: 'auto' }}
                    />
                  )}
                  {comment.user._id === idAuthor && ( // Only show delete button if the user is the owner
                    <button onClick={() => handleDeleteComment(comment._id)}>
                      <FaTrash /> Delete
                    </button>
                  )}

                </li>
              ))}
            </ul>
          ) : (
            <p>No comments yet.</p>
          )}

          {/* Pagination Controls */}
          <div className="pagination-controls">
            <button onClick={handlePrevPage} disabled={page === 1}>
              Previous
            </button>
            <span>Page {page} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={page === totalPages}>
              Next
            </button>
          </div>

          <form onSubmit={handleCommentSubmit}>
            <textarea
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Add a comment..."
              rows="3"
              required
            />
            <Form.Group>
              <label htmlFor="file-upload" className="file-upload-label">
                <FaUpload size={24} style={{ cursor: 'pointer' }} />
              </label>
              <Form.Control
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Preview"
                  style={{ width: '100px', height: 'auto', marginTop: '10px' }}
                />
              )}
            </Form.Group>
            <button type="submit">Add Comment</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DetailFormQA;
