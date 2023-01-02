import UtilApi from "src/utils/UtilApi";

interface ResGetSignUp {
	message: string;
	token: string;
}

export default async function postLogin({
	email,
	password,
}: {
	email: string;
	password: string;
}) {
	const url = "/users/login";
	const body = {
		email,
		password,
	};

	return UtilApi.post<ResGetSignUp>({
		url,
		body,
	});
}
