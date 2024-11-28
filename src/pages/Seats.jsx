import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useNavTitle from "../hooks/useNavTitle";
import useMovieTheaterShowtime from "../hooks/useMovieTheaterShowtime";
import { getSeats, BASE_API_URL, BASE_HEADERS } from "../utils/APIUtils";
import { useAuth } from "../hooks/useAuth";
import Popup from "reactjs-popup";
import Register from "../pages/Register";
import { useToken } from "../hooks/useToken";
import { useCart } from "../hooks/useCart";

function Seats() {
	const params = useParams();
	const { data } = useMovieTheaterShowtime();
	const { setNavTitle } = useNavTitle();
	const { cart, setCart } = useCart();
	const [seats, setSeats] = useState(null);
	const [showtimeDetails, setShowtimeDetails] = useState(null);
	const showtimeId = parseInt(params.showtimeId, 10);
	const showtime = data.showtimes[showtimeId];
	const movie = data.movies[showtime.movieId];
	const theater = data.theaters[showtime.theaterId];
	const navigate = useNavigate();

	const { isLoggedIn } = useAuth(); // Access auth state
	const { token } = useToken();
	const [isPopupOpen, setIsPopupOpen] = useState(false); // State for login popup
	const [selectedSeat, setSelectedSeat] = useState(null); // Track seat user clicked

	const formattedShowtimeDate = new Date(showtime.dateTime).toLocaleString(
		[],
		{
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			hour12: true, // Set to `false` for 24-hour format
		}
	);

	const postCart = async (seatId) => {
		console.log("Token Before PostCart:", token);
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
		const data = await response;
		console.log("postCart Response Data:", data.text());
		if (data.ok) {
			console.log("Seat booked successfully.");
			setCart((prevCart) => [...prevCart, seatId]);
		} else {
			console.error("Failed to book seat.");
		}
		return data;
	};

	const handleSeatSelection = (seat) => () => {
		setSelectedSeat(seat);
		console.log("Logged in:", isLoggedIn);
		console.log("Selected seat:", selectedSeat);
		if (!isLoggedIn) {
			console.log("User is not logged in. Opening login popup...");
			setIsPopupOpen(true);
			return;
		}
		if (seat.status === "AVAILABLE") {
			console.log(
				`Row ${seat.seatRow} Seat ${seat.seatNumber} for ${movie.title} in ${theater.name} on ${formattedShowtimeDate} is available. Booking...`
			);
			try {
				const cartData = postCart(seat.id);
				console.log("Cart data:", cartData);
			} catch (error) {
				console.error("Failed to book seat:", error);
			}
		} else {
			console.log(
				`Seat ${seat.seatRow}-${seat.seatNumber} is already booked.`
			);
		}
	};

	useEffect(() => {
		// Fetch additional seat details if required (example placeholder)
		async function fetchSeats() {
			try {
				const seatData = await getSeats(showtimeId);
				setSeats(seatData);
			} catch (error) {
				console.error("Failed to fetch seats:", error);
			}
		}

		fetchSeats();

		// Set the showtime details and navigation title
		const movie = data.movies[showtime.movieId];
		const theater = data.theaters[showtime.theaterId];

		if (movie && theater) {
			setShowtimeDetails({ movie, theater, showtime });
			setNavTitle(`Seats for ${movie.title} at ${theater.name}`);
		} else {
			console.error(
				`Invalid data: Movie or Theater not found for Showtime ID ${showtimeId}.`
			);
		}
	}, [showtime, showtimeId, data, setNavTitle, cart]);

	if (!showtimeDetails) {
		return <div>Loading showtime details...</div>;
	}

	return (
		<div className="flex flex-col items-center px-4 py-6">
			{/* Back button at the top */}
			<button
				className="self-start px-4 py-2 text-white bg-blue-500 rounded-md"
				onClick={() => navigate(-1)}>
				&lt; Back
			</button>

			<h1 className="text-2xl font-bold">
				{showtimeDetails.movie.title} at {showtimeDetails.theater.name}
			</h1>
			<p className="m-0 p-0">Showtime: {formattedShowtimeDate}</p>
			<div className="w-full mt-0 p-0">
				{seats ? (
					<div className="flex flex-col items-center space-y-4">
						<h2 className="text-lg font-semibold">Select Your Seats:</h2>
						<div>
							<div className="border-[0.125rem] border-gray-500 text-gray-500 text-center">
								Screen
							</div>
							<div className="grid mt-0 grid-cols-5 gap-2 md:gap-4">
								{seats.map((seat) => (
									<button
										key={seat.id}
										onClick={handleSeatSelection(seat)}
										className={`w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 flex items-center justify-center text-sm md:text-lg font-bold rounded ${
											seat.status === "AVAILABLE"
												? "bg-green-500 cursor-pointer text-white"
												: "bg-gray-600 text-gray-300"
										}`}
										title={`Row ${seat.seatRow}, Seat ${seat.seatNumber}\nPrice: $${seat.cost}\nStatus: ${seat.status}`}>
										{seat.seatNumber}
									</button>
								))}
							</div>
						</div>
					</div>
				) : (
					<p>Loading seats...</p>
				)}
			</div>

			{/* Back button at the bottom */}
			<button
				className="px-4 py-2 text-white bg-blue-500 rounded-md"
				onClick={() => navigate(-1)}>
				&lt; Back
			</button>
			{/* Login popup */}
			<Popup
				open={isPopupOpen}
				onClose={() => setIsPopupOpen(false)}
				modal
				closeOnDocumentClick
				className="popup-modal">
				<div>You must be logged in to book a seat.</div>
				<Register onClose={() => setIsPopupOpen(false)} />
			</Popup>
		</div>
	);
}

export default Seats;
