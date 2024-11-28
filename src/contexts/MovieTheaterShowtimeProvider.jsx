import useLocalStorageState from "../hooks/useLocalStorageState";
import { MovieTheaterShowtimeContext } from "./MovieTheaterShowtimeContext";
function MovieTheaterShowtimeProvider({ children }) {
	const [data, setData] = useLocalStorageState(
		{ movies: {}, theaters: {}, showtimes: {} },
		"movieTheaterShowtime"
	);
	return (
		<MovieTheaterShowtimeContext.Provider value={{ data, setData }}>
			{children}
		</MovieTheaterShowtimeContext.Provider>
	);
}

export default MovieTheaterShowtimeProvider;
