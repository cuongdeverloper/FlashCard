import axios from '../utils/AxiosCustomize';
import Cookies from 'js-cookie';
const LoginApi = (userEmail,userPassword) =>{
    return axios.post('auth', { email: userEmail, password: userPassword });

}
const registerUser = async (username, email, password, phoneNumber, gender, role, image) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phoneNumber', phoneNumber);
    formData.append('gender', gender);
    formData.append('role', role);
    if (image) {
        formData.append('image', image);
    }

    try {
        const response = await axios.post('/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
};

const loginWGoogle = () =>{
    return axios.get(`/auth/google/callback`)
}
const decodeDataGoogle = (token) =>{
    return axios.post(`/decode-token`, { token });
}

const getAllQuestionPack = () =>{
    return axios.get(`/questionPack`)
}
const getQuestionByQPId = (questionPackId) =>{
    return axios.get(`/questionPack/${questionPackId}`)
}
const getUserByUserId = (userId) =>{
    return axios.get(`/user/${userId}`)
}


const getUserId = async () => {
    try {
        const token = Cookies.get('accessToken');

        // Check if the token exists
        if (!token) {
            console.warn('No access token found');
            return null; 
        }

        // Proceed with the API request if the token exists
        const response = await axios.get('/id', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response;
    } catch (error) {
        console.error('Error fetching user ID:', error);
        return null;
    }
};

const createNewQuestionPackApi = async (title, description, teacher, semester, subject, imagePreviewQP) => {
    const token = Cookies.get('accessToken');

    if (!token) {
        throw new Error('No token found');
    }

    try {
        // Get the current user's ID to use as author
        const author = await getUserId();

        const FormData = require('form-data');
        const form = new FormData();
        form.append('title', title);
        form.append('description', description);
        form.append('teacher', teacher);
        form.append('semester', semester);
        form.append('subject', subject);
        form.append('imagePreviewQP', imagePreviewQP);
        form.append('author', author); // Add author to form data

        const response = await axios.post('/questionPack', form, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating question pack:', error.response ? error.response.data : error.message);
        throw error;
    }
};
const createQuestionToQuestionPackAPI = async (questionText, image, answers, correctAnswers, questionPackId) => {
    const token = Cookies.get('accessToken');

    if (!token) {
        throw new Error('No token found');
    }

    try {
        const formData = new FormData();
        formData.append('questionText', questionText);
        formData.append('questionPackId', questionPackId);
        if (image) {
            formData.append('image', image);
        }

        formData.append('answers', JSON.stringify(answers)); 
        formData.append('correctAnswers', JSON.stringify(correctAnswers)); 
        const response = await axios.post('/question', formData);

        return response;
    } catch (error) {
        console.error('Error creating question:', error);
        throw error;
    }
};

const getAllCommentFlashCard = async (flashcardId, page = 1) => {
    const token = Cookies.get('accessToken');

    // Check if the token exists
    if (!token) {
        console.warn('No access token found');
        // Optionally handle redirect or error
        return null; // Or throw an error based on your use case
    }

    try {
        const response = await axios.get(`/questionpack/comments/${flashcardId}?page=${page}`, {
            
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response; // Return the data from the response
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error; // Handle the error appropriately
    }
};

  const postComment = async (userId, commentContent, flashcardId, file) => {
    try {
        // Retrieve the token from cookies or local storage
        const token = Cookies.get('accessToken'); // Adjust if using a different method

        // If no token, open a new tab for login and save current URL for redirection
        if (!token) {
            const currentUrl = window.location.href; // Save the current URL
            localStorage.setItem('redirectAfterLogin', currentUrl); // Store it in localStorage
            window.open('/login', '_blank'); // Open login in a new tab/window
            return;
        }

        // Create a FormData object
        const formData = new FormData();
        formData.append('user', userId);
        formData.append('content', commentContent);
        formData.append('flashcardId', flashcardId);
        if (file) formData.append('image', file);

        // Send the POST request with the token in the Authorization header
        const response = await axios.post('/questionpack/comments', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Set the correct content type
                Authorization: `Bearer ${token}` // Attach token in Authorization header
            }
        });

        return response.data;

    } catch (error) {
        if (error.response && error.response.status === 401) {
            const currentUrl = window.location.href; // Save the current URL
            localStorage.setItem('redirectAfterLogin', currentUrl); // Store it in localStorage
            window.open('/login', '_blank'); // Open login in a new tab/window
        } else {
            console.error('Error posting comment:', error);
            throw error;
        }
    }
};

const deleteCommentApi = async (questionPackId,commentId) => {
    const token = Cookies.get('accessToken');

    if (!token) {
        throw new Error('No token found');
    }

    try {
        const response = await axios.delete(`/questionpack/comment/${questionPackId}/${commentId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response)
        return response; 
    } catch (error) {
        console.error('Error deleting comment:', error);
        throw error; 
    }
};

const postReplyComment = async (commentId, userId, replyContent) => {
    const token = Cookies.get('accessToken');

    if (!token) {
        const currentUrl = window.location.href; 
        localStorage.setItem('redirectAfterLogin', currentUrl); 
        window.open('/login', '_blank'); 
        return;
    }

    try {
        const response = await axios.post(`/questionpack/comment/reply/${commentId}`, {
            user: userId,
            content: replyContent
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' // Set content type to JSON
            }
        });

        return response; // Return the response data instead of the whole response object
    } catch (error) {
        if (error.response) {
            console.error('Error posting reply:', error.response.data.message || error.message);
            throw new Error(error.response.data.message || 'Failed to post reply');
        } else {
            console.error('Error posting reply:', error);
            throw new Error('An unexpected error occurred');
        }
    }
};
const searchItems = async (query) => {
    try {
        const response = await axios.get(`/questionPacks/search`, {
            params: { query: query }, 
        });
        return response
    } catch (error) {
        console.error('Error fetching search results:', error);
        throw error;
    }
};
const deleteReply = async (commentId, replyId) => {
    try {
        // Retrieve the access token from cookies
        const token = Cookies.get('accessToken');

        // Ensure the token is available
        if (!token) {
            throw new Error('No access token found. Please login again.');
        }

        // Make the DELETE request to the API
        const response = await axios.delete(`/questionpack/comment/reply/${commentId}/${replyId}`, {
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        });


        return response
    } catch (error) {
        console.error('Error deleting reply:', error.response ? error.response.data : error.message);
        throw error; // Throw the error to be handled by the caller
    }
};

const getClassById = async() =>{
    return axios.get('/class')
}
const getClassByClassId = async (classId) => {
    const token = Cookies.get('accessToken');

    if (!token) {
        throw new Error('No access token found. Please login again.');
    }

    try {
        const response = await axios.get(`/class/${classId}`, {
            headers: {
                'Authorization': `Bearer ${token}`  
            }
        });

        return response; 
    } catch (error) {
        console.error('Error fetching class by ID:', error);
        throw error;
    }
};
const getQuestionPackByQuestionPackId = async(questionPackId) =>{
    try {
        const response = await axios.get(`/questionPacks/${questionPackId}`);
        return response
    } catch (error) {
        console.log(error)
    }
    
}
const removeQpToClass = async (classId, questionPackId) => {
    const token = Cookies.get('accessToken');

    if (!token) {
        throw new Error('No access token found. Please login again.');
    }

    try {
        const response = await axios.delete('/class/removeQp', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: {
                classId,
                questionPackId
            }
        });

        return response
    } catch (error) {
        console.error('Error removing question pack from class:', error);
        throw error; // Throw the error to be handled by the caller
    }
};
const joinClassByInvite = async(token1) => {
    const token = Cookies.get('accessToken');
    if (!token) {
        throw new Error('No access token found. Please login again.');
    }
    return axios.get(`/join-class/${token1}`, {
        headers: {
            'Authorization': `Bearer ${token}`  
        }
    });
};

const getMemberByClassId = async(classId)=>{
    const token = Cookies.get('accessToken');
    if (!token) {
        throw new Error('No access token found. Please login again.');
    }
    return axios.get(`/class/getMembers/${classId}`, {
        headers: {
            'Authorization': `Bearer ${token}`  
        }
    });
}
export {LoginApi,loginWGoogle,decodeDataGoogle,getAllQuestionPack,
    getQuestionByQPId,getUserByUserId,createNewQuestionPackApi,
    getUserId,createQuestionToQuestionPackAPI,getAllCommentFlashCard,
    postComment,deleteCommentApi,postReplyComment,searchItems,registerUser,
    deleteReply,getClassById,getClassByClassId,getQuestionPackByQuestionPackId,removeQpToClass
    ,joinClassByInvite,getMemberByClassId}