import {
	getUser,
	getCart,
	getTickets,
	postCartPurchase,
} from "../utils/APIUtils";
import { useTicket } from "../hooks/useTicket";
import { useToken } from "../hooks/useToken";
import { useCart } from "../hooks/useCart";
import { useEffect, useState } from "react";
import CreditCardForm from "./CreditCardForm";
import { useNavigate } from "react-router-dom";

function CheckoutSummary() {
	const { token } = useToken();
	const { cart, setCart } = useCart();
	const [userData, setUserData] = useState(null);
	const [hasCredits, setHasCredits] = useState(false);
	const [isChecked, setIsChecked] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { setTickets } = useTicket();

	const cartTotal = cart
		? cart.reduce((acc, item) => acc + item.seat.cost, 0).toFixed(2)
		: 0;
	const creditTotal = userData?.credits
		? userData.credits
				.reduce((partialSum, a) => partialSum + a.amount, 0)
				.toFixed(2)
		: 0;
	const creditLimit = creditTotal > cartTotal ? cartTotal : creditTotal;
	const navigate = useNavigate();

	const handleCheckboxChange = () => {
		setIsChecked(!isChecked);
	};

	const handlePaymentSubmit = async (formData) => {
		console.log("Payment submitted with data", formData);
		try {
			setIsLoading(true);
			await postCartPurchase(token, isChecked ? creditLimit : 0, formData);
			setCart([]);
			setIsLoading(false);
			navigate("/payment/success");
		} catch (e) {
			console.log(e);
			navigate("/payment/fail");
		}
		getTickets(token, setTickets);
	};

	//Handling for api requests
	useEffect(() => {
		if (token) {
			const fetchData = async () => {
				try {
					const data = await getUser(token);
					setUserData(data);
					setHasCredits(data.credits.length > 0);
					getCart(token, setCart);
				} catch (error) {
					console.error("Error fetching user data:", error);
					setUserData(null);
				}
			};

			fetchData();
		}
	}, [token, setCart]);

	return isLoading ? (
		<div>Processing Payment...</div>
	) : (
		<div className="flex flex-col items-center justify-start space-y-4">
			<div className="border-4 border-black rounded-lg shadow-lg">
				<div className="flex flex-col items-center">
					<div className="flex flex-col p-4 w-full border-2 border-black bg-primary-600">
						<div className="flex justify-between items-center mb-4 bg-transparent">
							<p className="text-left">Cart Total:</p>
							<p className="text-right font-semibold">$ {cartTotal}</p>
						</div>
						{isChecked && (
							<div className="flex justify-between items-center mb-4 bg-transparent">
								<p className="text-left">Credits Applied:</p>
								<p className="text-right font-semibold">
									$ {creditLimit}
								</p>
							</div>
						)}
						{isChecked && (
							<div className="flex justify-between items-center mb-4 bg-transparent">
								<p className="text-left text-sm text-gray-400">
									Credits Remaining:
								</p>
								<p className="text-right text-sm text-gray-400 font-semibold">
									$ {(creditTotal - creditLimit).toFixed(2)}
								</p>
							</div>
						)}
						<hr className="border-t border-black my-2" />
						{isChecked ? (
							/* Credits applied */
							<div className="flex justify-between items-center bg-transparent">
								<p className="text-left mr-12">Payment Total:</p>
								<p className="text-right font-semibold">
									$ {cartTotal - creditLimit}
								</p>
							</div>
						) : (
							/* No credits */
							<div className="flex justify-between items-center bg-transparent">
								<p className="text-left mr-12">Payment Total:</p>
								<p className="text-right font-semibold">
									$ {cartTotal}
								</p>
							</div>
						)}
						<div className="flex justify-between items-center bg-transparent">
							{hasCredits && (
								<div className="flex items-center bg-transparent w-full ">
									<p className="text-sm italic text-gray-300 text-left flex-grow w-full">
										{`You have $${creditTotal} in credits available for use, would you like
										to apply them?`}
									</p>
									<input
										type="checkbox"
										className="accent-blue-500"
										checked={isChecked}
										onChange={handleCheckboxChange}
									/>
								</div>
							)}
						</div>
					</div>
					<CreditCardForm
						applyCredits={isChecked}
						creditLimit={creditLimit}
						handleSubmit={handlePaymentSubmit}
					/>
				</div>
			</div>
		</div>
	);
}

export default CheckoutSummary;
