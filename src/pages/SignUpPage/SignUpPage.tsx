import postSignUp from "src/api/auth/postSignUp";
import UtilObject from "src/utils/UtilObject";
import { Button } from "src/components/common/Button";
import { FlexBox } from "src/components/common/FlexBox";
import { FORM_ID } from "src/constants/FORM_ID";
import { FormEventHandler, useState } from "react";
import { LabelInput } from "src/components/common/LabelInput";
import { MainLayout } from "src/components/common/MainLayout";
import { Form, useNavigate } from "react-router-dom";
import * as Styled from "./SignUpPage.style";

interface SignUpForm {
	email?: string;
	password?: string;
}

export const SignUpPage = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [errorState, setErrorState] = useState<SignUpForm>();

	const validateEmail = (nextEmail?: string) => {
		let emailErrorMessage = "";

		// prettier-ignore
		if (!/^(\w|\d)+@(\w|\d)+\.(\w|\d)+$/.test(nextEmail)) {
			emailErrorMessage = "@와 .이 포함된 이메일 형식으로 입력해주세요."

		}

		setErrorState((prev) =>
			UtilObject.removeFalsy({
				...prev,
				email: emailErrorMessage,
			})
		);
	};

	const validatePassword = (nextPassword?: string) => {
		let passwordErrorMessage = "";

		if (nextPassword.length < 8) {
			passwordErrorMessage = "8자 이상으로 입력해주세요.";
		}

		setErrorState((prev) =>
			UtilObject.removeFalsy({
				...prev,
				password: passwordErrorMessage,
			})
		);
	};

	const onSubmit: FormEventHandler<HTMLElement> = async (e) => {
		e.preventDefault();

		if (!UtilObject.isEmpty(errorState)) {
			return;
		}

		try {
			await postSignUp({
				email,
				password,
			});

			navigate("/login");
		} catch (error) {
			alert(error.message);
		}
	};

	return (
		<MainLayout>
			<FlexBox height={"100%"} flexDirection='column' justifyContent={"center"}>
				<Styled.Form id={FORM_ID.SIGN_UP} onSubmit={onSubmit}>
					<FlexBox justifyContent={"center"} flexDirection='column'>
						<Styled.Title>회원가입</Styled.Title>

						<LabelInput
							label='이메일'
							name='email'
							type='text'
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
								validateEmail(e.target.value);
							}}
							error={errorState?.email}
						/>
						<LabelInput
							label='비밀번호'
							name='password'
							type='password'
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
								validatePassword(e.target.value);
							}}
							error={errorState?.password}
						/>
						<Button
							disabled={!(email && password && UtilObject.isEmpty(errorState))}
							label='가입'
							type='submit'
							width={"100%"}
						/>
					</FlexBox>
				</Styled.Form>
			</FlexBox>
		</MainLayout>
	);
};
