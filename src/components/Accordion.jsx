import { useState } from "react";

export default function Accordion({ title, data }) {
	const [isOpen, setIsOpen] = useState(false);

	const toggleAccordion = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<div className="mb-1 p-0 bg-primary-500">
			<button
				className=" m-0 bg-transparent w-full p-4 text-left transition duration-300 hover:bg-primary-400"
				onClick={toggleAccordion}>
				{title}
				<span
					className={`float-right transform ${
						isOpen ? "rotate-180" : "rotate-0"
					} transition-transform duration-300 bg-transparent`}>
					&#9660;
				</span>
			</button>
			{isOpen && <div className="bg-transparent my-0 py-0">{data}</div>}
		</div>
	);
}
