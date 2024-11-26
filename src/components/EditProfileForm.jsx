import {useState} from "react";
import "../index.css"
import {Icon} from "react-icons-kit";
import {eyeOff} from "react-icons-kit/feather/eyeOff";
import {eye} from "react-icons-kit/feather/eye";

function EditProfileForm({isEditing}){
    //Handling for form data
    const[formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    })

    const handleChange = (e) =>{
        const{name, value} = e.target;
        setFormData((prevState) =>({
            ...prevState,
            [name]: value
        }));
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

    //Handling for password visibility
    const[icon, setIcon] = useState(eyeOff);
    const[passwordType, setPasswordType] = useState("password")

    const handleToggle = () =>{
        if(passwordType=="password"){
            setIcon(eye);
            setPasswordType("text");
        }
        else{
            setIcon(eyeOff)
            setPasswordType("password")
        }
    }

    //Handling of edit mode
    const [editMode, setEditMode] = useState(isEditing)


    return(

     <div>
        <form className= "max-w-md mx-auto rounded-lg p-4 shadow-sm sm:p-6 lg:max-w-xl lg:p-8" onSubmit={handleSubmit}>
            <div>
                <div className="infoform-div-container group">
                    {editMode ? (
                        <input
                        className="infoform-input-field-editable peer"
                        type="username"
                        id="floating_username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder=""
                        required>
                        </input>
                        ):
                        <p
                        className="infoform-input-field peer"
                        type="text">
                            {formData.username}
                        </p>
                    }
                    <label
                    className="infoform-input-label peer"
                    htmlFor="floating_lastname">Username
                    </label>
                </div>
                <div className="infoform-div-container group">
                    {editMode ? (
                        <input
                        className="infoform-input-field-editable peer"
                        type="email"
                        id="floating_email"
                        name = 'email'
                        value={formData.email}
                        onChange={handleChange}
                        placeholder=""
                        required>
                        </input>
                        ):
                        <p
                        className="infoform-input-field peer"
                        type="email">
                            {formData.email}
                        </p>
                    }
                    <label
                    className="infoform-input-label peer"
                    htmlFor="floating_firstname">Email Address
                    </label>
                </div> 
                <div className="infoform-div-container group">
                    {editMode? (
                        <input
                        className="infoform-input-field-editable peer pl-3 pr-10"
                        type={passwordType}
                        id="floating_password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder=""
                        required>
                        </input>
                    ):
                        <p
                        className="infoform-input-field peer pl-3 pr-10"
                        type={passwordType}>
                            {passwordType =="password" ? Array(formData.password.length).fill("•"): formData.password}
                        </p>
                    }
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
    )
}

export default EditProfileForm;