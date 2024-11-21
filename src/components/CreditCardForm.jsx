import {useState} from "react";
import "../Index.css"


function CreditCardForm(){
    //Form data
    const [formData, setFormData] = useState({
        fullName: "",
        cardNumber: "",
        cardExpiration: "",
        cvv: "",
      });

    //Handles changes to form data on event trigger
    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
    };

    return(
        <div className="infoform-div-container-centered">
            <form className="ccForm-form-container">
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
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="card-expiration-input"
                                className="ccForm-label"
                            >
                                Card expiration*
                            </label>
                            <div className="relative">
                                <input
                                type="text"
                                id="card-expiration-input"
                                name="cardExpiration"
                                value={formData.cardExpiration}
                                onChange={handleInputChange}
                                className="ccForm-field"
                                placeholder="MM/YY"
                                required
                                />
                            </div>
                        </div>
                        <div>
                        <label
                            htmlFor="cvv-input"
                            className="ccForm-label"
                        >
                        CVV*
                        </label>
                        <input
                            type="text"
                            id="cvv-input"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            className="ccForm-field"
                            placeholder="•••"
                            required
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