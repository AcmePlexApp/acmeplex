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

export function isLessThan72Hours(dateString) {
	// Parse the date string into a Date object
	const recordedDate = new Date(dateString);

	// Ensure the Date object is valid
	if (isNaN(recordedDate)) {
		throw new Error("Invalid date format");
	}

	const currentTime = Date.now(); // Current time in milliseconds
	const differenceInMilliseconds = recordedDate - currentTime; // Positive for future, negative for past
	const seventyTwoHoursInMilliseconds = 72 * 60 * 60 * 1000; // 72 hours in milliseconds

	// Only consider future dates within 72 hours
	return differenceInMilliseconds < seventyTwoHoursInMilliseconds;
}
