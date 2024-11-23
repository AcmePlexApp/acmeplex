import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import AuthProvider from "./contexts/AuthProvider";
import MoviesProvider from "./contexts/MoviesProvider";
import NavTitleProvider from "./contexts/NavTitleProvider";

const basename = import.meta.env.MODE === "development" ? "/" : "/frontend/";

createRoot(document.getElementById("root")).render(
	<AuthProvider>
		<NavTitleProvider>
			<MoviesProvider>
				<BrowserRouter basename={basename}>
					<App />
				</BrowserRouter>
			</MoviesProvider>
		</NavTitleProvider>
	</AuthProvider>
);
