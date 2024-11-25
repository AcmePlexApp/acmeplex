import { useEffect, useState } from "react";
import useNavTitle from "../hooks/useNavTitle";
import useMovies from "../hooks/useMovies";
import { useNavigate, useParams } from "react-router-dom";
import { parseISODate } from "../utils/timeUtils";

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
	return (
		<div className="mt-0 pt-0">
			<div className="mt-0 p-0">
				{`Released: ${movie?.releaseDate}`}
				<br />
				{`Synopsis: ${movie?.description}`}
				<div>
					<button className="p-2 my-2" onClick={() => navigate("/movies")}>
						{"< Back"}
					</button>
				</div>

				<h2>
					Theatres &amp; Showtimes
					<hr />
				</h2>
			</div>
			{movie?.theaters.map((e) => (
				<div key={e.name} className="m-0 p-0">
					<h3>
						<div>{e.name}</div>
					</h3>
					<div className="flex flex-row flex-wrap my-0 py-0">
						{e?.showtimes.map((showtime) => (
							<button className="m-1 py-0 px-0.5" key={showtime.id}>
								{parseISODate(showtime.dateTime).time}
							</button>
						))}
					</div>
					<button
						className="p-2 mx-3 my-4"
						onClick={() => navigate("/movies")}>
						{"< Back"}
					</button>
				</div>
			))}
		</div>
	);
}

export default MovieDetail;
