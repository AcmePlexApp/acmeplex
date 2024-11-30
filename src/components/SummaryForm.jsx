import { getCart, getUser } from "../utils/APIUtils";
import { useToken } from "../hooks/useToken";
import { useCart} from "../hooks/useCart";
import { useEffect, useState } from "react";



function SummaryForm(){
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

    return (
        <div className="flex flex-col p-4 w-full border-2 border-black bg-primary-600">
            <div className="flex justify-between items-center mb-4 bg-transparent">
                <p className="text-left">Cart Total:</p> 
                <p className="text-right font-semibold">
                $ {cartTotal}
                </p>
            </div>
            {isChecked&&(
                <div className="flex justify-between items-center mb-4 bg-transparent">
                    <p className="text-left">Credits Applied:</p> 
                    <p className="text-right font-semibold">
                    $ {creditLimit}        
                    </p>
                </div>
            )}
            {isChecked&&(
                <div className="flex justify-between items-center mb-4 bg-transparent">
                    <p className="text-left text-sm text-gray-400">Credits Remaining:</p> 
                    <p className="text-right text-sm text-gray-400 font-semibold">
                    $ {(creditTotal - creditLimit).toFixed(2)}        
                    </p>
                </div>
            )}
            <hr className="border-t border-black my-2" />
            {isChecked ? (
                /*Credits applied */
                <div className="flex justify-between items-center bg-transparent">
                    <p className="text-left mr-12">Payment Total:</p> 
                    <p className="text-right font-semibold">$ {cartTotal - creditLimit}</p>
              
              </div>

            ):(
                /*No credits */
                <div className="flex justify-between items-center bg-transparent">
                    <p className="text-left mr-12">Payment Total:</p> 
                    <p className="text-right font-semibold">$ {cartTotal}</p>
                </div>
              )
            }
            <div className="flex justify-between items-center bg-transparent">
                {!hasCredits&&(
                    <div className="flex items-center bg-transparent w-full ">
                    <p className="text-sm italic text-gray-300 text-left flex-grow w-full">
                        You have credits available for use, would you like to apply them?
                    </p>
                    <input
                    type="checkbox"
                    className="accent-blue-500"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    >
                    </input>
                </div>
                )}
                
            </div>
        </div>
    );
}

export default SummaryForm