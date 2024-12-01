import "./suppressWarnings";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import AuthProvider from "./contexts/AuthProvider";
import NavTitleProvider from "./contexts/NavTitleProvider";
import MovieTheaterShowtimeProvider from "./contexts/MovieTheaterShowtimeProvider";
import TokenProvider from "./contexts/TokenProvider";
import CartProvider from "./contexts/CartProvider";
import PremiumProvider from "./contexts/PremiumProvider";
import TicketProvider from "./contexts/TicketProvider";

const basename = import.meta.env.MODE === "development" ? "/" : "/frontend/";

createRoot(document.getElementById("root")).render(
	<AuthProvider>
		<TokenProvider>
			<TicketProvider>
				<PremiumProvider>
					<NavTitleProvider>
						<MovieTheaterShowtimeProvider>
							<CartProvider>
								<BrowserRouter
									basename={basename}
									future={{
										v7_startTransition: true,
										v7_relativeSplatPath: true,
									}}>
									<App />
								</BrowserRouter>
							</CartProvider>
						</MovieTheaterShowtimeProvider>
					</NavTitleProvider>
				</PremiumProvider>
			</TicketProvider>
		</TokenProvider>
	</AuthProvider>
);
