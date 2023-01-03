import UtilApi from "src/utils/UtilApi";

const LOCAL_STORAGE_TOKEN_KEY = "token";

export class Token {
	private token: string | null;

	constructor() {
		const localStroageToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

		this.token = localStroageToken ?? "";
	}

	isEmpty() {
		return this.token == null;
	}

	getToken() {
		return this.token;
	}

	setToken(newToken: string) {
		if (newToken.length === 0) {
			throw Error("토큰의 길이는 최대 1자 이상압니다.");
		}

		localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, newToken);
		this.token = newToken;
	}

	removeToken() {
		this.token = null;
		localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
	}
}

const token = new Token();

export default token;
