import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Nav({ children }) {
	const { isLoggedIn, setIsLoggedIn } = useAuth();
	const navigate = useNavigate();
	const handleLogout = () => {
		setIsLoggedIn(false);
		navigate("/");
	};

	return (
		<>
			<nav>
				<ul>
					<li>
						<NavLink to="/">Logo</NavLink>
					</li>
					<li>
						<NavLink to="/movies">Movies</NavLink>
					</li>
					<li>
						<NavLink to="/theatres">Theatres</NavLink>
					</li>
					{!isLoggedIn && (
						<li>
							<NavLink to="/login">Login</NavLink>
						</li>
					)}
					{isLoggedIn && (
						<li>
							<NavLink to="/profile">Profile</NavLink>
						</li>
					)}
					{isLoggedIn && <li onClick={handleLogout}>Logout</li>}
				</ul>
			</nav>
			<div className="container">{children}</div>
		</>
	);
}

export default Nav;
