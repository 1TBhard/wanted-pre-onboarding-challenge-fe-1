import postLogin from "src/api/auth/postLogin";
import { Button } from "src/components/Button";
import { FORM_ID } from "src/constants/FORM_ID";
import { FormEventHandler, useState } from "react";
import { LabelInput } from "src/components/LabelInput";
import { MainLayout } from "src/components/MainLayout";
import token from "src/utils/Token";
import { Navigate, useNavigate } from "react-router-dom";

export const LoginPage = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState("");

	const onSubmit: FormEventHandler<HTMLElement> = async (e) => {
		e.preventDefault();

		try {
			const { token: responseToken } = await postLogin({
				email,
				password,
			});

			token.setToken(responseToken);
			navigate("/todo", { replace: true });
		} catch (error) {
			const message = error.message;

			alert(message);
		}
	};

	return (
		<MainLayout title='로그인'>
			<form id={FORM_ID.SIGN_IN} onSubmit={onSubmit}>
				<LabelInput
					label='이메일'
					name='email'
					type='text'
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>

				<LabelInput
					label='비밀번호'
					name='password'
					type='password'
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>

				<Button
					disabled={!(email && password)}
					label='로그인'
					buttonProp={{ type: "submit" }}
				/>
			</form>
		</MainLayout>
	);
};
