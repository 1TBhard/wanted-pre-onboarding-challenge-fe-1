import * as Styled from "./PostModal.style";
import Modal, { ModalProps } from "src/components/common/Modal/indext";
import UtilObject from "src/utils/UtilObject";
import { Button } from "src/components/common/Button";
import { FlexBox } from "src/components/common/FlexBox";
import { LabelInput, LabelInputProps } from "src/components/common/LabelInput";
import { LabelTextArea } from "src/components/common/LabelTextarea";
import { PLEASE_INPUT_TITLE } from "src/constants/WARNING_MESSAGE";
import { useCreateTodoMutation } from "src/queries/todo";
import { useState } from "react";

interface PostModalProps extends Pick<ModalProps, "isShow"> {
	hideModal: () => void;
}

export const PostModal = ({ isShow, hideModal }: PostModalProps) => {
	const [title, setTitle] = useState("");
	const [detail, setDetail] = useState("");
	const [error, setError] = useState<{ title?: string; detail?: string }>({});
	const { mutate, isLoading } = useCreateTodoMutation(hideModal);

	const isValidate = () => {
		return title && UtilObject.isEmpty(UtilObject.removeFalsy(error));
	};

	const resetContext = () => {
		setTitle("");
		setDetail("");
		setError({});
	};

	const onClickCancel = () => {
		resetContext();
		hideModal();
	};

	const onClickOk = async () => {
		if (!isValidate()) {
			alert("조건에 맞게 입력해주세요.");
			return;
		}

		try {
			await mutate({ content: detail, title });
		} catch (error) {
			console.error(error);
			alert(error.message);
		}
	};

	const onChangeTitle: LabelInputProps["onChange"] = (e) => {
		const nextTitle = e.target.value;

		setTitle(nextTitle);
		if (!nextTitle) {
			setError((prev) => ({ ...prev, title: PLEASE_INPUT_TITLE }));
		} else {
			setError((prev) => ({ detail: prev.detail }));
		}
	};

	const onChangeDetail: LabelInputProps["onChange"] = (e) => {
		const nextDetail = e.target.value;
		setDetail(nextDetail);
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
					placeholder={PLEASE_INPUT_TITLE}
					name='todo-title'
					type={"text"}
					value={title}
					onChange={onChangeTitle}
					error={error["title"]}
				/>
				<LabelTextArea
					label='상세'
					name='todo-detail'
					value={detail}
					onChange={onChangeDetail}
					error={error["detail"]}
				/>
			</Styled.ModalForm>

			<FlexBox>
				<Button
					disabled={isLoading}
					label='저장'
					onClick={onClickOk}
					width={"100%"}
				/>
				<Button
					disabled={isLoading}
					label='취소'
					colorType='warning'
					onClick={onClickCancel}
					width={"100%"}
				/>
			</FlexBox>
		</Modal>
	);
};
