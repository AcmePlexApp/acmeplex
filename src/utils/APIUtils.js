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

export const getCart = async (token, setCart) => {
	try {
		const response = await fetch(`${BASE_API_URL}/user/cart`, {
			headers: {
				...BASE_HEADERS,
				Authorization: `Bearer ${token}`,
			},
		});
		const cartData = await response.json();
		setCart(cartData);
	} catch (error) {
		console.error("Failed to fetch cart:", error.message);
	}
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

export const getTickets = async (token, setTickets) => {
	const response = await fetch(`${BASE_API_URL}/user/tickets`, {
		headers: {
			...BASE_HEADERS,
			Authorization: `Bearer ${token}`,
		},
	});
	const data = await response.json();
	console.log("Tickets data:", data);
	setTickets(data);
	return data;
};

export const cancelTicket = async (ticket, token, setTickets) => {
	const confirm = window.confirm(
		"Are you sure you want to cancel this ticket? Note: Unregistered users will receive a 15% deduction as a cancellation fee, but will be available as credits for future purchases. Registered users will receive a full refund."
	);
	if (!confirm) {
		return;
	}
	try {
		const response = await fetch(
			`${BASE_API_URL}/user/cancelticket/${ticket.id}`, // Use the ticket id here
			{
				method: "DELETE",
				headers: {
					...BASE_HEADERS,
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					id: 1,
					firstName: "TestFirstName",
					lastName: "TestLastName",
					cardNumber: "1111222233334444",
					expiry: "1122",
					bank: {
						id: 1,
					},
				}),
			}
		);

		// Check if the response is successful
		if (response.ok) {
			const message = await response.text(); // Await the text content of the response
			console.log("Success message:", message);
			await getTickets(token, setTickets); // Refresh ticket list after successful deletion
			return message; // Return the success message
		} else {
			// Handle errors
			const errorMessage = (await response.text()).split(":")[1]?.trim(); // Extract the error message
			throw new Error(errorMessage || "An unexpected error occurred.");
		}
	} catch (error) {
		console.error("Failed to remove seat:", error.message);
		throw error; // Re-throw the error for higher-level handling
	}
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
	try {
		const response = await fetch(`${BASE_API_URL}/auth/login`, {
			method: "POST",
			headers: BASE_HEADERS,
			body: JSON.stringify({ username, password }),
		});

		if (!response.ok) {
			const errorText = await response.text(); // Handle plain text error responses
			console.error("Login failed:", errorText);
			throw new Error(errorText || "Login failed.");
		}

		const data = await response.json(); // Parse JSON if response is OK
		console.log("Auth data:", data);
		return data;
	} catch (error) {
		console.error("Error during login:", error.message);
		throw error; // Re-throw the error to be handled by the caller
	}
};

export const postRegister = async (username, email, password) => {
	try {
		const response = await fetch(`${BASE_API_URL}/auth/create`, {
			method: "POST",
			headers: BASE_HEADERS,
			body: JSON.stringify({ username, email, password }),
		});

		if (!response.ok) {
			const errorText = await response.text(); // Handle plain text error responses
			console.error("Registration failed:", errorText);
			throw new Error(errorText || "Registration failed.");
		}

		const data = await response.json(); // Parse JSON if response is OK
		console.log("Register data:", data);
		return data;
	} catch (error) {
		console.error("Error during registration:", error.message);
		throw error; // Re-throw the error to be handled by the caller
	}
};

export const postCart = async (seatId, token, setCart) => {
	try {
		const response = await fetch(
			`${BASE_API_URL}/user/selectseat/${seatId}`,
			{
				method: "POST",
				headers: {
					...BASE_HEADERS,
					Authorization: `Bearer ${token}`,
				},
			}
		);

		// Check if the response is successful
		if (response.ok) {
			const message = await response.text(); // Await the text content of the response
			console.log("Success message:", message);
			await getCart(token, setCart); // Refresh cart after successful booking
			return message; // Return the success message
		} else {
			// Handle errors
			const errorMessage = (await response.text()).split(":")[1]?.trim(); // Extract the error message
			throw new Error(errorMessage || "An unexpected error occurred.");
		}
	} catch (error) {
		console.error("Failed to book seat:", error.message);
		throw error; // Re-throw the error for higher-level handling
	}
};

