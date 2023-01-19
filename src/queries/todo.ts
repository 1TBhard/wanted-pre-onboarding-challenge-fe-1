import getTodoList from "src/api/todo/getTodoList";
import postTodo from "src/api/todo/postTodo";
import { todoQueryClient } from "src/components/TodoQueryClientProvider";
import { useMutation, useQuery, UseQueryOptions } from "react-query";
import deleteTodo from "src/api/todo/deleteTodo";
import CustomError from "src/utils/CustomError";
import UtilLocalStorage from "src/utils/UtilLocalStorage";
import { CURRENT_TODO_CONTEXT } from "src/constants/LOCAL_STORAGE_KEY";
import { useNavigate } from "react-router-dom";
import getTodo from "src/api/todo/getTodo";
import putTodo from "src/api/todo/putTodo";

const QUERY_KEY = {
	TODO_LIST: "todoList",
} as const;

const todosQueryOption = {
	queryKey: [QUERY_KEY.TODO_LIST] as const,
	queryFn: getTodoList,
} satisfies UseQueryOptions;

// Queries
export const useTodoListQuery = () => useQuery(todosQueryOption);

export const useGetTodoByIdQuery = (todoId: string) =>
	useQuery([QUERY_KEY.TODO_LIST, todoId], {
		queryFn: () => getTodo(todoId),
		enabled: !!todoId,
	});

export const useCreateTodoMutation = (afterClean: Function) =>
	useMutation(postTodo, {
		// invalidateQueries : 기존의 것을 무효화하고 데이터 새로 조회
		onSuccess: async () => {
			await todoQueryClient.invalidateQueries([QUERY_KEY.TODO_LIST]);
			alert(`todo 생성 성공`);
			afterClean();
		},
		onError: (error) => {
			if (error instanceof CustomError) {
				alert(error.message);
			}
		},
	});

export const useUpdateTodoMutation = () =>
	useMutation(putTodo, {
		onSuccess: () => {
			alert("수정되었습니다.");
			todoQueryClient.invalidateQueries([QUERY_KEY.TODO_LIST]);
		},
		onError: (error) => {
			console.error(error);
			if (error instanceof CustomError) {
				alert(error.message);
			}
		},
	});

export const useDeleteTodoMutation = () => {
	const navigate = useNavigate();

	const mutate = useMutation(deleteTodo, {
		onSuccess: async () => {
			UtilLocalStorage.remove(CURRENT_TODO_CONTEXT);
			alert("성공적으로 삭제되었습니다.");
			navigate("");
		},
		onError: (error) => {
			if (error instanceof CustomError) {
				alert(error.message);
			}
		},
	});

	return mutate;
};
