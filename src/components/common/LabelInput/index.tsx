import { HTMLInputTypeAttribute } from "react";
import * as Style from "./LabelInput.style";

export interface LabelInputProps {
	label?: string;
	name: string;
	value: any;
	placeholder?: string;
	type: HTMLInputTypeAttribute;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	error?: string;
}

export const LabelInput = ({
	label,
	name,
	error,
	...restInputProps
}: LabelInputProps) => {
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
