import { BrowserRouter, Link, useNavigate } from "react-router-dom";
import AuthProvider from "src/components/AuthProvider";
import Pages from "src/pages";
import "src/styles/global.css";
import token from "src/utils/Token";

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

const Navigation = () => {
	const navigation = useNavigate();

	const onClickLogout = () => {
		token.removeToken();

		navigation("/");
	};

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				gap: "10px",
			}}
		>
			<Link to='/'>Login</Link>
			<Link to='/auth'>sign-up</Link>
			<Link to='/todo'>todo</Link>

			<button onClick={onClickLogout}>로그아웃</button>
		</div>
	);
};
