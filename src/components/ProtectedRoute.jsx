import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function ProtectedRoute(props) {
	const location = useLocation();
	const { isLoggedIn } = useAuth();

	if (!isLoggedIn) {
		// Redirect to login page, preserving the path the user tried to access
		return <Navigate to="/movies" state={{ from: location }} replace />;
	}

	return props.children;
}

export default ProtectedRoute;
