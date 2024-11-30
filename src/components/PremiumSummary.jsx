import {postUserRegister } from "../utils/APIUtils";
import { useToken } from "../hooks/useToken";
import CreditCardForm from "./CreditCardForm";
import { useNavigate } from "react-router-dom";
import { usePremium } from "../hooks/usePremium";



function PremiumSummary(){
    const {token} = useToken();
    const navigate = useNavigate();
    const {setIsPremium} = usePremium()


    const handlePaymentSubmit =async(formData) =>{
        console.log("Payment sumitted with data", formData)
        try{
            await postUserRegister(token, formData);
            setIsPremium(true);
            navigate("/payment/success");
        }
        catch(e){
            console.log(e)
            navigate("/payment/fail");
        }
    }

    return (
        <div className="flex flex-col items-center justify-start space-y-4">
            <div className="border-4 border-black rounded-lg shadow-lg">
                <div className="flex flex-col items-center">
                    <div className="flex flex-col p-4 w-full border-2 border-black bg-primary-600">
                    <div className="flex justify-between items-center mb-4 bg-transparent">
                        <p className="text-left">Cart Total:</p> 
                        <p className="text-right font-semibold">
                        $ 20.00
                        </p>
                    </div>
                    <hr className="border-t border-black my-2" />        
                        <div className="flex justify-between items-center bg-transparent">
                        <p className="text-left mr-12">Payment Total:</p> 
                        <p className="text-right font-semibold">$ 20.00</p>
                        </div>                    
                    </div>
                </div>
                <CreditCardForm
                handleSubmit ={handlePaymentSubmit}
                />
            </div>
        </div>
    );
}

export default PremiumSummary
