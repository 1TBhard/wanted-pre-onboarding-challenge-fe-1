import { Todo } from "src/api/todo/getTodoList";
import Response from "src/api/types/Response";
import UtilApi from "src/utils/UtilApi";

export default async function putTodo({
	id,
	title,
	content,
}: {
	id: string;
	title: string;
	content: string;
}) {
	const url = "/todos/:id".replace(":id", id);
	const body = {
		title,
		content,
	};

	return UtilApi.put<Response<Todo>>({
		url,
		body,
	});
}
