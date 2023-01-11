import { ButtonProps } from "src/components/common/Button";
import styled from "styled-components";

export const Frame = styled.div``;

const BACKGROUND_BY_TYPE = {
	primary: "#219ebc",
	ghost: "#d6ccc2",
	warning: "#e85a21",
};

export const Body = styled.button<Pick<ButtonProps, "type">>`
	background-color: ${(props) => BACKGROUND_BY_TYPE[props.type ?? "primary"]};
	border: none;
	padding: 10px 20px;
	color: #fff;
	cursor: pointer;

	&:hover {
		background-color: #023047;
	}

	&:disabled {
		background-color: #d6ccc2 !important;
		cursor: not-allowed !important;
	}
`;
