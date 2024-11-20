import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import AuthProvider from "./contexts/AuthProvider";

const basename = import.meta.env.MODE === "development" ? "/" : "/frontend/";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<AuthProvider>
			<BrowserRouter basename={basename}>
				<App />
			</BrowserRouter>
		</AuthProvider>
	</StrictMode>
);
