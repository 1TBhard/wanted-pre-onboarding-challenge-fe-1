import AuthProvider from "src/components/main/AuthProvider";
import Navigation from "src/components/main/Navigation";
import Pages from "src/pages";
import { BrowserRouter } from "react-router-dom";
import { TodoQueryClientProvider } from "src/components/TodoQueryClientProvider";
import "src/styles/global.css";

export const App = () => {
	return (
		<main>
			<AuthProvider>
				<TodoQueryClientProvider>
					<BrowserRouter>
						<Navigation />
						<Pages />
					</BrowserRouter>
				</TodoQueryClientProvider>
			</AuthProvider>
		</main>
	);
};
