import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

export default function SecureRoutes({ children }) {
    const { user } = useContext(AuthContext);
    const location = useLocation()

    if (!(user && user.email)) {
        return children;
    }
    return <Navigate to={location?.state?.from || '/'}/>;
}
