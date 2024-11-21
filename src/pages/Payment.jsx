import CreditCardForm from "../components/CreditCardForm";

function Payment({ children }) {
	return (
		<div>
			<CreditCardForm />
			{children}
		</div>
	);
}

export default Payment;
