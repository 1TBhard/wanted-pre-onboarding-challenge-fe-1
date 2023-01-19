import * as Styled from "./TodoDetail.style";
import UtilLocalStorage from "src/utils/UtilLocalStorage";
import { Button } from "src/components/common/Button";
import { ChangeEventHandler, useEffect, useState } from "react";
import { CURRENT_TODO_CONTEXT } from "src/constants/LOCAL_STORAGE_KEY";
import {
	DELETE_WARNING,
	PLEASE_INPUT_TITLE,
} from "src/constants/WARNING_MESSAGE";
import { FlexBox } from "src/components/common/FlexBox";
import { LabelInput } from "src/components/common/LabelInput";
import { LabelTextArea } from "src/components/common/LabelTextarea";
import {
	useDeleteTodoMutation,
	useGetTodoByIdQuery,
	useUpdateTodoMutation,
} from "src/queries/todo";

export const TodoDetail = ({ id }: { id: string }) => {
	const { data: originTodo } = useGetTodoByIdQuery(id);
	const { mutate: updateTodo } = useUpdateTodoMutation();
	const { mutate: deleteTodo } = useDeleteTodoMutation();

	const [currentTitle, setCurrentTitle] = useState("");
	const [currentContent, setCurrentContent] = useState("");

	const isSameOrigin =
		originTodo?.title === currentTitle &&
		originTodo?.content === currentContent;

	const onChangeTitle: ChangeEventHandler<HTMLInputElement> = (e) => {
		const nextTitle = e.target.value;

		setCurrentTitle(() => nextTitle);
		UtilLocalStorage.set(CURRENT_TODO_CONTEXT, {
			title: nextTitle,
			content: currentContent,
		});
	};

	const onChangeContent: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
		const nextContent = e.target.value;

		setCurrentContent(() => nextContent);
		UtilLocalStorage.set(CURRENT_TODO_CONTEXT, {
			title: currentTitle,
			content: nextContent,
		});
	};

	const onClickSubmit = async () => {
		await updateTodo({
			id,
			title: currentTitle,
			content: currentContent,
		});
	};

	const onClickDelete = async () => {
		if (confirm(DELETE_WARNING)) {
			await deleteTodo(id);
		}
	};

	useEffect(() => {
		const initContent = UtilLocalStorage.get<{
			title: string;
			content: string;
		}>(CURRENT_TODO_CONTEXT);

		if (initContent) {
			setCurrentContent(() => initContent?.content);
			setCurrentTitle(() => initContent?.title);
		} else {
			setCurrentContent(() => originTodo?.content);
			setCurrentTitle(() => originTodo?.title);
		}
	}, [originTodo]);

	return (
		<Styled.Frame>
			<FlexBox justifyContent={"flex-end"}>
				<Button label='수정' disabled={isSameOrigin} onClick={onClickSubmit} />
				<Button label='삭제' colorType='warning' onClick={onClickDelete} />
			</FlexBox>

			<Styled.Article>
				<FlexBox flexDirection='column' alignItems={"stretch"}>
					<LabelInput
						label='제목'
						placeholder={PLEASE_INPUT_TITLE}
						name='todo-title'
						type={"text"}
						value={currentTitle}
						onChange={onChangeTitle}
					/>
					<LabelTextArea
						label='상세'
						name='todo-detail'
						value={currentContent}
						onChange={onChangeContent}
					/>
				</FlexBox>
			</Styled.Article>
		</Styled.Frame>
	);
};
