import {BASE_API_URL, BASE_HEADERS } from "../utils/APIUtils";
import { useToken } from "../hooks/useToken";
import "../index.css"
import { useAuth } from "../hooks/useAuth";



function EditProfileForm({apiData}){

    const { isLoggedIn, setIsLoggedIn } = useAuth();

    const handleDelete =() =>{
        const confirm = window.confirm("Are you sure you want to delete this user? This is permanent, all credits will be lost!");
		if (confirm) {
			deleteUser();
            if(isLoggedIn){
                setIsLoggedIn(false);
            };
		};
    };

    //Handling for password visibility
    // const[icon, setIcon] = useState(eyeOff);
    // const[passwordType, setPasswordType] = useState("password")

    // const handleToggle = () =>{
    //     if(passwordType=="password"){
    //         setIcon(eye);
    //         setPasswordType("text");
    //     }
    //     else{
    //         setIcon(eyeOff)
    //         setPasswordType("password")
    //     }
    // }
    //Handling profile deletion
    const deleteUser = async () => {
		try {
			const response = await fetch(
				`${BASE_API_URL}/user`,
				{
					method: "DELETE",
					headers: {
						...BASE_HEADERS,
						Authorization: `Bearer ${token}`,
					},
				}
			);

			// Check if the response is successful
			if (response.ok) {
				console.log('User deleted');
                return
			} else {
				// Handle errors
				const errorMessage = (await response.text()).split(":")[1]?.trim(); // Extract the error message
				throw new Error(errorMessage || "An unexpected error occurred.");
			}
		} catch (error) {
			console.error("Failed tp delete:", error.message);
			throw error; // Re-throw the error for higher-level handling
		}
	};
    const { token } = useToken();

   

    return(

     <div>
        <form className= "max-w-md mx-auto rounded-lg p-4 shadow-sm sm:p-6 lg:max-w-xl lg:p-8" onSubmit={handleDelete}>
            <div>
                <div className="infoform-div-container group">  
                        <p
                        className="infoform-input-field peer"
                        type="text">
                            {apiData.username}
                        </p>
                   <label
                    className="infoform-input-label peer"
                    htmlFor="floating_lastname">Username
                    </label>
                </div>
                <div className="infoform-div-container group">
                        <p
                        className="infoform-input-field peer"
                        type="email">
                            {apiData.email}
                        </p>
                    <label
                    className="infoform-input-label peer"
                    htmlFor="floating_firstname">Email Address
                    </label>
                </div>
                <div className="infoform-div-container group">
                        <p
                        className="infoform-input-field peer"
                        type="credits">
                            {apiData.credits == null ? 0 : apiData.credits}
                        </p>
                    <label
                    className="infoform-input-label peer"
                    htmlFor="floating_firstname">Credits
                    </label>
                </div> 
                {/* <div className="infoform-div-container group">
                        <p
                        className="infoform-input-field peer pl-3 pr-10"
                        type={passwordType}>
                            {passwordType =="password" ? Array(apiData.password.length).fill("•"): apiData.password}
                        </p>
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
                </div> */}
                <div className="infoform-div-container-centered">
                        <button 
                            className=" text-black bg-red-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center border-2 border-black"
                            type="submit"
                            >Delete
                        </button>               
                </div>
            </div>
        </form>
    </div>
    )
}

export default EditProfileForm;