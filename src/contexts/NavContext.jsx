import { createContext, useContext, useState } from "react";

const NavContext = createContext();

export const NavProvider = ({ children }) => {
	const [title, setTitle] = useState("");

	return (
		<NavContext.Provider value={{ title, setTitle }}>
			{children}
		</NavContext.Provider>
	);
};

export const useNav = () => useContext(NavContext);
