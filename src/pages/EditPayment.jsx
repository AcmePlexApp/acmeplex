import EditPaymentForm from "../components/EditPaymentForm"
import RedirectButton from "../components/RedirectButton";


function EditPayment(){

    return (
        <div>
        <RedirectButton
            name = 'Back'
            redirect="/profile"
            className='back-button'
        >
    </RedirectButton>
        <div>
            <EditPaymentForm
             isEditing={false}/>
        </div>      
    </div>
      );
      

};

export default EditPayment