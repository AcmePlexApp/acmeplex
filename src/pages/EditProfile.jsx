import "../Index.css"
import EditProfileForm from "../components/EditProfileForm";
import RedirectButton from "../components/RedirectButton";



function EditProfile({chlildren}) {

	return(
        <div>
            <RedirectButton
                name = 'Back'
                redirect="/profile"
                className='back-button'
            >
        </RedirectButton>
            <div>
                <EditProfileForm
                 isEditing={false}/>
            </div>      
            {chlildren}  
        </div>
    );
}

export default EditProfile;
