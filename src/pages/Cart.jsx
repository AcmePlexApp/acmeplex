import { useCart } from "../hooks/useCart";
import { parseISODate } from "../utils/timeUtils";
import { useNavigate } from "react-router-dom";
import { getCart, deleteSeatFromCart } from "../utils/APIUtils";
import { useEffect } from "react";
import { useToken } from "../hooks/useToken";
import useMovieTheaterShowtime from "../hooks/useMovieTheaterShowtime";
function Cart() {
	const { cart, setCart } = useCart();
	const navigate = useNavigate();
	const { token } = useToken();
	const { data } = useMovieTheaterShowtime();

	const findShowtimeId = (theaterName, showtimeDateTime) => {
		// Find theaterId based on theaterName
		const theater = Object.values(data.theaters).find(
			(theater) => theater.name === theaterName
		);

		if (!theater) return null;

		// Find showtimeId based on theaterId and dateTime
		const showtime = Object.values(data.showtimes).find(
			(showtime) =>
				showtime.theaterId === theater.id &&
				showtime.dateTime === showtimeDateTime
		);

		return showtime ? showtime.id : null;
	};

	/* eslint-disable react-hooks/exhaustive-deps */
	useEffect(() => {
		getCart(token, setCart);
	}, []);

	const cartList = cart.map((item) => {
		return (
			<div
				key={item.id}
				className="flex flex-row justify-between bg-primary-600 rounded-xl">
				<div className="bg-transparent">
					<div className="my-0 bg-transparent">
						<span className="font-bold">{`${item.movieName} `}</span>
					</div>
					<div className="my-0 bg-transparent">
						<span>{`${item.theaterName}`}</span>
					</div>
					<div className="my-0 bg-transparent">
						<span>{`${parseISODate(item.showtime).date} `}</span>
						<span>
							{`
						${parseISODate(item.showtime).time}`}
						</span>
					</div>
					<div className="my-0 bg-transparent">
						<span>{`Row ${item.seat.seatRow} `}</span>
						<span>{`Seat ${item.seat.seatNumber}`}</span>
					</div>
				</div>
				<div className="flex flex-col justify-end bg-transparent">
					<button
						className="underline bg-transparent"
						onClick={() =>
							navigate(
								`/showtimes/${findShowtimeId(
									item.theaterName,
									item.showtime
								)}`
							)
						}>
						✏️Modify
					</button>
				</div>
				<div className="flex flex-col justify-center bg-transparent">
					<span>
						{`$${item.seat.cost}`}

						<button
							className="p-1 ml-4 text-white bg-transparent underline rounded-md"
							onClick={() =>
								deleteSeatFromCart(item.seat.id, token, cart, setCart)
							}>
							Remove
						</button>
					</span>
				</div>
			</div>
		);
	});
	return (
		<>
			<button
				className="px-4 py-2 ml-4 text-white bg-blue-500 rounded-md"
				onClick={() => navigate(-1)}>
				&lt; Back
			</button>
			<div
				id="centerThisDiv"
				className="w-full flex flex-col items-center justify-between">
				{cart.length > 0 ? (
					<div className="max-w-[30rem] bg-transparent w-full">
						{cartList}
						<hr className="mt-4" />
						<div className="bg-transparent flex flex-row justify-end">
							<span className="mr-2">{`Total (${cart.length} tickets):`}</span>
							<span className="mr-[5.5rem]">
								{`$${cart.reduce(
									(acc, item) => acc + item.seat.cost,
									0
								)}`}
							</span>
						</div>
					</div>
				) : (
					<p className="text-center font-bold">Your cart is empty!</p>
				)}
				<div className="max-w-[30rem] bg-transparent w-full">
					<button
						className="w-full p-2 mt-4 text-white bg-blue-500 rounded-md"
						onClick={() =>
							cart.length > 0
								? navigate("/payment")
								: navigate("/movies")
						}>
						{cart.length <= 0
							? "🎥Take Me to the Movies!🍿 "
							: "Proceed to Checkout"}
					</button>
				</div>
			</div>
		</>
	);
}

export default Cart;

// cost: 10.99;
// id: 33;
// seatNumber: 3;
// seatRow: 2;
// status: "INCART";
