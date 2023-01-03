import Response from "src/api/types/Response";
import UtilApi from "src/utils/UtilApi";

export interface Todo {
	title: string;
	content: string;
	id: string;
	createdAt: string;
	updatedAt: string;
}

export default async function getTodoList() {
	const url = "/todos";

	return UtilApi.get<Response<Todo[]>>({
		url,
	});
}
