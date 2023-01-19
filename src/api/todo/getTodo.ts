import Response from "src/api/types/Response";
import UtilApi from "src/utils/UtilApi";

export interface Todo {
	title: string;
	content: string;
	id: string;
	createdAt: string;
	updatedAt: string;
}

export default async function getTodo(id: string) {
	const url = "/todos/:id".replace(":id", id);

	return UtilApi.get<Response<Todo | null>>({
		url,
	}).then((response) => response.data);
}
