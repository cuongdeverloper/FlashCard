export const Fetch_User_Success = 'FETCH_USER_SUCCESS';
export const Fetch_User_LogOut = 'FETCH_USER_LOGOUT';
export const Fetch_User_Success_Google = 'FETCH_USER_SUCCESS_GOOGLE';

export const doLogin = (response) => {
    console.log('Login response:', response); 
    const data = response.data; 
    return {
        type: Fetch_User_Success,
        payload: {
            id: data?.id || '', 
            access_token: data?.access_token || '',
            email: data?.email || '',
            refresh_token: data?.refresh_token || '',
            username: data?.username || '',
            role: data?.role || '',
            phoneNumber: data?.phoneNumber || '',
            gender: data?.gender || '',
        }
    };
};

export const doLoginWGoogle = (response,access_token,refresh_token) =>{
    console.log('Login response:', response); 
    return {
        type: Fetch_User_Success_Google,
        payload: {
            id: response?._id || '', 
            access_token: access_token || '',
            email: response?.email || '',
            refresh_token: refresh_token|| '',
            username: response?.username || '',
            role: response?.role || '',
            phoneNumber: response?.phoneNumber || '',
            gender: response?.gender || '',
        }
    };
}
export const doLogout = () => {
    return {
        type: Fetch_User_LogOut,
    };
};
