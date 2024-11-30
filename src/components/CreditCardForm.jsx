// import {useState} from "react";
import "../Index.css"
import { useNavigate } from "react-router-dom";
// import SummaryForm from "./SummaryForm";
import { getCart, getUser, postCartPurchase } from "../utils/APIUtils";
import { useToken } from "../hooks/useToken";
import { useCart} from "../hooks/useCart";
import { useEffect, useState } from "react";



function CreditCardForm(){
    const {token} = useToken();
    const {cart, setCart} = useCart();
    const [userData, setUserData] = useState(null);
    const [hasCredits, setHasCredits] = useState(false);
    const [isChecked, setIsChecked]= useState(false);
    
    const cartTotal = cart ?  cart.reduce((acc, item) => acc + item.seat.cost, 0).toFixed(2): 0;
    const creditTotal = userData?.credits ? userData.credits.reduce((partialSum, a) => partialSum + a, 0).toFixed(2) : 0;
    const creditLimit = creditTotal > cartTotal ? cartTotal : creditTotal;

    const handleCheckboxChange = () =>{
        setIsChecked(!isChecked);
    }

    //Handling for form data
    const [formData, setFormData] = useState({
        firstName: "",
        lastName:"",
        cardNumber: "",
        cardExpiration: "",
        // cvv: "",
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
    };

    const handleSubmit =async(e) =>{
        e.preventDefault();
        console.log("Payment sumitted")
        try{
            await postCartPurchase(token, (isChecked? creditLimit: 0), formData)
            navigate("/payment/success");
        }
        catch(e){
            console.log(e)
            navigate("/payment/fail");
        }
    }

    //Handling for api requests
    useEffect(() => {
        if (token) {
          const fetchData = async () => {
            try {
                const data = await getUser(token); 
                setUserData(data);
                setHasCredits(() => {data.credits.length == 0 ? false: true})
                getCart(token, setCart);
            } catch (error) {
              console.error("Error fetching user data:", error);
              setUserData(null);
            }
          };
    
          fetchData();
        }
      }, [token, setCart]);

    if (userData == null) {
        return <div>Loading...</div>;
    }

    
    return(
    <div className="flex flex-col items-center justify-start space-y-4">
    <form className="border-4 border-black rounded-lg shadow-lg" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center">
        <div className="flex flex-col p-4 w-full border-2 border-black bg-primary-600">
          <div className="flex justify-between items-center mb-4 bg-transparent">
            <p className="text-left">Cart Total:</p> 
            <p className="text-right font-semibold">
              $ {cartTotal}
            </p>
          </div>
          {isChecked && (
            <div className="flex justify-between items-center mb-4 bg-transparent">
              <p className="text-left">Credits Applied:</p> 
              <p className="text-right font-semibold">
                $ {creditLimit}        
              </p>
            </div>
          )}
          {isChecked && (
            <div className="flex justify-between items-center mb-4 bg-transparent">
              <p className="text-left text-sm text-gray-400">Credits Remaining:</p> 
              <p className="text-right text-sm text-gray-400 font-semibold">
                $ {(creditTotal - creditLimit).toFixed(2)}        
              </p>
            </div>
          )}
          <hr className="border-t border-black my-2" />
          {isChecked ? (
            /* Credits applied */
            <div className="flex justify-between items-center bg-transparent">
              <p className="text-left mr-12">Payment Total:</p> 
              <p className="text-right font-semibold">$ {cartTotal - creditLimit}</p>
            </div>
          ) : (
            /* No credits */
            <div className="flex justify-between items-center bg-transparent">
              <p className="text-left mr-12">Payment Total:</p> 
              <p className="text-right font-semibold">$ {cartTotal}</p>
            </div>
          )}
          <div className="flex justify-between items-center bg-transparent">
            {hasCredits && (
              <div className="flex items-center bg-transparent w-full ">
                <p className="text-sm italic text-gray-300 text-left flex-grow w-full">
                  You have credits available for use, would you like to apply them?
                </p>
                <input
                  type="checkbox"
                  className="accent-blue-500"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
  
      <div className='flex flex-col items-center'>
        <div className="mb-6 grid grid-cols-2 gap-4">
          {/* First Name Field */}
          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="first_name"
              className="mb-2 block text-sm font-medium text-white"
            >
              First Name*
            </label>
            <input
              type="text"
              id="first_name"
              name="firstName"
              className="block w-full rounded-lg border border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 p-2.5 pe-10 text-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="First"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
  
          {/* Last Name Field */}
          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="last_name"
              className="mb-2 block text-sm font-medium text-white"
            >
              Last Name*
            </label>
            <input
              type="text"
              id="last_name"
              name="lastName"
              className="block w-full rounded-lg border border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 p-2.5 pe-10 text-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="Last"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
  
          {/* Card Number Field */}
          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="card-number-input"
              className="mb-2 block text-sm font-medium text-white"
            >
              Card number*
            </label>
            <input
              type="text"
              id="card-number-input"
              name="cardNumber"
              className="block w-full rounded-lg border border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 p-2.5 pe-10 text-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="xxxx-xxxx-xxxx-xxxx"
              value={formData.cardNumber}
              onChange={handleInputChange}
              pattern="^4[0-9]{12}(?:[0-9]{3})?$"
              required
              maxLength={16}
            />
          </div>
  
          {/* Card Expiration Field */}
          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="card-expiration-input"
              className="mb-2 block text-sm font-medium text-white"
            >
              Card expiration*
            </label>
            <input
              type="text"
              id="card-expiration-input"
              name="cardExpiration"
              value={formData.cardExpiration}
              onChange={handleInputChange}
              className="block w-full rounded-lg border border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 p-2.5 pe-10 text-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="MMYY"
              required
              pattern="^(0[2-9]|1[0-2])(\d{2})$"
            />
          </div>
  
          {/* CVV Field */}
          {/* <div className="col-span-2 sm:col-span-1">
              <label
                  htmlFor="cvv-input"
                  className="mb-2 block text-sm font-medium text-white"
              >
                  CVV*
              </label>
              <input
                  type="text"
                  pattern="[0-9]{3}"
                  id="cvv-input"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 p-2.5 pe-10 text-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder="•••"
                  required
                  maxLength={3}
              />
          </div> */}
        </div>
  
        {/* Submit Button */}
        <button
          type="submit"
          className="submit-button"
        >
          Pay now
        </button>
      </div>
  
    </form>
  </div>
  );};

export default CreditCardForm;