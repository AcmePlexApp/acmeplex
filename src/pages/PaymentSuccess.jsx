import SuccessDisplay from "../components/SuccessDisplay";
import "../index.css"

function PaymentSuccess() {


	return (
		<div>
            <SuccessDisplay
            message= "Payment Successful!"
            buttonName="Back to browsing"
            buttonStyle="submit-button"
            redirectLink="/movies"
            />
            
        </div>
	);
}

export default PaymentSuccess;
