import { useState, useEffect } from "react";
import { FaTrash, FaUpload, FaReply } from "react-icons/fa"; // Add FaReply icon
import "./DetailFormQA.scss";
import { deleteCommentApi, getAllCommentFlashCard, postComment, postReplyComment,deleteReply } from '../../../../service/ApiService'
import Form from 'react-bootstrap/Form';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const DetailFormQA = (props) => {
  const { dataQuestion, currentQuestionIndex, isAnimating,idAuthor,idQp } = props;
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [loadingComments, setLoadingComments] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [file, setFile] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [reply, setReply] = useState({}); 
  const [showReplyForm, setShowReplyForm] = useState({});
  const userAcc = useSelector(state => state.user.account.id);
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  useEffect(()=>{
    console.log(userAcc)
  },[])
  useEffect(() => {
    setIsFlipped(false);
    
  }, [currentQuestionIndex]);
  useEffect(() => {
    if (isAuthenticated) {
      fetchComments();
    }
  }, [dataQuestion, currentQuestionIndex, page, isAuthenticated]);
  const fetchComments = async () => {
    if (dataQuestion && dataQuestion[currentQuestionIndex]) {
      const flashcardId = dataQuestion[currentQuestionIndex]._id;
      setLoadingComments(true);
      try {
        const response = await getAllCommentFlashCard(flashcardId, page);
        setComments(response.data || []);
        console.log(response)
        setTotalPages(response.totalPages || 1);
      } catch (error) {
        console.error("Error fetching comments:", error.message);
        setComments([]);
      } finally {
        setLoadingComments(false);
      }
    }
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
      const result = await postComment(userAcc, newComment, flashcardId, file);
      if (result) {
        console.log('Comment posted successfully:', result);
        await fetchComments();
        setNewComment("");
        setFile(null);
        setImageUrl('');
      }
    } catch (error) {
      console.error("Error posting comment:", error.message);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [dataQuestion, currentQuestionIndex, page]);

  const handleReplyChange = (e, commentId) => {
    setReply({ ...reply, [commentId]: e.target.value });
  };

  const handleToggleReplyForm = (commentId) => {
    setShowReplyForm({ ...showReplyForm, [commentId]: !showReplyForm[commentId] });
  };

  const handleReplySubmit = async (e, commentId) => {
    e.preventDefault();
    if (!reply[commentId]?.trim()) return;
    const token = Cookies.get('accessToken');

    if (!token) {
      localStorage.setItem('redirectAfterLogin', window.location.href);
      navigate('/login');
      return;
    }



    try {
      console.log('sex', userAcc, reply[commentId], commentId)
      const result = await postReplyComment(commentId, userAcc, reply[commentId]);

      console.log('cac', result)
      if (result && result.errorCode === 0) {

        setReply({ ...reply, [commentId]: "" }); // Clear reply input for this comment
        await fetchComments(); // Refresh the comments to show the new reply
      }
    } catch (error) {
      console.error("Error posting reply:", error.message);
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
      let response = await deleteCommentApi(idQp,commentId);
      if (response && response.errorCode === 0) {
        toast.success("Comment deleted successfully");
        await fetchComments();
      }
    } catch (error) {
      console.error('Error deleting comment:', error.message);
    }
  };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleDeleteReply = async (commentId, replyId) => {
    try {
      const response = await deleteReply(commentId, replyId);
      console.log(response)
      if (response && response.errorCode === 0) {
        toast.success(response.message);
        await fetchComments(); 
      }
    } catch (error) {
      console.error('Error deleting reply:', error.message);
    }
  };
  return (
    <div className="flashcard-container">
      <div
        className={`flashcard ${isFlipped ? "flipped" : ""} ${isAnimating ? "animating" : ""}`}
        onClick={handleCardClick}
      >
        <div className="flashcard-front">
          <p>{dataQuestion[currentQuestionIndex]?.questionText}</p>
          {dataQuestion[currentQuestionIndex]?.questionImage && (
            <img
              src={dataQuestion[currentQuestionIndex].questionImage}
              alt="Question"
              style={{ height: "80%", width: "auto" }}
            />
          )}
        </div>
        <div className="flashcard-back">
          {dataQuestion[currentQuestionIndex]?.correctAnswers?.length ? (
            <ul>
              {dataQuestion[currentQuestionIndex].correctAnswers.map((correctAnswerIndex, idx) => (
                <li key={idx}>{dataQuestion[currentQuestionIndex].answers[correctAnswerIndex]}</li>
              ))}
            </ul>
          ) : <p>No correct answers available</p>}
        </div>
      </div>

      <button onClick={() => setShowComments(!showComments)}>
        {showComments ? "Hide Comments" : "Show Comments"}
      </button>

      {showComments && (
        <div className="comments-section">
          <h4>Comments</h4>

          {/* If user is not authenticated, show login prompt */}
          {!isAuthenticated ? (
            <p>You must log in to see comments.</p>
          ) : (
            loadingComments ? (
              <p>Loading comments...</p>
            ) : comments.length > 0 ? (
              <ul>
              {comments.map(comment => (
                <li key={comment._id}>
                  <img src={comment.user.image} alt="Author" style={{ height: '50px', width: '50px' }} />
                  <div className="comment-content">
                    <p><strong>{comment.user.username}:</strong> {comment.content}</p>
                    {comment.image && <img src={comment.image} alt="Comment" style={{ width: '100px' }} />}
                    <span className="comment-date">
                      {new Date(comment.createdAt).toLocaleDateString()} {new Date(comment.createdAt).toLocaleTimeString()}
                    </span>
            
                    {/* Điều kiện hiển thị nút xóa nếu người dùng là tác giả */}
                    {(comment.user._id === userAcc || idAuthor === userAcc )&& (
                      <button className="delete-button" onClick={()  => handleDeleteComment(comment._id)}>
                        <FaTrash /> 
                      </button>
                    )}
            
                    <button onClick={() => handleToggleReplyForm(comment._id)}>
                      <FaReply /> Reply
                    </button>
            
                    {/* Hiển thị form trả lời khi người dùng muốn trả lời */}
                    {showReplyForm[comment._id] && (
                      <form onSubmit={(e) => handleReplySubmit(e, comment._id)}>
                        <textarea
                          value={reply[comment._id] || ""}
                          onChange={(e) => handleReplyChange(e, comment._id)}
                          placeholder="Add a reply..."
                          rows="2"
                        />
                        <button type="submit">Reply</button>
                      </form>
                    )}
                  </div>
            
                  {/* Phần hiển thị reply */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="reply">
                      <ul>
                        {comment.replies.map(reply => (
                          <li key={reply._id}>
                            <p><strong>{reply.user.username}:</strong> {reply.content}</p>
            
                            {/* Hiển thị nút xóa reply nếu người dùng là tác giả hoặc người viết comment */}
                            {(reply.user === userAcc || userAcc === idAuthor) && (
                              <button onClick={() => handleDeleteReply(comment._id, reply._id)}>
                                <FaTrash /> 
                              </button>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            
            ) : <p>No comments yet.</p>
          )}

          {/* Pagination */}
          {isAuthenticated && (
            <div className="pagination-controls">
              <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                Previous
              </button>
              <span>Page {page} of {totalPages}</span>
              <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
                Next
              </button>

            </div>

          )}
          <form onSubmit={handleCommentSubmit}>
            <textarea
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Add a comment..."
              rows="3"
              required
            />
            <Form.Group style={{padding:"10px 0"}}>
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