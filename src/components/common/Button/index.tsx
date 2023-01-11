import { ButtonHTMLAttributes, CSSProperties } from "react";

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
	type,
	...restButtonProps
}: ButtonProps) => {
	// const debouceWrappedOnClick = restButtonProps?.onClick
	// 	? debounce(restButtonProps.onClick)
	// 	: null;

	return (
		<div>
			<button
				disabled={disabled}
				className={`normal-btn ${disabled ? "normal-btn__no-active" : ""}`}
				// onClick={debouceWrappedOnClick}
				{...restButtonProps}
			>
				{label}
			</button>
		</div>
	);
};
