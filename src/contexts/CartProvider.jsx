import { CartContext } from "./CartContext";
import useLocalStorageState from "../hooks/useLocalStorageState";

export default function CartProvider({ children }) {
	const [cart, setCart] = useLocalStorageState([], "cart");

	return (
		<CartContext.Provider value={{ cart, setCart }}>
			{children}
		</CartContext.Provider>
	);
}
