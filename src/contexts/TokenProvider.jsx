import { TokenContext } from "./TokenContext";
import useLocalStorageState from "../hooks/useLocalStorageState";

export default function TokenProvider({ children }) {
	const [token, setToken] = useLocalStorageState(false, "token");

	return (
		<TokenContext.Provider value={{ token, setToken }}>
			{children}
		</TokenContext.Provider>
	);
}
