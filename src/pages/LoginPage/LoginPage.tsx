import postLogin from "src/api/auth/postLogin";
import token from "src/utils/Token";
import { Button } from "src/components/common/Button";
import { FlexBox } from "src/components/common/FlexBox";
import { FORM_ID } from "src/constants/FORM_ID";
import { FormEventHandler, useState } from "react";
import { LabelInput } from "src/components/common/LabelInput";
import { MainLayout } from "src/components/common/MainLayout";
import { useNavigate } from "react-router-dom";
import * as Styled from "./LoginPage.style";

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
		<MainLayout>
			<FlexBox height={"100%"} flexDirection='column' justifyContent={"center"}>
				<Styled.Form id={FORM_ID.SIGN_IN} onSubmit={onSubmit}>
					<FlexBox
						flexDirection='column'
						justifyContent={"center"}
						alignItems='center'
					>
						<Styled.Title>로그인</Styled.Title>

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
							type='submit'
							width={"100%"}
						/>
					</FlexBox>
				</Styled.Form>
			</FlexBox>
		</MainLayout>
	);
};
