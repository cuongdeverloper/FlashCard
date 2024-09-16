import axios from '../utils/AxiosCustomize';

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
export {LoginApi,loginWGoogle,decodeDataGoogle,getAllQuestionPack,getQuestionByQPId,getUserByUserId}