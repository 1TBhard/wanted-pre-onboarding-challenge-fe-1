import AuthProvider from "src/components/AuthProvider";
import Pages from "src/pages";
import token from "src/utils/Token";
import { BrowserRouter, Link, useNavigate } from "react-router-dom";
import { FlexBox } from "src/components/FlexBox";
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

const Navigation = () => {
	const navigation = useNavigate();

	const onClickLogout = () => {
		token.removeToken();

		navigation("/");
	};

	return (
		<FlexBox justifyContent='center' gap={"20px"}>
			<Link to='/'>로그인</Link>
			<Link to='/auth'>회원가입</Link>
			<Link to='/todo'>Todo 리스트</Link>
			<button onClick={onClickLogout}>로그아웃</button>
		</FlexBox>
	);
};
