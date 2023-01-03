import { AuthContext } from "src/components/AuthProvider";
import { LoginPage } from "src/pages/LoginPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { ReactNode } from "react";
import { SignUpPage } from "src/pages/SignUpPage";
import { TodoPage } from "src/pages/TodoPage";

const AuthProtect = ({ children }: { children: ReactNode }) => {
	return (
		<AuthContext.Consumer>
			{(token) => (token.getToken() ? children : <Navigate to={"/"} replace />)}
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
