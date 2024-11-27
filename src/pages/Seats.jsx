import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useNavTitle from "../hooks/useNavTitle";
import useMovieTheaterShowtime from "../hooks/useMovieTheaterShowtime";
import { getSeats } from "../utils/APIUtils";

function Seats() {
	const params = useParams();
	const { data } = useMovieTheaterShowtime();
	const { setNavTitle } = useNavTitle();
	const [seats, setSeats] = useState(null);
	const [showtimeDetails, setShowtimeDetails] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		// Validate and locate the showtime
		const showtimeId = parseInt(params.showtimeId, 10);
		const showtime = data.showtimes[showtimeId];

		if (!showtime) {
			console.error(`Showtime with ID ${showtimeId} not found.`);
			return;
		}

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
	}, [params.showtimeId, data, setNavTitle]);

	if (!showtimeDetails) {
		return <div>Loading showtime details...</div>;
	}

	return (
		<div className="flex flex-col items-center px-4 py-6 space-y-6">
			{/* Back button at the top */}
			<button
				className="self-start px-4 py-2 text-white bg-blue-500 rounded-md"
				onClick={() => navigate(-1)}>
				&lt; Back
			</button>

			<h1 className="text-2xl font-bold">
				{showtimeDetails.movie.title} at {showtimeDetails.theater.name}
			</h1>
			<p>
				Showtime:{" "}
				{new Date(showtimeDetails.showtime.dateTime).toLocaleString()}
			</p>
			<div className="w-full">
				{seats ? (
					<div className="flex flex-col items-center space-y-4">
						<h2 className="text-lg font-semibold">Select Your Seats:</h2>
						<div className="grid grid-cols-5 gap-2 md:gap-4">
							{seats.map((seat) => (
								<div
									key={seat.id}
									className={`w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 flex items-center justify-center text-sm font-bold rounded cursor-pointer ${
										seat.status === "AVAILABLE"
											? "bg-green-500 text-white"
											: seat.status === "INCART"
											? "bg-yellow-500 text-white"
											: "bg-red-500 text-white"
									}`}
									title={`Seat: ${seat.seatRow}-${seat.seatNumber}\nPrice: $${seat.cost}`}>
									{seat.seatNumber}
								</div>
							))}
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
		</div>
	);
}

export default Seats;
