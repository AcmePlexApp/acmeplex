import Accordion from "../components/Accordion";
import Showtimes from "../components/Showtimes";
import useTheaters from "../hooks/useTheaters";

function Theaters() {
	const { theaters } = useTheaters();
	console.log("Theaters in /Theaters Page: ", theaters);

	return (
		<div>
			{theaters.map((theater) => (
				<Accordion
					key={theater.id}
					title={theater.name}
					data={theater.movies.map((movie) => {
						return (
							<div key={movie.id} className="bg-transparent my-0 py-0">
								<h2 className="mt-0 mb-1">{movie.title}</h2>
								<div className="bg-transparent m-0 p-0">
									<p>{movie.description}</p>
									<p className="mt-2">{`Released: ${movie.releaseDate}`}</p>
								</div>
								<h2>Showtimes:</h2>
								<hr />
								<Showtimes showtimes={movie.showtimes} />
							</div>
						);
					})}
				/>
			))}
		</div>
	);
}

export default Theaters;
