import { useState } from "react";
import { NavTitleContext } from "./NavTitleContext";

export default function NavTitleProvider({ children }) {
	const [navTitle, setNavTitle] = useState([]);

	return (
		<NavTitleContext.Provider value={{ navTitle, setNavTitle }}>
			{children}
		</NavTitleContext.Provider>
	);
}
