import { Fetch_User_Success, Fetch_User_Success_Google } from "../action/userAction";
import { Fetch_User_LogOut } from "../action/userAction";
const INITIAL_STATE = {
    account: {
        id:'',
        access_token: '',
        email:'',
        refresh_token: '',
        username: '',
        role: '',
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
                    username: action.payload.name,
                    role: action.payload.role,
                    phoneNumber: action.payload.phoneNumber,
                    gender: action.payload.gender
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
                    gender: action.payload.gender
                },
                isAuthenticated: true,
            };
        case Fetch_User_LogOut:
            return {
                ...state,
                account: {
                    id: '',
                    access_token: '',
                    email: '',
                    refresh_token: '',
                    name: '',
                    profileImage: '',
                    role: '',
                    phoneNumber: '',
                    gender: ''
                },
                isAuthenticated: false,
            };
        default:
            return state;
    }
};


export default userReducer;
