import { TicketContext } from "../contexts/TicketContext";
import { useContext } from "react";

export function useTicket() {
	const context = useContext(TicketContext);
	if (!context) {
		throw new Error("useTicket must be used within a TicketProvider");
	}
	return context;
}
