import Accordion from "../components/Accordion";
import Showtimes from "../components/Showtimes";
import useMovieTheaterShowtime from "../hooks/useMovieTheaterShowtime";

function Theaters() {
	const { data } = useMovieTheaterShowtime();

	if (!data || !data.theaters || !data.movies) {
		console.error("Theater, movie, or showtime data is missing.");
		return <div>Loading theaters...</div>;
	}

	const theaters = Object.values(data.theaters); // Convert theaters object to an array

	console.log("Theaters in /theaters Page: ", theaters);

	return (
		<div>
			{theaters.map((theater) => (
				<Accordion
					key={theater.id}
					title={theater.name}
					data={theater.movies.map((movieRef) => {
						const movieId = movieRef.id; // Extract movie ID
						const movieDetails = data.movies[movieId];

						if (!movieDetails) {
							console.warn(`Movie with ID ${movieId} not found.`);
							return null;
						}

						// Access showtimes from the specific movie object within the theater
						const movieShowtimes = movieRef.showtimes;

						return (
							<div key={movieId} className="bg-transparent my-0 py-0">
								<h2 className="mt-0 mb-1">{movieDetails.title}</h2>
								<div className="bg-transparent m-0 p-0">
									<p>{movieDetails.description}</p>
									<p className="mt-2">{`Released: ${movieDetails.releaseDate}`}</p>
								</div>
								<h2>Showtimes:</h2>
								<hr />
								{movieShowtimes.length > 0 ? (
									<Showtimes showtimes={movieShowtimes} />
								) : (
									<p>No showtimes available for this movie.</p>
								)}
							</div>
						);
					})}
				/>
			))}
		</div>
	);
}

export default Theaters;
