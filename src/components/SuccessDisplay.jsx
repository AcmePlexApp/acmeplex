
import RedirectButton from "./RedirectButton"
import popcorn_success from "../assets/popcorn_success.png"


function SuccessDisplay({message, buttonName, buttonStyle, redirectLink}){

    return(
        <div className="infoform-div-container-centered">
            <div className="flex flex-col justify-start items-center pt-10">
                <img
                src={popcorn_success}
                className="w-28 object-cover"
                >
                </img>
                <h1 className="mb-6">
                {message}
                </h1>
		    </div>
            {redirectLink && (
                <RedirectButton
                name = {buttonName}
                redirect={redirectLink}
                className={buttonStyle}
                />
            )}
            
        </div>

    )
}

export default SuccessDisplay