import popcorn_fail from "../assets/popcorn_fail.png"
import "../index.css"

//Need to either pass payment amount from pay screen or get 
function PaymentFail() {
//     const formData = {
//         amountPaid: "",
//         email: "",
//     };

	return (
		<div className="infoform-div-container-centered">
            <div className="flex flex-col justify-start items-center pt-10">
                <img
                src={popcorn_fail}
                className="h-32 object-cover"
                >
                </img>
                <h1>
                Payment Failed
                </h1>
		    </div>
            
        </div>
	);
}

export default PaymentFail;
