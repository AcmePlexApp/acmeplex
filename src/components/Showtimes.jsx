// Helper function to group showtimes by day (only future showtimes)
const groupShowtimesByDay = (showtimes) => {
	// Get the current date and time
	const now = new Date();

	// Filter out past showtimes
	const futureShowtimes = showtimes.filter(
		(showtime) => new Date(showtime.dateTime) > now
	);

	// Group the filtered showtimes by day
	return futureShowtimes.reduce((acc, showtime) => {
		const date = new Date(showtime.dateTime).toLocaleDateString(); // Extract date
		if (!acc[date]) {
			acc[date] = [];
		}
		acc[date].push(showtime);
		return acc;
	}, {});
};

function Showtimes(props) {
	return (
		<>
			{Object.entries(groupShowtimesByDay(props.showtimes)).map(
				([day, showtimes]) => (
					<div key={day} className="my-2 bg-transparent">
						<h3>{day}</h3>
						<div className="flex flex-wrap gap-2 ml-0 pl-0 bg-transparent">
							{showtimes.map((showtime) => (
								<button
									key={showtime.id}
									className="px-4 py-2 text-white rounded-md bg-blue-500">
									{new Date(showtime.dateTime).toLocaleTimeString([], {
										hour: "2-digit",
										minute: "2-digit",
									})}
								</button>
							))}
						</div>
					</div>
				)
			)}
		</>
	);
}

export default Showtimes;
