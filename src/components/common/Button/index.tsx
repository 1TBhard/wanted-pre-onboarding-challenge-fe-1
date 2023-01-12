import { ButtonHTMLAttributes, CSSProperties } from "react";
import * as Style from "./Button.style";

type ColorType = "primary" | "ghost" | "warning";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	label: string;
	style?: CSSProperties;
	disabled?: boolean;
	colorType?: ColorType;
	width?: CSSProperties["width"];
}

export const Button = ({
	label,
	style,
	disabled = false,
	colorType = "primary",
	width,
	...restButtonProps
}: ButtonProps) => {
	// const debouceWrappedOnClick = restButtonProps?.onClick
	// 	? debounce(restButtonProps.onClick)
	// 	: null;

	return (
		<Style.Body
			width={width}
			disabled={disabled}
			colorType={colorType}
			// className={`normal-btn ${disabled ? "normal-btn__no-active" : ""}`}
			// onClick={debouceWrappedOnClick}
			{...restButtonProps}
		>
			{label}
		</Style.Body>
	);
};
