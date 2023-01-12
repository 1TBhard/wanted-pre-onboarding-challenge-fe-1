import * as Styled from "./PostModal.style";
import Modal, { ModalProps } from "src/components/common/Modal/indext";
import postTodo from "src/api/todo/postTodo";
import { Button } from "src/components/common/Button";
import { FlexBox } from "src/components/common/FlexBox";
import { LabelInput, LabelInputProps } from "src/components/common/LabelInput";
import { LabelTextArea } from "src/components/common/LabelTextarea";
import { useState } from "react";

interface PostModalProps extends Pick<ModalProps, "isShow"> {
	hideModal: () => void;
}

export const PostModal = ({ isShow, hideModal }: PostModalProps) => {
	const [title, setTitle] = useState("");
	const [detail, setDetail] = useState("");

	const onClickCancel = () => {
		setTitle("");
		setDetail("");
		hideModal();
	};

	const onClickOk = async () => {
		try {
			await postTodo({ content: detail, title });
		} catch (error) {
			console.error(error);
			alert(error.message);
		}
	};

	const onChangeTitle: LabelInputProps["onChange"] = (e) => {
		setTitle(e.target.value);
	};

	const onChangeDetail: LabelInputProps["onChange"] = (e) => {
		setDetail(e.target.value);
	};

	return (
		<Modal
			title='새로운 Todo 생성'
			isShow={isShow}
			onClickBackground={hideModal}
		>
			<Styled.ModalForm>
				<LabelInput
					label='제목'
					name='todo-title'
					type={"text"}
					value={title}
					onChange={onChangeTitle}
				/>
				<LabelTextArea
					label='상세'
					name='todo-detail'
					value={detail}
					onChange={onChangeDetail}
				/>
			</Styled.ModalForm>

			<FlexBox>
				<Button label='저장' onClick={onClickOk} width={"100%"} />
				<Button
					label='취소'
					colorType='warning'
					onClick={onClickCancel}
					width={"100%"}
				/>
			</FlexBox>
		</Modal>
	);
};
