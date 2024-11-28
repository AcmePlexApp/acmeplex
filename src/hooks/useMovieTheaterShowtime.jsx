import { MovieTheaterShowtimeContext } from "../contexts/MovieTheaterShowtimeContext";
import { useContext } from "react";

export default function useMovieTheaterShowtime() {
	const context = useContext(MovieTheaterShowtimeContext);
	if (!context) {
		throw new Error(
			"useMovieTheaterShowtime must be used within a useMovieTheaterShowtimeProvider"
		);
	}
	return context;
}
