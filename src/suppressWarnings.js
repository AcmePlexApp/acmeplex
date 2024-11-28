const suppressedKeywords = ["defaultProps"]; // Keywords to suppress

// Save original methods
const originalError = console.error;

// Override console.error
console.error = (...args) => {
	// Combine all arguments into a single string for matching
	const message = args
		.map((arg) => (typeof arg === "string" ? arg : JSON.stringify(arg)))
		.join(" ");

	// Check if any suppressed keyword is present in the message
	if (!suppressedKeywords.some((keyword) => message.includes(keyword))) {
		originalError(...args); // Log the error if no keyword matches
	}
};
