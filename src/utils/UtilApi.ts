import CustomError from "src/utils/CustomError";
import token from "src/utils/Token";
import UtilObject from "src/utils/UtilObject";

type Method = "GET" | "POST" | "DELETE" | "PUT";

const DEFAULT_URL = "http://localhost:8080";
const DEFAULT_HEADER = { "Content-Type": "application/json;charset=utf-8" };

class UtilApi {
	private static async defaultFetch<T>({
		url,
		method,
		headers,
		body,
	}: {
		url: string;
		method: Method;
		headers?: RequestInit["headers"];
		body?: RequestInit["body"];
	}) {
		const nextHeader = UtilObject.removeFalsy({
			...DEFAULT_HEADER,
			...headers,
			Authorization: token.getToken(),
		});

		const response = await fetch(url, {
			method,
			body,
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
			throw new CustomError({
				errorResponse,
			});
		}
	}

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

	static get<T>({ url, params }: { url: string; params?: Object }) {
		const getUrl = this.generateNexturl({ url, params });

		return this.defaultFetch<T>({
			url: getUrl,
			method: "GET",
		});
	}

	static post<T = Object>({ url, body }: { url: string; body: Object }) {
		const removedFalsyBody = UtilObject.removeFalsy(body);
		const postUrl = this.generateNexturl({ url });

		return this.defaultFetch<T>({
			url: postUrl,
			method: "POST",
			body: JSON.stringify(removedFalsyBody),
		});
	}
}

export default UtilApi;
