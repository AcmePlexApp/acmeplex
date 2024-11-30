import "../Index.css"
import MyAccountForm from "../components/MyAccountForm";
import RedirectButton from "../components/RedirectButton";


function MyAccount({chlildren}) {
  
    return(
        <div>
            <RedirectButton
                name = 'Back'
                redirect="/profile"
                className='back-button'
            >
            </RedirectButton>
            <div>
                <MyAccountForm
                 />

            </div>      
            {chlildren}  
        </div>
    );
}

export default MyAccount;
