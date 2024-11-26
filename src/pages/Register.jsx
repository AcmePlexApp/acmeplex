import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import TogglePill from "../components/TogglePill";
import { useState } from "react";

function Register() {
	const [activeButton, setActiveButton] = useState("button1");

	const toggleButton = (button) => {
		setActiveButton(button);
	};

	return (
		<div>
			<h1>Register</h1>
			<UserInfoForm />
			{children}
		</div>
	);
}

export default Register;
