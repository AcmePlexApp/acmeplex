
import RedirectButton from "./RedirectButton"
import popcorn_fail from "../assets/popcorn_fail.png"


function FailDisplay({message, buttonName, buttonStyle, redirectLink}){

    return(
        <div className="infoform-div-container-centered">
            <div className="flex flex-col justify-start items-center pt-10">
                <img
                src={popcorn_fail}
                className="h-28 object-cover"
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

export default FailDisplay