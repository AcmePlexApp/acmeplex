export const truncateDescription = (description, maxLength) => {
	if (description.length <= maxLength) {
		return description;
	}

	const words = description.split(" ");
	let truncated = "";

	for (let i = 0; i < words.length; i++) {
		// Check if adding the next word would exceed the max length
		if (
			truncated.length + words[i].length + (truncated ? 1 : 0) >
			maxLength
		) {
			break;
		}
		truncated += (truncated ? " " : "") + words[i];
	}

	return truncated + "...";
};
