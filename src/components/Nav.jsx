import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Nav(props) {
	const { isLoggedIn, setIsLoggedIn } = useAuth();
	const navigate = useNavigate();
	const handleLogout = () => {
		const confirm = window.confirm("Are you sure you want to log out?");
		if (confirm) {
			setIsLoggedIn(false);
			navigate("/");
		}
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
					{isLoggedIn && (
						<li onClick={handleLogout} className="hover:cursor-pointer">
							Logout
						</li>
					)}
				</ul>
			</nav>
			<h1>{props?.title}</h1>
			<div>{props?.children}</div>
		</>
	);
}

export default Nav;
