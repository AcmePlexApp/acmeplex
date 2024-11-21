import CreditCardForm from "../components/CreditCardForm"

function Payment({ children }) {

	return (
		<div>
			<h1>Payment</h1>
			<CreditCardForm/>
			{children}
		</div>
	);
}

export default Payment;
