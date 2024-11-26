import { useEffect, useState } from "react";
import useNavTitle from "../hooks/useNavTitle";
import { useParams } from "react-router-dom";
import useMovies from "../hooks/useMovies";

const sampleSeats = [
	{
		id: 1,
		seatRow: 1,
		seatNumber: 1,
		status: "BOOKED",
		cost: 10.99,
	},
	{
		id: 2,
		seatRow: 1,
		seatNumber: 2,
		status: "BOOKED",
		cost: 10.99,
	},
	{
		id: 3,
		seatRow: 1,
		seatNumber: 3,
		status: "INCART",
		cost: 10.99,
	},
	{
		id: 4,
		seatRow: 1,
		seatNumber: 4,
		status: "AVAILABLE",
		cost: 10.99,
	},
	{
		id: 5,
		seatRow: 1,
		seatNumber: 5,
		status: "AVAILABLE",
		cost: 10.99,
	},
	{
		id: 6,
		seatRow: 2,
		seatNumber: 1,
		status: "BOOKED",
		cost: 12.99,
	},
	{
		id: 7,
		seatRow: 2,
		seatNumber: 2,
		status: "AVAILABLE",
		cost: 12.99,
	},
	{
		id: 8,
		seatRow: 2,
		seatNumber: 3,
		status: "AVAILABLE",
		cost: 12.99,
	},
	{
		id: 9,
		seatRow: 2,
		seatNumber: 4,
		status: "INCART",
		cost: 12.99,
	},
	{
		id: 10,
		seatRow: 2,
		seatNumber: 5,
		status: "AVAILABLE",
		cost: 12.99,
	},
	{
		id: 11,
		seatRow: 3,
		seatNumber: 1,
		status: "AVAILABLE",
		cost: 14.99,
	},
	{
		id: 12,
		seatRow: 3,
		seatNumber: 2,
		status: "BOOKED",
		cost: 14.99,
	},
	{
		id: 13,
		seatRow: 3,
		seatNumber: 3,
		status: "AVAILABLE",
		cost: 14.99,
	},
	{
		id: 14,
		seatRow: 3,
		seatNumber: 4,
		status: "AVAILABLE",
		cost: 14.99,
	},
	{
		id: 15,
		seatRow: 3,
		seatNumber: 5,
		status: "INCART",
		cost: 14.99,
	},
	{
		id: 16,
		seatRow: 4,
		seatNumber: 1,
		status: "BOOKED",
		cost: 15.99,
	},
	{
		id: 17,
		seatRow: 4,
		seatNumber: 2,
		status: "AVAILABLE",
		cost: 15.99,
	},
	{
		id: 18,
		seatRow: 4,
		seatNumber: 3,
		status: "AVAILABLE",
		cost: 15.99,
	},
	{
		id: 19,
		seatRow: 4,
		seatNumber: 4,
		status: "AVAILABLE",
		cost: 15.99,
	},
	{
		id: 20,
		seatRow: 4,
		seatNumber: 5,
		status: "INCART",
		cost: 15.99,
	},
	{
		id: 21,
		seatRow: 5,
		seatNumber: 1,
		status: "BOOKED",
		cost: 16.99,
	},
	{
		id: 22,
		seatRow: 5,
		seatNumber: 2,
		status: "BOOKED",
		cost: 16.99,
	},
	{
		id: 23,
		seatRow: 5,
		seatNumber: 3,
		status: "AVAILABLE",
		cost: 16.99,
	},
	{
		id: 24,
		seatRow: 5,
		seatNumber: 4,
		status: "AVAILABLE",
		cost: 16.99,
	},
	{
		id: 25,
		seatRow: 5,
		seatNumber: 5,
		status: "INCART",
		cost: 16.99,
	},
];

const getSeats = () => {
	return sampleSeats;
};

function Seats() {
	const [seats, setSeats] = useState([]);
	useEffect(() => {
		setSeats(getSeats());
	}, []);
	const { setNavTitle } = useNavTitle();
	const { movies } = useMovies();
	const params = useParams();
	const selectedMovie = movies.find((movie) => movie.id === params.movieId);
	setNavTitle(`Seats for ${selectedMovie.title} in ${selectedMovie.theater}`);
	console.log(seats);
	return <div>This is the Seats page</div>;
}

export default Seats;
