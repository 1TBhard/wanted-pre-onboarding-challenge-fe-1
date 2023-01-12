import getTodo, { Todo } from "src/api/todo/getTodo";
import putTodo from "src/api/todo/putTodo";
import { Button } from "src/components/common/Button";
import { ChangeEventHandler, useEffect, useState } from "react";
import { FlexBox } from "src/components/common/FlexBox";
import UtilLocalStorage from "src/utils/UtilLocalStorage";
import { CURRENT_TODO_CONTEXT } from "src/constants/LOCAL_STORAGE_KEY";
import * as Styled from "./TodoDetail.style";
import { LabelInput } from "src/components/common/LabelInput";
import { LabelTextArea } from "src/components/common/LabelTextarea";
import {
	DELETE_WARNING,
	PLEASE_INPUT_TITLE,
} from "src/constants/WARNING_MESSAGE";
import deleteTodo from "src/api/todo/deleteTodo";
import { useNavigate } from "react-router-dom";

interface TodoDetailProps extends Todo {
	afterExitEdit: () => void;
}

export const TodoDetail = ({
	id,
	afterExitEdit,
	title: originTitle,
	content: originContent,
}: TodoDetailProps) => {
	const navigate = useNavigate();
	const [currentTitle, setCurrentTitle] = useState("");
	const [currentContent, setCurrentContent] = useState("");

	const isSameOrigin =
		originTitle === currentTitle && originContent === currentContent;

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
			alert("수정되었습니다.");
			await afterExitEdit();
		} catch (error) {
			console.error(error);
			alert(error.message);
		}
	};

	const onClickDelete = async () => {
		if (confirm(DELETE_WARNING)) {
			try {
				await deleteTodo(id);
				await afterExitEdit();
				navigate("/todo", { replace: true });
			} catch (error) {
				console.error(error);
				alert(error.message);
			}
		}
	};

	useEffect(() => {
		const initContent = UtilLocalStorage.get<{
			title: string;
			content: string;
		}>(CURRENT_TODO_CONTEXT);

		if (initContent) {
			setCurrentContent(initContent.content);
			setCurrentTitle(initContent.title);
		} else {
			setCurrentTitle(originTitle);
			setCurrentContent(originContent);
		}
	}, [id, originTitle, originContent]);

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
