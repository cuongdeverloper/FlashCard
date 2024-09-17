import axios from 'axios';
import NProgress from 'nprogress';
import { isTokenExpired } from './decodeJWT.js';
import { store } from '../redux/store';

const instance = axios.create({
    baseURL: 'http://localhost:6868/',
    withCredentials: true,
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    const state = store.getState();
    const accessToken = state.user.account.access_token;

    if (accessToken && isTokenExpired(accessToken)) {
        // Token is expired
        // store.dispatch(doLogout());
        window.location.href = '/login';
        return Promise.reject(new Error('Access token expired'));
    }

    if (accessToken) {
        config.headers['Authorization'] = 'Bearer ' + accessToken;
    }

    NProgress.start();
    return config;
}, function (error) {
    NProgress.done();
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // NProgress.done();
    return response && response.data ? response.data : response;
}, function (error) {
    NProgress.done();

    if (error.response) {
        // Handle specific error cases
        if (error.response.data.errorCode === -999) {
            // store.dispatch(doLogout());
            window.location.href = '/login';
        }
    }

    return Promise.reject(error);
});

export default instance;
