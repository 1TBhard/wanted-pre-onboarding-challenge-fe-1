import { Todo } from "src/api/todo/getTodoList";
import Response from "src/api/types/Response";
import UtilApi from "src/utils/UtilApi";

export default async function deleteTodo(id: string) {
	const url = "/todos/:id".replace(":id", id);

	return UtilApi.delete<Response<null>>({
		url,
	});
}
