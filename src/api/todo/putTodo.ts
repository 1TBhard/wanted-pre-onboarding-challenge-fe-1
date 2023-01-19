import { Todo } from "src/api/todo/getTodo";
import Response from "src/api/types/Response";
import UtilApi from "src/utils/UtilApi";

interface PutTodoBody {
	id: string;
	title: string;
	content: string;
}

export default async function putTodo({ id, title, content }: PutTodoBody) {
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
