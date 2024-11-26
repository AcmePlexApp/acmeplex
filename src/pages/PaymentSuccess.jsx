import popcorn_success from "../assets/popcorn_success.png"
import "../index.css"

//Need to either pass payment amount from pay screen or get 
function PaymentSuccess() {
//     const formData = {
//         amountPaid: "",
//         email: "",
//     };

	return (
		<div className="infoform-div-container-centered">
            <div className="flex flex-col justify-start items-center pt-10">
                <img
                src={popcorn_success}
                className="w-28 object-cover"
                >
                </img>
                <h1>
                Payment Successful!
                </h1>
		    </div>
            
        </div>
	);
}

export default PaymentSuccess;
