import CustomError from "src/utils/CustomError";
import token from "src/utils/Token";
import UtilObject from "src/utils/UtilObject";

type Method = "GET" | "POST" | "DELETE" | "PUT";

const DEFAULT_URL = "http://localhost:8080";
const DEFAULT_HEADER = { "Content-Type": "application/json;charset=utf-8" };

interface ApiDetail {
	body?: Object;
	params?: Object;
	url: string;
}

class UtilApi {
	private static generateNexturl({
		url,
		params,
	}: {
		url: string;
		params?: Object;
	}) {
		const removedFalsyParmas = UtilObject.removeFalsy(params);
		const paramsString = Object.entries(removedFalsyParmas)
			.map(([key, value]) => `${key}=${value}`)
			.join("&");

		return DEFAULT_URL + url + (paramsString ? `?${paramsString}` : "");
	}

	private static async defaultFetch<T>({
		body = null,
		params,
		url,
		method,
	}: ApiDetail & { method: Method }) {
		const removedFalsyBody = UtilObject.removeFalsy(body);
		const nextUrl = this.generateNexturl({ url, params });
		const nextHeader = UtilObject.removeFalsy({
			...DEFAULT_HEADER,
			Authorization: token.getToken(),
		});

		const response = await fetch(nextUrl, {
			method,
			body: UtilObject.isEmpty(removedFalsyBody)
				? null
				: JSON.stringify(removedFalsyBody),
			headers: nextHeader,
		}).catch((error) => {
			throw new CustomError({
				customErrorMessage: "서버 연결이 되지 않았습니다. 다시 시도해주세요.",
			});
		});

		if (response.ok) {
			return (await response.json()) as T;
		} else {
			const errorResponse = await response.json();
			const customError = new CustomError({
				errorResponse,
			});

			// 토큰 없는 에러 발생시 home으로 리다이렉트
			if (customError.message === "Token is missing") {
				window.location.replace("/");
			}

			throw customError;
		}
	}

	static get<T>({ ...getProps }: Omit<ApiDetail, "body">) {
		return this.defaultFetch<T>({ ...getProps, method: "GET" });
	}

	static post<T = Object>({ ...postProps }: ApiDetail) {
		return this.defaultFetch<T>({ ...postProps, method: "POST" });
	}

	static put<T = Object>({ ...putProps }: ApiDetail) {
		return this.defaultFetch<T>({ ...putProps, method: "PUT" });
	}

	static delete<T = Object>({ ...deleteProps }: ApiDetail) {
		return this.defaultFetch<T>({ ...deleteProps, method: "DELETE" });
	}
}

export default UtilApi;
