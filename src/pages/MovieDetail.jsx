import { useEffect } from "react";
import useNavTitle from "../hooks/useNavTitle";
import { useNavigate, useParams } from "react-router-dom";
import { TMDB_BASE_BACKDROP_URL } from "../utils/APIUtils";
import Showtimes from "../components/Showtimes";
import useMovieTheaterShowtime from "../hooks/useMovieTheaterShowtime";

function MovieDetail() {
	const { setNavTitle } = useNavTitle();
	const { data } = useMovieTheaterShowtime();
	const params = useParams();
	const navigate = useNavigate();
	const movieId = parseInt(params.movieId, 10);
	const movie = data.movies[movieId];
	useEffect(() => {
		if (movie) {
			setNavTitle(`Movie Detail for ${movie.title}`);
			console.log("movie: ", movie);
		}
	}, [movie, setNavTitle]);
	return (
		<>
			<div
				className="fixed inset-0 z-0"
				style={{
					backgroundImage: movie
						? `url(${TMDB_BASE_BACKDROP_URL}${movie.backdropURL})`
						: "none",
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
					filter: "brightness(0.25)",
					height: "100vh", // Match viewport height
					width: "100%", // Cover full width
					pointerEvents: "none", // Prevent interaction
				}}></div>
			<div className="mt-0 p-0 ml-3 z-10 relative bg-transparent">
				{`Released: ${movie?.releaseDate}`}
				<br className="relative bg-transparent" />
				{`Synopsis: ${movie?.description}`}
				<div className="relative bg-transparent">
					<button
						className="relative p-2 my-2 bg-blue-500"
						onClick={() => navigate("/movies")}>
						{"< Back"}
					</button>
				</div>

				<h2>
					Theatres &amp; Showtimes
					<hr />
				</h2>
			</div>
			{/* Theaters and showtimes */}
			{movie?.theaters.map((theater) => {
				const theaterDetails = data.theaters[theater.id]; // Access full theater details
				const showtimes = theaterDetails.movies.find(
					(m) => m.id === movie.id
				)?.showtimes;

				return (
					<div key={theater.id} className="m-0 p-0 bg-transparent">
						<h3>
							<div className="ml-2 relative bg-transparent">
								{theaterDetails?.name}
							</div>
						</h3>
						<div className="relative my-0 py-0 bg-transparent">
							<Showtimes showtimes={showtimes} />
						</div>
						<button
							className="p-2 mx-3 my-4 relative bg-blue-500"
							onClick={() => navigate("/movies")}>
							{"< Back"}
						</button>
					</div>
				);
			})}
		</>
	);
}

export default MovieDetail;
