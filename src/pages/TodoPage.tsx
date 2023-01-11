import debounce from "src/utils/debounce";
import deleteTodo from "src/api/todo/deleteTodo";
import getTodoList, { Todo } from "src/api/todo/getTodoList";
import postTodo from "src/api/todo/postTodo";
import UtilLocalStorage from "src/utils/UtilLocalStorage";
import { Button } from "src/components/common/Button";
import { CURRENT_TODO_CONTEXT } from "src/constants/LOCAL_STORAGE_KEY";
import { DELETE_WARNING } from "src/constants/WARNING_MESSAGE";
import { FlexBox } from "src/components/common/FlexBox";
import { MainLayout } from "src/components/common/MainLayout";
import { TodoDetail } from "src/components/main/TodoDetail";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const TodoPage = () => {
	const navigate = useNavigate();
	const [todoList, setTodoList] = useState<Todo[]>();
	const selectedId = useSearchParams()[0].get("selectedId") ?? "";

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
		UtilLocalStorage.remove(CURRENT_TODO_CONTEXT);
		navigate(`?selectedId=${nextId}`, {
			relative: "route",
			preventScrollReset: true,
		});
	};

	const onClickDelete = async (id: string) => {
		if (confirm(DELETE_WARNING)) {
			try {
				await deleteTodo(id);
				await fetchTodoList();
			} catch (error) {
				console.error(error);
				alert(error.message);
			}
		}
	};

	const afterExitEdit = async () => {
		await fetchTodoList();
		navigate("");

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
		fetchTodoList();
	}, []);

	return (
		<MainLayout title='Todo 리스트'>
			<FlexBox gap={"30px"} alignItems='start'>
				<FlexBox flexDirection='column' justifyContent='stretch'>
					{todoList?.map((todo) => (
						<FlexBox
							className={selectedId === todo.id ? "selected__todo" : ""}
							key={todo.id}
							justifyContent='space-between'
						>
							<p
								style={{
									width: "400px",
									overflow: "hidden",
									whiteSpace: "nowrap",
									textOverflow: "ellipsis",
								}}
							>
								{todo.title}
							</p>

							<FlexBox>
								<Button label='수정' onClick={() => onClickEdit(todo.id)} />
								<Button label='삭제' onClick={() => onClickDelete(todo.id)} />
							</FlexBox>
						</FlexBox>
					))}
					<Button
						label='추가'
						style={{ width: "100%" }}
						onClick={() => debounce(addTodoList)}
					/>
				</FlexBox>

				<FlexBox flexDirection='column'>
					{selectedId && (
						<TodoDetail id={selectedId} afterExitEdit={afterExitEdit} />
					)}
				</FlexBox>
			</FlexBox>
		</MainLayout>
	);
};
