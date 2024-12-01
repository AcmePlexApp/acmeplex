import SuccessDisplay from "../components/SuccessDisplay";
import "../index.css";

function PaymentSuccess() {
	return (
		<div>
			<SuccessDisplay
				message="Payment Successful!"
				buttonName="View Tickets"
				buttonStyle="submit-button"
				redirectLink="/profile/mytickets"
			/>
		</div>
	);
}

export default PaymentSuccess;
