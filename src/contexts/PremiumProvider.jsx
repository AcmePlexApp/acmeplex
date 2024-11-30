import { PremiumContext } from "./PremiumContext";
// import useLocalStorageState from "../hooks/useLocalStorageState";
import {useEffect, useState} from "react";
import { useToken } from "../hooks/useToken";
// import{BASE_API_URL, BASE_HEADERS} from "../utils/APIUtils"
import{getUser} from "../utils/APIUtils"



export default function PremiumProvider({ children }) {

	const {token} = useToken()

	const [isPremium, setIsPremium] = useState(
		false,
		"isPremium"
	);

    // const getUser = async () => {
	// 	console.log("getUser function called"); 
	// 	const response = await fetch(
	// 		`${BASE_API_URL}/user`,
	// 		{
	// 			headers:{
	// 			...BASE_HEADERS,
	// 			Authorization: `Bearer ${token}`,
	// 			},
	// 			method: "GET",
	// 		}
	// 	);
	// 	if (!response.ok) {
	// 		throw new Error(`Failed to fetch user data: ${response.statusText}`);
			
	// 	}
	// 	const data = await response.json();
	// 	console.log("User data:", data);
	// 	setIsPremium(data.registered);
	// };
	
	useEffect((token) => {
        if (token) {
        try{
           const data = async() => await getUser(token)
			setIsPremium(data.registered)
        }
        catch(e){
            console.log(e);
        	};
        	}
        }, [token]);

	return (
		<PremiumContext.Provider value={{ isPremium, setIsPremium }}>
			{children}
		</PremiumContext.Provider>
	);
}
