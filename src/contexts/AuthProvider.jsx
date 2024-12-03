import { AuthContext } from "./AuthContext";
import useLocalStorageState from "../hooks/useLocalStorageState";

export default function AuthProvider({ children }) {
	const [isLoggedIn, setIsLoggedIn] = useLocalStorageState(
		false,
		"isLoggedIn"
	);

	return (
		<AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
			{children}
		</AuthContext.Provider>
	);
}
