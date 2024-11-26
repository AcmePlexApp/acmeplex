import { Routes, Route, Navigate } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Movies from "./pages/Movies";
import Theatres from "./pages/Theatres";
import MovieDetail from "./pages/MovieDetail";
import TheatreDetail from "./pages/TheatreDetail";
import Nav from "./components/Nav";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Payment from "./pages/Payment";
import Register from "./pages/Register";
import PaymentSuccess from "./pages/PaymentSuccess";
import EditProfile from "./pages/EditProfile";
import PaymentFail from "./pages/PaymentFail";
import EditPayment from "./pages/EditPayment";
import Premium from "./pages/Premium";
import Notifications from "./pages/Notifications";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Navigate to={"/movies"} />} />
			<Route
				path="/movies"
				element={
					<Nav title={"Browse Movies"}>
						<Movies></Movies>
					</Nav>
				}
			/>
			<Route
				path="/movies/:movieId"
				element={
					<Nav title={"Browse Showtimes for "}>
						<MovieDetail>
							Example of &apos;children&apos; prop in App.jsx
						</MovieDetail>
					</Nav>
				}
			/>
			<Route
				path="/theatres"
				element={
					<Nav title={"Browse Theatres"}>
						<Theatres></Theatres>
					</Nav>
				}
			/>
			<Route
				path="/theatres/:theatreId"
				element={
					<TheatreDetail>
						Example of &apos;children&apos; prop in App.jsx
					</TheatreDetail>
				}
			/>
			<Route
				path="/profile"
				element={
					<Nav title={"Profile"}>
						<Profile></Profile>
					</Nav>
				}
			/>
			<Route
				path="/payment"
				element={
					<Nav>
						<Payment></Payment>
					</Nav>
				}	
			/>
			<Route
				path="/register"
				element={
					<Nav>
						<Register></Register>
					</Nav>
				}	
				/>
			<Route
				path="/login"
				element={
					<Nav title="Login">
						<Login />
					</Nav>
				}
			/>
			<Route
				path="/payment/success"
				element={
					<Nav>
						<PaymentSuccess />
					</Nav>
				}
			/>
			<Route
				path="/payment/fail"
				element={
					<Nav>
						<PaymentFail />
					</Nav>
				}
			/>
			<Route
				path="/profile/edit/userinfo"
				element={
					<Nav>
						<EditProfile />
					</Nav>
				}
			/>
			<Route
				path="/profile/edit/paymentinfo"
				element={
					<Nav>
						<EditPayment />
					</Nav>
				}
			/>
			<Route
				path="profile/premium"
				element={
					<Nav>
						<Premium />
					</Nav>
				}
			/>
			<Route
				path="/profile/notifications"
				element={
					<Nav>
						<Notifications />
					</Nav>
				}
			/>
			<Route
				path="*"
				element={
					<Nav title={"Page Not Found"}>
						<PageNotFound />
					</Nav>
				}
			/>
		</Routes>
	);
}

export default App;
