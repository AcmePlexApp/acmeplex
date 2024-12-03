import { TicketContext } from "./TicketContext";
import useLocalStorageState from "../hooks/useLocalStorageState";

export default function TokenProvider({ children }) {
	const [tickets, setTickets] = useLocalStorageState(false, "tickets");

	return (
		<TicketContext.Provider value={{ tickets, setTickets }}>
			{children}
		</TicketContext.Provider>
	);
}
