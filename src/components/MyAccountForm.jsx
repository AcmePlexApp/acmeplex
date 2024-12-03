import {getUser, deleteUser } from "../utils/APIUtils";
import { useToken } from "../hooks/useToken";
import "../index.css"
import { useAuth } from "../hooks/useAuth";
import {useState, useEffect } from "react";

function MyAccountForm(){
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const [userData, setUserData] = useState()
    const { token } = useToken();

    const handleDelete =() =>{
        const confirm = window.confirm("Are you sure you want to delete this user? This is permanent, all credits will be lost!");
		if (confirm) {
			deleteUser(token);
            if(isLoggedIn){
                setIsLoggedIn(false);
            };
		};
    };

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

     <div>
        <form className= "max-w-md mx-auto rounded-lg p-4 shadow-sm sm:p-6 lg:max-w-xl lg:p-8" onSubmit={handleDelete}>
            <div>
                <div className="relative z-0 w-full mb-5 group">  
                        <p
                        className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        type="text">
                            {userData.username}
                        </p>
                   <label
                    className=" peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    htmlFor="floating_lastname">Username
                    </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                        <p
                        className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        type="email">
                            {userData.email}
                        </p>
                    <label
                    className=" peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    htmlFor="floating_firstname">Email Address
                    </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                        <p
                        className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        type="credits">
                            $ {userData.credits.reduce((partialSum, a) => partialSum + a.amount, 0).toFixed(2)}
                        </p>
                    <label
                    className=" peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    htmlFor="floating_firstname">Credits
                    </label>
                </div> 
                <div className="flex justify-center items-center flex-col">
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

export default MyAccountForm;