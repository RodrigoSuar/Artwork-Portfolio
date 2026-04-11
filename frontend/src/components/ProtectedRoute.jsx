import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {

    const admin = localStorage.getItem("loggedAdmin");

    if(!admin) {
        return <Navigate to="/"/>
    }

    return children

}

export default ProtectedRoute