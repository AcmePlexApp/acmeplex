import { useAuth } from "../hooks/useAuth";
function Login() {
	const { isLoggedIn, setIsLoggedIn } = useAuth();
	const handleLogin = () => {
		setIsLoggedIn(true);
	};

	return (
		<div>
			<h1>Login</h1>

			{!isLoggedIn ? (
				<button onClick={handleLogin}>Click to Login!</button>
			) : (
				<p>You are already logged in!</p>
			)}
		</div>
	);
}

export default Login;
