import debouncer from "src/utils/debounce";
import deleteTodo from "src/api/todo/deleteTodo";
import getTodoList, { Todo } from "src/api/todo/getTodoList";
import postTodo from "src/api/todo/postTodo";
import UtilLocalStorage from "src/utils/UtilLocalStorage";
import { Button } from "src/components/Button";
import { DELETE_WARNING, NO_SAVE_WARNING } from "src/constants/WARNING_MESSAGE";
import { FlexBox } from "src/components/FlexBox";
import { MainLayout } from "src/components/MainLayout";
import { TodoDetail } from "src/components/TodoDetail";
import { useEffect, useState } from "react";
import {
	CURRENT_SELECTED_TODO_ID,
	CURRENT_TODO_CONTEXT,
} from "src/constants/LOCAL_STORAGE_KEY";

export const TodoPage = () => {
	const [todoList, setTodoList] = useState<Todo[]>();
	const [selectedId, setSelectedId] = useState<string>();

	const addTodoList = async () => {
		try {
			await postTodo({ content: "내용을 입력해주세요.", title: "새로운 할일" });
			await fetchTodoList();
		} catch (error) {
			console.error(error);
			alert(error.message);
		}
	};

	const onClickEdit = (nextId: string) => {
		setSelectedId(nextId);
		UtilLocalStorage.set(CURRENT_SELECTED_TODO_ID, nextId);
		UtilLocalStorage.remove(CURRENT_TODO_CONTEXT);
	};

	const onClickDelete = async (id: string) => {
		if (confirm(DELETE_WARNING)) {
			if (selectedId === id) {
				setSelectedId(() => undefined);
			}

			try {
				await deleteTodo(id);
				UtilLocalStorage.remove(CURRENT_SELECTED_TODO_ID);
				await fetchTodoList();
			} catch (error) {
				console.error(error);
				alert(error.message);
			}
		}
	};

	const exitEdit = () => {
		setSelectedId(() => undefined);
		UtilLocalStorage.remove(CURRENT_SELECTED_TODO_ID);
		UtilLocalStorage.remove(CURRENT_TODO_CONTEXT);
	};

	const fetchTodoList = async () => {
		try {
			const { data } = await getTodoList();

			setTodoList(data);
		} catch (error) {
			console.error(error);
			alert(error.message);
		}
	};

	useEffect(() => {
		const initSelectedId = UtilLocalStorage.get(CURRENT_SELECTED_TODO_ID);

		if (initSelectedId) {
			setSelectedId(initSelectedId);
		}

		fetchTodoList();
	}, []);

	return (
		<MainLayout title='Todo 리스트'>
			<FlexBox gap={"30px"} alignItems='start'>
				<FlexBox flexDirection='column' justifyContent='stretch'>
					<Button
						label='추가'
						buttonProp={{
							onClick: () => debouncer(addTodoList),
						}}
					/>
					{todoList?.map((todo) => (
						<FlexBox
							className={selectedId === todo.id ? "selected__todo" : ""}
							key={todo.id}
						>
							<p>{todo.title}</p>
							<Button
								label='수정'
								buttonProp={{ onClick: () => onClickEdit(todo.id) }}
							/>
							<Button
								label='삭제'
								buttonProp={{ onClick: () => onClickDelete(todo.id) }}
							/>
						</FlexBox>
					))}
				</FlexBox>

				<FlexBox flexDirection='column'>
					{selectedId && <TodoDetail id={selectedId} exitEdit={exitEdit} />}
				</FlexBox>
			</FlexBox>
		</MainLayout>
	);
};

const Card = () => {
	return <div></div>;
};
