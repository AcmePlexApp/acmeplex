import RedirectButton from "../components/RedirectButton";
import {usePremium} from "../hooks/usePremium";
import { useNavigate } from "react-router-dom";


function Premium() {
    const { isPremium } = usePremium();
    const navigate = useNavigate();   

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate("/payment", { state: { from: "premium" } });
    }

    console.log("Premium: ", isPremium)
    return (
        <div>
            <RedirectButton
                name='Back'
                redirect="/profile"
                className='back-button'
            />
            <div>
                <form className="max-w-md mx-auto rounded-lg p-4 shadow-sm sm:p-6 lg:max-w-xl lg:p-8">
                    <div>
                        <div className="infoform-div-container group mb-4">
                            <p className="infoform-input-field peer w-full" name = "accountStatus">
                                {isPremium ? "Premium" : "Basic"}
                            </p>
                            <label className="infoform-input-label peer" htmlFor="accountStatus">
                                Account Status
                            </label>
                        </div>

                        {isPremium && (
                            <div className="infoform-div-container group mb-4">
                                <p className="infoform-input-field peer w-full" name= "expiryDate">
                                    2099-12-12
                                </p>
                                <label className="infoform-input-label peer" htmlFor="expiryDate">
                                    Membership Renewal Date
                                </label>
                            </div>
                        )}
                        {isPremium && (
                            <div className="infoform-div-container group mb-4">
                                <p className="infoform-input-field peer w-full" name = "fullName">
                                    Name Name
                                </p>
                                <label className="infoform-input-label peer" htmlFor="fullName">
                                    Full Name
                                </label>
                            </div>
                        )}
                        {isPremium && (
                            <div className="infoform-div-container group mb-4">
                                <p className="infoform-input-field peer w-full" name="cardNumber">
                                    Card Number
                                </p>
                                <label className="infoform-input-label peer" htmlFor="cardNumber">
                                    Card Number
                                </label>
                            </div>
                        )}
                        {isPremium && (
                            <div className="infoform-div-container group mb-4">
                                <p className="infoform-input-field peer w-full" name = "cardExpiryDate">
                                    Expiration Date
                                </p>
                                <label className="infoform-input-label peer" htmlFor="cardExpiryDate">
                                    Expiration Date
                                </label>
                            </div>
                        )}
                        {!isPremium&& (
                            <div className="infoform-div-container-centered">
                            <button
                                className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center border-2 border-black"
                                onClick={handleSubmit}
                                type="button"
                            >
                                Upgrade!
                            </button>
                        </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Premium;
