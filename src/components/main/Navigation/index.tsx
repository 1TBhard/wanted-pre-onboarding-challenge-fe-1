import token from "src/utils/Token";
import { FlexBox } from "src/components/common/FlexBox";
import { Link, useNavigate } from "react-router-dom";
import * as Styled from "./Navigation.style";
import { Button } from "src/components/common/Button";

const Navigation = () => {
	const navigation = useNavigate();

	const onClickLogout = () => {
		token.removeToken();

		navigation("/");
	};

	return (
		<Styled.Frame>
			<FlexBox gap={"20px"}>
				<Styled.Link to='/'>로그인</Styled.Link>
				<Styled.Link to='/auth'>회원가입</Styled.Link>
				<Styled.Link to='/todo'>Todo 리스트</Styled.Link>
				<Button label='로그아웃' colorType='warning' onClick={onClickLogout} />
			</FlexBox>
		</Styled.Frame>
	);
};

export default Navigation;
