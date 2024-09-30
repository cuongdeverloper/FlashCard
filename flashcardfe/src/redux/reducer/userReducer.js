import { Fetch_User_Success, Fetch_User_Success_Google, Set_Online_Users } from "../action/userAction";
import { Fetch_User_LogOut } from "../action/userAction";
const INITIAL_STATE = {
    account: {
        id: '',
        access_token: '',
        email: '',
        refresh_token: '',
        username: '',
        role: '',
        onlineUser: [] 
    },
    isAuthenticated: false
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Fetch_User_Success:
            return {
                ...state,
                account: {
                    id: action.payload.id,
                    access_token: action.payload.access_token,
                    email: action.payload.email,
                    refresh_token: action.payload.refresh_token,
                    username: action.payload.username,
                    role: action.payload.role,
                    phoneNumber: action.payload.phoneNumber,
                    gender: action.payload.gender,
                    onlineUser: state.account.onlineUser // retain online users
                },
                isAuthenticated: true,
            };
        case Fetch_User_Success_Google:
            return {
                ...state,
                account: {
                    id: action.payload.id,
                    access_token: action.payload.access_token,
                    email: action.payload.email,
                    refresh_token: action.payload.refresh_token,
                    username: action.payload.username,
                    role: action.payload.role,
                    phoneNumber: action.payload.phoneNumber,
                    gender: action.payload.gender,
                    onlineUser: state.account.onlineUser // retain online users
                },
                isAuthenticated: true,
            };
        case Set_Online_Users:
            return {
                ...state,
                account: {
                    ...state.account,
                    onlineUser: action.payload 
                }
            };
        case Fetch_User_LogOut:
            return {
                ...state,
                account: {
                    id: '',
                    access_token: '',
                    email: '',
                    refresh_token: '',
                    username: '',
                    role: '',
                    phoneNumber: '',
                    gender: '',
                    onlineUser: []
                },
                isAuthenticated: false,
            };
            case Fetch_User_LogOut:
                return {
                    ...state,
                    account: {},
                    onlineUser: [], // Reset online users on logout
                };
        default:
            return state;
    }
};

export default userReducer;
