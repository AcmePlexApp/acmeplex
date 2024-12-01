import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { useCart } from "../hooks/useCart";
import Popup from "reactjs-popup";
import "../index.css";
import Register from "../pages/Register";
import { postLogout } from "../utils/APIUtils";
import acmeplexLogo from "../assets/acmeplexLogo.png";

function Nav(props) {
	const { isLoggedIn, setIsLoggedIn } = useAuth();
	const [isOpen, setIsOpen] = useState(false);
	const { cart, setCart } = useCart();

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};
	const handleLogout = () => {
		const confirm = window.confirm("Are you sure you want to log out?");
		if (confirm) {
			setIsLoggedIn(false);
			setCart([]);
			localStorage.clear();
			postLogout();
		}
	};
	const [isOpenPopup, setIsOpenPopup] = useState(false);

	return (
		<>
			<div className="sticky top-0 mb-0 z-20 rounded-t-xl">
				<nav className="rounded-t-xl">
					<div className="m-0 p-0 bg-primary-800 rounded-t-3xl">
						<div className="bg-primary-800 rounded-t-3xl flex flex-col m-0 p-0 align-middle justify-center sm:hidden">
							<button
								className="text-white bg-primary-800 border-none"
								onClick={toggleMenu}>
								{isOpen ? "✖️" : "☰"}
							</button>
						</div>
						<ul
							onClick={() => setIsOpen(false)}
							className={`bg-primary-800 rounded-t-full flex flex-col m-0 p-0 sm:flex-row justify-between text-center items-center ${
								isOpen ? "flex" : "hidden"
							} sm:flex`}>
							{/* Your list items here */}

							<li className="flex flex-col items-center m-0 p-0 rounded-t-2xl">
								<NavLink to="/" className="m-0 p-0">
									<img
										src={acmeplexLogo}
										alt="Acmeplex Logo"
										className="w-28 m-0 p-0"
									/>
								</NavLink>
							</li>
							<li className="flex flex-col items-center ">
								<NavLink to="/movies">Movies</NavLink>
							</li>
							<li className="flex flex-col items-center ">
								<NavLink to="/theaters">Theaters</NavLink>
							</li>
							{!isLoggedIn && (
								<li className="flex flex-col items-center ">
									<NavLink
										to="#"
										onClick={() => setIsOpenPopup(true)}
										className="text-blue-500 hover:text-blue-700">
										Login
									</NavLink>
									<Popup
										open={isOpenPopup}
										onClose={() => setIsOpenPopup(false)}
										modal
										closeOnDocumentClick
										classNames={{
											overlay: "popup-overlay",
											modal: "popup-modal",
										}}>
										<Register onClose={() => setIsOpenPopup(false)} />
									</Popup>
								</li>
							)}
							{isLoggedIn && (
								<li>
									<NavLink to="/profile">Profile</NavLink>
								</li>
							)}
							{isLoggedIn && cart.length > 0 && (
								<li className="font-bold bg-blue-500">
									<NavLink to="/cart">{`Cart (${cart.length})`}</NavLink>
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
