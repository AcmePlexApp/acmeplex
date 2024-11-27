import { useNavigate } from "react-router-dom";

// Helper function to group showtimes by day (only future showtimes)
const groupShowtimesByDay = (showtimes) => {
	const now = new Date();

	return showtimes
		.filter((showtime) => new Date(showtime.dateTime) > now) // Filter future showtimes
		.reduce((acc, showtime) => {
			const date = new Date(showtime.dateTime).toLocaleDateString(); // Group by date
			if (!acc[date]) {
				acc[date] = [];
			}
			acc[date].push(showtime);
			return acc;
		}, {});
};

// Helper function to format time
const formatTime = (dateTime) => {
	return new Date(dateTime).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
	});
};

const Showtimes = ({ showtimes = [] }) => {
	const groupedShowtimes = groupShowtimesByDay(showtimes);
	const navigate = useNavigate();

	return (
		<>
			{Object.entries(groupedShowtimes).map(([day, dailyShowtimes]) => (
				<div key={day} className="my-2 bg-transparent">
					<h3>{day}</h3>
					<div className="flex flex-wrap gap-2 ml-0 pl-0 bg-transparent">
						{dailyShowtimes.map((showtime) => (
							<button
								key={showtime.id}
								onClick={() => navigate(`/showtimes/${showtime.id}`)}
								className="px-4 py-2 text-white rounded-md bg-blue-500">
								{formatTime(showtime.dateTime)}
							</button>
						))}
					</div>
				</div>
			))}
		</>
	);
};

export default Showtimes;
