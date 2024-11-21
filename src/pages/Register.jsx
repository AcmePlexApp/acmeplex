import UserInfoForm from "../components/UserInfoForm"

function Register({ children }) {

	return (
		<div>
			<h1>Register</h1>
			<UserInfoForm/>
			{children}
		</div>
	);
}

export default Register;
