import getTodoList from "src/api/todo/getTodoList";
import UtilLocalStorage from "src/utils/UtilLocalStorage";
import { CURRENT_TODO_CONTEXT } from "src/constants/LOCAL_STORAGE_KEY";
import { FlexBox } from "src/components/common/FlexBox";
import { MainLayout } from "src/components/common/MainLayout";
import getTodo, { Todo } from "src/api/todo/getTodo";
import { TodoDetail } from "src/components/main/TodoDetail";
import { TodoListMenu } from "src/components/main/TodoListMenu";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const TodoPage = () => {
	const navigate = useNavigate();
	const [todoList, setTodoList] = useState<Todo[]>();
	const selectedId = useSearchParams()[0].get("selectedId") ?? "";
	const [selectedTodo, setSelectedTodo] = useState<Todo>();

	const onClickTodoDetail = (nextId: string) => {
		UtilLocalStorage.remove(CURRENT_TODO_CONTEXT);
		navigate(`?selectedId=${nextId}`, {
			relative: "route",
			preventScrollReset: true,
		});
	};

	const afterExitEdit = async () => {
		UtilLocalStorage.remove(CURRENT_TODO_CONTEXT);
		await fetchTodo();
		await fetchTodoList();
	};

	const afterDelete = async () => {
		UtilLocalStorage.remove(CURRENT_TODO_CONTEXT);
		await fetchTodoList();
		navigate("");
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

	const fetchTodo = async () => {
		if (!selectedId) {
			setSelectedTodo(undefined);
			return;
		}

		try {
			const { data: originTodo } = await getTodo(selectedId);
			setSelectedTodo(originTodo);
		} catch (error) {
			alert(error.message);
			navigate("/todo", { replace: true });
		}
	};

	useEffect(() => {
		fetchTodoList();
	}, []);

	useEffect(() => {
		fetchTodo();
	}, [selectedId]);

	return (
		<MainLayout>
			<FlexBox gap={"50px"} alignItems='baseline'>
				<TodoListMenu
					todoList={todoList}
					onClickTodoDetail={onClickTodoDetail}
					afterAddTodo={fetchTodoList}
				/>

				{selectedTodo && (
					<TodoDetail
						{...selectedTodo}
						afterExitEdit={afterExitEdit}
						afterDelete={afterDelete}
					/>
				)}
			</FlexBox>
		</MainLayout>
	);
};
