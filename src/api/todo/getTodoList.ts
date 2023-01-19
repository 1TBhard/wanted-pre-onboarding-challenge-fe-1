import { Todo } from "src/api/todo/getTodo";
import Response from "src/api/types/Response";
import UtilApi from "src/utils/UtilApi";

export default async function getTodoList() {
	const url = "/todos";

	return UtilApi.get<Response<Todo[]>>({
		url,
	}).then((response) => response.data);
}
