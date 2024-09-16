import { jwtDecode } from "jwt-decode";

const isTokenExpired = (token) => {
    if (!token) return true;
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decoded.exp < currentTime;
};

export { isTokenExpired }; // Named export
