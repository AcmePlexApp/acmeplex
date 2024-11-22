import {useState} from "react";
import "../index.css"
import {Icon} from "react-icons-kit";
import {eyeOff} from "react-icons-kit/feather/eyeOff";
import {eye} from "react-icons-kit/feather/eye";
import { useNavigate } from "react-router-dom";

//Form handling
function RegisterForm(){
    const[formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        username: "",
        password: ""
    })

    const navigate = useNavigate()

    const handleChange = (e) =>{
        const{name, value} = e.target;
        setFormData((prevState) =>({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit =(e) =>{
        e.preventDefault();
        console.log("Form sumitted");
        console.log(formData.firstname);
        console.log(formData.lastname);
        //place holder navigation
        navigate("/profile")
        //User query string to handle rerouting to previous page afer logging in (protected pages)
    }

    //Password visibility handling
    const[icon, setIcon] = useState(eyeOff);
    const[type, setType] = useState("password")

    const handleToggle = () =>{
        if(type=="password"){
            setIcon(eye);
            setType("text");
        }
        else{
            setIcon(eyeOff)
            setType("password")
        }
    }

    return(
        <form className="infoform-form-container" onSubmit={handleSubmit}>
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
                    type="username"
                    id="floating_username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder=""
                    required>
                    </input>
                    <label
                    className="infoform-input-label peer"
                    htmlFor="floating_lastname">Username
                    </label>
                </div>
                <div className="infoform-div-container group">
                    <input
                    className="infoform-input-field peer pl-3 pr-10"
                    type={type}
                    id="floating_password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder=""
                    required>
                    </input>
                    <label
                    className="infoform-input-label peer"
                    htmlFor="floating_lastname">Password
                    </label>
                    <span
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={handleToggle}>
                        <Icon
                        class= "mr-0"
                        icon={icon}
                        size ={20}
                        />
                    </span>
                </div>
                <div className="infoform-div-container-centered">
                <button 
                    className="submit-button"
                    type="submit"
                    >Submit
                </button>
                </div>
            </div>
        </form>
    )
}

export default RegisterForm;