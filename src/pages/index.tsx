import { AuthContext } from "src/components/main/AuthProvider";
import { Navigate, Route, Routes } from "react-router-dom";
import { ReactNode } from "react";
import { SignUpPage } from "src/pages/SignUpPage/SignUpPage";
import { TodoPage } from "src/pages/TodoPage";
import { LoginPage } from "src/pages/LoginPage/LoginPage";

const AuthProtect = ({ children }: { children: ReactNode }) => {
	return (
		<AuthContext.Consumer>
			{(token) =>
				token.getToken()
					? children
					: (confirm("로그인이 필요합니다.") || true) && (
							<Navigate to={"/"} replace />
					  )
			}
		</AuthContext.Consumer>
	);
};

const Pages = () => {
	return (
		<Routes>
			<Route path={"/"} element={<LoginPage />} />
			<Route path={"/auth"} element={<SignUpPage />} />

			<Route
				path={"/todo"}
				element={
					<AuthProtect>
						<TodoPage />
					</AuthProtect>
				}
			/>
		</Routes>
	);
};

export default Pages;
