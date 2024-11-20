import { Routes, Route, Navigate } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Movies from "./pages/Movies";
import Theatres from "./pages/Theatres";
import MovieDetail from "./pages/MovieDetail";
import TheatreDetail from "./pages/TheatreDetail";
import Nav from "./components/Nav";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Navigate to={"/movies"} />} />
			<Route
				path="/movies"
				element={
					<Nav>
						<Movies></Movies>
					</Nav>
				}
			/>
			<Route
				path="/movies/:movieId"
				element={
					<Nav>
						<MovieDetail>
							Example of &apos;children&apos; prop in App.jsx
						</MovieDetail>
					</Nav>
				}
			/>
			<Route
				path="/theatres"
				element={
					<Nav>
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
					<Nav>
						<Profile></Profile>
					</Nav>
				}
			/>
			<Route
				path="/login"
				element={
					<Nav>
						<Login />
					</Nav>
				}
			/>
			<Route
				path="*"
				element={
					<Nav>
						<PageNotFound />
					</Nav>
				}
			/>
		</Routes>
	);
}

export default App;
