import { Todo } from "src/api/todo/getTodoList";
import Response from "src/api/types/Response";
import UtilApi from "src/utils/UtilApi";

export default async function postTodo({
	title,
	content,
}: {
	title: string;
	content: string;
}) {
	const url = "/todos";
	const body = {
		title,
		content,
	};

	return UtilApi.post<Response<Todo>>({
		url,
		body,
	});
}
