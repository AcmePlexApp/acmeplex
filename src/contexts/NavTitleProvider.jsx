import useLocalStorageState from "../hooks/useLocalStorageState";
import { NavTitleContext } from "./NavTitleContext";

export default function NavTitleProvider({ children }) {
	const [navTitle, setNavTitle] = useLocalStorageState("", "navTitle");

	return (
		<NavTitleContext.Provider value={{ navTitle, setNavTitle }}>
			{children}
		</NavTitleContext.Provider>
	);
}
