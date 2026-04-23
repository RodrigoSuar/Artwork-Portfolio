import { Navigate } from "react-router-dom";

// Check if JWT token is expired
const isTokenExpired = (token) => {
    try {
        // JWT tokens are base64 encoded. Split and decode the payload
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        const { exp } = JSON.parse(jsonPayload);

        // exp is in seconds, Date.now() is in milliseconds
        return exp * 1000 < Date.now();
    } catch  {
        // If there's any error decoding, treat token as expired
        return true;
    }
};


const ProtectedRoute = ({ children }) => {
    const adminData = localStorage.getItem("loggedAdmin");

    const redirectToLogin = <Navigate to="/" replace />;

    if (!adminData) {
        return redirectToLogin;
    }

    try {
        const admin = JSON.parse(adminData);

        if (!admin?.token || isTokenExpired(admin.token)) {
            localStorage.removeItem("loggedAdmin");
            return redirectToLogin;
        }

        return children;

    } catch  {
        localStorage.removeItem("loggedAdmin");
        return redirectToLogin;
    }
};

export default ProtectedRoute
