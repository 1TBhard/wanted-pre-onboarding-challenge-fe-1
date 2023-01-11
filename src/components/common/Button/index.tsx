import { ButtonHTMLAttributes, CSSProperties } from "react";
import * as Style from "./Button.style";

type ButtonType = "primary" | "ghost" | "warning";

export interface ButtonProps
	extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
	label: string;
	style?: CSSProperties;
	disabled?: boolean;
	type?: ButtonType;
	htmlType?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

export const Button = ({
	label,
	style,
	disabled = false,
	type = "primary",
	...restButtonProps
}: ButtonProps) => {
	// const debouceWrappedOnClick = restButtonProps?.onClick
	// 	? debounce(restButtonProps.onClick)
	// 	: null;

	return (
		<Style.Frame>
			<Style.Body
				disabled={disabled}
				// className={`normal-btn ${disabled ? "normal-btn__no-active" : ""}`}
				// onClick={debouceWrappedOnClick}
				{...restButtonProps}
			>
				{label}
			</Style.Body>
		</Style.Frame>
	);
};
