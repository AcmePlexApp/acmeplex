const BASE_API_URL = "http://localhost:8080";

const BASE_HEADERS = {
	"Content-Type": "application/json",
};
export const TMDB_BASE_IMAGE_URL = "http://image.tmdb.org/t/p/w185";
export const TMDB_BASE_BACKDROP_URL = "http://image.tmdb.org/t/p/w780";
export const getMovies = async () => {
	const response = await fetch(`${BASE_API_URL}/movie`, {
		headers: BASE_HEADERS,
	});
	const data = await response.json();
	return data;
};

export const mapTheaters = (movies) => {
	const theatersMap = {};

	movies.forEach((movie) => {
		movie.theaters.forEach((theater) => {
			if (!theatersMap[theater.id]) {
				theatersMap[theater.id] = {
					id: theater.id,
					name: theater.name,
					movies: [],
				};
			}

			theatersMap[theater.id].movies.push({
				id: movie.id,
				title: movie.title,
				description: movie.description,
				durationInMinutes: movie.durationInMinutes,
				releaseDate: movie.releaseDate,
				showtimes: theater.showtimes,
			});
		});
	});

	// Convert map to an array
	const theaters = Object.values(theatersMap);

	console.log(theaters);
	return theaters;
};
