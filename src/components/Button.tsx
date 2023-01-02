import { ButtonHTMLAttributes, CSSProperties } from "react";

export const Button = ({
	label,
	style,
	disabled = false,
	buttonProp,
}: {
	label: string;
	style?: CSSProperties;
	disabled?: boolean;
	buttonProp?: ButtonHTMLAttributes<HTMLButtonElement>;
}) => {
	return (
		<div>
			<button
				disabled={disabled}
				className={`normal-btn ${disabled ? "normal-btn__no-active" : ""}`}
				{...buttonProp}
				style={{ ...style }}
			>
				{label}
			</button>
		</div>
	);
};
