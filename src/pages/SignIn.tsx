import UtilObject from "src/utils/UtilObject";
import { Button } from "src/components/Button";
import { FORM_ID } from "src/constants/FORM_ID";
import { FormEventHandler, useState } from "react";
import { LabelInput } from "src/components/LabelInput";
import { MainLayout } from "src/components/MainLayout";
import postLogin from "src/api/auth/postLogin";

interface SignUpForm {
	email: string;
	password: string;
}

export const SignIn = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState("");
	const [errorState, setErrorState] = useState<SignUpForm>({
		email: "",
		password: "",
	});

	const validate = (): boolean => {
		const nextErrorState = {};

		if (UtilObject.isEmpty(nextErrorState)) {
			return true;
		} else {
			return false;
		}
	};

	const onSubmit: FormEventHandler<HTMLElement> = async (e) => {
		e.preventDefault();

		if (!validate()) {
			return;
		}

		try {
			await postLogin({
				email,
				password,
			});
		} catch (error) {
			const message = error.message;

			// TODO - 에러 modal 만들기
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
					error={errorState["email"]}
				/>

				<LabelInput
					label='비밀번호'
					name='password'
					type='password'
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
					}}
					error={errorState["password"]}
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
