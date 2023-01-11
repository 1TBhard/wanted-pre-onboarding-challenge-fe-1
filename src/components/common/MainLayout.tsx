import { PropsWithChildren } from "react";
import { FlexBox } from "src/components/common/FlexBox";

export const MainLayout = ({
	title,
	children,
}: PropsWithChildren<{ title: string }>) => {
	return (
		<div className='layout'>
			<FlexBox flexDirection='column'>
				<div
					style={{ margin: "20px 0" }}
					className='center-box center-box__title-box'
				>
					<h1>{title}</h1>
				</div>

				<div className='center-box'>{children}</div>
			</FlexBox>
		</div>
	);
};
