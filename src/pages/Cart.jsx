import { useCart } from "../hooks/useCart";
import { parseISODate } from "../utils/timeUtils";
import { useNavigate } from "react-router-dom";
import { getCart, deleteSeatFromCart } from "../utils/APIUtils";
import { useEffect, useState } from "react";
import { useToken } from "../hooks/useToken";
import useMovieTheaterShowtime from "../hooks/useMovieTheaterShowtime";
import FailDisplay from "../components/FailDisplay";
import Notification from "../components/Notification";
function Cart() {
	const { cart, setCart } = useCart();
	const navigate = useNavigate();
	const { token } = useToken();
	const { data } = useMovieTheaterShowtime();
	const [count, setCount] = useState(0);
	const [message, setMessage] = useState("");

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

	const handleDeleteFromCart = async (seatId) => {
		try {
			await deleteSeatFromCart(seatId, token, cart, setCart);
			setCount((prev) => prev + 1);
			setMessage("Seat removed from cart successfully");
		} catch (error) {
			setCount((prev) => prev + 1);
			setMessage(error.message);
			console.error("Failed to delete seat from cart:", error);
		}
	};

	/* eslint-disable react-hooks/exhaustive-deps */
	useEffect(() => {
		getCart(token, setCart);
	}, []);

	const cartList = cart.map((item) => {
		return (
			<div
				key={item.id}
				className="flex flex-col sm:flex-row justify-between bg-primary-600 rounded-xl border-2 border-black">
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
				<div className="flex flex-col flex-grow-0 justify-end bg-transparent p-0 m-0">
					<button
						className="p-1 m-0 underline bg-transparent border-transparent hover:border-2 important hover:border-black"
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
				<div className="flex flex-col sm:flex-row items-center justify-center bg-transparent">
					<span>
						<button
							className="p-1 ml-4 text-white bg-transparent underline rounded-md border-transparent hover:border-2 important hover:border-black"
							onClick={() => handleDeleteFromCart(item.seat.id)}>
							Remove
						</button>
					</span>
					<span>{`$${item.seat.cost}`}</span>
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
			<div className="w-full flex flex-col items-center justify-between">
				{cart.length > 0 ? (
					<div className="max-w-[40rem] bg-transparent w-full">
						{cartList}
						<hr className="mt-4" />
						<div className="bg-transparent flex flex-row justify-end">
							<span className="mr-2">{`Total (${cart.length} tickets):`}</span>
							<span className="mr-3">
								{`$${cart.reduce(
									(acc, item) => acc + item.seat.cost,
									0
								)}`}
							</span>
						</div>
					</div>
				) : (
					<FailDisplay
						message="Your cart is empty!"
						buttonName="🎥Take Me to the Movies!🍿"
						redirectLink={"/movies"}
					/>
				)}
				{cart.length > 0 ? (
					<div className="max-w-[40rem] bg-transparent w-full">
						<button
							className="w-full p-2 mt-4 text-white bg-blue-500 rounded-md "
							onClick={() =>
								navigate("/payment", { state: { from: "cart" } })
							}>
							{"Proceed to Checkout"}
						</button>
					</div>
				) : null}
				<Notification message={message} key={count} />
			</div>
		</>
	);
}

export default Cart;
