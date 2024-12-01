import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useNavTitle from "../hooks/useNavTitle";
import useMovieTheaterShowtime from "../hooks/useMovieTheaterShowtime";
import { useAuth } from "../hooks/useAuth";
import Popup from "reactjs-popup";
import Register from "../pages/Register";
import { useToken } from "../hooks/useToken";
import { useCart } from "../hooks/useCart";
import {
	postCart,
	getCart,
	getSeats,
	deleteSeatFromCart,
} from "../utils/APIUtils";
import Notification from "../components/Notification";

function Seats() {
	const params = useParams();
	const { data } = useMovieTheaterShowtime();
	const { setNavTitle } = useNavTitle();
	const { cart, setCart } = useCart();
	const [seats, setSeats] = useState(null);
	const [showtimeDetails, setShowtimeDetails] = useState(null);
	const showtimeId = parseInt(params.showtimeId, 10);
	const showtime = data.showtimes[showtimeId];
	const navigate = useNavigate();

	const { isLoggedIn } = useAuth(); // Access auth state
	const { token } = useToken();
	const [isPopupOpen, setIsPopupOpen] = useState(false); // State for login popup
	const [message, setMessage] = useState("");

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

	const handleSeatSelection = (seat) => async () => {
		console.log("Seat selected:", seat);
		console.log("Cart:", cart);

		if (!isLoggedIn) {
			setIsPopupOpen(true);
			return;
		}

		try {
			if (isSeatInCart(seat.id)) {
				// Remove the seat from the cart
				const successMessage = await deleteSeatFromCart(
					seat.id,
					token,
					cart,
					setCart
				);
				setMessage(successMessage);

				// Update the seat status to AVAILABLE
				setSeats((prevSeats) =>
					prevSeats.map((s) =>
						s.id === seat.id ? { ...s, status: "AVAILABLE" } : s
					)
				);
			} else if (seat.status === "AVAILABLE") {
				// Add the seat to the cart
				const successMessage = await postCart(seat.id, token, setCart);
				setMessage(successMessage);

				// Update the seat status to INCART
				setSeats((prevSeats) =>
					prevSeats.map((s) =>
						s.id === seat.id ? { ...s, status: "INCART" } : s
					)
				);
			} else if (seat.status === "BOOKED" || seat.status === "INCART") {
				console.log("Seat is already booked.");
			} else {
				console.log("Unknown seat status:", seat.status);
			}
		} catch (error) {
			setMessage(`${error.message}`);
		}
	};

	const isSeatInCart = (seatId) => {
		return cart ? cart.some((item) => item.seat.id === seatId) : false;
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
	}, [showtime, showtimeId, data, setNavTitle]);

	/* eslint-disable react-hooks/exhaustive-deps */
	useEffect(() => {
		async function fetchCart() {
			if (isLoggedIn) {
				await getCart(token, setCart);
			}
		}
		fetchCart();
		console.log("Cart:", cart);
	}, []);

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
					<div className="flex flex-col items-center">
						<h2 className="text-lg font-semibold m-0">
							Select Your Seats:
						</h2>
						<div>
							<div className="flex flex-row justify-between m-0">
								<span className="my-1 flex flex-col justify-center">
									Legend:
								</span>
								<div className="flex flex-row flex-1 justify-between my-0">
									<span className="bg-green-500 p-2 my-4 border-2 rounded border-black text-white">
										Available
									</span>
									<span className="bg-blue-500 p-2 my-4 border-2 rounded border-black text-white">
										In Your Cart
									</span>
									<span className="bg-gray-600 p-2 my-4 border-2 rounded border-black text-gray-300">
										Unavailable
									</span>
								</div>
							</div>
							<div className="border-[0.125rem] border-gray-500 text-gray-500 text-center mt-0">
								Screen
							</div>
							<div className="grid mt-0 grid-cols-5 gap-2 md:gap-4">
								{seats.map((seat) => (
									<button
										key={seat.id}
										onClick={handleSeatSelection(seat)}
										className={`w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 flex items-center justify-center text-sm md:text-lg font-bold rounded ${
											isSeatInCart(seat.id)
												? "bg-blue-500 text-white"
												: seat.status === "AVAILABLE"
												? "bg-green-500 cursor-pointer text-white"
												: "bg-gray-600 cursor-not-allowed disabled text-gray-300"
										}`}
										title={`ID: ${seat.id}\nRow ${seat.seatRow}, Seat ${seat.seatNumber}\nPrice: $${seat.cost}\nStatus: ${seat.status}`}>
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
			<Notification message={message} />
		</div>
	);
}

export default Seats;
