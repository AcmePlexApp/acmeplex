import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import AuthProvider from "./contexts/AuthProvider";
import MoviesProvider from "./contexts/MoviesProvider";
import NavTitleProvider from "./contexts/NavTitleProvider";
import TheatersProvider from "./contexts/TheatersProvider";
import ShowtimesProvider from "./contexts/ShowtimesProvider";
import MovieTheaterShowtimeProvider from "./contexts/MovieTheaterShowtimeProvider";

const basename = import.meta.env.MODE === "development" ? "/" : "/frontend/";

createRoot(document.getElementById("root")).render(
	<AuthProvider>
		<NavTitleProvider>
			<MoviesProvider>
				<TheatersProvider>
					<ShowtimesProvider>
						<MovieTheaterShowtimeProvider>
							<BrowserRouter
								basename={basename}
								future={{
									v7_startTransition: true,
									v7_relativeSplatPath: true,
								}}>
								<App />
							</BrowserRouter>
						</MovieTheaterShowtimeProvider>
					</ShowtimesProvider>
				</TheatersProvider>
			</MoviesProvider>
		</NavTitleProvider>
	</AuthProvider>
);
