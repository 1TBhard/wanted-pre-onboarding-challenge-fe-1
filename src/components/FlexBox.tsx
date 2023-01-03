import { CSSProperties, ReactNode } from "react";

export const FlexBox = ({
	className,
	children,
	flexDirection = "row",
	justifyContent = "initial",
	alignItems = "center",
	gap = "10px",
}: {
	className?: string;
	children: ReactNode;
	flexDirection?: CSSProperties["flexDirection"];
	justifyContent?: CSSProperties["justifyContent"];
	alignItems?: CSSProperties["alignItems"];
	gap?: CSSProperties["gap"];
}) => {
	return (
		<div
			className={className}
			style={{
				display: "flex",
				flexDirection,
				justifyContent,
				alignItems,
				gap,
			}}
		>
			{children}
		</div>
	);
};
