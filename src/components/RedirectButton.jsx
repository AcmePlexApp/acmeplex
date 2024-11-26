import "../index.css"
import { useNavigate } from "react-router-dom";



function RedirectButton({name, redirect, className}){  

    const navigate = useNavigate();

    const HandleRedirect = () => {
        navigate(redirect);

    }

    return(
        <button
            className={className}
            onClick={HandleRedirect}
            >
            {name}
        </button>
   
    )

}
export default RedirectButton