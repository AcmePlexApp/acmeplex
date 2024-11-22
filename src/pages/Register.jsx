import RegisterForm from "../components/RegisterForm"

function Register({ children }) {

	return (
		<div>
			<h1>Register</h1>
			<RegisterForm/>
			{children}
		</div>
	);
}

export default Register;
