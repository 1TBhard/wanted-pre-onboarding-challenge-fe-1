import AuthProvider from "src/components/main/AuthProvider";
import Navigation from "src/components/main/Navigation";
import Pages from "src/pages";
import { BrowserRouter } from "react-router-dom";
import "src/styles/global.css";

export const App = () => {
	return (
		<main>
			<AuthProvider>
				<BrowserRouter>
					<Navigation />
					<Pages />
				</BrowserRouter>
			</AuthProvider>
		</main>
	);
};
