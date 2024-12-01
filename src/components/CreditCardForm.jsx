import "../Index.css"
import { getUser } from "../utils/APIUtils";
import { useToken } from "../hooks/useToken";
import { useEffect, useState } from "react";
// import { usePremium } from "../hooks/usePremium"



function CreditCardForm({handleSubmit}){
    const {token} = useToken();
    const [userData, setUserData] = useState(null);
    // const {isPremium} = usePremium();
    
    //Handling for form data
    const [formData, setFormData] = useState({
        firstName: "",
        lastName:"",
        cardNumber: "",
        cardExpiration: "",
        // cvv: "",
    });

    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
    };

    const handleFormSubmit =async(e) =>{
        e.preventDefault();
        handleSubmit(formData)
    }

    //Handling for api requests
    useEffect(() => {
        if (token) {
          const fetchData = async () => {
            try {
                const data = await getUser(token); 
                setUserData(data);
            } catch (error) {
              console.error("Error fetching user data:", error);
              setUserData(null);
            }
          };
    
          fetchData();
        }
      }, [token]);

    if (userData == null) {
        return <div>Loading...</div>;
    }

    
    return(
    <form className="w-full" onSubmit={handleFormSubmit}>
      <div className='flex flex-col items-center'>
      {/* {!isPremium &&( */}
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
        {/* )} */}
        {/* Submit Button */}
        <button
          type="submit"
          className="submit-button"
        >
          Pay now
        </button>
      </div>
  
    </form>
  );};

export default CreditCardForm;