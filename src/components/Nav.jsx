import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

function Nav(props) {
	const { isLoggedIn, setIsLoggedIn } = useAuth();
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};
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
			<div className="sticky top-0 mb-0">
				<nav>
					<div className="m-0 p-0">
						<div className="bg-primary-800 flex align-middle justify-center sm:hidden">
							<button
								className="text-white bg-primary-800"
								onClick={toggleMenu}>
								{isOpen ? "✖️" : "☰"}
							</button>
						</div>
						<ul
							onClick={() => setIsOpen(false)}
							className={`bg-primary-800 rounded-t-md p-1 flex-col sm:flex-row justify-between text-center ${
								isOpen ? "flex" : "hidden"
							} sm:flex`}>
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
								<li
									onClick={handleLogout}
									className="hover:cursor-pointer">
									Logout
								</li>
							)}
						</ul>
					</div>
				</nav>
				<div className="mb-0">
					<h1>{props?.title}</h1>
				</div>
			</div>
			<div className="contents-container mt-0 pt-0">{props?.children}</div>
		</>
	);
}

export default Nav;
