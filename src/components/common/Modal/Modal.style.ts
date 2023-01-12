import { ModalProps } from "src/components/common/Modal/indext";
import styled from "styled-components";

export const Background = styled.div<Pick<ModalProps, "isShow">>`
	display: ${(props) => (props.isShow ? "block" : "none")};
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	z-index: 2;
	background-color: #57575780;
`;

export const Frame = styled.div`
	padding: 20px;
	background-color: #fff;
	display: flex;
	flex-direction: column;
	z-index: 3;
`;

export const Header = styled.div``;

export const Title = styled.h2`
	text-align: center;
`;

export const Body = styled.div``;
