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
import useNavTitle from "./hooks/useNavTitle";
import { useEffect } from "react";
import MovieList from "./components/MovieList";
import useMovies from "./hooks/useMovies";
function sampleMovies() {
	return {
		movies: [
			{
				id: 1,
				title: "Alien",
				description: "There is an Alien.",
				durationInMinutes: 120,
				releaseDate: "2020-01-01",
				theaters: [
					{
						id: 1,
						name: "Theater 1",
						movie: 1,
						showtimes: [
							{ id: 1, timeOfDay: "13:00:00" },
							{ id: 2, timeOfDay: "16:00:00" },
							{ id: 3, timeOfDay: "19:00:00" },
							{ id: 4, timeOfDay: "21:00:00" },
						],
					},
				],
			},
			{
				id: 2,
				title: "The Shawshank Redemption",
				description: "Two imprisoned men bond over a number of years.",
				durationInMinutes: 142,
				releaseDate: "1994-09-23",
				theaters: [
					{
						id: 2,
						name: "Theater 2",
						movie: 2,
						showtimes: [
							{ id: 5, timeOfDay: "14:00:00" },
							{ id: 6, timeOfDay: "17:00:00" },
							{ id: 7, timeOfDay: "20:00:00" },
						],
					},
				],
			},
			{
				id: 3,
				title: "The Godfather",
				description:
					"The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
				durationInMinutes: 175,
				releaseDate: "1972-03-24",
				theaters: [
					{
						id: 3,
						name: "Theater 3",
						movie: 3,
						showtimes: [
							{ id: 8, timeOfDay: "15:00:00" },
							{ id: 9, timeOfDay: "18:00:00" },
							{ id: 10, timeOfDay: "21:00:00" },
						],
					},
				],
			},
			{
				id: 4,
				title: "The Dark Knight",
				description:
					"When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.",
				durationInMinutes: 152,
				releaseDate: "2008-07-18",
				theaters: [
					{
						id: 4,
						name: "Theater 4",
						movie: 4,
						showtimes: [
							{ id: 11, timeOfDay: "12:00:00" },
							{ id: 12, timeOfDay: "15:00:00" },
							{ id: 13, timeOfDay: "18:00:00" },
							{ id: 14, timeOfDay: "21:00:00" },
						],
					},
				],
			},
			{
				id: 5,
				title: "Pulp Fiction",
				description:
					"The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
				durationInMinutes: 154,
				releaseDate: "1994-10-14",
				theaters: [
					{
						id: 5,
						name: "Theater 5",
						movie: 5,
						showtimes: [
							{ id: 15, timeOfDay: "13:00:00" },
							{ id: 16, timeOfDay: "16:00:00" },
							{ id: 17, timeOfDay: "19:00:00" },
							{ id: 18, timeOfDay: "22:00:00" },
						],
					},
				],
			},
			{
				id: 6,
				title: "Schindler's List",
				description:
					"In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce.",
				durationInMinutes: 195,
				releaseDate: "1993-12-15",
				theaters: [
					{
						id: 6,
						name: "Theater 6",
						movie: 6,
						showtimes: [
							{ id: 19, timeOfDay: "14:00:00" },
							{ id: 20, timeOfDay: "17:00:00" },
							{ id: 21, timeOfDay: "20:00:00" },
						],
					},
				],
			},
			{
				id: 7,
				title: "Inception",
				description:
					"A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
				durationInMinutes: 148,
				releaseDate: "2010-07-16",
				theaters: [
					{
						id: 7,
						name: "Theater 7",
						movie: 7,
						showtimes: [
							{ id: 22, timeOfDay: "13:00:00" },
							{ id: 23, timeOfDay: "16:00:00" },
							{ id: 24, timeOfDay: "19:00:00" },
							{ id: 25, timeOfDay: "22:00:00" },
						],
					},
				],
			},
			{
				id: 8,
				title: "Fight Club",
				description:
					"An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
				durationInMinutes: 139,
				releaseDate: "1999-10-15",
				theaters: [
					{
						id: 8,
						name: "Theater 8",
						movie: 8,
						showtimes: [
							{ id: 26, timeOfDay: "14:00:00" },
							{ id: 27, timeOfDay: "17:00:00" },
							{ id: 28, timeOfDay: "20:00:00" },
						],
					},
				],
			},
			{
				id: 9,
				title: "Forrest Gump",
				description:
					"The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
				durationInMinutes: 142,
				releaseDate: "1994-07-06",
				theaters: [
					{
						id: 9,
						name: "Theater 9",
						movie: 9,
						showtimes: [
							{ id: 29, timeOfDay: "13:00:00" },
							{ id: 30, timeOfDay: "16:00:00" },
							{ id: 31, timeOfDay: "19:00:00" },
							{ id: 32, timeOfDay: "22:00:00" },
						],
					},
				],
			},
			{
				id: 10,
				title: "The Matrix",
				description:
					"A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
				durationInMinutes: 136,
				releaseDate: "1999-03-31",
				theaters: [
					{
						id: 10,
						name: "Theater 10",
						movie: 10,
						showtimes: [
							{ id: 33, timeOfDay: "12:00:00" },
							{ id: 34, timeOfDay: "15:00:00" },
							{ id: 35, timeOfDay: "18:00:00" },
							{ id: 36, timeOfDay: "21:00:00" },
						],
					},
				],
			},
		],
	};
}

function getMovies() {
	return sampleMovies().movies;
}
function App() {
	const { navTitle } = useNavTitle();
	const { movies, setMovies } = useMovies();
	/* eslint-disable react-hooks/exhaustive-deps */
	useEffect(() => {
		const movies = getMovies();
		setMovies(movies);
	}, []);

	return (
		<Routes>
			<Route path="/" element={<Navigate to={"/movies"} />} />
			<Route
				path="/movies"
				element={
					<Nav title={"Browse Movies"}>
						<Movies>
							<MovieList movies={movies} />
						</Movies>
					</Nav>
				}
			/>
			<Route
				path="/movies/:movieId"
				element={
					<Nav title={navTitle}>
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
					<Nav title={"Browse Showtimes for Theatre "}>
						<TheatreDetail>
							Example of &apos;children&apos; prop in App.jsx
						</TheatreDetail>
					</Nav>
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
					<Nav title={"Enter Your Credit Card Information"}>
						<Payment></Payment>
					</Nav>
				}
			/>
			<Route
				path="/register"
				element={
					<Nav title={"Sign Up for AcmePlex"}>
						<Register></Register>
					</Nav>
				}
			/>
			<Route
				path="/login"
				element={
					<Nav title={"Login"}>
						<Login />
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
