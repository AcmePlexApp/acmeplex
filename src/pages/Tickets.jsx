import { useEffect } from "react";
import { useTicket } from "../hooks/useTicket";
import { getTickets, cancelTicket } from "../utils/APIUtils";
import { useToken } from "../hooks/useToken";
import { parseISODate } from "../utils/timeUtils";
import { isLessThan72Hours } from "../utils/timeUtils";
import RedirectButton from "../components/RedirectButton";

function Tickets() {
	const { tickets, setTickets } = useTicket();
	const { token } = useToken();

	useEffect(() => {
		async function fetchTickets() {
			try {
				await getTickets(token, setTickets);
			} catch (error) {
				console.error("Failed to fetch tickets:", error);
			}
		}

		fetchTickets();
	}, [token, setTickets]);

	const ticketList = tickets.map((item) => {
		const allowCancel = !isLessThan72Hours(item.showtime);
		return (
			<div
				key={item.id}
				className="flex flex-row justify-between bg-primary-600 rounded-xl border-2 border-black">
				<div className="bg-transparent">
					<div className="my-0 bg-transparent">
						<span className="font-bold">{`${item.movieName} `}</span>
					</div>
					<div className="my-0 bg-transparent">
						<span>{`${item.theaterName}`}</span>
					</div>
					<div className="my-0 bg-transparent">
						<span>{`${parseISODate(item.showtime).date} `}</span>
						<span>
							{`
						${parseISODate(item.showtime).time}`}
						</span>
					</div>
					<div className="my-0 bg-transparent">
						<span>{`Row ${item.seat.seatRow} `}</span>
						<span>{`Seat ${item.seat.seatNumber}`}</span>
					</div>
				</div>

				<div className="flex flex-col justify-center bg-transparent">
					<span>
						{allowCancel ? (
							<button
								className={`p-1 ml-4 text-white bg-transparent underline rounded-md border-transparent hover:border-2 important hover:border-black cursor-pointer`}
								onClick={() => cancelTicket(item, token, setTickets)}>
								Cancel Ticket
							</button>
						) : null}
					</span>
				</div>
				<div className="flex flex-col justify-center bg-transparent">{`$${item.seat.cost}`}</div>
			</div>
		);
	});

	return (
		<div>
			<RedirectButton
                name='Back'
                redirect="/profile"
                className='back-button'
            />
			<div className="w-full flex flex-col items-center">
				<div className="w-full max-w-[40rem] flex flex-col justify-center">
					{ticketList}
				</div>
			</div>
		</div>
	);
}

export default Tickets;
