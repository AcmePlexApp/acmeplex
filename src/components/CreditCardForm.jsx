import {useState} from "react";
import "../Index.css"
import { useNavigate } from "react-router-dom";


function CreditCardForm(){

    //Handling for form data
    const [formData, setFormData] = useState({
        fullName: "",
        cardNumber: "",
        cardExpiration: "",
        cvv: "",
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
    };

    const handleSubmit =(e) =>{
        e.preventDefault();
        console.log("Payment sumitted")
        console.log(formData.fullName)
        console.log(formData.cardNumber)
        //place holder navigation
        navigate("/payment/success")
        //User query string to handle rerouting to previous page afer logging in (protected pages)

    }
    
    return(
        <div className="infoform-div-container-centered">
            <form className="ccForm-form-container" onSubmit={handleSubmit}>
                <div className='flex flex-col items-center'>
                    <div className="mb-6 grid grid-cols-2 gap-4">
                        <div className="col-span-2 sm:col-span-1">
                            <label
                                htmlFor="full_name"
                                className="ccForm-label"
                            >
                                Full name (as displayed on card)*
                            </label>
                            <input
                                type="text"
                                id="full_name"
                                name="fullName"
                                className="ccForm-field"
                                placeholder="First Last"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                            <label
                                htmlFor="card-number-input"
                                className="ccForm-label"
                            >
                                Card number*
                            </label>
                            <input
                                type="text"
                                id="card-number-input"
                                name="cardNumber"
                                className="ccForm-field"
                                placeholder="xxxx-xxxx-xxxx-xxxx"
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                                pattern="^4[0-9]{12}(?:[0-9]{3})?$"
                                required
                                maxLength={16}
                            />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label
                                htmlFor="card-expiration-input"
                                className="ccForm-label">
                                Card expiration*
                            </label>
                                <input
                                type="text"
                                id="card-expiration-input"
                                name="cardExpiration"
                                value={formData.cardExpiration}
                                onChange={handleInputChange}
                                className="ccForm-field"
                                placeholder="MMYY"
                                required
                                pattern="^(0[2-9]|1[0-2])(\d{2})$"
                                />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label
                                htmlFor="cvv-input"
                                className="ccForm-label">
                                CVV*
                            </label>
                            <input
                                type="text"
                                pattern="[0-9]{3}"
                                id="cvv-input"
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleInputChange}
                                className="ccForm-field"
                                placeholder="•••"
                                required
                                maxLength={3}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="submit-button"
                        >
                        Pay now
                    </button>
                </div>
        </form>
    </div>
    );      
};

export default CreditCardForm;