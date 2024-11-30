import { PremiumContext } from "../contexts/PremiumContext";
import { useContext } from "react";

export function usePremium() {
	const context = useContext(PremiumContext);
	if (!context) {
		throw new Error("usePremium must be used within an PremiumProvider");
	}
	return context;
}
