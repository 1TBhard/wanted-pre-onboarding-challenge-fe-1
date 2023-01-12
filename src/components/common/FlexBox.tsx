import { CSSProperties, ReactNode } from "react";

export const FlexBox = ({
	className,
	children,
	flexDirection = "row",
	justifyContent = "initial",
	alignItems = "center",
	gap = "10px",
	width,
	height,
}: {
	className?: string;
	children: ReactNode;
	flexDirection?: CSSProperties["flexDirection"];
	justifyContent?: CSSProperties["justifyContent"];
	alignItems?: CSSProperties["alignItems"];
	gap?: CSSProperties["gap"];
	width?: CSSProperties["width"];
	height?: CSSProperties["height"];
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
				width,
				height,
			}}
		>
			{children}
		</div>
	);
};
