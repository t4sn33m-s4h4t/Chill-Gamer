import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../pages/Loading.jsx';

export default function PrivateRoute({ children }) {
    const location = useLocation();
    const { user, loading } = useContext(AuthContext);
    if (loading) {
        return <Loading />;
    }
    if (user && user.email) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location.pathname }} />;
}
