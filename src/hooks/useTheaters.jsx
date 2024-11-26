import { TheatersContext } from "../contexts/TheatersContext";
import { useContext } from "react";

export default function useTheaters() {
	console.log("TheatersContext: ", TheatersContext);
	const context = useContext(TheatersContext);
	if (!context) {
		throw new Error("useTheaters must be used within a TheatersProvider");
	}
	return context;
}
