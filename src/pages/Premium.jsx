import RedirectButton from "../components/RedirectButton";
import {usePremium} from "../hooks/usePremium";

function Premium() {
    const { isPremium, setIsPremium } = usePremium();

    return (
        <div>
            <RedirectButton
                name='Back'
                redirect="/profile"
                className='back-button'
            />
            <div>
                <form
                    className="max-w-md mx-auto rounded-lg p-4 shadow-sm sm:p-6 lg:max-w-xl lg:p-8"
                    onSubmit={() => setIsPremium(true)}
                >
                    <div>
                        <div className="infoform-div-container group mb-4">
                            <p className="infoform-input-field peer w-full">
                                {isPremium ? "Premium" : "Basic"}
                            </p>
                            <label className="infoform-input-label peer" htmlFor="account-status">
                                Account Status
                            </label>
                        </div>

                        {isPremium && (
                            <div className="infoform-div-container group mb-4">
                                <p className="infoform-input-field peer w-full">
                                    2099-12-12
                                </p>
                                <label className="infoform-input-label peer" htmlFor="expiration-date">
                                    Membership Renewal Date
                                </label>
                            </div>
                        )}
                        {isPremium && (
                            <div className="infoform-div-container group mb-4">
                                <p className="infoform-input-field peer w-full">
                                    Name Name
                                </p>
                                <label className="infoform-input-label peer" htmlFor="expiration-date">
                                    Full Name
                                </label>
                            </div>
                        )}
                        {isPremium && (
                            <div className="infoform-div-container group mb-4">
                                <p className="infoform-input-field peer w-full">
                                    Card Number
                                </p>
                                <label className="infoform-input-label peer" htmlFor="expiration-date">
                                    Card Number
                                </label>
                            </div>
                        )}
                        {isPremium && (
                            <div className="infoform-div-container group mb-4">
                                <p className="infoform-input-field peer w-full">
                                    Expiration Date
                                </p>
                                <label className="infoform-input-label peer" htmlFor="expiration-date">
                                    Expiration Date
                                </label>
                            </div>
                        )}
                        {!isPremium&& (
                            <div className="infoform-div-container-centered">
                            <button
                                className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center border-2 border-black"
                                type="submit"
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
