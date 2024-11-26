import { useEffect, useState } from "react";
import useNavTitle from "../hooks/useNavTitle";
import useMovies from "../hooks/useMovies";
import { useNavigate, useParams } from "react-router-dom";
// import { parseISODate } from "../utils/timeUtils";
import { TMDB_BASE_BACKDROP_URL } from "../utils/APIUtils";
import Showtimes from "../components/Showtimes";

function MovieDetail() {
	const { setNavTitle } = useNavTitle();
	const { movies } = useMovies();
	const params = useParams();
	const [movie, setMovie] = useState(null);
	const navigate = useNavigate();
	useEffect(() => {
		setMovie(movies.find((movie) => movie.id === parseInt(params.movieId)));
		setNavTitle("Movie Detail for " + movie?.title);
	}, [movies, params.movieId, setNavTitle, movie]);
	// console.log(movie.backdropurl);
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
			{movie?.theaters.map((e) => (
				<div key={e.name} className="m-0 p-0 bg-transparent">
					<h3>
						<div className="ml-2 relative bg-transparent">{e.name}</div>
					</h3>
					<div className="relative my-0 py-0 bg-transparent">
						{/* {e?.showtimes.map((showtime) => (
							<button className="m-1 p-2 bg-blue-500" key={showtime.id}>
								{parseISODate(showtime.dateTime).time}
							</button>
						))} */}
						<Showtimes showtimes={e.showtimes} />
					</div>
					<button
						className="p-2 mx-3 my-4 relative bg-blue-500"
						onClick={() => navigate("/movies")}>
						{"< Back"}
					</button>
				</div>
			))}
		</>
	);
}

export default MovieDetail;
