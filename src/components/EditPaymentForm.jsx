import {useState} from "react";
import "../Index.css"


function CreditCardForm({isEditing}){

    //Handling for form data
    const [formData, setFormData] = useState({
        fullName: "",
        cardNumber: "",
        cardExpiration: "",
        cvv: "",
    });

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
    };

    const handleSubmit =(e) =>{
        e.preventDefault();
        console.log("handleSubmit called");
        //If edit mode is true, button will submit information
        if (editMode == true){
            //Submit info to api
        }   
        setEditMode((prevState => (!prevState)))
    }

    //Handling of edit mode
    const [editMode, setEditMode] = useState(isEditing)


    return(
        <div>
        <form className= "max-w-md mx-auto rounded-lg p-4 shadow-sm sm:p-6 lg:max-w-xl lg:p-8" onSubmit={handleSubmit}>
            {/* optional:  className="bg-offwhite border-4 border-black rounded-lg shadow-lg p-6 space-y-4" */}
            <div>

                <div className="infoform-div-container group">
                    {editMode ? (
                        <input
                        className="infoform-input-field-editable peer"
                        type="text"
                        id="floating_username"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder=""
                        required>
                        </input>
                        ):
                        <p
                        className="infoform-input-field peer"
                        type="text">
                            {formData.fullName}
                        </p>
                    }
                    <label
                    className="infoform-input-label peer"
                    htmlFor="floating_lastname">Full name (as displayed on card)
                    </label>
                </div>
                <div className="infoform-div-container group">
                    {editMode ? (
                        <input
                        className="infoform-input-field-editable peer"
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder=""
                        pattern="^4[0-9]{12}(?:[0-9]{3})?$"
                        required
                        maxLength={16}>
                        </input>
                        ):
                        <p
                        className="infoform-input-field peer"
                        type="text">
                            {formData.cardNumber}
                        </p>
                    }
                    <label
                    className="infoform-input-label peer"
                    htmlFor="cardNumber">Card Number (xxxx-xxxx-xxxx-xxxx)
                    </label>
                </div>
                <div className="infoform-div-container group">
                    {editMode ? (
                        <input
                        className="infoform-input-field-editable peer"
                        type="text"
                        id="cardExpiration"
                        name="cardExpiration"
                        value={formData.cardExpiration}
                        onChange={handleChange}
                        placeholder=""
                        pattern="^(0[2-9]|1[0-2])(\d{2})$"
                        maxLength={4}
                        required>
                        </input>
                        ):
                        <p
                        className="infoform-input-field peer"
                        type="text">
                            {formData.fullName}
                        </p>
                    }
                    <label
                    className="infoform-input-label peer"
                    htmlFor="cardExpiration">Card Expiration (MMYY)
                    </label>
                </div>
                <div className="infoform-div-container group">
                    {editMode ? (
                        <input
                        className="infoform-input-field-editable peer"
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder=""
                        pattern="[0-9]{3}"
                        maxLength={3}
                        required>
                        </input>
                        ):
                        <p
                        className="infoform-input-field peer"
                        type="text">
                            {formData.cvv}
                        </p>
                    }
                    <label
                    className="infoform-input-label peer"
                    htmlFor="floating_lastname">CVV
                    </label>
                </div>
                <div className="infoform-div-container-centered">
                    {editMode ? (
                        <button 
                        className="submit-button"
                        type="submit"
                        >Submit
                        </button>
                    ):
                        <button 
                            className="submit-button"
                            type="submit"
                            >Edit
                        </button>         
                     }               
                </div>
            </div>
        </form>
    </div>
    );      
};

export default CreditCardForm;