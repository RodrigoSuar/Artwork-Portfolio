import { Navigate } from "react-router-dom";

// The auth token lives in an httpOnly cookie the frontend can't read, so this
// is just a UX hint based on whether the last login succeeded; the backend
// enforces real authorization on every admin request via the cookie.
const ProtectedRoute = ({ children }) => {
    const adminData = localStorage.getItem("loggedAdmin");

    if (!adminData) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

export default ProtectedRoute
