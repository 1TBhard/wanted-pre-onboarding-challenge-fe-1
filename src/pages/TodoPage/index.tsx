import deleteTodo from "src/api/todo/deleteTodo";
import getTodoList from "src/api/todo/getTodoList";
import UtilLocalStorage from "src/utils/UtilLocalStorage";
import { CURRENT_TODO_CONTEXT } from "src/constants/LOCAL_STORAGE_KEY";
import { DELETE_WARNING } from "src/constants/WARNING_MESSAGE";
import { FlexBox } from "src/components/common/FlexBox";
import { MainLayout } from "src/components/common/MainLayout";
import { Todo } from "src/api/todo/getTodo";
import { TodoDetail } from "src/components/main/TodoDetail";
import { TodoListMenu } from "src/components/main/TodoListMenu";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const TodoPage = () => {
	const navigate = useNavigate();
	const [todoList, setTodoList] = useState<Todo[]>();
	const selectedId = useSearchParams()[0].get("selectedId") ?? "";

	const onClickTodoDetail = (nextId: string) => {
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
		<MainLayout>
			<FlexBox gap={"50px"} alignItems='baseline'>
				<TodoListMenu
					todoList={todoList}
					onClickTodoDetail={onClickTodoDetail}
				/>

				{/* <FlexBox flexDirection='column'> */}
				{selectedId && (
					<TodoDetail id={selectedId} afterExitEdit={afterExitEdit} />
				)}
				{/* </FlexBox> */}
			</FlexBox>
		</MainLayout>
	);
};
