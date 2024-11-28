import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import TogglePill from "../components/TogglePill";
import { useState } from "react";

function Register(props) {
	const [activeButton, setActiveButton] = useState("button1");

	const toggleButton = (button) => {
		setActiveButton(button);
	};

	return (
		<div>
			<div className="flex items-center justify-center">
				<TogglePill
					label="Login"
					isActive={activeButton === "button1"}
					toggleState={() => toggleButton("button1")}
					isLeft={true}
				/>
				<TogglePill
					label="Register"
					isActive={activeButton === "button2"}
					toggleState={() => toggleButton("button2")}
					isLeft={false}
				/>
			</div>
			{activeButton === "button1" ? (
				<LoginForm buttonName={"Login"} onClose={props.onClose} />
			) : (
				<RegisterForm buttonName={"Register"} onClose={props.onClose} />
			)}
		</div>
	);
}

export default Register;
