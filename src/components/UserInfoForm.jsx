import {useState} from "react";
import "../index.css"


function UserInfoForm(){
    const[formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: ""
    })

    const handleChange = (e) =>{
        const{name, value} = e.target
        setFormData((prevState) =>({
            ...prevState,
            [name]: value
        }));
    };

    return(
        <form className="infoform-form-container">
            <div>
                <div className="infoform-div-container group">
                    <input
                    className="infoform-input-field peer"
                    type="text"
                    id="floating_firstname"
                    name = 'firstname'
                    value={formData.firstname}
                    onChange={handleChange}
                    placeholder=""
                    required>
                    </input>
                    <label
                    className="infoform-input-label peer"
                    htmlFor="floating_firstname">First Name
                    </label>
                </div>
                <div className="infoform-div-container group">
                    <input
                    className="infoform-input-field peer"
                    type="text"
                    id="floating_lastname"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    placeholder=""
                    required>
                    </input>
                    <label
                    className="infoform-input-label peer"
                    htmlFor="floating_lastname">Last Name
                    </label>
                </div>
                <div className="infoform-div-container group">
                    <input
                    className="infoform-input-field peer"
                    type="email"
                    id="floating_email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder=""
                    required>
                    </input>
                    <label
                    className="infoform-input-label peer"
                    htmlFor="floating_lastname">Email Address
                    </label>
                </div>
                <div className="infoform-div-container-centered">
                <button className="submit-button">Submit</button>
                </div>
            </div>
        </form>
    )
}

export default UserInfoForm;