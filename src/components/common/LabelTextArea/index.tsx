import { TextareaHTMLAttributes } from "react";
import * as Styled from "./LabelTextarea.style";

interface LabelTextAreaProps extends TextareaHTMLAttributes<HTMLElement> {
	label?: string;
	error?: string;
}

export const LabelTextArea = ({
	label,
	name,
	error,
	...restProps
}: LabelTextAreaProps) => {
	return (
		<Styled.Frame>
			<Styled.Body>
				<Styled.Label htmlFor={name}>{label}</Styled.Label>
				<Styled.Textarea name={name} {...restProps} />
			</Styled.Body>
			<Styled.Error>{error}</Styled.Error>
		</Styled.Frame>
	);
};
