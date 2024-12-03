import { useState, useEffect } from "react";

function Notification({ message }) {
	const [visible, setVisible] = useState(false);
	const [currentMessage, setCurrentMessage] = useState("");
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (message) {
			// Reset the state to re-trigger visibility
			setVisible(false);
			setTimeout(() => {
				setCurrentMessage(message);
				setVisible(true);
			}, 0); // Short delay to allow state reset

			const autoHideTimer = setTimeout(() => {
				setVisible(false); // Hide after 2 seconds
			}, 2000);
			setCount((prev) => prev + 1);

			return () => clearTimeout(autoHideTimer);
		}
	}, [message, setCount]);

	if (!visible || !currentMessage) return null;

	return (
		<div
			key={count}
			className="max-w-96 fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg flex items-center space-x-2">
			<span>{currentMessage}</span>
			<button
				className="text-white focus:outline-none border-none bg-transparent"
				onClick={() => setVisible(false)}>
				<span className="font-bold text-white bg-transparent text-xl">
					x
				</span>
			</button>
		</div>
	);
}

export default Notification;
