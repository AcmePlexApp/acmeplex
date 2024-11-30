import { PremiumContext } from "./PremiumContext";
// import useLocalStorageState from "../hooks/useLocalStorageState";
import {useEffect, useState} from "react";
import { useToken } from "../hooks/useToken";
// import{BASE_API_URL, BASE_HEADERS} from "../utils/APIUtils"
import{getUser} from "../utils/APIUtils"



export default function PremiumProvider({ children }) {

	const {token} = useToken()

	const [isPremium, setIsPremium] = useState(false);

	useEffect(() => {
		if (token) {
			const fetchUserData = async () => {
				try {
					const data = await getUser(token);
					setIsPremium(data.registered);
				} catch (e) {
					console.log(e);
				}
			};
			fetchUserData();
		}
	}, [token]);

	return (
		<PremiumContext.Provider value={{ isPremium, setIsPremium }}>
			{children}
		</PremiumContext.Provider>
	);
}