export const deleteSeatFromCart = async (seatId, token, cart, setCart) => {
	try {
		// Find the ticket id corresponding to the seatId
		const ticket = cart.find((item) => item.seat.id === seatId);
		if (!ticket) {
			throw new Error("Ticket not found for the provided seat ID.");
		}

		const response = await fetch(
			`${BASE_API_URL}/user/removeticket/${ticket.id}`, // Use the ticket id here
			{
				method: "DELETE",
				headers: {
					...BASE_HEADERS,
					Authorization: `Bearer ${token}`,
				},
			}
		);

		// Check if the response is successful
		if (response.ok) {
			const message = await response.text(); // Await the text content of the response
			console.log("Success message:", message);
			await getCart(token, setCart); // Refresh cart after successful deletion
			return message; // Return the success message
		} else {
			// Handle errors
			const errorMessage = (await response.text()).split(":")[1]?.trim(); // Extract the error message
			throw new Error(errorMessage || "An unexpected error occurred.");
		}
	} catch (error) {
		console.error("Failed to remove seat:", error.message);
		throw error; // Re-throw the error for higher-level handling
	}
};

export const postLogout = async () => {
	console.log("postLogout Called");
	const response = await fetch(`${BASE_API_URL}/auth/logout`, {
		headers: {
			...BASE_HEADERS,
		},
		method: "POST",
	});
	const data = await response.text();
	console.log("Logout data:", data);
	return data;
};

export const getUser = async (token) => {
	try {
		const response = await fetch(`${BASE_API_URL}/user`, {
			method: "GET",
			headers: {
				...BASE_HEADERS,
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch user data: ${response.statusText}`);
		}

		const data = await response.json();
		console.log("User data:", data);

		return data;
	} catch (error) {
		console.error("Error fetching user data:", error);
		throw error;
	}
};

export const deleteUser = async (token) => {
	try {
		const response = await fetch(`${BASE_API_URL}/user`, {
			method: "DELETE",
			headers: {
				...BASE_HEADERS,
				Authorization: `Bearer ${token}`,
			},
		});
		if (response.ok) {
			console.log("User deleted");
			return;
		} else {
			// Handle errors
			const errorMessage = (await response.text()).split(":")[1]?.trim();
			throw new Error(errorMessage || "An unexpected error occurred.");
		}
	} catch (error) {
		console.error("Failed tp delete:", error.message);
		throw error;
	}
};

// export const postTicketPurchase = async (token, amount, applyCredits, firstName, lastName, cardNumber, expiry) => {
// 	try {
// 		const response = await fetch(`${BASE_API_URL}/user/purchase/${amount}/${applyCredits}`, {
// 			method: "POST",
// 			headers: {
// 				...BASE_HEADERS,
// 				Authorization: `Bearer ${token}`,
// 			},
// 			body: JSON.stringify({ firstName, lastName, cardNumber, expiry}),
// 		});

// 		if (!response.ok) {
// 			const errorText = await response.text(); // Handle plain text error responses
// 			console.error("Payment Failed:", errorText);
// 			throw new Error(errorText);
// 		}

// 		const msg = await response.text(); // Parse JSON if response is OK
// 		console.log(msg);
// 	} catch (error) {
// 		console.error("Error during pament:", error.message);
// 		throw error; // Re-throw the error to be handled by the caller
// 	}
// };

export const postCartPurchase = async (token, applyCredits, creditCard) => {
	try {
		const response = await fetch(
			`${BASE_API_URL}/user/cart/purchase/${applyCredits}`,
			{
				method: "POST",
				headers: {
					...BASE_HEADERS,
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: creditCard ? JSON.stringify(creditCard) : null,
			}
		);

		if (!response.ok) {
			const errorText = await response.text(); // Handle plain text error response
			throw new Error(errorText);
		}
		const msg = await response.text(); // Parse JSON if response is OK
		console.log(msg);
	} catch (error) {
		console.error("Error during cart payment", error.message);
		throw error; // Re-throw the error to be handled by the caller
	}
};

export const postUserRegister = async (token, creditCard) => {
	try {
		const response = await fetch(`${BASE_API_URL}/user/register`, {
			method: "POST",
			headers: {
				...BASE_HEADERS,
				Authorization: `Bearer ${token}`,
			},
			body: creditCard ? JSON.stringify(creditCard) : null,
		});

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(errorText);
		}
		const msg = await response.text();
		console.log(msg);
	} catch (error) {
		console.error("Error register payment", error.message);
		throw error;
	}
};
