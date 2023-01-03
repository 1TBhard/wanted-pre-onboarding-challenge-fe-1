import getTodoList, { Todo } from "src/api/todo/getTodoList";
import { MainLayout } from "src/components/MainLayout";
import { useEffect, useState } from "react";

export const TodoPage = () => {
	const [todoList, setTodoList] = useState<Todo[]>();
	const [currentTodo, setCurrentTodo] = useState<Todo>();

	const fetchTodo = async () => {
		try {
			const { data } = await getTodoList();

			setTodoList(data);
		} catch (error) {
			console.error(error);
			alert(error.message);
		}
	};

	useEffect(() => {
		fetchTodo();
	}, []);

	return (
		<MainLayout title='Todo 리스트'>
			<section>
				<ul>
					{todoList?.map((todo) => (
						<li key={todo.id}>{todo.title}</li>
					))}
				</ul>
			</section>

			<section>{currentTodo && <div>{currentTodo.content}</div>}</section>
		</MainLayout>
	);
};

const Card = () => {
	return <div></div>;
};
