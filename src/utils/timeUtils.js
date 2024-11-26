export const getMonthName = (month) => {
	return new Date(0, month).toLocaleString("en-US", { month: "long" });
};

export const getDayName = (day) => {
	return new Date(0, 0, day).toLocaleString("en-US", { weekday: "long" });
};

export const parseISODate = (isoString) => {
	let isoDate = new Date(isoString);
	let formattedDate = isoString.split("T")[0];
	// Extract hours and minutes
	let hours = isoDate.getHours();
	const minutes = isoDate.getMinutes().toString().padStart(2, "0");

	// Determine AM/PM and convert to 12-hour format
	const ampm = hours >= 12 ? "PM" : "AM";
	hours = hours % 12 || 12; // Convert 0 to 12 for midnight

	const formattedTime = `${hours}:${minutes} ${ampm}`;
	return { date: formattedDate, time: formattedTime };
};
