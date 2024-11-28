export const BASE_API_URL = "http://localhost:8080";

export const BASE_HEADERS = {
	"Content-Type": "application/json",
};
export const TMDB_BASE_IMAGE_URL = "http://image.tmdb.org/t/p/w500";
export const TMDB_BASE_BACKDROP_URL = "http://image.tmdb.org/t/p/w1280";
export const getMovies = async () => {
	const response = await fetch(`${BASE_API_URL}/movie`, {
		headers: BASE_HEADERS,
	});
	const data = await response.json();
	return data;
};

export const getSeats = async (showtimeId) => {
	const response = await fetch(
		`${BASE_API_URL}/theater/showtime/${showtimeId}/seats`,
		{
			headers: BASE_HEADERS,
		}
	);
	const data = await response.json();
	console.log("Seats data:", data);
	return data;
};


export const mapTheatersAndShowtimes = (movies) => {
	const theatersMap = {};
	const showtimesMap = {};
	const moviesMap = {};

	movies.forEach((movie) => {
		// Map the movie
		moviesMap[movie.id] = {
			id: movie.id,
			title: movie.title,
			description: movie.description,
			releaseDate: movie.releaseDate,
			posterURL: movie.posterURL,
			backdropURL: movie.backdropURL,
			theaters: [], // List of theaters with their showtimes
		};

		movie.theaters.forEach((theater) => {
			// Ensure the theater exists in theatersMap
			if (!theatersMap[theater.id]) {
				theatersMap[theater.id] = {
					id: theater.id,
					name: theater.name,
					movies: [], // List of movies with their showtimes
				};
			}

			// Map the showtimes for the movie in this theater
			const showtimesForThisTheater = theater.showtimes.map(
				(showtime, index) => {
					const showtimeId =
						showtime.id || `${movie.id}-${theater.id}-${index}`;
					const mappedShowtime = {
						id: showtimeId,
						movieId: movie.id,
						theaterId: theater.id,
						dateTime: showtime.dateTime || `${showtime.startTime}`, // Use dateTime or fallback to startTime
					};

					// Add to showtimesMap
					showtimesMap[showtimeId] = mappedShowtime;

					return mappedShowtime; // Return the mapped showtime object
				}
			);

			// Add showtimes and theater details to the movie
			moviesMap[movie.id].theaters.push({
				id: theater.id,
				name: theater.name,
				showtimes: showtimesForThisTheater,
			});

			// Add showtimes and movie details to the theater
			if (!theatersMap[theater.id].movies.find((m) => m.id === movie.id)) {
				theatersMap[theater.id].movies.push({
					id: movie.id,
					title: movie.title,
					showtimes: showtimesForThisTheater,
				});
			}
		});
	});

	return {
		movies: moviesMap,
		theaters: theatersMap,
		showtimes: showtimesMap,
	};
};

export const postLogin = async (username, password) => {
	const response = await fetch(`${BASE_API_URL}/auth/login`, {
		method: "POST",
		headers: BASE_HEADERS,
		body: JSON.stringify({ username, password }),
	});
	const data = await response.json();
	console.log("Auth data:", data);
	return data;
};

export const postRegister = async (username, email, password) => {
	const response = await fetch(`${BASE_API_URL}/auth/create`, {
		method: "POST",
		headers: BASE_HEADERS,
		body: JSON.stringify({ username, email, password }),
	});
	const data = await response.json();
	console.log("Register data:", data);
	return data;
};


export const getUser = async () => {
	const response = await fetch(
		`${BASE_API_URL}/user`,
		{
			headers: BASE_HEADERS,
			method: "GET",
		}
	);
	const data = await response.json();
	console.log("User data:", data);
	return data;
}

