import { useState } from "react";
import "../index.css";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { useAuth } from "../hooks/useAuth";
import { postLogin } from "../utils/APIUtils";
import { useToken } from "../hooks/useToken";

function LoginForm(props) {
	//Handling for form data
	const { setToken } = useToken();
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});

	const { setIsLoggedIn } = useAuth();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("Form sumbitted");
		console.log(formData.username);
		console.log(formData.password);
		const token = await postLogin(formData.username, formData.password);
		if (token) {
			setIsLoggedIn(true);
			setToken(token.token);
		}
		props.onClose();
		//Navigation place holder
		//User query string to handle rerouting to previous page afer logging in (protected pages)
	};

	//Handling for password visibility
	const [icon, setIcon] = useState(eyeOff);
	const [passwordType, setPasswordType] = useState("password");

	const handleToggle = () => {
		if (passwordType == "password") {
			setIcon(eye);
			setPasswordType("text");
		} else {
			setIcon(eyeOff);
			setPasswordType("password");
		}
	};

	return (
		<form
			className="max-w-md mx-auto border-4 border-black rounded-lg p-4 shadow-lg sm:p-6 lg:max-w-xl lg:p-8"
			onSubmit={handleSubmit}>
			<div>
				<div className="infoform-div-container group">
					<input
						className="infoform-input-field peer"
						type="username"
						id="floating_username"
						name="username"
						value={formData.username}
						onChange={handleChange}
						placeholder=""
						required></input>
					<label
						className="infoform-input-label peer"
						htmlFor="floating_lastname">
						Username
					</label>
				</div>
				<div className="infoform-div-container group">
					<input
						className="infoform-input-field peer pl-3 pr-10"
						type={passwordType}
						id="floating_password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						placeholder=""
						required></input>
					<label
						className="infoform-input-label peer"
						htmlFor="floating_lastname">
						Password
					</label>
					<span
						className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
						onClick={handleToggle}>
						<Icon className="mr-0" icon={icon} size={20} />
					</span>
				</div>
				<div className="infoform-div-container-centered">
					<button className="submit-button" type="submit">
						Login
					</button>
				</div>
			</div>
		</form>
	);
}

export default LoginForm;
