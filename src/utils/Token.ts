import UtilApi from "src/utils/UtilApi";

const LOCAL_STORAGE_TOKEN_KEY = "token";

class Token {
	private token: string;

	constructor() {
		const localStroageToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

		this.token = localStroageToken ?? "";
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
		this.token = "";
	}
}

const token = new Token();

export default token;
