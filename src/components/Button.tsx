import { ButtonHTMLAttributes, CSSProperties } from "react";
import debounce from "src/utils/debounce";
import UtilObject from "src/utils/UtilObject";

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
	const onClick = buttonProp.onClick
		? () => debounce(buttonProp.onClick)
		: null;
	const nextButtonProps = UtilObject.removeFalsy({ ...buttonProp, onClick });

	return (
		<div>
			<button
				disabled={disabled}
				className={`normal-btn ${disabled ? "normal-btn__no-active" : ""}`}
				{...nextButtonProps}
				style={{ ...style }}
			>
				{label}
			</button>
		</div>
	);
};
