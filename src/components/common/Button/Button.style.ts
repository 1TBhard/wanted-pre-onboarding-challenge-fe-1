import { ButtonProps } from "src/components/common/Button";
import styled from "styled-components";

const BACKGROUND_BY_TYPE = {
	primary: "#219ebc",
	ghost: "#d6ccc2",
	warning: "#e85a21",
};

const HOVER_BACKGROUND_BY_TYPE = {
	primary: "#1a9eba",
	ghost: "#d6ccc2",
	warning: "#fa7c43",
};

export const Body = styled.button<Pick<ButtonProps, "colorType" | "width">>`
	background-color: ${(props) =>
		BACKGROUND_BY_TYPE[props.colorType ?? "primary"]};
	border: none;
	padding: 10px 20px;
	color: #fff;
	cursor: pointer;
	width: ${(props) => props.width ?? "auto"};

	&:hover {
		background-color: ${(props) =>
			HOVER_BACKGROUND_BY_TYPE[props.colorType ?? "primary"]};

		color: #000;
	}

	&:disabled {
		background-color: #d6ccc2 !important;
		cursor: not-allowed !important;
		color: #fff !important;
	}
`;
