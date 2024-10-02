// actions/userActions.js
export const Fetch_User_Success = 'FETCH_USER_SUCCESS';
export const Fetch_User_LogOut = 'FETCH_USER_LOGOUT';
export const Fetch_User_Success_Google = 'FETCH_USER_SUCCESS_GOOGLE';
export const Set_Online_Users = 'SET_ONLINE_USERS';
export const Set_Socket_Connection = 'SET_SOCKET_CONNECTION';

export const doLogin = (response) => {
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
            image:data?.image || ''
        }
    };
};

export const doLoginWGoogle = (response, access_token, refresh_token) => {
    return {
        type: Fetch_User_Success_Google,
        payload: {
            id: response?._id || '',
            access_token: access_token || '',
            email: response?.email || '',
            refresh_token: refresh_token || '',
            username: response?.username || '',
            role: response?.role || '',
            phoneNumber: response?.phoneNumber || '',
            gender: response?.gender || '',
            image:response?.image || ''
        }
    };
};

export const doLogout = () => {
    return {
        type: Fetch_User_LogOut,
    };
};

export const setOnlineUser = (onlineUsers) => {
    return {
        type: Set_Online_Users,
        payload: onlineUsers
    };
};

export const setSocketConnection = (socketConnection) => {
    return {
        type: Set_Socket_Connection,
        payload: socketConnection
    };
};
