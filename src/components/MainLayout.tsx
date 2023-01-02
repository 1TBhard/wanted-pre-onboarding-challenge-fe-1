import { PropsWithChildren } from "react";

export const MainLayout = ({
	title,
	children,
}: PropsWithChildren<{ title: string }>) => {
	return (
		<div className='layout'>
			<div>
				<div className='center-box center-box__title-box'>
					<h1>{title}</h1>
				</div>
				<div className='center-box'>{children}</div>
			</div>
		</div>
	);
};
