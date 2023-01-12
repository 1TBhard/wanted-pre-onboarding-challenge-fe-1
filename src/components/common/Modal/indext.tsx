import React, { PropsWithChildren, ReactNode } from "react";
import * as Styled from "./Modal.style";

export interface ModalProps {
	onClickBackground: React.MouseEventHandler<HTMLDivElement>;
	isShow?: boolean;
	title: string;
	footer?: ReactNode;
}

const Modal = ({
	onClickBackground,
	isShow = false,
	title,
	children,
}: PropsWithChildren<ModalProps>) => {
	return (
		<Styled.Background isShow={isShow} onClick={onClickBackground}>
			<Styled.Frame
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<Styled.Header>
					<Styled.Title>{title}</Styled.Title>
				</Styled.Header>

				<Styled.Body>{children}</Styled.Body>
			</Styled.Frame>
		</Styled.Background>
	);
};

export default Modal;
