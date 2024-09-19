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
        const response = await axios.get('/id', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
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

        // const response = await axios.post('/question', formData, {
        //     headers: {
        //         'Authorization': `Bearer ${token}`,
        //         'Content-Type': 'multipart/form-data'
        //     }
        // });
        
        const response = await axios.post('/question', formData);

        return response;
    } catch (error) {
        console.error('Error creating question:', error);
        throw error;
    }
};

export {LoginApi,loginWGoogle,decodeDataGoogle,getAllQuestionPack,getQuestionByQPId,getUserByUserId,createNewQuestionPackApi,getUserId,createQuestionToQuestionPackAPI}