import "../index.css"
import FailDisplay from "../components/FailDisplay";

function PaymentFail() {

	return (
		<div >
            <FailDisplay
            message= "Payment Failed!"
            buttonName="Back to browsing"
            buttonStyle="submit-button"
            redirectLink= "/movies"
            />
        </div>
	);
}

export default PaymentFail;
