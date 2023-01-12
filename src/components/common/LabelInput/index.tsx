import { HTMLInputTypeAttribute } from "react";
import * as Style from "./LabelInput.style";

export const LabelInput = ({
	label,
	name,
	error,
	...restInputProps
}: {
	label?: string;
	name: string;
	value: any;
	type: HTMLInputTypeAttribute;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	error?: string;
}) => {
	return (
		<Style.Frame>
			<Style.Body>
				<Style.Label htmlFor={name}>{label}</Style.Label>
				<Style.Input id={name} {...restInputProps} />
			</Style.Body>
			<Style.Error>{error}</Style.Error>
		</Style.Frame>
	);
};
