import {useLocation, Link} from 'react-router-dom'
import useAuth from './useAuth'

// ref: https://dev.to/stephengade/build-custom-middleware-for-a-reactnextjs-app-with-context-api-2ed3
const ProtectedRoutes = ({ children }) => {
    const location = useLocation();

    const { isAuthenticated } = useAuth();

    if (
        !isAuthenticated &&
        (
            location.pathname.toLowerCase().startsWith("/departments") ||
            location.pathname.toLowerCase().startsWith("/employees") ||
            location.pathname.toLowerCase().startsWith("/shifts") ||
            location.pathname.toLowerCase().startsWith("/users")
        )
    ) {
        return (
            <p className="">
                You are not allowed here <br />
                <Link to="/">Login</Link>
            </p>
        )
    }

    return children;
};

export default ProtectedRoutes