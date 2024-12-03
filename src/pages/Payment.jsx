import CheckoutSummary from "../components/CheckoutSummary";
import PremiumSummary from "../components/PremiumSummary";
import { useLocation } from 'react-router-dom';


function Payment({ children }) {

	const location = useLocation();
	const fromPaymentCreator = location.state?.from;
	console.log("Payment page - location.state.from:", fromPaymentCreator);
	console.log("Location State:", location.state);



	if(fromPaymentCreator == 'cart'){
		return (
			<div>
				<CheckoutSummary/>
				{children}
			</div>
		)
	}

	if(fromPaymentCreator == 'premium'){
		return (
			<div>
				<PremiumSummary/>
				{children}
			</div>
		)
	}

	return <div>No valid source</div>;
}
export default Payment;
