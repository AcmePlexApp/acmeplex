import { NavTitleContext } from "../contexts/NavTitleContext";
import { useContext } from "react";

export default function useNavTitle() {
	const context = useContext(NavTitleContext);
	if (!context) {
		throw new Error("useMovies must be used within a MoviesProvider");
	}
	return context;
}
