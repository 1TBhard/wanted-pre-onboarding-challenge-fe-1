import UtilApi from "src/utils/UtilApi";

interface ResGetSignUp {
	message: string;
	token: string;
}

export default async function postSignUp({
	email,
	password,
}: {
	email: string;
	password: string;
}) {
	const url = "/users/create";
	const body = {
		email,
		password,
	};

	console.log(body);

	return UtilApi.post<ResGetSignUp>({
		url,
		body,
	});
}
