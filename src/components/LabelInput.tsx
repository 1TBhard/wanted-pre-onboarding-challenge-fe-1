import { HTMLInputTypeAttribute } from "react";

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
		<div className='label-wrapper mb-16'>
			<label htmlFor={name}>{label}</label>
			<input id={name} {...restInputProps} />
			<p className='input-error'>{error}</p>
		</div>
	);
};
