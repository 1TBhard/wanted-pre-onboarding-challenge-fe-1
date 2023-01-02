import { SignIn } from "src/pages/SignIn";
import { SignUp } from "src/pages/SignUp";
import "src/styles/global.css";

export const App = () => {
	return (
		<main>
			<SignUp />
			<SignIn />
		</main>
	);
};
