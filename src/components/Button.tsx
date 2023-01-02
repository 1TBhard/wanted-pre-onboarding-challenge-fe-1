import { ButtonHTMLAttributes, CSSProperties } from "react";

export const Button = ({
	label,
	style,
	buttonProp,
}: {
	label: string;
	style?: CSSProperties;
	buttonProp?: ButtonHTMLAttributes<HTMLButtonElement>;
}) => {
	return (
		<div>
			<button className='normal-btn' {...buttonProp} {...style}>
				{label}
			</button>
		</div>
	);
};
