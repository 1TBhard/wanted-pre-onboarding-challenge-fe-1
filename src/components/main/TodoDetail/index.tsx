import getTodo from "src/api/todo/getTodo";
import putTodo from "src/api/todo/putTodo";
import { Button } from "src/components/common/Button";
import { ChangeEventHandler, useEffect, useState } from "react";
import { FlexBox } from "src/components/common/FlexBox";
import UtilLocalStorage from "src/utils/UtilLocalStorage";
import { CURRENT_TODO_CONTEXT } from "src/constants/LOCAL_STORAGE_KEY";
import * as Styled from "./TodoDetail.style";
import { LabelInput } from "src/components/common/LabelInput";
import { LabelTextArea } from "src/components/common/LabelTextarea";

interface TodoDetailProps {
	id: string;
	afterExitEdit: () => void;
}

export const TodoDetail = ({ id, afterExitEdit }: TodoDetailProps) => {
	const [currentTitle, setCurrentTitle] = useState("");
	const [currentContent, setCurrentContent] = useState("");

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
		try {
			await putTodo({ id, title: currentTitle, content: currentContent });
			await afterExitEdit();
		} catch (error) {
			console.error(error);
			alert(error.message);
		}
	};

	const fetchTodo = async () => {
		try {
			const { data: originTodo } = await getTodo(id);

			setCurrentTitle(originTodo.title);
			setCurrentContent(originTodo.content);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		const initContent = UtilLocalStorage.get<{
			title: string;
			content: string;
		}>(CURRENT_TODO_CONTEXT);

		if (!initContent) {
			fetchTodo();
		} else {
			setCurrentContent(initContent.content);
			setCurrentTitle(initContent.title);
		}
	}, [id]);

	return (
		<Styled.Frame>
			<FlexBox justifyContent={"flex-end"}>
				<Button label='수정' onClick={onClickSubmit} />
				{/* <Button label='취소' onClick={onClickCancel} /> */}
			</FlexBox>

			<Styled.Article>
				<FlexBox flexDirection='column' alignItems={"stretch"}>
					<LabelInput
						label='제목'
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
