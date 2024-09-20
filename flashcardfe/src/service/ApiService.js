import axios from '../utils/AxiosCustomize';
import Cookies from 'js-cookie';
const LoginApi = (userEmail,userPassword) =>{
    return axios.post('auth', { email: userEmail, password: userPassword });

}
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
    return axios.get(`/questionpack/comments/${flashcardId}?page=${page}`);
  };
const postComment = async (userId, commentContent, flashcardId, file) => {
    try {
        // Retrieve the token from cookies or local storage
        const token = Cookies.get('accessToken'); // Adjust if using a different method

        // Create a FormData object
        const formData = new FormData();
        formData.append('user', userId);
        formData.append('content', commentContent);
        formData.append('flashcardId', flashcardId);
        if (file) formData.append('image', file);

        const response = await axios.post('/questionpack/comments', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Set the correct content type
                Authorization: `Bearer ${token}` // Attach token in Authorization header
            }
        });

        return response.data; 
        
    } catch (error) {
        console.error('Error posting comment:', error);
        throw error;
    }
};
export {LoginApi,loginWGoogle,decodeDataGoogle,getAllQuestionPack,
    getQuestionByQPId,getUserByUserId,createNewQuestionPackApi,
    getUserId,createQuestionToQuestionPackAPI,getAllCommentFlashCard,
    postComment}