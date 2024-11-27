import { ShowtimesContext } from "../contexts/ShowtimesContext";
import { useContext } from "react";

export default function useShowtimes() {
	console.log("ShowtimesContext: ", ShowtimesContext);
	const context = useContext(ShowtimesContext);
	if (!context) {
		throw new Error("useShowtimes must be used within a ShowtimesProvider");
	}
	return context;
}
