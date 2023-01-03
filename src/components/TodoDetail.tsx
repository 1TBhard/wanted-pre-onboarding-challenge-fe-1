import getTodo from "src/api/todo/getTodo";
import putTodo from "src/api/todo/putTodo";
import { Button } from "src/components/Button";
import { ChangeEventHandler, useEffect, useState } from "react";
import { FlexBox } from "src/components/FlexBox";
import UtilLocalStorage from "src/utils/UtilLocalStorage";
import { CURRENT_TODO_CONTEXT } from "../constants/LOCAL_STORAGE_KEY";

interface TodoDetailProps {
	id: string;
	exitEdit: () => void;
}

export const TodoDetail = ({ id, exitEdit }: TodoDetailProps) => {
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
		} catch (error) {
			console.error(error);
			alert(error.message);
		}
	};

	const onClickCancel = () => {
		exitEdit();
		UtilLocalStorage.remove(CURRENT_TODO_CONTEXT);
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
		<FlexBox
			flexDirection='column'
			alignItems={"stretch"}
			justifyContent='start'
		>
			<FlexBox justifyContent={"flex-end"}>
				<Button label='제출' buttonProp={{ onClick: onClickSubmit }} />
				<Button label='취소' buttonProp={{ onClick: onClickCancel }} />
			</FlexBox>

			<article>
				<FlexBox flexDirection='column' alignItems={"stretch"}>
					<input
						placeholder='제목을 입력해주세요.'
						value={currentTitle}
						onChange={onChangeTitle}
					/>
					<textarea
						placeholder='내용을 입력해주세요.'
						value={currentContent}
						onChange={onChangeContent}
					/>
				</FlexBox>
			</article>
		</FlexBox>
	);
};
