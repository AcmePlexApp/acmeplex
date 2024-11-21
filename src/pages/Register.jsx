import UserInfoForm from "../components/UserInfoForm";

function Register({ children }) {
	return (
		<div>
			<UserInfoForm />
			{children}
		</div>
	);
}

export default Register;
