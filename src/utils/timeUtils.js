export const time24To12 = (time24) => {
	let [hours, minutes] = time24.split(":");
	let period = hours >= 12 ? "PM" : "AM";
	hours = hours % 12 || 12;
	return `${hours}:${minutes} ${period}`;
};
