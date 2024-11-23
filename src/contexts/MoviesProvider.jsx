import { useState } from "react";
import { MoviesContext } from "./MoviesContext";

export default function MoviesProvider({ children }) {
	const [movies, setMovies] = useState([]);

	return (
		<MoviesContext.Provider value={{ movies, setMovies }}>
			{children}
		</MoviesContext.Provider>
	);
}
